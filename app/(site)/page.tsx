import Hero from "@/components/home/Hero";
import QuickLinks from "@/components/home/QuickLinks";
import PromoBanner from "@/components/home/PromoBanner";
import { getHomepage } from "@/sanity/lib/queries";

export const revalidate = 60;

export default async function HomePage() {
  const home = await getHomepage();

  return (
    <>
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
