"use client";

import { ConversationProvider } from "@elevenlabs/react";
import { Toaster } from "sonner";
import { AgentUIContextProvider } from "./agent-ui-context";
import { ClientTools } from "./client-tools";
import { FloatingButton } from "./floating-button";
import { StatusPill } from "./status-pill";

// Callbacks definidos a nivel de módulo → referencia estable.
// Esto evita que la conexión WebSocket se reinicie cuando el provider
// se re-renderiza al navegar entre páginas (lo que cortaba al agente).
function handleConnect({ conversationId }: { conversationId: string }) {
  console.log("[agent] connected", conversationId);
}
function handleDisconnect() {
  console.log("[agent] disconnected");
}
function handleError(message: string, context?: unknown) {
  console.error("[agent] error", message, context);
}

export function VoiceAgentProvider({ children }: { children: React.ReactNode }) {
  return (
    <AgentUIContextProvider>
      <ConversationProvider
        onConnect={handleConnect}
        onDisconnect={handleDisconnect}
        onError={handleError}
      >
        <ClientTools />
        {children}
        <FloatingButton />
        <StatusPill />
        <Toaster richColors position="top-center" />
      </ConversationProvider>
    </AgentUIContextProvider>
  );
}
