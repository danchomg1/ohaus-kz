import type { Metadata } from "next";
import Link from "next/link";
import { ImageIcon } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import Skeleton from "@/components/ui/Skeleton";

export const metadata: Metadata = {
  title: "Новости",
  description: "Новости и события OHAUS Kazakhstan.",
};

export default function NewsPage() {
  return (
    <Container>
      <Breadcrumbs items={[{ title: "Новости" }]} />
      <SectionHeading
        as="h1"
        title="Новости"
        subtitle="Публикации появятся на следующем этапе."
      />
      <div className="grid grid-cols-1 gap-6 pb-12 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Link
            key={i}
            href={`/news/placeholder-${i + 1}`}
            className="group flex flex-col border border-ohaus-line bg-white transition-shadow hover:shadow-card"
          >
            <div className="flex aspect-[16/9] items-center justify-center bg-ohaus-bg-soft">
              <ImageIcon
                className="h-10 w-10 text-ohaus-line"
                aria-hidden="true"
              />
            </div>
            <div className="space-y-2 p-4">
              <Skeleton className="h-3 w-1/4" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-5/6" />
            </div>
          </Link>
        ))}
      </div>
    </Container>
  );
}
