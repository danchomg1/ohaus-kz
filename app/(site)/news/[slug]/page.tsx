import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ImageIcon } from "lucide-react";
import Container from "@/components/ui/Container";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import SanityImg from "@/components/ui/SanityImg";
import PortableBody from "@/components/catalog/PortableBody";
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

  return (
    <Container className="max-w-3xl">
      <Breadcrumbs
        items={[{ title: "Новости", href: "/news" }, { title: article.title }]}
      />

      <article className="pb-16">
        {article.date ? (
          <p className="mb-3 text-sm text-ohaus-muted">{article.date}</p>
        ) : null}
        <h1 className="font-heading text-3xl font-bold leading-tight text-ohaus-ink">
          {article.title}
        </h1>

        <div className="relative mt-6 flex aspect-[16/9] items-center justify-center overflow-hidden bg-ohaus-bg-soft">
          {article.cover?.asset ? (
            <SanityImg
              image={article.cover}
              alt={article.title}
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
              priority
            />
          ) : (
            <ImageIcon className="h-14 w-14 text-ohaus-line" aria-hidden="true" />
          )}
        </div>

        {article.body && article.body.length > 0 ? (
          <div className="mt-8">
            <PortableBody value={article.body} />
          </div>
        ) : null}
      </article>
    </Container>
  );
}
