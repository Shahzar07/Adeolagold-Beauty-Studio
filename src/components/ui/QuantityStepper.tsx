"use client";

import { cx } from "@/lib/format";
import { MinusIcon, PlusIcon } from "./Icons";

interface QuantityStepperProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  label?: string;
  size?: "sm" | "md";
  className?: string;
}

export function QuantityStepper({
  value,
  onChange,
  min = 1,
  max = 10,
  label = "Quantity",
  size = "md",
  className,
}: QuantityStepperProps) {
  const dimension = size === "sm" ? "h-9 w-9" : "h-[46px] w-[46px]";

  return (
    <div
      className={cx("inline-flex items-center border border-line bg-surface", className)}
      role="group"
      aria-label={label}
    >
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        aria-label={`Decrease ${label.toLowerCase()}`}
        className={cx(
          dimension,
          "flex items-center justify-center text-ink transition-colors duration-[180ms] hover:text-gold disabled:opacity-30 disabled:hover:text-ink",
        )}
      >
        <MinusIcon className="h-3.5 w-3.5" />
      </button>
      <span
        aria-live="polite"
        className={cx(
          "min-w-[2.25rem] text-center text-[13px] tabular-nums",
          size === "sm" && "min-w-[1.75rem]",
        )}
      >
        {value}
      </span>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        aria-label={`Increase ${label.toLowerCase()}`}
        className={cx(
          dimension,
          "flex items-center justify-center text-ink transition-colors duration-[180ms] hover:text-gold disabled:opacity-30 disabled:hover:text-ink",
        )}
      >
        <PlusIcon className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
