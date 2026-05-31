"use client";

import {
  useConversationControls,
  useConversationStatus,
  useConversationMode,
} from "@elevenlabs/react";
import { Mic, Loader2, Volume2, X } from "lucide-react";
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
      // ── iOS Safari: desbloquear AMBAS APIs de audio sincrónicamente ──
      // 1) HTMLAudioElement — ElevenLabs usa esto para reproducir la voz
      const silentAudio = new Audio(
        "data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQAAAAA="
      );
      silentAudio.play().catch(() => {/* silencioso — solo desbloquea */});

      // 2) AudioContext — por si el SDK lo usa internamente
      const ACtx =
        (window as unknown as { AudioContext?: typeof AudioContext; webkitAudioContext?: typeof AudioContext })
          .AudioContext ??
        (window as unknown as { AudioContext?: typeof AudioContext; webkitAudioContext?: typeof AudioContext })
          .webkitAudioContext;
      if (ACtx) {
        const ctx = new ACtx();
        const buf = ctx.createBuffer(1, 1, 22050);
        const src = ctx.createBufferSource();
        src.buffer = buf;
        src.connect(ctx.destination);
        src.start(0);
        ctx.resume(); // sin await — no rompemos el contexto de gesto
        (window as unknown as Record<string, unknown>).__caremAudioCtx = ctx;
      }

      await navigator.mediaDevices.getUserMedia({ audio: true });
      const signedUrl = await fetchSignedUrl();
      startSession({ signedUrl, connectionType: "websocket" });
    } catch (err) {
      if (err instanceof DOMException && err.name === "NotAllowedError") {
        toast.error("Permite el micrófono para hablar con el asistente.");
      } else {
        console.error("[agent] start failed", err);
        toast.error("No pude iniciar el asistente. Verifica la configuración.");
      }
    }
  }

  const label = isConnecting
    ? "Conectando…"
    : isSpeaking
      ? "Hablando…"
      : isConnected
        ? "Escuchando…"
        : "Asistente IA";

  const Icon = isConnecting ? Loader2 : isSpeaking ? Volume2 : Mic;

  return (
    <div className="fixed bottom-5 right-5 sm:bottom-7 sm:right-7 z-50 flex flex-col items-end gap-2">
      {/* Anillo de pulso — solo cuando está idle */}
      {!isConnected && !isConnecting && (
        <>
          <motion.span
            className="absolute inset-0 rounded-full bg-accent"
            animate={{ scale: [1, 1.6], opacity: [0.35, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeOut" }}
          />
          <motion.span
            className="absolute inset-0 rounded-full bg-accent"
            animate={{ scale: [1, 1.35], opacity: [0.25, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeOut", delay: 0.5 }}
          />
        </>
      )}

      <motion.button
        type="button"
        aria-label={isConnected ? "Detener asistente" : "Hablar con el asistente IA"}
        onClick={isConnected ? () => endSession() : handleStart}
        animate={
          isSpeaking
            ? { scale: [1, 1.07, 1] }
            : { scale: 1 }
        }
        transition={{
          repeat: isSpeaking ? Infinity : 0,
          duration: 1.1,
          ease: "easeInOut",
        }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.95 }}
        className={cn(
          "relative flex items-center gap-2.5 pl-4 pr-5 py-3.5 rounded-full shadow-2xl",
          "font-display text-xs tracking-[0.12em] uppercase transition-colors",
          isConnected
            ? "bg-dark text-cream border-2 border-accent"
            : "bg-accent text-cream hover:bg-vivid hover:text-cream"
        )}
      >
        <Icon
          className={cn("h-5 w-5 shrink-0", isConnecting && "animate-spin")}
          aria-hidden
        />
        <span>{label}</span>
        {isConnected && (
          <X className="h-4 w-4 opacity-60 ml-0.5" aria-hidden />
        )}
      </motion.button>
    </div>
  );
}
