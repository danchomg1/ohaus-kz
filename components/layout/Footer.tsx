import Link from "next/link";
import { MapPin } from "lucide-react";
import type { SiteSettings } from "@/sanity/lib/queries";

const COLUMNS: { title: string; links: { title: string; href: string }[] }[] = [
  {
    title: "О компании",
    links: [
      { title: "О компании", href: "/about" },
      { title: "Новости", href: "/news" },
      { title: "Продукты", href: "/products" },
    ],
  },
  {
    title: "Поддержка",
    links: [
      { title: "Центр поддержки", href: "/support" },
      { title: "Узнать цены", href: "/quote" },
      { title: "Поиск", href: "/search" },
    ],
  },
  {
    title: "Свяжитесь с нами",
    links: [
      { title: "Контакты", href: "/contacts" },
      { title: "Вход для дилеров", href: "https://dealer.ohaus.com" },
    ],
  },
];

export default function Footer({ settings }: { settings?: SiteSettings }) {
  const addressLines = (
    settings?.address || "Казахстан, [индекс], [город],\n[улица, офис]"
  ).split("\n");
  return (
    <footer className="mt-16 border-t border-ohaus-line bg-ohaus-bg-soft">
      <div className="container-site py-12">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h2 className="mb-3 font-heading text-sm font-bold uppercase tracking-wide text-ohaus-ink">
                {col.title}
              </h2>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="font-sans text-sm text-ohaus-muted transition-colors hover:text-ohaus-red"
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Representative office address (placeholder) */}
          <div>
            <h2 className="mb-3 font-heading text-sm font-bold uppercase tracking-wide text-ohaus-ink">
              Адрес
            </h2>
            <address className="flex gap-2 not-italic">
              <MapPin
                className="mt-0.5 h-4 w-4 flex-shrink-0 text-ohaus-red"
                aria-hidden="true"
              />
              <span className="font-sans text-sm leading-relaxed text-ohaus-muted">
                {settings?.companyName || "OHAUS Kazakhstan"}
                {addressLines.map((line, i) => (
                  <span key={i}>
                    <br />
                    {line}
                  </span>
                ))}
                {settings?.phone ? (
                  <>
                    <br />
                    {settings.phone}
                  </>
                ) : null}
                {settings?.email ? (
                  <>
                    <br />
                    {settings.email}
                  </>
                ) : null}
              </span>
            </address>
          </div>
        </div>
      </div>

      <div className="border-t border-ohaus-line">
        <div className="container-site flex flex-col items-center justify-between gap-2 py-4 text-xs text-ohaus-muted sm:flex-row">
          <p>©2026 OHAUS</p>
          <nav aria-label="Правовая информация" className="flex gap-4">
            <Link href="/about" className="hover:text-ohaus-red">
              Privacy Policy
            </Link>
            <Link href="/contacts" className="hover:text-ohaus-red">
              Business Partner
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
