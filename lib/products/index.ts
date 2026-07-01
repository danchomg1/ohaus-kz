import { products } from "./data";
import type { Product } from "./types";

export type { Product, Spec } from "./types";
export { products } from "./data";

/** Detail path segments for a product: listing + model slug. */
export function productSegments(p: Product): string[] {
  return [...p.listing, p.model];
}

/** Internal href to a product detail page. */
export function productHref(p: Product): string {
  return `/products/${productSegments(p).join("/")}`;
}

/**
 * Local image base path (without extension) for a product, served from /public.
 * Convention: /products/<последний сегмент listing>/<model>
 * Gallery files: <base>.jpg (главное) + <base>1.jpg … <base>5.jpg (доп.).
 */
export function productImageBase(p: Product): string {
  const folder = p.listing[p.listing.length - 1];
  return `/products/${folder}/${p.model}`;
}

/** Main image path for a product (used on cards). */
export function productImage(p: Product): string {
  return `${productImageBase(p)}.jpg`;
}

function segEquals(a: string[], b: string[]): boolean {
  return a.length === b.length && a.every((x, i) => x === b[i]);
}

/** Products listed exactly at the given path. */
export function productsForListing(segments: string[]): Product[] {
  return products.filter((p) => segEquals(p.listing, segments));
}

/** Product whose detail path equals the given segments, if any. */
export function findProductByPath(segments: string[]): Product | undefined {
  return products.find((p) => segEquals(productSegments(p), segments));
}

/** Static params (param objects) for product detail pages of a given depth. */
export function productParamsByDepth(
  depth: 2 | 3 | 4,
): Record<string, string>[] {
  const keys = ["category", "subcategory", "series", "model"];
  return products
    .map(productSegments)
    .filter((s) => s.length === depth)
    .map((s) => Object.fromEntries(s.map((v, i) => [keys[i], v])));
}
