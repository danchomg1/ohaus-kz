// Catalog taxonomy for OHAUS Kazakhstan.
// Organized by market segment -> group -> subcategory link.
// Slugs are kept as on the real site (ru.ohaus.com); some are full paths
// (products/...) and some are short (portable-scales-2).

export type Link = { title: string; slug: string }; // subcategory
export type Group = { title: string; links: Link[] }; // group (Весы / Оборудование / ...)
export type Segment = {
  title: string;
  slug: string;
  groups: Group[];
  promo?: { title: string; slug: string }; // segment promo card
};

export const catalog: Segment[] = [
  {
    title: "Лабораторные",
    slug: "lab",
    promo: {
      title: "Полумикровесы Explorer™",
      slug: "products/balances-scales/analytical-balances",
    },
    groups: [
      {
        title: "Весы",
        links: [
          {
            title: "Аналитические весы",
            slug: "products/balances-scales/analytical-balances",
          },
          {
            title: "Прецизионные весы",
            slug: "products/balances-scales/precision-balances",
          },
          { title: "Портативные весы", slug: "portable-scales-2" },
        ],
      },
      {
        title: "Оборудование",
        links: [
          { title: "Центрифуги", slug: "products/equipment/centrifuges" },
          {
            title: "Открытые шейкеры",
            slug: "products/equipment/open-air-shakers",
          },
          {
            title:
              "Шейкеры-инкубаторы и шейкеры-инкубаторы с охлаждением",
            slug: "products/equipment/incubating-incubating-cooling-shakers",
          },
          {
            title: "Вихревые смесители",
            slug: "products/equipment/laboratory-vortex-mixers",
          },
          {
            title: "Твердотельные термостаты",
            slug: "products/equipment/dry-block-heaters",
          },
          {
            title: "Верхнеприводные мешалки",
            slug: "products/equipment/overhead-stirrers",
          },
          {
            title: "Нагревательные плиты и мешалки",
            slug: "products/equipment/hotplates-stirrers",
          },
          {
            title: "Зажимы LabJaws и подставки",
            slug: "products/equipment/labjaws-clamps-supports",
          },
        ],
      },
      {
        title: "Контрольно-измерительные приборы",
        links: [
          {
            title: "Анализаторы жидкости и электроды",
            slug: "products/instruments-equipment/water-analysis",
          },
        ],
      },
      {
        title: "Анализаторы влажности",
        links: [
          {
            title: "Анализаторы влагосодержания",
            slug: "products/balances-scales/moisture-analyzers",
          },
        ],
      },
      {
        title: "Гири",
        links: [
          {
            title: "Калибровочные гири",
            slug: "products/weights/calibration-weights",
          },
        ],
      },
    ],
  },
  {
    title: "Промышленные",
    slug: "industrial",
    promo: {
      title: "Defender™ 3000, нержавеющая сталь",
      slug: "products/balances-scales/bench-scales",
    },
    groups: [
      {
        title: "Промышленные весы",
        links: [
          {
            title: "Платформенные весы",
            slug: "products/balances-scales/bench-scales",
          },
          {
            title: "Счетные весы",
            slug: "products/balances-scales/counting-scales",
          },
          {
            title: "Напольные весы",
            slug: "products/balances-scales/floor-scales",
          },
        ],
      },
      {
        title: "Весы",
        links: [
          {
            title: "Прецизионные весы",
            slug: "products/balances-scales/precision-balances",
          },
          { title: "Портативные весы", slug: "portable-scales-2" },
        ],
      },
      {
        title: "Лабораторное оборудование",
        links: [
          {
            title: "Верхнеприводные мешалки",
            slug: "products/equipment/overhead-stirrers",
          },
        ],
      },
      {
        title: "Компоненты весов",
        links: [
          {
            title: "Терминалы",
            slug: "products/balances-scales/indicators",
          },
        ],
      },
      {
        title: "Анализаторы влажности",
        links: [
          {
            title: "Анализаторы влагосодержания",
            slug: "products/balances-scales/moisture-analyzers",
          },
        ],
      },
    ],
  },
  {
    title: "Торговые",
    slug: "retail",
    promo: {
      title: "Scout™ SJX",
      slug: "products/balances-scales/jewelry-scales",
    },
    groups: [
      {
        title: "Весы",
        links: [
          {
            title: "Ювелирные весы",
            slug: "products/balances-scales/jewelry-scales",
          },
        ],
      },
    ],
  },
  {
    title: "Пищевая промышленность",
    slug: "food",
    promo: {
      title: "Valor™ 4000",
      slug: "products/balances-scales/bench-scales",
    },
    groups: [
      {
        title: "Весы",
        links: [
          {
            title: "Платформенные весы",
            slug: "products/balances-scales/bench-scales",
          },
          {
            title: "Анализаторы влагосодержания",
            slug: "products/balances-scales/moisture-analyzers",
          },
        ],
      },
    ],
  },
  {
    title: "Образование",
    slug: "education",
    groups: [
      {
        title: "Весы",
        links: [
          {
            title: "Механические весы",
            slug: "products/balances-scales/mechanical-scales",
          },
        ],
      },
    ],
  },
];

