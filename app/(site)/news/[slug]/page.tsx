import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import PageHero, { PAGE_BG } from "@/components/layout/PageHero";
import PortableBody from "@/components/catalog/PortableBody";
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
  return { title: a?.title ?? "Новость" };
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
