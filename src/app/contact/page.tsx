import { design } from "@/lib/design";
import { pageMeta } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Reveal } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/ui/JsonLd";
import { ButtonLink } from "@/components/ui/Button";
import { EditorialImage, ImageFrame } from "@/components/media/EditorialImage";
import { ContactForm } from "./ContactForm";
import { InstagramIcon, PinIcon, WhatsAppIcon } from "@/components/ui/Icons";

export const metadata = pageMeta({
  title: "Contact",
  description:
    "Get in touch with Adeolagold Beauty Studio — studio address, opening hours, WhatsApp, email and a direct enquiry form.",
  path: "/contact",
});

const crumbs = [
  { label: "Home", href: "/" },
  { label: "Contact", href: "/contact" },
];

export default function ContactPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />

      <div className="container-page pb-24">
        <Breadcrumbs crumbs={crumbs} className="py-8" />

        <header className="grid gap-10 pb-14 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-6">
            <p className="eyebrow mb-5">Contact</p>
            <h1 className="display-1 max-w-[12ch]">Let&rsquo;s talk hair.</h1>
          </Reveal>
          <Reveal delay={100} className="lg:col-span-5 lg:col-start-8">
            <p className="body-lg max-w-lg">
              Questions about a unit, an order or an appointment — or you want something sourced
              that is not on the site. We answer everything within 24 hours.
            </p>
          </Reveal>
        </header>

        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <ContactForm />
          </div>

          <aside className="lg:col-span-4 lg:col-start-9">
            <ImageFrame ratio="4/5">
              <EditorialImage
                seed="contact-studio"
                alt="The entrance to Adeolagold Beauty Studio"
                tone="studio"
                sizes="(min-width: 1024px) 32vw, 92vw"
              />
            </ImageFrame>

            <div className="mt-8 flex flex-col gap-7">
              <div>
                <p className="eyebrow mb-3">The studio</p>
                <address className="not-italic text-[14px] leading-relaxed text-ink-soft">
                  {design.brand.location.displayLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </address>
                <p className="mt-3 text-[13px] leading-relaxed text-muted">
                  {design.brand.location.note}
                </p>
              </div>

              <div>
                <p className="eyebrow mb-3">Direct</p>
                <ul className="flex flex-col gap-2 text-[14px] text-ink-soft">
                  <li>
                    <a href={`mailto:${design.brand.email}`} className="link-underline">
                      {design.brand.email}
                    </a>
                  </li>
                  <li>
                    <a
                      href={`tel:${design.brand.phoneE164}`}
                      className="link-underline"
                    >
                      {design.brand.phone}
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <p className="eyebrow mb-3">Opening hours</p>
                <dl className="flex flex-col gap-2 text-[13.5px] text-ink-soft">
                  {design.brand.hours.map((slot) => (
                    <div
                      key={slot.days}
                      className="flex justify-between gap-4 border-b border-line pb-2"
                    >
                      <dt>{slot.days}</dt>
                      <dd className="tabular-nums">{slot.time}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="flex flex-col gap-3">
                <ButtonLink
                  href={`https://wa.me/${design.brand.phoneE164.replace(/[^0-9]/g, "")}`}
                  variant="secondary"
                  fullWidth
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  WhatsApp the studio
                </ButtonLink>
                <ButtonLink
                  href={design.brand.social.instagram.url}
                  variant="ghost"
                  fullWidth
                >
                  <InstagramIcon className="h-4 w-4" />
                  {design.brand.social.instagram.handle}
                </ButtonLink>
                <ButtonLink href="/book" fullWidth>
                  <PinIcon className="h-4 w-4" />
                  Book an appointment
                </ButtonLink>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
