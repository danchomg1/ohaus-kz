import { notFound } from "next/navigation";
import Link from "next/link";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Breadcrumbs, { type Crumb } from "@/components/layout/Breadcrumbs";
import ProductCard from "@/components/ui/ProductCard";
import ProductDetail from "./ProductDetail";
import {
  labelForSegment,
  isKnownPathPrefix,
  childCatalogLinks,
} from "@/lib/catalog";
import {
  findProductByPath,
  productsForListing,
  productHref,
} from "@/lib/products";

/** Breadcrumbs for a catalog path; the last segment is the current page. */
function buildCrumbs(segments: string[], lastTitle?: string): Crumb[] {
  const crumbs: Crumb[] = [{ title: "Продукты", href: "/products" }];
  segments.forEach((seg, i) => {
    const isLast = i === segments.length - 1;
    const title = isLast && lastTitle ? lastTitle : labelForSegment(seg);
    const href = `/products/${segments.slice(0, i + 1).join("/")}`;
    crumbs.push(isLast ? { title } : { title, href });
  });
  return crumbs;
}

export default function CatalogView({ segments }: { segments: string[] }) {
  // 1. Product detail page
  const product = findProductByPath(segments);
  if (product) {
    const crumbs = buildCrumbs(segments, product.name);
    return <ProductDetail product={product} crumbs={crumbs} />;
  }

  // 2. Product listing (this path holds products)
  const listed = productsForListing(segments);
  const title = labelForSegment(segments[segments.length - 1]);

  if (listed.length > 0) {
    return (
      <Container>
        <Breadcrumbs items={buildCrumbs(segments)} />
        <SectionHeading as="h1" title={title} />
        <div className="grid grid-cols-2 gap-4 pb-12 sm:grid-cols-3 lg:grid-cols-4 lg:gap-6">
          {listed.map((p) => (
            <ProductCard
              key={p.model}
              name={p.name}
              series={p.seriesLabel}
              image={p.image}
              href={productHref(p)}
            />
          ))}
        </div>
      </Container>
    );
  }

  // 3. Grouping node — list child catalog links
  const children = childCatalogLinks(segments);
  if (children.length > 0) {
    return (
      <Container>
        <Breadcrumbs items={buildCrumbs(segments)} />
        <SectionHeading as="h1" title={title} subtitle="Выберите раздел" />
        <ul className="grid grid-cols-1 gap-3 pb-12 sm:grid-cols-2 lg:grid-cols-3">
          {children.map((c) => (
            <li key={c.href}>
              <Link
                href={c.href}
                className="flex items-center justify-between border border-ohaus-line bg-white px-4 py-3 font-sans text-sm text-ohaus-red transition-shadow hover:shadow-card"
              >
                {c.title}
                <span aria-hidden="true">→</span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    );
  }

  // 4. Known catalog node without data yet — skeleton grid
  if (isKnownPathPrefix(segments)) {
    return (
      <Container>
        <Breadcrumbs items={buildCrumbs(segments)} />
        <SectionHeading
          as="h1"
          title={title}
          subtitle="Раздел каталога. Карточки товаров появятся на следующем этапе."
        />
        <div className="grid grid-cols-2 gap-4 pb-12 sm:grid-cols-3 lg:grid-cols-4 lg:gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <ProductCard key={i} />
          ))}
        </div>
      </Container>
    );
  }

  // 5. Unknown path
  notFound();
}
