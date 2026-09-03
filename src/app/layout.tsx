import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { design } from "@/lib/design";
import { SITE_URL } from "@/lib/seo";
import { organizationSchema, websiteSchema } from "@/lib/schema";
import { Providers } from "@/context/Providers";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StickyMobileCTA } from "@/components/layout/StickyMobileCTA";
import { CartDrawer } from "@/components/commerce/CartDrawer";
import { JsonLd } from "@/components/ui/JsonLd";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: design.seo.title,
    template: `%s | ${design.brand.name}`,
  },
  description: design.seo.description,
  applicationName: design.brand.name,
  keywords: [
    "luxury wig installation UK",
    "wig revamp",
    "custom wigs",
    "HD lace frontal",
    "premium human hair",
    "hair extensions",
    "braids",
    "silk press",
    "microblading",
    "makeup artist",
    "beauty studio Essex",
  ],
  authors: [{ name: design.brand.name }],
  creator: design.brand.name,
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: SITE_URL,
    siteName: design.brand.name,
    title: design.seo.title,
    description: design.seo.description,
  },
  twitter: {
    card: "summary_large_image",
    title: design.seo.title,
    description: design.seo.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: design.colors.background,
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="flex min-h-screen flex-col">
        <JsonLd data={organizationSchema()} />
        <JsonLd data={websiteSchema()} />
        <Providers>
          <AnnouncementBar />
          <Header />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
          <CartDrawer />
          <StickyMobileCTA />
        </Providers>
      </body>
    </html>
  );
}
