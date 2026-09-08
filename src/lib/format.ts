/** Formats a price held in pence as GBP. Whole pounds drop the decimals. */
export function formatPrice(pence: number): string {
  const pounds = pence / 100;
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: Number.isInteger(pounds) ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(pounds);
}

/**
 * Services are quoted at consultation, so a service price is optional. Renders
 * the "From £x" line when a price exists and honest fallback copy when it does not.
 */
export function formatServicePrice(pence: number | undefined): string {
  return pence === undefined ? "Quoted at consultation" : `From ${formatPrice(pence)}`;
}

export function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(`${iso}T00:00:00Z`));
}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function cx(...values: Array<string | false | null | undefined>): string {
  return values.filter(Boolean).join(" ");
}

export const FREE_SHIPPING_THRESHOLD = 15000;
