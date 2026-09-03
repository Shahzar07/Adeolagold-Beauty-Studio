import { Breadcrumbs, type Crumb } from "@/components/ui/Breadcrumbs";
import { Reveal } from "@/components/ui/Reveal";

export function CollectionHeader({
  eyebrow,
  title,
  description,
  count,
  crumbs,
}: {
  eyebrow: string;
  title: string;
  description: string;
  count: number;
  crumbs: Crumb[];
}) {
  return (
    <header className="pb-12 pt-8 md:pt-10">
      <Breadcrumbs crumbs={crumbs} className="mb-10" />
      <Reveal className="grid gap-8 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-6">
          <p className="eyebrow mb-5">{eyebrow}</p>
          <h1 className="display-1 max-w-[12ch]">{title}</h1>
        </div>
        <div className="lg:col-span-5 lg:col-start-8">
          <p className="body-lg max-w-lg">{description}</p>
          <p className="mt-5 text-[11px] uppercase tracking-[0.16em] text-muted">
            {count} {count === 1 ? "piece" : "pieces"}
          </p>
        </div>
      </Reveal>
    </header>
  );
}
