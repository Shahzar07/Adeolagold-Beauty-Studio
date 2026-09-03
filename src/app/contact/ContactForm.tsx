"use client";

import { useState } from "react";
import { cx } from "@/lib/format";
import { Button } from "@/components/ui/Button";
import { CheckIcon } from "@/components/ui/Icons";

const topics = ["An order", "An appointment", "Hair advice", "Wholesale", "Something else"];

export function ContactForm() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    topic: topics[0],
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    const next: Record<string, string> = {};
    if (values.name.trim().length < 2) next.name = "Please enter your name.";
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/.test(values.email))
      next.email = "Please enter a valid email address.";
    if (values.message.trim().length < 10)
      next.message = "A little more detail helps us answer properly.";
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setSending(true);
    // Wire this to your form handler (Formspree, Resend, a route handler…).
    await new Promise((resolve) => setTimeout(resolve, 800));
    setSending(false);
    setSent(true);
  };

  if (sent) {
    return (
      <div className="animate-fade-up border border-line bg-surface-light p-10 text-center">
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-gold text-gold">
          <CheckIcon className="h-5 w-5" />
        </span>
        <p className="display-4 mt-6">Message received.</p>
        <p className="mt-3 text-[14px] leading-relaxed text-ink-soft">
          We answer everything within one working day. For anything urgent, WhatsApp is fastest.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="field-label">
            Name
          </label>
          <input
            id="contact-name"
            value={values.name}
            autoComplete="name"
            onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
            aria-invalid={Boolean(errors.name)}
            className={cx("field", errors.name && "border-error")}
          />
          {errors.name ? (
            <p role="alert" className="mt-2 text-[12px] text-error">
              {errors.name}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor="contact-email" className="field-label">
            Email
          </label>
          <input
            id="contact-email"
            type="email"
            value={values.email}
            autoComplete="email"
            onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
            aria-invalid={Boolean(errors.email)}
            className={cx("field", errors.email && "border-error")}
          />
          {errors.email ? (
            <p role="alert" className="mt-2 text-[12px] text-error">
              {errors.email}
            </p>
          ) : null}
        </div>
      </div>

      <fieldset>
        <legend className="field-label">What is it about?</legend>
        <div className="flex flex-wrap gap-2">
          {topics.map((topic) => (
            <label
              key={topic}
              className={cx(
                "flex h-11 cursor-pointer items-center border px-4 text-[12.5px] transition-colors duration-[180ms]",
                values.topic === topic
                  ? "border-ink bg-ink text-white"
                  : "border-line text-ink-soft hover:border-ink hover:text-ink",
              )}
            >
              <input
                type="radio"
                name="topic"
                className="sr-only"
                checked={values.topic === topic}
                onChange={() => setValues((v) => ({ ...v, topic }))}
              />
              {topic}
            </label>
          ))}
        </div>
      </fieldset>

      <div>
        <label htmlFor="contact-message" className="field-label">
          Message
        </label>
        <textarea
          id="contact-message"
          rows={6}
          value={values.message}
          onChange={(e) => setValues((v) => ({ ...v, message: e.target.value }))}
          aria-invalid={Boolean(errors.message)}
          className={cx("field", errors.message && "border-error")}
        />
        {errors.message ? (
          <p role="alert" className="mt-2 text-[12px] text-error">
            {errors.message}
          </p>
        ) : null}
      </div>

      <Button type="submit" disabled={sending} className="mt-1 self-start sm:min-w-[190px]">
        {sending ? "Sending…" : "Send message"}
      </Button>
    </form>
  );
}
