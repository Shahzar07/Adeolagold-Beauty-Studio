import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProduct, priceFrom, products, relatedProducts } from "@/lib/catalog";
import { pageMeta } from "@/lib/seo";
import { breadcrumbSchema, productSchema } from "@/lib/schema";
import { formatPrice } from "@/lib/format";
import { ProductGallery } from "@/components/commerce/ProductGallery";
import { ProductInfo } from "@/components/commerce/ProductInfo";
import { ProductGrid } from "@/components/commerce/ProductGrid";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import { ButtonLink } from "@/components/ui/Button";
import { EditorialImage } from "@/components/media/EditorialImage";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};

  return pageMeta({
    title: `${product.name} — ${product.subtitle}`,
    description: `${product.excerpt} From ${formatPrice(priceFrom(product))}. ${product.origin}.`,
    path: `/products/${product.slug}`,
  });
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const collectionSlug = product.collections[0] ?? "wigs";
  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Shop", href: "/shop" },
    { label: product.name, href: `/products/${product.slug}` },
  ];

  return (
    <>
      <JsonLd data={productSchema(product)} />
      <JsonLd data={breadcrumbSchema(crumbs)} />

      <div className="container-page">
        <Breadcrumbs crumbs={crumbs} className="py-8" />

        <div className="grid gap-12 pb-20 lg:grid-cols-12 lg:gap-14 xl:gap-20">
          <div className="lg:col-span-7">
            <ProductGallery images={product.images} productName={product.name} />
          </div>

          {/* Sticky info column on desktop. */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-[104px]">
              <ProductInfo product={product} />
            </div>
          </div>
        </div>
      </div>

      {/* Styling service cross-sell */}
      <section className="relative overflow-hidden bg-ink" aria-labelledby="pdp-service-heading">
        <div className="grain absolute inset-0 opacity-80">
          <EditorialImage seed={`pdp-${product.slug}`} alt="" tone="campaign" sizes="100vw" />
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-black/78 via-black/45 to-transparent"
        />
        <div className="container-page relative py-20 lg:py-24">
          <div className="max-w-lg">
            <p className="eyebrow mb-5 text-white/50">Have it fitted</p>
            <h2
              id="pdp-service-heading"
              className="font-display text-[clamp(1.9rem,4vw,3rem)] leading-[1.06] tracking-[-0.025em] text-white"
            >
              Buy the hair. Let us do the rest.
            </h2>
            <p className="mt-5 text-[14.5px] leading-relaxed text-white/65">
              Installation is priced the same whether the unit came from us or not — lace tinted,
              hairline customised, and cut on you rather than on the block.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/book?service=wig-installation" variant="gold">
                Book an installation
              </ButtonLink>
              <ButtonLink href="/services" variant="onDark">
                All services
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      {/* Related */}
      <section className="section" aria-labelledby="related-heading">
        <div className="container-page">
          <SectionHeading
            eyebrow="You may also love"
            title="Complete the look"
            link={{ label: "View collection", href: `/collections/${collectionSlug}` }}
            className="mb-12"
          />
          <ProductGrid products={relatedProducts(product, 4)} columns={4} />
        </div>
      </section>
    </>
  );
}
