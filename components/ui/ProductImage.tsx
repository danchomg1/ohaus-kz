"use client";

import { useState } from "react";
import Image from "next/image";
import { ImageIcon } from "lucide-react";

type ProductImageProps = {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
  priority?: boolean;
};

/**
 * Product image with graceful fallback: until the local file exists in
 * /public, a neutral placeholder is shown instead of a broken image.
 * Uses `fill`, so the parent must be positioned (relative).
 */
export default function ProductImage({
  src,
  alt,
  sizes,
  className,
  priority,
}: ProductImageProps) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-ohaus-bg-soft">
        <ImageIcon className="h-10 w-10 text-ohaus-line" aria-hidden="true" />
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      className={className}
      priority={priority}
      onError={() => setError(true)}
    />
  );
}
