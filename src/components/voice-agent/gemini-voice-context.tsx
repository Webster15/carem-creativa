"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  GoogleGenAI,
  type Session,
  type LiveServerMessage,
  type FunctionResponse,
} from "@google/genai";
import { getService, SERVICE_IDS, type ServiceId } from "@/lib/services";
import { GEMINI_LIVE_MODEL } from "@/lib/gemini-live-config";
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

  const executeTool = useCallback(
    (name: string, args: Record<string, unknown>): string => {
      if (name === "mostrarServicio") {
        const serviceId = String(args.serviceId ?? "");
        if (!(SERVICE_IDS as readonly string[]).includes(serviceId)) {
          return `Servicio no reconocido. Opciones: ${SERVICE_IDS.join(", ")}.`;
        }
        const svc = getService(serviceId as ServiceId)!;
        actions.highlightService(serviceId as ServiceId);
        const abrir = Boolean(args.abrirDetalle);
        const seccion = typeof args.seccion === "string" ? args.seccion.trim() : "";
        if (abrir && svc.pageUrl) {
          router.push(seccion ? `${svc.pageUrl}#${seccion}` : svc.pageUrl);
          return `Abriendo ${svc.title}.`;
        }
        if (!scrollToId(`servicio-${svc.slug}`)) scrollToId("servicios");
        return `Mostrando ${svc.title}.`;
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

      if (name === "agendarContacto") {
        const nombre = String(args.nombre ?? "");
        const email = String(args.email ?? "");
        const mensaje = String(args.mensaje ?? "");
        actions.setContactDraft({ nombre, email, mensaje });
        scrollToId("contacto");
        return `Listo ${nombre}, llené el formulario. Revísalo y pulsa Enviar.`;
      }

      return "Hecho.";
    },
    [actions, router]
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
      if (msg.setupComplete) console.log("[gemini-live] setupComplete ✓ (sesión lista)");
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
