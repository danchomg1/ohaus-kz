import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ImageIcon } from "lucide-react";
import Container from "@/components/ui/Container";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import Skeleton from "@/components/ui/Skeleton";
import Button from "@/components/ui/Button";
import { isKnownSubcategory, labelForSegment } from "@/lib/catalog";

export const dynamicParams = true;
export function generateStaticParams() {
  return [];
}

type Params = {
  category: string;
  subcategory: string;
  series: string;
  model: string;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { model } = await params;
  return { title: labelForSegment(model) };
}

export default async function ModelPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { category, subcategory, series, model } = await params;
  if (!isKnownSubcategory(category, subcategory)) notFound();

  const title = labelForSegment(model);

  return (
    <Container>
      <Breadcrumbs
        items={[
          { title: "Продукты", href: "/products" },
          { title: labelForSegment(category), href: `/products/${category}` },
          {
            title: labelForSegment(subcategory),
            href: `/products/${category}/${subcategory}`,
          },
          {
            title: labelForSegment(series),
            href: `/products/${category}/${subcategory}/${series}`,
          },
          { title },
        ]}
      />

      <div className="grid grid-cols-1 gap-8 pb-16 lg:grid-cols-2">
        {/* Gallery placeholder */}
        <div>
          <div className="flex aspect-square items-center justify-center border border-ohaus-line bg-ohaus-bg-soft">
            <ImageIcon className="h-16 w-16 text-ohaus-line" aria-hidden="true" />
          </div>
          <div className="mt-4 grid grid-cols-4 gap-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="aspect-square" />
            ))}
          </div>
        </div>

        {/* Info */}
        <div>
          <span className="font-heading text-xs font-bold uppercase tracking-wide text-ohaus-red">
            {labelForSegment(series)}
          </span>
          <h1 className="mt-2 font-heading text-2xl font-bold text-ohaus-ink sm:text-3xl">
            {title}
          </h1>

          <div className="mt-6 space-y-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-11/12" />
            <Skeleton className="h-4 w-10/12" />
          </div>

          <h2 className="mt-8 mb-3 font-heading text-lg font-bold text-ohaus-ink">
            Характеристики
          </h2>
          <dl className="divide-y divide-ohaus-line border-y border-ohaus-line">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="grid grid-cols-2 gap-4 py-3">
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </dl>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/quote">Узнать цену</Button>
            <Button href="/contacts" variant="outline">
              Связаться
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
}
