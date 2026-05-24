"use client";

import { useState } from "react";
import { motion, type Variants } from "framer-motion";
import {
  ArrowRight, Check, ChevronDown, ChevronUp,
  Brain, Lightbulb, Search, FileText, Clock,
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
    <section className="bg-dark overflow-hidden">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 pt-16 pb-20 sm:pb-28">
        <motion.div initial="hidden" animate="visible" variants={stagger}>
          <motion.p variants={fadeUp} className="text-accent text-xs font-semibold tracking-[0.3em] uppercase">
            Naming — Creación del nombre de tu marca
          </motion.p>
          <motion.h1
            variants={fadeUp}
            className="font-display text-cream leading-[0.86] uppercase mt-3"
            style={{ fontSize: "clamp(2.8rem, 7.5vw, 9.5rem)" }}
          >
            EL NOMBRE QUE{" "}
            <span className="text-accent">DICEN,</span>{" "}
            ESCRIBEN Y{" "}
            <span className="text-vivid">RECUERDAN</span>
          </motion.h1>
          <motion.p variants={fadeUp} className="mt-6 max-w-xl text-cream/65 text-base leading-relaxed">
            Creamos nombres estratégicos, originales y disponibles que conectan con tu
            audiencia, son fáciles de recordar y construyen el primer gran activo de tu marca.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/#contacto"
              className="inline-flex items-center gap-2 bg-accent text-cream font-display text-xs px-6 py-3 tracking-[0.12em] uppercase hover:bg-cream hover:text-brand transition-colors"
            >
              Quiero el nombre perfecto <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <Link
              href="#proceso"
              className="inline-flex items-center gap-2 border-2 border-cream/30 text-cream font-display text-xs px-6 py-3 tracking-[0.12em] uppercase hover:border-cream transition-colors"
            >
              Conocer el proceso
            </Link>
            <span className="flex items-center gap-1.5 text-cream/35 text-xs">
              <Clock className="h-3.5 w-3.5" />
              10–14 días · Desde $300 USD
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── What Is ─────────────────────────────────────────────────────────────────

const FEATURES = [
  "Represente la esencia de tu negocio.",
  "Sea fácil de pronunciar, escribir y recordar.",
  "Conecte emocionalmente con tu cliente ideal.",
  "Esté disponible legalmente y como dominio web.",
  "Sea escalable y no te limite a futuro.",
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
              PROCESO{" "}<span className="text-accent">ESTRATÉGICO</span>
            </h2>
            <p className="mt-6 text-dark/60 text-sm leading-relaxed">
              El naming no es una "lluvia de ideas" al azar. Es un trabajo profundo que
              combina estrategia, lingüística, creatividad y disponibilidad legal/digital.
            </p>
            <div className="mt-5 border-l-4 border-vivid pl-4 py-1">
              <p className="text-dark/55 text-sm leading-relaxed italic">
                Un buen nombre te abre puertas. Uno malo te las cierra antes de empezar.
              </p>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="space-y-2.5">
            <p className="text-dark/40 text-xs uppercase tracking-[0.2em] font-semibold mb-4">
              El nombre que creamos:
            </p>
            {FEATURES.map((f, i) => (
              <div key={i} className="flex items-start gap-3 bg-brand/5 px-4 py-3">
                <div className="h-5 w-5 bg-vivid flex items-center justify-center shrink-0 mt-0.5">
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
  { icon: "🚀", text: "Estás lanzando un nuevo negocio, producto o servicio." },
  { icon: "🤔", text: "Llevas semanas (o meses) bloqueado buscando un nombre y nada te convence." },
  { icon: "🔄", text: "Tu marca actual tiene un nombre confuso, difícil o ya saturado." },
  { icon: "🌎", text: "Quieres un nombre que funcione en varios idiomas o mercados." },
  { icon: "⚖️", text: "Necesitas un nombre registrable y con dominio disponible." },
  { icon: "💼", text: "Vas a lanzar una submarca, línea de producto o servicio nuevo." },
];

function ForYou() {
  return (
    <section className="bg-brand w-full">
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
              className="bg-cream/10 border border-cream/15 p-6 flex gap-4 items-start"
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
    icon: Brain,
    color: "bg-vivid",
    title: "Estrategia de Naming",
    items: [
      "Brief estratégico profundo",
      "Análisis del sector y la competencia",
      "Definición del territorio creativo",
      "Personalidad y tono del nombre",
    ],
  },
  {
    icon: Lightbulb,
    color: "bg-accent",
    title: "Propuestas de Nombre",
    items: [
      "5 a 8 propuestas finales de nombre",
      "Significado y concepto de cada una",
      "Justificación estratégica",
      "Tipología y sonoridad",
    ],
  },
  {
    icon: Search,
    color: "bg-brand",
    title: "Verificación de Disponibilidad",
    items: [
      "Búsqueda de registro de marca",
      "Verificación de dominio (.com, .co, etc.)",
      "Disponibilidad en redes sociales",
    ],
  },
  {
    icon: FileText,
    color: "bg-dark",
    title: "Documento Final",
    items: [
      "PDF profesional con presentación",
      "Argumentación estratégica de cada nombre",
      "Resultados de disponibilidad",
      "Recomendación final",
    ],
  },
];

function Deliverables() {
  return (
    <section className="bg-dark w-full">
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
            QUÉ{" "}<span className="text-vivid">INCLUYE</span>
          </h2>
        </motion.div>

        <motion.div
          className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
        >
          {DELIVERABLES.map(({ icon: Icon, color, title, items }, i) => (
            <motion.div key={i} variants={fadeUp} className="bg-cream/5 border border-cream/10 p-7 flex flex-col gap-5">
              <div className={`h-12 w-12 ${color} flex items-center justify-center text-cream`}>
                <Icon className="h-6 w-6" />
              </div>
              <p className="font-display text-cream text-lg uppercase tracking-wide leading-none">{title}</p>
              <ul className="space-y-2.5">
                {items.map((item, j) => (
                  <li key={j} className="flex items-start gap-2.5 text-sm text-cream/55">
                    <div className="h-4 w-4 bg-vivid/60 flex items-center justify-center shrink-0 mt-0.5">
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
  { n: "01", day: "Días 1–2",  title: "Inmersión",             desc: "Reunión inicial, cuestionario estratégico y análisis de competencia." },
  { n: "02", day: "Día 3",     title: "Estrategia Creativa",   desc: "Definición del territorio creativo, tipologías y tono deseado." },
  { n: "03", day: "Días 4–6",  title: "Generación de Nombres", desc: "50–100 ideas internas, filtros lingüísticos y selección de candidatos." },
  { n: "04", day: "Días 7–8",  title: "Verificación",          desc: "Revisión de registro de marca, dominios y disponibilidad en redes." },
  { n: "05", day: "Días 9–10", title: "Presentación",          desc: "5–8 propuestas finales argumentadas + 1 ronda de ajustes." },
  { n: "06", day: "Entrega",   title: "Documento Final",        desc: "PDF profesional con recomendación y asesoría para los siguientes pasos." },
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
          className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
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
  "Nombres con estrategia detrás",
  "Verificación legal y digital",
  "Propuestas argumentadas",
  "Proceso colaborativo",
];
const CONS = [
  "Nombres bonitos pero vacíos",
  "Sorpresas desagradables después",
  '"Te mando 50 nombres a ver cuál te gusta"',
  "Decisiones unilaterales",
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
    <section className="bg-cream w-full">
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
              className="font-display text-brand leading-[0.88] uppercase mt-2"
              style={{ fontSize: "clamp(2.5rem, 7vw, 7rem)" }}
            >
              PRECIO{" "}<span className="text-accent">CLARO</span>
            </h2>
            <p className="mt-6 text-dark/55 text-sm leading-relaxed">
              Invertir en el nombre correcto desde el inicio te ahorra rebranding costoso en el futuro.
              Planes de pago disponibles.
            </p>
          </motion.div>

          <motion.div variants={fadeUp} className="bg-dark p-10">
            <p className="text-cream/50 text-xs uppercase tracking-[0.25em]">Naming de Marca</p>
            <p
              className="font-display text-cream uppercase mt-3 leading-none"
              style={{ fontSize: "clamp(3.5rem, 8vw, 9rem)" }}
            >
              $300
            </p>
            <p className="text-vivid font-semibold text-sm tracking-widest mt-1">USD</p>
            <div className="mt-6 space-y-1.5 text-sm text-cream/50">
              <p>Plazo estimado: 10 a 14 días hábiles</p>
              <p>5–8 propuestas verificadas y argumentadas</p>
              <p>Planes de pago disponibles</p>
            </div>
            <Link
              href="/#contacto"
              className="mt-8 flex items-center justify-center gap-2 w-full bg-accent text-cream font-display text-xs px-6 py-4 tracking-[0.15em] uppercase hover:bg-vivid transition-colors"
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
  { q: "¿Cuántos nombres me presentan al final?", a: "Presentamos entre 5 y 8 propuestas finales, todas verificadas y argumentadas estratégicamente." },
  { q: "¿Y si ninguno me convence?", a: "Incluimos 1 ronda de ajustes para refinar opciones o explorar nuevas rutas creativas si es necesario." },
  { q: "¿Verifican si el nombre se puede registrar como marca?", a: "Hacemos una verificación preliminar en bases de datos públicas. Para el registro legal definitivo, recomendamos asesorarse con un abogado especializado en propiedad intelectual." },
  { q: "¿Verifican el dominio web?", a: "Sí. Cada propuesta final incluye disponibilidad de dominios principales (.com y locales) y redes sociales." },
  { q: "¿El servicio incluye el diseño del logo?", a: "No, este servicio se enfoca solo en el nombre. Si también necesitas logo o branding completo, tenemos servicios complementarios con descuento al combinarlos." },
  { q: "¿En qué idiomas trabajan?", a: "Trabajamos principalmente en español e inglés, pero podemos explorar nombres en otros idiomas según tu mercado." },
  { q: "¿Funciona para nombres de productos, no solo de empresas?", a: "¡Sí! Aplica para empresas, productos, servicios, submarcas, eventos, apps y más." },
];

function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="bg-brand w-full">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-20 sm:py-28">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <p className="text-accent text-xs font-semibold tracking-[0.3em] uppercase">Preguntas frecuentes</p>
          <h2
            className="font-display text-cream leading-[0.88] uppercase mt-2"
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
                className="w-full flex items-center justify-between gap-4 bg-cream/10 hover:bg-cream/15 px-6 py-4 text-left transition-colors"
              >
                <p className="font-display text-cream text-sm uppercase tracking-wide">{faq.q}</p>
                {open === i
                  ? <ChevronUp className="h-4 w-4 text-accent shrink-0" />
                  : <ChevronDown className="h-4 w-4 text-cream/30 shrink-0" />}
              </button>
              {open === i && (
                <div className="bg-cream/10 px-6 py-4 border-t border-cream/10">
                  <p className="text-cream/65 text-sm leading-relaxed">{faq.a}</p>
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
    <section className="bg-dark w-full">
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
            style={{ fontSize: "clamp(2.8rem, 9vw, 11rem)" }}
          >
            EL NOMBRE QUE{" "}
            <span className="text-vivid">TU MARCA</span>{" "}
            MERECE
          </motion.h2>
          <motion.p variants={fadeUp} className="text-cream/55 text-base max-w-sm leading-relaxed">
            Agenda una llamada gratuita y conversemos sobre tu proyecto.
          </motion.p>
          <motion.div variants={fadeUp}>
            <Link
              href="/#contacto"
              className="inline-flex items-center gap-2 bg-accent text-cream font-display text-sm px-8 py-4 tracking-[0.15em] uppercase hover:bg-vivid transition-colors"
            >
              Empezar mi naming <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Page export ─────────────────────────────────────────────────────────────

export function NamingServicePage() {
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
