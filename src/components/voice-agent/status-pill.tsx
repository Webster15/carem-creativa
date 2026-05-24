"use client";

import { useConversationStatus, useConversationMode } from "@elevenlabs/react";
import { cn } from "@/lib/utils";

export function StatusPill() {
  const { status } = useConversationStatus();
  const { mode } = useConversationMode();

  if (status !== "connected") return null;
  const label = mode === "speaking" ? "Asistente hablando" : "Asistente escuchando";

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "fixed bottom-20 right-5 sm:bottom-24 sm:right-6 z-40",
        "rounded-full bg-neutral-900/80 text-white px-3 py-1 text-xs",
        "backdrop-blur"
      )}
    >
      <span className="inline-flex items-center gap-1.5">
        <span
          className={cn(
            "h-2 w-2 rounded-full",
            mode === "speaking"
              ? "bg-emerald-400 animate-pulse"
              : "bg-amber-300 animate-pulse"
          )}
        />
        {label}
      </span>
    </div>
  );
}
