import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ProductDetail from "@/components/catalog/ProductDetail";
import { getProductParams, getProduct } from "@/sanity/lib/queries";

export const revalidate = 60;

export async function generateStaticParams() {
  return getProductParams();
}

type Params = { subcategory: string; product: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { product } = await params;
  const data = await getProduct(product);
  return { title: data?.name ?? "Товар" };
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

  return (
    <ProductDetail
      product={data}
      crumbs={[
        { title: "Продукты", href: "/products" },
        {
          title: data.subcategory?.title ?? subcategory,
          href: `/products/${subSlug}`,
        },
        { title: data.name },
      ]}
    />
  );
}
