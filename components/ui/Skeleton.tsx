import { cn } from "@/lib/utils";

type SkeletonProps = {
  className?: string;
  style?: React.CSSProperties;
  /** Render without the pulse animation (e.g. for static placeholders). */
  static?: boolean;
};

/** Base animated skeleton primitive. */
export default function Skeleton({
  className,
  style,
  static: isStatic,
}: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      style={style}
      className={cn(
        "bg-ohaus-line/80 rounded",
        !isStatic && "animate-pulse-soft",
        className,
      )}
    />
  );
}
