import Link from "next/link";
import { ImageIcon } from "lucide-react";
import Skeleton from "@/components/ui/Skeleton";

type CategoryCardProps = {
  title: string;
  href: string;
  /** When true, show a neutral placeholder instead of a real image. */
  placeholder?: boolean;
};

/** Category / quick-link card: image on top, caption below. */
export default function CategoryCard({
  title,
  href,
  placeholder = true,
}: CategoryCardProps) {
  return (
    <Link
      href={href}
      className="group flex flex-col border border-ohaus-line bg-white transition-shadow hover:shadow-card"
    >
      <div className="flex aspect-[4/3] items-center justify-center bg-ohaus-bg-soft">
        {placeholder ? (
          <ImageIcon className="h-10 w-10 text-ohaus-line" aria-hidden="true" />
        ) : (
          <Skeleton className="h-full w-full" />
        )}
      </div>
      <div className="p-4">
        <p className="font-heading text-sm font-bold text-ohaus-ink transition-colors group-hover:text-ohaus-red">
          {title}
        </p>
      </div>
    </Link>
  );
}
