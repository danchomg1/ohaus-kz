import type { Metadata } from "next";
import CatalogView from "@/components/catalog/CatalogView";
import { catalogRouteParams, labelForSegment } from "@/lib/catalog";
import { findProductByPath } from "@/lib/products";

export const dynamicParams = true;

export function generateStaticParams() {
  return catalogRouteParams().categories;
}

type Params = { category: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { category } = await params;
  const product = findProductByPath([category]);
  return { title: product?.name ?? labelForSegment(category) };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { category } = await params;
  return <CatalogView segments={[category]} />;
}
