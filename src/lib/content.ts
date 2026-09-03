import type { Testimonial } from "./types";

/** The studio's own published client reviews. */
export const testimonials: Testimonial[] = [
  {
    quote:
      "Honestly the best experience I've ever had at a salon. My wig installation looked completely natural — I keep getting asked if it's my real hair! The attention to detail is unreal. I won't be going anywhere else.",
    name: "Chinara A.",
    detail: "Luxury Wig Installation · London",
  },
  {
    quote:
      "I brought in a wig I thought was completely ruined and it came back looking brand new. I was speechless. The restoration was incredible and the turnaround was really quick too.",
    name: "Sade O.",
    detail: "Wig Revamp & Restoration · Manchester",
  },
  {
    quote:
      "My braids are so neat, even and absolutely gorgeous. They've lasted so long too and my natural hair feels healthy underneath. The whole experience was so relaxed and comfortable.",
    name: "Kemi W.",
    detail: "Knotless Box Braids · Nottingham",
  },
  {
    quote:
      "Bought hair bundles here and the quality is exceptional. So soft, thick from roots to ends and absolutely zero shedding or tangling. Worth every single penny. I'll never buy hair from anywhere else.",
    name: "Amara S.",
    detail: "Human Hair Purchase · London",
  },
  {
    quote:
      "The best silk press I have EVER had. My 4C hair was bone straight, incredibly shiny and still healthy. No heat damage, no dryness — just pure, gorgeous hair.",
    name: "Adaeze R.",
    detail: "Silk Press · Leicester",
  },
  {
    quote:
      "I've been wanting to get microblading done for years and I'm so glad I chose here. My brows look completely natural — people think they're real! The process was comfortable and the results are stunning.",
    name: "Blessing N.",
    detail: "Microblading · Sheffield",
  },
  {
    quote:
      "I've had frontals done at so many places and none of them compare. My hairline looked completely seamless, the lace was perfectly melted and I felt like a whole new woman.",
    name: "Toyin B.",
    detail: "Frontal Installation · Birmingham",
  },
  {
    quote:
      "Had my makeup done here for my birthday and I have never felt so beautiful in my life. She listened to exactly what I wanted, enhanced my features and made me glow.",
    name: "Funmi E.",
    detail: "Professional Makeup · Leeds",
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
    copy: "Raw and virgin human hair from trusted suppliers worldwide, cuticle intact and aligned. Every bundle and every unit is inspected in the studio before it is offered for sale.",
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
    copy: "Luxury lace front wigs, finished by hand in the studio.",
    href: "/collections/wigs",
    imageSeed: "tile-wigs",
  },
  {
    slug: "human-hair",
    title: "Human Hair",
    copy: "Raw and virgin bundles, selected for quality and longevity.",
    href: "/collections/human-hair",
    imageSeed: "tile-hair",
  },
  {
    slug: "frontals-closures",
    title: "Frontals & Closures",
    copy: "HD and Swiss lace, pre-plucked with bleached knots.",
    href: "/collections/frontals-closures",
    imageSeed: "tile-lace",
  },
  {
    slug: "wig-installation",
    title: "Wig Installation",
    copy: "A flawless, undetectable install in HD lace.",
    href: "/services/wig-installation",
    imageSeed: "tile-install",
  },
  {
    slug: "wig-revamp",
    title: "Wig Revamp",
    copy: "Restore, refresh and transform your favourite wig.",
    href: "/services/wig-revamping",
    imageSeed: "tile-revamp",
  },
  {
    slug: "braiding",
    title: "Braiding",
    copy: "Protective and statement styles, braided without tension.",
    href: "/services/braiding",
    imageSeed: "tile-braids",
  },
];

export const instagramPosts = [
  { seed: "ig-01", alt: "Client having a long install blow-dried in the studio", caption: "Body wave, 22 inches" },
  { seed: "ig-02", alt: "Sleek ponytail in profile, hairline laid flat", caption: "The hairline is the whole job" },
  { seed: "ig-03", alt: "Boho braids being fitted, photographed from behind", caption: "Knotless, no tension" },
  { seed: "ig-04", alt: "Client in a long straight install against a gold backdrop", caption: "Three sessions to get here" },
  { seed: "ig-05", alt: "Close-up of a finished set of braids", caption: "Raw body wave, cuticle intact" },
  { seed: "ig-06", alt: "Wigs and bundles on display in the studio", caption: "The studio, Tuesday morning" },
  { seed: "ig-07", alt: "A blunt bob checked dry after cutting", caption: "Blunt bob, checked dry" },
  { seed: "ig-08", alt: "Client smiling after a braiding appointment", caption: "This is the bit we do it for" },
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
        q: "What type of hair do you use?",
        a: "We specialise in sourcing the finest raw and virgin human hair from trusted suppliers worldwide. Every piece is hand-selected for its natural beauty, quality and longevity, with the cuticle intact and aligned — which is why it does not tangle at the root and still behaves like hair after fifty washes. We offer an extensive range of textures, from straight and wavy to curly and coily, in multiple lengths and custom options.",
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
        q: "How do I book an appointment?",
        a: "Book directly through the Book Appointment page, call the studio on +44 7376 936 291, or send a message via the contact form. We confirm within 24 hours with your quote and the deposit that secures the slot.",
      },
      {
        q: "How does the studio work — do I visit you?",
        a: "Yes. All appointments take place at our private studio in Dagenham, Essex, where you receive a completely personalised, one-to-one experience in a comfortable and discreet setting. We are appointment-only, so every client has our full, undivided attention. The full address is shared once your appointment is confirmed.",
      },
      {
        q: "How much does a service cost?",
        a: "Every service is quoted at consultation, because the price depends on your hair, the unit and the finish you want. Tell us what you are after on the booking form or by message and we will come back with a quote and a realistic time estimate.",
      },
      {
        q: "Is a deposit required?",
        a: "Yes. A deposit secures the slot and is deducted from your final balance. The amount is confirmed with your booking and is non-refundable inside 48 hours of the appointment.",
      },
      {
        q: "How long does a wig installation take?",
        a: "A standard wig installation typically takes 1.5–2.5 hours depending on the style and the preparation required. Custom installs with colouring or cutting take longer, and we will advise you at the time of booking.",
      },
      {
        q: "What if I need to reschedule?",
        a: "Reschedule free of charge with more than 48 hours' notice, using the link in your confirmation email. Inside 48 hours the deposit is retained, though we will always try to help where we can.",
      },
      {
        q: "Can I send my own wig to be installed or revamped?",
        a: "Absolutely. We accept client-supplied wigs for installation, revamping, styling and customisation. Please contact us first so we can advise on the best service for your wig. Installation is priced the same whether the unit came from us or not.",
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
          "If something arrives damaged or is not as described, email hello@adeolagoldbeautystudio.info within 48 hours with photographs.",
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
          "All appointments require a deposit. The amount is confirmed with your quote when we accept the booking, and scales with the length of the service.",
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
