import { faqGroups } from "@/lib/content";
import { pageMeta } from "@/lib/seo";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Accordion } from "@/components/ui/Accordion";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { JsonLd } from "@/components/ui/JsonLd";

export const metadata = pageMeta({
  title: "FAQs",
  description:
    "Answers on the hair we use, how many bundles you need, density, shipping, returns, deposits and rescheduling at Adeolagold Beauty Studio.",
  path: "/faqs",
});

const crumbs = [
  { label: "Home", href: "/" },
  { label: "FAQs", href: "/faqs" },
];

export default function FaqsPage() {
  const allItems = faqGroups.flatMap((group) => group.items);

  return (
    <>
      <JsonLd data={faqSchema(allItems)} />
      <JsonLd data={breadcrumbSchema(crumbs)} />

      <div className="container-page pb-24">
        <Breadcrumbs crumbs={crumbs} className="py-8" />

        <header className="grid gap-10 pb-14 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-6">
            <p className="eyebrow mb-5">Help</p>
            <h1 className="display-1 max-w-[12ch]">Frequently asked.</h1>
          </Reveal>
          <Reveal delay={100} className="lg:col-span-5 lg:col-start-8">
            <p className="body-lg max-w-lg">
              The questions we are asked most, answered honestly — including the ones where the
              answer is not what you were hoping for.
            </p>
          </Reveal>
        </header>

        <div className="flex flex-col gap-16">
          {faqGroups.map((group, index) => (
            <Reveal key={group.title} delay={index * 60}>
              <section aria-labelledby={`faq-${index}`} className="grid gap-8 lg:grid-cols-12">
                <h2 id={`faq-${index}`} className="display-4 lg:col-span-3">
                  {group.title}
                </h2>
                <div className="lg:col-span-8 lg:col-start-5">
                  <Accordion
                    items={group.items.map((item) => ({
                      title: item.q,
                      content: <p>{item.a}</p>,
                    }))}
                    multiple
                    titleClassName="font-sans text-[14px] font-medium normal-case tracking-normal text-ink"
                  />
                </div>
              </section>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-20 border-t border-line pt-14 text-center">
          <p className="display-3 mx-auto max-w-[20ch]">Still not sure? Ask us directly.</p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonLink href="/contact" className="sm:min-w-[190px]">
              Contact the studio
            </ButtonLink>
            <ButtonLink href="/book?service=hair-consultation" variant="secondary" className="sm:min-w-[210px]">
              Book a consultation
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </>
  );
}