// ----------------------------------------------------------------------------
// Routing helpers
// ----------------------------------------------------------------------------

/** Build an internal href from a catalog slug, always rooted under /products. */
export function hrefForSlug(slug: string): string {
  const clean = slug.replace(/^\/+/, "");
  return clean.startsWith("products/") ? `/${clean}` : `/products/${clean}`;
}

/** Path segments after the leading "products/" prefix. */
export function productPathSegments(slug: string): string[] {
  const clean = slug.replace(/^\/+/, "").replace(/^products\//, "");
  return clean.split("/").filter(Boolean);
}

/** Every unique subcategory link across all segments. */
export function allLinks(): Link[] {
  const seen = new Set<string>();
  const out: Link[] = [];
  for (const segment of catalog) {
    for (const group of segment.groups) {
      for (const link of group.links) {
        if (!seen.has(link.slug)) {
          seen.add(link.slug);
          out.push(link);
        }
      }
    }
  }
  return out;
}

/** Human-readable title for a known slug, or null if unknown. */
export function titleForSlug(slug: string): string | null {
  for (const link of allLinks()) {
    if (productPathSegments(link.slug).join("/") === slug) return link.title;
  }
  return null;
}

/** Find a segment by its slug. */
export function segmentBySlug(slug: string): Segment | undefined {
  return catalog.find((s) => s.slug === slug);
}

type Params = { category?: string; subcategory?: string };

/** All unique route params derived from the catalog, by depth. */
export function catalogRouteParams(): {
  categories: { category: string }[];
  subcategories: { category: string; subcategory: string }[];
} {
  const categories = new Set<string>();
  const subcategories = new Map<string, Params>();

  for (const link of allLinks()) {
    const seg = productPathSegments(link.slug);
    if (seg[0]) categories.add(seg[0]);
    if (seg[0] && seg[1]) {
      subcategories.set(`${seg[0]}/${seg[1]}`, {
        category: seg[0],
        subcategory: seg[1],
      });
    }
  }

  return {
    categories: [...categories].map((category) => ({ category })),
    subcategories: [...subcategories.values()].map((p) => ({
      category: p.category!,
      subcategory: p.subcategory!,
    })),
  };
}

/** True if the given category segment exists in the catalog. */
export function isKnownCategory(category: string): boolean {
  return catalogRouteParams().categories.some((c) => c.category === category);
}

/** True if the given category/subcategory pair exists in the catalog. */
export function isKnownSubcategory(
  category: string,
  subcategory: string,
): boolean {
  return catalogRouteParams().subcategories.some(
    (s) => s.category === category && s.subcategory === subcategory,
  );
}

/** RU labels for top-level category path segments (not titled in the catalog). */
const CATEGORY_LABELS: Record<string, string> = {
  "balances-scales": "Весы и весовое оборудование",
  equipment: "Лабораторное оборудование",
  "instruments-equipment": "Контрольно-измерительные приборы",
  weights: "Гири",
  "portable-scales-2": "Портативные весы",
};

/** Pretty label for a raw route slug (de-kebab) with a catalog title fallback. */
export function labelForSegment(slug: string): string {
  const known = titleForSlug(slug);
  if (known) return known;
  if (CATEGORY_LABELS[slug]) return CATEGORY_LABELS[slug];
  const decoded = decodeURIComponent(slug);
  return decoded
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

/** True if any catalog link path starts with the given segments (valid node). */
export function isKnownPathPrefix(segments: string[]): boolean {
  if (segments.length === 0) return true;
  return allLinks().some((link) => {
    const seg = productPathSegments(link.slug);
    return (
      seg.length >= segments.length &&
      segments.every((s, i) => s === seg[i])
    );
  });
}

/** Immediate child catalog nodes one level below the given path. */
export function childCatalogLinks(
  segments: string[],
): { title: string; href: string }[] {
  const seen = new Set<string>();
  const out: { title: string; href: string }[] = [];
  for (const link of allLinks()) {
    const seg = productPathSegments(link.slug);
    const isUnder =
      seg.length > segments.length &&
      segments.every((s, i) => s === seg[i]);
    if (!isUnder) continue;
    const childSegments = seg.slice(0, segments.length + 1);
    const key = childSegments.join("/");
    if (seen.has(key)) continue;
    seen.add(key);
    // If the child is the link's own leaf, use its catalog title.
    const title =
      childSegments.length === seg.length
        ? link.title
        : labelForSegment(childSegments[childSegments.length - 1]);
    out.push({ title, href: `/products/${key}` });
  }
  return out;
}
