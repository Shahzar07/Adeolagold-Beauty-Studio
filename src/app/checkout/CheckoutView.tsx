"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useCart } from "@/context/CartProvider";
import { FREE_SHIPPING_THRESHOLD, cx, formatPrice } from "@/lib/format";
import { Button, ButtonLink } from "@/components/ui/Button";
import { EditorialImage, ImageFrame } from "@/components/media/EditorialImage";
import { CheckIcon, ChevronDownIcon, LockIcon } from "@/components/ui/Icons";
import { useToast } from "@/context/ToastProvider";
import { BankTransferPanel, type ProofFile } from "@/components/commerce/BankTransferPanel";
import {
  BANK_TRANSFER_ID,
  businessAccount,
  isPayPalConnected,
  isStripeConnected,
  merchants,
  orderReference,
  paymentReference,
} from "@/lib/payments";

const shippingMethods = [
  { id: "standard", label: "Standard delivery", detail: "2–3 working days", price: 495 },
  { id: "next-day", label: "Next-day delivery", detail: "Order before 2pm", price: 895 },
  { id: "collection", label: "Studio collection", detail: "Tue–Sat, by arrangement", price: 0 },
];

/* Card and wallet methods only appear once their merchant account is connected
   (see src/lib/payments.ts and the Payments section of the README). Bank
   transfer needs no merchant, so it is always offered. */
const paymentMethods = [
  ...(isStripeConnected()
    ? [
        { id: "card", label: merchants.stripe.label, detail: merchants.stripe.detail },
        { id: "klarna", label: merchants.klarna.label, detail: merchants.klarna.detail },
      ]
    : []),
  ...(isPayPalConnected()
    ? [{ id: "paypal", label: merchants.paypal.label, detail: merchants.paypal.detail }]
    : []),
  {
    id: BANK_TRANSFER_ID,
    label: "Bank transfer",
    detail: `Pay directly to ${businessAccount.bank} — details shown below`,
  },
];

const DISCOUNTS: Record<string, number> = { WELCOME10: 0.1, STUDIO15: 0.15 };

interface Fields {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  postcode: string;
  phone: string;
}

const emptyFields: Fields = {
  email: "",
  firstName: "",
  lastName: "",
  address: "",
  city: "",
  postcode: "",
  phone: "",
};

