import Link from "next/link";
import { design } from "@/lib/design";
import { footerColumns } from "@/lib/navigation";
import { Newsletter } from "./Newsletter";
import {
  InstagramIcon,
  PinIcon,
  TikTokIcon,
  WhatsAppIcon,
} from "@/components/ui/Icons";

const paymentMethods = ["Visa", "Mastercard", "Amex", "PayPal", "Apple Pay", "Klarna", "Bank Transfer"];

export function Footer() {
  return (
    <footer className="mt-auto border-t border-line bg-surface text-white">
      <div className="container-wide">
        {/* Newsletter */}
        <div className="grid gap-10 border-b border-white/10 py-16 lg:grid-cols-2 lg:gap-20 lg:py-20">
          <div>
            <h2 className="font-display text-[clamp(2rem,3.4vw,2.9rem)] leading-[1.06] tracking-[-0.02em]">
              Enter the Adeolagold world
            </h2>
            <p className="mt-4 max-w-md text-[14.5px] leading-relaxed text-white/60">
              Sign up for new drops, beauty tips and exclusive offers — plus first access to
              appointment slots when the diary opens.
            </p>
          </div>
          <div className="lg:pt-3">
            <Newsletter />
          </div>
        </div>

        {/* Link columns */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 py-14 md:grid-cols-4 lg:grid-cols-6 lg:py-16">
          {footerColumns.map((column) => (
            <nav key={column.heading} aria-label={column.heading}>
              <h3 className="mb-5 text-[10.5px] font-medium uppercase tracking-[0.18em] text-white/45">
                {column.heading}
              </h3>
              <ul className="flex flex-col gap-3">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="link-underline text-[13.5px] text-white/80 transition-colors duration-[180ms] hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className="col-span-2">
            <h3 className="mb-5 text-[10.5px] font-medium uppercase tracking-[0.18em] text-white/45">
              The Studio
            </h3>
            <address className="not-italic text-[13.5px] leading-relaxed text-white/80">
              {design.brand.address.street}
              <br />
              {design.brand.address.locality}
              <br />
              {design.brand.address.region} {design.brand.address.postalCode}
              <br />
              <a
                href={design.brand.address.mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="link-underline mt-2 inline-block text-gold"
              >
                Get directions
              </a>
              <br />
              <a href={`tel:${design.brand.phone.replace(/\s/g, "")}`} className="link-underline mt-2 inline-block">
                {design.brand.phone}
              </a>
              <br />
              <a href={`mailto:${design.brand.email}`} className="link-underline">
                {design.brand.email}
              </a>
            </address>
            <dl className="mt-5 flex flex-col gap-1.5 text-[12.5px] text-white/55">
              {design.brand.hours.map((slot) => (
                <div key={slot.days} className="flex justify-between gap-4">
                  <dt>{slot.days}</dt>
                  <dd className="tabular-nums">{slot.time}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {/* Base bar */}
        <div className="flex flex-col gap-8 border-t border-white/10 py-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-1">
            <a
              href={design.brand.instagramUrl}
              aria-label="Adeolagold on Instagram"
              className="-ml-2.5 flex h-11 w-11 items-center justify-center text-white/70 transition-colors duration-[180ms] hover:text-gold"
            >
              <InstagramIcon className="h-[18px] w-[18px]" />
            </a>
            <a
              href={design.brand.tiktokUrl}
              aria-label="Adeolagold on TikTok"
              className="flex h-11 w-11 items-center justify-center text-white/70 transition-colors duration-[180ms] hover:text-gold"
            >
              <TikTokIcon className="h-[18px] w-[18px]" />
            </a>
            <a
              href={`https://wa.me/${design.brand.phone.replace(/[^0-9]/g, "")}`}
              aria-label="Message the studio on WhatsApp"
              className="flex h-11 w-11 items-center justify-center text-white/70 transition-colors duration-[180ms] hover:text-gold"
            >
              <WhatsAppIcon className="h-[18px] w-[18px]" />
            </a>
            <Link
              href="/contact"
              aria-label="Find the studio"
              className="flex h-11 w-11 items-center justify-center text-white/70 transition-colors duration-[180ms] hover:text-gold"
            >
              <PinIcon className="h-[18px] w-[18px]" />
            </Link>
          </div>

          <ul className="flex flex-wrap items-center gap-2" aria-label="Accepted payment methods">
            {paymentMethods.map((method) => (
              <li
                key={method}
                className="rounded-subtle border border-white/15 px-2.5 py-1.5 text-[9.5px] font-medium uppercase tracking-[0.1em] text-white/50"
              >
                {method}
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[11.5px] text-white/40">
            <p>
              © {new Date().getFullYear()} {design.brand.name}
            </p>
            <Link href="/help/returns" className="link-underline hover:text-white/70">
              Terms
            </Link>
            <Link href="/help/booking-policy" className="link-underline hover:text-white/70">
              Privacy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
