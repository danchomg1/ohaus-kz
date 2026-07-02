import { ImageIcon } from "lucide-react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import SanityImg from "@/components/ui/SanityImg";
import type { HomepageData } from "@/sanity/lib/queries";

type PromoProps = {
  title?: string;
  subtitle?: string;
  href?: string;
  image?: HomepageData extends null ? never : NonNullable<HomepageData>["promoImage"];
};

export default function PromoBanner({
  title,
  subtitle,
  href,
  image,
}: PromoProps) {
  return (
    <section aria-label="Рекламные акции" className="bg-ohaus-bg-soft py-12 lg:py-16">
      <Container>
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
          <div>
            <h2 className="font-heading text-2xl font-bold text-ohaus-ink sm:text-3xl">
              {title || "Рекламные акции"}
            </h2>
            <p className="mt-3 text-base text-ohaus-muted">
              {subtitle || "Не пропустите наши специальные предложения!"}
            </p>
            <Button href={href || "/news"} size="lg" className="mt-6">
              Посмотреть
            </Button>
          </div>

          <div className="relative flex aspect-[16/9] items-center justify-center overflow-hidden bg-gradient-to-br from-ohaus-red to-ohaus-red-dark">
            {image?.asset ? (
              <SanityImg
                image={image}
                alt={title || "Акция"}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            ) : (
              <ImageIcon className="h-16 w-16 text-white/30" aria-hidden="true" />
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
