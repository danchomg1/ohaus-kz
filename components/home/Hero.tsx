"use client";

import { useState } from "react";
import Image from "next/image";
import Button from "@/components/ui/Button";
import SeriesTab from "./SeriesTab";
import { urlFor } from "@/sanity/lib/image";
import type { HeroSlide } from "@/sanity/lib/queries";

/** Слайд по умолчанию может ссылаться на файл из /public вместо картинки Sanity. */
type Slide = HeroSlide & { src?: string };

// Фоны сняты под баннер 1920×560 — держим этот формат при подготовке новых.
const DEFAULT_SLIDES: Slide[] = [
  {
    series: "Explorer™ EX",
    title: "Аналитические и прецизионные весы Explorer™",
    subtitle: "Высокая точность и производительность для лаборатории.",
    ctaHref: "/products/analytical-balances",
    src: "/home/hero-bg-explorer.jpg",
  },
  {
    series: "Adventurer™ AX",
    title: "Лабораторные весы Adventurer™",
    subtitle: "Универсальные весы для рутинных задач взвешивания.",
    ctaHref: "/products/precision-balances",
    src: "/home/hero-bg-adventurer.jpg",
  },
  {
    series: "Pioneer™ PX",
    title: "Весы Pioneer™ для базовых задач",
    subtitle: "Надёжность и простота для образования и производства.",
    ctaHref: "/products/precision-balances",
    src: "/home/hero-bg-pioneer.jpg",
  },
];

export default function Hero({ slides }: { slides?: HeroSlide[] }) {
  const data: Slide[] = slides && slides.length > 0 ? slides : DEFAULT_SLIDES;
  const [active, setActive] = useState(0);

  return (
    <section aria-label="Главный баннер" className="bg-ohaus-gray-dark">
      {/*
        Баннер во всю ширину экрана. Пропорция 24/7 — это ровно 1920×560, при
        ней кадр виден целиком. На узких экранах включается минимальная высота,
        иначе баннер становится слишком низким для заголовка и кнопки.
      */}
      <div className="relative min-h-[480px] w-full lg:aspect-[24/7] lg:min-h-[400px]">
        {data.map((slide, i) => {
          const photo = slide.image?.asset
            ? urlFor(slide.image as never)
                .width(1920)
                .fit("max")
                .url()
            : (slide.src ?? null);
          if (!photo) return null;
          return (
            <Image
              key={i}
              src={photo}
              alt=""
              fill
              sizes="100vw"
              priority={i === 0}
              className={`object-cover transition-opacity duration-500 ${
                i === active ? "opacity-100" : "opacity-0"
              }`}
            />
          );
        })}

        {/* Затемнение: слева плотное — под текст, справа почти прозрачное. */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/15 to-transparent"
          aria-hidden="true"
        />
        {/* Подложка под вкладками, чтобы они читались на светлом кадре. */}
        <div
          className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/45 to-transparent"
          aria-hidden="true"
        />

        <div className="absolute inset-0 flex items-center pb-16 pt-8 sm:pb-20">
          <div className="container-site">
            <div className="max-w-xl rounded-md border border-white/20 bg-black/40 p-6 shadow-xl backdrop-blur-lg sm:p-8">
              {data[active].series ? (
                <span className="font-heading text-sm font-bold uppercase tracking-widest text-white drop-shadow">
                  {data[active].series}
                </span>
              ) : null}
              <h1 className="mt-3 font-heading text-2xl font-bold leading-tight text-white drop-shadow sm:text-3xl lg:text-4xl">
                {data[active].title}
              </h1>
              {data[active].subtitle ? (
                <p className="mt-3 text-sm text-white/90 drop-shadow sm:text-base">
                  {data[active].subtitle}
                </p>
              ) : null}
              <Button
                href={data[active].ctaHref || "/products"}
                size="lg"
                className="mt-6"
              >
                Подробнее
              </Button>
            </div>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0">
          <div className="container-site">
            <div
              role="tablist"
              aria-label="Серии весов"
              className="flex gap-px"
            >
              {data.map((s, i) => (
                <SeriesTab
                  key={i}
                  title={s.series || s.title || `Слайд ${i + 1}`}
                  active={i === active}
                  onSelect={() => setActive(i)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
