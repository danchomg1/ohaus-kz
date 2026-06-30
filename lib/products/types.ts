// Real product data model (stage 2). A product belongs to a "listing" path
// (the catalog node where it is listed) and has a unique model slug under it.

export type Spec = { label: string; value: string };

export type Product = {
  /** Path segments of the listing page, e.g. ["balances-scales","analytical-balances"]. */
  listing: string[];
  /** Unique model slug within the listing. */
  model: string;
  /** Display name (RU). */
  name: string;
  /** Series slug, e.g. "explorer". */
  series: string;
  /** Series label, e.g. "Explorer™". */
  seriesLabel: string;
  /** Full image URL (OHAUS CDN). */
  image: string;
  /** Short original RU description. */
  summary: string;
  /** Factual technical specs. */
  specs: Spec[];
};
