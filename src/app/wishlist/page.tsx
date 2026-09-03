import { pageMeta } from "@/lib/seo";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { WishlistView } from "./WishlistView";

export const metadata = pageMeta({
  title: "Wishlist",
  description: "The pieces you have saved from the Adeolagold collection.",
  path: "/wishlist",
  index: false,
});

export default function WishlistPage() {
  return (
    <div className="container-page pb-24">
      <Breadcrumbs
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Wishlist", href: "/wishlist" },
        ]}
        className="py-8"
      />
      <header className="pb-12">
        <p className="eyebrow mb-5">Saved</p>
        <h1 className="display-1 max-w-[12ch]">Your wishlist.</h1>
      </header>
      <WishlistView />
    </div>
  );
}
