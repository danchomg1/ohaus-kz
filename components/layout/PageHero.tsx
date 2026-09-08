import Image from "next/image";
import Breadcrumbs, { type Crumb } from "./Breadcrumbs";

/**
 * Шапка внутренней страницы в языке главного баннера: фотография во всю
 * ширину, лёгкое затемнение и стеклянная подложка с крошками и заголовком.
 *
 * Ниже главного баннера — он показывает кадр целиком и держит пропорцию
 * 1920×560, здесь же кадр обрезается по высоте: на внутренних страницах
 * важнее быстрее показать содержимое.
 */

/** Общие фоны страниц. Меняются в одном месте, а не по всем страницам. */
export const PAGE_BG = {
  /** Аналитические весы крупным планом — каталог и всё «про товар». */
  catalog: "/home/hero-bg-explorer.jpg",
  /** Светлая лаборатория с сотрудником — «про компанию и людей». */
  company: "/home/hero-bg-adventurer.jpg",
  /** Живая лаборатория — сервис, поиск, служебные страницы. */
  service: "/home/hero-bg-pioneer.jpg",
} as const;

type PageHeroProps = {
  title: string;
  subtitle?: string;
  /** Надзаголовок над названием — например, раздел каталога. */
  eyebrow?: string;
  crumbs: Crumb[];
  /** Путь к фону: значение из PAGE_BG или своя картинка (например, обложка новости). */
  image?: string;
  children?: React.ReactNode;
};

export default function PageHero({
  title,
  subtitle,
  eyebrow,
  crumbs,
  image = PAGE_BG.catalog,
  children,
}: PageHeroProps) {
  return (
    <section className="relative bg-ohaus-gray-dark">
      <div className="relative min-h-[240px] w-full sm:min-h-[280px] lg:min-h-[320px]">
        <Image
          src={image}
          alt=""
          fill
          sizes="100vw"
          priority
          className="object-cover"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/30 to-transparent"
          aria-hidden="true"
        />

        <div className="absolute inset-0 flex items-center py-8">
          <div className="container-site">
            <div className="max-w-2xl rounded-md border border-white/20 bg-black/40 p-5 shadow-xl backdrop-blur-lg sm:p-7">
              <Breadcrumbs items={crumbs} tone="onDark" />

              {eyebrow ? (
                <span className="mb-1.5 block font-heading text-xs font-bold uppercase tracking-widest text-white/80">
                  {eyebrow}
                </span>
              ) : null}
              <h1 className="font-heading text-2xl font-bold leading-tight text-white drop-shadow sm:text-3xl lg:text-4xl">
                {title}
              </h1>
              <span
                className="mt-3 block h-1 w-12 bg-ohaus-red"
                aria-hidden="true"
              />
              {subtitle ? (
                <p className="mt-3 max-w-prose text-sm text-white/90 sm:text-base">
                  {subtitle}
                </p>
              ) : null}
              {children}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