export function CheckoutView() {
  const { lines, subtotal, hydrated, clear } = useCart();
  const { push } = useToast();

  const [fields, setFields] = useState<Fields>(emptyFields);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [shipping, setShipping] = useState(shippingMethods[0].id);
  const [payment, setPayment] = useState(paymentMethods[0].id);
  const [code, setCode] = useState("");
  const [applied, setApplied] = useState<string | null>(null);
  const [codeError, setCodeError] = useState("");
  const [summaryOpen, setSummaryOpen] = useState(false);
  const [placing, setPlacing] = useState(false);
  const [orderRef, setOrderRef] = useState("");
  const [proof, setProof] = useState<ProofFile | null>(null);
  const [placedByTransfer, setPlacedByTransfer] = useState(false);
  const [proofName, setProofName] = useState("");
  const [placedTotal, setPlacedTotal] = useState(0);



  const discountRate = applied ? DISCOUNTS[applied] : 0;
  const discount = Math.round(subtotal * discountRate);
  const freeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;
  const shippingCost = useMemo(() => {
    const method = shippingMethods.find((m) => m.id === shipping)!;
    if (method.id === "collection") return 0;
    if (freeShipping && method.id === "standard") return 0;
    return method.price;
  }, [shipping, freeShipping]);
  const total = Math.max(0, subtotal - discount) + shippingCost;

  /* The reference the client quotes on their transfer, which becomes the order
     reference once the order is placed. Derived from the basket so it is stable
     across renders and identical on the server and the client. */
  const draftRef = useMemo(
    () => orderReference(...lines.map((l) => `${l.key}x${l.quantity}`), subtotal),
    [lines, subtotal],
  );

  const validate = () => {
    const next: Partial<Record<keyof Fields, string>> = {};
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/.test(fields.email)) next.email = "Enter a valid email.";
    if (fields.firstName.trim().length < 2) next.firstName = "Required.";
    if (fields.lastName.trim().length < 2) next.lastName = "Required.";
    if (fields.address.trim().length < 5) next.address = "Enter your street address.";
    if (fields.city.trim().length < 2) next.city = "Required.";
    if (fields.postcode.trim().length < 5) next.postcode = "Enter a valid postcode.";
    if (fields.phone.replace(/[^0-9]/g, "").length < 9) next.phone = "Enter a contact number.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const placeOrder = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!validate()) {
      document.getElementById("checkout-form")?.scrollIntoView({ block: "start" });
      return;
    }
    setPlacing(true);
    /* Hand off to the merchant here — Stripe PaymentIntent, PayPal order, or a
       POST of the basket plus `proof.file` for a bank transfer. */
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const ref = draftRef;
    setOrderRef(ref);
    setPlacedByTransfer(payment === BANK_TRANSFER_ID);
    setProofName(proof?.file.name ?? "");
    setPlacedTotal(total);
    clear();
    setPlacing(false);
    push({
      title: payment === BANK_TRANSFER_ID ? "Order received" : "Order placed",
      description:
        payment === BANK_TRANSFER_ID
          ? "We will release it as soon as your transfer clears."
          : "A confirmation is on its way.",
      tone: "success",
    });
  };

  /* Confirmation ---------------------------------------------------- */
  if (orderRef) {
    return (
      <div className="mx-auto max-w-xl py-16 text-center">
        <span className="animate-fade-up mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-gold text-gold">
          <CheckIcon className="h-7 w-7" />
        </span>
        <h1 className="display-2 animate-fade-up mt-9" style={{ animationDelay: "120ms" }}>
          Thank you.
        </h1>
        <p
          className="animate-fade-up mt-5 text-[16px] leading-relaxed text-ink-soft"
          style={{ animationDelay: "200ms" }}
        >
          {placedByTransfer
            ? `Your order is reserved. Send ${formatPrice(placedTotal)} to ${businessAccount.accountNumber} · ${businessAccount.sortCode} quoting ${paymentReference(fields.lastName, orderRef)}, and we will release it the moment it lands.`
            : "Your order is confirmed. Everything is hand-checked before it leaves the studio."}
        </p>
        {placedByTransfer && proofName ? (
          <p
            className="animate-fade-up mt-4 flex items-center justify-center gap-2 text-[13px] text-gold"
            style={{ animationDelay: "230ms" }}
          >
            <CheckIcon className="h-4 w-4" />
            Screenshot received — {proofName}
          </p>
        ) : null}
        <p
          className="animate-fade-up mt-8 text-[12px] uppercase tracking-[0.16em] text-muted"
          style={{ animationDelay: "260ms" }}
        >
          Order {orderRef} · confirmation sent to {fields.email}
        </p>
        <div
          className="animate-fade-up mt-10 flex flex-col justify-center gap-3 sm:flex-row"
          style={{ animationDelay: "320ms" }}
        >
          <ButtonLink href="/shop" className="sm:min-w-[180px]">
            Continue shopping
          </ButtonLink>
          <ButtonLink href="/book" variant="secondary" className="sm:min-w-[200px]">
            Book an installation
          </ButtonLink>
        </div>
      </div>
    );
  }

  if (!hydrated) {
    return (
      <div className="py-16" role="status" aria-label="Loading checkout">
        <div className="skeleton mx-auto h-72 max-w-2xl rounded-subtle" />
      </div>
    );
  }

  if (lines.length === 0) {
    return (
      <div className="mx-auto max-w-md py-20 text-center">
        <p className="display-2">Nothing to check out.</p>
        <p className="mt-5 text-[15px] leading-relaxed text-ink-soft">
          Your bag is empty. Add a piece and we will get it on its way.
        </p>
        <ButtonLink href="/shop" className="mt-10 sm:min-w-[180px]">
          Shop hair
        </ButtonLink>
      </div>
    );
  }

  const summary = (
    <div className="flex flex-col gap-6">
      <ul className="flex flex-col gap-4">
        {lines.map((line) => (
          <li key={line.key} className="flex items-start gap-4">
            <div className="relative w-16 shrink-0">
              <ImageFrame ratio="4/5">
                <EditorialImage
                  seed={line.imageSeed}
                  alt={line.name}
                  tone="product"
                  sizes="64px"
                />
              </ImageFrame>
              <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-gold px-1 text-[10px] tabular-nums text-black">
                {line.quantity}
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[13px] font-medium leading-snug text-ink">{line.name}</p>
              <p className="mt-1 text-[11.5px] text-muted">
                {line.variant.length} · {line.variant.density} · {line.variant.colour}
              </p>
            </div>
            <p className="shrink-0 text-[13px] tabular-nums text-ink">
              {formatPrice(line.price * line.quantity)}
            </p>
          </li>
        ))}
      </ul>

      {/* Discount */}
      <div className="border-t border-line pt-5">
        <label htmlFor="discount-code" className="field-label">
          Discount code
        </label>
        <div className="flex gap-2">
          <input
            id="discount-code"
            value={code}
            onChange={(event) => {
              setCode(event.target.value.toUpperCase());
              setCodeError("");
            }}
            placeholder="Enter code"
            className={cx("field flex-1", codeError && "border-error")}
            aria-invalid={Boolean(codeError)}
          />
          <Button
            type="button"
            variant="ghost"
            onClick={() => {
              if (DISCOUNTS[code]) {
                setApplied(code);
                setCodeError("");
                push({ title: "Discount applied", description: code, tone: "success" });
              } else {
                setCodeError("That code is not recognised.");
              }
            }}
            className="shrink-0 px-5"
          >
            Apply
          </Button>
        </div>
        {codeError ? (
          <p role="alert" className="mt-2 text-[12px] text-error">
            {codeError}
          </p>
        ) : null}
        {applied ? (
          <p className="mt-2 flex items-center gap-2 text-[12px] text-success">
            <CheckIcon className="h-3.5 w-3.5" />
            {applied} applied — {Math.round(discountRate * 100)}% off
          </p>
        ) : null}
      </div>

      {/* Totals */}
      <dl className="flex flex-col gap-2.5 border-t border-line pt-5 text-[13.5px]">
        <div className="flex justify-between gap-4">
          <dt className="text-muted">Subtotal</dt>
          <dd className="tabular-nums text-ink">{formatPrice(subtotal)}</dd>
        </div>
        {discount > 0 ? (
          <div className="flex justify-between gap-4">
            <dt className="text-muted">Discount</dt>
            <dd className="tabular-nums text-success">−{formatPrice(discount)}</dd>
          </div>
        ) : null}
        <div className="flex justify-between gap-4">
          <dt className="text-muted">Delivery</dt>
          <dd className="tabular-nums text-ink">
            {shippingCost === 0 ? "Complimentary" : formatPrice(shippingCost)}
          </dd>
        </div>
      </dl>

      <div className="flex items-baseline justify-between border-t border-line pt-5">
        <span className="text-[12px] uppercase tracking-[0.14em] text-ink-soft">Total</span>
        <span className="font-display text-[26px] leading-none tabular-nums">
          {formatPrice(total)}
        </span>
      </div>
    </div>
  );

  return (
    <div className="grid gap-12 pb-24 lg:grid-cols-12 lg:gap-16">
      {/* Mobile summary toggle */}
      <div className="lg:hidden">
        <button
          type="button"
          onClick={() => setSummaryOpen((o) => !o)}
          aria-expanded={summaryOpen}
          className="flex w-full items-center justify-between border-y border-line py-4"
        >
          <span className="flex items-center gap-2 text-[12px] uppercase tracking-[0.14em] text-ink">
            Order summary
            <ChevronDownIcon
              className={cx(
                "h-4 w-4 text-muted transition-transform duration-[350ms] ease-lux",
                summaryOpen && "rotate-180",
              )}
            />
          </span>
          <span className="font-display text-[20px] tabular-nums">{formatPrice(total)}</span>
        </button>
        <div hidden={!summaryOpen} className="py-6">
          {summary}
        </div>
      </div>

      {/* Form */}
      <form id="checkout-form" onSubmit={placeOrder} noValidate className="lg:col-span-7">
        <section aria-labelledby="contact-heading">
          <h2 id="contact-heading" className="display-4 mb-6">
            Contact
          </h2>
          <Field
            id="email"
            label="Email"
            type="email"
            autoComplete="email"
            value={fields.email}
            error={errors.email}
            onChange={(v) => setFields((f) => ({ ...f, email: v }))}
          />
        </section>

        <section aria-labelledby="delivery-heading" className="mt-12">
          <h2 id="delivery-heading" className="display-4 mb-6">
            Delivery
          </h2>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field
              id="firstName"
              label="First name"
              autoComplete="given-name"
              value={fields.firstName}
              error={errors.firstName}
              onChange={(v) => setFields((f) => ({ ...f, firstName: v }))}
            />
            <Field
              id="lastName"
              label="Last name"
              autoComplete="family-name"
              value={fields.lastName}
              error={errors.lastName}
              onChange={(v) => setFields((f) => ({ ...f, lastName: v }))}
            />
            <div className="sm:col-span-2">
              <Field
                id="address"
                label="Address"
                autoComplete="street-address"
                value={fields.address}
                error={errors.address}
                onChange={(v) => setFields((f) => ({ ...f, address: v }))}
              />
            </div>
            <Field
              id="city"
              label="Town / City"
              autoComplete="address-level2"
              value={fields.city}
              error={errors.city}
              onChange={(v) => setFields((f) => ({ ...f, city: v }))}
            />
            <Field
              id="postcode"
              label="Postcode"
              autoComplete="postal-code"
              value={fields.postcode}
              error={errors.postcode}
              onChange={(v) => setFields((f) => ({ ...f, postcode: v }))}
            />
            <div className="sm:col-span-2">
              <Field
                id="phone"
                label="Phone"
                type="tel"
                autoComplete="tel"
                value={fields.phone}
                error={errors.phone}
                onChange={(v) => setFields((f) => ({ ...f, phone: v }))}
              />
            </div>
          </div>
        </section>

        <section aria-labelledby="shipping-heading" className="mt-12">
          <h2 id="shipping-heading" className="display-4 mb-6">
            Delivery method
          </h2>
          <div className="flex flex-col gap-2">
            {shippingMethods.map((method) => {
              const cost =
                method.id === "collection"
                  ? 0
                  : freeShipping && method.id === "standard"
                    ? 0
                    : method.price;
              return (
                <label
                  key={method.id}
                  className={cx(
                    "flex cursor-pointer items-center gap-4 border px-5 py-4 transition-colors duration-[180ms]",
                    shipping === method.id ? "border-gold" : "border-line hover:border-ink-soft",
                  )}
                >
                  <input
                    type="radio"
                    name="shipping"
                    className="sr-only"
                    checked={shipping === method.id}
                    onChange={() => setShipping(method.id)}
                  />
                  <span
                    aria-hidden="true"
                    className={cx(
                      "flex h-4 w-4 shrink-0 items-center justify-center rounded-full border transition-colors",
                      shipping === method.id ? "border-gold" : "border-line",
                    )}
                  >
                    {shipping === method.id ? (
                      <span className="h-2 w-2 rounded-full bg-gold" />
                    ) : null}
                  </span>
                  <span className="flex-1">
                    <span className="block text-[13.5px] text-ink">{method.label}</span>
                    <span className="block text-[12px] text-muted">{method.detail}</span>
                  </span>
                  <span className="shrink-0 text-[13px] tabular-nums text-ink">
                    {cost === 0 ? "Free" : formatPrice(cost)}
                  </span>
                </label>
              );
            })}
          </div>
        </section>

        <section aria-labelledby="payment-heading" className="mt-12">
          <h2 id="payment-heading" className="display-4 mb-2">
            Payment
          </h2>
          <p className="mb-6 flex items-center gap-2 text-[12.5px] text-muted">
            <LockIcon className="h-4 w-4 text-gold" />
            All transactions are secure and encrypted. Card details never touch our servers.
          </p>
          <div className="flex flex-col gap-2">
            {paymentMethods.map((method) => (
              <div key={method.id}>
                <label
                  className={cx(
                    "flex cursor-pointer items-center gap-4 border px-5 py-4 transition-colors duration-[180ms]",
                    payment === method.id ? "border-gold" : "border-line hover:border-ink-soft",
                  )}
                >
                  <input
                    type="radio"
                    name="payment"
                    className="sr-only"
                    checked={payment === method.id}
                    onChange={() => setPayment(method.id)}
                  />
                  <span
                    aria-hidden="true"
                    className={cx(
                      "flex h-4 w-4 shrink-0 items-center justify-center rounded-full border transition-colors",
                      payment === method.id ? "border-gold" : "border-line",
                    )}
                  >
                    {payment === method.id ? (
                      <span className="h-2 w-2 rounded-full bg-gold" />
                    ) : null}
                  </span>
                  <span className="flex-1">
                    <span className="block text-[13.5px] text-ink">{method.label}</span>
                    <span className="block text-[12px] text-muted">{method.detail}</span>
                  </span>
                </label>

                {method.id === BANK_TRANSFER_ID && payment === BANK_TRANSFER_ID ? (
                  <BankTransferPanel
                    total={total}
                    reference={paymentReference(fields.lastName, draftRef)}
                    proof={proof}
                    onProofChange={setProof}
                  />
                ) : null}
              </div>
            ))}
          </div>
        </section>

        <Button type="submit" disabled={placing} fullWidth size="lg" className="mt-10">
          {placing
            ? "Placing order…"
            : payment === BANK_TRANSFER_ID
              ? `Confirm order · ${formatPrice(total)} by transfer`
              : `Pay ${formatPrice(total)}`}
        </Button>

        <p className="mt-5 text-center text-[11.5px] leading-relaxed text-muted">
          By placing your order you agree to our{" "}
          <Link href="/help/returns" className="link-underline text-ink-soft">
            returns policy
          </Link>
          . Need help?{" "}
          <Link href="/contact" className="link-underline text-ink-soft">
            Contact the studio
          </Link>
          .
        </p>
      </form>

      {/* Desktop summary */}
      <aside className="hidden lg:col-span-4 lg:col-start-9 lg:block">
        <div className="border border-line bg-surface-light p-7 lg:sticky lg:top-[104px]">
          <h2 className="eyebrow mb-6">Order summary</h2>
          {summary}
        </div>
      </aside>
    </div>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  error,
  type = "text",
  autoComplete,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  type?: string;
  autoComplete?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="field-label">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        autoComplete={autoComplete}
        onChange={(event) => onChange(event.target.value)}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cx("field", error && "border-error")}
      />
      {error ? (
        <p id={`${id}-error`} role="alert" className="mt-2 text-[12px] text-error">
          {error}
        </p>
      ) : null}
    </div>
  );
}
