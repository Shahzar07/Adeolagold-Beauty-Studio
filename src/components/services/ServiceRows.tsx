"use client";

import Link from "next/link";
import { useState } from "react";
import type { Service } from "@/lib/types";
import { cx, formatServicePrice } from "@/lib/format";
import { ButtonLink } from "@/components/ui/Button";
import { ClockIcon, PlusIcon, MinusIcon, CheckIcon } from "@/components/ui/Icons";

/**
 * Editorial service rows — a typographic list rather than a grid of cards.
 * Each row expands in place to reveal what the service includes.
 */
export function ServiceRows({
  services,
  defaultOpen = null,
}: {
  services: Service[];
  defaultOpen?: number | null;
}) {
  const [open, setOpen] = useState<number | null>(defaultOpen);

  return (
    <div className="border-t border-line">
      {services.map((service, index) => {
        const isOpen = open === index;
        return (
          <div key={service.slug} className="border-b border-line">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : index)}
              aria-expanded={isOpen}
              aria-controls={`service-${service.slug}`}
              className="group flex w-full items-start justify-between gap-6 py-7 text-left"
            >
              <div className="min-w-0 flex-1">
                <h3 className="font-display text-[clamp(1.35rem,2.4vw,1.95rem)] leading-tight tracking-[-0.018em] transition-[color,transform] duration-[350ms] ease-lux group-hover:translate-x-1 group-hover:text-gold">
                  {service.title}
                </h3>
                <p className="mt-2 max-w-[46ch] text-[13.5px] leading-relaxed text-ink-soft">
                  {service.summary}
                </p>
              </div>

              <div className="flex shrink-0 flex-col items-end gap-2 pt-1">
                <span className="text-[13px] tabular-nums text-ink">
                  {formatServicePrice(service.fromPrice)}
                </span>
                <span className="flex items-center gap-1.5 text-[11px] text-muted">
                  <ClockIcon className="h-3.5 w-3.5" />
                  {service.duration}
                </span>
                <span className="relative mt-1 h-4 w-4 text-muted transition-colors group-hover:text-gold">
                  <PlusIcon
                    className={cx(
                      "absolute inset-0 h-4 w-4 transition-[opacity,transform] duration-[350ms] ease-lux",
                      isOpen ? "rotate-90 opacity-0" : "opacity-100",
                    )}
                  />
                  <MinusIcon
                    className={cx(
                      "absolute inset-0 h-4 w-4 transition-[opacity,transform] duration-[350ms] ease-lux",
                      isOpen ? "opacity-100" : "-rotate-90 opacity-0",
                    )}
                  />
                </span>
              </div>
            </button>

            <div id={`service-${service.slug}`} hidden={!isOpen} className="pb-8">
              <div className="grid gap-8 md:grid-cols-2">
                <div>
                  <p className="text-[14px] leading-relaxed text-ink-soft">
                    {service.description}
                  </p>
                  {service.aftercare ? (
                    <p className="mt-4 border-l border-gold pl-4 text-[13px] leading-relaxed text-ink">
                      {service.aftercare}
                    </p>
                  ) : null}
                </div>

                <div>
                  <p className="eyebrow mb-4">What&rsquo;s included</p>
                  <ul className="flex flex-col gap-2.5">
                    {service.includes.map((item) => (
                      <li key={item} className="flex gap-3 text-[13.5px] text-ink-soft">
                        <CheckIcon className="mt-1 h-3.5 w-3.5 shrink-0 text-gold" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <ButtonLink href={`/book?service=${service.slug}`} size="sm">
                  Book {service.title}
                </ButtonLink>
                <Link
                  href={`/services/${service.slug}`}
                  className="link-underline text-[11px] font-medium uppercase tracking-[0.14em] text-ink-soft transition-colors hover:text-ink"
                >
                  Full details
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
