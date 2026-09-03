import { services } from "@/lib/services";
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
          subtitle="One client at a time, in a private appointment-only studio, with every service quoted honestly at consultation."
          link={{ label: "All services", href: "/services" }}
          className="mb-14"
        />

        <div className="grid gap-14 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <ServiceRows services={services.slice(0, 6)} />
          </div>

          <Reveal delay={120} className="lg:col-span-4 lg:col-start-9">
            <ImageFrame ratio="4/5">
              <EditorialImage
                seed="services-studio"
                alt="Styling tools laid out for an appointment"
                tone="studio"
                sizes="(min-width: 1024px) 32vw, 92vw"
              />
            </ImageFrame>
            <div className="mt-7 border-t border-line pt-6">
              <p className="eyebrow mb-3">Booking</p>
              <p className="text-[14px] leading-relaxed text-ink-soft">
                Every service is quoted at consultation and secured with a deposit, deducted
                from your balance on the day. We confirm within 24 hours, and you can
                reschedule free of charge with 48 hours&rsquo; notice.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
