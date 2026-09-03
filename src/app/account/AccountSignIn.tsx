"use client";

import { useState } from "react";
import { cx } from "@/lib/format";
import { Button } from "@/components/ui/Button";
import { CheckIcon } from "@/components/ui/Icons";

/**
 * Passwordless sign-in shell. Swap the timeout for your auth provider
 * (Shopify customer accounts, Clerk, Auth.js…) — the states are in place.
 */
export function AccountSignIn() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    setStatus("sending");
    await new Promise((resolve) => setTimeout(resolve, 800));
    setStatus("sent");
  };

  if (status === "sent") {
    return (
      <div className="animate-fade-up mt-9 border border-line bg-surface-light p-7">
        <span className="flex h-11 w-11 items-center justify-center rounded-full border border-gold text-gold">
          <CheckIcon className="h-5 w-5" />
        </span>
        <p className="display-4 mt-5">Check your inbox.</p>
        <p className="mt-3 text-[13.5px] leading-relaxed text-ink-soft">
          We have sent a sign-in link to <strong className="font-medium text-ink">{email}</strong>.
          It is valid for fifteen minutes.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="link-underline mt-5 text-[11px] uppercase tracking-[0.14em] text-ink-soft transition-colors hover:text-ink"
        >
          Use a different email
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="mt-9 flex flex-col gap-4">
      <div>
        <label htmlFor="account-email" className="field-label">
          Email
        </label>
        <input
          id="account-email"
          type="email"
          value={email}
          autoComplete="email"
          onChange={(event) => {
            setEmail(event.target.value);
            setError("");
          }}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? "account-email-error" : undefined}
          className={cx("field", error && "border-error")}
        />
        {error ? (
          <p id="account-email-error" role="alert" className="mt-2 text-[12px] text-error">
            {error}
          </p>
        ) : null}
      </div>

      <Button type="submit" disabled={status === "sending"} fullWidth>
        {status === "sending" ? "Sending link…" : "Email me a sign-in link"}
      </Button>
      <p className="text-[11.5px] leading-relaxed text-muted">
        No password required. We will email you a secure link to sign in.
      </p>
    </form>
  );
}
