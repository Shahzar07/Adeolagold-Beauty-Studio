"use client";

import Link from "next/link";
import { useState } from "react";
import { primaryNav } from "@/lib/navigation";
import { design } from "@/lib/design";
import { cx } from "@/lib/format";
import { Drawer } from "@/components/ui/Drawer";
import { ButtonLink } from "@/components/ui/Button";
import {
  AccountIcon,
  ChevronDownIcon,
  InstagramIcon,
  SearchIcon,
  TikTokIcon,
  WhatsAppIcon,
} from "@/components/ui/Icons";

export function MobileMenu({
  open,
  onClose,
  onSearch,
}: {
  open: boolean;
  onClose: () => void;
  onSearch: () => void;
}) {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <Drawer
      open={open}
      onClose={onClose}
      title="Menu"
      side="left"
      widthClass="max-w-[400px]"
      footer={
        <div className="flex flex-col gap-4">
          <ButtonLink href="/book" onClick={onClose} fullWidth>
            Book Appointment
          </ButtonLink>
          <div className="flex items-center justify-between">
            <Link
              href="/account"
              onClick={onClose}
              className="flex items-center gap-2 text-[11px] uppercase tracking-[0.14em] text-ink-soft"
            >
              <AccountIcon className="h-4 w-4" /> Account
            </Link>
            <div className="flex items-center gap-1">
              <a
                href={design.brand.instagramUrl}
                aria-label="Instagram"
                className="flex h-11 w-11 items-center justify-center text-ink-soft transition-colors hover:text-gold"
              >
                <InstagramIcon className="h-[17px] w-[17px]" />
              </a>
              <a
                href="https://tiktok.com/@adeolagold"
                aria-label="TikTok"
                className="flex h-11 w-11 items-center justify-center text-ink-soft transition-colors hover:text-gold"
              >
                <TikTokIcon className="h-[17px] w-[17px]" />
              </a>
              <a
                href={`https://wa.me/${design.brand.phone.replace(/[^0-9]/g, "")}`}
                aria-label="WhatsApp"
                className="-mr-2.5 flex h-11 w-11 items-center justify-center text-ink-soft transition-colors hover:text-gold"
              >
                <WhatsAppIcon className="h-[17px] w-[17px]" />
              </a>
            </div>
          </div>
        </div>
      }
    >
      <div className="px-6 py-5">
        <button
          type="button"
          onClick={onSearch}
          className="field flex items-center gap-3 text-left text-muted"
        >
          <SearchIcon className="h-4 w-4 shrink-0" />
          Search hair, wigs and services
        </button>
      </div>

      <nav aria-label="Mobile" className="px-6">
        <ul className="border-t border-line">
          {primaryNav.map((item) => {
            const isOpen = expanded === item.label;
            return (
              <li key={item.label} className="border-b border-line">
                {item.columns ? (
                  <>
                    <button
                      type="button"
                      onClick={() => setExpanded(isOpen ? null : item.label)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between py-4 text-left"
                    >
                      <span className="font-display text-[26px] leading-none">{item.label}</span>
                      <ChevronDownIcon
                        className={cx(
                          "h-4 w-4 text-muted transition-transform duration-[350ms] ease-lux",
                          isOpen && "rotate-180",
                        )}
                      />
                    </button>
                    <div hidden={!isOpen} className="pb-5">
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className="link-underline mb-4 inline-block text-[11px] font-medium uppercase tracking-[0.14em] text-gold"
                      >
                        View all {item.label.toLowerCase()}
                      </Link>
                      {item.columns.map((column) => (
                        <div key={column.heading} className="mb-4 last:mb-0">
                          <p className="eyebrow mb-2.5">{column.heading}</p>
                          <ul className="flex flex-col gap-2.5">
                            {column.links.map((link) => (
                              <li key={link.href + link.label}>
                                <Link
                                  href={link.href}
                                  onClick={onClose}
                                  className="text-[14px] text-ink-soft"
                                >
                                  {link.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="block py-4 font-display text-[26px] leading-none"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>

        <ul className="mt-6 flex flex-col gap-3 pb-8">
          {[
            { label: "Contact", href: "/contact" },
            { label: "FAQs", href: "/faqs" },
            { label: "Shipping & Returns", href: "/help/shipping" },
            { label: "Hair Care", href: "/help/hair-care" },
          ].map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={onClose}
                className="text-[12px] uppercase tracking-[0.12em] text-muted"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </Drawer>
  );
}
