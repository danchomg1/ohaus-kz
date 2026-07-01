import type { Metadata } from "next";
import CatalogView from "@/components/catalog/CatalogView";
import { labelForSegment } from "@/lib/catalog";
import { findProductByPath, productParamsByDepth } from "@/lib/products";

export const dynamicParams = true;

export function generateStaticParams() {
  return productParamsByDepth(4);
}

type Params = {
  category: string;
  subcategory: string;
  series: string;
  model: string;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { category, subcategory, series, model } = await params;
  const product = findProductByPath([category, subcategory, series, model]);
  return { title: product?.name ?? labelForSegment(model) };
}

export default async function ModelPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { category, subcategory, series, model } = await params;
  return <CatalogView segments={[category, subcategory, series, model]} />;
}
