"use client";

import { useEffect, useRef } from "react";
import { cx } from "@/lib/format";

interface RevealProps {
  children: React.ReactNode;
  /** Stagger in milliseconds. */
  delay?: number;
  as?: "div" | "section" | "li" | "article" | "header" | "figure";
  className?: string;
}

/**
 * Fades and lifts content into place as it enters the viewport.
 *
 * The reveal is driven by a data attribute set directly on the node rather
 * than React state — the observer is an external system, the animation is
 * purely presentational, and this avoids re-rendering the subtree.
 * Falls back to visible content when IntersectionObserver is unavailable, and
 * is disabled entirely by prefers-reduced-motion (see globals.css).
 */
export function Reveal({ children, delay = 0, as = "div", className }: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const show = () => node.setAttribute("data-reveal", "in");

    if (typeof IntersectionObserver === "undefined") {
      show();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            show();
            observer.disconnect();
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const Tag = as as React.ElementType;

  return (
    <Tag
      ref={ref}
      data-reveal=""
      style={{ "--reveal-delay": `${delay}ms` } as React.CSSProperties}
      className={cx(className)}
    >
      {children}
    </Tag>
  );
}
