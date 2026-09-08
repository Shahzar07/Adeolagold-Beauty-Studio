import type { Product, VariantOption } from "./types";

/* ------------------------------------------------------------------
   Shared variant sets. Individual products override where they differ.

   Base prices, names, descriptions, ratings and review counts are the
   studio's own published shop listings. Variant uplifts (length, density,
   colour) are the studio's to set and are modelled here in proportion to
   those base prices.
   ------------------------------------------------------------------ */

const wigLengths: VariantOption[] = [
  { label: '14"', delta: 0 },
  { label: '16"', delta: 1500 },
  { label: '18"', delta: 3000 },
  { label: '20"', delta: 5000 },
  { label: '22"', delta: 7500 },
  { label: '24"', delta: 10500 },
  { label: '26"', delta: 14000, available: false },
];

const longWigLengths: VariantOption[] = [
  { label: '26"', delta: 0 },
  { label: '28"', delta: 2500 },
  { label: '30"', delta: 5000 },
  { label: '32"', delta: 8500, available: false },
];

const bobLengths: VariantOption[] = [
  { label: '10"', delta: 0 },
  { label: '12"', delta: 1200 },
  { label: '14"', delta: 2500 },
];

const bundleLengths: VariantOption[] = [
  { label: '14"', delta: 0 },
  { label: '16"', delta: 800 },
  { label: '18"', delta: 1600 },
  { label: '20"', delta: 2600 },
  { label: '22"', delta: 3800 },
  { label: '24"', delta: 5200 },
];

const laceLengths: VariantOption[] = [
  { label: '16"', delta: 0 },
  { label: '18"', delta: 700 },
  { label: '20"', delta: 1500 },
  { label: '22"', delta: 2400 },
];

const densities: VariantOption[] = [
  { label: "150%", delta: 0 },
  { label: "180%", delta: 2000 },
  { label: "200%", delta: 4000 },
  { label: "250%", delta: 7000, available: false },
];

const standardDensity: VariantOption[] = [{ label: "Standard", delta: 0 }];

const naturalColours: VariantOption[] = [
  { label: "Natural Black 1B", swatch: "#1B1614" },
  { label: "Espresso 2", swatch: "#33221A", delta: 0 },
  { label: "Chestnut 4", swatch: "#4E3324", delta: 1000 },
  { label: "Honey Blonde 27", swatch: "#B07C42", delta: 2000 },
  { label: "Champagne 613", swatch: "#D9C193", delta: 3000 },
];

const blackOnly: VariantOption[] = [{ label: "Natural Black 1B", swatch: "#1B1614" }];

const laceColours: VariantOption[] = [
  { label: "Natural Black 1B", swatch: "#1B1614" },
  { label: "Espresso 2", swatch: "#33221A", delta: 0 },
];

function img(seed: string, alt: string, tone: Product["images"][number]["tone"]) {
  return { seed, alt, tone };
}

/* ------------------------------------------------------------------
   Catalogue — the studio's published shop listings.
   ------------------------------------------------------------------ */

