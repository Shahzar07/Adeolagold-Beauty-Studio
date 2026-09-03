import type { Service } from "./types";

export const services: Service[] = [
  {
    slug: "wig-installation",
    title: "Wig Installation",
    summary: "A melted hairline, a cut that suits your face, and a finish that holds.",
    description:
      "Your unit is prepped, the lace tinted to your scalp and the hairline customised before anything is applied. We cut the piece on you rather than on the block, so the shape follows your features. Finished with a styled hairline and a light silk press through the length.",
    fromPrice: 8500,
    duration: "2 – 2.5 hours",
    includes: [
      "Lace tinting and hairline customisation",
      "Bespoke cut and face-framing shape",
      "Full install with a flawless melt",
      "Styling and finish of your choice",
      "Aftercare walkthrough",
    ],
    aftercare: "Complimentary hairline touch-up within 14 days.",
    depositPence: 2500,
  },
  {
    slug: "wig-revamping",
    title: "Wig Revamping",
    summary: "Restore, refresh and transform a unit you already love.",
    description:
      "Bring in a wig that has lost its shape and we will take it back to its best — deep wash, protein or moisture treatment as needed, knots re-bleached, hairline re-plucked, and a fresh cut. Most units come back looking better than the day they arrived.",
    fromPrice: 12000,
    duration: "3 – 4 hours",
    includes: [
      "Deep clean and clarifying wash",
      "Treatment matched to the hair's condition",
      "Knot bleaching and hairline re-pluck",
      "Re-cut, re-shape and restyle",
      "Optional colour refresh",
    ],
    aftercare: "Wigs are returned on a block with a satin storage bag.",
    depositPence: 4000,
  },
  {
    slug: "braiding",
    title: "Braiding",
    summary: "Protective and statement styles, braided with tension you can live with.",
    description:
      "Knotless braids, boho braids, cornrows and feed-ins. We braid without dragging the hairline — if it hurts on the day it will thin by month three. Scalp prepped and treated before we start, edges left alone.",
    fromPrice: 9500,
    duration: "4 – 7 hours",
    includes: [
      "Scalp cleanse and prep",
      "Knotless, feed-in or cornrow technique",
      "Hair included as standard",
      "Tension-conscious parting",
      "Edge and scalp treatment to finish",
    ],
    aftercare: "Scalp oil and a satin scarf included with every set.",
    depositPence: 3000,
  },
  {
    slug: "sew-in",
    title: "Sew-In",
    summary: "A flat, secure install with a natural parting and no visible tracks.",
    description:
      "Braided down, sewn in, and blended so nothing sits proud of the head. We work with closures, frontals or a leave-out depending on the look you want and the condition of your natural hair.",
    fromPrice: 11000,
    duration: "3 – 4 hours",
    includes: [
      "Wash, blow-dry and braid-down",
      "Closure, frontal or leave-out install",
      "Full blend and cut",
      "Styling and finish",
      "Mid-cycle tightening at week three",
    ],
    aftercare: "One complimentary tightening included at three weeks.",
    depositPence: 3500,
  },
  {
    slug: "custom-wig-styling",
    title: "Custom Wig Styling",
    summary: "A unit built to your measurements, your texture and your parting.",
    description:
      "We start with your head measurements and a consultation on texture, density, length and colour. The hair is sourced from a single donor, ventilated onto a cap made for you, then cut and styled before collection. Allow three to four weeks.",
    fromPrice: 45000,
    duration: "Consultation 45 mins · 3 – 4 weeks to build",
    includes: [
      "Full measurement and consultation",
      "Single-donor hair sourcing",
      "Custom cap construction",
      "Hand-ventilated hairline",
      "Cut, colour and style before collection",
    ],
    aftercare: "One free revamp within the first six months.",
    depositPence: 15000,
  },
  {
    slug: "hair-consultation",
    title: "Hair Consultation",
    summary: "Thirty minutes to work out exactly what your hair needs.",
    description:
      "For anyone unsure where to start. We assess the condition of your natural hair and hairline, talk through textures, lengths and densities, and put together a plan and a realistic budget. The fee is redeemed against your first service.",
    fromPrice: 2500,
    duration: "30 minutes",
    includes: [
      "Hair and hairline assessment",
      "Texture and density guidance",
      "Colour and length planning",
      "Written recommendation and quote",
      "Fee redeemed against your first booking",
    ],
    aftercare: "Available in-studio or by video call.",
    depositPence: 2500,
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
