import type { Metadata } from "next";
import {
  LifeBuoy,
  FileText,
  Download,
  Wrench,
  GraduationCap,
  BadgeCheck,
} from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import Skeleton from "@/components/ui/Skeleton";

export const metadata: Metadata = {
  title: "Поддержка",
  description: "Центр поддержки OHAUS Kazakhstan.",
};

const TILES = [
  { icon: FileText, title: "Документация" },
  { icon: Download, title: "Загрузки ПО и драйверов" },
  { icon: Wrench, title: "Сервис и ремонт" },
  { icon: BadgeCheck, title: "Калибровка и поверка" },
  { icon: GraduationCap, title: "Обучение" },
  { icon: LifeBuoy, title: "Часто задаваемые вопросы" },
];

export default function SupportPage() {
  return (
    <Container>
      <Breadcrumbs items={[{ title: "Поддержка" }]} />
      <SectionHeading
        as="h1"
        title="Поддержка"
        subtitle="Ресурсы поддержки появятся на следующем этапе."
      />
      <div className="grid grid-cols-1 gap-4 pb-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
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
  );
}
