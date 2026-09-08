import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type Crumb = { title: string; href?: string };

type BreadcrumbsProps = {
  items: Crumb[];
  /** «onDark» — для крошек поверх фотографии в шапке страницы. */
  tone?: "ink" | "onDark";
  className?: string;
};

export default function Breadcrumbs({
  items,
  tone = "ink",
  className,
}: BreadcrumbsProps) {
  const all: Crumb[] = [{ title: "Главная", href: "/" }, ...items];
  const onDark = tone === "onDark";

  return (
    <nav
      aria-label="Хлебные крошки"
      className={cn(onDark ? "pb-3" : "py-4", className)}
    >
      <ol className="flex flex-wrap items-center gap-1.5 text-sm">
        {all.map((crumb, i) => {
          const isLast = i === all.length - 1;
          return (
            <li
              key={`${crumb.title}-${i}`}
              className="flex items-center gap-1.5"
            >
              {crumb.href && !isLast ? (
                <Link
                  href={crumb.href}
                  className={cn(
                    "transition-colors",
                    onDark
                      ? "text-white/70 hover:text-white"
                      : "text-ohaus-muted hover:text-ohaus-red",
                  )}
                >
                  {crumb.title}
                </Link>
              ) : (
                <span
                  className={cn(
                    isLast && "font-semibold",
                    onDark
                      ? isLast
                        ? "text-white"
                        : "text-white/70"
                      : isLast
                        ? "text-ohaus-ink"
                        : "text-ohaus-muted",
                  )}
                  aria-current={isLast ? "page" : undefined}
                >
                  {crumb.title}
                </span>
              )}
              {!isLast ? (
                <ChevronRight
                  className={cn(
                    "h-3.5 w-3.5",
                    onDark ? "text-white/40" : "text-ohaus-line",
                  )}
                  aria-hidden="true"
                />
              ) : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
