import Link from "next/link";
import { ImageIcon } from "lucide-react";
import Skeleton from "./Skeleton";

type ProductCardProps = {
  name?: string;
  image?: string;
  series?: string;
  href?: string;
};

/**
 * Product card. Stage 1: renders a skeleton placeholder by default.
 * Props are wired for future real content.
 */
export default function ProductCard({
  name,
  image,
  series,
  href,
}: ProductCardProps) {
  const isSkeleton = !name;

  const content = (
    <div className="flex flex-col border border-ohaus-line bg-white transition-shadow hover:shadow-card">
      <div className="flex aspect-square items-center justify-center bg-ohaus-bg-soft">
        {image ? (
          <ImageIcon className="h-10 w-10 text-ohaus-line" aria-hidden="true" />
        ) : (
          <Skeleton className="h-2/3 w-2/3" />
        )}
      </div>
      <div className="space-y-2 p-4">
        {isSkeleton ? (
          <>
            <Skeleton className="h-3 w-1/3" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-5/6" />
          </>
        ) : (
          <>
            {series ? (
              <span className="font-heading text-xs font-bold uppercase tracking-wide text-ohaus-red">
                {series}
              </span>
            ) : null}
            <p className="font-heading text-sm font-bold text-ohaus-ink">
              {name}
            </p>
          </>
        )}
      </div>
    </div>
  );

  if (href && !isSkeleton) {
    return (
      <Link href={href} className="group block">
        {content}
      </Link>
    );
  }

  return (
    <div aria-hidden={isSkeleton ? "true" : undefined}>{content}</div>
  );
}
