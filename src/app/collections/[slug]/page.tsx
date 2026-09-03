import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { collections, getCollection, productsInCollection } from "@/lib/catalog";
import { pageMeta } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";
import { CollectionHeader } from "@/components/commerce/CollectionHeader";
import { CollectionView } from "@/components/commerce/CollectionView";
import { JsonLd } from "@/components/ui/JsonLd";

export function generateStaticParams() {
  return collections.map((collection) => ({ slug: collection.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const collection = getCollection(slug);
  if (!collection) return {};

  return pageMeta({
    title: collection.title,
    description: collection.description,
    path: `/collections/${collection.slug}`,
  });
}

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const collection = getCollection(slug);
  if (!collection) notFound();

  const items = productsInCollection(collection.slug);
  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Shop", href: "/shop" },
    { label: collection.title, href: `/collections/${collection.slug}` },
  ];

  return (
    <div className="container-page">
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <CollectionHeader
        eyebrow={collection.eyebrow}
        title={collection.title}
        description={collection.description}
        count={items.length}
        crumbs={crumbs}
      />
      <CollectionView products={items} />
      <div className="h-24" />
    </div>
  );
}
