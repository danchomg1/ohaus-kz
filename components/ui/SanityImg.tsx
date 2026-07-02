import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import type { SanityImage } from "@/sanity/lib/queries";

type Props = {
  image?: SanityImage;
  alt: string;
  sizes?: string;
  className?: string;
  priority?: boolean;
  width?: number;
};

/** next/image по изображению из Sanity (fill — родитель должен быть relative). */
export default function SanityImg({
  image,
  alt,
  sizes,
  className,
  priority,
  width = 800,
}: Props) {
  if (!image?.asset) return null;
  const src = urlFor(image as any)
    .width(width)
    .fit("max")
    .url();
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      className={className}
      priority={priority}
    />
  );
}
