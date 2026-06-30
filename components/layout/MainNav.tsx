"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Menu, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

type MainNavProps = {
  megaOpen: boolean;
  onToggleMega: () => void;
};

const MORE_LINKS = [
  { title: "О компании", href: "/about" },
  { title: "Свяжитесь с нами", href: "/contacts" },
  { title: "Узнать цены", href: "/quote" },
];

const navItem =
  "inline-flex items-center gap-1.5 font-heading text-sm font-medium text-ohaus-red transition-colors hover:text-ohaus-red-dark";

export default function MainNav({ megaOpen, onToggleMega }: MainNavProps) {
  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setMoreOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  return (
    <nav aria-label="Основная навигация">
      <ul className="flex items-center gap-6">
        <li>
          <button
            type="button"
            onClick={onToggleMega}
            aria-expanded={megaOpen}
            aria-controls="mega-menu"
            className={cn(navItem, megaOpen && "text-ohaus-red-dark")}
          >
            <Menu className="h-4 w-4" aria-hidden="true" />
            <span>Продукты</span>
          </button>
        </li>
        <li>
          <Link href="/support" className={navItem}>
            Поддержка
          </Link>
        </li>
        <li>
          <Link href="/news" className={navItem}>
            Новости
          </Link>
        </li>
        <li ref={moreRef} className="relative">
          <button
            type="button"
            onClick={() => setMoreOpen((v) => !v)}
            aria-expanded={moreOpen}
            aria-haspopup="true"
            className={navItem}
          >
            <span>Еще</span>
            <ChevronDown
              className={cn(
                "h-4 w-4 transition-transform",
                moreOpen && "rotate-180",
              )}
              aria-hidden="true"
            />
          </button>
          {moreOpen ? (
            <ul className="absolute left-0 top-full z-40 mt-2 min-w-[200px] border border-ohaus-line bg-white py-1 shadow-header">
              {MORE_LINKS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setMoreOpen(false)}
                    className="block px-4 py-2 font-sans text-sm text-ohaus-ink transition-colors hover:bg-ohaus-bg-soft hover:text-ohaus-red"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          ) : null}
        </li>
      </ul>
    </nav>
  );
}
