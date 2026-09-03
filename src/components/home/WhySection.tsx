import { pillars } from "@/lib/content";
import { Reveal } from "@/components/ui/Reveal";

export function WhySection() {
  return (
    <section className="section border-y border-line" aria-labelledby="why-heading">
      <div className="container-page">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-4">
            <p className="eyebrow mb-6">Why Adeolagold</p>
            <h2 id="why-heading" className="display-2 max-w-[12ch]">
              Four things we never compromise on.
            </h2>
          </Reveal>

          <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:col-span-7 lg:col-start-6">
            {pillars.map((pillar, index) => (
              <Reveal key={pillar.number} delay={index * 90}>
                <div className="flex items-baseline gap-4">
                  <span className="font-display text-[15px] text-gold">{pillar.number}</span>
                  <span className="h-px flex-1 bg-line" aria-hidden="true" />
                </div>
                <h3 className="mt-5 font-sans text-[12px] font-medium uppercase tracking-[0.16em] text-ink">
                  {pillar.title}
                </h3>
                <p className="mt-3 text-[14px] leading-relaxed text-ink-soft">{pillar.copy}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
