import { instagramPosts } from "@/lib/content";
import { design } from "@/lib/design";
import { EditorialImage, ImageFrame } from "@/components/media/EditorialImage";
import { Reveal } from "@/components/ui/Reveal";
import { InstagramIcon } from "@/components/ui/Icons";

const tones = ["portrait", "detail", "texture", "campaign", "studio", "product"] as const;

export function InstagramGrid() {
  return (
    <section className="section-sm" aria-labelledby="instagram-heading">
      <div className="container-wide">
        <div className="mb-10 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="eyebrow mb-5">Social</p>
            <h2 id="instagram-heading" className="display-3">
              Follow the Adeolagold world
            </h2>
          </div>
          <a
            href={design.brand.social.instagram.url}
            className="link-underline inline-flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.14em] text-ink"
          >
            <InstagramIcon className="h-4 w-4" />
            {design.brand.social.instagram.handle}
          </a>
        </div>

        <ul className="grid grid-cols-2 gap-1.5 sm:grid-cols-4 lg:grid-cols-8">
          {instagramPosts.map((post, index) => (
            <Reveal key={post.seed} as="li" delay={Math.min(index, 7) * 55}>
              <a
                href={design.brand.social.instagram.url}
                className="group relative block"
                aria-label={`${post.caption} — view on Instagram`}
              >
                <ImageFrame ratio="1/1" zoomOnGroupHover>
                  <EditorialImage
                    seed={post.seed}
                    alt={post.alt}
                    tone={tones[index % tones.length]}
                    sizes="(min-width: 1024px) 12vw, (min-width: 640px) 24vw, 48vw"
                  />
                </ImageFrame>
                <span
                  aria-hidden="true"
                  className="absolute inset-0 flex items-center justify-center bg-black/55 opacity-0 transition-opacity duration-[350ms] ease-lux group-hover:opacity-100"
                >
                  <InstagramIcon className="h-5 w-5 text-white" />
                </span>
              </a>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
