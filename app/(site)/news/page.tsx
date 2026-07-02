import type { Metadata } from "next";
import Link from "next/link";
import { ImageIcon } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import SanityImg from "@/components/ui/SanityImg";
import { getNewsList } from "@/sanity/lib/queries";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Новости",
  description: "Новости и события OHAUS Kazakhstan.",
};

export default async function NewsPage() {
  const news = await getNewsList();

  return (
    <Container>
      <Breadcrumbs items={[{ title: "Новости" }]} />
      <SectionHeading as="h1" title="Новости" />

      {news.length === 0 ? (
        <p className="pb-12 text-ohaus-muted">
          Новостей пока нет. Публикации появятся здесь.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-6 pb-12 sm:grid-cols-2 lg:grid-cols-3">
          {news.map((n) => (
            <Link
              key={n.slug}
              href={`/news/${n.slug}`}
              className="group flex flex-col border border-ohaus-line bg-white transition-shadow hover:shadow-card"
            >
              <div className="relative flex aspect-[16/9] items-center justify-center bg-ohaus-bg-soft">
                {n.cover?.asset ? (
                  <SanityImg
                    image={n.cover}
                    alt={n.title}
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover"
                  />
                ) : (
                  <ImageIcon
                    className="h-10 w-10 text-ohaus-line"
                    aria-hidden="true"
                  />
                )}
              </div>
              <div className="space-y-2 p-4">
                {n.date ? (
                  <span className="text-xs text-ohaus-muted">{n.date}</span>
                ) : null}
                <p className="font-heading text-base font-bold text-ohaus-ink group-hover:text-ohaus-red">
                  {n.title}
                </p>
                {n.excerpt ? (
                  <p className="line-clamp-2 text-sm text-ohaus-muted">
                    {n.excerpt}
                  </p>
                ) : null}
              </div>
            </Link>
          ))}
        </div>
      )}
    </Container>
  );
}
