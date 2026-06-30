import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import ProductCard from "@/components/ui/ProductCard";
import { isKnownSubcategory, labelForSegment } from "@/lib/catalog";

// Series/model depth is beyond the catalog data — render skeletons on demand.
export const dynamicParams = true;
export function generateStaticParams() {
  return [];
}

type Params = { category: string; subcategory: string; series: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { series } = await params;
  return { title: labelForSegment(series) };
}

export default async function SeriesPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { category, subcategory, series } = await params;
  if (!isKnownSubcategory(category, subcategory)) notFound();

  const categoryTitle = labelForSegment(category);
  const subcategoryTitle = labelForSegment(subcategory);
  const title = labelForSegment(series);

  return (
    <Container>
      <Breadcrumbs
        items={[
          { title: "Продукты", href: "/products" },
          { title: categoryTitle, href: `/products/${category}` },
          {
            title: subcategoryTitle,
            href: `/products/${category}/${subcategory}`,
          },
          { title },
        ]}
      />
      <SectionHeading
        as="h1"
        title={title}
        subtitle="Серия продуктов. Модели и характеристики — на следующем этапе."
      />
      <div className="grid grid-cols-2 gap-4 pb-12 sm:grid-cols-3 lg:grid-cols-4 lg:gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <ProductCard key={i} />
        ))}
      </div>
    </Container>
  );
}
