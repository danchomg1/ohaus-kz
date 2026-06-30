import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import ProductCard from "@/components/ui/ProductCard";
import {
  catalogRouteParams,
  isKnownCategory,
  labelForSegment,
} from "@/lib/catalog";

type Params = { category: string };

export function generateStaticParams() {
  return catalogRouteParams().categories;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { category } = await params;
  return { title: labelForSegment(category) };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { category } = await params;
  if (!isKnownCategory(category)) notFound();

  const title = labelForSegment(category);

  return (
    <Container>
      <Breadcrumbs
        items={[{ title: "Продукты", href: "/products" }, { title }]}
      />
      <SectionHeading
        as="h1"
        title={title}
        subtitle="Раздел каталога. Карточки товаров появятся на следующем этапе."
      />
      <div className="grid grid-cols-2 gap-4 pb-12 sm:grid-cols-3 lg:grid-cols-4 lg:gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <ProductCard key={i} />
        ))}
      </div>
    </Container>
  );
}
