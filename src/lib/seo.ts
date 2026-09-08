import type { Metadata } from "next";
import { design } from "./design";

/** Canonical origin. Override per environment with NEXT_PUBLIC_SITE_URL. */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || design.seo.url;

export function absoluteUrl(path = "/"): string {
  return new URL(path, SITE_URL).toString();
}

interface PageMetaInput {
  title: string;
  description: string;
  path: string;
  /** Set false for utility pages that should stay out of the index. */
  index?: boolean;
}

/** Builds consistent per-page metadata, including canonical and Open Graph. */
export function pageMeta({
  title,
  description,
  path,
  index = true,
}: PageMetaInput): Metadata {
  const url = absoluteUrl(path);
  return {
    title,
    description,
    alternates: { canonical: url },
    robots: index ? undefined : { index: false, follow: true },
    openGraph: {
      title: `${title} | ${design.brand.name}`,
      description,
      url,
      siteName: design.brand.name,
      locale: "en_GB",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${design.brand.name}`,
      description,
    },
  };
}
