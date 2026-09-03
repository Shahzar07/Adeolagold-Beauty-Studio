import { EditorialImage, ImageFrame } from "@/components/media/EditorialImage";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export function AboutPreview() {
  return (
    <section className="section" aria-labelledby="about-preview-heading">
      <div className="container-page">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Overlapping editorial image pair */}
          <Reveal className="lg:col-span-6">
            <div className="relative">
              <ImageFrame ratio="4/5" className="w-[82%]">
                <EditorialImage
                  seed="about-founder"
                  alt="Editorial portrait of a client after a studio appointment"
                  tone="portrait"
                  sizes="(min-width: 1024px) 40vw, 76vw"
                />
              </ImageFrame>
              <div className="absolute -bottom-10 right-0 w-[46%] lg:-bottom-14">
                <ImageFrame ratio="1/1">
                  <EditorialImage
                    seed="about-detail"
                    alt="Close-up of a finished braided style"
                    tone="detail"
                    sizes="(min-width: 1024px) 22vw, 42vw"
                  />
                </ImageFrame>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120} className="lg:col-span-5 lg:col-start-8 max-lg:mt-14">
            <p className="eyebrow mb-6">Our story</p>
            <h2 id="about-preview-heading" className="display-2 max-w-[13ch]">
              Beauty, with intention.
            </h2>
            <p className="body-lg mt-7">
              Adeolagold Beauty Studio was created for women who believe beautiful hair should feel
              as exceptional as it looks.
            </p>
            <p className="mt-5 text-[14.5px] leading-relaxed text-muted">
              Every appointment takes place at our private, appointment-only studio in Essex — a
              calm, discreet space where the session is entirely one-to-one. We source raw and
              virgin human hair from trusted suppliers worldwide, and deliver UK-wide.
            </p>
            <ButtonLink href="/about" variant="secondary" className="mt-9">
              Read our story
            </ButtonLink>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
