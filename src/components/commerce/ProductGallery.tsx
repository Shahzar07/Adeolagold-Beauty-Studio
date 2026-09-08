"use client";

import { useEffect, useRef, useState } from "react";
import type { ProductImage } from "@/lib/types";
import { cx } from "@/lib/format";
import { EditorialImage, ImageFrame } from "@/components/media/EditorialImage";

/**
 * Desktop: a thumbnail rail beside a large primary image.
 * Mobile: a native scroll-snap carousel with progress dots.
 */
export function ProductGallery({
  images,
  productName,
}: {
  images: ProductImage[];
  productName: string;
}) {
  const [active, setActive] = useState(0);
  const track = useRef<HTMLDivElement>(null);

  // Keep the mobile dots in step with the scroll position.
  useEffect(() => {
    const node = track.current;
    if (!node) return;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const index = Math.round(node.scrollLeft / node.clientWidth);
        setActive(Math.max(0, Math.min(images.length - 1, index)));
      });
    };
    node.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      node.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [images.length]);

  const scrollTo = (index: number) => {
    const node = track.current;
    if (!node) return;
    node.scrollTo({ left: index * node.clientWidth, behavior: "smooth" });
  };

  return (
    <div>
      {/* Mobile carousel */}
      <div className="lg:hidden">
        <div
          ref={track}
          className="no-scrollbar snap-x-gallery -mx-[var(--page-padding)] flex overflow-x-auto overscroll-x-contain"
          role="group"
          aria-roledescription="carousel"
          aria-label={`${productName} images`}
        >
          {images.map((image, index) => (
            <div
              key={image.seed}
              className="snap-item w-full shrink-0 px-[var(--page-padding)]"
              aria-label={`Image ${index + 1} of ${images.length}`}
            >
              <ImageFrame ratio="4/5">
                <EditorialImage
                  seed={image.seed}
                  alt={image.alt}
                  tone={image.tone}
                  src={image.src}
                  sizes="100vw"
                  priority={index === 0}
                />
              </ImageFrame>
            </div>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-center gap-2">
          {images.map((image, index) => (
            <button
              key={image.seed}
              type="button"
              onClick={() => scrollTo(index)}
              aria-label={`Go to image ${index + 1}`}
              aria-current={index === active}
              className="flex h-8 w-6 items-center justify-center"
            >
              <span
                className={cx(
                  "h-px w-full transition-[background-color,height] duration-[350ms] ease-lux",
                  index === active ? "h-[2px] bg-gold" : "bg-line",
                )}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Desktop: thumbnail rail + primary */}
      <div className="hidden gap-5 lg:flex">
        <div className="flex w-[86px] shrink-0 flex-col gap-3">
          {images.map((image, index) => (
            <button
              key={image.seed}
              type="button"
              onClick={() => setActive(index)}
              aria-label={`View ${image.alt}`}
              aria-current={index === active}
              className={cx(
                "relative block overflow-hidden rounded-subtle border transition-[border-color,opacity] duration-[350ms] ease-lux",
                index === active
                  ? "border-gold opacity-100"
                  : "border-transparent opacity-65 hover:opacity-100",
              )}
            >
              <ImageFrame ratio="4/5" grain={false}>
                <EditorialImage
                  seed={image.seed}
                  alt=""
                  tone={image.tone}
                  src={image.src}
                  sizes="86px"
                />
              </ImageFrame>
            </button>
          ))}
        </div>

        <div className="min-w-0 flex-1">
          <ImageFrame ratio="4/5">
            {/* Cross-fade between views rather than a hard swap. */}
            {images.map((image, index) => (
              <div
                key={image.seed}
                aria-hidden={index !== active}
                className={cx(
                  "absolute inset-0 transition-opacity duration-[600ms] ease-lux",
                  index === active ? "opacity-100" : "opacity-0",
                )}
              >
                <EditorialImage
                  seed={image.seed}
                  alt={index === active ? image.alt : ""}
                  tone={image.tone}
                  src={image.src}
                  sizes="(min-width: 1280px) 46vw, 52vw"
                  priority={index === 0}
                />
              </div>
            ))}
          </ImageFrame>
        </div>
      </div>
    </div>
  );
}
