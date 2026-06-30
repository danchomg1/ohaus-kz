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

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  // Sticky shadow on scroll
  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 4);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menus on route change
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
          <Logo />

          {/* Desktop nav */}
          <div className="hidden items-center gap-6 lg:flex">
            <MainNav
              megaOpen={megaOpen}
              onToggleMega={() => setMegaOpen((v) => !v)}
            />
            <SearchBox />
          </div>

          {/* Mobile burger */}
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

        {/* Desktop mega-menu (overlays below header) */}
        <MegaMenu open={megaOpen} onClose={() => setMegaOpen(false)} />
      </div>

      {/* Backdrop to close mega-menu on outside click */}
      {megaOpen ? (
        <div
          className="fixed inset-0 top-0 z-30 hidden lg:block"
          onClick={() => setMegaOpen(false)}
          aria-hidden="true"
        />
      ) : null}

      {/* Mobile off-canvas */}
      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  );
}
