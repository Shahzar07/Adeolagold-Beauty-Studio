import type { Product, VariantOption } from "./types";

/* ------------------------------------------------------------------
   Shared variant sets. Individual products override where they differ.
   ------------------------------------------------------------------ */

const wigLengths: VariantOption[] = [
  { label: '14"', delta: 0 },
  { label: '16"', delta: 4000 },
  { label: '18"', delta: 9000 },
  { label: '20"', delta: 15000 },
  { label: '22"', delta: 22000 },
  { label: '24"', delta: 30000 },
  { label: '26"', delta: 40000, available: false },
];

const bundleLengths: VariantOption[] = [
  { label: '14"', delta: 0 },
  { label: '16"', delta: 1500 },
  { label: '18"', delta: 3000 },
  { label: '20"', delta: 5000 },
  { label: '22"', delta: 7500 },
  { label: '24"', delta: 10500 },
];

const densities: VariantOption[] = [
  { label: "150%", delta: 0 },
  { label: "180%", delta: 6000 },
  { label: "200%", delta: 12000 },
  { label: "250%", delta: 22000, available: false },
];

const bundleDensities: VariantOption[] = [{ label: "Standard", delta: 0 }];

const naturalColours: VariantOption[] = [
  { label: "Natural Black 1B", swatch: "#1B1614" },
  { label: "Espresso 2", swatch: "#33221A", delta: 0 },
  { label: "Chestnut 4", swatch: "#4E3324", delta: 2000 },
  { label: "Honey Blonde 27", swatch: "#B07C42", delta: 5000 },
  { label: "Champagne 613", swatch: "#D9C193", delta: 8000 },
];

const shortColours: VariantOption[] = [
  { label: "Natural Black 1B", swatch: "#1B1614" },
  { label: "Warm Gold 27", swatch: "#B98C4B", delta: 3000 },
  { label: "Champagne 613", swatch: "#D9C193", delta: 5000 },
];

function img(seed: string, alt: string, tone: Product["images"][number]["tone"]) {
  return { seed, alt, tone };
}

/* ------------------------------------------------------------------
   Catalogue
   ------------------------------------------------------------------ */

