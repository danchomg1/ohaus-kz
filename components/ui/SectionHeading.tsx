import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  title: string;
  subtitle?: string;
  className?: string;
  align?: "left" | "center";
  as?: "h1" | "h2" | "h3";
};

export default function SectionHeading({
  title,
  subtitle,
  className,
  align = "left",
  as: Tag = "h2",
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-6",
        align === "center" && "text-center",
        className,
      )}
    >
      <Tag className="font-heading text-2xl font-bold tracking-tight text-ohaus-ink sm:text-3xl">
        {title}
      </Tag>
      {subtitle ? (
        <p className="mt-2 text-base text-ohaus-muted">{subtitle}</p>
      ) : null}
      <span className="mt-3 block h-1 w-12 bg-ohaus-red" aria-hidden="true" />
    </div>
  );
}
