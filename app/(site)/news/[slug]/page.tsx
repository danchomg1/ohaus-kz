import type { Metadata } from "next";
import { ImageIcon } from "lucide-react";
import Container from "@/components/ui/Container";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import Skeleton from "@/components/ui/Skeleton";
import { labelForSegment } from "@/lib/catalog";

export const dynamicParams = true;
export function generateStaticParams() {
  return [];
}

type Params = { slug: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  return { title: labelForSegment(slug) };
}

export default async function NewsArticlePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const title = labelForSegment(slug);

  return (
    <Container className="max-w-3xl">
      <Breadcrumbs
        items={[{ title: "Новости", href: "/news" }, { title }]}
      />

      <article className="pb-16">
        <Skeleton className="mb-3 h-3 w-32" />
        <h1 className="font-heading text-3xl font-bold leading-tight text-ohaus-ink">
          {title}
        </h1>

        <div className="mt-6 flex aspect-[16/9] items-center justify-center bg-ohaus-bg-soft">
          <ImageIcon className="h-14 w-14 text-ohaus-line" aria-hidden="true" />
        </div>

        <div className="mt-8 space-y-3">
          {Array.from({ length: 10 }).map((_, i) => (
            <Skeleton
              key={i}
              className="h-4"
              style={{ width: `${70 + ((i * 7) % 30)}%` }}
            />
          ))}
        </div>
      </article>
    </Container>
  );
}
