import Link from "next/link";
import { ImageIcon } from "lucide-react";
import SanityImg from "./SanityImg";
import type { SanityImage } from "@/sanity/lib/queries";

type ProductCardProps = {
  name: string;
  series?: string;
  image?: SanityImage;
  href: string;
};

/** Карточка товара для списков (данные из Sanity). */
export default function ProductCard({
  name,
  series,
  image,
  href,
}: ProductCardProps) {
  return (
    <Link href={href} className="group block h-full">
      <div className="flex h-full flex-col border border-ohaus-line bg-white transition-shadow group-hover:shadow-card">
        <div className="relative flex aspect-square items-center justify-center bg-white p-4">
          {image?.asset ? (
            <SanityImg
              image={image}
              alt={name}
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-contain p-4"
            />
          ) : (
            <ImageIcon
              className="h-10 w-10 text-ohaus-line"
              aria-hidden="true"
            />
          )}
        </div>
        <div className="space-y-1.5 border-t border-ohaus-line p-4">
          {series ? (
            <span className="font-heading text-xs font-bold uppercase tracking-wide text-ohaus-red">
              {series}
            </span>
          ) : null}
          <p className="font-heading text-sm font-bold text-ohaus-ink group-hover:text-ohaus-red">
            {name}
          </p>
        </div>
      </div>
    </Link>
  );
}
