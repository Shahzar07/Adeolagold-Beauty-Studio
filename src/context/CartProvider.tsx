"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react";
import type { CartLine } from "@/lib/types";
import { createPersistentStore } from "@/lib/store";
import { useToast } from "./ToastProvider";

const bagStore = createPersistentStore<CartLine[]>("adeolagold:bag:v1", []);

interface CartContextValue {
  lines: CartLine[];
  count: number;
  subtotal: number;
  isOpen: boolean;
  /** False during the server render and the hydration render. */
  hydrated: boolean;
  /** Increments whenever a line is added — the bag icon animates off this. */
  addPulse: number;
  open: () => void;
  close: () => void;
  add: (line: Omit<CartLine, "key" | "quantity">, quantity?: number) => void;
  remove: (key: string) => void;
  setQuantity: (key: string, quantity: number) => void;
  clear: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}

function lineKey(line: Omit<CartLine, "key" | "quantity">) {
  const { length, density, colour } = line.variant;
  return [line.productId, length, density, colour].join("::");
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const lines = useSyncExternalStore(
    bagStore.subscribe,
    bagStore.getSnapshot,
    bagStore.getServerSnapshot,
  );
  const hydrated = useSyncExternalStore(
    bagStore.subscribe,
    bagStore.isHydrated,
    () => false,
  );

  const [isOpen, setIsOpen] = useState(false);
  const [addPulse, setAddPulse] = useState(0);
  const { push } = useToast();

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  const add = useCallback<CartContextValue["add"]>(
    (line, quantity = 1) => {
      const key = lineKey(line);
      bagStore.set((current) => {
        const existing = current.find((l) => l.key === key);
        if (existing) {
          return current.map((l) =>
            l.key === key ? { ...l, quantity: Math.min(l.quantity + quantity, 10) } : l,
          );
        }
        return [...current, { ...line, key, quantity }];
      });
      setAddPulse((n) => n + 1);
      push({
        title: "Added to your bag",
        description: `${line.name} · ${line.variant.length}`,
        href: { label: "View bag", url: "/cart" },
      });
      setIsOpen(true);
    },
    [push],
  );

  const remove = useCallback((key: string) => {
    bagStore.set((current) => current.filter((l) => l.key !== key));
  }, []);

  const setQuantity = useCallback((key: string, quantity: number) => {
    bagStore.set((current) =>
      quantity <= 0
        ? current.filter((l) => l.key !== key)
        : current.map((l) => (l.key === key ? { ...l, quantity: Math.min(quantity, 10) } : l)),
    );
  }, []);

  const clear = useCallback(() => bagStore.set([]), []);

  const count = useMemo(() => lines.reduce((n, l) => n + l.quantity, 0), [lines]);
  const subtotal = useMemo(
    () => lines.reduce((n, l) => n + l.price * l.quantity, 0),
    [lines],
  );

  const value = useMemo(
    () => ({
      lines,
      count,
      subtotal,
      isOpen,
      hydrated,
      addPulse,
      open,
      close,
      add,
      remove,
      setQuantity,
      clear,
    }),
    [lines, count, subtotal, isOpen, hydrated, addPulse, open, close, add, remove, setQuantity, clear],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
