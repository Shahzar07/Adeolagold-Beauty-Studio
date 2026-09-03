"use client";

import { useEffect } from "react";
import { Button, ButtonLink } from "@/components/ui/Button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Replace with your error reporting service (Sentry, Bugsnag, …).
    console.error(error);
  }, [error]);

  return (
    <div className="container-narrow flex min-h-[62svh] flex-col items-center justify-center py-24 text-center">
      <p className="eyebrow mb-6">Something went wrong</p>
      <h1 className="display-2 max-w-[18ch]">We could not load this page.</h1>
      <p className="mt-6 max-w-md text-[15px] leading-relaxed text-ink-soft">
        This is on us, not on you. Try again — and if it keeps happening, the studio is reachable
        on email and WhatsApp.
      </p>
      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <Button onClick={reset} className="sm:min-w-[180px]">
          Try again
        </Button>
        <ButtonLink href="/contact" variant="secondary" className="sm:min-w-[180px]">
          Contact the studio
        </ButtonLink>
      </div>
      {error.digest ? (
        <p className="mt-8 text-[11px] tracking-[0.1em] text-muted">Reference: {error.digest}</p>
      ) : null}
    </div>
  );
}
