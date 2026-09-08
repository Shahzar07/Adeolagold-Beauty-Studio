"use client";

import Link from "next/link";
import { useCart } from "@/context/CartProvider";
import { FREE_SHIPPING_THRESHOLD, cx, formatPrice } from "@/lib/format";
import { products } from "@/lib/catalog";
import { Drawer } from "@/components/ui/Drawer";
import { Button, ButtonLink } from "@/components/ui/Button";
import { QuantityStepper } from "@/components/ui/QuantityStepper";
import { EditorialImage, ImageFrame } from "@/components/media/EditorialImage";
import { BagIcon, TruckIcon } from "@/components/ui/Icons";

export function CartDrawer() {
  const { isOpen, close, lines, subtotal, setQuantity, remove, add, count } = useCart();

  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const progress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  // "You may also love" — small, high-attach items not already in the bag.
  const inBag = new Set(lines.map((l) => l.productId));
  const upsells = products
    .filter((p) => p.category === "frontals-closures" && !inBag.has(p.id) && p.inStock)
    .slice(0, 2);

  return (
    <Drawer open={isOpen} onClose={close} title={`Your Bag${count ? ` (${count})` : ""}`}>
      {lines.length === 0 ? (
        <div className="flex h-full flex-col items-center justify-center px-8 text-center">
          <BagIcon className="h-8 w-8 text-line" />
          <p className="display-4 mt-6">Your bag is empty</p>
          <p className="mt-3 max-w-xs text-[14px] leading-relaxed text-ink-soft">
            Everything we make is finished by hand in the studio. Start with the pieces our
            clients return for.
          </p>
          <div className="mt-8 flex w-full max-w-xs flex-col gap-3">
            <ButtonLink href="/shop" onClick={close} fullWidth>
              Shop hair
            </ButtonLink>
            <ButtonLink href="/book" variant="secondary" onClick={close} fullWidth>
              Book an appointment
            </ButtonLink>
          </div>
        </div>
      ) : (
        <div className="flex flex-col">
          {/* Free shipping progress */}
          <div className="border-b border-line bg-surface-light px-6 py-4">
            <p className="flex items-center gap-2 text-[12px] text-ink-soft">
              <TruckIcon className="h-4 w-4 shrink-0 text-gold" />
              {remaining > 0 ? (
                <span>
                  You are <strong className="font-medium text-ink">{formatPrice(remaining)}</strong>{" "}
                  from complimentary UK delivery.
                </span>
              ) : (
                <span className="text-ink">Complimentary UK delivery unlocked.</span>
              )}
            </p>
            <div
              className="mt-3 h-[2px] w-full bg-line"
              role="progressbar"
              aria-valuenow={Math.round(progress)}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Progress towards free delivery"
            >
              <div
                className="h-full bg-gold transition-[width] duration-[600ms] ease-lux"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <ul className="divide-y divide-line px-6">
            {lines.map((line) => (
              <li key={line.key} className="flex gap-4 py-5">
                <Link href={`/products/${line.slug}`} onClick={close} className="w-[84px] shrink-0">
                  <ImageFrame ratio="4/5">
                    <EditorialImage
                      seed={line.imageSeed}
                      alt={line.name}
                      tone="product"
                      sizes="84px"
                    />
                  </ImageFrame>
                </Link>

                <div className="flex min-w-0 flex-1 flex-col">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <Link
                        href={`/products/${line.slug}`}
                        onClick={close}
                        className="link-underline block text-[13px] font-medium leading-snug text-ink"
                      >
                        {line.name}
                      </Link>
                      <p className="mt-1 text-[11.5px] leading-relaxed text-muted">
                        {line.variant.length} · {line.variant.density} · {line.variant.colour}
                      </p>
                    </div>
                    <p className="shrink-0 text-[13px] tabular-nums text-ink">
                      {formatPrice(line.price * line.quantity)}
                    </p>
                  </div>

                  <div className="mt-auto flex items-center justify-between gap-3 pt-3">
                    <QuantityStepper
                      size="sm"
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

          {upsells.length > 0 ? (
            <div className="border-t border-line px-6 py-6">
              <p className="eyebrow mb-4">You may also love</p>
              <ul className="flex flex-col gap-4">
                {upsells.map((product) => (
                  <li key={product.id} className="flex items-center gap-4">
                    <div className="w-14 shrink-0">
                      <ImageFrame ratio="1/1">
                        <EditorialImage
                          seed={product.images[0].seed}
                          alt={product.images[0].alt}
                          tone={product.images[0].tone}
                          sizes="56px"
                        />
                      </ImageFrame>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[12.5px] font-medium text-ink">{product.name}</p>
                      <p className="text-[12px] tabular-nums text-muted">
                        {formatPrice(product.price)}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-9 shrink-0 px-3 text-[10px]"
                      onClick={() =>
                        add({
                          productId: product.id,
                          slug: product.slug,
                          name: product.name,
                          subtitle: product.subtitle,
                          variant: {
                            length: product.lengths[0].label,
                            density: product.densities[0].label,
                            colour: product.colours[0].label,
                          },
                          price: product.price,
                          imageSeed: product.images[0].seed,
                        })
                      }
                    >
                      Add
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      )}

      {lines.length > 0 ? (
        <CartFooter subtotal={subtotal} onContinue={close} />
      ) : null}
    </Drawer>
  );
}

function CartFooter({ subtotal, onContinue }: { subtotal: number; onContinue: () => void }) {
  return (
    <div className={cx("flex flex-col gap-4")}>
      <div className="flex items-baseline justify-between">
        <span className="text-[12px] uppercase tracking-[0.14em] text-ink-soft">Subtotal</span>
        <span className="text-[17px] tabular-nums text-ink">{formatPrice(subtotal)}</span>
      </div>
      <p className="-mt-2 text-[11.5px] text-muted">
        Shipping and taxes calculated at checkout.
      </p>
      <ButtonLink href="/checkout" onClick={onContinue} fullWidth>
        Checkout
      </ButtonLink>
      <button
        type="button"
        onClick={onContinue}
        className="link-underline mx-auto text-[11px] uppercase tracking-[0.14em] text-ink-soft transition-colors hover:text-ink"
      >
        Continue shopping
      </button>
    </div>
  );
}
