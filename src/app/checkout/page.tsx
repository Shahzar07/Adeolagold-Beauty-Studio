import Link from "next/link";
import { pageMeta } from "@/lib/seo";
import { Logo } from "@/components/layout/Logo";
import { CheckoutView } from "./CheckoutView";

export const metadata = pageMeta({
  title: "Checkout",
  description: "Complete your Adeolagold order securely.",
  path: "/checkout",
  index: false,
});

export default function CheckoutPage() {
  return (
    <div className="container-page">
      {/* Checkout keeps its own quiet header — no navigation to distract. */}
      <div className="flex items-center justify-between gap-6 border-b border-line py-7">
        <Logo compact />
        <Link
          href="/cart"
          className="link-underline text-[11px] font-medium uppercase tracking-[0.14em] text-ink-soft transition-colors hover:text-ink"
        >
          Back to bag
        </Link>
      </div>

      <h1 className="display-2 my-12 max-w-[10ch]">Checkout.</h1>
      <CheckoutView />
    </div>
  );
}
