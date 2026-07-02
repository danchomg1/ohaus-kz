"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import Logo from "./Logo";
import MainNav from "./MainNav";
import MegaMenu from "./MegaMenu";
import MobileNav from "./MobileNav";
import SearchBox from "./SearchBox";
import type { NavSegment } from "@/sanity/lib/queries";

export default function Header({
  segments,
  logoUrl,
}: {
  segments: NavSegment[];
  logoUrl?: string;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 4);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMegaOpen(false);
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 bg-white transition-shadow",
        scrolled ? "shadow-header" : "border-b border-ohaus-line",
      )}
    >
      <div className="relative">
        <div className="container-site flex h-16 items-center justify-between gap-4">
          <Logo src={logoUrl} />

          <div className="hidden items-center gap-6 lg:flex">
            <MainNav
              megaOpen={megaOpen}
              onToggleMega={() => setMegaOpen((v) => !v)}
            />
            <SearchBox />
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label="Открыть меню"
            aria-expanded={mobileOpen}
            className="inline-flex items-center justify-center p-2 text-ohaus-red lg:hidden"
          >
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        <MegaMenu
          open={megaOpen}
          onClose={() => setMegaOpen(false)}
          segments={segments}
        />
      </div>

      {megaOpen ? (
        <div
          className="fixed inset-0 top-0 z-30 hidden lg:block"
          onClick={() => setMegaOpen(false)}
          aria-hidden="true"
        />
      ) : null}

      <MobileNav
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        segments={segments}
      />
    </header>
  );
}
