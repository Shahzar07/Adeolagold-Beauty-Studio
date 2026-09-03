"use client";

import { useMemo, useState } from "react";
import type { Product } from "@/lib/types";
import { cx } from "@/lib/format";
import { priceFrom } from "@/lib/catalog";
import { ProductGrid } from "./ProductGrid";
import {
  FilterDrawer,
  type FilterState,
  countFilters,
  emptyFilters,
} from "./FilterDrawer";
import { SortDropdown, type SortValue } from "./SortDropdown";
import { Button, ButtonLink } from "@/components/ui/Button";
import { CloseIcon, FilterIcon } from "@/components/ui/Icons";

interface CollectionViewProps {
  products: Product[];
  initialFilters?: Partial<FilterState>;
}

function matchesPrice(product: Product, ranges: string[]) {
  if (ranges.length === 0) return true;
  const price = priceFrom(product);
  return ranges.some((range) => {
    const [min, max] = range.split("-").map(Number);
    return price >= min && price < max;
  });
}

export function CollectionView({ products, initialFilters }: CollectionViewProps) {
  const [filters, setFilters] = useState<FilterState>({
    ...emptyFilters,
    ...initialFilters,
  });
  const [sort, setSort] = useState<SortValue>("featured");
  const [filterOpen, setFilterOpen] = useState(false);

  const filtered = useMemo(() => {
    const result = products.filter((product) => {
      if (filters.category.length && !filters.category.includes(product.category)) return false;
      if (filters.texture.length && !filters.texture.includes(product.texture)) return false;
      if (
        filters.length.length &&
        !product.lengths.some((l) => filters.length.includes(l.label))
      )
        return false;
      if (
        filters.density.length &&
        !product.densities.some((d) => filters.density.includes(d.label))
      )
        return false;
      if (
        filters.colour.length &&
        !product.colours.some((c) => filters.colour.includes(c.label))
      )
        return false;
      if (!matchesPrice(product, filters.price)) return false;
      if (filters.availability.length) {
        const wanted = product.inStock ? "in-stock" : "out-of-stock";
        if (!filters.availability.includes(wanted)) return false;
      }
      return true;
    });

    const sorted = [...result];
    switch (sort) {
      case "newest":
        sorted.sort((a, b) => b.releasedAt.localeCompare(a.releasedAt));
        break;
      case "price-asc":
        sorted.sort((a, b) => priceFrom(a) - priceFrom(b));
        break;
      case "price-desc":
        sorted.sort((a, b) => priceFrom(b) - priceFrom(a));
        break;
      case "rating":
        sorted.sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount);
        break;
      case "name":
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        sorted.sort(
          (a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)),
        );
    }
    return sorted;
  }, [products, filters, sort]);

  const activeCount = countFilters(filters);
  const activeChips = (Object.entries(filters) as [keyof FilterState, string[]][]).flatMap(
    ([key, values]) => values.map((value) => ({ key, value })),
  );

  return (
    <>
      {/* Controls */}
      <div className="sticky top-[62px] z-30 -mx-[var(--page-padding)] border-y border-line bg-background/94 px-[var(--page-padding)] backdrop-blur-md lg:top-[70px]">
        <div className="flex items-center justify-between gap-4 py-1.5">
          <button
            type="button"
            onClick={() => setFilterOpen(true)}
            className="flex h-11 items-center gap-2.5 text-[11px] font-medium uppercase tracking-[0.14em] text-ink transition-colors duration-[180ms] hover:text-gold"
          >
            <FilterIcon className="h-4 w-4" />
            Filter
            {activeCount > 0 ? (
              <span className="flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-gold px-1 text-[9.5px] tabular-nums text-white">
                {activeCount}
              </span>
            ) : null}
          </button>

          <p className="hidden text-[11px] uppercase tracking-[0.14em] text-muted sm:block">
            {filtered.length} {filtered.length === 1 ? "piece" : "pieces"}
          </p>

          <SortDropdown value={sort} onChange={setSort} />
        </div>

        {activeChips.length > 0 ? (
          <div className="no-scrollbar -mx-[var(--page-padding)] flex gap-2 overflow-x-auto px-[var(--page-padding)] pb-3">
            {activeChips.map((chip) => (
              <button
                key={`${chip.key}-${chip.value}`}
                type="button"
                onClick={() =>
                  setFilters((current) => ({
                    ...current,
                    [chip.key]: current[chip.key].filter((v) => v !== chip.value),
                  }))
                }
                className="flex shrink-0 items-center gap-2 border border-line px-3 py-1.5 text-[11.5px] text-ink-soft transition-colors duration-[180ms] hover:border-ink hover:text-ink"
              >
                {chip.value}
                <CloseIcon className="h-3 w-3" />
                <span className="sr-only">Remove filter</span>
              </button>
            ))}
            <button
              type="button"
              onClick={() => setFilters(emptyFilters)}
              className="link-underline shrink-0 px-1 text-[11px] uppercase tracking-[0.12em] text-muted transition-colors hover:text-ink"
            >
              Clear all
            </button>
          </div>
        ) : null}
      </div>

      {/* Results */}
      <div className={cx("pt-12 md:pt-14")}>
        {filtered.length > 0 ? (
          <ProductGrid products={filtered} columns={4} priorityCount={4} />
        ) : (
          <div className="mx-auto max-w-md py-20 text-center">
            <p className="display-3">Nothing matches those filters.</p>
            <p className="mt-4 text-[14.5px] leading-relaxed text-ink-soft">
              Try widening your selection, or tell us what you are looking for and we will source
              it.
            </p>
            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <Button onClick={() => setFilters(emptyFilters)}>Clear filters</Button>
              <ButtonLink href="/contact" variant="secondary">
                Ask the studio
              </ButtonLink>
            </div>
          </div>
        )}
      </div>

      <FilterDrawer
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        filters={filters}
        onChange={setFilters}
        resultCount={filtered.length}
      />
    </>
  );
}
