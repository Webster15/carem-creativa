"use client";

import { useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import {
  Check,
  X,
  Plus,
  Minus,
  ArrowLeft,
  ArrowRight,
  Phone,
  Mail,
} from "lucide-react";
import Link from "next/link";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";

/* ─── animation helpers ─────────────────────────────────── */

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

const stagger = (delay = 0.1): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: delay } },
});

const vp = { once: true, amount: 0.15 };

/* ─── data ───────────────────────────────────────────────── */

const DELIVERABLES = [
  {
    id: "estrategia",
    title: "Estrategia de marca",
    body: "Análisis de competencia, propuesta de valor, perfil de cliente ideal, personalidad de marca y tono de voz. La base que guía cada decisión de diseño.",
  },
  {
    id: "identidad",
    title: "Identidad visual",
    body: "Logo en versión principal, secundaria e isotipo. Paleta de color completa, sistema tipográfico y biblioteca de íconos. Todo vectorizado y listo para cualquier uso.",
  },
  {
    id: "aplicaciones",
    title: "Aplicaciones clave",
    body: "Tarjetas de presentación, papelería corporativa, plantillas para redes sociales, firma de email y mockups de presentación de alta calidad.",
  },
  {
    id: "brandbook",
    title: "Brandbook",
    body: "Manual completo en PDF y Figma listo para compartir con imprentas, desarrolladores y colaboradores. Incluye reglas de uso, prohibiciones y ejemplos de aplicación.",
  },
  {
    id: "archivos",
    title: "Archivos finales masterizados",
    body: "AI, SVG, PNG y PDF en resolución de impresión y digital. Organizados por carpetas en Drive compartido. Son 100% tuyos — transferimos todos los derechos.",
  },
];

const PROCESS = [
  {
    n: "01",
    phase: "Diagnóstico",
    time: "Semana 1",
    desc: "Cuestionario profundo, análisis de mercado y benchmarking de hasta cinco competidores directos.",
  },
  {
    n: "02",
    phase: "Estrategia",
    time: "Semanas 1–2",
    desc: "Definición de propuesta de valor, cliente ideal, personalidad de marca y tono de comunicación.",
  },
  {
    n: "03",
    phase: "Diseño",
    time: "Semanas 2–3",
    desc: "Exploración visual con tres propuestas completas de identidad, paleta y sistema tipográfico.",
  },
  {
    n: "04",
    phase: "Refinamiento",
    time: "Semanas 3–4",
    desc: "Dos rondas de ajustes sobre la propuesta elegida hasta que el resultado sea exactamente lo que necesitas.",
  },
  {
    n: "05",
    phase: "Entrega",
    time: "Semanas 4–5",
    desc: "Brandbook completo, archivos masterizados y sesión de presentación para tu equipo.",
  },
];

const FAQS = [
  {
    q: "¿Cuánto tiempo toma el proceso completo?",
    a: "Entre 4 y 6 semanas para un proyecto de branding completo. El ritmo depende principalmente de la velocidad de tus aprobaciones.",
  },
  {
    q: "¿Puedo empezar solo con el logo y agregar el branding después?",
    a: "Sí, pero no lo recomendamos. El logo sin estrategia detrás termina siendo rediseñado a los 2 años. Hacerlo bien desde el principio cuesta menos en el largo plazo.",
  },
  {
    q: "¿Cuántas propuestas de diseño recibo?",
    a: "Tres propuestas distintas en la fase de diseño, más dos rondas de ajustes sobre la que elijas.",
  },
  {
    q: "¿Los archivos son míos al 100%?",
    a: "Sí. Transferimos todos los derechos patrimoniales al momento de la entrega final. Los archivos fuente (AI, Figma) son tuyos.",
  },
  {
    q: "¿Trabajan con empresas fuera de México?",
    a: "Sí, trabajamos de forma remota con clientes en toda Latinoamérica y España. El proceso es el mismo y no hay costo adicional.",
  },
];

/* ─── page ───────────────────────────────────────────────── */

