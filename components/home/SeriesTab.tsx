"use client";

import { cn } from "@/lib/utils";

type SeriesTabProps = {
  title: string;
  active: boolean;
  onSelect: () => void;
};

/** Vertical series tab used in the Hero slider. */
export default function SeriesTab({ title, active, onSelect }: SeriesTabProps) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onSelect}
      className={cn(
        "w-full border-l-4 px-5 py-4 text-left font-heading text-sm font-bold uppercase tracking-wide transition-colors",
        active
          ? "border-ohaus-red bg-ohaus-gray-dark text-white"
          : "border-transparent bg-white/80 text-ohaus-ink hover:bg-white",
      )}
    >
      {title}
    </button>
  );
}
