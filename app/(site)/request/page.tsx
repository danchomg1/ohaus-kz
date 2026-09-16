import type { Metadata } from "next";
import { Phone, Mail, Clock, MapPin } from "lucide-react";
import Container from "@/components/ui/Container";
import PageHero, { PAGE_BG } from "@/components/layout/PageHero";
import RequestForm from "@/components/forms/RequestForm";
import { resolveContacts } from "@/lib/contacts";
import { getSiteSettings } from "@/sanity/lib/queries";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Оставить заявку",
  description:
    "Оставьте заявку на оборудование OHAUS — менеджер свяжется с вами, поможет подобрать модель и подготовит коммерческое предложение.",
  // Форма — не посадочная страница, в индексе ей делать нечего.
  robots: { index: false, follow: true },
};

export default async function RequestPage({
  searchParams,
}: {
  searchParams: Promise<{ product?: string }>;
}) {
  const [{ product }, settings] = await Promise.all([
    searchParams,
    getSiteSettings(),
  ]);
  const c = resolveContacts(settings);
  const productName = (product ?? "").trim().slice(0, 200) || undefined;

  return (
    <>
      <PageHero
        title="Оставить заявку"
        subtitle="Расскажите, что нужно — менеджер перезвонит, поможет подобрать модель и подготовит предложение."
        crumbs={[{ title: "Оставить заявку" }]}
        image={PAGE_BG.catalog}
      />
      <Container>
        <div className="grid grid-cols-1 gap-10 py-12 lg:grid-cols-[1fr_320px] lg:gap-14 lg:py-16">
          <RequestForm product={productName} />

          <aside className="lg:pt-1">
            <h2 className="font-heading text-sm font-bold uppercase tracking-wide text-ohaus-ink">
              Или напрямую
            </h2>
            <ul className="mt-4 space-y-4 text-sm">
              <li className="flex gap-3">
                <Phone
                  className="mt-0.5 h-4 w-4 flex-shrink-0 text-ohaus-red"
                  aria-hidden="true"
                />
                <a
                  href={c.phoneHref}
                  className="font-semibold text-ohaus-ink hover:text-ohaus-red"
                >
                  {c.phone}
                </a>
              </li>
              <li className="flex gap-3">
                <Mail
                  className="mt-0.5 h-4 w-4 flex-shrink-0 text-ohaus-red"
                  aria-hidden="true"
                />
                <a
                  href={`mailto:${c.email}`}
                  className="text-ohaus-ink hover:text-ohaus-red"
                >
                  {c.email}
                </a>
              </li>
              <li className="flex gap-3">
                <Clock
                  className="mt-0.5 h-4 w-4 flex-shrink-0 text-ohaus-red"
                  aria-hidden="true"
                />
                <span className="text-ohaus-muted">{c.workingHours}</span>
              </li>
              <li className="flex gap-3">
                <MapPin
                  className="mt-0.5 h-4 w-4 flex-shrink-0 text-ohaus-red"
                  aria-hidden="true"
                />
                <span className="text-ohaus-muted">
                  {c.city ? (
                    <>
                      <span className="font-semibold text-ohaus-ink">
                        {c.city}
                      </span>
                      <br />
                    </>
                  ) : null}
                  {c.address}
                </span>
              </li>
            </ul>
          </aside>
        </div>
      </Container>
    </>
  );
}
