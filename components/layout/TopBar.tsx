import Link from "next/link";
import { Globe, Tag, LogIn } from "lucide-react";

/**
 * Thin red utility bar above the header.
 * Left: region/language switch (placeholder). Right: quote + dealer login.
 */
export default function TopBar() {
  return (
    <div className="bg-ohaus-red text-white">
      <div className="container-site flex h-9 items-center justify-between text-xs sm:text-[13px]">
        <button
          type="button"
          className="inline-flex items-center gap-1.5 font-sans text-white/90 transition-colors hover:text-white"
        >
          <Globe className="h-3.5 w-3.5" aria-hidden="true" />
          <span>Русский</span>
          <span className="text-white/70">(Изменить)</span>
        </button>

        <nav aria-label="Дополнительно" className="flex items-center gap-4">
          <Link
            href="/quote"
            className="inline-flex items-center gap-1.5 font-sans text-white/90 transition-colors hover:text-white"
          >
            <Tag className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Узнать цены</span>
          </Link>
          <span className="h-3.5 w-px bg-white/30" aria-hidden="true" />
          <a
            href="https://dealer.ohaus.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-sans text-white/90 transition-colors hover:text-white"
          >
            <LogIn className="h-3.5 w-3.5" aria-hidden="true" />
            <span className="hidden sm:inline">Вход для дилеров</span>
            <span className="sm:hidden">Дилеры</span>
          </a>
        </nav>
      </div>
    </div>
  );
}
