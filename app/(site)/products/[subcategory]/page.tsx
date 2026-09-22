import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Send } from "lucide-react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import PageHero, { PAGE_BG } from "@/components/layout/PageHero";
import ProductCard from "@/components/ui/ProductCard";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { sectionCopy } from "@/lib/catalog-copy";
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
 * Описание для выдачи: сначала текст раздела (из Studio или из
 * lib/catalog-copy.ts), иначе — собранное из названия и моделей внутри.
 */
function listingDescription(data: NonNullable<SubcategoryListing>): string {
  const intro = data.description?.trim() || sectionCopy(data.slug)?.intro;
  if (intro) return metaDescription(intro);

  const names = data.products
    .slice(0, 3)
    .map((p) => p.name)
    .join(", ");
  const count = data.products.length;
  if (!count) {
    return metaDescription(
      `${data.title} OHAUS в Казахстане. Подбор оборудования, поставка и сервис.`,
    );
  }
  return metaDescription(
    `${data.title} OHAUS в Казахстане — ${count} ${plural(count)}: ${names}. Поставка и сервис от официального представительства.`,
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

  const copy = sectionCopy(data.slug);
  // Текст из Studio перекрывает текст по умолчанию.
  const intro = data.description?.trim() || copy?.intro;
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
          {intro ? (
            <p className="text-ohaus-ink/90 mb-10 max-w-3xl text-base leading-relaxed">
              {intro}
            </p>
          ) : null}

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

          {copy?.choosing?.length ? (
            <section className="mt-14 max-w-3xl">
              <h2 className="font-heading text-xl font-bold text-ohaus-ink sm:text-2xl">
                Как выбрать
              </h2>
              <span
                className="mt-3 block h-1 w-12 bg-ohaus-red"
                aria-hidden="true"
              />
              <ul className="mt-5 space-y-3">
                {copy.choosing.map((item, i) => (
                  <li
                    key={i}
                    className="text-ohaus-ink/90 border-l-2 border-ohaus-line pl-4 text-base leading-relaxed"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          <div className="mt-12 flex flex-col items-start gap-4 border border-ohaus-line bg-ohaus-bg-soft p-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-heading text-base font-bold text-ohaus-ink">
                Не уверены, какая модель подойдёт?
              </p>
              <p className="mt-1 text-sm text-ohaus-muted">
                Опишите задачу — подберём оборудование и пришлём предложение.
              </p>
            </div>
            <Button href="/request" className="flex-shrink-0">
              <Send className="h-4 w-4" aria-hidden="true" />
              Оставить заявку
            </Button>
          </div>
        </div>
      </Container>
    </>
  );
}
