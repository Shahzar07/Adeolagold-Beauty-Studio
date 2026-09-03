import { EditorialImage } from "@/components/media/EditorialImage";
import { ButtonLink } from "@/components/ui/Button";
import { ArrowRightIcon } from "@/components/ui/Icons";

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

            <dl
              className="animate-fade-up mt-14 grid max-w-lg grid-cols-3 gap-6 border-t border-line pt-7"
              style={{ animationDelay: "320ms" }}
            >
              {[
                { value: "Single", label: "Donor hair, always" },
                { value: "2,400+", label: "Clients served" },
                { value: "4.9", label: "Average rating" },
              ].map((stat) => (
                <div key={stat.label}>
                  <dt className="sr-only">{stat.label}</dt>
                  <dd>
                    <span className="block font-display text-[26px] leading-none">
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
                alt="Close-up editorial portrait of a client wearing a hand-finished Adeolagold wig"
                tone="portrait"
                sizes="(min-width: 1024px) 58vw, 100vw"
                priority
              />
            </div>

            {/* Corner caption — the only type over the image. */}
            <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4 lg:bottom-8 lg:left-8 lg:right-8">
              <p className="max-w-[24ch] text-[11px] font-medium uppercase leading-relaxed tracking-[0.16em] text-white/80">
                Autumn Campaign — Signature HD Frontal
              </p>
              <a
                href="#the-edit"
                className="group hidden shrink-0 items-center gap-2 text-[10.5px] font-medium uppercase tracking-[0.16em] text-white/80 transition-colors hover:text-white sm:inline-flex"
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
