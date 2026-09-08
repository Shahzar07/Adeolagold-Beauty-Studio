import { products } from "@/lib/catalog";
import { pageMeta } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";
import { CollectionHeader } from "@/components/commerce/CollectionHeader";
import { CollectionView } from "@/components/commerce/CollectionView";
import { JsonLd } from "@/components/ui/JsonLd";
import type { FilterState } from "@/components/commerce/FilterDrawer";

export const metadata = pageMeta({
  title: "Shop All Hair",
  description:
    "Shop the full Adeolagold collection — luxury lace front wigs, raw and virgin human hair bundles, and HD lace frontals and closures. UK-wide delivery.",
  path: "/shop",
});

const crumbs = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
];

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ texture?: string; category?: string }>;
}) {
  const params = await searchParams;

  // Deep links from the mega menu pre-apply a facet.
  const initialFilters: Partial<FilterState> = {};
  if (params.texture) initialFilters.texture = [params.texture];
  if (params.category) initialFilters.category = [params.category];

  return (
    <div className="container-page">
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <CollectionHeader
        eyebrow="The Collection"
        title="Every piece, hand-selected."
        description="Lace front wigs finished by hand, raw and virgin hair bundles, and HD lace frontals and closures. Filter by texture, length, density and colour to find your match."
        count={products.length}
        crumbs={crumbs}
      />
      <CollectionView products={products} initialFilters={initialFilters} />
      <div className="h-24" />
    </div>
  );
}
