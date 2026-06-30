"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

type SearchBoxProps = {
  className?: string;
  /** Larger field used inside the mobile off-canvas menu. */
  fullWidth?: boolean;
};

/**
 * Header search field. UI scaffold only — submits to /search, no real logic.
 */
export default function SearchBox({ className, fullWidth }: SearchBoxProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const q = query.trim();
    router.push(q ? `/search?q=${encodeURIComponent(q)}` : "/search");
  }

  return (
    <form
      role="search"
      onSubmit={onSubmit}
      className={cn(
        "flex items-stretch",
        fullWidth ? "w-full" : "w-44 lg:w-56",
        className,
      )}
    >
      <label htmlFor="site-search" className="sr-only">
        Поиск по сайту
      </label>
      <input
        id="site-search"
        type="search"
        name="q"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Поиск…"
        className="min-w-0 flex-1 border border-ohaus-line border-r-0 bg-white px-3 py-2 text-sm text-ohaus-ink placeholder:text-ohaus-muted focus:outline-none focus:ring-1 focus:ring-ohaus-red"
      />
      <button
        type="submit"
        aria-label="Искать"
        className="flex items-center justify-center bg-ohaus-red px-3 text-white transition-colors hover:bg-ohaus-red-dark"
      >
        <Search className="h-4 w-4" aria-hidden="true" />
      </button>
    </form>
  );
}
