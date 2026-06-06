"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Mic, X, Loader2, Volume2 } from "lucide-react";
import { usePathname } from "next/navigation";
import { useGeminiVoice } from "./gemini-voice-context";

export function GeminiVoiceButton() {
  const { status, speaking, toggle } = useGeminiVoice();
  const pathname = usePathname();

  const label =
    status === "connecting" ? "Conectando…" : status === "active" ? "Finalizar" : "Asistente de voz";

  // En la página de enlaces /bio ocultamos el asistente para una vista limpia
  if (pathname === "/bio") return null;

  return (
    <motion.button
      onClick={toggle}
      className="fixed bottom-4 right-4 md:right-6 z-50 flex items-center gap-2.5 px-5 py-3.5 rounded-full bg-accent text-cream shadow-lg font-semibold text-sm hover:bg-vivid transition-colors"
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      aria-label={label}
    >
      <AnimatePresence>
        {status === "active" && (
          <motion.span
            className="absolute inset-0 rounded-full bg-accent -z-10"
            initial={{ opacity: 0.5, scale: 1 }}
            animate={{ opacity: 0, scale: 1.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeOut" }}
          />
        )}
      </AnimatePresence>

      {status === "connecting" ? (
        <Loader2 className="w-5 h-5 animate-spin" />
      ) : status === "active" ? (
        speaking ? <Volume2 className="w-5 h-5 animate-pulse" /> : <X className="w-5 h-5" />
      ) : (
        <Mic className="w-5 h-5" />
      )}
      <span className="hidden sm:inline">{label}</span>
    </motion.button>
  );
}
