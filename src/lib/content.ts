import type { Testimonial } from "./types";

export const testimonials: Testimonial[] = [
  {
    quote:
      "From the consultation to the final finish, everything felt so personal. The quality of the hair was incredible — six months on it still looks like the day I left the studio.",
    name: "Amara O.",
    detail: "Signature HD Frontal · Wig Installation",
  },
  {
    quote:
      "I brought in a wig I was ready to throw away. She rebuilt the hairline, re-cut it, and I genuinely could not tell it was the same unit.",
    name: "Chidinma E.",
    detail: "Wig Revamping",
  },
  {
    quote:
      "The first braider who has never made my scalp hurt. Four weeks in and my edges are exactly where I left them.",
    name: "Simi A.",
    detail: "Knotless Braids",
  },
  {
    quote:
      "I have bought bundles from a lot of places. This is the only hair I have owned that looks better after washing than before.",
    name: "Folake B.",
    detail: "Raw Vietnamese Straight Bundles",
  },
  {
    quote:
      "She talked me out of the density I asked for and into the one I needed. That honesty is why I keep coming back.",
    name: "Rachel M.",
    detail: "Custom Wig Styling",
  },
];

export interface Pillar {
  number: string;
  title: string;
  copy: string;
}

export const pillars: Pillar[] = [
  {
    number: "01",
    title: "Premium Quality",
    copy: "Single-donor hair, cuticle intact and aligned. Every bundle and every unit is inspected in the studio before it is offered for sale.",
  },
  {
    number: "02",
    title: "Attention to Detail",
    copy: "Hairlines customised by hand, knots bleached individually, and every cut made on the client rather than on the block.",
  },
  {
    number: "03",
    title: "Personal Service",
    copy: "One client at a time, a consultation before every service, and honest advice — including when the answer is to spend less.",
  },
  {
    number: "04",
    title: "Lasting Beauty",
    copy: "Installations built to hold, aftercare that works, and a revamp service that keeps a good unit going for years, not months.",
  },
];

export interface CategoryTile {
  slug: string;
  title: string;
  copy: string;
  href: string;
  imageSeed: string;
}

export const categoryTiles: CategoryTile[] = [
  {
    slug: "wigs",
    title: "Wigs",
    copy: "Luxury wigs crafted for effortless confidence.",
    href: "/collections/wigs",
    imageSeed: "tile-wigs",
  },
  {
    slug: "human-hair",
    title: "Human Hair",
    copy: "Premium textures selected for quality and longevity.",
    href: "/collections/human-hair",
    imageSeed: "tile-hair",
  },
  {
    slug: "wig-revamp",
    title: "Wig Revamp",
    copy: "Restore, refresh and transform your favourite wig.",
    href: "/services/wig-revamping",
    imageSeed: "tile-revamp",
  },
  {
    slug: "braids-sew-ins",
    title: "Braids & Sew-Ins",
    copy: "Beautiful protective and statement styles.",
    href: "/services/braiding",
    imageSeed: "tile-braids",
  },
];

export const instagramPosts = [
  { seed: "ig-01", alt: "Client wearing a body wave install, studio portrait", caption: "Body wave, 22 inches" },
  { seed: "ig-02", alt: "Close-up of a melted HD lace hairline", caption: "The hairline is the whole job" },
  { seed: "ig-03", alt: "Knotless braids photographed from behind", caption: "Knotless, no tension" },
  { seed: "ig-04", alt: "Champagne blonde wig on a studio block", caption: "Three sessions to get here" },
  { seed: "ig-05", alt: "Macro texture study of raw curly hair", caption: "Raw curly, straight off the donor" },
  { seed: "ig-06", alt: "Studio interior with wigs on display shelves", caption: "The studio, Tuesday morning" },
  { seed: "ig-07", alt: "Bone straight bob styled on a client", caption: "Blunt bob, checked dry" },
  { seed: "ig-08", alt: "Client laughing after a sew-in appointment", caption: "This is the bit we do it for" },
];

