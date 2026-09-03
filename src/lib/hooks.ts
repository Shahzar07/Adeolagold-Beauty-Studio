"use client";

import { useSyncExternalStore } from "react";

/* ------------------------------------------------------------------
   Browser-state hooks built on useSyncExternalStore, so the server
   render and the hydration render always agree.
   ------------------------------------------------------------------ */

function subscribeToScroll(listener: () => void) {
  window.addEventListener("scroll", listener, { passive: true });
  return () => window.removeEventListener("scroll", listener);
}

/** True once the page has scrolled past `threshold` pixels. */
export function useScrolledPast(threshold: number): boolean {
  return useSyncExternalStore(
    subscribeToScroll,
    () => window.scrollY > threshold,
    () => false,
  );
}

const noopSubscribe = () => () => {};

let cachedToday: Date | null = null;

/**
 * Today's date, resolved on the client only. The server snapshot is null so
 * date-dependent UI renders a skeleton until hydration — the calendar can
 * never disagree between server and browser.
 */
export function useClientToday(): Date | null {
  return useSyncExternalStore(
    noopSubscribe,
    () => {
      if (!cachedToday) {
        const now = new Date();
        now.setHours(0, 0, 0, 0);
        cachedToday = now;
      }
      return cachedToday;
    },
    () => null,
  );
}
