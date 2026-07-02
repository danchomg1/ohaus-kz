"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  /** URL логотипа из настроек сайта (Sanity). Если нет — текстовый вариант. */
  src?: string;
};

export default function Logo({ className, src }: LogoProps) {
  const [error, setError] = useState(false);
  const showImage = Boolean(src) && !error;

  return (
    <Link
      href="/"
      aria-label="OHAUS Kazakhstan — на главную"
      className={cn("inline-flex items-center", className)}
    >
      {showImage ? (
        <span className="relative block h-8 w-[150px] sm:h-9">
          <Image
            src={src as string}
            alt="OHAUS Kazakhstan"
            fill
            priority
            className="object-contain object-left"
            onError={() => setError(true)}
          />
        </span>
      ) : (
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
      )}
      <span className="sr-only">OHAUS Kazakhstan</span>
    </Link>
  );
}
