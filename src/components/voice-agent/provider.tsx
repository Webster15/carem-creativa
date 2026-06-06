"use client";

import { Toaster } from "sonner";
import { AgentUIContextProvider } from "./agent-ui-context";
import { GeminiVoiceProvider } from "./gemini-voice-context";
import { GeminiVoiceButton } from "./gemini-voice-button";

export function VoiceAgentProvider({ children }: { children: React.ReactNode }) {
  return (
    <AgentUIContextProvider>
      <GeminiVoiceProvider>
        {children}
        <GeminiVoiceButton />
        <Toaster richColors position="top-center" />
      </GeminiVoiceProvider>
    </AgentUIContextProvider>
  );
}