export const products: Product[] = [
  {
    id: "ag-001",
    slug: "sleek-black-bob-lace-front-wig",
    name: "Sleek Black Bob Lace Front Wig",
    subtitle: "HD Lace Front · 100% Human Hair",
    collections: ["wigs", "best-sellers"],
    category: "wigs",
    price: 18900,
    badges: ["BESTSELLER"],
    texture: "Silky Straight",
    origin: "Premium human hair",
    capConstruction: "HD lace front, pre-plucked hairline with baby hairs",
    lengths: bobLengths,
    densities,
    colours: blackOnly,
    rating: 5,
    reviewCount: 42,
    excerpt:
      "Flawless straight bob with HD lace front. 100% premium human hair, pre-plucked hairline with baby hairs.",
    description: [
      "A flawless straight bob on an HD lace front, made from 100% premium human hair. The hairline is pre-plucked with baby hairs left in, so it melts with minimal work and reads as your own from the first wear.",
      "Cut blunt through the ends and finished in the studio before it ships. The most-requested piece on the shelf, and the one we install most often.",
    ],
    details: [
      "HD lace front",
      "Pre-plucked hairline with baby hairs",
      "100% premium human hair",
      "Adjustable elastic band and combs",
      "Can be dyed, curled and straightened",
    ],
    care: [
      "Wash every 8–10 wears with a sulphate-free shampoo, working downwards.",
      "Condition mid-length to ends only, avoiding the lace and knots.",
      "Air dry on a canvas block; heat style below 180°C with protection.",
      "Store on a mannequin or in a satin bag, never folded.",
    ],
    images: [
      img("black-bob-lace-front", "The sleek black bob lace front wig on a studio block, front view", "product"),
      img("black-bob-lace-side", "Client in profile wearing the sleek black bob, showing the blunt line", "product"),
      img("black-bob-lace-back", "Studio portrait of the blunt bob with a full fringe, finished and dressed", "product"),
      img("black-bob-lace-detail", "Close-up of a pre-plucked hairline and baby hairs at the temple", "detail"),
      img("black-bob-lace-worn", "Client wearing the sleek black bob lace front wig under studio light", "portrait"),
    ],
    inStock: true,
    featured: true,
    releasedAt: "2025-03-04",
  },
  {
    id: "ag-002",
    slug: "natural-black-sleek-bob-wig",
    name: "Natural Black Sleek Bob Wig",
    subtitle: "100% Remy Human Hair",
    collections: ["wigs", "new-arrivals"],
    category: "wigs",
    price: 22500,
    badges: ["NEW"],
    texture: "Silky Straight",
    origin: "100% Remy human hair",
    capConstruction: "Glueless adjustable cap",
    lengths: bobLengths,
    densities,
    colours: blackOnly,
    rating: 5,
    reviewCount: 18,
    excerpt:
      "Silky smooth natural black bob in 100% Remy human hair. Available in multiple lengths.",
    description: [
      "A silky smooth natural black bob in 100% Remy human hair, with the cuticle intact and aligned from root to tip. Available in multiple lengths so the shape can sit at the jaw, the chin or just below.",
      "Built on a glueless adjustable cap for anyone who wants the finish without the adhesive — straight on, straight off, no melt required.",
    ],
    details: [
      "100% Remy human hair, cuticle aligned",
      "Glueless adjustable cap",
      "Available in multiple lengths",
      "Natural black, ready to tone or colour",
      "Heat styleable to 180°C",
    ],
    care: [
      "Wash every 8–10 wears with a sulphate-free shampoo, working downwards.",
      "Condition mid-length to ends only.",
      "Air dry on a canvas block before styling.",
      "Store on a mannequin or in a satin bag, never folded.",
    ],
    images: [
      img("natural-bob-front", "Client wearing the natural black sleek bob, front view", "product"),
      img("natural-bob-side", "Profile of the natural black bob showing the nape and cap line", "product"),
      img("natural-bob-back", "Studio portrait showing the Remy hair's shine and the finished shape", "product"),
      img("natural-bob-detail", "A flat iron passing through the hair to set the finish", "detail"),
      img("natural-bob-worn", "Client wearing the natural black sleek bob wig", "portrait"),
    ],
    inStock: true,
    featured: true,
    releasedAt: "2025-06-18",
  },
  {
    id: "ag-003",
    slug: "13x6-straight-lace-front-extra-length",
    name: "13×6 Straight Lace Front — Extra Length",
    subtitle: "30\" · Raw Virgin Human Hair",
    collections: ["wigs", "best-sellers", "new-arrivals"],
    category: "wigs",
    price: 29500,
    badges: ["BESTSELLER", "NEW"],
    texture: "Silky Straight",
    origin: "Raw virgin human hair",
    capConstruction: "13×6 lace front, pre-plucked hairline",
    lengths: longWigLengths,
    densities,
    colours: naturalColours,
    rating: 5,
    reviewCount: 4,
    excerpt:
      "Luxurious 30-inch silky straight lace front in raw virgin human hair, beautifully full from root to tip.",
    description: [
      "A luxurious 30-inch silky straight lace front crafted from raw virgin human hair sourced from trusted global suppliers. The 13×6 lace gives maximum parting versatility and a completely natural-looking hairline.",
      "Beautifully full from root to tip — the density holds all the way down rather than thinning out at the ends, which is where most long units fail.",
    ],
    details: [
      "13×6 lace front for deep parting versatility",
      "Raw virgin human hair, cuticle intact",
      "Pre-plucked, natural-looking hairline",
      "Full from root to tip, no thinning at the ends",
      "Can be dyed, curled and straightened",
    ],
    care: [
      "Wash every 8–10 wears with a sulphate-free shampoo, working downwards.",
      "Condition mid-length to ends only, avoiding the lace and knots.",
      "Air dry on a canvas block; heat style below 180°C with protection.",
      "Store on a mannequin or in a satin bag, never folded.",
    ],
    images: [
      img("lace-30-front", "Client wearing the 13x6 straight lace front at 30 inches, front view", "product"),
      img("lace-30-side", "Side view of the 30 inch straight lace front, showing the full length", "product"),
      img("lace-30-back", "Profile of the 30 inch install showing how the length falls", "product"),
      img("lace-30-detail", "Close-up of the 13x6 lace and the parting at the hairline", "detail"),
      img("lace-30-texture", "The silky straight texture photographed close, root to tip", "texture"),
      img("lace-30-worn", "Client wearing the 30 inch straight lace front wig", "portrait"),
    ],
    inStock: true,
    featured: true,
    releasedAt: "2025-07-22",
  },
  {
    id: "ag-004",
    slug: "body-wave-human-hair-bundles",
    name: "Body Wave Human Hair Bundles",
    subtitle: "Premium Raw Human Hair",
    collections: ["human-hair", "best-sellers"],
    category: "human-hair",
    price: 7900,
    badges: [],
    texture: "Body Wave",
    origin: "Raw human hair, sourced worldwide",
    lengths: bundleLengths,
    densities: standardDensity,
    colours: blackOnly,
    rating: 4,
    reviewCount: 31,
    excerpt:
      "Premium raw human hair body wave bundles — silky, tangle-free and rich in texture.",
    description: [
      "Premium raw human hair body wave bundles sourced from trusted suppliers worldwide. Silky, tangle-free and rich in texture, with a wave that falls rather than sits.",
      "Available in bundle deals for a full, voluminous finish. Two bundles carry most installs to 16 inches, three to 20, and four beyond that — add a closure or frontal if you want a parting.",
    ],
    details: [
      "Raw human hair, cuticle intact and aligned",
      "Body wave pattern, tangle-free",
      "Machine double-weft",
      "Bundle deals available",
      "Can be dyed, curled and straightened",
    ],
    care: [
      "Co-wash before the first install to release factory product.",
      "Wash every 8–10 wears with a sulphate-free shampoo, working downwards.",
      "Air dry where possible; diffuse on low to keep the wave pattern.",
      "Store braided or in a satin bag between installs.",
    ],
    images: [
      img("body-wave-bundle-hero", "Body wave human hair bundles held up against a studio background", "product"),
      img("body-wave-bundle-weft", "Bundles held beside the studio's wall of wefts", "detail"),
      img("body-wave-bundle-texture", "The body wave pattern photographed close on hanging wefts", "texture"),
      img("body-wave-bundle-worn", "Client wearing a body wave install, styled in the studio", "portrait"),
    ],
    inStock: true,
    featured: true,
    releasedAt: "2025-01-20",
  },
  {
    id: "ag-005",
    slug: "straight-human-hair-bundles",
    name: "Straight Human Hair Bundles",
    subtitle: "Virgin Human Hair",
    collections: ["human-hair", "best-sellers"],
    category: "human-hair",
    price: 7500,
    badges: [],
    texture: "Silky Straight",
    origin: "Virgin human hair",
    lengths: bundleLengths,
    densities: standardDensity,
    colours: blackOnly,
    rating: 5,
    reviewCount: 27,
    excerpt:
      "Virgin human hair straight bundles — thick, luscious and perfectly aligned from root to tip.",
    description: [
      "Virgin human hair straight bundles of exceptional quality. Thick, luscious and perfectly aligned from root to tip, sourced for natural beauty and lasting wear.",
      "The straight texture takes heat well and holds a press, and because the cuticle runs in one direction there is no matting at the root after washing.",
    ],
    details: [
      "Virgin human hair, cuticle intact and aligned",
      "Thick from root to tip, no taper",
      "Machine double-weft",
      "Bundle deals available",
      "Can be dyed, curled and straightened",
    ],
    care: [
      "Co-wash before the first install to release factory product.",
      "Wash every 8–10 wears with a sulphate-free shampoo, working downwards.",
      "Air dry, then press below 180°C with heat protection.",
      "Store braided or in a satin bag between installs.",
    ],
    images: [
      img("straight-bundle-hero", "Straight human hair bundles held up against a studio background", "product"),
      img("straight-bundle-weft", "Long straight wefts laid across the lap, showing the double weft", "detail"),
      img("straight-bundle-texture", "The straight texture photographed close, thick from root to tip", "texture"),
      img("straight-bundle-worn", "Client wearing a straight bundle install", "portrait"),
    ],
    inStock: true,
    releasedAt: "2025-01-20",
  },
  {
    id: "ag-006",
    slug: "hd-lace-frontal-13x4",
    name: "HD Lace Frontal 13×4",
    subtitle: "Swiss HD Lace",
    collections: ["frontals-closures", "best-sellers"],
    category: "frontals-closures",
    price: 6500,
    badges: ["BESTSELLER"],
    texture: "Silky Straight",
    origin: "Virgin human hair",
    capConstruction: "13×4 Swiss HD lace, bleached knots",
    lengths: laceLengths,
    densities,
    colours: laceColours,
    rating: 5,
    reviewCount: 55,
    excerpt:
      "Swiss HD lace frontal, pre-plucked with bleached knots for an invisible hairline.",
    description: [
      "A 13×4 Swiss HD lace frontal, pre-plucked with the knots already bleached so the hairline disappears against a range of complexions with minimal work.",
      "The ear-to-ear span gives you a full parting anywhere across the front, and the density is graded so the hairline stays soft rather than reading as a block.",
    ],
    details: [
      "13×4 Swiss HD lace",
      "Pre-plucked hairline",
      "Knots bleached at the parting",
      "Ear-to-ear parting versatility",
      "Virgin human hair",
    ],
    care: [
      "Remove adhesive fully with a dedicated remover — never pull.",
      "Wash the lace gently by hand, never scrub.",
      "Air dry flat; do not iron the lace directly.",
      "Store on a block to keep the shape.",
    ],
    images: [
      img("hd-frontal-hero", "Client wearing an HD frontal install, hands lifting the hair", "product"),
      img("hd-frontal-lace", "Profile showing the melted HD lace along the hairline", "detail"),
      img("hd-frontal-parting", "The frontal parted to show hairline density", "detail"),
      img("hd-frontal-worn", "Client wearing a 13x4 HD lace frontal install", "portrait"),
    ],
    inStock: true,
    featured: true,
    releasedAt: "2025-02-11",
  },
  {
    id: "ag-007",
    slug: "4x4-lace-closure",
    name: "4×4 Lace Closure",
    subtitle: "Pre-plucked with Baby Hairs",
    collections: ["frontals-closures", "new-arrivals"],
    category: "frontals-closures",
    price: 4900,
    badges: [],
    texture: "Silky Straight",
    origin: "Virgin human hair",
    capConstruction: "4×4 lace closure, pre-plucked",
    lengths: laceLengths,
    densities,
    colours: laceColours,
    rating: 4,
    reviewCount: 22,
    excerpt:
      "Seamless, natural-looking lace closure. Pre-plucked with baby hairs, in straight, body wave and curly.",
    description: [
      "A seamless, natural-looking 4×4 lace closure, pre-plucked with baby hairs left in. The simplest way to get a clean parting on a sew-in without committing to a full frontal.",
      "Available in straight, body wave and curly to match whichever bundles you are installing.",
    ],
    details: [
      "4×4 lace closure",
      "Pre-plucked with baby hairs",
      "Straight, body wave or curly",
      "Free, middle or side parting",
      "Virgin human hair",
    ],
    care: [
      "Remove adhesive fully with a dedicated remover — never pull.",
      "Wash the lace gently by hand, never scrub.",
      "Air dry flat; do not iron the lace directly.",
      "Store on a block to keep the shape.",
    ],
    images: [
      img("closure-hero", "Client wearing a 4x4 closure install with a natural parting", "product"),
      img("closure-lace", "Full-length view of a closure install, styled straight", "detail"),
      img("closure-parting", "A sleek parting and hairline reflected in a studio mirror", "detail"),
      img("closure-worn", "Client wearing a closure install, styled and finished", "portrait"),
    ],
    inStock: true,
    releasedAt: "2025-05-09",
  },
];

