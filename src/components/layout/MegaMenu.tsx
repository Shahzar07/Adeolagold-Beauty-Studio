"use client";

import Link from "next/link";
import type { NavItem } from "@/lib/navigation";
import { EditorialImage, ImageFrame } from "@/components/media/EditorialImage";
import { ArrowRightIcon } from "@/components/ui/Icons";

export function MegaMenu({
  item,
  open,
  onClose,
}: {
  item: NavItem;
  open: boolean;
  onClose: () => void;
}) {
  if (!open || !item.columns) return null;

  return (
    <div
      className="animate-slide-down absolute inset-x-0 top-full hidden border-y border-line bg-background shadow-subtle lg:block"
      onMouseLeave={onClose}
    >
      <div className="container-wide grid grid-cols-12 gap-10 py-12">
        {item.columns.map((column) => (
          <div key={column.heading} className="col-span-3">
            <p className="eyebrow mb-5">{column.heading}</p>
            <ul className="flex flex-col gap-3">
              {column.links.map((link) => (
                <li key={link.href + link.label}>
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className="link-underline text-[14px] text-ink-soft transition-colors duration-[180ms] hover:text-ink"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {item.feature ? (
          <Link
            href={item.feature.href}
            onClick={onClose}
            className="group col-span-6 flex items-end gap-8"
          >
            <div className="w-1/2 shrink-0">
              <ImageFrame ratio="4/5" zoomOnGroupHover>
                <EditorialImage
                  seed={item.feature.seed}
                  alt=""
                  tone="campaign"
                  sizes="280px"
                />
              </ImageFrame>
            </div>
            <div className="pb-2">
              <h3 className="display-4">{item.feature.title}</h3>
              <p className="mt-3 max-w-[26ch] text-[13.5px] leading-relaxed text-ink-soft">
                {item.feature.copy}
              </p>
              <span className="mt-5 inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.14em] text-ink">
                {item.feature.cta}
                <ArrowRightIcon className="h-3.5 w-3.5 transition-transform duration-[350ms] ease-lux group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        ) : null}
      </div>
    </div>
  );
}
