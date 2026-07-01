import type { Metadata } from "next";
import CatalogView from "@/components/catalog/CatalogView";
import { catalogRouteParams, labelForSegment } from "@/lib/catalog";
import { findProductByPath, productParamsByDepth } from "@/lib/products";

export const dynamicParams = true;

export function generateStaticParams() {
  return [...catalogRouteParams().subcategories, ...productParamsByDepth(2)];
}

type Params = { category: string; subcategory: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { category, subcategory } = await params;
  const product = findProductByPath([category, subcategory]);
  return { title: product?.name ?? labelForSegment(subcategory) };
}

export default async function SubcategoryPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { category, subcategory } = await params;
  return <CatalogView segments={[category, subcategory]} />;
}
