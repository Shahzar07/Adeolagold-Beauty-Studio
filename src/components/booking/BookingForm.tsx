"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { services } from "@/lib/services";
import { useClientToday } from "@/lib/hooks";
import { cx, formatPrice } from "@/lib/format";
import { Button, ButtonLink } from "@/components/ui/Button";
import { ArrowLeftIcon, CheckIcon, ClockIcon } from "@/components/ui/Icons";
import { useToast } from "@/context/ToastProvider";

const STEPS = ["Service", "Date", "Time", "Details", "Confirm"] as const;
type StepIndex = 0 | 1 | 2 | 3 | 4;

/* The studio is closed on Sundays and Mondays (appointment only). */
const CLOSED_DAYS = [0, 1];

const MORNING = ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30"];
const AFTERNOON = ["12:30", "13:00", "13:30", "14:00", "14:30", "15:00"];
const EVENING = ["15:30", "16:00", "16:30", "17:00"];

interface Details {
  name: string;
  email: string;
  phone: string;
  notes: string;
  consent: boolean;
}

const emptyDetails: Details = {
  name: "",
  email: "",
  phone: "",
  notes: "",
  consent: false,
};

function isoDate(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(
    date.getDate(),
  ).padStart(2, "0")}`;
}

/** Deterministically marks a few slots as taken so the calendar reads as real. */
function slotTaken(dateKey: string, time: string) {
  let hash = 0;
  const value = `${dateKey}${time}`;
  for (let i = 0; i < value.length; i += 1) hash = (hash * 31 + value.charCodeAt(i)) >>> 0;
  return hash % 100 < 34;
}

export function BookingForm({ initialService }: { initialService?: string }) {
  const [step, setStep] = useState<StepIndex>(initialService ? 1 : 0);
  const [serviceSlug, setServiceSlug] = useState(initialService ?? "");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [details, setDetails] = useState<Details>(emptyDetails);
  const [errors, setErrors] = useState<Partial<Record<keyof Details, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [reference, setReference] = useState("");
  const { push } = useToast();

  // Resolved on the client only, so the server render and the hydration render
  // can never disagree about what "today" is.
  const today = useClientToday();

  const service = services.find((s) => s.slug === serviceSlug);

  const availableDates = useMemo(() => {
    if (!today) return [];
    const dates: Date[] = [];
    for (let offset = 1; offset <= 45; offset += 1) {
      const candidate = new Date(today);
      candidate.setDate(today.getDate() + offset);
      if (!CLOSED_DAYS.includes(candidate.getDay())) dates.push(candidate);
    }
    return dates;
  }, [today]);

  const goTo = (next: StepIndex) => {
    setStep(next);
    if (typeof window !== "undefined") {
      document.getElementById("booking-flow")?.scrollIntoView({ block: "start" });
    }
  };

  const validateDetails = () => {
    const next: Partial<Record<keyof Details, string>> = {};
    if (details.name.trim().length < 2) next.name = "Please enter your full name.";
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/.test(details.email))
      next.email = "Please enter a valid email address.";
    if (details.phone.replace(/[^0-9]/g, "").length < 9)
      next.phone = "Please enter a contactable phone number.";
    if (!details.consent) next.consent = "Please accept the booking policy to continue.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const confirm = async () => {
    setSubmitting(true);
    // Wire this to your booking backend (Shopify, Treatwell, Square, Calendly…).
    await new Promise((resolve) => setTimeout(resolve, 900));
    setReference(`AG-${Math.random().toString(36).slice(2, 7).toUpperCase()}`);
    setSubmitting(false);
    push({ title: "Appointment confirmed", description: "Check your inbox for the details.", tone: "success" });
    goTo(4);
  };

  /* ---------------------------------------------------------------- */
  /* Confirmation                                                     */
  /* ---------------------------------------------------------------- */
  if (reference) {
    return (
      <div className="mx-auto max-w-xl py-6 text-center">
        <span className="animate-fade-up mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-gold text-gold">
          <CheckIcon className="h-7 w-7" />
        </span>
        <h2 className="display-2 animate-fade-up mt-9" style={{ animationDelay: "120ms" }}>
          You&rsquo;re booked.
        </h2>
        <p
          className="animate-fade-up mt-5 text-[16px] leading-relaxed text-ink-soft"
          style={{ animationDelay: "200ms" }}
        >
          We can&rsquo;t wait to welcome you to Adeolagold.
        </p>

        <dl
          className="animate-fade-up mt-10 divide-y divide-line border-y border-line text-left text-[13.5px]"
          style={{ animationDelay: "280ms" }}
        >
          {[
            { label: "Reference", value: reference },
            { label: "Service", value: service?.title ?? "" },
            { label: "Date", value: formatLongDate(date) },
            { label: "Time", value: time },
            { label: "Name", value: details.name },
            {
              label: "Deposit paid",
              value: service ? formatPrice(service.depositPence) : "",
            },
          ].map((row) => (
            <div key={row.label} className="flex items-baseline justify-between gap-6 py-3.5">
              <dt className="text-muted">{row.label}</dt>
              <dd className="text-right text-ink">{row.value}</dd>
            </div>
          ))}
        </dl>

        <p
          className="animate-fade-up mt-7 text-[13px] leading-relaxed text-muted"
          style={{ animationDelay: "340ms" }}
        >
          A confirmation is on its way to {details.email}. You&rsquo;ll get a reminder 48 hours
          before, with a link to reschedule if you need it.
        </p>

        <div
          className="animate-fade-up mt-10 flex flex-col justify-center gap-3 sm:flex-row"
          style={{ animationDelay: "400ms" }}
        >
          <ButtonLink href="/shop" className="sm:min-w-[190px]">
            Shop the hair
          </ButtonLink>
          <ButtonLink href="/help/booking-policy" variant="secondary" className="sm:min-w-[190px]">
            Booking policy
          </ButtonLink>
        </div>
      </div>
    );
  }

  /* ---------------------------------------------------------------- */
  /* Flow                                                             */
  /* ---------------------------------------------------------------- */
  return (
    <div id="booking-flow">
      {/* Progress */}
      <ol className="mb-12 flex items-center gap-2" aria-label="Booking steps">
        {STEPS.slice(0, 4).map((label, index) => {
          const done = index < step;
          const current = index === step;
          return (
            <li key={label} className="flex flex-1 items-center gap-2">
              <button
                type="button"
                onClick={() => (done ? goTo(index as StepIndex) : undefined)}
                disabled={!done}
                aria-current={current ? "step" : undefined}
                className={cx(
                  "flex flex-1 flex-col gap-2 text-left",
                  done && "cursor-pointer",
                )}
              >
                <span
                  className={cx(
                    "h-[2px] w-full transition-colors duration-[350ms] ease-lux",
                    done ? "bg-gold" : current ? "bg-ink" : "bg-line",
                  )}
                />
                <span
                  className={cx(
                    "text-[10px] font-medium uppercase tracking-[0.16em] transition-colors",
                    current ? "text-ink" : done ? "text-gold" : "text-muted",
                  )}
                >
                  {index + 1}. {label}
                </span>
              </button>
            </li>
          );
        })}
      </ol>

      {step > 0 ? (
        <button
          type="button"
          onClick={() => goTo((step - 1) as StepIndex)}
          className="mb-8 flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.14em] text-ink-soft transition-colors hover:text-ink"
        >
          <ArrowLeftIcon className="h-3.5 w-3.5" /> Back
        </button>
      ) : null}

      {/* Step 1 — service */}
      {step === 0 ? (
        <section aria-label="Choose a service" className="animate-fade-up">
          <h2 className="display-3 mb-8">Which service?</h2>
          <ul className="border-t border-line">
            {services.map((option) => (
              <li key={option.slug} className="border-b border-line">
                <button
                  type="button"
                  onClick={() => {
                    setServiceSlug(option.slug);
                    goTo(1);
                  }}
                  className="group flex w-full items-center justify-between gap-6 py-6 text-left"
                >
                  <div className="min-w-0">
                    <h3 className="font-display text-[22px] leading-tight transition-[color,transform] duration-[350ms] ease-lux group-hover:translate-x-1 group-hover:text-gold">
                      {option.title}
                    </h3>
                    <p className="mt-1.5 max-w-[48ch] text-[13px] leading-relaxed text-ink-soft">
                      {option.summary}
                    </p>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="text-[13px] tabular-nums text-ink">
                      From {formatPrice(option.fromPrice)}
                    </p>
                    <p className="mt-1 flex items-center justify-end gap-1.5 text-[11px] text-muted">
                      <ClockIcon className="h-3.5 w-3.5" />
                      {option.duration}
                    </p>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {/* Step 2 — date */}
      {step === 1 ? (
        <section aria-label="Choose a date" className="animate-fade-up">
          <h2 className="display-3 mb-3">Choose a date</h2>
          <p className="mb-8 text-[13.5px] text-muted">
            {service?.title} · closed Sundays and Mondays except by arrangement.
          </p>

          {!today ? (
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-6">
              {Array.from({ length: 18 }, (_, i) => (
                <div key={i} className="skeleton h-[76px] rounded-subtle" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-6">
              {availableDates.slice(0, 24).map((candidate) => {
                const key = isoDate(candidate);
                const selected = key === date;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => {
                      setDate(key);
                      setTime("");
                      goTo(2);
                    }}
                    className={cx(
                      "flex h-[76px] flex-col items-center justify-center gap-0.5 border transition-colors duration-[180ms]",
                      selected
                        ? "border-gold bg-gold text-black"
                        : "border-line text-ink hover:border-gold",
                    )}
                  >
                    <span className="text-[10px] uppercase tracking-[0.14em] opacity-70">
                      {candidate.toLocaleDateString("en-GB", { weekday: "short" })}
                    </span>
                    <span className="font-display text-[22px] leading-none">
                      {candidate.getDate()}
                    </span>
                    <span className="text-[10px] uppercase tracking-[0.14em] opacity-70">
                      {candidate.toLocaleDateString("en-GB", { month: "short" })}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </section>
      ) : null}

      {/* Step 3 — time */}
      {step === 2 ? (
        <section aria-label="Choose a time" className="animate-fade-up">
          <h2 className="display-3 mb-3">Choose a time</h2>
          <p className="mb-8 text-[13.5px] text-muted">
            {formatLongDate(date)} · allow {service?.duration}.
          </p>

          {[
            { label: "Morning", slots: MORNING },
            { label: "Afternoon", slots: AFTERNOON },
            { label: "Late afternoon", slots: EVENING },
          ].map((group) => (
            <div key={group.label} className="mb-9">
              <p className="eyebrow mb-4">{group.label}</p>
              <div className="flex flex-wrap gap-2">
                {group.slots.map((slot) => {
                  const taken = slotTaken(date, slot);
                  const selected = slot === time;
                  return (
                    <button
                      key={slot}
                      type="button"
                      disabled={taken}
                      onClick={() => {
                        setTime(slot);
                        goTo(3);
                      }}
                      className={cx(
                        "h-11 min-w-[80px] border px-4 text-[13px] tabular-nums transition-colors duration-[180ms]",
                        taken
                          ? "cursor-not-allowed border-line text-muted/50 line-through"
                          : selected
                            ? "border-gold bg-gold text-black"
                            : "border-line text-ink hover:border-gold",
                      )}
                    >
                      {slot}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </section>
      ) : null}

      {/* Step 4 — details */}
      {step === 3 ? (
        <section aria-label="Your details" className="animate-fade-up">
          <h2 className="display-3 mb-8">Your details</h2>

          <form
            noValidate
            onSubmit={(event) => {
              event.preventDefault();
              if (validateDetails()) confirm();
            }}
            className="grid gap-6 lg:grid-cols-12"
          >
            <div className="flex flex-col gap-5 lg:col-span-7">
              <Field
                id="booking-name"
                label="Full name"
                value={details.name}
                error={errors.name}
                autoComplete="name"
                onChange={(value) => setDetails((d) => ({ ...d, name: value }))}
              />
              <Field
                id="booking-email"
                label="Email"
                type="email"
                value={details.email}
                error={errors.email}
                autoComplete="email"
                onChange={(value) => setDetails((d) => ({ ...d, email: value }))}
              />
              <Field
                id="booking-phone"
                label="Phone"
                type="tel"
                value={details.phone}
                error={errors.phone}
                autoComplete="tel"
                onChange={(value) => setDetails((d) => ({ ...d, phone: value }))}
              />

              <div>
                <label htmlFor="booking-notes" className="field-label">
                  Notes <span className="normal-case tracking-normal text-muted">(optional)</span>
                </label>
                <textarea
                  id="booking-notes"
                  rows={4}
                  value={details.notes}
                  onChange={(event) =>
                    setDetails((d) => ({ ...d, notes: event.target.value }))
                  }
                  placeholder="Tell us about your hair, your hairline, or anything you'd like us to know."
                  className="field"
                />
              </div>

              <div>
                <label className="flex cursor-pointer items-start gap-3 text-[13px] leading-relaxed text-ink-soft">
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={details.consent}
                    onChange={(event) =>
                      setDetails((d) => ({ ...d, consent: event.target.checked }))
                    }
                    aria-invalid={Boolean(errors.consent)}
                  />
                  <span
                    aria-hidden="true"
                    className={cx(
                      "mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center border transition-colors duration-[180ms]",
                      details.consent ? "border-gold bg-gold text-black" : "border-line",
                      errors.consent && !details.consent && "border-error",
                    )}
                  >
                    {details.consent ? <CheckIcon className="h-2.5 w-2.5" /> : null}
                  </span>
                  <span>
                    I have read and accept the{" "}
                    <Link href="/help/booking-policy" className="link-underline text-ink">
                      booking policy
                    </Link>
                    , including the deposit and 48-hour cancellation terms.
                  </span>
                </label>
                {errors.consent ? (
                  <p role="alert" className="mt-2 text-[12px] text-error">
                    {errors.consent}
                  </p>
                ) : null}
              </div>
            </div>

            {/* Summary + deposit */}
            <aside className="lg:col-span-4 lg:col-start-9">
              <div className="border border-line bg-surface-light p-6">
                <p className="eyebrow mb-5">Your appointment</p>
                <dl className="flex flex-col gap-3 text-[13.5px]">
                  <Row label="Service" value={service?.title ?? ""} />
                  <Row label="Date" value={formatLongDate(date)} />
                  <Row label="Time" value={time} />
                  <Row label="Duration" value={service?.duration ?? ""} />
                </dl>

                <div className="mt-6 border-t border-line pt-5">
                  <dl className="flex flex-col gap-2.5 text-[13.5px]">
                    <Row
                      label="Service from"
                      value={service ? formatPrice(service.fromPrice) : ""}
                    />
                    <div className="flex items-baseline justify-between gap-4">
                      <dt className="text-ink">Deposit due today</dt>
                      <dd className="font-display text-[20px] leading-none tabular-nums">
                        {service ? formatPrice(service.depositPence) : ""}
                      </dd>
                    </div>
                  </dl>
                  <p className="mt-4 text-[12px] leading-relaxed text-muted">
                    The deposit secures your slot and is deducted from your balance on the day.
                    The remainder is settled in the studio.
                  </p>
                </div>

                <Button type="submit" disabled={submitting} fullWidth className="mt-6">
                  {submitting ? "Confirming…" : "Confirm & pay deposit"}
                </Button>
              </div>
            </aside>
          </form>
        </section>
      ) : null}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <dt className="text-muted">{label}</dt>
      <dd className="text-right text-ink">{value}</dd>
    </div>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  error,
  type = "text",
  autoComplete,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  type?: string;
  autoComplete?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="field-label">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        autoComplete={autoComplete}
        onChange={(event) => onChange(event.target.value)}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cx("field", error && "border-error")}
      />
      {error ? (
        <p id={`${id}-error`} role="alert" className="mt-2 text-[12px] text-error">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function formatLongDate(iso: string) {
  if (!iso) return "";
  const [year, month, day] = iso.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
