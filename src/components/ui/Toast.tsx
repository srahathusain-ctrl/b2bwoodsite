"use client";

import { useEffect } from "react";
import { useUIStore } from "@/store/ui-store";
import { cn } from "@/lib/utils";

const ICONS = {
  success: "✓",
  error: "✕",
  warning: "⚠",
  info: "ℹ",
};

const COLORS = {
  success: "border-green/30 bg-green/10 text-green",
  error: "border-red/30 bg-red/10 text-red",
  warning: "border-gold/30 bg-gold/10 text-gold",
  info: "border-blue/30 bg-blue/10 text-blue",
};

export function ToastContainer() {
  const { toasts, removeToast } = useUIStore();

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 pointer-events-none">
      {toasts.map((toast) => (
        <ToastItem
          key={toast.id}
          toast={toast}
          onDismiss={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
}

function ToastItem({
  toast,
  onDismiss,
}: {
  toast: { id: string; type: "success" | "error" | "warning" | "info"; title: string; message?: string };
  onDismiss: () => void;
}) {
  useEffect(() => {
    const t = setTimeout(onDismiss, 4000);
    return () => clearTimeout(t);
  }, [onDismiss]);

  return (
    <div
      className={cn(
        "pointer-events-auto flex items-start gap-3 min-w-[280px] max-w-sm px-4 py-3 rounded-xl border shadow-lg backdrop-blur-sm animate-fade-slide-up",
        COLORS[toast.type]
      )}
    >
      <span className="text-base font-bold flex-shrink-0 mt-0.5">
        {ICONS[toast.type]}
      </span>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-semibold">{toast.title}</div>
        {toast.message && (
          <div className="text-xs mt-0.5 opacity-80">{toast.message}</div>
        )}
      </div>
      <button
        onClick={onDismiss}
        className="text-xs opacity-60 hover:opacity-100 transition-opacity flex-shrink-0 ml-1"
      >
        ✕
      </button>
    </div>
  );
}
