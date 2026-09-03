import { cx } from "@/lib/format";
import { ButtonLink } from "./Button";
import { Reveal } from "./Reveal";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  link?: { label: string; href: string };
  as?: "h2" | "h3";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  link,
  as: Tag = "h2",
  className,
}: SectionHeadingProps) {
  return (
    <Reveal
      className={cx(
        "flex flex-col gap-6 md:flex-row md:items-end md:justify-between",
        align === "center" && "md:flex-col md:items-center md:text-center",
        className,
      )}
    >
      <div className={cx("max-w-2xl", align === "center" && "md:mx-auto")}>
        {eyebrow ? <p className="eyebrow mb-5">{eyebrow}</p> : null}
        <Tag className="display-2">{title}</Tag>
        {subtitle ? <p className="body-lg mt-5 max-w-xl">{subtitle}</p> : null}
      </div>
      {link ? (
        <ButtonLink href={link.href} variant="text" className="shrink-0 self-start md:self-end">
          {link.label}
        </ButtonLink>
      ) : null}
    </Reveal>
  );
}
