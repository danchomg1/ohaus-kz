"use client";

/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type ProductGalleryProps = {
  /** Image path without extension, e.g. /products/centrifuges/frontier-5000-multi-pro */
  base: string;
  alt: string;
};

const MAX_EXTRA = 5;

/**
 * Product image gallery. Probes for <base>.jpg and <base>1..5.jpg and shows
 * only the files that actually exist in /public. Until the main image loads,
 * a neutral placeholder is shown. Big image + thumbnails to switch.
 */
export default function ProductGallery({ base, alt }: ProductGalleryProps) {
  const candidates = [
    `${base}.jpg`,
    ...Array.from({ length: MAX_EXTRA }, (_, i) => `${base}${i + 1}.jpg`),
  ];

  // undefined = not probed yet, true = loaded, false = missing
  const [status, setStatus] = useState<Record<string, boolean>>({});
  const [active, setActive] = useState<string | null>(null);

  const valid = candidates.filter((c) => status[c]);
  const main = active && status[active] ? active : (valid[0] ?? null);

  return (
    <div>
      {/* Hidden probes for candidates whose status is unknown */}
      {candidates.map((c) =>
        status[c] === undefined ? (
          <img
            key={`probe-${c}`}
            src={c}
            alt=""
            className="hidden"
            onLoad={() => setStatus((s) => ({ ...s, [c]: true }))}
            onError={() => setStatus((s) => ({ ...s, [c]: false }))}
          />
        ) : null,
      )}

      {/* Main image */}
      <div className="relative flex aspect-square items-center justify-center border border-ohaus-line bg-white">
        {main ? (
          <img
            src={main}
            alt={alt}
            className="h-full w-full object-contain p-8"
          />
        ) : (
          <ImageIcon
            className="h-16 w-16 text-ohaus-line"
            aria-hidden="true"
          />
        )}
      </div>

      {/* Thumbnails (only when more than one image exists) */}
      {valid.length > 1 ? (
        <div className="mt-4 grid grid-cols-5 gap-3">
          {valid.map((c) => (
            <button
              key={`thumb-${c}`}
              type="button"
              onClick={() => setActive(c)}
              aria-label="Показать изображение"
              className={cn(
                "relative flex aspect-square items-center justify-center border bg-white transition-colors",
                c === main
                  ? "border-ohaus-red"
                  : "border-ohaus-line hover:border-ohaus-muted",
              )}
            >
              <img
                src={c}
                alt=""
                className="h-full w-full object-contain p-2"
              />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
