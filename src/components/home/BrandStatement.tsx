import { Reveal } from "@/components/ui/Reveal";

export function BrandStatement() {
  return (
    <section className="section border-b border-line" aria-labelledby="statement-heading">
      <div className="container-page">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-6">
            <p className="eyebrow mb-6">Our promise</p>
            <h2 id="statement-heading" className="display-2 max-w-[14ch]">
              Quality you can feel.
            </h2>
          </Reveal>

          <Reveal delay={120} className="lg:col-span-5 lg:col-start-8 lg:pt-3">
            <p className="text-[clamp(1.05rem,1.5vw,1.3rem)] leading-[1.7] text-ink-soft">
              Every detail matters. From carefully selected human hair to precision styling, we
              create beauty experiences designed to last.
            </p>
            <p className="mt-6 text-[14.5px] leading-relaxed text-muted">
              We work with raw and virgin hair, cut on the client rather than the block, and finish every
              hairline by hand. It takes longer. It is the only way we know how to do it.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
