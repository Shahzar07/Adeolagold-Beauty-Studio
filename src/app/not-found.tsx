import { ButtonLink } from "@/components/ui/Button";
import { EditorialImage } from "@/components/media/EditorialImage";

export default function NotFound() {
  return (
    <div className="relative flex min-h-[70svh] items-center overflow-hidden bg-black">
      <div className="grain absolute inset-0 opacity-70">
        <EditorialImage seed="not-found" alt="" tone="campaign" sizes="100vw" />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-transparent"
      />
      <div className="container-page relative py-24">
        <p className="eyebrow mb-6 text-white/50">Error 404</p>
        <h1 className="font-display text-[clamp(2.6rem,6vw,4.5rem)] leading-[1.02] tracking-[-0.028em] text-white">
          This page has
          <br />
          moved on.
        </h1>
        <p className="mt-6 max-w-md text-[15px] leading-relaxed text-white/65">
          The link may be out of date, or the piece may have sold out. Everything currently in the
          studio is a click away.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/shop" variant="gold" className="sm:min-w-[180px]">
            Shop hair
          </ButtonLink>
          <ButtonLink href="/" variant="onDark" className="sm:min-w-[180px]">
            Back to home
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}
