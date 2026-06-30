import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import Skeleton from "@/components/ui/Skeleton";

export const metadata: Metadata = {
  title: "О компании",
  description: "OHAUS Kazakhstan — официальное представительство OHAUS.",
};

export default function AboutPage() {
  return (
    <Container className="max-w-3xl">
      <Breadcrumbs items={[{ title: "О компании" }]} />
      <SectionHeading
        as="h1"
        title="О компании"
        subtitle="OHAUS Kazakhstan — официальное представительство OHAUS."
      />
      <div className="space-y-3 pb-16">
        {Array.from({ length: 12 }).map((_, i) => (
          <Skeleton
            key={i}
            className="h-4"
            style={{ width: `${72 + ((i * 5) % 28)}%` }}
          />
        ))}
      </div>
    </Container>
  );
}