export const products: Product[] = [
  {
    id: "ag-001",
    slug: "luxury-body-wave-closure-wig",
    name: "Luxury Body Wave Closure Wig",
    subtitle: "100% Human Hair",
    collections: ["wigs", "best-sellers"],
    category: "wigs",
    price: 42000,
    badges: ["BESTSELLER"],
    texture: "Body Wave",
    origin: "Single-donor Vietnamese",
    capConstruction: "5x5 HD lace closure, transparent lace",
    lengths: wigLengths,
    densities,
    colours: naturalColours,
    rating: 4.9,
    reviewCount: 187,
    excerpt:
      "A soft, weightless wave with the kind of movement that photographs beautifully and holds through the week.",
    description: [
      "Our most requested wig, cut and ventilated in the studio from a single hair donor so the cuticle runs in one direction from root to tip. The result is a wave that falls rather than sits — full at the crown, soft through the mid-lengths, and never triangular at the ends.",
      "The 5x5 HD closure melts against a range of complexions with minimal bleaching, and the pre-plucked hairline is left deliberately irregular so it reads as your own from the first wear.",
    ],
    details: [
      "5x5 HD transparent lace closure",
      "Pre-plucked, single-knotted hairline",
      "Adjustable elastic band and four combs",
      "Bleached knots at the parting only",
      "Can be dyed, curled and straightened",
    ],
    care: [
      "Wash every 8–10 wears with a sulphate-free shampoo, working downwards.",
      "Condition mid-length to ends only, avoiding the lace and knots.",
      "Air dry on a canvas block; heat style below 180°C with protection.",
      "Store on a mannequin or in a satin bag, never folded.",
    ],
    images: [
      img("body-wave-front", "Body wave closure wig, front view on a studio block", "product"),
      img("body-wave-side", "Body wave closure wig, side profile showing wave pattern", "product"),
      img("body-wave-back", "Body wave closure wig, back view showing length and fullness", "product"),
      img("body-wave-detail", "Close-up of the HD lace closure and hand-tied parting", "detail"),
      img("body-wave-texture", "Macro texture study of the body wave pattern", "texture"),
      img("body-wave-worn", "Client wearing the body wave closure wig", "portrait"),
    ],
    inStock: true,
    featured: true,
    releasedAt: "2025-02-14",
  },
  {
    id: "ag-002",
    slug: "signature-hd-frontal-wig",
    name: "Signature HD Frontal Wig",
    subtitle: "13x6 HD Lace · Raw Hair",
    collections: ["wigs", "best-sellers", "new-arrivals"],
    category: "wigs",
    price: 58500,
    badges: ["BESTSELLER", "NEW"],
    texture: "Silky Straight",
    origin: "Raw Southeast Asian",
    capConstruction: "13x6 HD frontal, glueless adjustable cap",
    lengths: wigLengths,
    densities,
    colours: naturalColours,
    rating: 5,
    reviewCount: 96,
    excerpt:
      "Six inches of parting space, an undetectable hairline, and hair raw enough to take colour without protest.",
    description: [
      "The Signature is the wig we build when a client wants one piece to do everything — a deep side part on Monday, a middle part on Friday, pulled back without a visible seam.",
      "Raw hair means the cuticle has never been stripped or acid-bathed, so it lifts cleanly to blonde and returns to a natural sheen after washing rather than dulling.",
    ],
    details: [
      "13x6 HD frontal with six inches of parting depth",
      "Glueless cap with adjustable straps and silicone grips",
      "Layered internally to remove weight, not length",
      "Colour-safe up to a level 9 lift",
      "Includes a satin storage bag and edge brush",
    ],
    care: [
      "Rinse in lukewarm water and never scrub the lace.",
      "Use a leave-in mist on the mid-lengths between washes.",
      "Detangle from the ends upwards with a wide-tooth comb.",
      "Book a revamp every 10–12 weeks to keep the frontal crisp.",
    ],
    images: [
      img("hd-frontal-front", "Signature HD frontal wig, front view", "product"),
      img("hd-frontal-part", "Close-up of the 13x6 HD frontal parting", "detail"),
      img("hd-frontal-side", "Signature HD frontal wig, side view", "product"),
      img("hd-frontal-back", "Signature HD frontal wig, back view", "product"),
      img("hd-frontal-worn", "Client wearing the Signature HD frontal wig", "portrait"),
    ],
    inStock: true,
    featured: true,
    releasedAt: "2025-06-02",
  },
  {
    id: "ag-003",
    slug: "kinky-straight-glueless-wig",
    name: "Kinky Straight Glueless Wig",
    subtitle: "Natural Blow-Out Texture",
    collections: ["wigs", "new-arrivals"],
    category: "wigs",
    price: 46500,
    badges: ["NEW"],
    texture: "Kinky Straight",
    origin: "Single-donor Indian",
    capConstruction: "U-part glueless cap with leave-out",
    lengths: wigLengths,
    densities,
    colours: naturalColours.slice(0, 4),
    rating: 4.8,
    reviewCount: 64,
    excerpt:
      "The finish of a fresh silk press, built to blend with natural hair rather than sit on top of it.",
    description: [
      "Cut for women who want length without abandoning their own texture. The kinky straight pattern mirrors freshly pressed 4a–4b hair, so a small leave-out blends invisibly at the parting.",
      "Glueless throughout — no adhesive, no lace tint, nothing to reapply on a Monday morning.",
    ],
    details: [
      "Glueless U-part construction",
      "Blends with 3c–4b natural textures",
      "Reverts to a soft coil when wet",
      "Adjustable band and three pressure-free combs",
      "Under ten minutes to install at home",
    ],
    care: [
      "Wash every 6–8 wears; the texture holds oil more readily.",
      "Air dry fully before pressing to avoid steam damage.",
      "Press at 170–180°C in small sections.",
      "Wrap in satin overnight to preserve the blow-out.",
    ],
    images: [
      img("kinky-straight-front", "Kinky straight glueless wig, front view", "product"),
      img("kinky-straight-texture", "Macro study of the kinky straight texture", "texture"),
      img("kinky-straight-side", "Kinky straight glueless wig, side view", "product"),
      img("kinky-straight-worn", "Client wearing the kinky straight glueless wig", "portrait"),
    ],
    inStock: true,
    featured: true,
    releasedAt: "2025-07-21",
  },
  {
    id: "ag-004",
    slug: "champagne-pixie-wig",
    name: "Champagne Pixie Wig",
    subtitle: "Hand-Cut Short Style",
    collections: ["wigs", "new-arrivals"],
    category: "wigs",
    price: 32500,
    badges: ["LIMITED"],
    texture: "Straight",
    origin: "Single-donor Vietnamese",
    capConstruction: "Full lace, hand-cut pixie",
    lengths: [
      { label: "Cropped", delta: 0 },
      { label: "Classic", delta: 2500 },
      { label: "Textured", delta: 4000 },
    ],
    densities: [
      { label: "150%", delta: 0 },
      { label: "180%", delta: 4000 },
    ],
    colours: shortColours,
    rating: 4.9,
    reviewCount: 41,
    excerpt:
      "A cropped, warm-blonde pixie cut entirely by hand. Made in small runs — no two are identical.",
    description: [
      "Cut freehand on the block, the way a barber cuts a fade: point-cut through the crown for lift, tapered at the nape, and left slightly heavier at the fringe so it can be worn swept or forward.",
      "Because each piece is cut individually, we release them in small runs. Sold out is genuinely sold out until the next drop.",
    ],
    details: [
      "Full lace cap with a natural hairline all round",
      "Hand-cut, no two pieces identical",
      "Pre-styled and ready to wear",
      "Weighs under 90g",
      "Limited release",
    ],
    care: [
      "Refresh the shape with a light pomade rather than heat where possible.",
      "Wash monthly; short styles need far less handling.",
      "Store on a block to hold the cut.",
      "Book a shape-up with us every three months.",
    ],
    images: [
      img("pixie-front", "Champagne pixie wig, front view", "product"),
      img("pixie-side", "Champagne pixie wig, side view showing the taper", "product"),
      img("pixie-worn", "Client wearing the champagne pixie wig", "portrait"),
      img("pixie-detail", "Detail of the hand-cut fringe", "detail"),
    ],
    inStock: true,
    releasedAt: "2025-08-08",
  },
  {
    id: "ag-005",
    slug: "deep-wave-frontal-wig",
    name: "Deep Wave Frontal Wig",
    subtitle: "13x4 Lace · 100% Human Hair",
    collections: ["wigs", "best-sellers"],
    category: "wigs",
    price: 48000,
    compareAtPrice: 54000,
    badges: ["BESTSELLER"],
    texture: "Deep Wave",
    origin: "Single-donor Vietnamese",
    capConstruction: "13x4 transparent lace frontal",
    lengths: wigLengths,
    densities,
    colours: naturalColours.slice(0, 4),
    rating: 4.8,
    reviewCount: 132,
    excerpt:
      "A defined, springy wave that survives humidity and comes back to life with water alone.",
    description: [
      "Deep wave asks a lot of a wig — density at the root, definition through the length, and no frizz where the two meet. We build this one at 180% as standard for that reason.",
      "It rehydrates rather than resets: mist, scrunch, and the pattern returns without product build-up.",
    ],
    details: [
      "13x4 transparent lace frontal",
      "180% density as standard",
      "Pattern holds after 20+ washes",
      "Pre-plucked hairline with baby hairs",
      "Includes wig cap and satin bag",
    ],
    care: [
      "Mist with water and a curl cream to revive the pattern.",
      "Never brush dry — detangle with fingers or a wide-tooth comb when damp.",
      "Deep condition monthly.",
      "Sleep in a satin bonnet or a loose pineapple.",
    ],
    images: [
      img("deep-wave-front", "Deep wave frontal wig, front view", "product"),
      img("deep-wave-texture", "Macro study of the deep wave pattern", "texture"),
      img("deep-wave-back", "Deep wave frontal wig, back view", "product"),
      img("deep-wave-worn", "Client wearing the deep wave frontal wig", "portrait"),
    ],
    inStock: true,
    featured: true,
    releasedAt: "2025-01-30",
  },
  {
    id: "ag-006",
    slug: "bone-straight-bob-wig",
    name: "Bone Straight Bob Wig",
    subtitle: "Blunt Cut · HD Lace",
    collections: ["wigs", "new-arrivals", "best-sellers"],
    category: "wigs",
    price: 36000,
    badges: ["BESTSELLER"],
    texture: "Bone Straight",
    origin: "Raw Vietnamese",
    capConstruction: "4x4 HD lace closure",
    lengths: [
      { label: '10"', delta: 0 },
      { label: '12"', delta: 2500 },
      { label: '14"', delta: 5000 },
      { label: '16"', delta: 8000 },
    ],
    densities: [
      { label: "180%", delta: 0 },
      { label: "200%", delta: 6000 },
    ],
    colours: naturalColours,
    rating: 4.9,
    reviewCount: 118,
    excerpt:
      "A precision blunt cut with weight at the perimeter. The most-photographed piece in the studio.",
    description: [
      "The bob lives or dies on its perimeter. Ours is cut wet, dried, then re-checked dry so the line stays true once the hair moves.",
      "Bone straight from the factory-free — no silicone coating to wash out, which is why it still falls this flat at month six.",
    ],
    details: [
      "4x4 HD lace closure",
      "Blunt perimeter, checked dry",
      "No silicone coating",
      "Sits between the jaw and the collarbone",
      "Ready to wear out of the box",
    ],
    care: [
      "Wash every 8–10 wears.",
      "Flat iron at 180°C to re-set the perimeter after washing.",
      "Use a lightweight serum on the ends only.",
      "Trim the line every three months to keep it sharp.",
    ],
    images: [
      img("bob-front", "Bone straight bob wig, front view", "product"),
      img("bob-side", "Bone straight bob wig, side view showing the blunt line", "product"),
      img("bob-worn", "Client wearing the bone straight bob", "portrait"),
      img("bob-detail", "Detail of the blunt-cut perimeter", "detail"),
    ],
    inStock: true,
    featured: true,
    releasedAt: "2025-05-11",
  },
  {
    id: "ag-007",
    slug: "raw-vietnamese-straight-bundles",
    name: "Raw Vietnamese Straight Bundles",
    subtitle: "Single Donor · Per Bundle",
    collections: ["human-hair", "best-sellers"],
    category: "human-hair",
    price: 16500,
    badges: ["BESTSELLER"],
    texture: "Straight",
    origin: "Raw Vietnamese, single donor",
    lengths: bundleLengths,
    densities: bundleDensities,
    colours: [{ label: "Natural Black 1B", swatch: "#1B1614" }],
    rating: 5,
    reviewCount: 214,
    excerpt:
      "Cuticle intact, aligned, and never chemically processed. The foundation of every install we do.",
    description: [
      "Collected from one donor and kept in one bundle — that is the whole story, and it is the reason this hair behaves.",
      "It arrives with its natural lustre rather than a coating, which means the first wash removes nothing and the hair looks the same at wear fifty as at wear one.",
    ],
    details: [
      "Single donor, cuticle-aligned",
      "No chemical processing or steaming",
      "Double machine weft, minimal shedding",
      "Approx. 100g per bundle",
      "Three bundles recommended up to 20\"",
    ],
    care: [
      "Co-wash between full washes to preserve moisture.",
      "Air dry where possible.",
      "Store braided or in the original satin wrap.",
      "Avoid protein overload — this hair is already strong.",
    ],
    images: [
      img("raw-straight-bundle", "Raw Vietnamese straight bundle laid flat", "product"),
      img("raw-straight-weft", "Close-up of the double machine weft", "detail"),
      img("raw-straight-texture", "Macro texture study of raw straight hair", "texture"),
      img("raw-straight-styled", "Raw straight hair styled after installation", "portrait"),
    ],
    inStock: true,
    featured: true,
    releasedAt: "2024-11-04",
  },
  {
    id: "ag-008",
    slug: "raw-body-wave-bundles",
    name: "Raw Body Wave Bundles",
    subtitle: "Single Donor · Per Bundle",
    collections: ["human-hair", "best-sellers"],
    category: "human-hair",
    price: 17500,
    badges: [],
    texture: "Body Wave",
    origin: "Raw Vietnamese, single donor",
    lengths: bundleLengths,
    densities: bundleDensities,
    colours: [{ label: "Natural Black 1B", swatch: "#1B1614" }],
    rating: 4.9,
    reviewCount: 149,
    excerpt: "A natural S-wave that loosens beautifully over the first fortnight, then settles.",
    description: [
      "The wave here is the donor's own, not steam-set, so it will not drop out after three washes the way processed body wave does.",
      "Expect it to loosen slightly in the first two weeks as the packing relaxes — that is the hair settling into its true pattern.",
    ],
    details: [
      "Single donor, cuticle-aligned",
      "Natural, unset wave pattern",
      "Double machine weft",
      "Approx. 100g per bundle",
      "Pairs with our matching closures",
    ],
    care: [
      "Detangle when damp, never dry.",
      "Use a curl cream rather than gel to define.",
      "Air dry to keep the pattern soft.",
      "Deep condition every fourth wash.",
    ],
    images: [
      img("raw-wave-bundle", "Raw body wave bundle laid flat", "product"),
      img("raw-wave-texture", "Macro texture study of raw body wave hair", "texture"),
      img("raw-wave-styled", "Body wave bundles styled after installation", "portrait"),
    ],
    inStock: true,
    releasedAt: "2024-12-18",
  },
  {
    id: "ag-009",
    slug: "raw-curly-bundles",
    name: "Raw Curly Bundles",
    subtitle: "3B–3C Pattern · Per Bundle",
    collections: ["human-hair", "new-arrivals"],
    category: "human-hair",
    price: 19500,
    badges: ["NEW"],
    texture: "Curly",
    origin: "Raw Indian, single donor",
    lengths: bundleLengths.slice(0, 5),
    densities: bundleDensities,
    colours: [{ label: "Natural Black 1B", swatch: "#1B1614" }],
    rating: 4.7,
    reviewCount: 58,
    excerpt: "A true 3b–3c curl with spring and volume that shrinks by roughly a third when wet.",
    description: [
      "Curly hair is the hardest texture to source honestly, because the pattern cannot be faked without heat. This one is the donor's.",
      "Order two inches longer than your target length to account for shrinkage; the curl draws up by around a third once fully hydrated.",
    ],
    details: [
      "Genuine 3b–3c curl pattern",
      "Single donor, cuticle-aligned",
      "Roughly one third shrinkage when wet",
      "Approx. 100g per bundle",
      "Four bundles recommended for a full head",
    ],
    care: [
      "Wash in sections to prevent tangling at the root.",
      "Apply leave-in to soaking wet hair, then scrunch.",
      "Diffuse on low or air dry.",
      "Refresh daily with a water and conditioner mist.",
    ],
    images: [
      img("raw-curly-bundle", "Raw curly bundle laid flat", "product"),
      img("raw-curly-texture", "Macro study of the 3b to 3c curl pattern", "texture"),
      img("raw-curly-styled", "Curly bundles styled after installation", "portrait"),
    ],
    inStock: true,
    releasedAt: "2025-07-02",
  },
  {
    id: "ag-010",
    slug: "hd-lace-closure-5x5",
    name: "HD Lace Closure 5x5",
    subtitle: "Transparent Swiss Lace",
    collections: ["human-hair"],
    category: "human-hair",
    price: 12500,
    badges: [],
    texture: "Matched to bundle",
    origin: "Raw Vietnamese, single donor",
    lengths: [
      { label: '12"', delta: 0 },
      { label: '14"', delta: 1500 },
      { label: '16"', delta: 3000 },
      { label: '18"', delta: 4500 },
    ],
    densities: [
      { label: "150%", delta: 0 },
      { label: "180%", delta: 3000 },
    ],
    colours: naturalColours.slice(0, 3),
    rating: 4.8,
    reviewCount: 87,
    excerpt: "Thin enough to disappear, strong enough to survive a full install cycle.",
    description: [
      "HD lace is a compromise between invisibility and durability. Too fine and it tears at the first tension point; too heavy and you see it.",
      "We stock the mid-weight Swiss grade — genuinely undetectable once tinted, and it holds through a six-week install.",
    ],
    details: [
      "5x5 parting area",
      "Swiss HD lace, mid-weight",
      "Free, middle or three-part ready",
      "Pre-plucked with bleached knots",
      "Texture-matched to our bundles",
    ],
    care: [
      "Tint the lace to your scalp before the first install.",
      "Clean adhesive residue with a citrus-based remover, never alcohol.",
      "Never comb directly over the knots.",
      "Store flat, not folded.",
    ],
    images: [
      img("closure-flat", "5x5 HD lace closure laid flat", "product"),
      img("closure-knots", "Macro of the bleached knots and hand-tied parting", "detail"),
      img("closure-installed", "HD closure after installation", "portrait"),
    ],
    inStock: true,
    releasedAt: "2025-03-19",
  },
  {
    id: "ag-011",
    slug: "hd-lace-frontal-13x4",
    name: "HD Lace Frontal 13x4",
    subtitle: "Ear-to-Ear Transparent Lace",
    collections: ["human-hair", "new-arrivals"],
    category: "human-hair",
    price: 18500,
    badges: ["NEW"],
    texture: "Matched to bundle",
    origin: "Raw Vietnamese, single donor",
    lengths: [
      { label: '14"', delta: 0 },
      { label: '16"', delta: 2000 },
      { label: '18"', delta: 4000 },
      { label: '20"', delta: 6500 },
    ],
    densities: [
      { label: "150%", delta: 0 },
      { label: "180%", delta: 3500 },
    ],
    colours: naturalColours.slice(0, 3),
    rating: 4.9,
    reviewCount: 72,
    excerpt: "Ear-to-ear coverage for updos, ponytails and every parting in between.",
    description: [
      "A frontal buys you freedom: a high ponytail, a deep side part, hair pulled back off the face without a visible join.",
      "Ours is hand-tied with a graduated hairline — finer, single knots at the perimeter, denser behind — so it never reads as a wall of hair.",
    ],
    details: [
      "13x4 ear-to-ear coverage",
      "Swiss HD lace",
      "Graduated, single-knotted hairline",
      "Pre-plucked with natural baby hairs",
      "Texture-matched to our bundles",
    ],
    care: [
      "Tint the lace before installing.",
      "Lift with a gentle remover rather than pulling.",
      "Wash the frontal separately from the bundles where possible.",
      "Book a revamp before the hairline starts to thin.",
    ],
    images: [
      img("frontal-flat", "13x4 HD lace frontal laid flat", "product"),
      img("frontal-hairline", "Close-up of the graduated hairline", "detail"),
      img("frontal-installed", "HD frontal after installation", "portrait"),
    ],
    inStock: true,
    releasedAt: "2025-06-25",
  },
  {
    id: "ag-012",
    slug: "loose-wave-bundle-deal",
    name: "Loose Wave Bundle Deal",
    subtitle: "Three Bundles + Closure",
    collections: ["human-hair", "best-sellers"],
    category: "human-hair",
    price: 54000,
    compareAtPrice: 63500,
    badges: ["BESTSELLER"],
    texture: "Loose Wave",
    origin: "Raw Vietnamese, single donor",
    lengths: [
      { label: '16" / 16" / 18"', delta: 0 },
      { label: '18" / 20" / 20"', delta: 6000 },
      { label: '20" / 22" / 22"', delta: 12000 },
      { label: '22" / 24" / 24"', delta: 19000 },
    ],
    densities: bundleDensities,
    colours: [{ label: "Natural Black 1B", swatch: "#1B1614" }],
    rating: 4.9,
    reviewCount: 103,
    excerpt: "Everything a full sew-in needs, matched from the same donor and priced as a set.",
    description: [
      "Three bundles and a matching 5x5 closure, all cut from the same donor so the texture and lustre are identical across the head.",
      "This is the set we reach for most often in the studio for a full sew-in with a natural parting.",
    ],
    details: [
      "Three bundles plus one 5x5 HD closure",
      "All pieces from a single donor",
      "Double machine weft",
      "Approx. 300g total",
      "Saves £95 against buying separately",
    ],
    care: [
      "Wash in the direction of the weft.",
      "Dry the tracks completely to protect the natural hair beneath.",
      "Book a mid-cycle tightening at week three.",
      "Remove professionally at six to eight weeks.",
    ],
    images: [
      img("bundle-deal-set", "Three loose wave bundles with a matching closure", "product"),
      img("bundle-deal-texture", "Macro study of the loose wave pattern", "texture"),
      img("bundle-deal-styled", "Loose wave set styled after a full sew-in", "portrait"),
    ],
    inStock: true,
    featured: true,
    releasedAt: "2025-04-06",
  },
  {
    id: "ag-013",
    slug: "restorative-hair-mask",
    name: "Restorative Hair Mask",
    subtitle: "For Wigs, Bundles & Natural Hair · 250ml",
    collections: ["products", "best-sellers"],
    category: "products",
    price: 3200,
    badges: ["BESTSELLER"],
    texture: "Treatment",
    origin: "Formulated in the UK",
    lengths: [{ label: "250ml", delta: 0 }],
    densities: [{ label: "Standard", delta: 0 }],
    colours: [{ label: "Unscented", swatch: "#EFE9E1" }],
    rating: 4.8,
    reviewCount: 226,
    excerpt: "A weekly ten-minute mask that brings tired mid-lengths back without weighing them down.",
    description: [
      "Built around hydrolysed silk and cold-pressed baobab oil — enough slip to detangle a matted install, light enough that a 150% density wig does not go flat.",
      "The one product we ask every client to take home after an installation.",
    ],
    details: [
      "250ml recyclable bottle",
      "Sulphate, silicone and paraben free",
      "Safe on lace and knots",
      "Suitable for colour-treated hair",
      "Vegan and cruelty free",
    ],
    care: [
      "Apply to clean, damp hair from mid-length to ends.",
      "Leave for ten minutes; do not exceed twenty.",
      "Rinse in cool water to seal the cuticle.",
      "Use weekly, or fortnightly on fine hair.",
    ],
    images: [
      img("mask-bottle", "Restorative hair mask bottle", "product"),
      img("mask-texture", "Texture of the restorative hair mask", "detail"),
    ],
    inStock: true,
    releasedAt: "2025-02-01",
  },
  {
    id: "ag-014",
    slug: "silk-press-heat-serum",
    name: "Silk Press Heat Serum",
    subtitle: "Thermal Protection to 230°C · 100ml",
    collections: ["products"],
    category: "products",
    price: 2800,
    badges: [],
    texture: "Treatment",
    origin: "Formulated in the UK",
    lengths: [{ label: "100ml", delta: 0 }],
    densities: [{ label: "Standard", delta: 0 }],
    colours: [{ label: "Light Amber", swatch: "#D8C59D" }],
    rating: 4.7,
    reviewCount: 94,
    excerpt: "Protects to 230°C and leaves a glass finish rather than a film.",
    description: [
      "Most heat protectants either shield well and feel greasy, or feel lovely and do nothing. This one is weighted towards protection with a dry-touch finish.",
      "Six drops is enough for a full head. More than that and you will see it.",
    ],
    details: [
      "100ml pump bottle",
      "Thermal protection to 230°C",
      "Dry-touch, non-greasy finish",
      "Safe on human hair wigs and extensions",
      "Vegan and cruelty free",
    ],
    care: [
      "Apply to damp hair before blow-drying.",
      "Six to eight drops for a full head.",
      "Avoid the roots and the lace.",
      "Reapply lightly before flat ironing.",
    ],
    images: [
      img("serum-bottle", "Silk press heat serum bottle", "product"),
      img("serum-detail", "Detail of the serum pump and label", "detail"),
    ],
    inStock: true,
    releasedAt: "2025-03-12",
  },
  {
    id: "ag-015",
    slug: "satin-lined-bonnet",
    name: "Satin-Lined Bonnet",
    subtitle: "Adjustable · One Size",
    collections: ["products", "new-arrivals"],
    category: "products",
    price: 1800,
    badges: ["NEW"],
    texture: "Accessory",
    origin: "Made in Portugal",
    lengths: [{ label: "One size", delta: 0 }],
    densities: [{ label: "Standard", delta: 0 }],
    colours: [
      { label: "Espresso", swatch: "#33221A" },
      { label: "Champagne", swatch: "#D8C59D" },
      { label: "Ivory", swatch: "#F8F5F0" },
    ],
    rating: 4.9,
    reviewCount: 161,
    excerpt: "Deep enough for a 24-inch install, with a band that holds without leaving a mark.",
    description: [
      "Most bonnets are cut for natural hair and give up at eighteen inches. This one is built with a deep crown for long installs and wigs left on the head overnight.",
      "The elastic is encased rather than exposed, so there is no line across the forehead in the morning.",
    ],
    details: [
      "Deep crown for installs up to 26\"",
      "100% satin lining",
      "Encased, non-marking elastic",
      "Machine washable at 30°C",
      "One size, adjustable",
    ],
    care: [
      "Wash at 30°C in a laundry bag.",
      "Air dry flat.",
      "Do not tumble dry or iron the lining.",
      "Replace every six to nine months.",
    ],
    images: [
      img("bonnet-flat", "Satin-lined bonnet laid flat", "product"),
      img("bonnet-detail", "Detail of the encased elastic band", "detail"),
    ],
    inStock: true,
    releasedAt: "2025-08-01",
  },
  {
    id: "ag-016",
    slug: "ombre-honey-blonde-wig",
    name: "Ombré Honey Blonde Wig",
    subtitle: "Hand-Painted · 13x4 HD Lace",
    collections: ["wigs", "new-arrivals"],
    category: "wigs",
    price: 62500,
    badges: ["NEW", "LIMITED"],
    texture: "Loose Wave",
    origin: "Raw Vietnamese, single donor",
    capConstruction: "13x4 HD frontal, glueless cap",
    lengths: wigLengths.slice(1),
    densities,
    colours: [
      { label: "Honey Ombré", swatch: "#B07C42" },
      { label: "Caramel Ombré", swatch: "#8C5A32", delta: 0 },
      { label: "Champagne Ombré", swatch: "#D9C193", delta: 6000 },
    ],
    rating: 5,
    reviewCount: 29,
    excerpt:
      "Hand-painted in the studio over three sessions so the lift stays soft and the ends stay strong.",
    description: [
      "Blonde on raw hair is a slow process done properly. We lift in three passes across separate days, with a bond-builder between each, rather than forcing it in one sitting.",
      "The result is a gradient with no line, ends that still feel like hair, and a tone that will not turn brassy after two washes.",
    ],
    details: [
      "Hand-painted over three lifting sessions",
      "Bond-builder used throughout",
      "13x4 HD frontal, glueless cap",
      "Toned to a neutral warm blonde",
      "Limited release — six pieces per drop",
    ],
    care: [
      "Use a purple mask once a fortnight to hold the tone.",
      "Wash in cool water only.",
      "Avoid heat above 170°C on the lightened ends.",
      "Book a toner refresh with us every eight weeks.",
    ],
    images: [
      img("ombre-front", "Ombré honey blonde wig, front view", "product"),
      img("ombre-gradient", "Detail of the hand-painted colour gradient", "detail"),
      img("ombre-side", "Ombré honey blonde wig, side view", "product"),
      img("ombre-worn", "Client wearing the ombré honey blonde wig", "portrait"),
    ],
    inStock: true,
    featured: true,
    releasedAt: "2025-08-20",
  },
  {
    id: "ag-017",
    slug: "water-wave-closure-wig",
    name: "Water Wave Closure Wig",
    subtitle: "4x4 HD Lace · 100% Human Hair",
    collections: ["wigs"],
    category: "wigs",
    price: 39500,
    badges: [],
    texture: "Water Wave",
    origin: "Single-donor Vietnamese",
    capConstruction: "4x4 HD lace closure",
    lengths: wigLengths,
    densities,
    colours: naturalColours.slice(0, 4),
    rating: 4.7,
    reviewCount: 76,
    excerpt: "A loose, wet-look wave that dries soft and needs almost nothing to look finished.",
    description: [
      "Water wave sits between body wave and deep wave — enough definition to read as a curl, loose enough to brush through with fingers.",
      "It is the lowest-maintenance wave we stock, which is why it is a favourite for holidays.",
    ],
    details: [
      "4x4 HD lace closure",
      "180% density as standard",
      "Holds its pattern in humidity",
      "Pre-plucked hairline",
      "Includes wig cap and satin bag",
    ],
    care: [
      "Revive with water and a light leave-in.",
      "Never brush when dry.",
      "Air dry for the softest result.",
      "Deep condition monthly.",
    ],
    images: [
      img("water-wave-front", "Water wave closure wig, front view", "product"),
      img("water-wave-texture", "Macro study of the water wave pattern", "texture"),
      img("water-wave-worn", "Client wearing the water wave closure wig", "portrait"),
    ],
    inStock: false,
    releasedAt: "2025-04-28",
  },
  {
    id: "ag-018",
    slug: "wig-care-essentials-set",
    name: "Wig Care Essentials Set",
    subtitle: "Mask, Serum, Bonnet & Brush",
    collections: ["products", "best-sellers", "new-arrivals"],
    category: "products",
    price: 8500,
    compareAtPrice: 9800,
    badges: ["BESTSELLER"],
    texture: "Set",
    origin: "Formulated in the UK",
    lengths: [{ label: "Full set", delta: 0 }],
    densities: [{ label: "Standard", delta: 0 }],
    colours: [
      { label: "Espresso", swatch: "#33221A" },
      { label: "Champagne", swatch: "#D8C59D" },
    ],
    rating: 4.9,
    reviewCount: 88,
    excerpt: "The four things we ask every client to take home after an installation.",
    description: [
      "Restorative mask, heat serum, satin-lined bonnet and a soft-bristle wig brush — everything needed to keep an install looking new between appointments.",
      "Presented in a reusable box, which makes it the gift we sell most of in December.",
    ],
    details: [
      "Restorative Hair Mask 250ml",
      "Silk Press Heat Serum 100ml",
      "Satin-Lined Bonnet",
      "Soft-bristle wig brush",
      "Reusable presentation box",
    ],
    care: [
      "Follow the individual care notes for each product.",
      "Store the box away from direct heat.",
      "Wash the brush monthly in warm soapy water.",
      "Replace the bonnet every six to nine months.",
    ],
    images: [
      img("care-set", "Wig care essentials set in its presentation box", "product"),
      img("care-set-contents", "The four products in the care set laid out", "detail"),
    ],
    inStock: true,
    releasedAt: "2025-05-30",
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
      "Premium textures selected for quality and longevity. Single-donor bundles, closures and frontals with the cuticle intact and aligned.",
    imageSeed: "collection-hair",
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
  {
    slug: "products",
    title: "Hair Care",
    eyebrow: "Collection",
    description:
      "Aftercare formulated for wigs, extensions and natural hair — the products we use in the studio and send home with every client.",
    imageSeed: "collection-care",
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
    { value: "products", label: "Hair Care" },
  ],
  texture: Array.from(new Set(products.map((p) => p.texture))).sort(),
  length: ['10"', '12"', '14"', '16"', '18"', '20"', '22"', '24"'],
  density: ["150%", "180%", "200%", "250%"],
  colour: Array.from(
    new Set(products.flatMap((p) => p.colours.map((c) => c.label))),
  ).sort(),
  price: [
    { value: "0-20000", label: "Under £200" },
    { value: "20000-40000", label: "£200 – £400" },
    { value: "40000-60000", label: "£400 – £600" },
    { value: "60000-1000000", label: "£600 +" },
  ],
  availability: [
    { value: "in-stock", label: "In stock" },
    { value: "out-of-stock", label: "Out of stock" },
  ],
} as const;
