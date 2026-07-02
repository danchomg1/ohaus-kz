import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import { getCatalogOverview } from "@/sanity/lib/queries";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Все продукты",
  description: "Полный каталог продукции OHAUS по сегментам рынка.",
};

export default async function ProductsPage() {
  const segments = await getCatalogOverview();

  return (
    <Container>
      <Breadcrumbs items={[{ title: "Продукты" }]} />
      <SectionHeading
        as="h1"
        title="Все продукты"
        subtitle="Каталог OHAUS по сегментам рынка"
      />

      <div className="space-y-12 pb-12">
        {segments.map((segment) => (
          <section key={segment.slug} aria-label={segment.title}>
            <h2 className="mb-4 border-b border-ohaus-line pb-2 font-heading text-xl font-bold text-ohaus-ink">
              {segment.title}
            </h2>
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
              {segment.groups.map((group) => (
                <div key={`${segment.slug}-${group.title}`}>
                  <h3 className="mb-2 font-heading text-sm font-bold uppercase tracking-wide text-ohaus-muted">
                    {group.title}
                  </h3>
                  <ul className="space-y-1.5">
                    {group.links.map((link) => (
                      <li key={link.slug}>
                        <Link
                          href={`/products/${link.slug}`}
                          className="font-sans text-sm text-ohaus-red transition-colors hover:text-ohaus-red-dark hover:underline"
                        >
                          {link.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </Container>
  );
}
