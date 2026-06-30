import Link from "next/link";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
};

/**
 * Placeholder OHAUS wordmark (red). Will be replaced with the official
 * brand-kit SVG in a later stage.
 */
export default function Logo({ className }: LogoProps) {
  return (
    <Link
      href="/"
      aria-label="OHAUS Kazakhstan — на главную"
      className={cn("inline-flex items-center", className)}
    >
      <svg
        viewBox="0 0 168 44"
        role="img"
        aria-hidden="true"
        className="h-8 w-auto sm:h-9"
      >
        <text
          x="0"
          y="33"
          fontFamily="Roboto, system-ui, sans-serif"
          fontSize="34"
          fontWeight="900"
          letterSpacing="1"
          fill="var(--ohaus-red)"
        >
          OHAUS
        </text>
      </svg>
      <span className="sr-only">OHAUS Kazakhstan</span>
    </Link>
  );
}
