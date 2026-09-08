import { services } from "@/lib/services";
import { pageMeta } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";
import { formatPrice } from "@/lib/format";
import { ServiceRows } from "@/components/services/ServiceRows";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { JsonLd } from "@/components/ui/JsonLd";
import { EditorialImage, ImageFrame } from "@/components/media/EditorialImage";
import { Testimonials } from "@/components/home/Testimonials";
import { CheckIcon } from "@/components/ui/Icons";

export const metadata = pageMeta({
  title: "Services",
  description:
    "Wig installation, revamping, braiding, sew-ins, custom wig styling and consultations at Adeolagold Beauty Studio, 598 Holly Lane, Goodmayes IG3 9BF. Prices, durations and what each service includes.",
  path: "/services",
});

const crumbs = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
];

const promises = [
  "One client at a time — never double-booked",
  "A consultation before every appointment",
  "Prices quoted honestly up front",
  "Aftercare included with every service",
];

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />

      <div className="container-page">
        <Breadcrumbs crumbs={crumbs} className="py-8" />

        <header className="pb-14">
          <Reveal className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-6">
              <p className="eyebrow mb-5">The studio</p>
              <h1 className="display-1 max-w-[11ch]">The service menu.</h1>
            </div>
            <div className="lg:col-span-5 lg:col-start-8">
              <p className="body-lg max-w-lg">
                Every appointment starts with a conversation about your hair, your hairline and
                how you actually live. The service follows from that — not the other way round.
              </p>
            </div>
          </Reveal>
        </header>

        <Reveal>
          <ImageFrame ratio="16/9" className="mb-16">
            <EditorialImage
              seed="services-hero"
              alt="The Adeolagold studio during an appointment"
              tone="studio"
              sizes="100vw"
              priority
            />
          </ImageFrame>
        </Reveal>

        <div className="grid gap-14 pb-20 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <ServiceRows services={services} defaultOpen={0} />
          </div>

          <aside className="lg:col-span-3 lg:col-start-10">
            <div className="lg:sticky lg:top-[104px]">
              <p className="eyebrow mb-5">Our promise</p>
              <ul className="flex flex-col gap-3">
                {promises.map((promise) => (
                  <li key={promise} className="flex gap-3 text-[13.5px] leading-relaxed text-ink-soft">
                    <CheckIcon className="mt-1 h-3.5 w-3.5 shrink-0 text-gold" />
                    {promise}
                  </li>
                ))}
              </ul>

              <div className="mt-8 border-t border-line pt-6">
                <p className="text-[13.5px] leading-relaxed text-ink-soft">
                  Not sure which service you need? A {formatPrice(2500)} consultation is redeemed
                  against your first booking.
                </p>
                <ButtonLink href="/book" className="mt-6" fullWidth>
                  Book an appointment
                </ButtonLink>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <Testimonials />
    </>
  );
}
