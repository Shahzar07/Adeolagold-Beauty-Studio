"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
} from "react";
import { createPersistentStore } from "@/lib/store";
import { useToast } from "./ToastProvider";

const wishlistStore = createPersistentStore<string[]>("adeolagold:wishlist:v1", []);

interface WishlistContextValue {
  slugs: string[];
  has: (slug: string) => boolean;
  toggle: (slug: string, name?: string) => void;
  hydrated: boolean;
}

const WishlistContext = createContext<WishlistContextValue | null>(null);

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used inside <WishlistProvider>");
  return ctx;
}

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const slugs = useSyncExternalStore(
    wishlistStore.subscribe,
    wishlistStore.getSnapshot,
    wishlistStore.getServerSnapshot,
  );
  const hydrated = useSyncExternalStore(
    wishlistStore.subscribe,
    wishlistStore.isHydrated,
    () => false,
  );
  const { push } = useToast();

  const has = useCallback((slug: string) => slugs.includes(slug), [slugs]);

  const toggle = useCallback<WishlistContextValue["toggle"]>(
    (slug, name) => {
      const saved = wishlistStore.getSnapshot().includes(slug);
      wishlistStore.set((current) =>
        saved ? current.filter((s) => s !== slug) : [...current, slug],
      );
      push({
        title: saved ? "Removed from wishlist" : "Saved to wishlist",
        description: name,
        tone: saved ? "default" : "success",
      });
    },
    [push],
  );

  const value = useMemo(
    () => ({ slugs, has, toggle, hydrated }),
    [slugs, has, toggle, hydrated],
  );

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}
