import Link from "next/link";
import type { JournalPost } from "@/lib/types";
import { cx, formatDate } from "@/lib/format";
import { EditorialImage, ImageFrame } from "@/components/media/EditorialImage";

export function JournalCard({
  post,
  size = "default",
  className,
}: {
  post: JournalPost;
  size?: "default" | "feature";
  className?: string;
}) {
  const isFeature = size === "feature";

  return (
    <article className={cx("group", className)}>
      <Link href={`/journal/${post.slug}`} className="block">
        <ImageFrame ratio={isFeature ? "16/9" : "3/4"} zoomOnGroupHover>
          <EditorialImage
            seed={post.imageSeed}
            alt={post.title}
            tone={post.imageTone}
            sizes={isFeature ? "(min-width: 1024px) 62vw, 92vw" : "(min-width: 1024px) 30vw, 92vw"}
          />
        </ImageFrame>

        <div className="pt-6">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[10.5px] uppercase tracking-[0.16em] text-muted">
            <span className="text-gold">{post.category}</span>
            <span aria-hidden="true">·</span>
            <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
            <span aria-hidden="true">·</span>
            <span>{post.readingTime}</span>
          </div>

          <h3
            className={cx(
              "mt-4 font-display tracking-[-0.02em] transition-transform duration-[350ms] ease-lux group-hover:translate-x-1",
              isFeature
                ? "text-[clamp(1.8rem,3.4vw,2.75rem)] leading-[1.08]"
                : "text-[clamp(1.25rem,2vw,1.5rem)] leading-[1.16]",
            )}
          >
            {post.title}
          </h3>

          <p
            className={cx(
              "mt-3 leading-relaxed text-ink-soft",
              isFeature ? "max-w-2xl text-[15px]" : "max-w-[42ch] text-[13.5px]",
            )}
          >
            {post.excerpt}
          </p>

          <span className="link-underline mt-5 inline-block text-[11px] font-medium uppercase tracking-[0.14em] text-ink">
            Read article
          </span>
        </div>
      </Link>
    </article>
  );
}
