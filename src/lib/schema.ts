import { design } from "./design";
import { absoluteUrl, SITE_URL } from "./seo";
import type { JournalPost, Product, Service } from "./types";
import { priceFrom } from "./catalog";

/* Structured data helpers. Each returns a plain object that is serialised into
   a <script type="application/ld+json"> tag by the <JsonLd> component. */

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "HealthAndBeautyBusiness",
    "@id": `${SITE_URL}/#studio`,
    name: design.brand.name,
    description: design.seo.description,
    url: SITE_URL,
    telephone: design.brand.phone,
    email: design.brand.email,
    priceRange: "££",
    image: absoluteUrl("/opengraph-image"),
    address: {
      "@type": "PostalAddress",
      streetAddress: design.brand.address.street,
      addressLocality: design.brand.address.locality,
      addressRegion: design.brand.address.region,
      postalCode: design.brand.address.postalCode,
      addressCountry: design.brand.address.country,
    },
    hasMap: design.brand.address.mapsUrl,
    areaServed: [
      { "@type": "Place", name: "Goodmayes" },
      { "@type": "Place", name: "Ilford" },
      { "@type": "Place", name: "Romford" },
      { "@type": "Place", name: "London" },
    ],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "19:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Saturday"],
        opens: "08:30",
        closes: "18:00",
      },
    ],
    sameAs: [
      design.brand.instagramUrl,
      design.brand.tiktokUrl,
      design.brand.facebookUrl,
    ],
    makesOffer: design.services.map((s) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: s.title },
      url: absoluteUrl(`/services/${s.slug}`),
    })),
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: design.brand.name,
    url: SITE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function productSchema(product: Product) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.excerpt,
    sku: product.id,
    brand: { "@type": "Brand", name: design.brand.name },
    material: product.origin,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
    },
    offers: {
      "@type": "Offer",
      url: absoluteUrl(`/products/${product.slug}`),
      priceCurrency: "GBP",
      price: (priceFrom(product) / 100).toFixed(2),
      availability: product.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      seller: { "@type": "Organization", name: design.brand.name },
    },
  };
}

export function serviceSchema(service: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.summary,
    serviceType: service.title,
    provider: { "@id": `${SITE_URL}/#studio` },
    areaServed: design.brand.address.locality,
    offers: {
      "@type": "Offer",
      priceCurrency: "GBP",
      price: (service.fromPrice / 100).toFixed(2),
      url: absoluteUrl(`/book?service=${service.slug}`),
    },
  };
}

export function articleSchema(post: JournalPost) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    author: { "@type": "Person", name: post.author },
    publisher: { "@id": `${SITE_URL}/#studio` },
    mainEntityOfPage: absoluteUrl(`/journal/${post.slug}`),
  };
}

export function breadcrumbSchema(crumbs: { label: string; href: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.label,
      item: absoluteUrl(crumb.href),
    })),
  };
}

export function faqSchema(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}
