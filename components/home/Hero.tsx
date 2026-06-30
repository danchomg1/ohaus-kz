"use client";

import { useState } from "react";
import { ImageIcon } from "lucide-react";
import Button from "@/components/ui/Button";
import SeriesTab from "./SeriesTab";

type Slide = {
  series: string;
  title: string;
  subtitle: string;
  href: string;
};

const SLIDES: Slide[] = [
  {
    series: "Explorer™ EX",
    title: "Аналитические и прецизионные весы Explorer™",
    subtitle: "Высокая точность и производительность для лаборатории.",
    href: "/products/balances-scales/analytical-balances",
  },
  {
    series: "Adventurer™ AX",
    title: "Лабораторные весы Adventurer™",
    subtitle: "Универсальные весы для рутинных задач взвешивания.",
    href: "/products/balances-scales/precision-balances",
  },
  {
    series: "Pioneer™ PX",
    title: "Весы Pioneer™ для базовых задач",
    subtitle: "Надёжность и простота для образования и производства.",
    href: "/products/balances-scales/precision-balances",
  },
  {
    series: "Scout™",
    title: "Портативные весы Scout™",
    subtitle: "Компактные и прочные весы для работы где угодно.",
    href: "/portable-scales-2",
  },
];

export default function Hero() {
  const [active, setActive] = useState(0);
  const slide = SLIDES[active];

  return (
    <section
      aria-label="Главный баннер"
      className="bg-ohaus-gray-dark text-white"
    >
      <div className="container-site">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px]">
          {/* Slide */}
          <div className="relative flex min-h-[340px] flex-col justify-center overflow-hidden py-10 lg:min-h-[440px] lg:py-16">
            {/* Background placeholder */}
            <div
              className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-ohaus-gray-dark to-black/60"
              aria-hidden="true"
            >
              <ImageIcon className="h-20 w-20 text-white/10" />
            </div>

            <div className="relative max-w-xl">
              <span className="font-heading text-sm font-bold uppercase tracking-widest text-ohaus-red">
                {slide.series}
              </span>
              <h1 className="mt-3 font-heading text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
                {slide.title}
              </h1>
              <p className="mt-4 max-w-md text-base text-white/80">
                {slide.subtitle}
              </p>
              <Button href={slide.href} size="lg" className="mt-6">
                Подробнее
              </Button>
            </div>
          </div>

          {/* Series tabs */}
          <div
            role="tablist"
            aria-label="Серии весов"
            aria-orientation="vertical"
            className="flex flex-row divide-x divide-white/10 border-t border-white/10 lg:flex-col lg:divide-x-0 lg:divide-y lg:border-l lg:border-t-0"
          >
            {SLIDES.map((s, i) => (
              <div key={s.series} className="flex-1">
                <SeriesTab
                  title={s.series}
                  active={i === active}
                  onSelect={() => setActive(i)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
