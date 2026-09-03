import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getService, services } from "@/lib/services";
import { pageMeta } from "@/lib/seo";
import { breadcrumbSchema, serviceSchema } from "@/lib/schema";
import { formatPrice } from "@/lib/format";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { JsonLd } from "@/components/ui/JsonLd";
import { EditorialImage, ImageFrame } from "@/components/media/EditorialImage";
import { CheckIcon, ClockIcon, SparkIcon } from "@/components/ui/Icons";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};

  return pageMeta({
    title: service.title,
    description: `${service.summary} From ${formatPrice(service.fromPrice)} · ${service.duration}. Book at Adeolagold Beauty Studio, London.`,
    path: `/services/${service.slug}`,
  });
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const others = services.filter((s) => s.slug !== service.slug);
  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: service.title, href: `/services/${service.slug}` },
  ];

  return (
    <>
      <JsonLd data={serviceSchema(service)} />
      <JsonLd data={breadcrumbSchema(crumbs)} />

      <div className="container-page">
        <Breadcrumbs crumbs={crumbs} className="py-8" />

        <div className="grid gap-12 pb-20 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <Reveal>
              <ImageFrame ratio="4/5">
                <EditorialImage
                  seed={`service-${service.slug}`}
                  alt={`${service.title} at Adeolagold Beauty Studio`}
                  tone="portrait"
                  sizes="(min-width: 1024px) 48vw, 100vw"
                  priority
                />
              </ImageFrame>
            </Reveal>
          </div>

          <div className="lg:col-span-5 lg:col-start-8">
            <Reveal delay={80}>
              <p className="eyebrow mb-5">Service</p>
              <h1 className="display-2 max-w-[14ch]">{service.title}</h1>
              <p className="body-lg mt-6">{service.summary}</p>

              <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-4 border-y border-line py-5 text-[13px]">
                <div>
                  <dt className="text-muted">From</dt>
                  <dd className="mt-1 font-display text-[22px] leading-none tabular-nums">
                    {formatPrice(service.fromPrice)}
                  </dd>
                </div>
                <div>
                  <dt className="flex items-center gap-1.5 text-muted">
                    <ClockIcon className="h-3.5 w-3.5" /> Duration
                  </dt>
                  <dd className="mt-1.5 text-ink">{service.duration}</dd>
                </div>
                <div>
                  <dt className="text-muted">Deposit</dt>
                  <dd className="mt-1.5 text-ink tabular-nums">
                    {formatPrice(service.depositPence)}
                  </dd>
                </div>
              </dl>

              <p className="mt-7 text-[14.5px] leading-relaxed text-ink-soft">
                {service.description}
              </p>

              <div className="mt-9">
                <p className="eyebrow mb-4">What&rsquo;s included</p>
                <ul className="flex flex-col gap-2.5">
                  {service.includes.map((item) => (
                    <li key={item} className="flex gap-3 text-[14px] text-ink-soft">
                      <CheckIcon className="mt-1 h-3.5 w-3.5 shrink-0 text-gold" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {service.aftercare ? (
                <p className="mt-8 flex gap-3 border-l border-gold bg-surface-light py-4 pl-5 pr-4 text-[13.5px] leading-relaxed text-ink">
                  <SparkIcon className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                  {service.aftercare}
                </p>
              ) : null}

              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href={`/book?service=${service.slug}`} className="sm:flex-1">
                  Book this service
                </ButtonLink>
                <ButtonLink href="/contact" variant="secondary" className="sm:flex-1">
                  Ask a question
                </ButtonLink>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Other services */}
        <section className="border-t border-line py-16" aria-labelledby="other-services">
          <h2 id="other-services" className="eyebrow mb-8">
            Other services
          </h2>
          <ul className="grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-5">
            {others.map((other) => (
              <li key={other.slug}>
                <Link href={`/services/${other.slug}`} className="group block">
                  <h3 className="font-display text-[19px] leading-tight transition-[color,transform] duration-[350ms] ease-lux group-hover:translate-x-1 group-hover:text-gold">
                    {other.title}
                  </h3>
                  <p className="mt-1.5 text-[12px] tabular-nums text-muted">
                    From {formatPrice(other.fromPrice)}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}
