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
                  alt="Adeola, founder of Adeolagold Beauty Studio, in the studio"
                  tone="portrait"
                  sizes="(min-width: 1024px) 40vw, 76vw"
                />
              </ImageFrame>
              <div className="absolute -bottom-10 right-0 w-[46%] lg:-bottom-14">
                <ImageFrame ratio="1/1">
                  <EditorialImage
                    seed="about-detail"
                    alt="Hands finishing a hairline in the studio"
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
              What began with one chair and a reputation built entirely on referrals is now a
              studio, a workshop and a hair line — still run on the same principle. Take fewer
              clients. Do the work properly. Tell the truth about what hair can and cannot do.
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
