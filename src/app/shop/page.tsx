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
    "Shop the full Adeolagold collection — luxury wigs, single-donor human hair bundles, HD closures and frontals, and studio-formulated hair care.",
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
        title="Every piece we make."
        description="Wigs finished by hand, single-donor bundles, and the aftercare we use in the studio. Filter by texture, length, density and colour to find your match."
        count={products.length}
        crumbs={crumbs}
      />
      <CollectionView products={products} initialFilters={initialFilters} />
      <div className="h-24" />
    </div>
  );
}
