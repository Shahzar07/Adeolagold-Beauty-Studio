import { journalPosts } from "@/lib/journal";
import { pageMeta } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Reveal } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/ui/JsonLd";
import { JournalCard } from "@/components/journal/JournalCard";
import { Newsletter } from "@/components/layout/Newsletter";

export const metadata = pageMeta({
  title: "The Journal",
  description:
    "Guides, care routines and honest advice from Adeolagold Beauty Studio — wig care, closure versus frontal, density, installation and how to make a unit last.",
  path: "/journal",
});

const crumbs = [
  { label: "Home", href: "/" },
  { label: "Journal", href: "/journal" },
];

export default function JournalPage() {
  const [feature, ...rest] = journalPosts;

  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />

      <div className="container-page">
        <Breadcrumbs crumbs={crumbs} className="py-8" />

        <header className="grid gap-10 pb-14 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-6">
            <p className="eyebrow mb-5">The Journal</p>
            <h1 className="display-1 max-w-[12ch]">Notes from the studio.</h1>
          </Reveal>
          <Reveal delay={100} className="lg:col-span-5 lg:col-start-8">
            <p className="body-lg max-w-lg">
              Everything we would tell you in the chair, written down — care routines, honest
              comparisons, and the things nobody mentions until it is too late.
            </p>
          </Reveal>
        </header>

        {/* Feature */}
        <Reveal className="mb-20">
          <JournalCard post={feature} size="feature" />
        </Reveal>

        {/* Grid */}
        <div className="grid gap-x-7 gap-y-16 pb-24 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((post, index) => (
            <Reveal key={post.slug} delay={(index % 3) * 90}>
              <JournalCard post={post} />
            </Reveal>
          ))}
        </div>
      </div>

      <section className="section-sm bg-surface" aria-labelledby="journal-newsletter">
        <div className="container-page grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-6">
            <p className="eyebrow mb-5">Stay close</p>
            <h2 id="journal-newsletter" className="display-3 max-w-[16ch]">
              New articles, new drops, first access.
            </h2>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <Newsletter variant="section" />
          </div>
        </div>
      </section>
    </>
  );
}
