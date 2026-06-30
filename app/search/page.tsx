import type { Metadata } from "next";
import { SearchX } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import SearchBox from "@/components/layout/SearchBox";

export const metadata: Metadata = {
  title: "Поиск",
  description: "Поиск по сайту OHAUS Kazakhstan.",
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = (q ?? "").trim();

  return (
    <Container className="max-w-3xl">
      <Breadcrumbs items={[{ title: "Поиск" }]} />
      <SectionHeading
        as="h1"
        title="Результаты поиска"
        subtitle={
          query
            ? `Запрос: «${query}»`
            : "Введите запрос, чтобы найти продукты и материалы."
        }
      />

      <div className="mb-10 max-w-md">
        <SearchBox fullWidth />
      </div>

      {/* Scaffold only — search has no logic at this stage */}
      <div className="flex flex-col items-center justify-center gap-3 border border-dashed border-ohaus-line py-16 text-center">
        <SearchX className="h-10 w-10 text-ohaus-line" aria-hidden="true" />
        <p className="text-sm text-ohaus-muted">
          Поиск будет подключён на следующем этапе.
        </p>
      </div>
    </Container>
  );
}
