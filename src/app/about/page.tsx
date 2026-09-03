import { pageMeta } from "@/lib/seo";
import { design } from "@/lib/design";
import { breadcrumbSchema } from "@/lib/schema";
import { pillars } from "@/lib/content";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { JsonLd } from "@/components/ui/JsonLd";
import { EditorialImage, ImageFrame } from "@/components/media/EditorialImage";
import { Testimonials } from "@/components/home/Testimonials";
import { InstagramGrid } from "@/components/home/InstagramGrid";

export const metadata = pageMeta({
  title: "Our Story",
  description:
    "Adeolagold Beauty Studio was created for women who believe beautiful hair should feel as exceptional as it looks. Meet the studio, the standards and the founder behind it.",
  path: "/about",
});

const crumbs = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
];

/**
 * The studio's own published account of how it works. Deliberately not a dated
 * timeline: no founding dates or client counts are published anywhere, so none
 * are invented here.
 */
const experience = [
  {
    number: "01",
    title: "Private studio experience",
    copy: "Every appointment is held at our discreet, appointment-only studio in Dagenham, Essex — a calm, comfortable and professional space created entirely for you.",
  },
  {
    number: "02",
    title: "One-to-one, unhurried",
    copy: "Each session is completely one-to-one. We are appointment-only, so every client has our full, undivided attention from start to finish.",
  },
  {
    number: "03",
    title: "Exceptional human hair",
    copy: "We specialise in sourcing raw and virgin human hair from trusted suppliers worldwide — a range of textures, lengths and custom options, selected for their natural beauty and longevity.",
  },
  {
    number: "04",
    title: "UK-wide online orders",
    copy: "Not local to Essex? Our premium human hair, custom wigs, frontals and closures ship nationwide, carefully packaged and dispatched promptly.",
  },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />

      <div className="container-page">
        <Breadcrumbs crumbs={crumbs} className="py-8" />

        {/* Opening statement */}
        <header className="grid gap-10 pb-16 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-7">
            <p className="eyebrow mb-5">Our story</p>
            <h1 className="display-1 max-w-[12ch]">Beauty, with intention.</h1>
          </Reveal>
          <Reveal delay={100} className="lg:col-span-4 lg:col-start-9">
            <p className="body-lg">
              Adeolagold Beauty Studio was created for women who believe beautiful hair should feel
              as exceptional as it looks.
            </p>
          </Reveal>
        </header>
      </div>

      {/* Full-bleed studio image */}
      <Reveal>
        <div className="grain relative h-[46svh] min-h-[320px] overflow-hidden bg-surface lg:h-[64svh]">
          <EditorialImage
            seed="about-studio-wide"
            alt="A client photographed with a full-length install"
            tone="studio"
            sizes="100vw"
            priority
          />
        </div>
      </Reveal>

      {/* Narrative */}
      <section className="section" aria-labelledby="about-narrative">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-5">
              <h2 id="about-narrative" className="display-3 max-w-[16ch]">
                Every woman deserves to feel extraordinary.
              </h2>
            </Reveal>

            <Reveal delay={100} className="flex flex-col gap-5 lg:col-span-6 lg:col-start-7">
              <p className="text-[15.5px] leading-[1.78] text-ink-soft">
                Adeolagold Beauty Studio was founded on a simple but powerful belief: every woman
                deserves to walk away from a beauty appointment feeling absolutely extraordinary.
                From the very first appointment, we set out to create an experience that combines
                luxury, expertise and genuine warmth.
              </p>
              <p className="text-[15.5px] leading-[1.78] text-ink-soft">
                We have had the privilege of working with hundreds of incredible women, building
                not just beautiful looks but lasting relationships rooted in trust, consistency and
                care. We specialise in sourcing raw and virgin human hair from trusted suppliers
                around the world — curating a collection of exceptional textures, lengths and
                custom options so every client leaves with hair that feels entirely their own.
              </p>
              <p className="text-[15.5px] leading-[1.78] text-ink-soft">
                All appointments take place at our private, appointment-only studio in Essex — a
                calm, professional and discreet space created entirely for you. Each session is
                completely one-to-one, so your experience feels personal, luxurious and unhurried.
              </p>

              <blockquote className="mt-4 border-l border-gold pl-6">
                <p className="font-display text-[clamp(1.35rem,2.4vw,1.85rem)] leading-[1.28] tracking-[-0.018em]">
                  “At Adeolagold, you are never just a client. You are a woman who deserves to be
                  seen, heard and cared for.”
                </p>
                <footer className="mt-4 text-[11px] uppercase tracking-[0.16em] text-muted">
                  Adeolagold Beauty Studio
                </footer>
              </blockquote>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Founder portrait pair */}
      <section className="section-sm" aria-label="In the studio">
        <div className="container-page">
          <div className="grid gap-6 md:grid-cols-12">
            <Reveal className="md:col-span-7">
              <ImageFrame ratio="4/5">
                <EditorialImage
                  seed="about-founder-portrait"
                  alt="Editorial portrait of a client wearing a braided style"
                  tone="portrait"
                  sizes="(min-width: 768px) 56vw, 100vw"
                />
              </ImageFrame>
            </Reveal>
            <Reveal delay={120} className="flex flex-col justify-end gap-6 md:col-span-4 md:col-start-9">
              <ImageFrame ratio="1/1">
                <EditorialImage
                  seed="about-hands"
                  alt="Close-up of hands working through hair"
                  tone="detail"
                  sizes="(min-width: 768px) 30vw, 100vw"
                />
              </ImageFrame>
              <p className="text-[13.5px] leading-relaxed text-muted">
                Every unit is checked by hand before it leaves the studio — once at the cap,
                once at the cut.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* The experience */}
      <section className="section border-y border-line" aria-labelledby="experience-heading">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-4">
              <p className="eyebrow mb-5">What to expect</p>
              <h2 id="experience-heading" className="display-2 max-w-[10ch]">
                One client at a time.
              </h2>
            </Reveal>

            <div className="lg:col-span-7 lg:col-start-6">
              <ol className="border-t border-line">
                {experience.map((entry, index) => (
                  <Reveal key={entry.number} as="li" delay={index * 80}>
                    <div className="grid gap-3 border-b border-line py-7 sm:grid-cols-[90px_1fr] sm:gap-8">
                      <p className="font-display text-[20px] leading-none text-gold">
                        {entry.number}
                      </p>
                      <div>
                        <h3 className="font-sans text-[12px] font-medium uppercase tracking-[0.16em] text-ink">
                          {entry.title}
                        </h3>
                        <p className="mt-2.5 max-w-[54ch] text-[14px] leading-relaxed text-ink-soft">
                          {entry.copy}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* Standards */}
      <section className="section" aria-labelledby="standards-heading">
        <div className="container-page">
          <Reveal>
            <p className="eyebrow mb-5">What we never compromise on</p>
            <h2 id="standards-heading" className="display-2 mb-14 max-w-[14ch]">
              Four standards.
            </h2>
          </Reveal>

          <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((pillar, index) => (
              <Reveal key={pillar.number} delay={index * 80}>
                <div className="flex items-baseline gap-4">
                  <span className="font-display text-[15px] text-gold">{pillar.number}</span>
                  <span className="h-px flex-1 bg-line" aria-hidden="true" />
                </div>
                <h3 className="mt-5 font-sans text-[12px] font-medium uppercase tracking-[0.16em] text-ink">
                  {pillar.title}
                </h3>
                <p className="mt-3 text-[14px] leading-relaxed text-ink-soft">{pillar.copy}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={200} className="mt-16 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/book" className="sm:min-w-[210px]">
              Book an appointment
            </ButtonLink>
            <ButtonLink href="/shop" variant="secondary" className="sm:min-w-[190px]">
              Shop the hair
            </ButtonLink>
          </Reveal>
        </div>
      </section>

      <Testimonials />

      {/* Visit */}
      <section className="section-sm border-t border-line" aria-labelledby="visit-heading">
        <div className="container-page grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <p className="eyebrow mb-5">Visit</p>
            <h2 id="visit-heading" className="display-3">
              The studio
            </h2>
          </Reveal>
          <Reveal delay={100} className="lg:col-span-3">
            <address className="not-italic text-[14.5px] leading-relaxed text-ink-soft">
              {design.brand.location.displayLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>
            <p className="mt-3 text-[13px] leading-relaxed text-muted">
              {design.brand.location.note}
            </p>
          </Reveal>
          <Reveal delay={160} className="lg:col-span-4 lg:col-start-9">
            <dl className="flex flex-col gap-2 text-[13.5px] text-ink-soft">
              {design.brand.hours.map((slot) => (
                <div key={slot.days} className="flex justify-between gap-6 border-b border-line pb-2">
                  <dt>{slot.days}</dt>
                  <dd className="tabular-nums">{slot.time}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      <InstagramGrid />
    </>
  );
}
