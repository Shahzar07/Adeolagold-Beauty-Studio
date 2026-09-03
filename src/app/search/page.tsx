import Link from "next/link";
import { searchProducts } from "@/lib/catalog";
import { services } from "@/lib/services";
import { journalPosts } from "@/lib/journal";
import { pageMeta } from "@/lib/seo";
import { formatServicePrice } from "@/lib/format";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ProductGrid } from "@/components/commerce/ProductGrid";
import { ButtonLink } from "@/components/ui/Button";

export const metadata = pageMeta({
  title: "Search",
  description: "Search luxury wigs, human hair, services and journal articles.",
  path: "/search",
  index: false,
});

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = "" } = await searchParams;
  const query = q.trim();
  const lower = query.toLowerCase();

  const productResults = query ? searchProducts(query) : [];
  const serviceResults = query
    ? services.filter((s) => `${s.title} ${s.summary} ${s.description}`.toLowerCase().includes(lower))
    : [];
  const postResults = query
    ? journalPosts.filter((p) => `${p.title} ${p.excerpt} ${p.category}`.toLowerCase().includes(lower))
    : [];

  const total = productResults.length + serviceResults.length + postResults.length;

  return (
    <div className="container-page pb-24">
      <Breadcrumbs
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Search", href: "/search" },
        ]}
        className="py-8"
      />

      <header className="pb-12">
        <p className="eyebrow mb-5">Search</p>
        <h1 className="display-1 max-w-[16ch]">
          {query ? <>Results for “{query}”</> : "What are you looking for?"}
        </h1>
        {query ? (
          <p className="mt-6 text-[13px] uppercase tracking-[0.14em] text-muted">
            {total} {total === 1 ? "result" : "results"}
          </p>
        ) : null}
      </header>

      {!query ? (
        <div className="max-w-lg">
          <p className="body-lg">
            Use the search icon in the header to look up a texture, a length, a service or an
            article — or start with the full collection.
          </p>
          <ButtonLink href="/shop" className="mt-9">
            Shop all hair
          </ButtonLink>
        </div>
      ) : total === 0 ? (
        <div className="max-w-lg">
          <p className="display-3">Nothing matched that.</p>
          <p className="mt-5 text-[15px] leading-relaxed text-ink-soft">
            Try a texture like “body wave”, a construction like “frontal”, or tell us what you
            are after and we will source it.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/shop">Shop all hair</ButtonLink>
            <ButtonLink href="/contact" variant="secondary">
              Ask the studio
            </ButtonLink>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-20">
          {productResults.length > 0 ? (
            <section aria-labelledby="search-products">
              <h2 id="search-products" className="eyebrow mb-8">
                Products · {productResults.length}
              </h2>
              <ProductGrid products={productResults} columns={4} />
            </section>
          ) : null}

          {serviceResults.length > 0 ? (
            <section aria-labelledby="search-services">
              <h2 id="search-services" className="eyebrow mb-8">
                Services · {serviceResults.length}
              </h2>
              <ul className="border-t border-line">
                {serviceResults.map((service) => (
                  <li key={service.slug} className="border-b border-line">
                    <Link
                      href={`/services/${service.slug}`}
                      className="group flex items-center justify-between gap-6 py-6"
                    >
                      <div>
                        <h3 className="font-display text-[22px] leading-tight transition-[color,transform] duration-[350ms] ease-lux group-hover:translate-x-1 group-hover:text-gold">
                          {service.title}
                        </h3>
                        <p className="mt-1.5 max-w-[52ch] text-[13px] text-ink-soft">
                          {service.summary}
                        </p>
                      </div>
                      <span className="shrink-0 text-[13px] tabular-nums text-ink">
                        {formatServicePrice(service.fromPrice)}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {postResults.length > 0 ? (
            <section aria-labelledby="search-journal">
              <h2 id="search-journal" className="eyebrow mb-8">
                Journal · {postResults.length}
              </h2>
              <ul className="border-t border-line">
                {postResults.map((post) => (
                  <li key={post.slug} className="border-b border-line">
                    <Link href={`/journal/${post.slug}`} className="group block py-6">
                      <p className="text-[10.5px] uppercase tracking-[0.16em] text-gold">
                        {post.category}
                      </p>
                      <h3 className="mt-2 font-display text-[22px] leading-tight transition-transform duration-[350ms] ease-lux group-hover:translate-x-1">
                        {post.title}
                      </h3>
                      <p className="mt-1.5 max-w-[62ch] text-[13px] text-ink-soft">
                        {post.excerpt}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </div>
      )}
    </div>
  );
}
