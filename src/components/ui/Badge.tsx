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
      ? "bg-white/85 text-muted"
      : badge === "LIMITED" || badge === "SALE"
        ? "bg-ink/90 text-white"
        : "bg-white/90 text-ink";

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
