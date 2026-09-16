import Hero from "@/components/home/Hero";
import QuickLinks from "@/components/home/QuickLinks";
import PromoBanner from "@/components/home/PromoBanner";
import { OrganizationJsonLd } from "@/components/seo/JsonLd";
import { resolveContacts } from "@/lib/contacts";
import { getHomepage, getSiteSettings } from "@/sanity/lib/queries";

export const revalidate = 60;

export default async function HomePage() {
  const [home, settings] = await Promise.all([
    getHomepage(),
    getSiteSettings(),
  ]);

  const c = resolveContacts(settings);

  return (
    <>
      <OrganizationJsonLd
        phone={c.phone}
        email={c.email}
        address={c.fullAddress}
      />

      {/*
        Главный заголовок сайта. Он один и постоянный: раньше H1 брался из
        слайда баннера и менялся при переключении, из-за чего поисковик считал
        сайт посвящённым одной серии весов. Визуально заголовок не показываем —
        его роль выполняет баннер, — но он остаётся в разметке и озвучивается
        программами чтения с экрана.
      */}
      <h1 className="sr-only">
        OHAUS Kazakhstan — лабораторные и промышленные весы, анализаторы
        влажности и лабораторное оборудование
      </h1>

      <Hero slides={home?.heroSlides} />
      <QuickLinks links={home?.quickLinks} />
      <PromoBanner
        title={home?.promoTitle}
        subtitle={home?.promoSubtitle}
        href={home?.promoHref}
        image={home?.promoImage}
      />
    </>
  );
}
