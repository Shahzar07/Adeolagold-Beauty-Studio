import Link from "next/link";
import { categoryTiles } from "@/lib/content";
import { EditorialImage, ImageFrame } from "@/components/media/EditorialImage";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowRightIcon } from "@/components/ui/Icons";

const tones = ["portrait", "texture", "detail", "campaign"] as const;

export function CategoryTiles() {
  return (
    <section className="section" aria-labelledby="shop-by-category">
      <div className="container-page">
        <SectionHeading
          eyebrow="Shop by category"
          title="Where would you like to begin?"
          link={{ label: "View all", href: "/shop" }}
          className="mb-14"
        />

        <div className="grid grid-cols-1 gap-x-6 gap-y-12 md:grid-cols-2 xl:grid-cols-3">
          {categoryTiles.map((tile, index) => (
            <Reveal key={tile.slug} as="article" delay={index * 90}>
              <Link href={tile.href} className="group block">
                <ImageFrame ratio="3/4" zoomOnGroupHover>
                  <EditorialImage
                    seed={tile.imageSeed}
                    alt={`${tile.title} — Adeolagold Beauty Studio`}
                    tone={tones[index % tones.length]}
                    sizes="(min-width: 1280px) 23vw, (min-width: 768px) 46vw, 92vw"
                  />
                </ImageFrame>

                <div className="flex items-start justify-between gap-4 pt-5">
                  <div>
                    <h3 className="font-display text-[22px] leading-tight tracking-[-0.015em] transition-transform duration-[350ms] ease-lux group-hover:translate-x-1">
                      {tile.title}
                    </h3>
                    <p className="mt-2 max-w-[30ch] text-[13.5px] leading-relaxed text-ink-soft">
                      {tile.copy}
                    </p>
                  </div>
                  <span
                    aria-hidden="true"
                    className="mt-1.5 shrink-0 text-ink opacity-0 transition-[opacity,transform] duration-[350ms] ease-lux group-hover:translate-x-1 group-hover:opacity-100"
                  >
                    <ArrowRightIcon className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
