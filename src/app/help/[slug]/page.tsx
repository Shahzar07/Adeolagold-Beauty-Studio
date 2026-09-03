import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getHelpPage, helpPages } from "@/lib/content";
import { pageMeta } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { JsonLd } from "@/components/ui/JsonLd";

export function generateStaticParams() {
  return helpPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = getHelpPage(slug);
  if (!page) return {};

  return pageMeta({
    title: page.title,
    description: page.intro,
    path: `/help/${page.slug}`,
  });
}

export default async function HelpPageRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = getHelpPage(slug);
  if (!page) notFound();

  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Help", href: "/faqs" },
    { label: page.title, href: `/help/${page.slug}` },
  ];

  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />

      <div className="container-page pb-24">
        <Breadcrumbs crumbs={crumbs} className="py-8" />

        <header className="grid gap-10 pb-14 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-6">
            <p className="eyebrow mb-5">{page.eyebrow}</p>
            <h1 className="display-1 max-w-[12ch]">{page.title}</h1>
          </Reveal>
          <Reveal delay={100} className="lg:col-span-5 lg:col-start-8">
            <p className="body-lg max-w-lg">{page.intro}</p>
          </Reveal>
        </header>

        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-8">
            {page.sections.map((section, index) => (
              <Reveal key={section.heading} delay={index * 70}>
                <section className="border-t border-line py-9">
                  <h2 className="display-4 mb-5">{section.heading}</h2>
                  <ul className="flex flex-col gap-3">
                    {section.body.map((line) => (
                      <li
                        key={line}
                        className="flex gap-4 text-[14.5px] leading-[1.72] text-ink-soft"
                      >
                        <span aria-hidden="true" className="mt-3 h-px w-4 shrink-0 bg-gold" />
                        {line}
                      </li>
                    ))}
                  </ul>
                </section>
              </Reveal>
            ))}
          </div>

          <aside className="lg:col-span-3 lg:col-start-10">
            <div className="lg:sticky lg:top-[104px]">
              <p className="eyebrow mb-5">More help</p>
              <ul className="flex flex-col gap-3">
                {helpPages
                  .filter((other) => other.slug !== page.slug)
                  .map((other) => (
                    <li key={other.slug}>
                      <Link
                        href={`/help/${other.slug}`}
                        className="link-underline text-[14px] text-ink-soft transition-colors hover:text-ink"
                      >
                        {other.title}
                      </Link>
                    </li>
                  ))}
                <li>
                  <Link
                    href="/faqs"
                    className="link-underline text-[14px] text-ink-soft transition-colors hover:text-ink"
                  >
                    FAQs
                  </Link>
                </li>
              </ul>

              <div className="mt-8 border-t border-line pt-6">
                <p className="text-[13.5px] leading-relaxed text-ink-soft">
                  Can&rsquo;t find what you need? The studio answers everything within one working
                  day.
                </p>
                <ButtonLink href="/contact" variant="secondary" className="mt-5" fullWidth>
                  Contact us
                </ButtonLink>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
