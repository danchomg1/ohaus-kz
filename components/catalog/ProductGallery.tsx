"use client";

import { useState } from "react";
import Image from "next/image";
import { ImageIcon } from "lucide-react";
import { urlFor } from "@/sanity/lib/image";
import { cn } from "@/lib/utils";
import type { SanityImage } from "@/sanity/lib/queries";

const url = (img: SanityImage, w: number) => urlFor(img as any).width(w).fit("max").url();

/** Галерея товара из Sanity: большое фото + миниатюры. */
export default function ProductGallery({
  images,
  alt,
}: {
  images: SanityImage[];
  alt: string;
}) {
  const valid = (images || []).filter((i) => i?.asset);
  const [active, setActive] = useState(0);

  if (!valid.length) {
    return (
      <div className="flex aspect-square items-center justify-center border border-ohaus-line bg-ohaus-bg-soft">
        <ImageIcon className="h-16 w-16 text-ohaus-line" aria-hidden="true" />
      </div>
    );
  }

  const idx = Math.min(active, valid.length - 1);

  return (
    <div>
      <div className="relative aspect-square border border-ohaus-line bg-white">
        <Image
          src={url(valid[idx], 900)}
          alt={alt}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-contain p-8"
          priority
        />
      </div>

      {valid.length > 1 ? (
        <div className="mt-4 grid grid-cols-5 gap-3">
          {valid.map((img, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Фото ${i + 1}`}
              className={cn(
                "relative aspect-square border bg-white",
                i === idx
                  ? "border-ohaus-red"
                  : "border-ohaus-line hover:border-ohaus-muted",
              )}
            >
              <Image
                src={url(img, 200)}
                alt=""
                fill
                sizes="100px"
                className="object-contain p-2"
              />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
