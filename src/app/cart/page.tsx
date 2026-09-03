import { pageMeta } from "@/lib/seo";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { CartView } from "./CartView";

export const metadata = pageMeta({
  title: "Your Bag",
  description: "Review the pieces in your Adeolagold bag before checkout.",
  path: "/cart",
  index: false,
});

export default function CartPage() {
  return (
    <div className="container-page">
      <Breadcrumbs
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Bag", href: "/cart" },
        ]}
        className="py-8"
      />
      <h1 className="display-1 mb-12 max-w-[10ch]">Your bag.</h1>
      <CartView />
    </div>
  );
}
