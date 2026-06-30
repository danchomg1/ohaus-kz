"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronRight, ImageIcon } from "lucide-react";
import { catalog, hrefForSlug } from "@/lib/catalog";
import { cn } from "@/lib/utils";

type MegaMenuProps = {
  open: boolean;
  onClose: () => void;
};

const ALL_PRODUCTS_TAB = "__all__";

/**
 * Desktop "Продукты" mega-menu: dark segment tabs (left) + groups (center)
 * + a per-segment promo card (right). Data from lib/catalog.
 */
export default function MegaMenu({ open, onClose }: MegaMenuProps) {
  const [activeSlug, setActiveSlug] = useState(catalog[0]?.slug ?? "");
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const activeSegment =
    activeSlug === ALL_PRODUCTS_TAB
      ? null
      : catalog.find((s) => s.slug === activeSlug);

  return (
    <div
      ref={panelRef}
      id="mega-menu"
      role="region"
      aria-label="Каталог продуктов"
      className="absolute left-0 right-0 top-full z-40 hidden border-t border-ohaus-line bg-white shadow-header lg:block"
    >
      <div className="container-site grid grid-cols-[240px_1fr] gap-0 py-0">
        {/* Left: dark segment tabs */}
        <ul className="bg-ohaus-gray-dark py-4">
          {catalog.map((segment) => (
            <li key={segment.slug}>
              <button
                type="button"
                onMouseEnter={() => setActiveSlug(segment.slug)}
                onFocus={() => setActiveSlug(segment.slug)}
                onClick={() => setActiveSlug(segment.slug)}
                aria-current={activeSlug === segment.slug ? "true" : undefined}
                className={cn(
                  "flex w-full items-center justify-between px-5 py-2.5 text-left font-sans text-sm text-white/80 transition-colors",
                  activeSlug === segment.slug
                    ? "bg-ohaus-red text-white"
                    : "hover:bg-white/10 hover:text-white",
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

        {/* Center + right */}
        {activeSegment ? (
          <div className="grid grid-cols-[1fr_260px]">
            <div className="grid grid-cols-2 gap-x-8 gap-y-6 p-8">
              {activeSegment.groups.map((group) => (
                <div key={group.title}>
                  <h3 className="mb-2 font-heading text-sm font-bold uppercase tracking-wide text-ohaus-ink">
                    {group.title}
                  </h3>
                  <ul className="space-y-1.5">
                    {group.links.map((link) => (
                      <li key={`${group.title}-${link.slug}`}>
                        <Link
                          href={hrefForSlug(link.slug)}
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

            {/* Promo */}
            <aside className="border-l border-ohaus-line bg-ohaus-bg-soft p-6">
              {activeSegment.promo ? (
                <Link
                  href={hrefForSlug(activeSegment.promo.slug)}
                  onClick={onClose}
                  className="group block"
                >
                  <div className="flex aspect-[4/3] items-center justify-center bg-white shadow-card">
                    <ImageIcon
                      className="h-10 w-10 text-ohaus-line"
                      aria-hidden="true"
                    />
                  </div>
                  <p className="mt-3 font-heading text-sm font-bold text-ohaus-ink group-hover:text-ohaus-red">
                    {activeSegment.promo.title}
                  </p>
                  <span className="text-xs text-ohaus-muted">Подробнее →</span>
                </Link>
              ) : null}
            </aside>
          </div>
        ) : null}
      </div>
    </div>
  );
}
