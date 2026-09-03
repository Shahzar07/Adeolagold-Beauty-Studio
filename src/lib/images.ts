// images.ts
// Generated registry of the site's photography.
//
// Every image slot is addressed by the same `seed` string the generative
// artwork used, so wiring a photograph in is a matter of adding an entry here
// — <EditorialImage> falls back to the generative composition for any seed
// that has no photograph yet.
//
// Files live in /public/images and are pre-cropped to the aspect their slot
// renders at. Sources and licence are recorded in public/images/CREDITS.md.

export const siteImages: Record<string, string> = {
  "about-detail": "/images/about-detail.jpg",
  "about-founder": "/images/about-founder.jpg",
  "about-founder-portrait": "/images/about-founder-portrait.jpg",
  "about-hands": "/images/about-hands.jpg",
  "about-studio-wide": "/images/about-studio-wide.jpg",
  "account-studio": "/images/account-studio.jpg",
  "black-bob-lace-back": "/images/black-bob-lace-back.jpg",
  "black-bob-lace-detail": "/images/black-bob-lace-detail.jpg",
  "black-bob-lace-front": "/images/black-bob-lace-front.jpg",
  "black-bob-lace-side": "/images/black-bob-lace-side.jpg",
  "black-bob-lace-worn": "/images/black-bob-lace-worn.jpg",
  "body-wave-bundle-hero": "/images/body-wave-bundle-hero.jpg",
  "body-wave-bundle-texture": "/images/body-wave-bundle-texture.jpg",
  "body-wave-bundle-weft": "/images/body-wave-bundle-weft.jpg",
  "body-wave-bundle-worn": "/images/body-wave-bundle-worn.jpg",
  "booking-studio": "/images/booking-studio.jpg",
  "campaign-signature": "/images/campaign-signature.jpg",
  "closure-hero": "/images/closure-hero.jpg",
  "closure-lace": "/images/closure-lace.jpg",
  "closure-parting": "/images/closure-parting.jpg",
  "closure-worn": "/images/closure-worn.jpg",
  "collection-best": "/images/collection-best.jpg",
  "collection-hair": "/images/collection-hair.jpg",
  "collection-lace": "/images/collection-lace.jpg",
  "collection-new": "/images/collection-new.jpg",
  "collection-wigs": "/images/collection-wigs.jpg",
  "contact-studio": "/images/contact-studio.jpg",
  "hd-frontal-hero": "/images/hd-frontal-hero.jpg",
  "hd-frontal-lace": "/images/hd-frontal-lace.jpg",
  "hd-frontal-parting": "/images/hd-frontal-parting.jpg",
  "hd-frontal-worn": "/images/hd-frontal-worn.jpg",
  "hero-campaign-primary": "/images/hero-campaign-primary.jpg",
  "ig-01": "/images/ig-01.jpg",
  "ig-02": "/images/ig-02.jpg",
  "ig-03": "/images/ig-03.jpg",
  "ig-04": "/images/ig-04.jpg",
  "ig-05": "/images/ig-05.jpg",
  "ig-06": "/images/ig-06.jpg",
  "ig-07": "/images/ig-07.jpg",
  "ig-08": "/images/ig-08.jpg",
  "journal-care": "/images/journal-care.jpg",
  "journal-closure": "/images/journal-closure.jpg",
  "journal-density": "/images/journal-density.jpg",
  "journal-install": "/images/journal-install.jpg",
  "journal-longevity": "/images/journal-longevity.jpg",
  "journal-refresh": "/images/journal-refresh.jpg",
  "lace-30-back": "/images/lace-30-back.jpg",
  "lace-30-detail": "/images/lace-30-detail.jpg",
  "lace-30-front": "/images/lace-30-front.jpg",
  "lace-30-side": "/images/lace-30-side.jpg",
  "lace-30-texture": "/images/lace-30-texture.jpg",
  "lace-30-worn": "/images/lace-30-worn.jpg",
  "natural-bob-back": "/images/natural-bob-back.jpg",
  "natural-bob-detail": "/images/natural-bob-detail.jpg",
  "natural-bob-front": "/images/natural-bob-front.jpg",
  "natural-bob-side": "/images/natural-bob-side.jpg",
  "natural-bob-worn": "/images/natural-bob-worn.jpg",
  "nav-book": "/images/nav-book.jpg",
  "nav-edit": "/images/nav-edit.jpg",
  "nav-hair": "/images/nav-hair.jpg",
  "nav-wigs": "/images/nav-wigs.jpg",
  "not-found": "/images/not-found.jpg",
  "services-hero": "/images/services-hero.jpg",
  "services-studio": "/images/services-studio.jpg",
  "straight-bundle-hero": "/images/straight-bundle-hero.jpg",
  "straight-bundle-texture": "/images/straight-bundle-texture.jpg",
  "straight-bundle-weft": "/images/straight-bundle-weft.jpg",
  "straight-bundle-worn": "/images/straight-bundle-worn.jpg",
  "tile-braids": "/images/tile-braids.jpg",
  "tile-hair": "/images/tile-hair.jpg",
  "tile-install": "/images/tile-install.jpg",
  "tile-lace": "/images/tile-lace.jpg",
  "tile-revamp": "/images/tile-revamp.jpg",
  "tile-wigs": "/images/tile-wigs.jpg",
};

/** The photograph for a slot, or undefined when it should render generative art. */
export function imageFor(seed: string): string | undefined {
  return siteImages[seed];
}
