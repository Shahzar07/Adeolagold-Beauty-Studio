import type { Service } from "./types";

/**
 * The studio's published service list. Prices are deliberately absent: the
 * studio quotes at consultation because every service is scoped to the client's
 * hair, the unit and the finish. Anything shown as a price on this site would be
 * invented, so the UI asks for a consultation instead.
 */
export const services: Service[] = [
  {
    slug: "wig-installation",
    title: "Luxury Wig Installation",
    summary: "A melted hairline, a cut that suits your face, and a finish that holds.",
    description:
      "The signature service — a flawless, undetectable install using HD lace techniques. Your unit is prepped, the lace tinted to your scalp and the hairline customised before anything is applied. We cut the piece on you rather than on the block, so the shape follows your features. Perfect for everyday wear, an occasion, or simply when you want to feel your best.",
    duration: "1.5 – 2.5 hours",
    includes: [
      "Lace tinting and hairline customisation",
      "Bespoke cut and face-framing shape",
      "Full install with a flawless melt",
      "Styling and finish of your choice",
      "Aftercare walkthrough",
    ],
    aftercare: "Complimentary hairline touch-up within 14 days.",
  },
  {
    slug: "wig-revamping",
    title: "Wig Revamp & Restoration",
    summary: "Restore, refresh and transform a unit you already love.",
    description:
      "Don't throw away an old wig — let us bring it back to life. Deep cleansing, conditioning and detangling, a treatment matched to the hair's condition, knots re-bleached, the hairline re-plucked, lace repaired where it needs it, and a fresh cut and restyle. Most units come back looking salon-fresh.",
    duration: "3 – 4 hours",
    includes: [
      "Deep clean and clarifying wash",
      "Treatment matched to the hair's condition",
      "Knot bleaching and hairline re-pluck",
      "Lace repair where needed",
      "Re-cut, re-shape and restyle",
    ],
    aftercare: "Wigs are returned on a block with a satin storage bag.",
  },
  {
    slug: "frontal-and-closure-installation",
    title: "Frontal & Closure Installation",
    summary: "A seamless hairline in HD and transparent lace, melted and styled.",
    description:
      "For the most undetectable result we work only in HD and transparent lace. Your frontal or closure is bleached, plucked and tinted to your scalp, then installed, melted and styled. Includes full customisation so the parting sits where you want it and the hairline reads as your own.",
    duration: "2 – 3 hours",
    includes: [
      "HD or transparent lace only",
      "Knot bleaching, plucking and tinting",
      "Full melt and secure hold",
      "Parting set to your preference",
      "Cut, style and finish",
    ],
    aftercare: "Adhesive removal guidance and a take-home aftercare card.",
  },
  {
    slug: "sew-in-weaves",
    title: "Sew-In Weaves",
    summary: "A flat, secure install with a natural parting and no visible tracks.",
    description:
      "Protective, long-lasting and beautifully blended sew-in extensions. Braided down, sewn in, and blended so nothing sits proud of the head. Whether you want volume, length or a natural finish, we work with closures, frontals or a leave-out depending on the look and the condition of your natural hair.",
    duration: "3 – 4 hours",
    includes: [
      "Wash, blow-dry and braid-down",
      "Closure, frontal or leave-out install",
      "Full blend and cut",
      "Styling and finish",
      "Mid-cycle tightening at week three",
    ],
    aftercare: "One complimentary tightening included at three weeks.",
  },
  {
    slug: "braiding",
    title: "Braiding",
    summary: "Protective and statement styles, braided with tension you can live with.",
    description:
      "Knotless box braids, Senegalese twists, cornrows, locs and fulani braids. We braid without dragging the hairline — if it hurts on the day it will thin by month three. Scalp prepped and treated before we start, edges left alone, and the finish neat enough to last.",
    duration: "4 – 7 hours",
    includes: [
      "Scalp cleanse and prep",
      "Knotless, feed-in or cornrow technique",
      "Hair included as standard",
      "Tension-conscious parting",
      "Edge and scalp treatment to finish",
    ],
    aftercare: "Scalp oil and a satin scarf included with every set.",
  },
  {
    slug: "silk-press",
    title: "Silk Press",
    summary: "Bone-straight, high-shine and heat-damage-free.",
    description:
      "Our signature silk press uses professional-grade tools and nourishing heat protectants to deliver an incredibly smooth, glossy finish that lasts — without compromising the health of your hair. Suitable for every texture, including 4C, and always preceded by a condition assessment.",
    duration: "2 – 2.5 hours",
    includes: [
      "Clarifying wash and deep condition",
      "Heat protectant and bond care",
      "Precision blow-dry and press",
      "Optional dusting or trim",
      "Wrap and maintenance guidance",
    ],
    aftercare: "Advice on holding the press through week two.",
  },
  {
    slug: "custom-wig-making",
    title: "Custom Wig Making",
    summary: "A unit built to your measurements, your texture and your parting.",
    description:
      "We craft bespoke wigs to your exact specifications — colour, texture, density, length and cap style. Starting from your head measurements and a consultation, the hair is sourced from trusted suppliers, built onto a cap made for you, then cut and styled before collection. Allow three to four weeks.",
    duration: "Consultation 45 mins · 3 – 4 weeks to build",
    includes: [
      "Full measurement and consultation",
      "Raw or virgin hair sourcing",
      "Custom cap construction",
      "Hand-ventilated hairline",
      "Cut, colour and style before collection",
    ],
    aftercare: "One free revamp within the first six months.",
  },
  {
    slug: "hair-treatments",
    title: "Hair Treatments",
    summary: "Targeted repair for damage, breakage, dryness and scalp concerns.",
    description:
      "Keratin treatments, protein masks, deep conditioning and scalp therapy, prescribed after we look at your hair rather than before. Often the right first step before an install or a press — restoring condition first means the finish holds and the hair underneath keeps growing.",
    duration: "1 – 2 hours",
    includes: [
      "Condition and scalp assessment",
      "Protein or moisture treatment as needed",
      "Scalp massage and therapy",
      "Steam or heat processing",
      "A written home-care plan",
    ],
    aftercare: "Product recommendations you can buy anywhere, not just here.",
  },
  {
    slug: "microblading",
    title: "Microblading",
    summary: "Semi-permanent brows in fine, natural hair strokes.",
    description:
      "Wake up with brows already done. Our semi-permanent microblading creates fine, hair-stroke markings that mimic natural brow hairs, filling sparse areas and reshaping the brow for a defined, natural finish. Includes a patch test, a mapped shape agreed before we start, and a top-up appointment.",
    duration: "2 – 2.5 hours · patch test 48 hours prior",
    includes: [
      "Patch test and consultation",
      "Brow mapping to your bone structure",
      "Pigment matched to your hair and skin",
      "Hair-stroke application",
      "Six-week top-up appointment",
    ],
    aftercare: "Aftercare balm and a healing schedule provided.",
  },
  {
    slug: "brow-shaping",
    title: "Brow Shaping",
    summary: "Threading, waxing and tinting, shaped to your bone structure.",
    description:
      "Precision shaping tailored to your natural bone structure and the look you want. A combination of threading, waxing and tinting creates beautifully defined, symmetrical brows — a standalone appointment, or the finishing touch after a hair service.",
    duration: "30 – 45 minutes",
    includes: [
      "Shape consultation and mapping",
      "Threading and waxing",
      "Optional tint",
      "Trim and set",
      "Regrowth and maintenance advice",
    ],
  },
  {
    slug: "professional-makeup",
    title: "Professional Makeup",
    summary: "Long-wear looks for weddings, occasions and photography.",
    description:
      "Whether it's a wedding, a party, a photoshoot or a birthday, we create flawless, long-lasting looks that photograph beautifully. We work with premium, skin-kind products across every skin tone, and always start from what you actually want to look like rather than what is trending.",
    duration: "1 – 1.5 hours",
    includes: [
      "Skin prep and priming",
      "Full face or soft glam as briefed",
      "Lashes included",
      "Photography-tested finish",
      "Touch-up notes for the day",
    ],
    aftercare: "Bridal parties and on-location bookings available on request.",
  },
  {
    slug: "hair-consultation",
    title: "Hair Consultation",
    summary: "Thirty minutes to work out exactly what your hair needs.",
    description:
      "For anyone unsure where to start. We assess the condition of your natural hair and hairline, talk through textures, lengths and densities, and put together a plan and a realistic budget. Available in-studio or by video call, and the fee is redeemed against your first service.",
    duration: "30 minutes",
    includes: [
      "Hair and hairline assessment",
      "Texture and density guidance",
      "Colour and length planning",
      "Written recommendation and quote",
      "Fee redeemed against your first booking",
    ],
    aftercare: "Available in-studio or by video call.",
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
