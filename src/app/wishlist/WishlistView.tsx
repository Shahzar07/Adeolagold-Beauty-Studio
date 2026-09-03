"use client";

import { useWishlist } from "@/context/WishlistProvider";
import { products } from "@/lib/catalog";
import { ProductGrid, ProductGridSkeleton } from "@/components/commerce/ProductGrid";
import { ButtonLink } from "@/components/ui/Button";

export function WishlistView() {
  const { slugs, hydrated } = useWishlist();

  if (!hydrated) return <ProductGridSkeleton count={4} />;

  const saved = products.filter((product) => slugs.includes(product.slug));

  if (saved.length === 0) {
    return (
      <div className="mx-auto max-w-md py-16 text-center">
        <p className="display-3">Nothing saved yet.</p>
        <p className="mt-5 text-[15px] leading-relaxed text-ink-soft">
          Tap the heart on any piece to keep it here while you decide. Your wishlist stays on this
          device.
        </p>
        <ButtonLink href="/shop" className="mt-9 sm:min-w-[180px]">
          Shop hair
        </ButtonLink>
      </div>
    );
  }

  return <ProductGrid products={saved} columns={4} />;
}
