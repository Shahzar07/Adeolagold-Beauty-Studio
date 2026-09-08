"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { Product, VariantOption } from "@/lib/types";
import { cx, formatPrice } from "@/lib/format";
import { defaultVariant, variantPrice } from "@/lib/catalog";
import { useCart } from "@/context/CartProvider";
import { useWishlist } from "@/context/WishlistProvider";
import { Button } from "@/components/ui/Button";
import { QuantityStepper } from "@/components/ui/QuantityStepper";
import { Accordion } from "@/components/ui/Accordion";
import { Rating } from "@/components/ui/Rating";
import { HeartIcon, LockIcon, SparkIcon, TruckIcon } from "@/components/ui/Icons";

export function ProductInfo({ product }: { product: Product }) {
  const initial = defaultVariant(product);
  const [length, setLength] = useState<VariantOption>(initial.length);
  const [density, setDensity] = useState<VariantOption>(initial.density);
  const [colour, setColour] = useState<VariantOption>(initial.colour);
  const [quantity, setQuantity] = useState(1);

  const { add } = useCart();
  const { has, toggle } = useWishlist();
  const router = useRouter();
  const addButton = useRef<HTMLDivElement>(null);
  const [showStickyBar, setShowStickyBar] = useState(false);

  const price = variantPrice(product, { length, density, colour });
  const saved = has(product.slug);

  // The mobile sticky add-to-cart appears once the inline button scrolls away.
  useEffect(() => {
    const node = addButton.current;
    if (!node || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      ([entry]) => setShowStickyBar(!entry.isIntersecting),
      { rootMargin: "-72px 0px 0px 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const addToBag = () => {
    add(
      {
        productId: product.id,
        slug: product.slug,
        name: product.name,
        subtitle: product.subtitle,
        variant: {
          length: length.label,
          density: density.label,
          colour: colour.label,
        },
        price,
        imageSeed: product.images[0].seed,
      },
      quantity,
    );
  };

  const buyNow = () => {
    addToBag();
    router.push("/checkout");
  };

  const accordionItems = [
    {
      title: "Description",
      content: (
        <div className="flex flex-col gap-4">
          {product.description.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      ),
    },
    {
      title: "Details",
      content: (
        <ul className="flex flex-col gap-2">
          {product.details.map((detail) => (
            <li key={detail} className="flex gap-3">
              <span aria-hidden="true" className="mt-2 h-px w-3 shrink-0 bg-gold" />
              {detail}
            </li>
          ))}
        </ul>
      ),
    },
    {
      title: "Shipping",
      content: (
        <div className="flex flex-col gap-3">
          <p>
            UK standard delivery is 2–3 working days and complimentary over £150. Next-day
            delivery is £8.95 when ordered before 2pm on a working day.
          </p>
          <p>
            International shipping is calculated at checkout and typically takes 5–9 working days.
            Duties are payable by the recipient.
          </p>
          <Link href="/help/shipping" className="link-underline text-ink">
            Full shipping information
          </Link>
        </div>
      ),
    },
    {
      title: "Returns",
      content: (
        <div className="flex flex-col gap-3">
          <p>
            Unopened, unworn hair with the security seal intact can be returned within 14 days.
            Once opened, worn or customised, hair cannot be returned for hygiene reasons.
          </p>
          <p>Faulty items are replaced or refunded in full, including return postage.</p>
          <Link href="/help/returns" className="link-underline text-ink">
            Full returns policy
          </Link>
        </div>
      ),
    },
    {
      title: "Hair Care",
      content: (
        <ul className="flex flex-col gap-2">
          {product.care.map((tip) => (
            <li key={tip} className="flex gap-3">
              <span aria-hidden="true" className="mt-2 h-px w-3 shrink-0 bg-gold" />
              {tip}
            </li>
          ))}
        </ul>
      ),
    },
  ];

  return (
    <div>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        {product.badges.map((badge) => (
          <span
            key={badge}
            className="text-[10px] font-medium uppercase tracking-[0.18em] text-gold"
          >
            {badge}
          </span>
        ))}
        {!product.inStock ? (
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-muted">
            Sold out
          </span>
        ) : null}
      </div>

      <h1 className="display-2 mt-4 max-w-[16ch]">{product.name}</h1>
      <p className="mt-3 text-[13.5px] text-muted">{product.subtitle}</p>

      <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2">
        <Rating value={product.rating} count={product.reviewCount} />
      </div>

      <div className="mt-6 flex items-baseline gap-3">
        <p className="font-display text-[30px] leading-none tabular-nums">{formatPrice(price)}</p>
        {product.compareAtPrice ? (
          <p className="text-[15px] text-muted line-through tabular-nums">
            {formatPrice(product.compareAtPrice)}
          </p>
        ) : null}
      </div>

      <p className="mt-6 max-w-lg text-[14.5px] leading-relaxed text-ink-soft">
        {product.excerpt}
      </p>

      <dl className="mt-7 flex flex-wrap gap-x-10 gap-y-3 border-y border-line py-5 text-[12.5px]">
        <div>
          <dt className="text-muted">Hair type</dt>
          <dd className="mt-1 text-ink">{product.origin}</dd>
        </div>
        <div>
          <dt className="text-muted">Texture</dt>
          <dd className="mt-1 text-ink">{product.texture}</dd>
        </div>
        {product.capConstruction ? (
          <div>
            <dt className="text-muted">Cap</dt>
            <dd className="mt-1 text-ink">{product.capConstruction}</dd>
          </div>
        ) : null}
      </dl>

      {/* Selectors */}
      <div className="mt-8 flex flex-col gap-7">
        <OptionRow
          label="Length"
          options={product.lengths}
          selected={length}
          onSelect={setLength}
        />
        <OptionRow
          label="Density"
          options={product.densities}
          selected={density}
          onSelect={setDensity}
        />
        <SwatchRow
          label="Colour"
          options={product.colours}
          selected={colour}
          onSelect={setColour}
        />
      </div>

      {/* Actions */}
      <div ref={addButton} className="mt-9 flex flex-col gap-3">
        <div className="flex items-stretch gap-3">
          <QuantityStepper value={quantity} onChange={setQuantity} className="shrink-0" />
          <Button
            onClick={addToBag}
            disabled={!product.inStock}
            className="flex-1"
            aria-label={`Add ${product.name} to bag`}
          >
            {product.inStock ? "Add to Bag" : "Sold Out"}
          </Button>
        </div>

        <Button onClick={buyNow} disabled={!product.inStock} variant="secondary" fullWidth>
          Buy Now
        </Button>

        <button
          type="button"
          onClick={() => toggle(product.slug, product.name)}
          aria-pressed={saved}
          className="mt-1 flex items-center justify-center gap-2 py-2 text-[11px] font-medium uppercase tracking-[0.14em] text-ink-soft transition-colors duration-[180ms] hover:text-gold"
        >
          <HeartIcon filled={saved} className={cx("h-4 w-4", saved && "text-gold")} />
          {saved ? "Saved to wishlist" : "Add to wishlist"}
        </button>
      </div>

      {!product.inStock ? (
        <p className="mt-5 border border-line bg-surface-light px-4 py-3.5 text-[13px] leading-relaxed text-ink-soft">
          This piece is currently sold out.{" "}
          <Link href="/contact" className="link-underline text-ink">
            Ask us when it returns
          </Link>{" "}
          — restocks are usually four to six weeks.
        </p>
      ) : null}

      {/* Trust row */}
      <ul className="mt-8 flex flex-col gap-3 border-t border-line pt-6 text-[12.5px] text-ink-soft">
        <li className="flex items-center gap-3">
          <TruckIcon className="h-4 w-4 shrink-0 text-gold" />
          Complimentary UK delivery over £150 · dispatched same day before 2pm
        </li>
        <li className="flex items-center gap-3">
          <SparkIcon className="h-4 w-4 shrink-0 text-gold" />
          Raw and virgin hair, inspected in the studio before dispatch
        </li>
        <li className="flex items-center gap-3">
          <LockIcon className="h-4 w-4 shrink-0 text-gold" />
          Secure checkout · Visa, Mastercard, Amex, PayPal, Klarna
        </li>
      </ul>

      <Accordion items={accordionItems} defaultOpen={0} className="mt-10" />

      {/* Mobile sticky add-to-cart */}
      <div
        className={cx(
          "fixed inset-x-0 bottom-0 z-[70] border-t border-line bg-background/96 px-5 pb-[calc(env(safe-area-inset-bottom)+12px)] pt-3 backdrop-blur-md transition-[transform,opacity] duration-[350ms] ease-lux lg:hidden",
          showStickyBar
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-full opacity-0",
        )}
      >
        <div className="flex items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="truncate text-[12px] font-medium text-ink">{product.name}</p>
            <p className="text-[11.5px] tabular-nums text-muted">
              {length.label} · {formatPrice(price)}
            </p>
          </div>
          <Button
            onClick={addToBag}
            disabled={!product.inStock}
            size="sm"
            className="shrink-0 px-6"
          >
            {product.inStock ? "Add to Bag" : "Sold Out"}
          </Button>
        </div>
      </div>
    </div>
  );
}

function OptionRow({
  label,
  options,
  selected,
  onSelect,
}: {
  label: string;
  options: VariantOption[];
  selected: VariantOption;
  onSelect: (option: VariantOption) => void;
}) {
  if (options.length <= 1) return null;

  return (
    <fieldset>
      <div className="mb-3 flex items-baseline justify-between gap-4">
        <legend className="field-label mb-0">{label}</legend>
        <span className="text-[12px] text-muted">{selected.label}</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const unavailable = option.available === false;
          const isSelected = option.label === selected.label;
          return (
            <label
              key={option.label}
              className={cx(
                "flex h-11 min-w-[64px] cursor-pointer items-center justify-center border px-3.5 text-[12.5px] transition-colors duration-[180ms]",
                unavailable
                  ? "cursor-not-allowed border-line text-muted/60 line-through"
                  : isSelected
                    ? "border-gold bg-gold text-black"
                    : "border-line text-ink-soft hover:border-gold hover:text-ink",
              )}
            >
              <input
                type="radio"
                name={label}
                className="sr-only"
                checked={isSelected}
                disabled={unavailable}
                onChange={() => onSelect(option)}
              />
              {option.label}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

function SwatchRow({
  label,
  options,
  selected,
  onSelect,
}: {
  label: string;
  options: VariantOption[];
  selected: VariantOption;
  onSelect: (option: VariantOption) => void;
}) {
  if (options.length <= 1) return null;

  return (
    <fieldset>
      <div className="mb-3 flex items-baseline justify-between gap-4">
        <legend className="field-label mb-0">{label}</legend>
        <span className="text-[12px] text-muted">{selected.label}</span>
      </div>
      <div className="flex flex-wrap gap-2.5">
        {options.map((option) => {
          const isSelected = option.label === selected.label;
          return (
            <label
              key={option.label}
              title={option.label}
              className={cx(
                "flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border transition-colors duration-[180ms]",
                isSelected ? "border-gold" : "border-transparent hover:border-line",
              )}
            >
              <input
                type="radio"
                name={label}
                className="sr-only"
                checked={isSelected}
                onChange={() => onSelect(option)}
              />
              <span
                aria-hidden="true"
                className="h-7 w-7 rounded-full border border-black/10"
                style={{ backgroundColor: option.swatch ?? "#2A2724" }}
              />
              <span className="sr-only">{option.label}</span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
