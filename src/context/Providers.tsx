"use client";

import { ToastProvider } from "./ToastProvider";
import { CartProvider } from "./CartProvider";
import { WishlistProvider } from "./WishlistProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider>
      <CartProvider>
        <WishlistProvider>{children}</WishlistProvider>
      </CartProvider>
    </ToastProvider>
  );
}
