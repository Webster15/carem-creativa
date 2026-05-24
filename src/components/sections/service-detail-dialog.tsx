"use client";

import { Check } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { SERVICES, getService } from "@/lib/services";
import { useAgentUI } from "@/components/voice-agent/agent-ui-context";
import { formatPrice } from "@/lib/utils";

export function ServiceDetailDialog() {
  const { state, actions } = useAgentUI();
  const open = state.openServiceDialogId !== null;
  const svc = state.openServiceDialogId
    ? getService(state.openServiceDialogId)
    : null;

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        if (!o) actions.closeService();
      }}
    >
      <DialogContent>
        {svc && (
          <>
            <DialogHeader>
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 bg-brand flex items-center justify-center text-cream shrink-0">
                  <svc.icon className="h-6 w-6" />
                </div>
                <div>
                  <DialogTitle className="font-display uppercase tracking-tight text-lg">
                    {svc.title}
                  </DialogTitle>
                  <DialogDescription>{svc.tagline}</DialogDescription>
                </div>
              </div>
            </DialogHeader>

            <p className="text-sm text-dark/70 leading-relaxed">
              {svc.description}
            </p>

            <div className="mt-4">
              <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-dark/40">
                Qué incluye
              </h4>
              <ul className="mt-3 space-y-2 text-sm">
                {svc.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2">
                    <Check className="h-4 w-4 mt-0.5 text-brand shrink-0" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-5 pt-5 border-t-2 border-dark/10 flex items-center justify-between">
              <div>
                <p className="text-xs text-dark/40 uppercase tracking-wider">
                  Inversión desde
                </p>
                <p className="font-display text-2xl uppercase mt-0.5">
                  {formatPrice(svc.priceFrom)} USD
                </p>
              </div>
              <a
                href="#contacto"
                onClick={() => actions.closeService()}
                className="bg-brand text-cream font-display text-xs px-5 py-2.5 tracking-[0.15em] uppercase hover:bg-accent transition-colors"
              >
                Cotizar
              </a>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

export { SERVICES };
