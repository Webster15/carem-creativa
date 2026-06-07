import { WhatsAppButton } from "@/components/ui/whatsapp-button";

export function Contact() {
  return (
    <section id="contacto" className="scroll-mt-16 bg-cream w-full">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-20 sm:py-28">
        <p className="text-brand text-xs font-semibold tracking-[0.3em] uppercase">
          Contacto
        </p>
        <h2
          className="font-display text-dark leading-[0.88] uppercase mt-2"
          style={{ fontSize: "clamp(3rem, 10vw, 8rem)" }}
        >
          HABLE<span className="text-accent">MOS</span>
        </h2>
        <p className="mt-4 text-dark/60 max-w-lg">
          Cuéntanos de tu proyecto por WhatsApp y te respondemos el mismo día.
          Es la forma más rápida de empezar.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-5">
          <WhatsAppButton
            message="Hola 👋 Quiero información sobre sus servicios de diseño."
            label="Escríbenos por WhatsApp"
            className="px-8 py-4 text-sm tracking-[0.15em]"
          />
          <a
            href="mailto:Caremcreativa@gmail.com"
            className="text-dark/50 text-sm hover:text-brand transition-colors"
          >
            o escríbenos a Caremcreativa@gmail.com
          </a>
        </div>
      </div>
    </section>
  );
}
