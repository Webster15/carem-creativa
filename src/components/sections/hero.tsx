"use client";

import { motion } from "framer-motion";
import { ArrowRight, Mic, Loader2, Volume2, X } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import {
  useConversationControls,
  useConversationStatus,
  useConversationMode,
} from "@elevenlabs/react";
import { fetchSignedUrl } from "@/lib/elevenlabs";
import { cn } from "@/lib/utils";

const TICKER_ITEMS = [
  "Branding", "·", "Identidad Corporativa", "·", "Naming", "·",
  "Diseño Redes Sociales", "·", "Páginas Web", "·", "Apps", "·",
];

const STATS = [
  { n: "+40", label: "Marcas" },
  { n: "+5", label: "Años" },
  { n: "100%", label: "Satisfechos" },
];

const EXAMPLES = [
  '"Quiero ver branding"',
  '"Muéstrame el portafolio"',
  '"Quiero cotizar una web"',
];

function VoiceCard() {
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
        toast.error("No pude iniciar el asistente. Verifica la configuración.");
      }
    }
  }

  const StatusIcon = isConnecting ? Loader2 : isSpeaking ? Volume2 : Mic;
  const btnLabel = isConnecting
    ? "Conectando…"
    : isSpeaking
      ? "Hablando…"
      : isConnected
        ? "Escuchando…"
        : "Activar asistente";

  return (
    <div className="bg-cream flex flex-col gap-6 p-8 h-full">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className={cn(
          "h-16 w-16 flex items-center justify-center shrink-0 transition-colors",
          isConnected ? "bg-accent" : "bg-brand"
        )}>
          <Mic className="h-8 w-8 text-cream" />
        </div>
        <div>
          <p className="font-display text-brand text-xl uppercase tracking-wider leading-none">
            Asistente de voz
          </p>
          <p className="text-dark/50 text-sm mt-1">Navega sin hacer clic</p>
        </div>
      </div>

      <p className="text-dark/65 text-sm leading-relaxed">
        Háblale al asistente y él navega la web por ti — muestra servicios,
        abre el portafolio y llena el formulario de contacto.
      </p>

      <div className="space-y-2">
        {EXAMPLES.map((ex) => (
          <div key={ex} className="flex items-center gap-2.5 bg-brand/10 px-3 py-2.5">
            <Mic className="h-3.5 w-3.5 text-accent shrink-0" />
            <p className="text-dark/70 text-xs italic">{ex}</p>
          </div>
        ))}
      </div>

      <motion.button
        type="button"
        onClick={isConnected ? () => endSession() : handleStart}
        animate={isSpeaking ? { scale: [1, 1.03, 1] } : { scale: 1 }}
        transition={{ repeat: isSpeaking ? Infinity : 0, duration: 1.4, ease: "easeInOut" }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        className={cn(
          "mt-auto flex items-center justify-center gap-2.5 w-full py-4",
          "font-display text-sm tracking-[0.15em] uppercase transition-colors",
          isConnected
            ? "bg-accent text-cream"
            : "bg-brand text-cream hover:bg-accent"
        )}
      >
        <StatusIcon className={cn("h-5 w-5", isConnecting && "animate-spin")} />
        <span>{btnLabel}</span>
        {isConnected && <X className="h-4 w-4 opacity-70" />}
      </motion.button>
    </div>
  );
}

export function Hero() {
  return (
    <section id="inicio">

      {/* ── TITLE BLOCK — cream bg, text bleeds into blue below ── */}
      <div className="bg-cream relative z-10 overflow-visible">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="px-4 sm:px-6 pt-16 pb-6 text-accent text-xs font-semibold tracking-[0.3em] uppercase"
        >
          Agencia de diseño · Colombia
        </motion.p>

        {/* Giant headline — y ends at 0.09em so bottom bleeds over blue section */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: "0.09em" }}
          transition={{ duration: 0.75, ease: "easeOut", delay: 0.08 }}
          className="font-display text-brand leading-[0.86] uppercase select-none px-4 sm:px-6"
          style={{ fontSize: "clamp(5rem, 22vw, 28rem)", lineHeight: 0.86 }}
        >
          <span className="block">DISEÑO</span>
          <span className="block">QUE SE NOTA</span>
        </motion.h1>
      </div>

      {/* ── CONTENT BLOCK — blue bg, tagline + voice card ── */}
      <div className="bg-brand w-full">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-10 items-center pt-20 pb-16">

            {/* LEFT — tagline + CTAs + stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.4 }}
              className="space-y-6"
            >
              <p className="max-w-sm text-cream/70 text-base leading-relaxed">
                Branding, identidad, naming, redes sociales, web y apps.
                Tu marca en manos de quien entiende el diseño.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="#servicios"
                  className="inline-flex items-center gap-2 bg-cream text-brand font-display text-xs px-5 py-3 tracking-[0.12em] uppercase hover:bg-accent hover:text-cream transition-colors"
                >
                  Ver servicios <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                <Link
                  href="#portafolio"
                  className="inline-flex items-center gap-2 border-2 border-cream/30 text-cream font-display text-xs px-5 py-3 tracking-[0.12em] uppercase hover:border-cream transition-colors"
                >
                  Ver portafolio
                </Link>
              </div>
              <div className="flex gap-3">
                {STATS.map((s) => (
                  <div key={s.n} className="border-2 border-cream/20 px-5 py-3 text-center min-w-[84px]">
                    <p className="font-display text-2xl text-cream uppercase leading-none">{s.n}</p>
                    <p className="text-[10px] text-cream/40 mt-1 uppercase tracking-wider">{s.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* RIGHT — voice card */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.65, delay: 0.28, ease: "easeOut" }}
            >
              <VoiceCard />
            </motion.div>

          </div>
        </div>
      </div>

      {/* ── SCROLLING TICKER ── */}
      <div className="bg-brand border-t border-cream/10 py-3.5 overflow-hidden">
        <div className="animate-ticker flex whitespace-nowrap">
          {[...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span
              key={i}
              className={
                item === "·"
                  ? "text-accent font-display text-sm mx-3"
                  : "font-display text-cream text-sm uppercase tracking-[0.15em] mx-2"
              }
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
