import type { Product } from "@/lib/types";
import { cx } from "@/lib/format";
import { Reveal } from "@/components/ui/Reveal";
import { ProductCard } from "./ProductCard";

interface ProductGridProps {
  products: Product[];
  /** Columns at the widest breakpoint. Tablet is always 2, mobile always 2. */
  columns?: 3 | 4;
  priorityCount?: number;
  className?: string;
}

export function ProductGrid({
  products,
  columns = 4,
  priorityCount = 0,
  className,
}: ProductGridProps) {
  const sizes =
    columns === 4
      ? "(min-width: 1280px) 23vw, (min-width: 768px) 31vw, 46vw"
      : "(min-width: 1024px) 30vw, (min-width: 768px) 31vw, 46vw";

  return (
    <div
      className={cx(
        "grid grid-cols-2 gap-x-4 gap-y-11 md:gap-x-6 md:gap-y-14 lg:gap-x-7",
        columns === 4 ? "lg:grid-cols-3 xl:grid-cols-4" : "lg:grid-cols-3",
        className,
      )}
    >
      {products.map((product, index) => (
        <Reveal key={product.id} as="div" delay={Math.min(index, 7) * 60}>
          <ProductCard
            product={product}
            sizes={sizes}
            priority={index < priorityCount}
          />
        </Reveal>
      ))}
    </div>
  );
}

/** Grid-shaped loading state used by route-level loading.tsx files. */
export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-11 md:gap-x-6 md:gap-y-14 lg:grid-cols-3 lg:gap-x-7 xl:grid-cols-4">
      {Array.from({ length: count }, (_, i) => (
        <div key={i}>
          <div className="skeleton aspect-[4/5] rounded-subtle" />
          <div className="skeleton mt-4 h-3 w-3/4 rounded-subtle" />
          <div className="skeleton mt-2 h-3 w-1/2 rounded-subtle" />
          <div className="skeleton mt-3 h-3 w-1/4 rounded-subtle" />
        </div>
      ))}
    </div>
  );
}
