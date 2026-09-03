import Link from "next/link";
import { cx } from "@/lib/format";

/** Wordmark. The hairline rule under the name is the brand's signature detail. */
export function Logo({
  className,
  compact = false,
  onClick,
}: {
  className?: string;
  compact?: boolean;
  onClick?: () => void;
}) {
  return (
    <Link
      href="/"
      onClick={onClick}
      aria-label="Adeolagold Beauty Studio — home"
      className={cx("group inline-flex flex-col items-start leading-none", className)}
    >
      <span
        className={cx(
          "font-display font-medium tracking-[0.13em] transition-[font-size] duration-[350ms] ease-lux",
          compact ? "text-[19px]" : "text-[22px] md:text-[25px]",
        )}
      >
        ADEOLAGOLD
      </span>
      <span
        className={cx(
          "mt-1 flex w-full items-center gap-1.5 overflow-hidden transition-[max-height,opacity] duration-[350ms] ease-lux",
          compact ? "max-h-0 opacity-0" : "max-h-4 opacity-100",
        )}
      >
        <span className="h-px w-4 bg-gold" aria-hidden="true" />
        <span className="text-[8.5px] font-medium uppercase tracking-[0.32em] text-muted">
          Beauty Studio
        </span>
      </span>
    </Link>
  );
}
