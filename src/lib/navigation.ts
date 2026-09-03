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
          { label: "Hair Care", href: "/collections/products" },
        ],
      },
      {
        heading: "By Texture",
        links: [
          { label: "Straight", href: "/shop?texture=Bone+Straight" },
          { label: "Body Wave", href: "/shop?texture=Body+Wave" },
          { label: "Deep Wave", href: "/shop?texture=Deep+Wave" },
          { label: "Curly", href: "/shop?texture=Curly" },
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
          { label: "Closures", href: "/products/hd-lace-closure-5x5" },
          { label: "Frontals", href: "/products/hd-lace-frontal-13x4" },
        ],
      },
      {
        heading: "Bundle Deals",
        links: [
          { label: "Loose Wave Set", href: "/products/loose-wave-bundle-deal" },
          { label: "Raw Straight", href: "/products/raw-vietnamese-straight-bundles" },
          { label: "Raw Body Wave", href: "/products/raw-body-wave-bundles" },
          { label: "Raw Curly", href: "/products/raw-curly-bundles" },
        ],
      },
    ],
    feature: {
      title: "Single donor, always",
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
          { label: "Closure Wigs", href: "/shop?texture=Body+Wave" },
          { label: "Frontal Wigs", href: "/products/signature-hd-frontal-wig" },
          { label: "Short Styles", href: "/products/champagne-pixie-wig" },
        ],
      },
      {
        heading: "Popular",
        links: [
          { label: "Bone Straight Bob", href: "/products/bone-straight-bob-wig" },
          { label: "Signature HD Frontal", href: "/products/signature-hd-frontal-wig" },
          { label: "Deep Wave Frontal", href: "/products/deep-wave-frontal-wig" },
          { label: "Ombré Honey Blonde", href: "/products/ombre-honey-blonde-wig" },
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
        heading: "In the studio",
        links: [
          { label: "Wig Installation", href: "/services/wig-installation" },
          { label: "Wig Revamping", href: "/services/wig-revamping" },
          { label: "Braiding", href: "/services/braiding" },
          { label: "Sew-In", href: "/services/sew-in" },
        ],
      },
      {
        heading: "Bespoke",
        links: [
          { label: "Custom Wig Styling", href: "/services/custom-wig-styling" },
          { label: "Hair Consultation", href: "/services/hair-consultation" },
          { label: "All Services", href: "/services" },
          { label: "Booking Policy", href: "/help/booking-policy" },
        ],
      },
    ],
    feature: {
      title: "Your next look starts here",
      copy: "One client at a time. Choose a service, pick a time, confirm with a deposit.",
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
      { label: "New Arrivals", href: "/collections/new-arrivals" },
      { label: "Best Sellers", href: "/collections/best-sellers" },
    ],
  },
  {
    heading: "Services",
    links: [
      { label: "Wig Installation", href: "/services/wig-installation" },
      { label: "Revamping", href: "/services/wig-revamping" },
      { label: "Braiding", href: "/services/braiding" },
      { label: "Sew-Ins", href: "/services/sew-in" },
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