export default function BrandingPage() {
  const [openDeliverable, setOpenDeliverable] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  return (
    <>
      {/* ── 1. Hero ── */}
      <section
        id="branding-hero"
        className="scroll-mt-16 bg-brand w-full"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-20 sm:py-32">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger(0.12)}
          >
            <motion.div variants={fadeUp}>
              <Link
                href="/#servicios"
                className="inline-flex items-center gap-1.5 text-cream/60 hover:text-cream text-xs font-semibold tracking-[0.2em] uppercase transition-colors mb-10"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                Volver a servicios
              </Link>
            </motion.div>

            <motion.p
              variants={fadeUp}
              className="text-cream/60 text-xs font-semibold tracking-[0.3em] uppercase"
            >
              Branding · Identidad de marca
            </motion.p>

            <motion.h1
              variants={fadeUp}
              className="font-display text-cream leading-[0.88] uppercase mt-3"
              style={{ fontSize: "clamp(4rem, 14vw, 13rem)" }}
            >
              TU MARCA
              <br />
              NO ES UN
              <br />
              <span className="text-accent">LOGO</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-6 text-cream/70 max-w-xl text-lg leading-relaxed"
            >
              Es tu promesa, tu personalidad y la primera impresión que no se puede
              repetir. Te ayudamos a construirla bien desde el principio.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-10 flex flex-wrap gap-3"
            >
              <WhatsAppButton
                message="Hola 👋 Quiero información sobre el branding de mi marca."
                label="Cotizar branding"
                className="px-7 py-3 text-sm"
              />
              <Link
                href="#proceso"
                className="inline-flex items-center gap-2 border-2 border-cream/40 text-cream font-display text-sm px-7 py-3 tracking-[0.12em] uppercase hover:border-cream transition-colors"
              >
                Ver el proceso
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── 2. ¿Qué es el branding? ── */}
      <section
        id="que-es"
        className="scroll-mt-16 bg-cream w-full"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-20 sm:py-28">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* left */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={vp}
              variants={stagger()}
            >
              <motion.p
                variants={fadeUp}
                className="text-brand text-xs font-semibold tracking-[0.3em] uppercase"
              >
                Qué es
              </motion.p>
              <motion.h2
                variants={fadeUp}
                className="font-display text-dark leading-[0.88] uppercase mt-2"
                style={{ fontSize: "clamp(2.8rem, 9vw, 7rem)" }}
              >
                MÁS QUE
                <br />
                UN{" "}
                <span className="text-accent">LOGO</span>
              </motion.h2>
              <motion.p
                variants={fadeUp}
                className="mt-5 text-dark/60 leading-relaxed"
              >
                Branding es el sistema completo que determina cómo se ve, se escucha
                y se siente tu empresa. Cuando está bien hecho, tu público te
                reconoce, confía en ti y te prefiere — antes de que abras la boca.
              </motion.p>
            </motion.div>

            {/* right — checklist */}
            <motion.ul
              initial="hidden"
              whileInView="visible"
              viewport={vp}
              variants={stagger(0.09)}
              className="space-y-3 pt-2 md:pt-16"
            >
              {[
                "Estrategia y posicionamiento de marca",
                "Nombre y voz (naming y tono de comunicación)",
                "Identidad visual: logo, colores, tipografía",
                "Experiencia coherente en todos los canales",
                "Manual para que tu equipo lo aplique bien",
                "Diferenciación real frente a competidores",
              ].map((item) => (
                <motion.li
                  key={item}
                  variants={fadeUp}
                  className="flex items-start gap-3 border-l-4 border-brand pl-4 py-1"
                >
                  <Check className="h-4 w-4 text-brand shrink-0 mt-0.5" />
                  <span className="text-dark/80 text-sm leading-snug">{item}</span>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </div>
      </section>

      {/* ── 3. ¿Para quién? ── */}
      <section
        id="para-quien"
        className="scroll-mt-16 bg-vivid w-full"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-20 sm:py-28">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={vp}
            variants={stagger()}
          >
            <motion.p
              variants={fadeUp}
              className="text-cream/60 text-xs font-semibold tracking-[0.3em] uppercase"
            >
              Para quién
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="font-display text-cream leading-[0.88] uppercase mt-2"
              style={{ fontSize: "clamp(2.8rem, 9vw, 7rem)" }}
            >
              ¿ERES{" "}
              <span className="text-accent">TÚ</span>?
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={vp}
            variants={stagger(0.07)}
            className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {[
              {
                label: "Nuevo negocio",
                desc: "Lanzas una empresa y quieres arrancar con identidad sólida desde el día uno.",
              },
              {
                label: "Marca amateur",
                desc: "Tu empresa funciona pero tu imagen se ve improvisada y no refleja lo que vales.",
              },
              {
                label: "Rebranding",
                desc: "Cambias de giro, nombre o mercado y necesitas una identidad que lo refleje.",
              },
              {
                label: "Competencia más visible",
                desc: "Tu competencia se ve más profesional aunque tú seas mejor — eso hay que corregirlo.",
              },
              {
                label: "Levantamiento de inversión",
                desc: "Presentas a inversores y la imagen de tu empresa necesita estar a la altura.",
              },
              {
                label: "Escalar el negocio",
                desc: "Creces y necesitas una marca que aguante franquicias, nuevos mercados o equipos grandes.",
              },
            ].map((card) => (
              <motion.div
                key={card.label}
                variants={fadeUp}
                className="border-2 border-cream/20 p-6 hover:border-cream/50 transition-colors"
              >
                <p className="font-display text-cream uppercase text-xl leading-tight">
                  {card.label}
                </p>
                <p className="mt-2 text-cream/70 text-sm leading-relaxed">
                  {card.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 4. Entregables ── */}
      <section
        id="entregables"
        className="scroll-mt-16 bg-cream w-full"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-20 sm:py-28">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={vp}
            variants={stagger()}
          >
            <motion.p
              variants={fadeUp}
              className="text-brand text-xs font-semibold tracking-[0.3em] uppercase"
            >
              Qué incluye
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="font-display text-dark leading-[0.88] uppercase mt-2"
              style={{ fontSize: "clamp(2.8rem, 9vw, 7rem)" }}
            >
              ENTRE<span className="text-accent">GABL</span>ES
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={vp}
            variants={stagger(0.06)}
            className="mt-10 divide-y-2 divide-dark/10"
          >
            {DELIVERABLES.map((item) => {
              const isOpen = openDeliverable === item.id;
              return (
                <motion.div key={item.id} variants={fadeUp}>
                  <button
                    type="button"
                    onClick={() =>
                      setOpenDeliverable(isOpen ? null : item.id)
                    }
                    className="w-full flex items-center justify-between py-5 text-left group"
                  >
                    <span className="font-display uppercase text-dark text-xl tracking-tight group-hover:text-brand transition-colors">
                      {item.title}
                    </span>
                    <span className="shrink-0 ml-4 text-brand">
                      {isOpen ? (
                        <Minus className="h-5 w-5" />
                      ) : (
                        <Plus className="h-5 w-5" />
                      )}
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="body"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <p className="pb-5 text-dark/60 leading-relaxed text-sm max-w-2xl">
                          {item.body}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── 5. Proceso ── */}
      <section
        id="proceso"
        className="scroll-mt-16 bg-brand w-full"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-20 sm:py-28">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={vp}
            variants={stagger()}
          >
            <motion.p
              variants={fadeUp}
              className="text-cream/60 text-xs font-semibold tracking-[0.3em] uppercase"
            >
              Cómo trabajamos
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="font-display text-cream leading-[0.88] uppercase mt-2"
              style={{ fontSize: "clamp(2.8rem, 9vw, 7rem)" }}
            >
              EL PROCE<span className="text-accent">SO</span>
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={vp}
            variants={stagger(0.1)}
            className="mt-12 grid sm:grid-cols-2 lg:grid-cols-5 gap-4"
          >
            {PROCESS.map((step) => (
              <motion.div
                key={step.n}
                variants={fadeUp}
                className="border-2 border-cream/20 p-5 hover:border-cream/50 transition-colors"
              >
                <p className="font-display text-accent text-3xl">{step.n}</p>
                <p className="font-display text-cream uppercase text-lg mt-1 leading-tight">
                  {step.phase}
                </p>
                <p className="text-cream/50 text-xs uppercase tracking-wider mt-1">
                  {step.time}
                </p>
                <p className="text-cream/70 text-sm leading-relaxed mt-3">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 6. Por qué elegirnos ── */}
      <section
        id="por-que"
        className="scroll-mt-16 bg-cream w-full"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-20 sm:py-28">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={vp}
            variants={stagger()}
          >
            <motion.p
              variants={fadeUp}
              className="text-brand text-xs font-semibold tracking-[0.3em] uppercase"
            >
              Por qué nosotros
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="font-display text-dark leading-[0.88] uppercase mt-2"
              style={{ fontSize: "clamp(2.8rem, 9vw, 7rem)" }}
            >
              LA DIFER<span className="text-accent">ENCIA</span>
            </motion.h2>
          </motion.div>

          <div className="mt-12 grid md:grid-cols-2 gap-6">
            {/* Con nosotros */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={vp}
              variants={stagger(0.08)}
              className="border-2 border-brand p-7"
            >
              <p className="font-display text-brand uppercase text-xl tracking-tight mb-5">
                Con nosotros
              </p>
              <ul className="space-y-3">
                {[
                  "Estrategia antes que diseño",
                  "Entregables organizados y listos para usar",
                  "Proceso transparente con actualizaciones semanales",
                  "Revisiones incluidas, sin sorpresas de precio",
                  "Brandbook que tu equipo realmente entiende y usa",
                ].map((item) => (
                  <motion.li
                    key={item}
                    variants={fadeUp}
                    className="flex items-start gap-3"
                  >
                    <Check className="h-4 w-4 text-brand shrink-0 mt-0.5" />
                    <span className="text-dark/80 text-sm">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Sin branding profesional */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={vp}
              variants={stagger(0.08)}
              className="border-2 border-dark/10 p-7 bg-dark/[0.03]"
            >
              <p className="font-display text-dark/40 uppercase text-xl tracking-tight mb-5">
                Sin branding profesional
              </p>
              <ul className="space-y-3">
                {[
                  "Logo genérico que no diferencia a nadie",
                  "Archivos que nadie sabe dónde están",
                  "Proveedor que desaparece después de entregar",
                  "Costos extra por cada ajuste mínimo",
                  "Manual de marca de 80 páginas que nadie abre",
                ].map((item) => (
                  <motion.li
                    key={item}
                    variants={fadeUp}
                    className="flex items-start gap-3"
                  >
                    <X className="h-4 w-4 text-dark/30 shrink-0 mt-0.5" />
                    <span className="text-dark/40 text-sm">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 7. Inversión ── */}
      <section
        id="inversion"
        className="scroll-mt-16 bg-dark w-full"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-20 sm:py-28">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={vp}
            variants={stagger()}
          >
            <motion.p
              variants={fadeUp}
              className="text-cream/40 text-xs font-semibold tracking-[0.3em] uppercase"
            >
              Inversión
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="font-display text-cream leading-[0.88] uppercase mt-2"
              style={{ fontSize: "clamp(2.8rem, 9vw, 7rem)" }}
            >
              PLANES <span className="text-accent">DESDE</span>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="mt-4 text-cream/40 text-sm max-w-lg leading-relaxed"
            >
              Pago en etapas disponible. Cotización exacta sin costo ni compromiso.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={vp}
            variants={stagger(0.12)}
            className="mt-12 grid md:grid-cols-2 gap-4"
          >
            {/* Plan Básico */}
            <motion.div
              variants={fadeUp}
              className="border-2 border-cream/20 p-8 flex flex-col gap-6 hover:border-cream/40 transition-colors"
            >
              <div>
                <p className="text-cream/40 text-xs uppercase tracking-[0.25em] font-semibold">Branding</p>
                <p className="font-display text-cream text-2xl uppercase mt-1 leading-none">Básico</p>
              </div>
              <div>
                <p className="font-display text-accent leading-none uppercase" style={{ fontSize: "clamp(2.5rem, 7vw, 5rem)" }}>
                  $500
                </p>
                <p className="text-cream/30 text-xs uppercase tracking-widest mt-1">USD · precio fijo</p>
              </div>
              <ul className="space-y-2.5 flex-1">
                {[
                  "Logo principal + variantes (horizontal, isotipo)",
                  "Paleta de color primaria y secundaria",
                  "Sistema tipográfico (2 familias)",
                  "Mini guía de uso (10 págs.)",
                  "Archivos vectoriales AI, SVG y PNG",
                  "2 rondas de ajustes incluidas",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <div className="h-4 w-4 bg-accent flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="h-2.5 w-2.5 text-dark" />
                    </div>
                    <span className="text-cream/65 text-sm leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
              <WhatsAppButton
                message="Hola 👋 Me interesa el plan Básico de branding ($500 USD)."
                label="Cotizar básico"
                variant="outline"
                className="w-full justify-center px-6 py-3 tracking-[0.15em]"
              />
            </motion.div>

            {/* Plan Completo */}
            <motion.div
              variants={fadeUp}
              className="border-2 border-accent p-8 flex flex-col gap-6 relative"
            >
              <div className="absolute -top-px left-0 right-0 bg-accent py-1.5 text-center">
                <p className="text-dark text-xs font-semibold uppercase tracking-[0.2em]">Más completo</p>
              </div>
              <div className="mt-5">
                <p className="text-cream/40 text-xs uppercase tracking-[0.25em] font-semibold">Branding</p>
                <p className="font-display text-cream text-2xl uppercase mt-1 leading-none">Completo</p>
              </div>
              <div>
                <p className="font-display text-accent leading-none uppercase" style={{ fontSize: "clamp(2rem, 5.5vw, 4rem)" }}>
                  $700–$2.000
                </p>
                <p className="text-cream/30 text-xs uppercase tracking-widest mt-1">USD · según alcance del proyecto</p>
              </div>
              <ul className="space-y-2.5 flex-1">
                {[
                  "Todo lo del plan Básico",
                  "Estrategia y posicionamiento de marca",
                  "Naming (si se requiere)",
                  "Brandbook completo en PDF y Figma",
                  "Aplicaciones clave: tarjetas, papelería, firma",
                  "Plantillas para redes sociales",
                  "Mockups de presentación de alta calidad",
                  "Transferencia total de derechos",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <div className="h-4 w-4 bg-accent flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="h-2.5 w-2.5 text-dark" />
                    </div>
                    <span className="text-cream/65 text-sm leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
              <WhatsAppButton
                message="Hola 👋 Me interesa el plan Completo de branding ($700–$2.000 USD)."
                label="Solicitar cotización"
                className="w-full justify-center px-6 py-3 tracking-[0.15em]"
              />
            </motion.div>
          </motion.div>

          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={vp}
            variants={fadeUp}
            className="mt-6 text-cream/20 text-xs text-center leading-relaxed"
          >
            El precio del plan Completo varía según la cantidad de aplicaciones, complejidad del proyecto y necesidades específicas de la marca.
          </motion.p>
        </div>
      </section>

      {/* ── 8. FAQ ── */}
      <section
        id="faq"
        className="scroll-mt-16 bg-cream w-full"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-20 sm:py-28">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={vp}
            variants={stagger()}
          >
            <motion.p
              variants={fadeUp}
              className="text-brand text-xs font-semibold tracking-[0.3em] uppercase"
            >
              Preguntas frecuentes
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="font-display text-dark leading-[0.88] uppercase mt-2"
              style={{ fontSize: "clamp(2.8rem, 9vw, 7rem)" }}
            >
              TUS <span className="text-accent">DUDAS</span>
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={vp}
            variants={stagger(0.06)}
            className="mt-10 divide-y-2 divide-dark/10 max-w-3xl"
          >
            {FAQS.map((item) => {
              const isOpen = openFaq === item.q;
              return (
                <motion.div key={item.q} variants={fadeUp}>
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : item.q)}
                    className="w-full flex items-start justify-between py-5 text-left group gap-4"
                  >
                    <span className="font-semibold text-dark text-base group-hover:text-brand transition-colors leading-snug">
                      {item.q}
                    </span>
                    <span className="shrink-0 text-brand mt-0.5">
                      {isOpen ? (
                        <Minus className="h-5 w-5" />
                      ) : (
                        <Plus className="h-5 w-5" />
                      )}
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="faq-body"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <p className="pb-5 text-dark/60 leading-relaxed text-sm">
                          {item.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── 9. CTA Final ── */}
      <section
        id="contactar"
        className="scroll-mt-16 bg-accent w-full"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-20 sm:py-28 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={vp}
            variants={stagger()}
          >
            <motion.p
              variants={fadeUp}
              className="text-dark/50 text-xs font-semibold tracking-[0.3em] uppercase"
            >
              ¿Listo?
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="font-display text-dark leading-[0.88] uppercase mt-2"
              style={{ fontSize: "clamp(3rem, 11vw, 10rem)" }}
            >
              CONSTRUYA
              <br />
              MOS TU
              <br />
              <span className="text-cream">MARCA</span>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="mt-5 text-dark/70 max-w-md mx-auto"
            >
              Cuéntanos del proyecto. Sin compromiso — en 24 h te respondemos con
              disponibilidad y estimado.
            </motion.p>
            <motion.div
              variants={fadeUp}
              className="mt-10 flex flex-wrap items-center justify-center gap-3"
            >
              <WhatsAppButton
                message="Hola 👋 Quiero información sobre el branding de mi marca."
                label="Escríbenos por WhatsApp"
                className="px-7 py-3 text-sm"
              />
              <Link
                href="/#contacto"
                className="inline-flex items-center gap-2 border-2 border-dark text-dark font-display text-sm px-7 py-3 tracking-[0.12em] uppercase hover:bg-dark hover:text-cream transition-colors"
              >
                <Mail className="h-4 w-4" />
                Escribir por correo
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
