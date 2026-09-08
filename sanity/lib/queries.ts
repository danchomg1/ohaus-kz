import { serverClient as client } from "./serverClient";

// ISR: опубликованные правки появляются на сайте в течение минуты.
const opts = { next: { revalidate: 60 } } as const;

// ---------- Типы ----------
export type SanityImage = { asset?: { _ref?: string }; alt?: string } | null;

export type NavLink = { title: string; slug: string };
export type NavGroup = { title: string; links: NavLink[] };
export type NavSegment = {
  title: string;
  slug: string;
  groups: NavGroup[];
};

export type ProductCardData = {
  name: string;
  slug: string;
  series?: string;
  image?: SanityImage;
};

export type SubcategoryListing = {
  title: string;
  slug: string;
  products: ProductCardData[];
} | null;

export type Spec = { label: string; value: string };
export type Detail = { label: string; value: string };
export type Feature = { text?: string; image?: SanityImage };
export type DocFile = {
  title: string;
  url?: string;
  ext?: string;
  size?: number;
};

export type ProductDetailData = {
  name: string;
  series?: string;
  summary?: string;
  gallery?: SanityImage[];
  specs?: Spec[];
  details?: Detail[];
  features?: Feature[];
  documents?: DocFile[];
  description?: unknown[];
  subcategory?: { title: string; slug: string };
} | null;

// ---------- Запросы ----------
export async function getNav(): Promise<NavSegment[]> {
  const raw = await client.fetch<
    {
      title: string;
      slug: string;
      groups?: ({ title?: string; links?: (NavLink | null)[] } | null)[];
    }[]
  >(
    `*[_type=="segment"]|order(order asc){
      title, "slug": slug.current,
      groups[]{
        title,
        "links": items[]->{ title, "slug": slug.current }
      }
    }`,
    {},
    opts,
  );

  // Ссылки на удалённые подкатегории приходят как null — отбрасываем их
  // вместе с группами, от которых ничего не осталось.
  return raw.map((seg) => ({
    title: seg.title,
    slug: seg.slug,
    groups: (seg.groups ?? []).flatMap((g) => {
      const links = (g?.links ?? []).filter(
        (l): l is NavLink => !!l?.slug && !!l.title,
      );
      return g?.title && links.length ? [{ title: g.title, links }] : [];
    }),
  }));
}

export type OverviewSegment = NavSegment;

export function getCatalogOverview(): Promise<OverviewSegment[]> {
  return getNav();
}

export function getSubcategorySlugs(): Promise<string[]> {
  return client.fetch(`*[_type=="subcategory"].slug.current`, {}, opts);
}

export function getSubcategoryListing(
  slug: string,
): Promise<SubcategoryListing> {
  return client.fetch(
    `*[_type=="subcategory" && slug.current==$slug][0]{
      title, "slug": slug.current,
      "products": *[_type=="product" && references(^._id)]|order(order asc){
        name, "slug": slug.current, series, "image": gallery[0]
      }
    }`,
    { slug },
    opts,
  );
}

/** Адреса и даты правок для карты сайта. */
export type SitemapEntry = { path: string; updatedAt?: string };

export async function getSitemapEntries(): Promise<SitemapEntry[]> {
  const [products, subcategories, news] = await Promise.all([
    client.fetch<{ slug: string; sub?: string; updatedAt: string }[]>(
      `*[_type=="product" && defined(slug.current) && defined(subcategory->slug.current)]{
        "slug": slug.current,
        "sub": subcategory->slug.current,
        "updatedAt": _updatedAt
      }`,
      {},
      opts,
    ),
    client.fetch<{ slug: string; updatedAt: string }[]>(
      `*[_type=="subcategory" && defined(slug.current)]{
        "slug": slug.current, "updatedAt": _updatedAt
      }`,
      {},
      opts,
    ),
    client.fetch<{ slug: string; updatedAt: string }[]>(
      `*[_type=="newsArticle" && defined(slug.current)]{
        "slug": slug.current, "updatedAt": _updatedAt
      }`,
      {},
      opts,
    ),
  ]);

  return [
    ...subcategories.map((s) => ({
      path: `/products/${s.slug}`,
      updatedAt: s.updatedAt,
    })),
    ...products.map((p) => ({
      path: `/products/${p.sub}/${p.slug}`,
      updatedAt: p.updatedAt,
    })),
    ...news.map((n) => ({ path: `/news/${n.slug}`, updatedAt: n.updatedAt })),
  ];
}

export function getProductParams(): Promise<
  { subcategory: string; product: string }[]
> {
  return client.fetch(
    `*[_type=="product"]{ "product": slug.current, "subcategory": subcategory->slug.current }`,
    {},
    opts,
  );
}

export function getProduct(slug: string): Promise<ProductDetailData> {
  return client.fetch(
    `*[_type=="product" && slug.current==$slug][0]{
      name, series, summary, gallery, specs, details,
      features[]{ text, image },
      "documents": documents[]{ title, "url": file.asset->url, "ext": file.asset->extension, "size": file.asset->size },
      description,
      "subcategory": subcategory->{ title, "slug": slug.current }
    }`,
    { slug },
    opts,
  );
}

// ---------- Настройки сайта ----------
export type SiteSettings = {
  logo?: SanityImage;
  companyName?: string;
  address?: string;
  phone?: string;
  email?: string;
  workingHours?: string;
  dealerUrl?: string;
} | null;

export function getSiteSettings(): Promise<SiteSettings> {
  return client.fetch(
    `*[_id=="siteSettings"][0]{ logo, companyName, address, phone, email, workingHours, dealerUrl }`,
    {},
    opts,
  );
}

// ---------- Главная ----------
export type HeroSlide = {
  series?: string;
  title?: string;
  subtitle?: string;
  ctaHref?: string;
  image?: SanityImage;
};
export type QuickLinkData = {
  title?: string;
  href?: string;
  image?: SanityImage;
};
export type HomepageData = {
  heroSlides?: HeroSlide[];
  quickLinks?: QuickLinkData[];
  promoTitle?: string;
  promoSubtitle?: string;
  promoHref?: string;
  promoImage?: SanityImage;
} | null;

export function getHomepage(): Promise<HomepageData> {
  return client.fetch(
    `*[_id=="homepage"][0]{ heroSlides, quickLinks, promoTitle, promoSubtitle, promoHref, promoImage }`,
    {},
    opts,
  );
}

// ---------- Новости ----------
export type NewsCard = {
  title: string;
  slug: string;
  date?: string;
  excerpt?: string;
  cover?: SanityImage;
};
export type NewsArticle = {
  title: string;
  date?: string;
  excerpt?: string;
  cover?: SanityImage;
  body?: unknown[];
} | null;

export function getNewsList(): Promise<NewsCard[]> {
  return client.fetch(
    `*[_type=="newsArticle"]|order(date desc){ title, "slug": slug.current, date, excerpt, cover }`,
    {},
    opts,
  );
}

export function getNewsSlugs(): Promise<string[]> {
  return client.fetch(`*[_type=="newsArticle"].slug.current`, {}, opts);
}

export function getNewsArticle(slug: string): Promise<NewsArticle> {
  return client.fetch(
    `*[_type=="newsArticle" && slug.current==$slug][0]{ title, date, excerpt, cover, body }`,
    { slug },
    opts,
  );
}
