export type Badge = "NEW" | "BESTSELLER" | "LIMITED";

export type ImageTone =
  | "portrait"
  | "texture"
  | "studio"
  | "campaign"
  | "product"
  | "detail";

export interface ProductImage {
  /** Deterministic seed used by the generative editorial artwork. */
  seed: string;
  alt: string;
  tone: ImageTone;
  /** Optional real photograph in /public. Takes priority when present. */
  src?: string;
}

export interface VariantOption {
  label: string;
  /** Price adjustment in minor units (pence) applied to the base price. */
  delta?: number;
  available?: boolean;
  /** Swatch colour for colour options. */
  swatch?: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  /** Short qualifier shown under the product name on cards. */
  subtitle: string;
  collections: string[];
  category: "wigs" | "human-hair" | "frontals-closures";
  /** Base price in pence. */
  price: number;
  compareAtPrice?: number;
  badges: Badge[];
  texture: string;
  origin: string;
  capConstruction?: string;
  lengths: VariantOption[];
  densities: VariantOption[];
  colours: VariantOption[];
  rating: number;
  reviewCount: number;
  excerpt: string;
  description: string[];
  details: string[];
  care: string[];
  images: ProductImage[];
  inStock: boolean;
  featured?: boolean;
  releasedAt: string;
}

export interface Service {
  slug: string;
  title: string;
  summary: string;
  description: string;
  /**
   * Starting price in pence. Optional — the studio quotes at consultation, so
   * the UI falls back to "Quoted at consultation" wherever this is absent.
   */
  fromPrice?: number;
  duration: string;
  includes: string[];
  aftercare?: string;
  /** Booking deposit in pence. Optional for the same reason as `fromPrice`. */
  depositPence?: number;
}

export interface JournalPost {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  readingTime: string;
  publishedAt: string;
  author: string;
  imageSeed: string;
  imageTone: ImageTone;
  /** Body is authored as simple blocks so it renders with editorial rhythm. */
  body: Array<
    | { type: "p"; text: string }
    | { type: "h2"; text: string }
    | { type: "quote"; text: string }
    | { type: "list"; items: string[] }
  >;
}

export interface Testimonial {
  quote: string;
  name: string;
  detail: string;
}

export interface CartLine {
  key: string;
  productId: string;
  slug: string;
  name: string;
  subtitle: string;
  variant: { length: string; density: string; colour: string };
  price: number;
  quantity: number;
  imageSeed: string;
}
