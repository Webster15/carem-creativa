"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import { useRouter, usePathname } from "next/navigation";
import { toast } from "sonner";
import {
  GoogleGenAI,
  type Session,
  type LiveServerMessage,
  type FunctionResponse,
} from "@google/genai";
import { getService, SERVICE_IDS, type ServiceId } from "@/lib/services";
import { GEMINI_LIVE_MODEL } from "@/lib/gemini-live-config";
import { whatsappLink } from "@/lib/whatsapp";
import { useAgentUI } from "./agent-ui-context";
import {
  MicCapture,
  PcmStreamPlayer,
  base64Pcm16ToFloat32,
} from "@/lib/gemini-live-audio";

function scrollToId(id: string): boolean {
  if (typeof document === "undefined") return false;
  const el = document.getElementById(id);
  if (!el) return false;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
  return true;
}

// Conceptos de sección → ancla real en cada página de servicio.
// (Cada servicio nombra sus secciones distinto; esto las unifica.)
type SectionConcept =
  | "precios" | "incluye" | "proceso" | "faq" | "tipos" | "modalidades" | "quees" | "paraquien";

const SECTION_MAP: Record<string, Partial<Record<SectionConcept, string>>> = {
  web: { precios: "precios", incluye: "que-incluye", proceso: "proceso", faq: "faq", tipos: "tipos" },
  logo: { precios: "inversion", incluye: "entregables", proceso: "proceso", faq: "faq" },
  naming: { precios: "inversion", incluye: "entregables", proceso: "proceso", faq: "faq" },
  "redes-sociales": { precios: "inversion", incluye: "entregables", proceso: "proceso", faq: "faq", modalidades: "modalidades" },
  apps: { precios: "inversion", incluye: "entregables", proceso: "proceso", faq: "faq", tipos: "tipos" },
  branding: { precios: "inversion", incluye: "entregables", proceso: "proceso", faq: "faq", quees: "que-es", paraquien: "para-quien" },
};

function toConcept(raw: string): SectionConcept | null {
  const s = raw.toLowerCase();
  if (/precio|inversi|tarifa|costo|cuant|cuánt|vale/.test(s)) return "precios";
  if (/incluy|entrega|recib|deliverab|contiene|incluido/.test(s)) return "incluye";
  if (/proces|paso|etapa|metodolog|c[oó]mo trabaj/.test(s)) return "proceso";
  if (/faq|pregunt|duda/.test(s)) return "faq";
  if (/modalidad/.test(s)) return "modalidades";
  if (/tipo|clase/.test(s)) return "tipos";
  if (/qu[eé] es|concepto/.test(s)) return "quees";
  if (/para qui[eé]n|dirigido/.test(s)) return "paraquien";
  return null;
}

// Devuelve el id de ancla correcto para el servicio, o "" si no aplica.
function resolveAnchor(serviceId: string, rawSeccion: string): string {
  if (!rawSeccion) return "";
  const concept = toConcept(rawSeccion);
  if (concept) return SECTION_MAP[serviceId]?.[concept] ?? "";
  // El modelo pudo pasar el id exacto: normalizar espacios → guiones
  return rawSeccion.toLowerCase().replace(/\s+/g, "-");
}

export type VoiceStatus = "idle" | "connecting" | "active";

type GeminiVoiceContextValue = {
  status: VoiceStatus;
  speaking: boolean;
  toggle: () => void;
};

const GeminiVoiceContext = createContext<GeminiVoiceContextValue | null>(null);

export function useGeminiVoice() {
  const ctx = useContext(GeminiVoiceContext);
  if (!ctx) throw new Error("useGeminiVoice debe usarse dentro de GeminiVoiceProvider");
  return ctx;
}

