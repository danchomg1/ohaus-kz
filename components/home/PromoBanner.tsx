import { ImageIcon } from "lucide-react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

export default function PromoBanner() {
  return (
    <section aria-label="Рекламные акции" className="bg-ohaus-bg-soft py-12 lg:py-16">
      <Container>
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
          <div>
            <h2 className="font-heading text-2xl font-bold text-ohaus-ink sm:text-3xl">
              Рекламные акции
            </h2>
            <p className="mt-3 text-base text-ohaus-muted">
              Не пропустите наши специальные предложения!
            </p>
            <Button href="/news" size="lg" className="mt-6">
              Посмотреть
            </Button>
          </div>

          {/* Product line placeholder on a gradient */}
          <div className="flex aspect-[16/9] items-center justify-center bg-gradient-to-br from-ohaus-red to-ohaus-red-dark">
            <ImageIcon className="h-16 w-16 text-white/30" aria-hidden="true" />
          </div>
        </div>
      </Container>
    </section>
  );
}
