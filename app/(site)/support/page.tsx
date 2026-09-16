import type { Metadata } from "next";
import { FileText, Wrench, GraduationCap } from "lucide-react";
import Container from "@/components/ui/Container";
import PageHero, { PAGE_BG } from "@/components/layout/PageHero";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import Skeleton from "@/components/ui/Skeleton";

export const metadata: Metadata = {
  title: "Поддержка",
  description:
    "Поддержка OHAUS в Казахстане: документация и руководства по оборудованию, сервис и ремонт, обучение работе с весами и лабораторными приборами.",
  alternates: { canonical: "/support" },
};

const TILES = [
  { icon: FileText, title: "Документация" },
  { icon: Wrench, title: "Сервис и ремонт" },
  { icon: GraduationCap, title: "Обучение" },
];

export default function SupportPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ title: "Поддержка" }]} />
      <PageHero
        title="Поддержка"
        subtitle="Ресурсы поддержки появятся на следующем этапе."
        crumbs={[{ title: "Поддержка" }]}
        image={PAGE_BG.service}
      />
      <Container>
        <div className="grid grid-cols-1 gap-4 py-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6 lg:py-16">
          {TILES.map(({ icon: Icon, title }) => (
            <div
              key={title}
              className="flex items-start gap-4 border border-ohaus-line bg-white p-6"
            >
              <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center bg-ohaus-bg-soft text-ohaus-red">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <div className="flex-1">
                <h2 className="font-heading text-sm font-bold text-ohaus-ink">
                  {title}
                </h2>
                <div className="mt-2 space-y-2">
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-4/5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </>
  );
}
