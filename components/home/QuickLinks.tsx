import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import CategoryCard from "./CategoryCard";

const LINKS = [
  { title: "Frontier™ серии 5000", href: "/products/equipment/centrifuges" },
  { title: "Весы тяжелого типа", href: "/products/balances-scales/floor-scales" },
  {
    title: "Анализаторы влагосодержания",
    href: "/products/balances-scales/moisture-analyzers",
  },
  {
    title: "Калибровочные гири",
    href: "/products/weights/calibration-weights",
  },
];

export default function QuickLinks() {
  return (
    <section aria-label="Ссылки быстрого доступа" className="py-12 lg:py-16">
      <Container>
        <SectionHeading title="Ссылки быстрого доступа" />
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
          {LINKS.map((item) => (
            <CategoryCard
              key={item.href + item.title}
              title={item.title}
              href={item.href}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
