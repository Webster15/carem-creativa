"use client";

import { ConversationProvider } from "@elevenlabs/react";
import { Toaster } from "sonner";
import { AgentUIContextProvider } from "./agent-ui-context";
import { ClientTools } from "./client-tools";
import { FloatingButton } from "./floating-button";
import { StatusPill } from "./status-pill";

export function VoiceAgentProvider({ children }: { children: React.ReactNode }) {
  return (
    <AgentUIContextProvider>
      <ConversationProvider
        onConnect={({ conversationId }) =>
          console.log("[agent] connected", conversationId)
        }
        onDisconnect={() => console.log("[agent] disconnected")}
        onError={(message, context) =>
          console.error("[agent] error", message, context)
        }
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
