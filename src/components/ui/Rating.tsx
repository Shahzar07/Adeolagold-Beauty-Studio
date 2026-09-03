import { cx } from "@/lib/format";
import { StarIcon } from "./Icons";

export function Rating({
  value,
  count,
  className,
  showCount = true,
}: {
  value: number;
  count?: number;
  className?: string;
  showCount?: boolean;
}) {
  return (
    <div className={cx("flex items-center gap-2", className)}>
      <span className="flex items-center gap-[3px] text-gold" aria-hidden="true">
        {[0, 1, 2, 3, 4].map((i) => (
          <StarIcon
            key={i}
            className="h-3 w-3"
            fillRatio={Math.max(0, Math.min(1, value - i))}
          />
        ))}
      </span>
      <span className="sr-only">{`Rated ${value} out of 5`}</span>
      {showCount && count ? (
        <span className="text-[11px] tracking-[0.06em] text-muted">
          {value.toFixed(1)} · {count} reviews
        </span>
      ) : null}
    </div>
  );
}
