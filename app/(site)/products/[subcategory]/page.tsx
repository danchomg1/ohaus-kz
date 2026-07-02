import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import ProductCard from "@/components/ui/ProductCard";
import { getSubcategorySlugs, getSubcategoryListing } from "@/sanity/lib/queries";

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await getSubcategorySlugs();
  return slugs.map((subcategory) => ({ subcategory }));
}

type Params = { subcategory: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { subcategory } = await params;
  const data = await getSubcategoryListing(subcategory);
  return { title: data?.title ?? "Каталог" };
}

export default async function SubcategoryPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { subcategory } = await params;
  const data = await getSubcategoryListing(subcategory);
  if (!data) notFound();

  return (
    <Container>
      <Breadcrumbs
        items={[{ title: "Продукты", href: "/products" }, { title: data.title }]}
      />
      <SectionHeading as="h1" title={data.title} />

      {data.products.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 pb-12 sm:grid-cols-3 lg:grid-cols-4 lg:gap-6">
          {data.products.map((p) => (
            <ProductCard
              key={p.slug}
              name={p.name}
              series={p.series}
              image={p.image}
              href={`/products/${data.slug}/${p.slug}`}
            />
          ))}
        </div>
      ) : (
        <p className="pb-12 text-ohaus-muted">
          В этом разделе пока нет моделей.
        </p>
      )}
    </Container>
  );
}
