import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPost, journalPosts, relatedPosts } from "@/lib/journal";
import { pageMeta } from "@/lib/seo";
import { articleSchema, breadcrumbSchema } from "@/lib/schema";
import { formatDate } from "@/lib/format";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { JsonLd } from "@/components/ui/JsonLd";
import { EditorialImage, ImageFrame } from "@/components/media/EditorialImage";
import { JournalCard } from "@/components/journal/JournalCard";

export function generateStaticParams() {
  return journalPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  return pageMeta({
    title: post.title,
    description: post.excerpt,
    path: `/journal/${post.slug}`,
  });
}

export default async function JournalPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Journal", href: "/journal" },
    { label: post.title, href: `/journal/${post.slug}` },
  ];

  return (
    <>
      <JsonLd data={articleSchema(post)} />
      <JsonLd data={breadcrumbSchema(crumbs)} />

      <article>
        <div className="container-page">
          <Breadcrumbs crumbs={crumbs} className="py-8" />

          <header className="mx-auto max-w-3xl pb-12 text-center">
            <div className="mb-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[10.5px] uppercase tracking-[0.16em] text-muted">
              <span className="text-gold">{post.category}</span>
              <span aria-hidden="true">·</span>
              <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
              <span aria-hidden="true">·</span>
              <span>{post.readingTime}</span>
            </div>
            <h1 className="display-1 text-[clamp(2.25rem,5.4vw,4.25rem)]">{post.title}</h1>
            <p className="body-lg mx-auto mt-7 max-w-2xl">{post.excerpt}</p>
            <p className="mt-7 text-[11px] uppercase tracking-[0.16em] text-muted">
              Words by {post.author}
            </p>
          </header>
        </div>

        <Reveal>
          <div className="container-wide">
            <ImageFrame ratio="16/9">
              <EditorialImage
                seed={post.imageSeed}
                alt={post.title}
                tone={post.imageTone}
                sizes="100vw"
                priority
              />
            </ImageFrame>
          </div>
        </Reveal>

        {/* Body */}
        <div className="container-narrow py-16 lg:py-24">
          <div className="flex flex-col gap-7">
            {post.body.map((block, index) => {
              if (block.type === "h2") {
                return (
                  <h2
                    key={index}
                    className="display-4 mt-6 first:mt-0"
                  >
                    {block.text}
                  </h2>
                );
              }
              if (block.type === "quote") {
                return (
                  <blockquote key={index} className="my-4 border-l border-gold py-1 pl-6">
                    <p className="font-display text-[clamp(1.3rem,2.4vw,1.75rem)] leading-[1.3] tracking-[-0.018em] text-ink">
                      {block.text}
                    </p>
                  </blockquote>
                );
              }
              if (block.type === "list") {
                return (
                  <ul key={index} className="flex flex-col gap-3">
                    {block.items.map((item) => (
                      <li
                        key={item}
                        className="flex gap-4 text-[15.5px] leading-[1.75] text-ink-soft"
                      >
                        <span aria-hidden="true" className="mt-3 h-px w-4 shrink-0 bg-gold" />
                        {item}
                      </li>
                    ))}
                  </ul>
                );
              }
              return (
                <p key={index} className="text-[15.5px] leading-[1.78] text-ink-soft">
                  {block.text}
                </p>
              );
            })}
          </div>

          {/* In-article CTA */}
          <aside className="mt-16 border-y border-line py-10 text-center">
            <p className="eyebrow mb-4">Need a second opinion?</p>
            <p className="display-4 mx-auto max-w-[22ch]">
              A consultation is thirty minutes and redeemed against your first booking.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <ButtonLink href="/book?service=hair-consultation" className="sm:min-w-[200px]">
                Book a consultation
              </ButtonLink>
              <ButtonLink href="/shop" variant="secondary" className="sm:min-w-[180px]">
                Shop the hair
              </ButtonLink>
            </div>
          </aside>
        </div>
      </article>

      {/* Related */}
      <section className="section-sm border-t border-line" aria-labelledby="related-articles">
        <div className="container-page">
          <h2 id="related-articles" className="eyebrow mb-10">
            Keep reading
          </h2>
          <div className="grid gap-x-7 gap-y-14 md:grid-cols-3">
            {relatedPosts(post.slug, 3).map((related, index) => (
              <Reveal key={related.slug} delay={index * 90}>
                <JournalCard post={related} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
