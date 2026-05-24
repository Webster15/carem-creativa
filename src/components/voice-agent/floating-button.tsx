"use client";

import {
  useConversationControls,
  useConversationStatus,
  useConversationMode,
} from "@elevenlabs/react";
import { Mic, MicOff, Loader2, Volume2, X } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { fetchSignedUrl } from "@/lib/elevenlabs";
import { cn } from "@/lib/utils";

export function FloatingButton() {
  const { startSession, endSession } = useConversationControls();
  const { status } = useConversationStatus();
  const { mode } = useConversationMode();

  const isConnected = status === "connected";
  const isConnecting = status === "connecting";
  const isSpeaking = isConnected && mode === "speaking";

  async function handleStart() {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      const signedUrl = await fetchSignedUrl();
      startSession({ signedUrl, connectionType: "websocket" });
    } catch (err) {
      if (err instanceof DOMException && err.name === "NotAllowedError") {
        toast.error("Permite el micrófono para hablar con el asistente.");
      } else {
        console.error("[agent] start failed", err);
        toast.error(
          "No pude iniciar el asistente. Verifica que el agente esté configurado."
        );
      }
    }
  }

  const label = isConnecting
    ? "Conectando…"
    : isSpeaking
      ? "Hablando…"
      : isConnected
        ? "Escuchando…"
        : "Hablar";

  const Icon = isConnecting
    ? Loader2
    : isSpeaking
      ? Volume2
      : isConnected
        ? Mic
        : MicOff;

  return (
    <motion.button
      type="button"
      aria-label={isConnected ? "Detener asistente de voz" : "Hablar con el asistente"}
      onClick={isConnected ? () => endSession() : handleStart}
      animate={isSpeaking ? { scale: [1, 1.06, 1] } : { scale: 1 }}
      transition={{
        repeat: isSpeaking ? Infinity : 0,
        duration: 1.2,
        ease: "easeInOut",
      }}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      className={cn(
        "fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50",
        "flex items-center gap-2 px-5 py-3 shadow-xl",
        "text-cream font-display text-xs tracking-[0.15em] uppercase",
        "transition-colors",
        isConnected ? "bg-accent" : "bg-brand hover:bg-accent"
      )}
    >
      <Icon
        className={cn("h-5 w-5", isConnecting && "animate-spin")}
        aria-hidden
      />
      <span>{label}</span>
      {isConnected && <X className="h-4 w-4 opacity-70" aria-hidden />}
    </motion.button>
  );
}
