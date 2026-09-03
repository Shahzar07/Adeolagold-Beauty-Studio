import { featuredProducts } from "@/lib/catalog";
import { ProductGrid } from "@/components/commerce/ProductGrid";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function FeaturedCollection() {
  return (
    <section id="the-edit" className="section bg-surface-light" aria-labelledby="the-edit-heading">
      <div className="container-page">
        <SectionHeading
          eyebrow="Featured"
          title="The Adeolagold Edit"
          subtitle="Selected pieces for women who know the difference."
          link={{ label: "Shop all hair", href: "/shop" }}
          className="mb-14"
        />
        <ProductGrid products={featuredProducts(8)} columns={4} />
      </div>
    </section>
  );
}
