"use client";

import { useEffect, useId, useRef, useState } from "react";
import { businessAccount, formatBytes, proofOfPayment, validateProofFile } from "@/lib/payments";
import { cx, formatPrice } from "@/lib/format";
import { Button } from "@/components/ui/Button";
import { BankIcon, CheckIcon, CloseIcon, CopyIcon, ImageIcon, UploadIcon } from "@/components/ui/Icons";

export interface ProofFile {
  file: File;
  /** Object URL for the preview thumbnail — revoked when the file is replaced. */
  previewUrl: string | null;
}

interface BankTransferPanelProps {
  /** Amount due, in pence — quoted so the client transfers the exact figure. */
  total: number;
  /** Reference the client should quote on the transfer. */
  reference: string;
  proof: ProofFile | null;
  onProofChange: (proof: ProofFile | null) => void;
}

const rows = [
  { label: "Account name", value: businessAccount.accountName },
  { label: "Bank", value: businessAccount.bank },
  { label: "Account number", value: businessAccount.accountNumber },
  { label: "Sort code", value: businessAccount.sortCode },
  { label: "IBAN", value: businessAccount.iban },
];

/**
 * Bank transfer instructions plus the proof-of-payment upload.
 *
 * The studio reconciles transfers by hand, so two things matter: the client
 * quotes the reference, and they send a screenshot. Both are one tap here.
 */
