// design.ts
// Adeolagold Beauty Studio — Luxury Design System
//
// Single source of truth for brand tokens. The values here are mirrored into CSS
// custom properties in `src/app/globals.css` (@theme), so Tailwind utilities and
// runtime TypeScript stay in sync.

export const design = {
  brand: {
    name: "Adeolagold Beauty Studio",
    shortName: "Adeolagold",
    positioning: "Luxury Hair & Beauty",
    tagline: "The Art of Beautiful Hair",
    promise: "Beautiful hair. Exceptional quality. Luxury finishes.",
    intro:
      "Luxury wig installations and premium human hair at our Goodmayes studio. Raw and virgin human hair sourced from trusted global suppliers. UK-wide online orders available.",
    email: "hello@adeolagoldbeautystudio.info",
    /** E.164, used for tel: and wa.me links. */
    phoneE164: "+447376936291",
    /** Display form. */
    phone: "+44 7376 936 291",
    social: {
      instagram: {
        handle: "@adeolagoldbeautystudio",
        url: "https://www.instagram.com/adeolagoldbeautystudio",
      },
      tiktok: {
        handle: "@adeolagoldbeautystudio",
        url: "https://www.tiktok.com/@adeolagoldbeautystudio",
      },
      facebook: {
        handle: "AdeolagoldBeautiesStudio",
        url: "https://www.facebook.com/AdeolagoldBeautiesStudio",
      },
      youtube: {
        handle: "@Adeolagoldstyle",
        url: "https://www.youtube.com/@Adeolagoldstyle",
      },
    },
    location: {
      /**
       * The studio's address is public: it is shown in full on the site, in the
       * footer and in the PostalAddress structured data, so local search and
       * map results can find it.
       */
      street: "598 Holly Lane",
      locality: "Goodmayes",
      region: "Essex",
      postalCode: "IG3 9BF",
      country: "GB",
      areaServed: "Essex, London & UK-wide delivery",
      /** Single-line form for meta descriptions, share cards and captions. */
      oneLine: "598 Holly Lane, Goodmayes, IG3 9BF",
      /** What the public pages render as the studio address. */
      displayLines: ["598 Holly Lane", "Goodmayes", "Essex IG3 9BF"],
      note: "Appointments are booked in advance so the studio is yours for the session.",
      mapsUrl:
        "https://www.google.com/maps/search/?api=1&query=598+Holly+Lane+Goodmayes+IG3+9BF",
    },
    hours: [
      { days: "Monday — Wednesday", time: "10:00 — 19:00" },
      { days: "Thursday — Friday", time: "10:00 — 20:00" },
      { days: "Saturday", time: "09:00 — 19:00" },
      { days: "Sunday", time: "Closed" },
    ],
    /** Machine-readable opening hours for LocalBusiness structured data. */
    openingHours: [
      { days: ["Monday", "Tuesday", "Wednesday"], opens: "10:00", closes: "19:00" },
      { days: ["Thursday", "Friday"], opens: "10:00", closes: "20:00" },
      { days: ["Saturday"], opens: "09:00", closes: "19:00" },
    ],
  },

  // Black · Gold · White. Mirrored into CSS custom properties in globals.css.
  colors: {
    /** Page ground and the two raised steps above it. */
    background: "#0A0A0A",
    surface: "#121212",
    surfaceLight: "#191919",

    /** Foreground. `ink` inverts to a white block when used as a background. */
    ink: "#FAF8F3",
    inkSoft: "#C8C2B6",

    gold: "#C9A84C",
    goldLight: "#E8C97A",
    goldDark: "#9A7A30",

    white: "#FFFFFF",
    black: "#000000",

    border: "#2A2724",
    muted: "#8F8A80",

    success: "#7FAE86",
    error: "#E0796D",
  },

  typography: {
    display: {
      family: "'Cormorant Garamond', serif",
      weight: 500,
      letterSpacing: "-0.025em",
    },
    heading: {
      family: "'Cormorant Garamond', serif",
      weight: 500,
      letterSpacing: "-0.02em",
    },
    body: {
      family: "'Inter', sans-serif",
      weight: 400,
      letterSpacing: "0",
    },
    navigation: {
      family: "'Inter', sans-serif",
      weight: 500,
      letterSpacing: "0.08em",
      textTransform: "uppercase",
    },
    button: {
      family: "'Inter', sans-serif",
      weight: 500,
      letterSpacing: "0.08em",
      textTransform: "uppercase",
    },
  },

  layout: {
    maxWidth: "1440px",
    contentWidth: "1240px",
    narrowWidth: "760px",
    pagePadding: { desktop: "48px", tablet: "32px", mobile: "20px" },
    sectionSpacing: {
      desktop: "clamp(96px, 10vw, 180px)",
      tablet: "96px",
      mobile: "72px",
    },
  },

  radius: {
    none: "0",
    subtle: "2px",
    small: "4px",
    medium: "8px",
    pill: "999px",
  },

  shadows: {
    subtle: "0 8px 30px rgba(0, 0, 0, 0.45)",
    elevated: "0 24px 70px rgba(0, 0, 0, 0.60)",
  },

  transitions: {
    fast: "180ms cubic-bezier(0.22, 1, 0.36, 1)",
    standard: "350ms cubic-bezier(0.22, 1, 0.36, 1)",
    luxury: "600ms cubic-bezier(0.22, 1, 0.36, 1)",
  },

  animation: {
    fadeIn: { duration: "600ms", easing: "cubic-bezier(0.22, 1, 0.36, 1)" },
    imageReveal: { duration: "900ms", easing: "cubic-bezier(0.22, 1, 0.36, 1)" },
    hoverZoom: {
      scale: 1.035,
      duration: "800ms",
      easing: "cubic-bezier(0.22, 1, 0.36, 1)",
    },
  },

  breakpoints: {
    mobile: "480px",
    tablet: "768px",
    laptop: "1024px",
    desktop: "1280px",
    wide: "1440px",
  },

  grid: {
    products: { desktop: 4, laptop: 3, tablet: 2, mobile: 2 },
    categories: { desktop: 4, tablet: 2, mobile: 1 },
  },

  imagery: {
    heroAspectRatio: "16 / 9",
    productAspectRatio: "4 / 5",
    editorialAspectRatio: "3 / 4",
    campaignAspectRatio: "16 / 9",
    treatment: { borderRadius: "2px", objectFit: "cover", hoverScale: 1.035 },
  },

  buttons: {
    primary: {
      background: "#C9A84C",
      color: "#0A0A0A",
      hoverBackground: "#E8C97A",
      hoverColor: "#0A0A0A",
      height: "52px",
      paddingX: "28px",
    },
    secondary: {
      background: "transparent",
      color: "#FAF8F3",
      border: "1px solid #FAF8F3",
      hoverBackground: "#FAF8F3",
      hoverColor: "#0A0A0A",
      height: "52px",
      paddingX: "28px",
    },
    gold: {
      background: "#C9A84C",
      color: "#0A0A0A",
      hoverBackground: "#FAF8F3",
      hoverColor: "#0A0A0A",
      height: "52px",
      paddingX: "28px",
    },
    text: {
      background: "transparent",
      color: "#FAF8F3",
      underline: true,
      underlineOffset: "6px",
    },
  },

  navigation: {
    height: { desktop: "88px", mobile: "68px" },
    sticky: true,
    desktopItems: ["Shop", "Hair", "Wigs", "Services", "About", "Journal"],
    actions: ["Search", "Account", "Bag", "Book Appointment"],
  },

  product: {
    card: {
      imageRatio: "4 / 5",
      showSecondImageOnHover: true,
      showQuickAddOnHover: true,
      showWishlist: true,
    },
    selectors: ["Length", "Density", "Texture", "Colour"],
    badges: ["NEW", "BESTSELLER", "LIMITED"],
  },

  collections: [
    { title: "Wigs", slug: "wigs" },
    { title: "Human Hair", slug: "human-hair" },
    { title: "New Arrivals", slug: "new-arrivals" },
    { title: "Best Sellers", slug: "best-sellers" },
  ],

  accessibility: {
    focusRing: "2px solid #C9A84C",
    focusOffset: "3px",
    minTouchTarget: "44px",
    reducedMotion: true,
  },

  seo: {
    title: "Adeolagold Beauty Studio | Luxury Wigs, Human Hair & Beauty Services",
    description:
      "Luxury wig installation, wig revamps, braiding, silk press, microblading and professional makeup at Adeolagold Beauty Studio, 598 Holly Lane, Goodmayes IG3 9BF. Premium raw and virgin human hair, delivered UK-wide.",
    url: "https://www.adeolagoldbeautystudio.co.uk",
  },
} as const;

export default design;
