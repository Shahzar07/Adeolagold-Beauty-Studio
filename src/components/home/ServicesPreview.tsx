import { services } from "@/lib/services";
import { formatPrice } from "@/lib/format";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceRows } from "@/components/services/ServiceRows";
import { EditorialImage, ImageFrame } from "@/components/media/EditorialImage";
import { Reveal } from "@/components/ui/Reveal";

export function ServicesPreview() {
  return (
    <section className="section" aria-labelledby="services-preview-heading">
      <div className="container-page">
        <SectionHeading
          eyebrow="In the studio"
          title="The service menu"
          subtitle="One client at a time, a consultation before every appointment, and prices quoted honestly up front."
          link={{ label: "All services", href: "/services" }}
          className="mb-14"
        />

        <div className="grid gap-14 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <ServiceRows services={services} />
          </div>

          <Reveal delay={120} className="lg:col-span-4 lg:col-start-9">
            <ImageFrame ratio="4/5">
              <EditorialImage
                seed="services-studio"
                alt="The Adeolagold studio prepared for a client appointment"
                tone="studio"
                sizes="(min-width: 1024px) 32vw, 92vw"
              />
            </ImageFrame>
            <div className="mt-7 border-t border-line pt-6">
              <p className="eyebrow mb-3">Deposits</p>
              <p className="text-[14px] leading-relaxed text-ink-soft">
                Every appointment is secured with a deposit from{" "}
                {formatPrice(services[services.length - 1].depositPence)}, deducted from your
                balance on the day. Reschedule free of charge with 48 hours&rsquo; notice.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