export interface FaqGroup {
  title: string;
  items: { q: string; a: string }[];
}

export const faqGroups: FaqGroup[] = [
  {
    title: "Ordering & Hair",
    items: [
      {
        q: "What does single-donor hair actually mean?",
        a: "Every strand in the bundle came from one person, and the cuticles all run in the same direction. That is why it does not tangle at the root, and why it still behaves like hair after fifty washes. Mixed-donor hair has to be acid-stripped to stop it matting, which is what makes it feel coated when new and lifeless later.",
      },
      {
        q: "How many bundles do I need?",
        a: "Two bundles up to 16 inches, three up to 20 inches, and four for 22 inches and above. Add a closure or frontal if you want a parting. If you are unsure, send us a message before ordering — we would rather you bought the right amount than the most.",
      },
      {
        q: "Can I colour the hair myself?",
        a: "Our raw hair lifts to a level 9 safely in professional hands. We strongly recommend having it done by a colourist, in more than one session, with a bond builder. Colour damage is not covered by our returns policy.",
      },
      {
        q: "Which density should I choose?",
        a: "150% reads most natural on the majority of people, 180% is our studio default and photographs beautifully, and 200% suits lengths of 22 inches and above. If you are between two, take the lower one — we can remove density in the studio but we cannot add it.",
      },
    ],
  },
  {
    title: "Shipping & Returns",
    items: [
      {
        q: "How quickly will my order arrive?",
        a: "UK orders placed before 2pm on a working day are dispatched the same day. Standard delivery is 2–3 working days and is free over £150. Next-day delivery is £8.95. International shipping is calculated at checkout and typically takes 5–9 working days.",
      },
      {
        q: "What is your returns policy?",
        a: "Unopened, unworn hair in its original packaging with the security seal intact can be returned within 14 days for a full refund. Once a bundle is opened, a wig is worn or a unit is customised, it cannot be returned for hygiene reasons. Faulty items are replaced or refunded in full.",
      },
      {
        q: "Do you ship internationally?",
        a: "Yes — worldwide. Duties and import taxes are the responsibility of the recipient and are not included in the checkout total.",
      },
    ],
  },
  {
    title: "Appointments",
    items: [
      {
        q: "How do I book?",
        a: "Choose your service on the booking page, pick a date and time, and confirm with a deposit. You will receive a confirmation by email immediately and a reminder 48 hours before.",
      },
      {
        q: "Is a deposit required?",
        a: "Yes. Deposits start at £25 and are deducted from your final balance. They secure the slot and are non-refundable inside 48 hours of the appointment.",
      },
      {
        q: "What if I need to reschedule?",
        a: "Reschedule free of charge with more than 48 hours' notice, using the link in your confirmation email. Inside 48 hours the deposit is retained, though we will always try to help where we can.",
      },
      {
        q: "Can I bring my own unit?",
        a: "Absolutely. Installation is priced the same whether the unit came from us or not. If you would like it prepped, plucked or coloured first, add a revamp to your booking.",
      },
    ],
  },
];

export interface HelpPage {
  slug: string;
  title: string;
  eyebrow: string;
  intro: string;
  sections: { heading: string; body: string[] }[];
}

