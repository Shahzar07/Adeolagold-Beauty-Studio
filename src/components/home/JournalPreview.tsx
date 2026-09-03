import { journalPosts } from "@/lib/journal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { JournalCard } from "@/components/journal/JournalCard";

export function JournalPreview() {
  const posts = journalPosts.slice(0, 3);

  return (
    <section className="section bg-surface-light" aria-labelledby="journal-heading">
      <div className="container-page">
        <SectionHeading
          eyebrow="The Journal"
          title="Notes from the studio"
          subtitle="Guides, care routines and honest advice — written the way we would explain it in the chair."
          link={{ label: "All articles", href: "/journal" }}
          className="mb-14"
        />

        <div className="grid gap-x-7 gap-y-14 md:grid-cols-3">
          {posts.map((post, index) => (
            <Reveal key={post.slug} delay={index * 90}>
              <JournalCard post={post} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
