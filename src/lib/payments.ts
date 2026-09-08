// payments.ts
// Adeolagold Beauty Studio — business account and payment merchant settings.
//
// Everything the checkout needs to take money lives here, so connecting a live
// merchant is a matter of setting environment variables rather than editing
// components. See the "Payments" section of the README for the full setup.
//
// NOTE: only NEXT_PUBLIC_* values are readable in the browser. Secret keys
// (Stripe secret key, PayPal client secret, webhook signing secrets) must stay
// server-side and are deliberately not referenced from this file.

/** The legal entity money is paid to. Shown on the checkout and on receipts. */
export const businessAccount = {
  /** Registered account holder as it appears with the bank. */
  accountName: "Adeola Adeoye trading as Adeolagold Beauty Studio",
  tradingName: "Adeolagold Beauty Studio",
  bank: "Monzo Bank",
  accountNumber: "50501927",
  sortCode: "04-00-05",
  iban: "GB50 MONZ 0400 0550 5019 27",
  /** Monzo's BIC. Only needed for payments sent from outside the UK. */
  bic: "MONZGB2L",
  currency: "GBP",
} as const;

/**
 * Card / wallet merchants. Each is "connected" once its publishable identifier
 * is present in the environment; until then the checkout hides the method
 * rather than offering a button that cannot complete.
 */
export const merchants = {
  stripe: {
    label: "Card",
    detail: "Visa, Mastercard, American Express, Apple Pay & Google Pay",
    publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? "",
  },
  paypal: {
    label: "PayPal",
    detail: "You will be redirected to PayPal to complete payment",
    clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID ?? "",
  },
  klarna: {
    label: "Klarna",
    detail: "Pay in 3 interest-free instalments",
    /** Klarna is resold through Stripe, so it rides on the Stripe connection. */
    get publishableKey() {
      return process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? "";
    },
  },
} as const;

export const isStripeConnected = () => merchants.stripe.publishableKey.length > 0;
export const isPayPalConnected = () => merchants.paypal.clientId.length > 0;

/**
 * Bank transfer is always available — it needs no merchant account, and it is
 * how the studio takes deposits and larger custom-unit balances today.
 */
export const BANK_TRANSFER_ID = "bank-transfer";

/** Proof-of-payment upload limits, shared by the UI and any server handler. */
export const proofOfPayment = {
  maxBytes: 8 * 1024 * 1024,
  acceptedTypes: ["image/png", "image/jpeg", "image/webp", "image/heic", "application/pdf"],
  /** `accept` attribute for the file input. */
  accept: "image/png,image/jpeg,image/webp,image/heic,application/pdf",
} as const;

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/** Validates a chosen screenshot. Returns an error message, or null if fine. */
export function validateProofFile(file: File): string | null {
  const typeOk =
    (proofOfPayment.acceptedTypes as readonly string[]).includes(file.type) ||
    /\.(png|jpe?g|webp|heic|pdf)$/i.test(file.name);
  if (!typeOk) return "Upload a screenshot (PNG, JPG, WEBP or HEIC) or a PDF receipt.";
  if (file.size > proofOfPayment.maxBytes) {
    return `That file is ${formatBytes(file.size)}. The limit is ${formatBytes(proofOfPayment.maxBytes)}.`;
  }
  return null;
}

/**
 * A short order reference derived from the basket itself (FNV-1a → base 36).
 *
 * Deriving it rather than reading a clock keeps it pure: it is identical on the
 * server and the client, it does not drift between renders, and it stays put
 * while the customer fills in the rest of the form.
 */
export function orderReference(...seedParts: (string | number)[]): string {
  const seed = seedParts.join("|");
  let hash = 2166136261;
  for (let i = 0; i < seed.length; i += 1) {
    hash ^= seed.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return `AG${(hash >>> 0).toString(36).toUpperCase().padStart(7, "0").slice(-7)}`;
}

/**
 * The reference a client should quote on their transfer. Keeping the order
 * reference in the payment narrative is what lets the studio reconcile a
 * transfer against a basket without asking.
 */
export function paymentReference(surname: string, orderRef: string): string {
  const name = surname.replace(/[^A-Za-z]/g, "").slice(0, 10).toUpperCase();
  return name ? `${name} ${orderRef}` : orderRef;
}
