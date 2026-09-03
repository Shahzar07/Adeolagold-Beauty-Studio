import { EditorialImage } from "@/components/media/EditorialImage";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export function CampaignBanner() {
  return (
    <section className="relative" aria-labelledby="campaign-heading">
      <div className="relative min-h-[560px] overflow-hidden bg-ink lg:min-h-[76svh]">
        <div className="grain absolute inset-0">
          <EditorialImage
            seed="campaign-signature"
            alt="Editorial beauty portrait photographed under studio light"
            tone="campaign"
            sizes="100vw"
          />
        </div>

        {/* Scrim: keeps type legible without flattening the image. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-black/72 via-black/40 to-transparent"
        />

        <div className="container-wide relative flex min-h-[560px] items-center py-20 lg:min-h-[76svh]">
          <Reveal className="max-w-xl">
            <p className="eyebrow mb-6 text-white/55">The experience</p>
            <h2
              id="campaign-heading"
              className="font-display text-[clamp(2.5rem,5.6vw,4.5rem)] leading-[1.02] tracking-[-0.028em] text-white"
            >
              Your hair.
              <br />
              Your signature.
            </h2>
            <p className="mt-7 max-w-md text-[15.5px] leading-[1.75] text-white/70">
              From first appointment to final finish, every Adeolagold experience is created
              around you — your texture, your face shape, your life.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/services" variant="gold" className="sm:min-w-[220px]">
                Discover Our Services
              </ButtonLink>
              <ButtonLink href="/book" variant="onDark" className="sm:min-w-[190px]">
                Book Now
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
