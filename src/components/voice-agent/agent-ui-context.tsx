"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import type { ServiceId } from "@/lib/services";

type ContactDraft = { nombre?: string; email?: string; mensaje?: string };

type AgentUIState = {
  highlightedServiceId: ServiceId | null;
  openServiceDialogId: ServiceId | null;
  contactDraft: ContactDraft;
};

type AgentUIActions = {
  highlightService: (id: ServiceId) => void;
  openService: (id: ServiceId) => void;
  closeService: () => void;
  setContactDraft: (draft: ContactDraft) => void;
  clearHighlights: () => void;
};

const Context = createContext<{
  state: AgentUIState;
  actions: AgentUIActions;
} | null>(null);

const HIGHLIGHT_MS = 2200;

export function AgentUIContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, setState] = useState<AgentUIState>({
    highlightedServiceId: null,
    openServiceDialogId: null,
    contactDraft: {},
  });

  const highlightTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearHighlights = useCallback(() => {
    if (highlightTimerRef.current) {
      clearTimeout(highlightTimerRef.current);
      highlightTimerRef.current = null;
    }
    setState((s) => ({ ...s, highlightedServiceId: null }));
  }, []);

  const highlightService = useCallback((id: ServiceId) => {
    setState((s) => ({ ...s, highlightedServiceId: id }));
    if (highlightTimerRef.current) clearTimeout(highlightTimerRef.current);
    highlightTimerRef.current = setTimeout(() => {
      setState((s) =>
        s.highlightedServiceId === id ? { ...s, highlightedServiceId: null } : s
      );
      highlightTimerRef.current = null;
    }, HIGHLIGHT_MS);
  }, []);

  const openService = useCallback((id: ServiceId) => {
    setState((s) => ({ ...s, openServiceDialogId: id }));
  }, []);

  const closeService = useCallback(() => {
    setState((s) => ({ ...s, openServiceDialogId: null }));
  }, []);

  const setContactDraft = useCallback((draft: ContactDraft) => {
    setState((s) => ({ ...s, contactDraft: { ...s.contactDraft, ...draft } }));
  }, []);

  const value = useMemo(
    () => ({
      state,
      actions: {
        highlightService,
        openService,
        closeService,
        setContactDraft,
        clearHighlights,
      },
    }),
    [
      state,
      highlightService,
      openService,
      closeService,
      setContactDraft,
      clearHighlights,
    ]
  );

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export function useAgentUI() {
  const ctx = useContext(Context);
  if (!ctx)
    throw new Error("useAgentUI must be used inside <AgentUIContextProvider>");
  return ctx;
}
