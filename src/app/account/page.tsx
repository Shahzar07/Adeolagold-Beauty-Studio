import Link from "next/link";
import { pageMeta } from "@/lib/seo";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Reveal } from "@/components/ui/Reveal";
import { EditorialImage, ImageFrame } from "@/components/media/EditorialImage";
import { AccountSignIn } from "./AccountSignIn";

export const metadata = pageMeta({
  title: "Account",
  description: "Sign in to view your Adeolagold orders, appointments and saved pieces.",
  path: "/account",
  index: false,
});

const perks = [
  {
    title: "Order history",
    copy: "Every order, its tracking number and the exact specification you bought.",
  },
  {
    title: "Appointments",
    copy: "Upcoming bookings, deposits paid, and one-tap rescheduling.",
  },
  {
    title: "Saved pieces",
    copy: "Your wishlist, synced across devices rather than stuck in one browser.",
  },
  {
    title: "Early access",
    copy: "Limited drops open to account holders 24 hours before anyone else.",
  },
];

export default function AccountPage() {
  return (
    <div className="container-page pb-24">
      <Breadcrumbs
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Account", href: "/account" },
        ]}
        className="py-8"
      />

      <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <Reveal>
            <p className="eyebrow mb-5">Account</p>
            <h1 className="display-2 max-w-[12ch]">Welcome back.</h1>
            <p className="body-lg mt-6 max-w-md">
              Sign in to see your orders, your appointments and the pieces you have saved.
            </p>
            <AccountSignIn />
            <p className="mt-8 text-[13px] text-muted">
              Prefer not to have an account?{" "}
              <Link href="/shop" className="link-underline text-ink">
                Checkout as a guest
              </Link>
              .
            </p>
          </Reveal>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <Reveal delay={120}>
            <ImageFrame ratio="16/9">
              <EditorialImage
                seed="account-studio"
                alt="Portrait of a client photographed in the studio"
                tone="studio"
                sizes="(min-width: 1024px) 48vw, 100vw"
              />
            </ImageFrame>

            <dl className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2">
              {perks.map((perk) => (
                <div key={perk.title}>
                  <dt className="font-sans text-[12px] font-medium uppercase tracking-[0.16em] text-ink">
                    {perk.title}
                  </dt>
                  <dd className="mt-2.5 text-[13.5px] leading-relaxed text-ink-soft">
                    {perk.copy}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
