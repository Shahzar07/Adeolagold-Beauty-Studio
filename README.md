# Adeolagold Beauty Studio

A premium, production-ready storefront for **Adeolagold Beauty Studio** — luxury wigs,
single-donor human hair, and professional beauty services.

Built to the brief in `MASTER WEBSITE PROMPT — ADEOLAGOLD BEAUTY STUDIO` and the token
system in `design.ts`.

**Stack:** Next.js 16 (App Router) · React 19 · TypeScript (strict) · Tailwind CSS v4

---

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm start          # serve the production build
npm run lint       # eslint (flat config)
npm run typecheck  # tsc --noEmit
```

All three of `build`, `lint` and `typecheck` are currently clean.

---

## Design system

`src/lib/design.ts` is the single source of truth for brand tokens. The same values are
mirrored into CSS custom properties in `src/app/globals.css` under `@theme`, which is how
Tailwind generates the utilities (`bg-background`, `text-ink`, `font-display`, `ease-lux`, …).

The scheme is **black, gold and white**, matching adeolagoldbeautystudio.co.uk.

| Token | Value |
| --- | --- |
| background / surface / surface-light | `#0A0A0A` / `#121212` / `#191919` |
| ink / ink-soft | `#FAF8F3` / `#C8C2B6` |
| gold / gold-light / gold-dark | `#C9A84C` / `#E8C97A` / `#9A7A30` |
| white / black | `#FFFFFF` / `#000000` |
| line / muted | `#2A2724` / `#8F8A80` |
| Display type | Cormorant Garamond (`next/font`) |
| Body / UI type | Inter (`next/font`) |
| Motion | 180 / 350 / 600 / 900 ms on `cubic-bezier(0.22, 1, 0.36, 1)` |

`ink` is the **foreground**: white type on the black ground. It also inverts — a block with
`bg-ink` is white, so pair it with `text-background`, never `text-white`. Gold is the single
accent: the primary button, the announcement bar, selected chips, rules and focus rings.

Two Tailwind ordering traps worth knowing, because both bite silently: `hidden` loses to the
Button base's `inline-flex` (they are plain utilities, so stylesheet order decides), so use
`max-xl:hidden` rather than `hidden xl:inline-flex`; and a colour defined only inside a media
query has no base value to fall back to.

Breakpoints are overridden to match the brief: `xs` 480 · `sm` 640 · `md` 768 · `lg` 1024 ·
`xl` 1280 · `2xl` 1440.

---

## Imagery — important

The site ships with a **generative editorial imagery system** rather than stock photography.
`src/components/media/EditorialImage.tsx` paints a deterministic, brand-toned composition for
each image slot (seeded per `seed` string, so it is stable across server and client renders).

It is painted entirely with CSS gradients plus a small inline SVG for the strand curves —
no `url(#…)` references — so the same seed can appear many times on a page (thumbnail rail,
mobile carousel, main view) without SVG id collisions.

Six tones tune the palette, strand density, key light and vignette:
`portrait` · `campaign` · `studio` · `product` · `texture` · `detail`.

### Swapping in real photography

Every image slot already accepts a real file. Two ways:

1. **Per product** — add `src` to the image entry in `src/lib/catalog.ts`:
   ```ts
   img("body-wave-front", "Body wave closure wig, front view", "product")
   // becomes
   { seed: "body-wave-front", alt: "…", tone: "product", src: "/images/body-wave-front.jpg" }
   ```
2. **Anywhere else** — pass `src` to `<EditorialImage src="/images/hero.jpg" … />`.

When `src` is present the component renders an optimised `next/image` with `fill` and the
`sizes` already declared at each call site. Drop files into `/public/images/`. For a remote
CDN (Shopify Files, Cloudinary), add the host to `images.remotePatterns` in `next.config.ts`.

---

## Routes