/* ------------------------------------------------------------------
   Collections
   ------------------------------------------------------------------ */

export interface Collection {
  slug: string;
  title: string;
  eyebrow: string;
  description: string;
  imageSeed: string;
}

export const collections: Collection[] = [
  {
    slug: "wigs",
    title: "Wigs",
    eyebrow: "Collection",
    description:
      "Luxury wigs crafted for effortless confidence — closures, frontals and hand-cut short styles, each finished in the studio before it reaches you.",
    imageSeed: "collection-wigs",
  },
  {
    slug: "human-hair",
    title: "Human Hair",
    eyebrow: "Collection",
    description:
      "Raw and virgin human hair bundles from trusted suppliers worldwide, hand-selected for quality and longevity — cuticle intact and aligned from root to tip.",
    imageSeed: "collection-hair",
  },
  {
    slug: "frontals-closures",
    title: "Frontals & Closures",
    eyebrow: "Collection",
    description:
      "HD and Swiss lace frontals and closures, pre-plucked with bleached knots, for a parting that reads as your own hairline.",
    imageSeed: "collection-lace",
  },
  {
    slug: "new-arrivals",
    title: "New Arrivals",
    eyebrow: "Just In",
    description:
      "The latest pieces to join the studio — small drops, hand-finished, and often gone before they are restocked.",
    imageSeed: "collection-new",
  },
  {
    slug: "best-sellers",
    title: "Best Sellers",
    eyebrow: "Most Loved",
    description:
      "The pieces our clients return for. Proven textures, proven construction, and the styles we install most often.",
    imageSeed: "collection-best",
  },
];