export const helpPages: HelpPage[] = [
  {
    slug: "shipping",
    title: "Shipping",
    eyebrow: "Help",
    intro:
      "Everything leaves the studio hand-checked and boxed. Here is what to expect once it does.",
    sections: [
      {
        heading: "United Kingdom",
        body: [
          "Standard delivery — 2 to 3 working days. Free on orders over £150, otherwise £4.95.",
          "Next-day delivery — £8.95, ordered before 2pm on a working day.",
          "Studio collection — free, available Tuesday to Saturday by arrangement.",
        ],
      },
      {
        heading: "International",
        body: [
          "Europe — 5 to 7 working days, tracked and signed.",
          "Rest of world — 7 to 9 working days, tracked and signed.",
          "Duties and import taxes are payable by the recipient and are not collected at checkout.",
        ],
      },
      {
        heading: "Tracking",
        body: [
          "A tracking number is emailed the moment your parcel is collected by the courier.",
          "Custom units are dispatched once complete — you will receive a build update at the halfway point.",
        ],
      },
    ],
  },
  {
    slug: "returns",
    title: "Returns",
    eyebrow: "Help",
    intro:
      "Hair is a hygiene product, so our policy is precise. It is also fair — a faulty item is always our problem, never yours.",
    sections: [
      {
        heading: "What can be returned",
        body: [
          "Unopened bundles, closures and frontals with the security seal intact, within 14 days of delivery.",
          "Unworn wigs in their original packaging, with tags attached and the lace untinted and uncut.",
          "Sealed hair care products.",
        ],
      },
      {
        heading: "What cannot be returned",
        body: [
          "Anything opened, worn, washed, cut, coloured or customised.",
          "Custom-built units, which are made to your measurements.",
          "Appointment deposits inside 48 hours of the booking.",
        ],
      },
      {
        heading: "Faulty items",
        body: [
          "If something arrives damaged or is not as described, email studio@adeolagold.com within 48 hours with photographs.",
          "We will replace it or refund you in full, including return postage. No restocking fee, ever.",
        ],
      },
    ],
  },
  {
    slug: "hair-care",
    title: "Hair Care",
    eyebrow: "Help",
    intro:
      "The routine we give every client at the end of an appointment, written down so you do not have to remember it.",
    sections: [
      {
        heading: "Washing",
        body: [
          "Wash every 8 to 10 wears with a sulphate-free shampoo, working in a downward stroke.",
          "Detangle completely before the hair gets wet — wet knots tighten.",
          "Condition from mid-length to ends only, keeping product away from lace and knots.",
          "Rinse in cool water to close the cuticle.",
        ],
      },
      {
        heading: "Drying and styling",
        body: [
          "Air dry on a canvas block wherever possible; it protects the shape of the cap.",
          "Keep heat below 180°C and always use a thermal protectant.",
          "Detangle from the ends upward with a wide-tooth comb, never from the root down.",
        ],
      },
      {
        heading: "Storage",
        body: [
          "Store on a mannequin head or in a satin bag — never folded in a drawer.",
          "Sleep in a satin bonnet, or with a satin pillowcase at minimum.",
          "Rotate between two units where you can. Rest is the cheapest longevity treatment there is.",
        ],
      },
      {
        heading: "Professional maintenance",
        body: [
          "Book a revamp every 10 to 12 weeks to keep the hairline and cut sharp.",
          "Deep condition weekly with a mask, from mid-length to ends.",
        ],
      },
    ],
  },
  {
    slug: "booking-policy",
    title: "Booking Policy",
    eyebrow: "Help",
    intro:
      "We see one client at a time, so a missed appointment is a slot nobody else could take. These terms keep that fair for everyone.",
    sections: [
      {
        heading: "Deposits",
        body: [
          "All appointments require a deposit, starting at £25 and rising for longer services.",
          "Deposits are deducted from your final balance on the day.",
          "Deposits are transferable once, with more than 48 hours' notice.",
        ],
      },
      {
        heading: "Cancellations and rescheduling",
        body: [
          "Reschedule free of charge with more than 48 hours' notice.",
          "Inside 48 hours, the deposit is retained.",
          "No-shows are asked for full prepayment on any future booking.",
        ],
      },
      {
        heading: "On the day",
        body: [
          "Arrive with clean, product-free hair unless your service includes a wash.",
          "A 15-minute grace period applies; beyond that we may need to shorten or reschedule the service.",
          "The studio is a calm space — we ask that additional guests and children are kept to a minimum.",
        ],
      },
      {
        heading: "Aftercare",
        body: [
          "Every installation includes a complimentary hairline touch-up within 14 days.",
          "Every sew-in includes one free tightening at three weeks.",
          "Custom units include one free revamp within the first six months.",
        ],
      },
    ],
  },
];

export function getHelpPage(slug: string): HelpPage | undefined {
  return helpPages.find((p) => p.slug === slug);
}
