import Link from "next/link";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { resolveContacts } from "@/lib/contacts";
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
      { title: "Оставить заявку", href: "/request" },
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
  const c = resolveContacts(settings);
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

          {/* Контакты представительства */}
          <div>
            <h2 className="mb-3 font-heading text-sm font-bold uppercase tracking-wide text-ohaus-ink">
              {c.city
                ? `Офис в ${c.city === "Астана" ? "Астане" : c.city}`
                : "Адрес"}
            </h2>
            <address className="space-y-2 font-sans text-sm not-italic leading-relaxed text-ohaus-muted">
              <p className="flex gap-2">
                <MapPin
                  className="mt-0.5 h-4 w-4 flex-shrink-0 text-ohaus-red"
                  aria-hidden="true"
                />
                <span>
                  <span className="font-semibold text-ohaus-ink">
                    {c.companyName}
                  </span>
                  <br />
                  {c.address}
                </span>
              </p>
              <p className="flex gap-2">
                <Phone
                  className="mt-0.5 h-4 w-4 flex-shrink-0 text-ohaus-red"
                  aria-hidden="true"
                />
                <a
                  href={c.phoneHref}
                  className="transition-colors hover:text-ohaus-red"
                >
                  {c.phone}
                </a>
              </p>
              <p className="flex gap-2">
                <Mail
                  className="mt-0.5 h-4 w-4 flex-shrink-0 text-ohaus-red"
                  aria-hidden="true"
                />
                <a
                  href={`mailto:${c.email}`}
                  className="transition-colors hover:text-ohaus-red"
                >
                  {c.email}
                </a>
              </p>
              <p className="flex gap-2">
                <Clock
                  className="mt-0.5 h-4 w-4 flex-shrink-0 text-ohaus-red"
                  aria-hidden="true"
                />
                <span>{c.workingHours}</span>
              </p>
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
