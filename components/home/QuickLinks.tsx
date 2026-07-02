import Link from "next/link";
import { ImageIcon } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import SanityImg from "@/components/ui/SanityImg";
import type { QuickLinkData } from "@/sanity/lib/queries";

const DEFAULT_LINKS: QuickLinkData[] = [
  { title: "Центрифуги Frontier™ 5000", href: "/products/centrifuges" },
  { title: "Напольные весы", href: "/products/floor-scales" },
  { title: "Анализаторы влагосодержания", href: "/products/moisture-analyzers" },
  { title: "Калибровочные гири", href: "/products/calibration-weights" },
];

export default function QuickLinks({ links }: { links?: QuickLinkData[] }) {
  const data = links && links.length > 0 ? links : DEFAULT_LINKS;

  return (
    <section aria-label="Ссылки быстрого доступа" className="py-12 lg:py-16">
      <Container>
        <SectionHeading title="Ссылки быстрого доступа" />
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
          {data.map((item, i) => (
            <Link
              key={i}
              href={item.href || "/products"}
              className="group flex flex-col border border-ohaus-line bg-white transition-shadow hover:shadow-card"
            >
              <div className="relative flex aspect-[4/3] items-center justify-center bg-ohaus-bg-soft">
                {item.image?.asset ? (
                  <SanityImg
                    image={item.image}
                    alt={item.title || ""}
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    className="object-contain p-2"
                  />
                ) : (
                  <ImageIcon
                    className="h-10 w-10 text-ohaus-line"
                    aria-hidden="true"
                  />
                )}
              </div>
              <div className="p-4">
                <p className="font-heading text-sm font-bold text-ohaus-ink transition-colors group-hover:text-ohaus-red">
                  {item.title}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
