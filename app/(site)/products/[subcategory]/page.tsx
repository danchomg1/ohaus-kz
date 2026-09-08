import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import PageHero, { PAGE_BG } from "@/components/layout/PageHero";
import ProductCard from "@/components/ui/ProductCard";
import {
  getSubcategorySlugs,
  getSubcategoryListing,
} from "@/sanity/lib/queries";

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
    <>
      <PageHero
        eyebrow="Каталог"
        title={data.title}
        crumbs={[
          { title: "Продукты", href: "/products" },
          { title: data.title },
        ]}
        image={PAGE_BG.catalog}
      />
      <Container>
        <div className="py-12 lg:py-16">
          {data.products.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 lg:gap-6">
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
            <p className="text-ohaus-muted">В этом разделе пока нет моделей.</p>
          )}
        </div>
      </Container>
    </>
  );
}
