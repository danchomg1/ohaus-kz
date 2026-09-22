import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ProductDetail from "@/components/catalog/ProductDetail";
import { BreadcrumbJsonLd, ProductJsonLd } from "@/components/seo/JsonLd";
import { urlFor } from "@/sanity/lib/image";
import { absoluteUrl, metaDescription } from "@/lib/site";
import { getProductParams, getProduct } from "@/sanity/lib/queries";

export const revalidate = 60;

export async function generateStaticParams() {
  return getProductParams();
}

type Params = { subcategory: string; product: string };

/** Первое фото галереи — для Open Graph и разметки товара. */
function coverUrl(gallery: unknown[] | undefined): string | undefined {
  const first = gallery?.[0] as { asset?: unknown } | undefined;
  if (!first?.asset) return undefined;
  return urlFor(first as never)
    .width(1200)
    .height(630)
    .fit("fill")
    .bg("ffffff")
    .url();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { subcategory, product } = await params;
  const data = await getProduct(product);
  if (!data) return { title: "Товар" };

  const path = `/products/${data.subcategory?.slug ?? subcategory}/${product}`;
  // Описание с ru.ohaus.com уже лежит в summary — берём его, иначе у всех
  // карточек в выдаче был бы один и тот же общий текст сайта.
  const description = metaDescription(data.summary);
  const image = coverUrl(data.gallery);

  return {
    title: data.name,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      title: `${data.name} | OHAUS Kazakhstan`,
      description,
      url: absoluteUrl(path),
      ...(image
        ? { images: [{ url: image, width: 1200, height: 630, alt: data.name }] }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: data.name,
      description,
      ...(image ? { images: [image] } : {}),
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { subcategory, product } = await params;
  const data = await getProduct(product);
  if (!data) notFound();

  const subSlug = data.subcategory?.slug ?? subcategory;
  const path = `/products/${subSlug}/${product}`;
  const crumbs = [
    { title: "Продукты", href: "/products" },
    {
      title: data.subcategory?.title ?? subcategory,
      href: `/products/${subSlug}`,
    },
    { title: data.name },
  ];

  return (
    <>
      <BreadcrumbJsonLd items={crumbs} />
      <ProductJsonLd
        name={data.name}
        description={data.summary}
        image={coverUrl(data.gallery)}
        series={data.series}
        path={path}
      />
      <ProductDetail product={data} slug={product} crumbs={crumbs} />
    </>
  );
}
