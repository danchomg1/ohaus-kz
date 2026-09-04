"use client";

import { useState } from "react";
import Image from "next/image";
import Button from "@/components/ui/Button";
import SeriesTab from "./SeriesTab";
import { urlFor } from "@/sanity/lib/image";
import type { HeroSlide } from "@/sanity/lib/queries";

/** Слайд по умолчанию может ссылаться на файл из /public вместо картинки Sanity. */
type Slide = HeroSlide & { src?: string };

const DEFAULT_SLIDES: Slide[] = [
  {
    series: "Explorer™ EX",
    title: "Аналитические и прецизионные весы Explorer™",
    subtitle: "Высокая точность и производительность для лаборатории.",
    ctaHref: "/products/analytical-balances",
    src: "/home/hero-explorer.jpg",
  },
  {
    series: "Adventurer™ AX",
    title: "Лабораторные весы Adventurer™",
    subtitle: "Универсальные весы для рутинных задач взвешивания.",
    ctaHref: "/products/precision-balances",
    src: "/home/hero-adventurer.jpg",
  },
  {
    series: "Pioneer™ PX",
    title: "Весы Pioneer™ для базовых задач",
    subtitle: "Надёжность и простота для образования и производства.",
    ctaHref: "/products/precision-balances",
    src: "/home/hero-pioneer.jpg",
  },
  {
    series: "Scout™",
    title: "Портативные весы Scout™",
    subtitle: "Компактные и прочные весы для работы где угодно.",
    ctaHref: "/products/portable-scales-2",
    src: "/home/hero-scout.jpg",
  },
];

export default function Hero({ slides }: { slides?: HeroSlide[] }) {
  const data: Slide[] = slides && slides.length > 0 ? slides : DEFAULT_SLIDES;
  const [active, setActive] = useState(0);
  const slide = data[Math.min(active, data.length - 1)];
  // Фирменные снимки OHAUS сняты на белом фоне, поэтому показываем их не
  // подложкой, а карточкой рядом с текстом — иначе тёмный баннер выцветает
  // и белый заголовок теряет контраст.
  const photo = slide.image?.asset
    ? urlFor(slide.image as any)
        .width(600)
        .fit("max")
        .url()
    : (slide.src ?? null);

  return (
    <section aria-label="Главный баннер" className="bg-ohaus-gray-dark text-white">
      <div className="container-site">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px]">
          <div className="relative flex min-h-[340px] flex-col justify-center overflow-hidden py-10 lg:min-h-[440px] lg:py-16">
            <div
              className="absolute inset-0 bg-gradient-to-br from-ohaus-gray-dark to-black/60"
              aria-hidden="true"
            />

            <div className="relative grid items-center gap-8 sm:grid-cols-[1fr_auto] lg:pr-10">
              <div className="max-w-xl">
                {slide.series ? (
                  <span className="font-heading text-sm font-bold uppercase tracking-widest text-ohaus-red">
                    {slide.series}
                  </span>
                ) : null}
                <h1 className="mt-3 font-heading text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
                  {slide.title}
                </h1>
                {slide.subtitle ? (
                  <p className="mt-4 max-w-md text-base text-white/80">
                    {slide.subtitle}
                  </p>
                ) : null}
                <Button
                  href={slide.ctaHref || "/products"}
                  size="lg"
                  className="mt-6"
                >
                  Подробнее
                </Button>
              </div>

              {photo ? (
                <div className="relative aspect-square w-[190px] justify-self-center border border-white/10 bg-white p-3 sm:w-[210px] lg:w-[270px]">
                  <Image
                    src={photo}
                    alt={slide.title || "Оборудование OHAUS"}
                    fill
                    sizes="(max-width: 640px) 190px, (max-width: 1024px) 210px, 270px"
                    className="object-contain"
                    priority
                  />
                </div>
              ) : null}
            </div>
          </div>

          <div
            role="tablist"
            aria-label="Серии весов"
            aria-orientation="vertical"
            className="flex flex-row divide-x divide-white/10 border-t border-white/10 lg:flex-col lg:divide-x-0 lg:divide-y lg:border-l lg:border-t-0"
          >
            {data.map((s, i) => (
              <div key={i} className="flex-1">
                <SeriesTab
                  title={s.series || s.title || `Слайд ${i + 1}`}
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
