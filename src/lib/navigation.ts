export interface NavChild {
  label: string;
  href: string;
  description?: string;
}

export interface NavItem {
  label: string;
  href: string;
  columns?: { heading: string; links: NavChild[] }[];
  feature?: { title: string; copy: string; href: string; cta: string; seed: string };
}

export const primaryNav: NavItem[] = [
  {
    label: "Shop",
    href: "/shop",
    columns: [
      {
        heading: "Collections",
        links: [
          { label: "All Hair", href: "/shop" },
          { label: "New Arrivals", href: "/collections/new-arrivals" },
          { label: "Best Sellers", href: "/collections/best-sellers" },
          { label: "Frontals & Closures", href: "/collections/frontals-closures" },
        ],
      },
      {
        heading: "By Texture",
        links: [
          { label: "Silky Straight", href: "/shop?texture=Silky+Straight" },
          { label: "Body Wave", href: "/shop?texture=Body+Wave" },
          { label: "Wigs", href: "/collections/wigs" },
          { label: "Bundles", href: "/collections/human-hair" },
        ],
      },
    ],
    feature: {
      title: "The Adeolagold Edit",
      copy: "Selected pieces for women who know the difference.",
      href: "/collections/best-sellers",
      cta: "View the edit",
      seed: "nav-edit",
    },
  },
  {
    label: "Hair",
    href: "/collections/human-hair",
    columns: [
      {
        heading: "Human Hair",
        links: [
          { label: "All Human Hair", href: "/collections/human-hair" },
          { label: "Bundles", href: "/shop?category=human-hair" },
          {
            label: "Frontals & Closures",
            href: "/collections/frontals-closures",
          },
        ],
      },
      {
        heading: "Shop by texture",
        links: [
          { label: "Straight Bundles", href: "/products/straight-human-hair-bundles" },
          { label: "Body Wave Bundles", href: "/products/body-wave-human-hair-bundles" },
          { label: "HD Lace Frontal 13×4", href: "/products/hd-lace-frontal-13x4" },
          { label: "4×4 Lace Closure", href: "/products/4x4-lace-closure" },
        ],
      },
    ],
    feature: {
      title: "Raw and virgin, always",
      copy: "Cuticle intact and aligned. The reason our hair still behaves at wear fifty.",
      href: "/collections/human-hair",
      cta: "Shop human hair",
      seed: "nav-hair",
    },
  },
  {
    label: "Wigs",
    href: "/collections/wigs",
    columns: [
      {
        heading: "By Construction",
        links: [
          { label: "All Wigs", href: "/collections/wigs" },
          { label: "Lace Front Wigs", href: "/shop?category=wigs" },
          { label: "Glueless Wigs", href: "/products/natural-black-sleek-bob-wig" },
          { label: "Bob Styles", href: "/products/sleek-black-bob-lace-front-wig" },
        ],
      },
      {
        heading: "Popular",
        links: [
          {
            label: "Sleek Black Bob Lace Front",
            href: "/products/sleek-black-bob-lace-front-wig",
          },
          {
            label: "Natural Black Sleek Bob",
            href: "/products/natural-black-sleek-bob-wig",
          },
          {
            label: "13×6 Straight — Extra Length",
            href: "/products/13x6-straight-lace-front-extra-length",
          },
          { label: "New Arrivals", href: "/collections/new-arrivals" },
        ],
      },
    ],
    feature: {
      title: "Built in the studio",
      copy: "Every unit is cut, plucked and finished by hand before it reaches you.",
      href: "/collections/wigs",
      cta: "Shop wigs",
      seed: "nav-wigs",
    },
  },
  {
    label: "Services",
    href: "/services",
    columns: [
      {
        heading: "Hair",
        links: [
          { label: "Luxury Wig Installation", href: "/services/wig-installation" },
          { label: "Wig Revamp & Restoration", href: "/services/wig-revamping" },
          {
            label: "Frontal & Closure Installation",
            href: "/services/frontal-and-closure-installation",
          },
          { label: "Sew-In Weaves", href: "/services/sew-in-weaves" },
          { label: "Braiding", href: "/services/braiding" },
          { label: "Silk Press", href: "/services/silk-press" },
        ],
      },
      {
        heading: "Bespoke & beauty",
        links: [
          { label: "Custom Wig Making", href: "/services/custom-wig-making" },
          { label: "Hair Treatments", href: "/services/hair-treatments" },
          { label: "Microblading", href: "/services/microblading" },
          { label: "Professional Makeup", href: "/services/professional-makeup" },
          { label: "All Services", href: "/services" },
          { label: "Booking Policy", href: "/help/booking-policy" },
        ],
      },
    ],
    feature: {
      title: "Your next look starts here",
      copy: "One client at a time in a private Essex studio. Choose a service, pick a time, and we confirm within 24 hours.",
      href: "/book",
      cta: "Book an appointment",
      seed: "nav-book",
    },
  },
  { label: "About", href: "/about" },
  { label: "Journal", href: "/journal" },
];

export const footerColumns = [
  {
    heading: "Shop",
    links: [
      { label: "Wigs", href: "/collections/wigs" },
      { label: "Human Hair", href: "/collections/human-hair" },
      { label: "Frontals & Closures", href: "/collections/frontals-closures" },
      { label: "New Arrivals", href: "/collections/new-arrivals" },
      { label: "Best Sellers", href: "/collections/best-sellers" },
    ],
  },
  {
    heading: "Services",
    links: [
      { label: "Wig Installation", href: "/services/wig-installation" },
      { label: "Wig Revamp", href: "/services/wig-revamping" },
      { label: "Braiding", href: "/services/braiding" },
      { label: "Silk Press", href: "/services/silk-press" },
      { label: "Microblading", href: "/services/microblading" },
    ],
  },
  {
    heading: "About",
    links: [
      { label: "Our Story", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Journal", href: "/journal" },
      { label: "FAQs", href: "/faqs" },
    ],
  },
  {
    heading: "Help",
    links: [
      { label: "Shipping", href: "/help/shipping" },
      { label: "Returns", href: "/help/returns" },
      { label: "Hair Care", href: "/help/hair-care" },
      { label: "Booking Policy", href: "/help/booking-policy" },
    ],
  },
];
