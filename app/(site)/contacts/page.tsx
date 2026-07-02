import type { Metadata } from "next";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import { getSiteSettings } from "@/sanity/lib/queries";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Свяжитесь с нами",
  description: "Контакты представительства OHAUS в Казахстане.",
};

export default async function ContactsPage() {
  const s = await getSiteSettings();

  const details = [
    {
      icon: MapPin,
      label: "Адрес",
      value: s?.address || "Казахстан, [индекс], [город], [улица, офис]",
    },
    { icon: Phone, label: "Телефон", value: s?.phone || "+7 (___) ___-__-__" },
    { icon: Mail, label: "Email", value: s?.email || "info@ohaus.kz" },
    {
      icon: Clock,
      label: "Часы работы",
      value: s?.workingHours || "Пн–Пт, 09:00–18:00",
    },
  ];

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
          {details.map(({ icon: Icon, label, value }) => (
            <li key={label} className="flex gap-4">
              <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center bg-ohaus-bg-soft text-ohaus-red">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <p className="font-heading text-sm font-bold text-ohaus-ink">
                  {label}
                </p>
                <p className="whitespace-pre-line text-sm text-ohaus-muted">
                  {value}
                </p>
              </div>
            </li>
          ))}
        </ul>

        <div className="flex min-h-[260px] items-center justify-center border border-ohaus-line bg-ohaus-bg-soft">
          <MapPin className="h-10 w-10 text-ohaus-line" aria-hidden="true" />
        </div>
      </div>
    </Container>
  );
}