/* ------------------------------------------------------------------
   Queries
   ------------------------------------------------------------------ */

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getCollection(slug: string): Collection | undefined {
  return collections.find((c) => c.slug === slug);
}

export function productsInCollection(slug: string): Product[] {
  if (slug === "all") return products;
  return products.filter((p) => p.collections.includes(slug));
}

export function featuredProducts(limit = 8): Product[] {
  return products.filter((p) => p.featured).slice(0, limit);
}

export function relatedProducts(product: Product, limit = 4): Product[] {
  const sameCategory = products.filter(
    (p) => p.id !== product.id && p.category === product.category,
  );
  const rest = products.filter(
    (p) => p.id !== product.id && p.category !== product.category,
  );
  return [...sameCategory, ...rest].slice(0, limit);
}

/** Cheapest possible price for a product, used for "from" pricing. */
export function priceFrom(product: Product): number {
  const cheapest = (options: VariantOption[]) =>
    Math.min(...options.map((o) => o.delta ?? 0));
  return (
    product.price +
    cheapest(product.lengths) +
    cheapest(product.densities) +
    cheapest(product.colours)
  );
}

export function searchProducts(query: string): Product[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return products.filter((p) =>
    [p.name, p.subtitle, p.texture, p.origin, p.excerpt, ...p.collections]
      .join(" ")
      .toLowerCase()
      .includes(q),
  );
}

