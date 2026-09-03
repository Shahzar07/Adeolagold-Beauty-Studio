"use client";

import { useId, useState } from "react";
import { cx } from "@/lib/format";
import { PlusIcon, MinusIcon } from "./Icons";

export interface AccordionItem {
  title: string;
  content: React.ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  /** Index of the panel open on first render, or null for all closed. */
  defaultOpen?: number | null;
  /** Allow more than one panel open at a time. */
  multiple?: boolean;
  className?: string;
  titleClassName?: string;
}

export function Accordion({
  items,
  defaultOpen = null,
  multiple = false,
  className,
  titleClassName,
}: AccordionProps) {
  const baseId = useId();
  const [open, setOpen] = useState<number[]>(defaultOpen === null ? [] : [defaultOpen]);

  const toggle = (index: number) => {
    setOpen((current) => {
      if (current.includes(index)) return current.filter((i) => i !== index);
      return multiple ? [...current, index] : [index];
    });
  };

  return (
    <div className={cx("border-t border-line", className)}>
      {items.map((item, index) => {
        const isOpen = open.includes(index);
        const panelId = `${baseId}-panel-${index}`;
        const buttonId = `${baseId}-button-${index}`;

        return (
          <div key={item.title} className="border-b border-line">
            <h3>
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(index)}
                className={cx(
                  "group flex w-full items-center justify-between gap-6 py-5 text-left transition-colors duration-[180ms] ease-lux hover:text-gold",
                  titleClassName ??
                    "font-sans text-[13px] font-medium uppercase tracking-[0.1em] text-ink",
                )}
              >
                <span>{item.title}</span>
                <span className="relative h-4 w-4 shrink-0 text-muted transition-colors group-hover:text-gold">
                  <PlusIcon
                    className={cx(
                      "absolute inset-0 h-4 w-4 transition-[opacity,transform] duration-[350ms] ease-lux",
                      isOpen ? "rotate-90 opacity-0" : "rotate-0 opacity-100",
                    )}
                  />
                  <MinusIcon
                    className={cx(
                      "absolute inset-0 h-4 w-4 transition-[opacity,transform] duration-[350ms] ease-lux",
                      isOpen ? "rotate-0 opacity-100" : "-rotate-90 opacity-0",
                    )}
                  />
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className="grid"
            >
              <div className="pb-6 pr-8 text-[14px] leading-relaxed text-ink-soft">
                {item.content}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
