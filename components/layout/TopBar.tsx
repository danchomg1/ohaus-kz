import Link from "next/link";
import { Phone, Mail, Send, LogIn } from "lucide-react";
import { resolveContacts } from "@/lib/contacts";
import type { SiteSettings } from "@/sanity/lib/queries";

/**
 * Тонкая красная полоса над шапкой: слева контакты, справа заявка и вход
 * для дилеров. На узких экранах остаются телефон и заявка.
 */
export default function TopBar({ settings }: { settings?: SiteSettings }) {
  const c = resolveContacts(settings);
  const dealerUrl = settings?.dealerUrl || "https://dealer.ohaus.com";

  return (
    <div className="bg-ohaus-red text-white">
      <div className="container-site flex h-9 items-center justify-between gap-4 text-xs sm:text-[13px]">
        <div className="flex min-w-0 items-center gap-4">
          <a
            href={c.phoneHref}
            className="inline-flex items-center gap-1.5 whitespace-nowrap font-sans font-semibold text-white transition-colors hover:text-white/80"
          >
            <Phone className="h-3.5 w-3.5" aria-hidden="true" />
            <span>{c.phone}</span>
          </a>
          <span
            className="hidden h-3.5 w-px bg-white/30 md:block"
            aria-hidden="true"
          />
          <a
            href={`mailto:${c.email}`}
            className="hidden items-center gap-1.5 font-sans text-white/90 transition-colors hover:text-white md:inline-flex"
          >
            <Mail className="h-3.5 w-3.5" aria-hidden="true" />
            <span>{c.email}</span>
          </a>
        </div>

        <nav aria-label="Дополнительно" className="flex items-center gap-4">
          <Link
            href="/request"
            className="inline-flex items-center gap-1.5 whitespace-nowrap font-sans text-white/90 transition-colors hover:text-white"
          >
            <Send className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Оставить заявку</span>
          </Link>
          <span
            className="hidden h-3.5 w-px bg-white/30 sm:block"
            aria-hidden="true"
          />
          <a
            href={dealerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-1.5 font-sans text-white/90 transition-colors hover:text-white sm:inline-flex"
          >
            <LogIn className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Вход для дилеров</span>
          </a>
        </nav>
      </div>
    </div>
  );
}
