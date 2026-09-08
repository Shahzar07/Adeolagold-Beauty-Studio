# Adeolagold Beauty Studio

A premium, production-ready storefront for **Adeolagold Beauty Studio** — luxury wigs,
raw and virgin human hair, and professional beauty services, from a private appointment-only
studio in Dagenham, Essex.

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

## Imagery

Every image slot on the site is addressed by a `seed` string and resolved through
`src/lib/images.ts`, which maps that seed to a file in `/public/images`.
`EditorialImage` renders an optimised `next/image` for any seed the registry knows,
and falls back to deterministic generative artwork for any seed it does not — so a
slot with no photograph still renders in the right tone rather than breaking the
layout.

```
seed ──► src/lib/images.ts ──► /public/images/<seed>.jpg ──► next/image
   └──► (no entry) ──────────► generative artwork, brand palette
```

The 74 photographs currently in the registry are from
[Pexels](https://www.pexels.com) under the [Pexels licence](https://www.pexels.com/license/)
(free for commercial use, no attribution required). Every source is recorded in
`public/images/CREDITS.md` so any image can be traced, re-downloaded at full
resolution, or replaced.

Each file is pre-cropped to the aspect its slot renders at (4:5 for products and
portraits, 3:4 for the category tiles, 1:1 for the Instagram grid and journal
cards, 16:9 for full-bleed bands) with a vertical bias that keeps heads in frame.

### Replacing an image

Drop the new file in `/public/images` and point the seed at it:

```ts
// src/lib/images.ts
"lace-30-front": "/images/lace-30-front.jpg",
```

Nothing else changes — the shop, PDP gallery, collections, mega menus, journal and
Instagram grid all read the same registry. To use a remote CDN (Shopify Files,
Cloudinary) instead, put the URL in the registry and add the host to
`images.remotePatterns` in `next.config.ts`.

### A note on what the photographs claim

These are stock models, not the studio's clients, founder or premises. Alt text and
captions are written so nothing asserts otherwise — no image is labelled as the
founder or as the studio's own room. Keep that constraint when swapping images in,
until the studio's own photography replaces them.

---

## Routes

| Route | Notes |
| --- | --- |
| `/` | Hero, brand statement, categories, The Adeolagold Edit, campaign, services, about, four pillars, testimonials, journal, Instagram |
| `/shop` | Full collection · filter drawer, sort, active-filter chips, empty state. Accepts `?texture=` / `?category=` deep links |
| `/collections/[slug]` | `wigs`, `human-hair`, `frontals-closures`, `new-arrivals`, `best-sellers` |
| `/products/[slug]` | 7 products · gallery (desktop rail / mobile swipe), length + density + colour selectors, sticky info column, accordion, sticky mobile add-to-cart, related |
| `/services` + `/services/[slug]` | 12 services as editorial expanding rows, not cards |
| `/book` | 5-step flow: service → date → time → details → request, with an appointment summary |
| `/about` | Story, what to expect, founder imagery, standards, visit |
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

## Source of the content

Everything the site states about the business — name, phone, email, opening hours, social
accounts, service list and descriptions, client reviews, product listings with their prices,
ratings and review counts, and the "private appointment-only studio in Essex" positioning —
is taken from the studio's own published material (its live site at
`adeolagoldbeautystudio.co.uk` and the company record). Nothing about the business is
invented here.

Two consequences worth knowing before editing:

- **No service prices.** The studio quotes at consultation and publishes no service prices,
  so `Service.fromPrice` and `Service.depositPence` are optional and currently unset. The UI
  falls back to "Quoted at consultation" / "Confirmed on booking" via `formatServicePrice()`
  in `src/lib/format.ts`. Setting a real `fromPrice` on a service immediately restores the
  "From £x" treatment everywhere, including the `Offer` in its JSON-LD.
- **No street address.** The studio is private and appointment-only, and does not publish its
  street address; clients receive it on confirmation. `design.brand.location.street` holds it
  for internal reference, but the public pages and the `PostalAddress` in structured data
  render `location.displayLines` (locality and region only). Publishing the street is a
  one-line change if the studio wants it — but it should be their call.

---

## Status / remaining work

**Done and verified:** `build`, `lint` and `typecheck` all pass. Every route was swept with
Playwright at 1440 / 768 / 375 — 19 pages × 3 breakpoints, all HTTP 200, no console errors,
no horizontal overflow, and no overlapping controls in the header. Interaction states
captured and checked: mobile menu (closed and with a nav group expanded), search drawer with
results, cart drawer, filter drawer, toast, both mega menus, and all five booking steps.
All 74 photographs were reviewed individually after cropping.

**Remaining:**

1. **Swap in the studio's own photography.** The site is fully dressed with
   licensed stock (see the imagery section); replacing a shot is one registry
   entry. This is the highest-value remaining change — a wig studio sells on its
   own work.
2. **Wire the integration points** in the table above — each is a single commented
   `setTimeout`.
3. **Lighthouse run** against a deployed build.
4. **Confirm the commercial details the studio has not published anywhere**, all of
   which are currently this build's assumptions rather than facts:
   - free UK delivery over £150 (`FREE_SHIPPING_THRESHOLD` in `src/lib/format.ts`,
     and the announcement bar), next-day at £8.95, and the international shipping
     copy in `src/lib/content.ts`;
   - the 14-day returns window and the 48-hour cancellation terms in `helpPages`;
   - variant uplifts for length, density and colour in `src/lib/catalog.ts` — base
     prices are the studio's real listings, the per-option deltas are not.
5. **Expand the catalogue** if the studio stocks more than the seven listings it
   publishes online. Adding an entry to `products` in `src/lib/catalog.ts` is all
   that is needed; the shop, collections, filters, search, sitemap and JSON-LD all
   derive from it.
6. **Payments** — connect Stripe and/or PayPal, then add the server handoff and the
   webhook described in the Payments section. Bank transfer already works.
7. **Confirm the opening hours** in `src/lib/design.ts`. The address (598 Holly Lane,
   Goodmayes IG3 9BF), phone, email, socials and domain are the studio's real details
   and flow from `design.brand` everywhere. `NEXT_PUBLIC_SITE_URL` overrides the
   canonical origin per environment.
