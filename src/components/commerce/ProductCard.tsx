"use client";

import Link from "next/link";
import { useState } from "react";
import type { Product } from "@/lib/types";
import { cx, formatPrice } from "@/lib/format";
import { defaultVariant, variantPrice } from "@/lib/catalog";
import { useCart } from "@/context/CartProvider";
import { useWishlist } from "@/context/WishlistProvider";
import { EditorialImage, ImageFrame } from "@/components/media/EditorialImage";
import { ProductBadge } from "@/components/ui/Badge";
import { HeartIcon } from "@/components/ui/Icons";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
  sizes?: string;
  className?: string;
}

export function ProductCard({
  product,
  priority = false,
  sizes = "(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 50vw",
  className,
}: ProductCardProps) {
  const [hovered, setHovered] = useState(false);
  const { add } = useCart();
  const { has, toggle } = useWishlist();

  const variant = defaultVariant(product);
  const price = variantPrice(product, variant);
  const onSale = Boolean(product.compareAtPrice);
  const saved = has(product.slug);
  const secondImage = product.images[1] ?? product.images[0];
  const showSecond = hovered && product.images.length > 1;

  const quickAdd = () => {
    add({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      subtitle: product.subtitle,
      variant: {
        length: variant.length.label,
        density: variant.density.label,
        colour: variant.colour.label,
      },
      price,
      imageSeed: product.images[0].seed,
    });
  };

  return (
    <article
      className={cx("group relative flex flex-col", className)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative">
        <Link
          href={`/products/${product.slug}`}
          className="block focus-visible:outline-offset-4"
          aria-label={`${product.name}, ${formatPrice(price)}`}
        >
          <ImageFrame ratio="4/5" zoomOnGroupHover>
            <div
              className={cx(
                "absolute inset-0 transition-opacity duration-[600ms] ease-lux",
                showSecond ? "opacity-0" : "opacity-100",
              )}
            >
              <EditorialImage
                seed={product.images[0].seed}
                alt={product.images[0].alt}
                tone={product.images[0].tone}
                src={product.images[0].src}
                sizes={sizes}
                priority={priority}
              />
            </div>
            {product.images.length > 1 ? (
              <div
                aria-hidden="true"
                className={cx(
                  "absolute inset-0 transition-opacity duration-[600ms] ease-lux",
                  showSecond ? "opacity-100" : "opacity-0",
                )}
              >
                <EditorialImage
                  seed={secondImage.seed}
                  alt=""
                  tone={secondImage.tone}
                  src={secondImage.src}
                  sizes={sizes}
                />
              </div>
            ) : null}
          </ImageFrame>
        </Link>

        {/* Badges */}
        <div className="pointer-events-none absolute left-3 top-3 flex flex-col items-start gap-1.5">
          {!product.inStock ? (
            <ProductBadge badge="SOLD OUT" />
          ) : (
            <>
              {product.badges.map((badge) => (
                <ProductBadge key={badge} badge={badge} />
              ))}
              {onSale ? <ProductBadge badge="SALE" /> : null}
            </>
          )}
        </div>

        {/* Wishlist */}
        <button
          type="button"
          onClick={() => toggle(product.slug, product.name)}
          aria-pressed={saved}
          aria-label={saved ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
          className={cx(
            "absolute right-2 top-2 flex h-11 w-11 items-center justify-center rounded-full text-ink transition-[opacity,color,transform] duration-[350ms] ease-lux",
            "hover:text-gold focus-visible:opacity-100",
            saved ? "text-gold opacity-100" : "opacity-0 group-hover:opacity-100 md:opacity-0",
            "max-md:opacity-100",
          )}
        >
          <HeartIcon filled={saved} className="h-[18px] w-[18px]" />
        </button>

        {/* Quick add */}
        {product.inStock ? (
          <div
            className={cx(
              "absolute inset-x-2 bottom-2 transition-[opacity,transform] duration-[350ms] ease-lux",
              "opacity-0 translate-y-2 group-hover:translate-y-0 group-hover:opacity-100",
              "focus-within:translate-y-0 focus-within:opacity-100",
              "max-md:hidden",
            )}
          >
            <button
              type="button"
              onClick={quickAdd}
              className="h-11 w-full bg-white/95 text-[11px] font-medium uppercase tracking-[0.12em] text-black backdrop-blur-sm transition-colors duration-[350ms] ease-lux hover:bg-ink hover:text-white"
            >
              Quick add
            </button>
          </div>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col pt-4">
        <h3 className="font-sans text-[13.5px] font-medium leading-snug tracking-tight text-ink">
          <Link href={`/products/${product.slug}`} className="after:absolute after:inset-0 after:content-[''] md:after:content-none">
            {product.name}
          </Link>
        </h3>
        <p className="mt-1 text-[12px] text-muted">{product.subtitle}</p>
        <p className="mt-2.5 flex items-baseline gap-2 text-[13px] text-ink">
          <span className="tabular-nums">{formatPrice(price)}</span>
          {onSale ? (
            <span className="text-[12px] text-muted line-through tabular-nums">
              {formatPrice(product.compareAtPrice!)}
            </span>
          ) : null}
        </p>
      </div>
    </article>
  );
}
