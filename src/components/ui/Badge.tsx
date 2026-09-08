import { cx } from "@/lib/format";
import type { Badge as BadgeType } from "@/lib/types";

/** Subtle merchandising labels — never loud discount flashes. */
export function ProductBadge({
  badge,
  className,
}: {
  badge: BadgeType | "SOLD OUT" | "SALE";
  className?: string;
}) {
  const tone =
    badge === "SOLD OUT"
      ? "bg-black/80 text-white/70"
      : badge === "LIMITED" || badge === "SALE"
        ? "bg-gold text-black"
        : "bg-white/92 text-black";

  return (
    <span
      className={cx(
        "inline-flex items-center px-2.5 py-1 text-[9.5px] font-medium uppercase tracking-[0.18em] backdrop-blur-sm",
        tone,
        className,
      )}
    >
      {badge}
    </span>
  );
}
