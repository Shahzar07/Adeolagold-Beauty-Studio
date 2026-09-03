"use client";

import Link from "next/link";
import { useCart } from "@/context/CartProvider";
import { FREE_SHIPPING_THRESHOLD, formatPrice } from "@/lib/format";
import { products } from "@/lib/catalog";
import { ButtonLink } from "@/components/ui/Button";
import { QuantityStepper } from "@/components/ui/QuantityStepper";
import { EditorialImage, ImageFrame } from "@/components/media/EditorialImage";
import { ProductGrid } from "@/components/commerce/ProductGrid";
import { LockIcon, TruckIcon } from "@/components/ui/Icons";

export function CartView() {
  const { lines, subtotal, setQuantity, remove, hydrated } = useCart();

  if (!hydrated) {
    return (
      <div className="grid gap-12 py-6 lg:grid-cols-12" role="status" aria-label="Loading bag">
        <div className="flex flex-col gap-6 lg:col-span-7">
          {Array.from({ length: 2 }, (_, i) => (
            <div key={i} className="flex gap-5">
              <div className="skeleton h-[150px] w-[120px] rounded-subtle" />
              <div className="flex-1">
                <div className="skeleton h-3 w-2/3 rounded-subtle" />
                <div className="skeleton mt-3 h-3 w-1/2 rounded-subtle" />
              </div>
            </div>
          ))}
        </div>
        <div className="lg:col-span-4 lg:col-start-9">
          <div className="skeleton h-72 rounded-subtle" />
        </div>
      </div>
    );
  }

  if (lines.length === 0) {
    return (
      <div className="py-16">
        <div className="mx-auto max-w-md text-center">
          <p className="display-2">Your bag is empty.</p>
          <p className="mt-5 text-[15px] leading-relaxed text-ink-soft">
            Everything we make is finished by hand in the studio. Start with the pieces our
            clients return for, or book a consultation and we will help you choose.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonLink href="/shop" className="sm:min-w-[180px]">
              Shop hair
            </ButtonLink>
            <ButtonLink href="/book" variant="secondary" className="sm:min-w-[190px]">
              Book a consultation
            </ButtonLink>
          </div>
        </div>

        <div className="mt-24">
          <p className="eyebrow mb-8">Most loved</p>
          <ProductGrid products={products.filter((p) => p.featured).slice(0, 4)} columns={4} />
        </div>
      </div>
    );
  }

  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  return (
    <div className="grid gap-12 pb-24 lg:grid-cols-12 lg:gap-16">
      <div className="lg:col-span-7">
        <ul className="border-t border-line">
          {lines.map((line) => (
            <li key={line.key} className="flex gap-5 border-b border-line py-6">
              <Link href={`/products/${line.slug}`} className="w-[110px] shrink-0 sm:w-[130px]">
                <ImageFrame ratio="4/5">
                  <EditorialImage
                    seed={line.imageSeed}
                    alt={line.name}
                    tone="product"
                    sizes="130px"
                  />
                </ImageFrame>
              </Link>

              <div className="flex min-w-0 flex-1 flex-col">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <h2 className="text-[14.5px] font-medium leading-snug text-ink">
                      <Link href={`/products/${line.slug}`} className="link-underline">
                        {line.name}
                      </Link>
                    </h2>
                    <p className="mt-1 text-[12.5px] text-muted">{line.subtitle}</p>
                    <dl className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-[12px] text-ink-soft">
                      <div className="flex gap-1.5">
                        <dt className="text-muted">Length</dt>
                        <dd>{line.variant.length}</dd>
                      </div>
                      <div className="flex gap-1.5">
                        <dt className="text-muted">Density</dt>
                        <dd>{line.variant.density}</dd>
                      </div>
                      <div className="flex gap-1.5">
                        <dt className="text-muted">Colour</dt>
                        <dd>{line.variant.colour}</dd>
                      </div>
                    </dl>
                  </div>
                  <p className="shrink-0 text-[14px] tabular-nums text-ink">
                    {formatPrice(line.price * line.quantity)}
                  </p>
                </div>

                <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-5">
                  <QuantityStepper
                    value={line.quantity}
                    onChange={(q) => setQuantity(line.key, q)}
                    label={`Quantity for ${line.name}`}
                  />
                  <button
                    type="button"
                    onClick={() => remove(line.key)}
                    className="link-underline text-[11px] uppercase tracking-[0.12em] text-muted transition-colors hover:text-ink"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <Link
          href="/shop"
          className="link-underline mt-8 inline-block text-[11px] font-medium uppercase tracking-[0.14em] text-ink-soft transition-colors hover:text-ink"
        >
          Continue shopping
        </Link>
      </div>

      {/* Summary */}
      <aside className="lg:col-span-4 lg:col-start-9">
        <div className="border border-line bg-surface-light p-7 lg:sticky lg:top-[104px]">
          <h2 className="eyebrow mb-6">Order summary</h2>

          <dl className="flex flex-col gap-3 text-[13.5px]">
            <div className="flex justify-between gap-4">
              <dt className="text-muted">Subtotal</dt>
              <dd className="tabular-nums text-ink">{formatPrice(subtotal)}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-muted">Delivery</dt>
              <dd className="text-ink">
                {remaining > 0 ? "Calculated at checkout" : "Complimentary"}
              </dd>
            </div>
          </dl>

          <div className="mt-6 flex items-baseline justify-between border-t border-line pt-5">
            <span className="text-[12px] uppercase tracking-[0.14em] text-ink-soft">Total</span>
            <span className="font-display text-[24px] leading-none tabular-nums">
              {formatPrice(subtotal)}
            </span>
          </div>
          <p className="mt-2 text-[11.5px] text-muted">Taxes included where applicable.</p>

          <ButtonLink href="/checkout" fullWidth className="mt-7">
            Checkout
          </ButtonLink>

          <ul className="mt-7 flex flex-col gap-3 border-t border-line pt-6 text-[12.5px] text-ink-soft">
            <li className="flex items-center gap-3">
              <TruckIcon className="h-4 w-4 shrink-0 text-gold" />
              {remaining > 0
                ? `${formatPrice(remaining)} from complimentary UK delivery`
                : "Complimentary UK delivery unlocked"}
            </li>
            <li className="flex items-center gap-3">
              <LockIcon className="h-4 w-4 shrink-0 text-gold" />
              Secure checkout · Visa, Mastercard, Amex, PayPal, Klarna
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
}
