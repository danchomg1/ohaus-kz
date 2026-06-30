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
