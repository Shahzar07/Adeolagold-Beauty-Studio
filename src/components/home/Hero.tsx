import { EditorialImage } from "@/components/media/EditorialImage";
import { ButtonLink } from "@/components/ui/Button";
import { ArrowRightIcon, PinIcon } from "@/components/ui/Icons";
import { design } from "@/lib/design";

/**
 * Editorial hero — asymmetric split on desktop (type left, full-bleed image
 * right), stacked on mobile. Deliberately little text over the image.
 */
export function Hero() {
  return (
    <section className="relative bg-background" aria-labelledby="hero-heading">
      <div className="lg:grid lg:min-h-[calc(100svh-88px)] lg:grid-cols-12 lg:items-stretch">
        {/* Type */}
        <div className="order-2 col-span-5 flex flex-col justify-center lg:order-1 xl:col-span-5">
          <div className="container-page py-14 lg:max-w-none lg:py-20 lg:pl-[max(var(--page-padding),calc((100vw-1440px)/2+var(--page-padding)))] lg:pr-14">
            <p className="eyebrow animate-fade-up">Adeolagold Beauty Studio</p>

            <h1
              id="hero-heading"
              className="display-1 animate-fade-up mt-6 max-w-[13ch]"
              style={{ animationDelay: "80ms" }}
            >
              The art of
              <br />
              beautiful <em className="not-italic text-gold">hair</em>
            </h1>

            <p
              className="body-lg animate-fade-up mt-7 max-w-[42ch]"
              style={{ animationDelay: "160ms" }}
            >
              Premium hair, luxury wigs and expert beauty services designed to make you feel
              effortlessly confident.
            </p>

            <div
              className="animate-fade-up mt-10 flex flex-col gap-3 sm:flex-row"
              style={{ animationDelay: "240ms" }}
            >
              <ButtonLink href="/shop" className="sm:min-w-[190px]">
                Shop Hair
              </ButtonLink>
              <ButtonLink href="/book" variant="secondary" className="sm:min-w-[210px]">
                Book an Appointment
              </ButtonLink>
            </div>

            <a
              href={design.brand.location.mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="animate-fade-up group mt-7 inline-flex items-center gap-2.5 text-[12px] text-ink-soft transition-colors duration-[180ms] hover:text-gold"
              style={{ animationDelay: "280ms" }}
            >
              <PinIcon className="h-4 w-4 shrink-0 text-gold" />
              <span className="link-underline">{design.brand.location.oneLine}</span>
            </a>

            <dl
              className="animate-fade-up mt-14 grid max-w-lg grid-cols-3 gap-6 border-t border-line pt-7"
              style={{ animationDelay: "320ms" }}
            >
              {/* Claims, not metrics — the studio publishes no client count or
                  rating, so none are invented here. */}
              {[
                { value: "Raw & virgin", label: "Human hair, always" },
                { value: "One at a time", label: "Private studio, by appointment" },
                { value: "UK-wide", label: "Delivery on every order" },
              ].map((stat) => (
                <div key={stat.label}>
                  <dt className="sr-only">{stat.label}</dt>
                  <dd>
                    <span className="block font-display text-[22px] leading-tight">
                      {stat.value}
                    </span>
                    <span className="mt-2 block text-[11px] leading-snug text-muted">
                      {stat.label}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {/* Image */}
        <div className="relative order-1 col-span-7 lg:order-2 xl:col-span-7">
          <div className="relative h-[62svh] min-h-[380px] overflow-hidden bg-surface lg:h-full">
            <div className="grain absolute inset-0">
              <EditorialImage
                seed="hero-campaign-primary"
                alt="Editorial beauty portrait of a model with a full natural afro, photographed against a soft grey ground"
                tone="portrait"
                sizes="(min-width: 1024px) 58vw, 100vw"
                priority
              />
            </div>

            {/* Scrim so the corner caption stays legible over the photograph. */}
            <div
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/70 via-black/25 to-transparent"
            />

            {/* Corner caption — the only type over the image. */}
            <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4 lg:bottom-8 lg:left-8 lg:right-8">
              <p className="max-w-[26ch] text-[11px] font-medium uppercase leading-relaxed tracking-[0.16em] text-white/85">
                The Studio — {design.brand.location.oneLine}
              </p>
              <a
                href="#the-edit"
                className="group inline-flex shrink-0 items-center gap-2 text-[10.5px] font-medium uppercase tracking-[0.16em] text-white/80 transition-colors hover:text-white max-sm:hidden"
              >
                Discover
                <ArrowRightIcon className="h-3.5 w-3.5 rotate-90 transition-transform duration-[350ms] ease-lux group-hover:translate-y-1" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
