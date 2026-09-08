"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { searchProducts } from "@/lib/catalog";
import { services } from "@/lib/services";
import { formatPrice, formatServicePrice } from "@/lib/format";
import { EditorialImage, ImageFrame } from "@/components/media/EditorialImage";
import { CloseIcon, SearchIcon } from "@/components/ui/Icons";

const suggestions = [
  "Body wave",
  "HD frontal",
  "Raw bundles",
  "Bob",
  "Wig revamp",
  "Braids",
];

export function SearchDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (!open) return;
    const { body } = document;
    const previous = body.style.overflow;
    body.style.overflow = "hidden";
    window.requestAnimationFrame(() => inputRef.current?.focus());

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      body.style.overflow = previous;
    };
  }, [open, onClose]);

  const productResults = useMemo(() => searchProducts(query).slice(0, 5), [query]);
  const serviceResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return services.filter((s) => `${s.title} ${s.summary}`.toLowerCase().includes(q)).slice(0, 3);
  }, [query]);

  if (!open) return null;

  const hasQuery = query.trim().length > 0;
  const hasResults = productResults.length > 0 || serviceResults.length > 0;

  return (
    <div className="fixed inset-0 z-[85]">
      <div
        className="animate-fade-in absolute inset-0 bg-black/40 backdrop-blur-[2px]"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Search"
        className="animate-slide-down absolute inset-x-0 top-0 max-h-[86vh] overflow-y-auto bg-background"
      >
        <div className="container-page py-6">
          <form
            role="search"
            onSubmit={(event) => {
              event.preventDefault();
              if (!hasQuery) return;
              router.push(`/search?q=${encodeURIComponent(query.trim())}`);
              onClose();
            }}
            className="flex items-center gap-4 border-b border-line pb-4"
          >
            <SearchIcon className="h-5 w-5 shrink-0 text-muted" />
            <label htmlFor="site-search" className="sr-only">
              Search products and services
            </label>
            <input
              ref={inputRef}
              id="site-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search hair, wigs and services"
              autoComplete="off"
              className="min-w-0 flex-1 bg-transparent font-display text-[24px] leading-none outline-none placeholder:text-muted md:text-[32px]"
            />
            <button
              type="button"
              onClick={onClose}
              aria-label="Close search"
              className="-mr-2 flex h-11 w-11 shrink-0 items-center justify-center text-ink transition-colors hover:text-gold"
            >
              <CloseIcon className="h-[18px] w-[18px]" />
            </button>
          </form>

          {!hasQuery ? (
            <div className="py-8">
              <p className="eyebrow mb-4">Popular searches</p>
              <ul className="flex flex-wrap gap-2">
                {suggestions.map((s) => (
                  <li key={s}>
                    <button
                      type="button"
                      onClick={() => setQuery(s)}
                      className="border border-line px-4 py-2 text-[12px] text-ink-soft transition-colors duration-[180ms] hover:border-ink hover:text-ink"
                    >
                      {s}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ) : !hasResults ? (
            <div className="py-14 text-center">
              <p className="display-4">No results for “{query}”</p>
              <p className="mt-3 text-[14px] text-ink-soft">
                Try a texture, a length, or the name of a service.
              </p>
            </div>
          ) : (
            <div className="grid gap-10 py-8 md:grid-cols-[1.6fr_1fr]">
              {productResults.length > 0 ? (
                <div>
                  <p className="eyebrow mb-5">Products</p>
                  <ul className="flex flex-col gap-4">
                    {productResults.map((product) => (
                      <li key={product.id}>
                        <Link
                          href={`/products/${product.slug}`}
                          onClick={onClose}
                          className="group flex items-center gap-4"
                        >
                          <div className="w-16 shrink-0">
                            <ImageFrame ratio="4/5" zoomOnGroupHover>
                              <EditorialImage
                                seed={product.images[0].seed}
                                alt=""
                                tone={product.images[0].tone}
                                sizes="64px"
                              />
                            </ImageFrame>
                          </div>
                          <div className="min-w-0">
                            <p className="truncate text-[13.5px] font-medium text-ink">
                              {product.name}
                            </p>
                            <p className="text-[12px] text-muted">{product.subtitle}</p>
                            <p className="mt-0.5 text-[12.5px] tabular-nums text-ink">
                              {formatPrice(product.price)}
                            </p>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/search?q=${encodeURIComponent(query.trim())}`}
                    onClick={onClose}
                    className="link-underline mt-6 inline-block text-[11px] font-medium uppercase tracking-[0.14em]"
                  >
                    View all results
                  </Link>
                </div>
              ) : null}

              {serviceResults.length > 0 ? (
                <div>
                  <p className="eyebrow mb-5">Services</p>
                  <ul className="flex flex-col gap-4">
                    {serviceResults.map((service) => (
                      <li key={service.slug}>
                        <Link
                          href={`/services/${service.slug}`}
                          onClick={onClose}
                          className="link-underline block"
                        >
                          <p className="text-[13.5px] font-medium text-ink">{service.title}</p>
                          <p className="text-[12px] text-muted">
                            {formatServicePrice(service.fromPrice)} · {service.duration}
                          </p>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
