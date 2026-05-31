"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, X, Send, Mic, MicOff, Loader2, Bot } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAgentUI } from "@/components/voice-agent/agent-ui-context";
import { getService } from "@/lib/services";
import { cn } from "@/lib/utils";

/* ─── Types ─────────────────────────────────────────────────────────────── */
type Message = { id: string; role: "user" | "assistant"; content: string };
type ToolCall = { name: string; params: Record<string, unknown> };

/* ─── Helpers ────────────────────────────────────────────────────────────── */
function scrollToId(id: string) {
  if (typeof document === "undefined") return false;
  const el = document.getElementById(id);
  if (!el) return false;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
  return true;
}

const WELCOME: Message = {
  id: "welcome",
  role: "assistant",
  content: "¡Hola! 👋 Soy el asistente de CaremCreativa. ¿En qué puedo ayudarte? Puedo mostrarte nuestros servicios de branding, logo, web, apps, cursos y más.",
};

/* ─── Component ──────────────────────────────────────────────────────────── */
export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recognitionRef = useRef<any>(null);

  const { actions } = useAgentUI();
  const router = useRouter();

  /* Auto-scroll */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  /* Focus input on open */
  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 150);
  }, [isOpen]);

  /* ── Tool executor ── */
  const executeTool = useCallback((toolCall: ToolCall) => {
    const { name, params } = toolCall;

    if (name === "mostrarServicio") {
      const serviceId = params.serviceId as string;
      const abrirDetalle = Boolean(params.abrirDetalle);
      const seccion = typeof params.seccion === "string" ? params.seccion : "";
      const svc = getService(serviceId as Parameters<typeof getService>[0]);
      if (!svc) return;
      actions.highlightService(serviceId as Parameters<typeof actions.highlightService>[0]);
      if (abrirDetalle && svc.pageUrl) {
        router.push(seccion ? `${svc.pageUrl}#${seccion}` : svc.pageUrl);
      } else {
        if (!scrollToId(`servicio-${svc.slug}`)) scrollToId("servicios");
      }
    }

    if (name === "resaltarSeccion") {
      const sectionId = (params.sectionId as string) ?? "";
      if (sectionId.startsWith("/")) {
        router.push(sectionId);
      } else {
        scrollToId(sectionId);
      }
    }

    if (name === "mostrarPortafolio") scrollToId("portafolio");

    if (name === "agendarContacto") {
      actions.setContactDraft({
        nombre: (params.nombre as string) ?? "",
        email: (params.email as string) ?? "",
        mensaje: (params.mensaje as string) ?? "",
      });
      scrollToId("contacto");
    }
  }, [actions, router]);

  /* ── Send message ── */
  const sendMessage = useCallback(async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isLoading) return;

    const userMsg: Message = { id: Date.now().toString(), role: "user", content: trimmed };
    const nextMessages = [...messages, userMsg];
    setMessages(nextMessages);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });

      if (!res.ok) throw new Error(`${res.status}`);
      const data: { message: string; toolCall: ToolCall | null } = await res.json();

      setMessages((prev) => [
        ...prev,
        { id: (Date.now() + 1).toString(), role: "assistant", content: data.message },
      ]);

      if (data.toolCall) executeTool(data.toolCall);
    } catch (err) {
      console.error("[chat-widget] error:", err);
      setMessages((prev) => [
        ...prev,
        { id: (Date.now() + 1).toString(), role: "assistant", content: "Hubo un problema al conectar. Por favor intenta de nuevo." },
      ]);
    } finally {
      setIsLoading(false);
    }
  }, [messages, isLoading, executeTool]);

  /* ── Voice input ── */
  const toggleVoice = useCallback(() => {
    if (typeof window === "undefined") return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const win = window as any;
    const SR = win.SpeechRecognition || win.webkitSpeechRecognition;

    if (!SR) {
      alert("Tu navegador no soporta reconocimiento de voz. Prueba en Chrome.");
      return;
    }

    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const recognition: any = new SR();
    recognition.lang = "es-CO";
    recognition.continuous = false;
    recognition.interimResults = true;
    recognitionRef.current = recognition;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    recognition.onresult = (event: any) => {
      const transcript = Array.from(event.results as ArrayLike<{ 0: { transcript: string } }>)
        .map((r) => r[0].transcript)
        .join("");
      setInput(transcript);
      if (event.results[event.results.length - 1].isFinal) {
        setIsListening(false);
        sendMessage(transcript);
      }
    };

    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);
    recognition.start();
    setIsListening(true);
  }, [isListening, sendMessage]);

  /* ─── Render ─────────────────────────────────────────────────────────── */
  return (
    <>
      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
          className="fixed bottom-20 right-4 md:right-6 z-50 flex flex-col rounded-2xl shadow-2xl border border-brand/10 overflow-hidden"
            style={{ width: "min(360px, calc(100vw - 2rem))", height: 480 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between bg-brand px-4 py-3 flex-shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-cream" />
                </div>
                <div>
                  <p className="text-cream font-semibold text-sm leading-none">Asistente CaremCreativa</p>
                  <p className="text-cream/60 text-xs mt-0.5">En línea · responde al instante</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-cream/60 hover:text-cream transition-colors"
                aria-label="Cerrar chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto bg-cream px-3 py-4 space-y-3">
              {messages.map((msg) => (
                <div key={msg.id} className={cn("flex", msg.role === "user" ? "justify-end" : "justify-start")}>
                  <div
                    className={cn(
                      "max-w-[82%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed",
                      msg.role === "user"
                        ? "bg-accent text-cream rounded-br-sm"
                        : "bg-white text-dark shadow-sm rounded-bl-sm"
                    )}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white shadow-sm rounded-2xl rounded-bl-sm px-3.5 py-3">
                    <div className="flex gap-1 items-center">
                      <span className="w-1.5 h-1.5 bg-brand/40 rounded-full animate-bounce [animation-delay:0ms]" />
                      <span className="w-1.5 h-1.5 bg-brand/40 rounded-full animate-bounce [animation-delay:150ms]" />
                      <span className="w-1.5 h-1.5 bg-brand/40 rounded-full animate-bounce [animation-delay:300ms]" />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="flex items-center gap-2 bg-white border-t border-dark/8 px-3 py-2.5 flex-shrink-0">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage(input);
                  }
                }}
                placeholder="Escribe tu mensaje..."
                className="flex-1 bg-transparent text-sm text-dark placeholder:text-dark/35 outline-none"
                disabled={isLoading}
              />
              <button
                onClick={toggleVoice}
                className={cn(
                  "p-1.5 rounded-full transition-colors flex-shrink-0",
                  isListening ? "bg-accent text-cream" : "text-dark/40 hover:text-brand"
                )}
                aria-label={isListening ? "Detener grabación" : "Activar micrófono"}
              >
                {isListening ? (
                  <MicOff className="w-4 h-4" />
                ) : (
                  <Mic className="w-4 h-4" />
                )}
              </button>
              <button
                onClick={() => sendMessage(input)}
                disabled={!input.trim() || isLoading}
                className="p-1.5 rounded-full bg-brand text-cream disabled:opacity-35 hover:bg-brand/90 transition-colors flex-shrink-0"
                aria-label="Enviar mensaje"
              >
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating button */}
      <motion.button
        onClick={() => setIsOpen((v) => !v)}
        className="fixed bottom-4 left-4 md:left-6 z-50 flex items-center gap-2 px-4 py-3 rounded-full bg-brand text-cream shadow-lg hover:bg-brand/90 transition-colors font-medium text-sm"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Abrir chat"
      >
        {isOpen ? <X className="w-5 h-5" /> : <MessageCircle className="w-5 h-5" />}
        {!isOpen && <span className="hidden sm:inline">¿Necesitas ayuda?</span>}
      </motion.button>
    </>
  );
}
