import Link from "next/link";
import { ChevronRight } from "lucide-react";

export type Crumb = { title: string; href?: string };

type BreadcrumbsProps = {
  items: Crumb[];
};

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  const all: Crumb[] = [{ title: "Главная", href: "/" }, ...items];

  return (
    <nav aria-label="Хлебные крошки" className="py-4">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm">
        {all.map((crumb, i) => {
          const isLast = i === all.length - 1;
          return (
            <li key={`${crumb.title}-${i}`} className="flex items-center gap-1.5">
              {crumb.href && !isLast ? (
                <Link
                  href={crumb.href}
                  className="text-ohaus-muted transition-colors hover:text-ohaus-red"
                >
                  {crumb.title}
                </Link>
              ) : (
                <span
                  className={isLast ? "font-semibold text-ohaus-ink" : "text-ohaus-muted"}
                  aria-current={isLast ? "page" : undefined}
                >
                  {crumb.title}
                </span>
              )}
              {!isLast ? (
                <ChevronRight
                  className="h-3.5 w-3.5 text-ohaus-line"
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
