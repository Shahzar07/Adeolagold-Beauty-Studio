"use client";

import { useEffect, useState } from "react";
import { testimonials } from "@/lib/content";
import { cx } from "@/lib/format";
import { Rating } from "@/components/ui/Rating";
import { ArrowLeftIcon, ArrowRightIcon } from "@/components/ui/Icons";

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(
      () => setIndex((n) => (n + 1) % testimonials.length),
      7000,
    );
    return () => window.clearInterval(id);
  }, [paused]);

  const active = testimonials[index];

  return (
    <section
      className="section bg-surface"
      aria-labelledby="testimonials-heading"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="container-page">
        <div className="flex items-center justify-between gap-6">
          <p className="eyebrow" id="testimonials-heading">
            In their words
          </p>
          <Rating value={4.9} showCount={false} />
        </div>

        <div className="mt-12 min-h-[280px] md:min-h-[240px]">
          <blockquote key={index} className="animate-fade-up max-w-4xl">
            <p className="font-display text-[clamp(1.55rem,3.6vw,2.7rem)] leading-[1.24] tracking-[-0.02em] text-ink">
              <span aria-hidden="true" className="text-gold">
                “
              </span>
              {active.quote}
              <span aria-hidden="true" className="text-gold">
                ”
              </span>
            </p>
            <footer className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-1 text-[12px]">
              <cite className="not-italic font-medium uppercase tracking-[0.14em] text-ink">
                {active.name}
              </cite>
              <span aria-hidden="true" className="h-px w-6 bg-gold" />
              <span className="text-muted">{active.detail}</span>
            </footer>
          </blockquote>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-t border-line pt-6">
          <div
            className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-0"
            role="tablist"
            aria-label="Choose a testimonial"
          >
            {testimonials.map((testimonial, i) => (
              <button
                key={testimonial.name}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`Testimonial ${i + 1} of ${testimonials.length}`}
                onClick={() => setIndex(i)}
                className="flex h-11 w-5 shrink-0 items-center justify-center sm:w-6"
              >
                <span
                  className={cx(
                    "h-px w-full transition-[background-color,height] duration-[350ms] ease-lux",
                    i === index ? "h-[2px] bg-gold" : "bg-line",
                  )}
                />
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() =>
                setIndex((n) => (n - 1 + testimonials.length) % testimonials.length)
              }
              aria-label="Previous testimonial"
              className="flex h-11 w-11 items-center justify-center text-ink transition-colors duration-[180ms] hover:text-gold"
            >
              <ArrowLeftIcon className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => setIndex((n) => (n + 1) % testimonials.length)}
              aria-label="Next testimonial"
              className="-mr-2.5 flex h-11 w-11 items-center justify-center text-ink transition-colors duration-[180ms] hover:text-gold"
            >
              <ArrowRightIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