/** First available option in each selector — the state a PDP opens with. */
export function defaultVariant(product: Product) {
  const first = (options: VariantOption[]) =>
    options.find((o) => o.available !== false) ?? options[0];
  return {
    length: first(product.lengths),
    density: first(product.densities),
    colour: first(product.colours),
  };
}

/** Price for a specific combination of selected options. */
export function variantPrice(
  product: Product,
  variant: { length: VariantOption; density: VariantOption; colour: VariantOption },
): number {
  return (
    product.price +
    (variant.length.delta ?? 0) +
    (variant.density.delta ?? 0) +
    (variant.colour.delta ?? 0)
  );
}

/** Every distinct value across the catalogue, for the collection filters. */
export const facets = {
  category: [
    { value: "wigs", label: "Wigs" },
    { value: "human-hair", label: "Human Hair" },
    { value: "frontals-closures", label: "Frontals & Closures" },
  ],
  texture: Array.from(new Set(products.map((p) => p.texture))).sort(),
  length: ['10"', '12"', '14"', '16"', '18"', '20"', '22"', '24"', '26"', '28"', '30"'],
  density: ["150%", "180%", "200%", "250%"],
  colour: Array.from(
    new Set(products.flatMap((p) => p.colours.map((c) => c.label))),
  ).sort(),
  price: [
    { value: "0-7500", label: "Under £75" },
    { value: "7500-15000", label: "£75 – £150" },
    { value: "15000-25000", label: "£150 – £250" },
    { value: "25000-1000000", label: "£250 +" },
  ],
  availability: [
    { value: "in-stock", label: "In stock" },
    { value: "out-of-stock", label: "Out of stock" },
  ],
} as const;
