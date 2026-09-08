"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";

type ToastTone = "default" | "success" | "error";

interface Toast {
  id: number;
  title: string;
  description?: string;
  tone: ToastTone;
  href?: { label: string; url: string };
}

interface ToastContextValue {
  push: (toast: Omit<Toast, "id" | "tone"> & { tone?: ToastTone }) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside <ToastProvider>");
  return ctx;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const nextId = useRef(1);

  const dismiss = useCallback((id: number) => {
    setToasts((current) => current.filter((t) => t.id !== id));
  }, []);

  const push = useCallback<ToastContextValue["push"]>(
    ({ title, description, href, tone = "default" }) => {
      const id = nextId.current++;
      setToasts((current) => [...current.slice(-2), { id, title, description, href, tone }]);
      window.setTimeout(() => dismiss(id), 4600);
    },
    [dismiss],
  );

  const value = useMemo(() => ({ push }), [push]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        aria-live="polite"
        aria-atomic="false"
        className="pointer-events-none fixed inset-x-0 bottom-0 z-[90] flex flex-col items-center gap-2 px-5 pb-[calc(env(safe-area-inset-bottom)+84px)] md:items-end md:px-8 md:pb-8"
      >
        {toasts.map((toast) => (
          <div
            key={toast.id}
            role="status"
            className="animate-toast-in pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-subtle border border-line bg-shite px-4 py-3.5 shadow-elevated"
          >
            <span
              aria-hidden="true"
              className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${
                toast.tone === "error"
                  ? "bg-error"
                  : toast.tone === "success"
                    ? "bg-success"
                    : "bg-gold"
              }`}
            />
            <div className="min-w-0 flex-1">
              <p className="text-[13px] font-medium tracking-tight text-ink">{toast.title}</p>
              {toast.description ? (
                <p className="mt-0.5 truncate text-[12px] text-muted">{toast.description}</p>
              ) : null}
              {toast.href ? (
                <a
                  href={toast.href.url}
                  className="link-underline mt-1.5 inline-block text-[11px] font-medium uppercase tracking-[0.14em] text-ink"
                >
                  {toast.href.label}
                </a>
              ) : null}
            </div>
            <button
              type="button"
              onClick={() => dismiss(toast.id)}
              aria-label="Dismiss notification"
              className="-m-1 shrink-0 p-1 text-muted transition-colors hover:text-ink"
            >
              <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" aria-hidden="true">
                <path
                  d="M3 3l10 10M13 3L3 13"
                  stroke="currentColor"
                  strokeWidth="1.25"
                  fill="none"
                />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
