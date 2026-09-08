"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cx } from "@/lib/format";
import { useScrolledPast } from "@/lib/hooks";
import { CalendarIcon } from "@/components/ui/Icons";

/**
 * Persistent mobile booking CTA. Hidden on the booking and checkout flows,
 * and on product pages where the sticky add-to-cart bar takes priority.
 */
export function StickyMobileCTA() {
  const pathname = usePathname();
  const visible = useScrolledPast(420);

  const hidden =
    pathname.startsWith("/book") ||
    pathname.startsWith("/checkout") ||
    pathname.startsWith("/products/") ||
    pathname.startsWith("/cart");

  if (hidden) return null;

  return (
    <div
      className={cx(
        "fixed inset-x-0 bottom-0 z-[70] border-t border-line bg-background/95 px-5 pb-[calc(env(safe-area-inset-bottom)+12px)] pt-3 backdrop-blur-md transition-[transform,opacity] duration-[350ms] ease-lux xl:hidden",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-full opacity-0",
      )}
    >
      <Link
        href="/book"
        className="flex h-[52px] w-full items-center justify-center gap-2.5 rounded-subtle bg-gold text-[12px] font-medium uppercase tracking-[0.12em] text-black transition-colors duration-[350ms] ease-lux hover:bg-gold-light"
      >
        <CalendarIcon className="h-4 w-4" />
        Book Appointment
      </Link>
    </div>
  );
}
