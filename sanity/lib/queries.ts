import { serverClient as client } from "./serverClient";

// ISR: опубликованные правки появляются на сайте в течение минуты.
const opts = { next: { revalidate: 60 } } as const;

// ---------- Типы ----------
export type SanityImage = { asset?: { _ref?: string }; alt?: string } | null;

export type NavSub = { title: string; slug: string; group: string };
export type NavSegment = {
  title: string;
  slug: string;
  subcategories: NavSub[];
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
  features?: Feature[];
  documents?: DocFile[];
  description?: unknown[];
  subcategory?: { title: string; slug: string };
} | null;

// ---------- Запросы ----------
export function getNav(): Promise<NavSegment[]> {
  return client.fetch(
    `*[_type=="segment"]|order(order asc){
      title, "slug": slug.current,
      "subcategories": *[_type=="subcategory" && references(^._id)]|order(order asc){
        title, "slug": slug.current, group
      }
    }`,
    {},
    opts,
  );
}

export type OverviewSegment = {
  title: string;
  slug: string;
  groups: { title: string; links: { title: string; slug: string }[] }[];
};

export async function getCatalogOverview(): Promise<OverviewSegment[]> {
  const nav = await getNav();
  return nav.map((seg) => {
    const groupsMap = new Map<string, { title: string; slug: string }[]>();
    for (const s of seg.subcategories) {
      const arr = groupsMap.get(s.group) ?? [];
      arr.push({ title: s.title, slug: s.slug });
      groupsMap.set(s.group, arr);
    }
    return {
      title: seg.title,
      slug: seg.slug,
      groups: [...groupsMap.entries()].map(([title, links]) => ({
        title,
        links,
      })),
    };
  });
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
      name, series, summary, gallery, specs,
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
export type QuickLinkData = { title?: string; href?: string; image?: SanityImage };
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
    `*[_type=="newsArticle" && slug.current==$slug][0]{ title, date, cover, body }`,
    { slug },
    opts,
  );
}
