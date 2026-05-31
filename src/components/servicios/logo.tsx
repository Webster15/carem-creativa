"use client";

import { useState } from "react";
import { motion, type Variants } from "framer-motion";
import {
  ArrowRight, Check, ChevronDown, ChevronUp,
  Sparkles, BookOpen, FolderOpen, Clock,
} from "lucide-react";
import Link from "next/link";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};
const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

// ─── Hero ───────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="bg-brand overflow-hidden">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 pt-16 pb-20 sm:pb-28">
        <motion.div initial="hidden" animate="visible" variants={stagger}>
          <motion.p variants={fadeUp} className="text-accent text-xs font-semibold tracking-[0.3em] uppercase">
            Diseño de Logotipo
          </motion.p>
          <motion.h1
            variants={fadeUp}
            className="font-display text-cream leading-[0.86] uppercase mt-3"
            style={{ fontSize: "clamp(3rem, 8vw, 10rem)" }}
          >
            UN LOGO QUE{" "}
            <span className="text-accent block sm:inline">TE ACOMPAÑA</span>{" "}
            TODA LA VIDA
          </motion.h1>
          <motion.p variants={fadeUp} className="mt-6 max-w-xl text-cream/70 text-base leading-relaxed">
            Creamos logotipos únicos, profesionales y memorables que representan la
            esencia de tu negocio y te diferencian a primera vista.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/#contacto"
              className="inline-flex items-center gap-2 bg-accent text-cream font-display text-xs px-6 py-3 tracking-[0.12em] uppercase hover:bg-cream hover:text-brand transition-colors"
            >
              Quiero mi logo <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <Link
              href="/#portafolio"
              className="inline-flex items-center gap-2 border-2 border-cream/30 text-cream font-display text-xs px-6 py-3 tracking-[0.12em] uppercase hover:border-cream transition-colors"
            >
              Ver portafolio
            </Link>
            <span className="flex items-center gap-1.5 text-cream/35 text-xs">
              <Clock className="h-3.5 w-3.5" />
              7–10 días · Desde $400 USD
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── What Is ─────────────────────────────────────────────────────────────────

const FEATURES = [
  "Único y alineado a tu negocio.",
  "Versátil, funcional en cualquier tamaño y formato.",
  "Atemporal, pensado para durar (no para seguir modas pasajeras).",
  "Profesional, listo para usar en web, redes, impresos y más.",
];

