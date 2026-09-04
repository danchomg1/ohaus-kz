"use client";

import { cn } from "@/lib/utils";

type SeriesTabProps = {
  title: string;
  active: boolean;
  onSelect: () => void;
};

/**
 * Вкладка серии в главном баннере. Лежит поверх фотографии, поэтому фон
 * полупрозрачный с размытием — кадр под ней остаётся виден.
 */
export default function SeriesTab({
  title,
  active,
  onSelect,
}: SeriesTabProps) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onSelect}
      className={cn(
        "flex-1 border-t-2 px-3 py-3.5 text-center font-heading text-xs font-bold uppercase tracking-wide backdrop-blur-md transition-colors sm:px-5 sm:text-sm",
        active
          ? "border-ohaus-red bg-black/55 text-white"
          : "border-white/25 bg-black/30 text-white/70 hover:bg-black/45 hover:text-white",
      )}
    >
      {title}
    </button>
  );
}
