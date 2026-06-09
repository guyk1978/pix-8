"use client";

import type { ToastItem } from "@/components/ui/ToastProvider";

interface ToastContainerProps {
  toasts: ToastItem[];
  onDismiss: (id: string) => void;
}

export function ToastContainer({ toasts, onDismiss }: ToastContainerProps) {
  if (toasts.length === 0) return null;

  return (
    <div
      className="pointer-events-none fixed bottom-5 right-5 z-[100] flex w-full max-w-sm flex-col gap-2"
      aria-live="polite"
      aria-label="Notifications"
    >
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} onDismiss={onDismiss} />
      ))}
    </div>
  );
}

interface ToastProps {
  toast: ToastItem;
  onDismiss: (id: string) => void;
}

function Toast({ toast, onDismiss }: ToastProps) {
  return (
    <div
      role="status"
      className="animate-toast-in pointer-events-auto flex items-start gap-3 rounded-sm border border-[#333] bg-[#1a1a1a] px-4 py-3 shadow-[0_8px_24px_rgba(0,0,0,0.45)]"
    >
      <span className="mt-0.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-foreground" />
      <div className="min-w-0 flex-1">
        {toast.title && (
          <p className="font-label text-muted">{toast.title}</p>
        )}
        <p
          className={`font-mono text-xs leading-relaxed text-foreground ${
            toast.title ? "mt-1" : ""
          }`}
        >
          {toast.message}
        </p>
      </div>
      <button
        type="button"
        onClick={() => onDismiss(toast.id)}
        className="shrink-0 font-mono text-xs text-muted transition-colors hover:text-foreground"
        aria-label="Dismiss notification"
      >
        ×
      </button>
    </div>
  );
}
