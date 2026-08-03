"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { NavSegment } from "@/sanity/lib/queries";

type MegaMenuProps = {
  open: boolean;
  onClose: () => void;
  segments: NavSegment[];
};

export default function MegaMenu({ open, onClose, segments }: MegaMenuProps) {
  const [activeSlug, setActiveSlug] = useState(segments[0]?.slug ?? "");

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open || segments.length === 0) return null;

  const active =
    segments.find((s) => s.slug === activeSlug) ?? segments[0];

  return (
    <div
      id="mega-menu"
      role="region"
      aria-label="Каталог продуктов"
      className="absolute left-0 right-0 top-full z-40 hidden border-t border-ohaus-line bg-white shadow-header lg:block"
    >
      <div className="container-site grid grid-cols-[240px_1fr] py-0">
        <ul className="bg-ohaus-gray-dark py-4">
          {segments.map((segment) => (
            <li key={segment.slug}>
              <button
                type="button"
                onMouseEnter={() => setActiveSlug(segment.slug)}
                onFocus={() => setActiveSlug(segment.slug)}
                onClick={() => setActiveSlug(segment.slug)}
                aria-current={active.slug === segment.slug ? "true" : undefined}
                className={cn(
                  "flex w-full items-center justify-between px-5 py-2.5 text-left font-sans text-sm transition-colors",
                  active.slug === segment.slug
                    ? "bg-ohaus-red text-white"
                    : "text-white/80 hover:bg-white/10 hover:text-white",
                )}
              >
                <span>{segment.title}</span>
                <ChevronRight className="h-4 w-4 opacity-70" aria-hidden="true" />
              </button>
            </li>
          ))}
          <li className="mt-2 border-t border-white/10 pt-2">
            <Link
              href="/products"
              onClick={onClose}
              className="block px-5 py-2.5 font-sans text-sm font-semibold text-white hover:text-white/80"
            >
              Смотреть все продукты
            </Link>
          </li>
        </ul>

        {/* columns-2, а не grid: группы раскладываются по колонкам сверху вниз,
            как в исходном меню, и не рвутся посередине. */}
        <div className="columns-2 gap-x-8 p-8">
          {active.groups.map((group) => (
            <div key={group.title} className="mb-6 break-inside-avoid">
              <h3 className="mb-2 font-heading text-sm font-bold uppercase tracking-wide text-ohaus-ink">
                {group.title}
              </h3>
              <ul className="space-y-1.5">
                {group.links.map((link) => (
                  <li key={link.slug}>
                    <Link
                      href={`/products/${link.slug}`}
                      onClick={onClose}
                      className="font-sans text-sm text-ohaus-red transition-colors hover:text-ohaus-red-dark hover:underline"
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
