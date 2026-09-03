"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { ArrowRightIcon, CheckIcon } from "@/components/ui/Icons";

export function Newsletter({ variant = "footer" }: { variant?: "footer" | "section" }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [message, setMessage] = useState("");

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/.test(email)) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }
    setStatus("loading");
    setMessage("");
    // Wire this to your ESP (Klaviyo, Mailchimp, Shopify) — the UI states are ready.
    await new Promise((resolve) => setTimeout(resolve, 700));
    setStatus("done");
    setMessage("You're on the list. Look out for the next drop.");
    setEmail("");
  };

  const onDark = variant === "footer";

  return (
    <div className={variant === "section" ? "max-w-md" : ""}>
      <form onSubmit={onSubmit} noValidate className="flex flex-col gap-3">
        <label htmlFor={`newsletter-${variant}`} className="sr-only">
          Email address
        </label>
        <div className="flex items-stretch gap-0">
          <input
            id={`newsletter-${variant}`}
            type="email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              if (status === "error") setStatus("idle");
            }}
            placeholder="Email address"
            autoComplete="email"
            aria-invalid={status === "error"}
            aria-describedby={message ? `newsletter-msg-${variant}` : undefined}
            className={
              onDark
                ? "h-[52px] min-w-0 flex-1 border border-white/25 bg-transparent px-4 text-[14px] text-white placeholder:text-white/45 focus:border-gold focus:outline-none"
                : "field flex-1"
            }
          />
          <Button
            type="submit"
            disabled={status === "loading"}
            variant={onDark ? "gold" : "primary"}
            className="shrink-0 rounded-none px-6"
            aria-label="Subscribe"
          >
            {status === "loading" ? (
              "…"
            ) : status === "done" ? (
              <CheckIcon className="h-4 w-4" />
            ) : (
              <ArrowRightIcon className="h-4 w-4" />
            )}
          </Button>
        </div>

        {message ? (
          <p
            id={`newsletter-msg-${variant}`}
            role="status"
            className={`text-[12px] ${
              status === "error"
                ? "text-error"
                : onDark
                  ? "text-gold-light"
                  : "text-success"
            }`}
          >
            {message}
          </p>
        ) : null}

        <p className={`text-[11px] leading-relaxed ${onDark ? "text-white/40" : "text-muted"}`}>
          By subscribing you agree to receive marketing emails. Unsubscribe at any time.
        </p>
      </form>
    </div>
  );
}
