import Link from "next/link";
import { cx } from "@/lib/format";

export interface Crumb {
  label: string;
  href: string;
}

export function Breadcrumbs({
  crumbs,
  className,
  tone = "light",
}: {
  crumbs: Crumb[];
  className?: string;
  tone?: "light" | "dark";
}) {
  return (
    <nav aria-label="Breadcrumb" className={cx("text-[11px]", className)}>
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {crumbs.map((crumb, index) => {
          const isLast = index === crumbs.length - 1;
          return (
            <li key={crumb.href} className="flex items-center gap-2">
              {isLast ? (
                <span
                  aria-current="page"
                  className={cx(
                    "uppercase tracking-[0.14em]",
                    tone === "dark" ? "text-white/70" : "text-ink",
                  )}
                >
                  {crumb.label}
                </span>
              ) : (
                <>
                  <Link
                    href={crumb.href}
                    className={cx(
                      "link-underline uppercase tracking-[0.14em] transition-colors",
                      tone === "dark"
                        ? "text-white/55 hover:text-white"
                        : "text-muted hover:text-ink",
                    )}
                  >
                    {crumb.label}
                  </Link>
                  <span
                    aria-hidden="true"
                    className={tone === "dark" ? "text-white/30" : "text-line"}
                  >
                    /
                  </span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
