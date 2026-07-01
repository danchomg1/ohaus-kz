"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
};

/**
 * Site logo. Loads /logo.svg from /public when present; until then falls
 * back to a red OHAUS text wordmark. Replace by dropping the brand-kit file
 * at public/logo.svg (or change the src below to /logo.png).
 */
export default function Logo({ className }: LogoProps) {
  const [error, setError] = useState(false);

  return (
    <Link
      href="/"
      aria-label="OHAUS Kazakhstan — на главную"
      className={cn("inline-flex items-center", className)}
    >
      {error ? (
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
      ) : (
        <span className="relative block h-8 w-[150px] sm:h-9">
          <Image
            src="/logo.svg"
            alt="OHAUS Kazakhstan"
            fill
            priority
            unoptimized
            className="object-contain object-left"
            onError={() => setError(true)}
          />
        </span>
      )}
      <span className="sr-only">OHAUS Kazakhstan</span>
    </Link>
  );
}
