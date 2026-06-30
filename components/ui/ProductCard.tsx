import Link from "next/link";
import Image from "next/image";
import Skeleton from "./Skeleton";

type ProductCardProps = {
  name?: string;
  image?: string;
  series?: string;
  href?: string;
};

/**
 * Product card. With `name` it renders real content (image + series + name);
 * without it, a skeleton placeholder.
 */
export default function ProductCard({
  name,
  image,
  series,
  href,
}: ProductCardProps) {
  const isSkeleton = !name;

  const content = (
    <div className="flex h-full flex-col border border-ohaus-line bg-white transition-shadow group-hover:shadow-card">
      <div className="relative flex aspect-square items-center justify-center bg-white p-4">
        {image ? (
          <Image
            src={image}
            alt={name ?? ""}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-contain p-4"
          />
        ) : (
          <Skeleton className="h-2/3 w-2/3" />
        )}
      </div>
      <div className="space-y-2 border-t border-ohaus-line p-4">
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
            <p className="font-heading text-sm font-bold text-ohaus-ink group-hover:text-ohaus-red">
              {name}
            </p>
          </>
        )}
      </div>
    </div>
  );

  if (href && !isSkeleton) {
    return (
      <Link href={href} className="group block h-full">
        {content}
      </Link>
    );
  }

  return (
    <div className="group" aria-hidden={isSkeleton ? "true" : undefined}>
      {content}
    </div>
  );
}