function WhatIs() {
  return (
    <section className="bg-cream w-full">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-20 sm:py-28">
        <motion.div
          className="grid md:grid-cols-2 gap-12 md:gap-20 items-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
        >
          <motion.div variants={fadeUp}>
            <p className="text-accent text-xs font-semibold tracking-[0.3em] uppercase">¿Qué es?</p>
            <h2
              className="font-display text-brand leading-[0.88] uppercase mt-2"
              style={{ fontSize: "clamp(2.5rem, 7vw, 7rem)" }}
            >
              DISEÑO{" "}<span className="text-accent">ENFOCADO</span>
            </h2>
            <p className="mt-6 text-dark/60 text-sm leading-relaxed">
              Un servicio enfocado y ágil para quienes necesitan un logotipo profesional
              sin entrar en un proceso completo de branding.
            </p>
            <div className="mt-5 border-l-4 border-accent pl-4 py-1">
              <p className="text-dark/55 text-sm leading-relaxed italic">
                Si buscas algo más estratégico — propósito, posicionamiento, manual de marca
                completo — te recomendamos nuestro servicio de{" "}
                <Link href="/#servicios" className="text-accent underline underline-offset-2">
                  Branding
                </Link>.
              </p>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="space-y-2.5">
            <p className="text-dark/40 text-xs uppercase tracking-[0.2em] font-semibold mb-4">
              Diseñamos un logo que sea:
            </p>
            {FEATURES.map((f, i) => (
              <div key={i} className="flex items-start gap-3 bg-brand/5 px-4 py-3">
                <div className="h-5 w-5 bg-accent flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="h-3 w-3 text-cream" />
                </div>
                <p className="text-dark/75 text-sm leading-relaxed">{f}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── For You ─────────────────────────────────────────────────────────────────

const IDEAL_FOR = [
  { icon: "🚀", text: "Estás emprendiendo y necesitas un logo rápido pero profesional." },
  { icon: "🔄", text: "Tu logo actual luce amateur o desactualizado." },
  { icon: "💼", text: "Ya tienes claro quién eres como marca y solo necesitas la parte visual." },
  { icon: "💰", text: "Buscas una solución accesible sin sacrificar calidad." },
  { icon: "📱", text: "Necesitas un logo que se vea bien en redes, web e impresos." },
];

function ForYou() {
  return (
    <section className="bg-dark w-full">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-20 sm:py-28">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <p className="text-accent text-xs font-semibold tracking-[0.3em] uppercase">¿Es para ti?</p>
          <h2
            className="font-display text-cream leading-[0.88] uppercase mt-2"
            style={{ fontSize: "clamp(2.5rem, 7vw, 7rem)" }}
          >
            ESTE SERVICIO{" "}
            <span className="text-accent">ES IDEAL</span>{" "}
            SI…
          </h2>
        </motion.div>

        <motion.div
          className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
        >
          {IDEAL_FOR.map((item, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="bg-cream/5 border border-cream/10 p-6 flex gap-4 items-start"
            >
              <span className="text-2xl shrink-0">{item.icon}</span>
              <p className="text-cream/75 text-sm leading-relaxed">{item.text}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── Deliverables ─────────────────────────────────────────────────────────────

const DELIVERABLES = [
  {
    icon: Sparkles,
    title: "Diseño del Logotipo",
    items: [
      "Diseño 100% original y personalizado",
      "2 propuestas iniciales de concepto",
      "Versión principal del logo",
      "Variantes: horizontal, vertical, isotipo y monocromática",
      "Versión para fondos claros y oscuros",
    ],
  },
  {
    icon: BookOpen,
    title: "Mini Guía de Uso",
    items: [
      "Paleta de colores (HEX, RGB, CMYK)",
      "Tipografía utilizada",
      "Usos correctos e incorrectos",
      "Espacios mínimos de seguridad",
    ],
  },
  {
    icon: FolderOpen,
    title: "Archivos Finales",
    items: [
      "Editables: AI, SVG, PDF",
      "Web/redes: PNG (fondo transparente), JPG",
      "Organizados en carpetas listas para usar",
    ],
  },
];

function Deliverables() {
  return (
    <section id="entregables" className="scroll-mt-16 bg-brand w-full">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-20 sm:py-28">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <p className="text-accent text-xs font-semibold tracking-[0.3em] uppercase">Entregables</p>
          <h2
            className="font-display text-cream leading-[0.88] uppercase mt-2"
            style={{ fontSize: "clamp(2.5rem, 7vw, 7rem)" }}
          >
            QUÉ{" "}<span className="text-accent">INCLUYE</span>
          </h2>
        </motion.div>

        <motion.div
          className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
        >
          {DELIVERABLES.map(({ icon: Icon, title, items }, i) => (
            <motion.div key={i} variants={fadeUp} className="bg-cream p-8 flex flex-col gap-5">
              <div className="h-12 w-12 bg-brand flex items-center justify-center text-cream">
                <Icon className="h-6 w-6" />
              </div>
              <p className="font-display text-brand text-xl uppercase tracking-wide leading-none">{title}</p>
              <ul className="space-y-2.5">
                {items.map((item, j) => (
                  <li key={j} className="flex items-start gap-2.5 text-sm text-dark/65">
                    <div className="h-4 w-4 bg-accent flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="h-2.5 w-2.5 text-cream" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── Process ─────────────────────────────────────────────────────────────────

const STEPS = [
  { n: "01", day: "Día 1",     title: "Brief Inicial",      desc: "Cuestionario para conocer tu negocio, estilo y referentes. Definimos objetivos y dirección visual." },
  { n: "02", day: "Días 2–3",  title: "Exploración Visual", desc: "Investigación de referentes y tendencias. Bocetos y exploración de conceptos." },
  { n: "03", day: "Días 4–5",  title: "Propuestas",         desc: "Presentación de 2 propuestas de logo. Eliges la dirección que más conecta contigo." },
  { n: "04", day: "Días 6–7",  title: "Refinamiento",       desc: "Ajustes y pulido del logo elegido. Incluye 2 rondas de revisión." },
  { n: "05", day: "Días 8–10", title: "Entrega Final",      desc: "Mini guía de uso, archivos finales organizados y asesoría rápida de implementación." },
];

function Process() {
  return (
    <section id="proceso" className="scroll-mt-16 bg-cream w-full">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-20 sm:py-28">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <p className="text-accent text-xs font-semibold tracking-[0.3em] uppercase">Cómo trabajamos</p>
          <h2
            className="font-display text-brand leading-[0.88] uppercase mt-2"
            style={{ fontSize: "clamp(2.5rem, 7vw, 7rem)" }}
          >
            EL{" "}<span className="text-accent">PROCESO</span>
          </h2>
        </motion.div>

        <motion.div
          className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
        >
          {STEPS.map((s, i) => (
            <motion.div key={i} variants={fadeUp} className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 bg-brand flex items-center justify-center shrink-0">
                  <span className="font-display text-cream text-sm uppercase">{s.n}</span>
                </div>
                <p className="text-accent text-xs font-semibold uppercase tracking-[0.15em]">{s.day}</p>
              </div>
              <p className="font-display text-brand text-lg uppercase leading-none">{s.title}</p>
              <p className="text-dark/55 text-xs leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── Why Us ──────────────────────────────────────────────────────────────────

const PROS = [
  "Logos originales y personalizados",
  "Proceso ágil y claro",
  "Entregables completos y listos para usar",
  "Acompañamiento humano",
];
const CONS = [
  "Plantillas o logos genéricos",
  "Tiempos eternos sin avances",
  "Archivos sueltos o incompletos",
  "Comunicación fría y automática",
];

function WhyUs() {
  return (
    <section className="bg-vivid w-full">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-20 sm:py-28">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <p className="text-cream/60 text-xs font-semibold tracking-[0.3em] uppercase">Diferenciadores</p>
          <h2
            className="font-display text-cream leading-[0.88] uppercase mt-2"
            style={{ fontSize: "clamp(2.5rem, 7vw, 7rem)" }}
          >
            POR QUÉ{" "}<span className="text-accent">ELEGIRNOS</span>
          </h2>
        </motion.div>

        <motion.div
          className="mt-10 grid md:grid-cols-2 gap-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
        >
          <motion.div variants={fadeUp} className="bg-cream/10 border border-cream/20 p-8">
            <p className="font-display text-cream text-sm uppercase tracking-[0.2em] mb-6">✨ Lo que ofrecemos</p>
            <ul className="space-y-3">
              {PROS.map((p, i) => (
                <li key={i} className="flex items-center gap-3">
                  <div className="h-5 w-5 bg-accent flex items-center justify-center shrink-0">
                    <Check className="h-3 w-3 text-cream" />
                  </div>
                  <p className="text-cream/80 text-sm">{p}</p>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={fadeUp} className="bg-dark/20 border border-cream/10 p-8">
            <p className="font-display text-cream/50 text-sm uppercase tracking-[0.2em] mb-6">❌ Lo que evitamos</p>
            <ul className="space-y-3">
              {CONS.map((c, i) => (
                <li key={i} className="flex items-center gap-3">
                  <div className="h-5 w-5 bg-cream/15 flex items-center justify-center shrink-0">
                    <span className="text-cream/30 text-xs font-bold">×</span>
                  </div>
                  <p className="text-cream/35 text-sm line-through decoration-cream/20">{c}</p>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Pricing ─────────────────────────────────────────────────────────────────

function Pricing() {
  return (
    <section id="inversion" className="scroll-mt-16 bg-dark w-full">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-20 sm:py-28">
        <motion.div
          className="grid md:grid-cols-2 gap-12 items-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
        >
          <motion.div variants={fadeUp}>
            <p className="text-accent text-xs font-semibold tracking-[0.3em] uppercase">Inversión</p>
            <h2
              className="font-display text-cream leading-[0.88] uppercase mt-2"
              style={{ fontSize: "clamp(2.5rem, 7vw, 7rem)" }}
            >
              PRECIO{" "}<span className="text-accent">CLARO</span>
            </h2>
            <p className="mt-6 text-cream/50 text-sm leading-relaxed">
              Sin sorpresas. Planes de pago disponibles para que empezar sea fácil.
            </p>
          </motion.div>

          <motion.div variants={fadeUp} className="bg-brand/20 border-2 border-brand/30 p-10">
            <p className="text-cream/50 text-xs uppercase tracking-[0.25em]">Diseño de Logotipo</p>
            <p
              className="font-display text-cream uppercase mt-3 leading-none"
              style={{ fontSize: "clamp(3.5rem, 8vw, 9rem)" }}
            >
              $400
            </p>
            <p className="text-accent font-semibold text-sm tracking-widest mt-1">USD</p>
            <div className="mt-6 space-y-1.5 text-sm text-cream/50">
              <p>Plazo estimado: 7 a 10 días hábiles</p>
              <p>Planes de pago disponibles</p>
            </div>
            <Link
              href="/#contacto"
              className="mt-8 flex items-center justify-center gap-2 w-full bg-accent text-cream font-display text-xs px-6 py-4 tracking-[0.15em] uppercase hover:bg-cream hover:text-brand transition-colors"
            >
              Solicitar cotización <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── FAQ ─────────────────────────────────────────────────────────────────────

const FAQS = [
  { q: "¿Cuánto tarda el proceso?", a: "Entre 7 y 10 días hábiles, dependiendo de los tiempos de feedback de tu parte." },
  { q: "¿Cuántas propuestas de logo me muestran?", a: "Presentamos 2 propuestas sólidas basadas en tu brief, no decenas de opciones al azar." },
  { q: "¿Puedo pedir cambios?", a: "Sí, incluimos 2 rondas de revisión sobre el concepto elegido." },
  { q: "¿Me entregan los archivos editables?", a: "Sí, recibes el logo en formatos editables (AI, SVG, PDF) y de uso final (PNG, JPG)." },
  { q: "¿Qué diferencia hay entre este servicio y el de Branding?", a: "Este servicio se enfoca solo en el logo. El servicio de Branding incluye estrategia de marca, sistema visual completo, aplicaciones y manual de identidad." },
  { q: "¿Y si después quiero el branding completo?", a: "¡Genial! Puedes escalar al servicio de Branding y descontamos parte de lo invertido aquí." },
];

function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="scroll-mt-16 bg-cream w-full">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-20 sm:py-28">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <p className="text-accent text-xs font-semibold tracking-[0.3em] uppercase">Preguntas frecuentes</p>
          <h2
            className="font-display text-brand leading-[0.88] uppercase mt-2"
            style={{ fontSize: "clamp(2.5rem, 7vw, 7rem)" }}
          >
            DUDAS{" "}<span className="text-accent">FRECUENTES</span>
          </h2>
        </motion.div>

        <motion.div
          className="mt-10 space-y-2"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
        >
          {FAQS.map((faq, i) => (
            <motion.div key={i} variants={fadeUp}>
              <button
                type="button"
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 bg-brand/5 hover:bg-brand/10 px-6 py-4 text-left transition-colors"
              >
                <p className="font-display text-brand text-sm uppercase tracking-wide">{faq.q}</p>
                {open === i
                  ? <ChevronUp className="h-4 w-4 text-accent shrink-0" />
                  : <ChevronDown className="h-4 w-4 text-brand/40 shrink-0" />}
              </button>
              {open === i && (
                <div className="bg-brand/5 px-6 py-4 border-t border-brand/10">
                  <p className="text-dark/65 text-sm leading-relaxed">{faq.a}</p>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── Final CTA ───────────────────────────────────────────────────────────────

function FinalCTA() {
  return (
    <section className="bg-brand w-full">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-24 sm:py-32">
        <motion.div
          className="flex flex-col items-center text-center gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
        >
          <motion.h2
            variants={fadeUp}
            className="font-display text-cream leading-[0.88] uppercase"
            style={{ fontSize: "clamp(3rem, 9vw, 11rem)" }}
          >
            ¿LISTO PARA TU{" "}
            <span className="text-accent">LOGO</span>?
          </motion.h2>
          <motion.p variants={fadeUp} className="text-cream/60 text-base max-w-sm leading-relaxed">
            Cuéntanos sobre tu proyecto y empecemos a darle forma a tu marca.
          </motion.p>
          <motion.div variants={fadeUp}>
            <Link
              href="/#contacto"
              className="inline-flex items-center gap-2 bg-accent text-cream font-display text-sm px-8 py-4 tracking-[0.15em] uppercase hover:bg-cream hover:text-brand transition-colors"
            >
              Empezar mi logo <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Page export ─────────────────────────────────────────────────────────────

export function LogoServicePage() {
  return (
    <>
      <Hero />
      <WhatIs />
      <ForYou />
      <Deliverables />
      <Process />
      <WhyUs />
      <Pricing />
      <FAQ />
      <FinalCTA />
    </>
  );
}
