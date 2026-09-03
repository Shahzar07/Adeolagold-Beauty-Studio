"use client";

import { useEffect, useId, useRef, useState } from "react";
import { cx } from "@/lib/format";
import { CheckIcon, ChevronDownIcon } from "@/components/ui/Icons";

export const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "rating", label: "Top rated" },
  { value: "name", label: "Alphabetical" },
] as const;

export type SortValue = (typeof sortOptions)[number]["value"];

export function SortDropdown({
  value,
  onChange,
}: {
  value: SortValue;
  onChange: (value: SortValue) => void;
}) {
  const [open, setOpen] = useState(false);
  const wrapper = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: MouseEvent) => {
      if (!wrapper.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const active = sortOptions.find((option) => option.value === value) ?? sortOptions[0];

  return (
    <div ref={wrapper} className="relative">
      <button
        type="button"
        id={id}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="flex h-11 items-center gap-2 text-[11px] font-medium uppercase tracking-[0.14em] text-ink transition-colors duration-[180ms] hover:text-gold"
      >
        <span className="text-muted">Sort:</span>
        {active.label}
        <ChevronDownIcon
          className={cx("h-3.5 w-3.5 transition-transform duration-[350ms] ease-lux", open && "rotate-180")}
        />
      </button>

      {open ? (
        <ul
          role="listbox"
          aria-labelledby={id}
          className="animate-slide-down absolute right-0 top-full z-40 mt-1 w-56 border border-line bg-white py-1 shadow-subtle"
        >
          {sortOptions.map((option) => (
            <li key={option.value}>
              <button
                type="button"
                role="option"
                aria-selected={option.value === value}
                onClick={() => {
                  onChange(option.value);
                  setOpen(false);
                }}
                className={cx(
                  "flex w-full items-center justify-between gap-3 px-4 py-2.5 text-left text-[13px] transition-colors duration-[180ms] hover:bg-surface",
                  option.value === value ? "text-ink" : "text-ink-soft",
                )}
              >
                {option.label}
                {option.value === value ? <CheckIcon className="h-3.5 w-3.5 text-gold" /> : null}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
