import type { Metadata } from "next";
import CatalogView from "@/components/catalog/CatalogView";
import { labelForSegment } from "@/lib/catalog";
import { findProductByPath, productParamsByDepth } from "@/lib/products";

export const dynamicParams = true;

export function generateStaticParams() {
  return productParamsByDepth(3);
}

type Params = { category: string; subcategory: string; series: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { category, subcategory, series } = await params;
  const product = findProductByPath([category, subcategory, series]);
  return { title: product?.name ?? labelForSegment(series) };
}

export default async function SeriesPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { category, subcategory, series } = await params;
  return <CatalogView segments={[category, subcategory, series]} />;
}
