import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import PageHero, { PAGE_BG } from "@/components/layout/PageHero";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import Skeleton from "@/components/ui/Skeleton";

export const metadata: Metadata = {
  title: "О компании",
  description:
    "OHAUS Kazakhstan — официальное представительство OHAUS в Казахстане: поставка весового и лабораторного оборудования, гарантия производителя и сервис.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ title: "О компании" }]} />
      <PageHero
        title="О компании"
        subtitle="OHAUS Kazakhstan — официальное представительство OHAUS."
        crumbs={[{ title: "О компании" }]}
        image={PAGE_BG.company}
      />
      <Container className="max-w-3xl">
        <div className="space-y-3 py-12 lg:py-16">
          {Array.from({ length: 12 }).map((_, i) => (
            <Skeleton
              key={i}
              className="h-4"
              style={{ width: `${72 + ((i * 5) % 28)}%` }}
            />
          ))}
        </div>
      </Container>
    </>
  );
}
