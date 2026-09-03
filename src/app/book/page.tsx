import { pageMeta } from "@/lib/seo";
import { design } from "@/lib/design";
import { breadcrumbSchema } from "@/lib/schema";
import { BookingForm } from "@/components/booking/BookingForm";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Reveal } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/ui/JsonLd";
import { EditorialImage, ImageFrame } from "@/components/media/EditorialImage";

export const metadata = pageMeta({
  title: "Book an Appointment",
  description:
    "Book your next appointment at Adeolagold Beauty Studio — wig installation, revamps, braiding, silk press, microblading and makeup. Choose a service, date and time in under a minute; we confirm within 24 hours.",
  path: "/book",
});

const crumbs = [
  { label: "Home", href: "/" },
  { label: "Book", href: "/book" },
];

export default async function BookPage({
  searchParams,
}: {
  searchParams: Promise<{ service?: string }>;
}) {
  const { service } = await searchParams;

  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />

      <div className="container-page">
        <Breadcrumbs crumbs={crumbs} className="py-8" />

        <header className="grid gap-10 pb-14 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-6">
            <p className="eyebrow mb-5">Appointments</p>
            <h1 className="display-1 max-w-[13ch]">Your next look starts here.</h1>
          </Reveal>
          <Reveal delay={100} className="lg:col-span-5 lg:col-start-8">
            <p className="body-lg max-w-lg">
              Five steps, under a minute. Choose your service, pick a time that works, and secure
              it with a deposit — deducted from your balance on the day.
            </p>
          </Reveal>
        </header>

        <div className="grid gap-14 pb-24 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-8">
            <BookingForm initialService={service} />
          </div>

          <aside className="lg:col-span-3 lg:col-start-10">
            <div className="lg:sticky lg:top-[104px]">
              <ImageFrame ratio="4/5">
                <EditorialImage
                  seed="booking-studio"
                  alt="The Adeolagold studio, set up for an appointment"
                  tone="studio"
                  sizes="(min-width: 1024px) 26vw, 92vw"
                />
              </ImageFrame>

              <div className="mt-7 border-t border-line pt-6">
                <p className="eyebrow mb-4">The studio</p>
                <address className="not-italic text-[13.5px] leading-relaxed text-ink-soft">
                  {design.brand.location.displayLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </address>
                <p className="mt-3 text-[12.5px] leading-relaxed text-muted">
                  {design.brand.location.note}
                </p>
                <dl className="mt-5 flex flex-col gap-2 text-[12.5px] text-muted">
                  {design.brand.hours.map((slot) => (
                    <div key={slot.days} className="flex justify-between gap-4">
                      <dt>{slot.days}</dt>
                      <dd className="tabular-nums">{slot.time}</dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-6 text-[12.5px] leading-relaxed text-muted">
                  Need to reschedule? Free of charge with more than 48 hours&rsquo; notice, using
                  the link in your confirmation email.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