export function BankTransferPanel({
  total,
  reference,
  proof,
  onProofChange,
}: BankTransferPanelProps) {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [copied, setCopied] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const id = window.setTimeout(() => setCopied(null), 1800);
    return () => window.clearTimeout(id);
  }, [copied]);

  // Release the last preview URL when the panel unmounts.
  useEffect(() => {
    return () => {
      if (proof?.previewUrl) URL.revokeObjectURL(proof.previewUrl);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const copy = async (label: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(label);
    } catch {
      // Clipboard permission denied — the value is on screen to copy by hand.
      setCopied(null);
    }
  };

  const accept = (file: File | undefined) => {
    if (!file) return;
    const message = validateProofFile(file);
    if (message) {
      setError(message);
      return;
    }
    setError("");
    if (proof?.previewUrl) URL.revokeObjectURL(proof.previewUrl);
    onProofChange({
      file,
      previewUrl: file.type.startsWith("image/") ? URL.createObjectURL(file) : null,
    });
  };

  const remove = () => {
    if (proof?.previewUrl) URL.revokeObjectURL(proof.previewUrl);
    onProofChange(null);
    setError("");
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="mt-3 border border-gold/35 bg-surface p-5 sm:p-6">
      <p className="flex items-center gap-2.5 text-[12px] uppercase tracking-[0.14em] text-gold">
        <BankIcon className="h-4 w-4" />
        Pay by bank transfer
      </p>
      <p className="mt-3 text-[13px] leading-relaxed text-ink-soft">
        Transfer {formatPrice(total)} to the studio account below, quote the reference, then
        upload your payment screenshot so we can match it to your order. Orders are dispatched
        once the transfer clears — usually within minutes for UK Faster Payments.
      </p>

      {/* Account details */}
      <dl className="mt-6 flex flex-col">
        {rows.map((row) => (
          <div
            key={row.label}
            className="flex items-start justify-between gap-4 border-b border-line py-3 first:border-t"
          >
            <dt className="w-[38%] shrink-0 text-[11px] uppercase tracking-[0.12em] text-muted">
              {row.label}
            </dt>
            <dd className="min-w-0 flex-1 break-words text-[13.5px] text-ink">{row.value}</dd>
            <button
              type="button"
              onClick={() => copy(row.label, row.value)}
              aria-label={`Copy ${row.label.toLowerCase()}`}
              className="-my-1 flex h-8 w-8 shrink-0 items-center justify-center text-muted transition-colors duration-[180ms] hover:text-gold"
            >
              {copied === row.label ? (
                <CheckIcon className="h-4 w-4 text-gold" />
              ) : (
                <CopyIcon className="h-4 w-4" />
              )}
            </button>
          </div>
        ))}

        <div className="flex items-start justify-between gap-4 border-b border-line py-3">
          <dt className="w-[38%] shrink-0 text-[11px] uppercase tracking-[0.12em] text-muted">
            Reference
          </dt>
          <dd className="min-w-0 flex-1 break-words text-[13.5px] font-medium text-gold">
            {reference}
          </dd>
          <button
            type="button"
            onClick={() => copy("Reference", reference)}
            aria-label="Copy payment reference"
            className="-my-1 flex h-8 w-8 shrink-0 items-center justify-center text-muted transition-colors duration-[180ms] hover:text-gold"
          >
            {copied === "Reference" ? (
              <CheckIcon className="h-4 w-4 text-gold" />
            ) : (
              <CopyIcon className="h-4 w-4" />
            )}
          </button>
        </div>

        <div className="flex items-start justify-between gap-4 border-b border-line py-3">
          <dt className="w-[38%] shrink-0 text-[11px] uppercase tracking-[0.12em] text-muted">
            Amount
          </dt>
          <dd className="min-w-0 flex-1 text-[13.5px] tabular-nums text-ink">
            {formatPrice(total)}
          </dd>
          <span className="w-8 shrink-0" aria-hidden="true" />
        </div>
      </dl>

      <p aria-live="polite" className="sr-only">
        {copied ? `${copied} copied to clipboard` : ""}
      </p>

      {/* Proof of payment ------------------------------------------------ */}
      <div className="mt-7">
        <p className="field-label">Payment screenshot</p>

        <input
          ref={inputRef}
          id={inputId}
          type="file"
          accept={proofOfPayment.accept}
          className="sr-only"
          onChange={(event) => accept(event.target.files?.[0])}
          aria-describedby={`${inputId}-hint`}
        />

        {proof ? (
          <div className="flex items-center gap-4 border border-line bg-surface-light p-3">
            <span className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-subtle border border-line bg-background">
              {proof.previewUrl ? (
                // A local object URL — next/image would gain nothing here.
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={proof.previewUrl}
                  alt="Your uploaded payment screenshot"
                  className="h-full w-full object-cover"
                />
              ) : (
                <ImageIcon className="h-5 w-5 text-muted" />
              )}
            </span>
            <span className="min-w-0 flex-1">
              <span className="flex items-center gap-2 text-[13px] text-ink">
                <CheckIcon className="h-4 w-4 shrink-0 text-gold" />
                <span className="truncate">{proof.file.name}</span>
              </span>
              <span className="mt-1 block text-[11.5px] text-muted">
                {formatBytes(proof.file.size)} · attached to this order
              </span>
            </span>
            <span className="flex shrink-0 items-center gap-1">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="px-4"
                onClick={() => inputRef.current?.click()}
              >
                Replace
              </Button>
              <button
                type="button"
                onClick={remove}
                aria-label="Remove payment screenshot"
                className="flex h-9 w-9 items-center justify-center text-muted transition-colors duration-[180ms] hover:text-error"
              >
                <CloseIcon className="h-4 w-4" />
              </button>
            </span>
          </div>
        ) : (
          <label
            htmlFor={inputId}
            onDragOver={(event) => {
              event.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={(event) => {
              event.preventDefault();
              setDragging(false);
              accept(event.dataTransfer.files?.[0]);
            }}
            className={cx(
              "flex cursor-pointer flex-col items-center justify-center gap-2 border border-dashed px-6 py-8 text-center transition-colors duration-[180ms]",
              dragging ? "border-gold bg-gold/5" : "border-line hover:border-gold",
            )}
          >
            <UploadIcon className="h-6 w-6 text-gold" />
            <span className="text-[13.5px] text-ink">Upload your payment screenshot</span>
            <span className="text-[11.5px] text-muted">
              Drag and drop, or click to choose a file
            </span>
          </label>
        )}

        <p id={`${inputId}-hint`} className="mt-2 text-[11.5px] leading-relaxed text-muted">
          PNG, JPG, WEBP, HEIC or PDF, up to {formatBytes(proofOfPayment.maxBytes)}. Optional —
          you can also send it to the studio on WhatsApp — but attaching it here is the fastest
          way to get your order released.
        </p>

        {error ? (
          <p role="alert" className="mt-2 text-[12px] text-error">
            {error}
          </p>
        ) : null}
      </div>
    </div>
  );
}
