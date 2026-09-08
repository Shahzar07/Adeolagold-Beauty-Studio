"use client";

import { facets } from "@/lib/catalog";
import { cx } from "@/lib/format";
import { Drawer } from "@/components/ui/Drawer";
import { Button } from "@/components/ui/Button";
import { CheckIcon } from "@/components/ui/Icons";

export interface FilterState {
  category: string[];
  texture: string[];
  length: string[];
  density: string[];
  colour: string[];
  price: string[];
  availability: string[];
}

export const emptyFilters: FilterState = {
  category: [],
  texture: [],
  length: [],
  density: [],
  colour: [],
  price: [],
  availability: [],
};

export function countFilters(filters: FilterState): number {
  return Object.values(filters).reduce((n, list) => n + list.length, 0);
}

interface Group {
  key: keyof FilterState;
  label: string;
  options: { value: string; label: string }[];
  swatches?: boolean;
}

const groups: Group[] = [
  { key: "category", label: "Category", options: [...facets.category] },
  {
    key: "texture",
    label: "Texture",
    options: facets.texture.map((t) => ({ value: t, label: t })),
  },
  {
    key: "length",
    label: "Length",
    options: facets.length.map((l) => ({ value: l, label: l })),
  },
  {
    key: "density",
    label: "Density",
    options: facets.density.map((d) => ({ value: d, label: d })),
  },
  {
    key: "colour",
    label: "Colour",
    options: facets.colour.map((c) => ({ value: c, label: c })),
  },
  { key: "price", label: "Price", options: [...facets.price] },
  { key: "availability", label: "Availability", options: [...facets.availability] },
];

export function FilterDrawer({
  open,
  onClose,
  filters,
  onChange,
  resultCount,
}: {
  open: boolean;
  onClose: () => void;
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  resultCount: number;
}) {
  const toggle = (key: keyof FilterState, value: string) => {
    const list = filters[key];
    onChange({
      ...filters,
      [key]: list.includes(value) ? list.filter((v) => v !== value) : [...list, value],
    });
  };

  return (
    <Drawer
      open={open}
      onClose={onClose}
      title="Filter"
      side="left"
      widthClass="max-w-[420px]"
      footer={
        <div className="flex items-center gap-3">
          <Button variant="ghost" onClick={() => onChange(emptyFilters)} className="flex-1">
            Clear all
          </Button>
          <Button onClick={onClose} className="flex-[1.4]">
            Show {resultCount} {resultCount === 1 ? "item" : "items"}
          </Button>
        </div>
      }
    >
      <div className="px-6 py-2">
        {groups.map((group) => (
          <fieldset key={group.key} className="border-b border-line py-6 last:border-b-0">
            <legend className="eyebrow mb-4">{group.label}</legend>
            <div
              className={cx(
                group.key === "length" || group.key === "density"
                  ? "flex flex-wrap gap-2"
                  : "flex flex-col gap-0.5",
              )}
            >
              {group.options.map((option) => {
                const checked = filters[group.key].includes(option.value);

                if (group.key === "length" || group.key === "density") {
                  return (
                    <label
                      key={option.value}
                      className={cx(
                        "flex h-11 min-w-[62px] cursor-pointer items-center justify-center border px-3 text-[12.5px] transition-colors duration-[180ms]",
                        checked
                          ? "border-gold bg-gold text-black"
                          : "border-line text-ink-soft hover:border-gold hover:text-ink",
                      )}
                    >
                      <input
                        type="checkbox"
                        className="sr-only"
                        checked={checked}
                        onChange={() => toggle(group.key, option.value)}
                      />
                      {option.label}
                    </label>
                  );
                }

                return (
                  <label
                    key={option.value}
                    className="flex min-h-11 cursor-pointer items-center gap-3 py-1 text-[13.5px] text-ink-soft transition-colors duration-[180ms] hover:text-ink"
                  >
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={checked}
                      onChange={() => toggle(group.key, option.value)}
                    />
                    <span
                      aria-hidden="true"
                      className={cx(
                        "flex h-4 w-4 shrink-0 items-center justify-center border transition-colors duration-[180ms]",
                        checked ? "border-gold bg-gold text-black" : "border-line",
                      )}
                    >
                      {checked ? <CheckIcon className="h-2.5 w-2.5" /> : null}
                    </span>
                    {option.label}
                  </label>
                );
              })}
            </div>
          </fieldset>
        ))}
      </div>
    </Drawer>
  );
}
