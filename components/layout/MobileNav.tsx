"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { X, ChevronDown } from "lucide-react";
import { catalog, hrefForSlug } from "@/lib/catalog";
import { cn } from "@/lib/utils";
import SearchBox from "./SearchBox";

type MobileNavProps = {
  open: boolean;
  onClose: () => void;
};

const STATIC_LINKS = [
  { title: "Поддержка", href: "/support" },
  { title: "Новости", href: "/news" },
  { title: "О компании", href: "/about" },
  { title: "Свяжитесь с нами", href: "/contacts" },
];

/** Off-canvas mobile menu: segment → group → subcategory accordions. */
export default function MobileNav({ open, onClose }: MobileNavProps) {
  const [openSegment, setOpenSegment] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 lg:hidden",
        open ? "pointer-events-auto" : "pointer-events-none",
      )}
      aria-hidden={!open}
    >
      {/* Overlay */}
      <div
        onClick={onClose}
        className={cn(
          "absolute inset-0 bg-black/40 transition-opacity",
          open ? "opacity-100" : "opacity-0",
        )}
      />

      {/* Panel */}
      <nav
        aria-label="Мобильное меню"
        className={cn(
          "absolute right-0 top-0 flex h-full w-[88%] max-w-sm flex-col bg-white shadow-xl transition-transform duration-300",
          open ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex items-center justify-between border-b border-ohaus-line px-4 py-3">
          <span className="font-heading text-lg font-black text-ohaus-red">
            OHAUS
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Закрыть меню"
            className="p-1 text-ohaus-ink hover:text-ohaus-red"
          >
            <X className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        <div className="border-b border-ohaus-line p-4">
          <SearchBox fullWidth />
        </div>

        <div className="flex-1 overflow-y-auto">
          {/* Products — segment accordions */}
          <div className="border-b border-ohaus-line px-4 py-3">
            <p className="mb-2 font-heading text-sm font-bold uppercase tracking-wide text-ohaus-ink">
              Продукты
            </p>
            <ul>
              {catalog.map((segment) => {
                const isOpen = openSegment === segment.slug;
                return (
                  <li key={segment.slug} className="border-t border-ohaus-line/70">
                    <button
                      type="button"
                      onClick={() =>
                        setOpenSegment(isOpen ? null : segment.slug)
                      }
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between py-2.5 text-left font-sans text-sm text-ohaus-ink"
                    >
                      <span>{segment.title}</span>
                      <ChevronDown
                        className={cn(
                          "h-4 w-4 text-ohaus-muted transition-transform",
                          isOpen && "rotate-180",
                        )}
                        aria-hidden="true"
                      />
                    </button>
                    {isOpen ? (
                      <div className="pb-3 pl-3">
                        {segment.groups.map((group) => (
                          <div key={group.title} className="mb-2">
                            <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-ohaus-muted">
                              {group.title}
                            </p>
                            <ul className="space-y-1">
                              {group.links.map((link) => (
                                <li key={`${group.title}-${link.slug}`}>
                                  <Link
                                    href={hrefForSlug(link.slug)}
                                    onClick={onClose}
                                    className="block py-1 text-sm text-ohaus-red"
                                  >
                                    {link.title}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    ) : null}
                  </li>
                );
              })}
              <li className="border-t border-ohaus-line/70">
                <Link
                  href="/products"
                  onClick={onClose}
                  className="block py-2.5 text-sm font-semibold text-ohaus-red"
                >
                  Смотреть все продукты
                </Link>
              </li>
            </ul>
          </div>

          {/* Static links */}
          <ul className="px-4 py-2">
            {STATIC_LINKS.map((item) => (
              <li key={item.href} className="border-b border-ohaus-line/70">
                <Link
                  href={item.href}
                  onClick={onClose}
                  className="block py-3 font-sans text-sm text-ohaus-ink hover:text-ohaus-red"
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </div>
  );
}
