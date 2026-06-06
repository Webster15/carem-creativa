"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Send } from "lucide-react";
import { useAgentUI } from "@/components/voice-agent/agent-ui-context";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { cn } from "@/lib/utils";

export function Contact() {
  const { state } = useAgentUI();
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (state.contactDraft.nombre) setNombre(state.contactDraft.nombre);
    if (state.contactDraft.email) setEmail(state.contactDraft.email);
    if (state.contactDraft.mensaje) setMensaje(state.contactDraft.mensaje);
  }, [state.contactDraft]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      const r = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ nombre, email, mensaje }),
      });
      if (!r.ok) throw new Error(`status ${r.status}`);
      toast.success("Mensaje enviado. Te escribimos pronto.");
      setNombre("");
      setEmail("");
      setMensaje("");
    } catch (err) {
      console.error(err);
      toast.error("No pude enviar el mensaje. Intenta de nuevo.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id="contacto" className="scroll-mt-16 bg-cream w-full">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-20 sm:py-28">
        <div>
          <p className="text-brand text-xs font-semibold tracking-[0.3em] uppercase">
            Contacto
          </p>
          <h2
            className="font-display text-dark leading-[0.88] uppercase mt-2"
            style={{ fontSize: "clamp(3rem, 10vw, 8rem)" }}
          >
            HABLE<span className="text-accent">MOS</span>
          </h2>
          <p className="mt-4 text-dark/50 max-w-lg">
            Cuéntanos del proyecto. La forma más rápida de contactarnos es por
            WhatsApp — te respondemos el mismo día.
          </p>
        </div>

        {/* WhatsApp — canal principal */}
        <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-4">
          <WhatsAppButton
            message="Hola 👋 Quiero información sobre sus servicios de diseño."
            label="Escríbenos por WhatsApp"
            className="px-7 py-4 text-sm tracking-[0.15em]"
          />
          <span className="text-dark/40 text-sm">o déjanos un mensaje por correo 👇</span>
        </div>

        <form
          onSubmit={onSubmit}
          className="mt-8 max-w-xl space-y-4"
        >
          <Field label="Nombre" htmlFor="nombre">
            <input
              id="nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
              minLength={2}
              placeholder="Tu nombre"
              className={inputCls}
            />
          </Field>
          <Field label="Email" htmlFor="email">
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="tu@email.com"
              className={inputCls}
            />
          </Field>
          <Field label="Mensaje" htmlFor="mensaje">
            <textarea
              id="mensaje"
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value)}
              required
              minLength={10}
              rows={5}
              placeholder="Cuéntanos del proyecto, plazos y presupuesto si lo tienes."
              className={cn(inputCls, "resize-y")}
            />
          </Field>
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center gap-2 bg-brand text-cream font-display text-sm px-7 py-3 tracking-[0.12em] uppercase hover:bg-accent transition-colors disabled:opacity-50"
          >
            <Send className="h-4 w-4" />
            {submitting ? "Enviando…" : "Enviar"}
          </button>
        </form>
      </div>
    </section>
  );
}

const inputCls =
  "w-full border-2 border-dark/20 bg-white px-4 py-3 text-sm text-dark outline-none focus:border-brand transition-colors placeholder:text-dark/30";

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="block text-xs font-semibold text-dark/60 mb-1.5 uppercase tracking-wider"
      >
        {label}
      </label>
      {children}
    </div>
  );
}
