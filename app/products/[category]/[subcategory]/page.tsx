import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import ProductCard from "@/components/ui/ProductCard";
import {
  catalogRouteParams,
  isKnownSubcategory,
  labelForSegment,
} from "@/lib/catalog";

type Params = { category: string; subcategory: string };

export function generateStaticParams() {
  return catalogRouteParams().subcategories;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { subcategory } = await params;
  return { title: labelForSegment(subcategory) };
}

export default async function SubcategoryPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { category, subcategory } = await params;
  if (!isKnownSubcategory(category, subcategory)) notFound();

  const categoryTitle = labelForSegment(category);
  const title = labelForSegment(subcategory);

  return (
    <Container>
      <Breadcrumbs
        items={[
          { title: "Продукты", href: "/products" },
          { title: categoryTitle, href: `/products/${category}` },
          { title },
        ]}
      />
      <SectionHeading
        as="h1"
        title={title}
        subtitle="Подкатегория каталога. Список моделей — на следующем этапе."
      />
      <div className="grid grid-cols-2 gap-4 pb-12 sm:grid-cols-3 lg:grid-cols-4 lg:gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <ProductCard key={i} />
        ))}
      </div>
    </Container>
  );
}