| Route | Notes |
| --- | --- |
| `/` | Hero, brand statement, categories, The Adeolagold Edit, campaign, services, about, four pillars, testimonials, journal, Instagram |
| `/shop` | Full collection · filter drawer, sort, active-filter chips, empty state. Accepts `?texture=` / `?category=` deep links |
| `/collections/[slug]` | `wigs`, `human-hair`, `new-arrivals`, `best-sellers`, `products` |
| `/products/[slug]` | 18 products · gallery (desktop rail / mobile swipe), length + density + colour selectors, sticky info column, accordion, sticky mobile add-to-cart, related |
| `/services` + `/services/[slug]` | 6 services as editorial expanding rows, not cards |
| `/book` | 5-step flow: service → date → time → details → confirmation, with deposit summary |
| `/about` | Story, timeline, founder imagery, standards, visit |
| `/journal` + `/journal/[slug]` | 6 long-form articles, magazine layout |
| `/cart`, `/checkout` | Full bag page; checkout with delivery methods, discount codes, payment selection, order confirmation |
| `/search` | Products, services and journal results |
| `/contact`, `/faqs`, `/help/[slug]` | `shipping`, `returns`, `hair-care`, `booking-policy` |
| `/account`, `/wishlist` | Passwordless sign-in shell; device-local wishlist |
| `/sitemap.xml`, `/robots.txt`, `/opengraph-image`, `/icon`, `/apple-icon` | Generated |

---

## Architecture

```
src/
  app/                 routes, loading / error / not-found states, sitemap, robots, OG image
  components/
    layout/            Header, MegaMenu, MobileMenu, SearchDrawer, Footer, Newsletter,
                       AnnouncementBar, StickyMobileCTA, Logo
    commerce/          ProductCard, ProductGrid, CollectionView, CollectionHeader,
                       FilterDrawer, SortDropdown, ProductGallery, ProductInfo, CartDrawer
    home/              Hero, BrandStatement, CategoryTiles, FeaturedCollection,
                       CampaignBanner, ServicesPreview, AboutPreview, WhySection,
                       Testimonials, JournalPreview, InstagramGrid
    services/          ServiceRows
    booking/           BookingForm
    journal/           JournalCard
    media/             EditorialImage, ImageFrame
    ui/                Button, Accordion, Drawer, Reveal, SectionHeading, Breadcrumbs,
                       Rating, QuantityStepper, Badge, Icons, JsonLd
  context/             ToastProvider, CartProvider, WishlistProvider, Providers
  lib/                 design, catalog, services, journal, content, navigation,
                       types, format, seo, schema, store, hooks
```

### State

Cart and wishlist persist to `localStorage` through a small external store
(`src/lib/store.ts`) read with `useSyncExternalStore`. This keeps the server render and the
hydration render in agreement, avoids `setState`-in-effect, and gives cross-tab sync for free.
`hydrated` flags drive skeletons so nothing flashes.

### Motion

`Reveal` uses an `IntersectionObserver` and sets a data attribute directly on the node — no
re-render. Every animation sits in the 150–900 ms range on the brand easing curve, and the
whole system is disabled under `prefers-reduced-motion`.

### SEO

Per-page metadata via `pageMeta()`, canonical URLs, Open Graph + Twitter cards, and JSON-LD
for `HealthAndBeautyBusiness`, `WebSite` + `SearchAction`, `Product`, `Service`, `Article`,
`BreadcrumbList` and `FAQPage`. Utility routes are `noindex` and disallowed in `robots.txt`.

### Accessibility

Semantic landmarks, skip link, keyboard-navigable menus, focus-trapped drawers with focus
restore, `aria-expanded` / `aria-current` / `aria-live`, 44px minimum touch targets, visible
gold focus rings, and reduced-motion support.

---

## Payments — business account and merchants

`src/lib/payments.ts` holds everything the checkout needs to take money, so connecting a
merchant is a matter of environment variables rather than component edits. Copy
`.env.example` to `.env.local` and fill in what you have.

### Bank transfer (live, needs no setup)

Always offered at checkout. The studio account details are in `businessAccount`:

