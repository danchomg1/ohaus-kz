import type { Metadata } from "next";
import { MapPin, Phone, Mail, Clock, ExternalLink, Send } from "lucide-react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import PageHero, { PAGE_BG } from "@/components/layout/PageHero";
import { BreadcrumbJsonLd, LocalBusinessJsonLd } from "@/components/seo/JsonLd";
import { resolveContacts } from "@/lib/contacts";
import { getSiteSettings } from "@/sanity/lib/queries";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Свяжитесь с нами",
  description:
    "Контакты официального представительства OHAUS в Казахстане: офис в Астане, телефон, электронная почта и часы работы. Поможем подобрать оборудование под задачу.",
  alternates: { canonical: "/contacts" },
};

export default async function ContactsPage() {
  const c = resolveContacts(await getSiteSettings());

  return (
    <>
      <BreadcrumbJsonLd items={[{ title: "Свяжитесь с нами" }]} />
      <LocalBusinessJsonLd
        phone={c.phone}
        email={c.email}
        address={c.fullAddress}
        hours={c.workingHours}
      />
      <PageHero
        title="Свяжитесь с нами"
        subtitle="Контакты представительства OHAUS в Казахстане."
        crumbs={[{ title: "Свяжитесь с нами" }]}
        image={PAGE_BG.company}
      />
      <Container>
        <div className="grid grid-cols-1 gap-10 py-12 lg:grid-cols-2 lg:gap-14 lg:py-16">
          <div>
            {c.city ? (
              <h2 className="mb-5 font-heading text-xl font-bold text-ohaus-ink">
                Офис в {c.city === "Астана" ? "Астане" : c.city}
              </h2>
            ) : null}

            <ul className="space-y-5">
              <li className="flex gap-4">
                <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center bg-ohaus-bg-soft text-ohaus-red">
                  <MapPin className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="font-heading text-sm font-bold text-ohaus-ink">
                    Адрес
                  </p>
                  <p className="text-sm text-ohaus-muted">{c.address}</p>
                  <a
                    href={c.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-ohaus-red hover:underline"
                  >
                    Открыть на карте
                    <ExternalLink className="h-3 w-3" aria-hidden="true" />
                  </a>
                </div>
              </li>

              <li className="flex gap-4">
                <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center bg-ohaus-bg-soft text-ohaus-red">
                  <Phone className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="font-heading text-sm font-bold text-ohaus-ink">
                    Телефон
                  </p>
                  <a
                    href={c.phoneHref}
                    className="text-sm text-ohaus-muted transition-colors hover:text-ohaus-red"
                  >
                    {c.phone}
                  </a>
                </div>
              </li>

              <li className="flex gap-4">
                <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center bg-ohaus-bg-soft text-ohaus-red">
                  <Mail className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="font-heading text-sm font-bold text-ohaus-ink">
                    Email
                  </p>
                  <a
                    href={`mailto:${c.email}`}
                    className="text-sm text-ohaus-muted transition-colors hover:text-ohaus-red"
                  >
                    {c.email}
                  </a>
                </div>
              </li>

              <li className="flex gap-4">
                <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center bg-ohaus-bg-soft text-ohaus-red">
                  <Clock className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="font-heading text-sm font-bold text-ohaus-ink">
                    Часы работы
                  </p>
                  <p className="text-sm text-ohaus-muted">{c.workingHours}</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="flex flex-col justify-center border border-ohaus-line bg-ohaus-bg-soft p-8">
            <h2 className="font-heading text-xl font-bold text-ohaus-ink">
              Нужна консультация?
            </h2>
            <p className="mt-2 text-sm text-ohaus-muted">
              Оставьте заявку — менеджер перезвонит, поможет подобрать модель
              под задачу и подготовит коммерческое предложение.
            </p>
            <div className="mt-6">
              <Button href="/request" size="lg">
                <Send className="h-4 w-4" aria-hidden="true" />
                Оставить заявку
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
