"use client";

import { useEffect, useRef } from "react";
import { cx } from "@/lib/format";
import { CloseIcon } from "./Icons";

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  title: string;
  side?: "right" | "left";
  children: React.ReactNode;
  footer?: React.ReactNode;
  labelledBy?: string;
  widthClass?: string;
}

/**
 * Accessible slide-over panel: locks background scroll, traps Tab focus,
 * closes on Escape, and returns focus to the trigger on close.
 */
export function Drawer({
  open,
  onClose,
  title,
  side = "right",
  children,
  footer,
  widthClass = "max-w-[440px]",
}: DrawerProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const restoreFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;

    restoreFocus.current = document.activeElement as HTMLElement | null;
    const { body } = document;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    const previousOverflow = body.style.overflow;
    const previousPadding = body.style.paddingRight;
    body.style.overflow = "hidden";
    if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`;

    const panel = panelRef.current;
    window.requestAnimationFrame(() => {
      const first = panel?.querySelector<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      first?.focus();
    });

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab" || !panel) return;

      const focusable = Array.from(
        panel.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((el) => el.offsetParent !== null);
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      body.style.overflow = previousOverflow;
      body.style.paddingRight = previousPadding;
      restoreFocus.current?.focus?.();
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[80]" role="presentation">
      <div
        className="animate-fade-in absolute inset-0 bg-black/45 backdrop-blur-[2px]"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={cx(
          "absolute inset-y-0 flex w-full flex-col bg-background shadow-elevated",
          widthClass,
          side === "right" ? "right-0 animate-slide-in-right" : "left-0 animate-slide-in-left",
        )}
      >
        <header className="flex shrink-0 items-center justify-between border-b border-line px-6 py-5">
          <h2 className="font-sans text-[12px] font-medium uppercase tracking-[0.16em] text-ink">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label={`Close ${title.toLowerCase()}`}
            className="-mr-2 flex h-11 w-11 items-center justify-center text-ink transition-colors duration-[180ms] hover:text-gold"
          >
            <CloseIcon className="h-[18px] w-[18px]" />
          </button>
        </header>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">{children}</div>

        {footer ? (
          <div className="shrink-0 border-t border-line bg-surface-light px-6 py-5">{footer}</div>
        ) : null}
      </div>
    </div>
  );
}