export function GeminiVoiceProvider({ children }: { children: React.ReactNode }) {
  const [status, setStatus] = useState<VoiceStatus>("idle");
  const [speaking, setSpeaking] = useState(false);

  const sessionRef = useRef<Session | null>(null);
  const playerRef = useRef<PcmStreamPlayer | null>(null);
  const micRef = useRef<MicCapture | null>(null);

  const { actions } = useAgentUI();
  const router = useRouter();
  const pathname = usePathname();

  const executeTool = useCallback(
    (name: string, args: Record<string, unknown>): string => {
      if (name === "mostrarServicio") {
        const serviceId = String(args.serviceId ?? "");
        if (!(SERVICE_IDS as readonly string[]).includes(serviceId)) {
          return `Servicio no reconocido. Opciones: ${SERVICE_IDS.join(", ")}.`;
        }
        const svc = getService(serviceId as ServiceId)!;
        actions.highlightService(serviceId as ServiceId);
        const rawSeccion = typeof args.seccion === "string" ? args.seccion.trim() : "";
        const anchor = resolveAnchor(serviceId, rawSeccion);
        const targetPath = svc.pageUrl;
        if (targetPath) {
          // Si ya estamos en la página del servicio, solo hacemos scroll
          if (pathname === targetPath) {
            if (anchor) scrollToId(anchor);
            return anchor ? `Mostrando la sección ${anchor}.` : `Ya estás en ${svc.title}.`;
          }
          // Si no, navegamos a la página (con ancla si la hay)
          router.push(anchor ? `${targetPath}#${anchor}` : targetPath);
          return `Abriendo ${svc.title}${anchor ? `, sección ${anchor}` : ""}.`;
        }
        if (!scrollToId(`servicio-${svc.slug}`)) scrollToId("servicios");
        return `Mostrando ${svc.title}.`;
      }

      if (name === "abrirWhatsApp") {
        const mensaje =
          typeof args.mensaje === "string" && args.mensaje.trim()
            ? args.mensaje.trim()
            : "Hola 👋 Quiero información sobre sus servicios.";
        if (typeof window !== "undefined") {
          const url = whatsappLink(mensaje);
          const isMobile = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);
          if (isMobile) {
            // En móvil window.open suele bloquearse; navegar abre la app de WhatsApp
            window.location.href = url;
          } else {
            const w = window.open(url, "_blank", "noopener,noreferrer");
            if (!w) window.location.href = url; // fallback si el popup se bloquea
          }
        }
        return "Abriendo WhatsApp para que escribas a la agencia.";
      }

      if (name === "resaltarSeccion") {
        const sectionId = typeof args.sectionId === "string" ? args.sectionId.trim() : "";
        if (!sectionId) return "Sección no especificada.";
        if (sectionId.startsWith("/")) {
          router.push(sectionId);
          return `Navegando a ${sectionId}.`;
        }
        scrollToId(sectionId);
        return `Mostrando ${sectionId}.`;
      }

      if (name === "mostrarPortafolio") {
        scrollToId("portafolio");
        return "Mostrando el portafolio.";
      }

      return "Hecho.";
    },
    [actions, router, pathname]
  );

  const disconnect = useCallback(async () => {
    try { await micRef.current?.stop(); } catch { /* */ }
    micRef.current = null;
    try { sessionRef.current?.close(); } catch { /* */ }
    sessionRef.current = null;
    try { await playerRef.current?.close(); } catch { /* */ }
    playerRef.current = null;
    setSpeaking(false);
    setStatus("idle");
  }, []);

  const handleMessage = useCallback(
    (msg: LiveServerMessage) => {
      if (msg.setupComplete) {
        console.log("[gemini-live] setupComplete ✓ (sesión lista)");
        // Disparar el saludo inicial del asistente
        sessionRef.current?.sendClientContent({
          turns: "El usuario acaba de activar el asistente. Salúdalo en una sola frase corta y pregúntale qué servicio necesita.",
          turnComplete: true,
        });
      }
      const parts = msg.serverContent?.modelTurn?.parts;
      if (parts) {
        for (const part of parts) {
          const data = part.inlineData?.data;
          if (data) {
            setSpeaking(true);
            playerRef.current?.enqueue(base64Pcm16ToFloat32(data));
          }
        }
      }
      if (msg.serverContent?.interrupted) {
        playerRef.current?.clear();
        setSpeaking(false);
      }
      if (msg.serverContent?.turnComplete) {
        setSpeaking(false);
      }
      const calls = msg.toolCall?.functionCalls;
      if (calls && calls.length > 0) {
        const responses: FunctionResponse[] = calls.map((c) => ({
          id: c.id,
          name: c.name,
          response: { result: executeTool(c.name ?? "", c.args ?? {}) },
        }));
        sessionRef.current?.sendToolResponse({ functionResponses: responses });
      }
    },
    [executeTool]
  );

  const connect = useCallback(async () => {
    setStatus("connecting");
    try {
      // Permiso de micrófono primero (gesto del usuario)
      await navigator.mediaDevices.getUserMedia({ audio: true });

      const res = await fetch("/api/gemini-live/token", { method: "POST" });
      if (!res.ok) throw new Error("token");
      const { token } = await res.json();

      const player = new PcmStreamPlayer(24000);
      await player.resume();
      playerRef.current = player;

      const ai = new GoogleGenAI({ apiKey: token, httpOptions: { apiVersion: "v1alpha" } });
      const session = await ai.live.connect({
        // La config (voz, instrucciones, tools) ya viene bloqueada en el token
        model: GEMINI_LIVE_MODEL,
        callbacks: {
          onopen: async () => {
            console.log("[gemini-live] WebSocket abierto ✓");
            const mic = new MicCapture();
            micRef.current = mic;
            await mic.start((b64) => {
              // Half-duplex: si el asistente está hablando, NO mandamos audio del
              // mic — así no se escucha a sí mismo por el parlante y no se
              // interrumpe (lo que causaba el sonido entrecortado).
              if (playerRef.current?.isPlaying()) return;
              sessionRef.current?.sendRealtimeInput({
                audio: { data: b64, mimeType: "audio/pcm;rate=16000" },
              });
            });
            setStatus("active");
          },
          onmessage: handleMessage,
          onerror: (e) => {
            console.error("[gemini-live] onerror →", (e as ErrorEvent)?.message, e);
            void disconnect();
          },
          onclose: (e) => {
            console.warn("[gemini-live] onclose → code:", e?.code, "| reason:", e?.reason);
            void disconnect();
          },
        },
      });
      sessionRef.current = session;
    } catch (err) {
      console.error("[gemini-live] no se pudo conectar:", err);
      if (err instanceof DOMException && err.name === "NotAllowedError") {
        toast.error("Permite el micrófono para hablar con el asistente.");
      } else {
        toast.error("No pude iniciar el asistente de voz. Intenta de nuevo.");
      }
      await disconnect();
    }
  }, [handleMessage, disconnect]);

  const toggle = useCallback(() => {
    if (status === "idle") void connect();
    else void disconnect();
  }, [status, connect, disconnect]);

  const value = useMemo(
    () => ({ status, speaking, toggle }),
    [status, speaking, toggle]
  );

  return <GeminiVoiceContext.Provider value={value}>{children}</GeminiVoiceContext.Provider>;
}
