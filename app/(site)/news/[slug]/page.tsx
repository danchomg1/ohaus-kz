import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import PageHero, { PAGE_BG } from "@/components/layout/PageHero";
import PortableBody from "@/components/catalog/PortableBody";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { absoluteUrl, metaDescription } from "@/lib/site";
import { urlFor } from "@/sanity/lib/image";
import { getNewsSlugs, getNewsArticle } from "@/sanity/lib/queries";

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await getNewsSlugs();
  return slugs.map((slug) => ({ slug }));
}

type Params = { slug: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const a = await getNewsArticle(slug);
  if (!a) return { title: "Новость" };

  const path = `/news/${slug}`;
  const description = metaDescription(a.excerpt || a.title);
  const cover = a.cover?.asset
    ? urlFor(a.cover as never)
        .width(1200)
        .height(630)
        .fit("crop")
        .url()
    : undefined;

  return {
    title: a.title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "article",
      title: a.title,
      description,
      url: absoluteUrl(path),
      ...(a.date ? { publishedTime: a.date } : {}),
      ...(cover
        ? { images: [{ url: cover, width: 1200, height: 630, alt: a.title }] }
        : {}),
    },
  };
}

export default async function NewsArticlePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const article = await getNewsArticle(slug);
  if (!article) notFound();

  // Обложка новости и есть фон шапки: показывать её ещё раз под заголовком
  // было бы повтором. Нет обложки — берётся общий фон раздела.
  const cover = article.cover?.asset
    ? urlFor(article.cover as never)
        .width(1920)
        .url()
    : PAGE_BG.company;

  return (
    <>
      <BreadcrumbJsonLd
        items={[{ title: "Новости", href: "/news" }, { title: article.title }]}
      />
      <PageHero
        eyebrow={article.date}
        title={article.title}
        crumbs={[{ title: "Новости", href: "/news" }, { title: article.title }]}
        image={cover}
      />
      <Container className="max-w-3xl">
        <article className="py-12 lg:py-16">
          {article.body && article.body.length > 0 ? (
            <PortableBody value={article.body} />
          ) : (
            <p className="text-ohaus-muted">Текст новости готовится.</p>
          )}
        </article>
      </Container>
    </>
  );
}
