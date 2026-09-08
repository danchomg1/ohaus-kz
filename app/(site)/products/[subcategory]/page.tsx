import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import PageHero, { PAGE_BG } from "@/components/layout/PageHero";
import ProductCard from "@/components/ui/ProductCard";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { absoluteUrl, metaDescription } from "@/lib/site";
import {
  getSubcategorySlugs,
  getSubcategoryListing,
  type SubcategoryListing,
} from "@/sanity/lib/queries";

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await getSubcategorySlugs();
  return slugs.map((subcategory) => ({ subcategory }));
}

type Params = { subcategory: string };

/**
 * У раздела нет своего текста в CMS, поэтому описание собираем из названия
 * и моделей внутри: так у каждого раздела свой сниппет, а не общий текст сайта.
 */
function listingDescription(data: NonNullable<SubcategoryListing>): string {
  const names = data.products
    .slice(0, 3)
    .map((p) => p.name)
    .join(", ");
  const count = data.products.length;
  if (!count) {
    return metaDescription(
      `${data.title} OHAUS в Казахстане. Подбор оборудования, поставка, сервис и поверка.`,
    );
  }
  return metaDescription(
    `${data.title} OHAUS в Казахстане — ${count} ${plural(count)}: ${names}. Поставка, сервис и поверка от официального представительства.`,
  );
}

function plural(n: number): string {
  const d = n % 10;
  const h = n % 100;
  if (d === 1 && h !== 11) return "модель";
  if (d >= 2 && d <= 4 && (h < 12 || h > 14)) return "модели";
  return "моделей";
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { subcategory } = await params;
  const data = await getSubcategoryListing(subcategory);
  if (!data) return { title: "Каталог" };

  const path = `/products/${data.slug}`;
  const description = listingDescription(data);

  return {
    title: data.title,
    description,
    alternates: { canonical: path },
    // Раздел без моделей — пустая страница; в индексе ей делать нечего.
    // Появятся товары — запрет снимется сам.
    ...(data.products.length === 0
      ? { robots: { index: false, follow: true } }
      : {}),
    openGraph: {
      type: "website",
      title: `${data.title} | OHAUS Kazakhstan`,
      description,
      url: absoluteUrl(path),
    },
  };
}

export default async function SubcategoryPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { subcategory } = await params;
  const data = await getSubcategoryListing(subcategory);
  if (!data) notFound();

  const crumbs = [
    { title: "Продукты", href: "/products" },
    { title: data.title },
  ];

  return (
    <>
      <BreadcrumbJsonLd items={crumbs} />
      <PageHero
        eyebrow="Каталог"
        title={data.title}
        crumbs={crumbs}
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
