import type { Metadata } from "next";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import Skeleton from "@/components/ui/Skeleton";

export const metadata: Metadata = {
  title: "Свяжитесь с нами",
  description: "Контакты представительства OHAUS в Казахстане.",
};

const DETAILS = [
  { icon: MapPin, label: "Адрес", value: "Казахстан, [индекс], [город], [улица, офис]" },
  { icon: Phone, label: "Телефон", value: "+7 (___) ___-__-__" },
  { icon: Mail, label: "Email", value: "info@ohaus.kz" },
  { icon: Clock, label: "Часы работы", value: "Пн–Пт, 09:00–18:00" },
];

export default function ContactsPage() {
  return (
    <Container>
      <Breadcrumbs items={[{ title: "Свяжитесь с нами" }]} />
      <SectionHeading
        as="h1"
        title="Свяжитесь с нами"
        subtitle="Контакты представительства OHAUS в Казахстане."
      />

      <div className="grid grid-cols-1 gap-8 pb-16 lg:grid-cols-2">
        <ul className="space-y-5">
          {DETAILS.map(({ icon: Icon, label, value }) => (
            <li key={label} className="flex gap-4">
              <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center bg-ohaus-bg-soft text-ohaus-red">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <p className="font-heading text-sm font-bold text-ohaus-ink">
                  {label}
                </p>
                <p className="text-sm text-ohaus-muted">{value}</p>
              </div>
            </li>
          ))}
        </ul>

        {/* Map placeholder */}
        <div className="flex min-h-[260px] items-center justify-center border border-ohaus-line bg-ohaus-bg-soft">
          <div className="text-center">
            <MapPin
              className="mx-auto h-10 w-10 text-ohaus-line"
              aria-hidden="true"
            />
            <Skeleton className="mx-auto mt-3 h-3 w-40" />
          </div>
        </div>
      </div>
    </Container>
  );
}