| Field | Value |
| --- | --- |
| Account name | Adeola Adeoye trading as Adeolagold Beauty Studio |
| Bank | Monzo Bank |
| Account number | `50501927` |
| Sort code | `04-00-05` |
| IBAN | `GB50 MONZ 0400 0550 5019 27` |

Selecting it opens `BankTransferPanel`, which shows every field with a one-tap copy button,
the amount due, a per-basket payment reference (`SURNAME AG…`, derived from the basket so it
is stable across renders), and a **payment screenshot upload** — drag-and-drop or click, with
an image preview, type and size validation (PNG / JPG / WEBP / HEIC / PDF, up to 8 MB), and
replace and remove controls. The reference is what lets the studio match a transfer to a
basket without asking.

### Card, wallets and Klarna

Card, Apple Pay, Google Pay and Klarna ride on Stripe; PayPal is separate. Each method only
appears at checkout once its publishable identifier is present, so the site never offers a
button that cannot complete:

```bash
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_…   # Stripe → Developers → API keys
NEXT_PUBLIC_PAYPAL_CLIENT_ID=…                 # developer.paypal.com → Live app
```

Secrets (`STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `PAYPAL_CLIENT_SECRET`) stay
server-side and are deliberately not read by `payments.ts`. The remaining work is the server
handoff in `placeOrder` (`src/app/checkout/CheckoutView.tsx`) — create a Stripe
PaymentIntent, a PayPal order, or POST the basket plus `proof.file` for a transfer — plus a
webhook route to mark orders paid.

---

## Integration points (currently mocked)

Each of these is a single clearly-commented `await new Promise(setTimeout)` to replace:

| What | Where |
| --- | --- |
| Newsletter signup | `src/components/layout/Newsletter.tsx` |
| Booking submission + deposit | `src/components/booking/BookingForm.tsx` (`confirm`) |
| Checkout / payment handoff | `src/app/checkout/CheckoutView.tsx` (`placeOrder`) — see Payments above |
| Proof-of-payment upload target | `BankTransferPanel` holds the `File` in state; needs a server route |
| Contact form | `src/app/contact/ContactForm.tsx` |
| Account sign-in | `src/app/account/AccountSignIn.tsx` |
| Appointment availability | `slotTaken()` in `BookingForm.tsx` — deterministic stub |
| Discount codes | `DISCOUNTS` in `CheckoutView.tsx` |

Product, service, journal and help content lives in `src/lib/` as typed data, ready to be
swapped for a CMS or the Shopify Storefront API without touching components.

---

## Status / remaining work

**Done and verified:** build, lint and typecheck all pass. Homepage, shop, PDP and booking
verified visually at 1440 / 768 / 375 with no console errors and no horizontal overflow.

**Remaining:**

1. **Visual QA pass** on the pages not yet screenshotted at every breakpoint —
   `/about`, `/journal`, `/journal/[slug]`, `/cart`, `/checkout`, `/search`, `/contact`,
   `/faqs`, `/help/[slug]`, `/account`, `/wishlist`, `/collections/[slug]`, `/services/[slug]`.
2. **Interaction states** not yet captured: cart drawer, filter drawer, mobile menu,
   search drawer, mega menu, toasts, booking steps 2–5.
3. **Real photography** — the hero uses a licensed photograph at
   `/public/images/hero-portrait.jpg` (Unsplash licence, free for commercial use). Every
   other slot still runs the generative art; swap it per the section above.
4. **Wire the integration points** in the table above.
5. **Lighthouse run** against a deployed build.
6. Confirm the studio hours in `src/lib/design.ts`. The address (598 Holly Lane, Goodmayes
   IG3 9BF), phone, email, social handles and domain are the real ones and flow from
   `design.brand` into the header, footer, contact and about pages, page metadata, the share
   card and the `HealthAndBeautyBusiness` JSON-LD. `NEXT_PUBLIC_SITE_URL` overrides the
   canonical origin per environment.
7. **Payments** — connect Stripe and/or PayPal, and add the server handoff and webhook
   described in the Payments section.

