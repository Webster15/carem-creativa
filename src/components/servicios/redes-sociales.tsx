"use client";

import { useState } from "react";
import { motion, type Variants } from "framer-motion";
import {
  ArrowRight, Check, ChevronDown, ChevronUp,
  Image, Palette, Folder, Gift,
  Zap, CalendarDays, Layers,
  ClipboardList, Inbox, Eye, PackageCheck, Clock,
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
    <section className="bg-vivid overflow-hidden">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 pt-16 pb-20 sm:pb-28">
        <motion.div initial="hidden" animate="visible" variants={stagger}>
          <motion.p variants={fadeUp} className="text-cream/60 text-xs font-semibold tracking-[0.3em] uppercase">
            Diseño para redes sociales — Solo diseño visual
          </motion.p>
          <motion.h1
            variants={fadeUp}
            className="font-display text-cream leading-[0.86] uppercase mt-3"
            style={{ fontSize: "clamp(2.8rem, 7.5vw, 9.5rem)" }}
          >
            TUS REDES SE{" "}
            <span className="text-accent">VEN</span>{" "}
            AL NIVEL DE{" "}
            <span className="text-accent">TU MARCA</span>
          </motion.h1>
          <motion.p variants={fadeUp} className="mt-6 max-w-xl text-cream/65 text-base leading-relaxed">
            Diseñamos piezas gráficas atractivas, coherentes y alineadas a tu identidad
            para que tu contenido destaque, conecte y refleje el nivel real de tu negocio.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/#contacto"
              className="inline-flex items-center gap-2 bg-accent text-cream font-display text-xs px-6 py-3 tracking-[0.12em] uppercase hover:bg-cream hover:text-brand transition-colors"
            >
              Quiero piezas profesionales <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <Link
              href="#modalidades"
              className="inline-flex items-center gap-2 border-2 border-cream/30 text-cream font-display text-xs px-6 py-3 tracking-[0.12em] uppercase hover:border-cream transition-colors"
            >
              Ver modalidades
            </Link>
            <span className="flex items-center gap-1.5 text-cream/35 text-xs">
              <Clock className="h-3.5 w-3.5" />
              2–5 días por pieza · Desde $250 USD
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── What Is ─────────────────────────────────────────────────────────────────

const WHAT_ITEMS = [
  "Una estética coherente y profesional en tu feed.",
  "Piezas que comunican con claridad y captan la atención.",
  "Ahorro de tiempo: tú nos pasas el contenido, nosotros lo diseñamos.",
  "Una marca que se ve al nivel de su competencia — o por encima.",
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
              DISEÑO{" "}<span className="text-vivid">PURO</span>
            </h2>
            <p className="mt-6 text-dark/60 text-sm leading-relaxed">
              Un servicio 100% enfocado en diseño gráfico para redes sociales.
              Transformamos tus ideas o contenido en piezas visuales profesionales,
              listas para publicar en Instagram, Facebook, LinkedIn, TikTok, Pinterest y más.
            </p>
            <div className="mt-5 border-l-4 border-accent pl-4 py-2">
              <p className="text-dark/55 text-sm leading-relaxed">
                <span className="font-semibold text-dark/80">⚠️ Importante:</span> este servicio NO incluye
                estrategia de contenidos, copywriting, calendarización ni community management.
                Es diseño puro para quienes ya saben qué comunicar y necesitan que se vea increíble.
              </p>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="space-y-2.5">
            <p className="text-dark/40 text-xs uppercase tracking-[0.2em] font-semibold mb-4">
              Con este servicio logras:
            </p>
            {WHAT_ITEMS.map((f, i) => (
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
  { icon: "📈", text: "Tu marca publica seguido pero las piezas se ven inconsistentes o improvisadas." },
  { icon: "🎨", text: "Quieres un feed estético y profesional que refleje tu identidad de marca." },
  { icon: "⏳", text: "No tienes tiempo (o equipo) para diseñar internamente." },
  { icon: "💼", text: "Eres emprendedor, agencia, community manager o equipo de marketing que necesita apoyo de diseño." },
  { icon: "🚀", text: "Vas a lanzar una campaña, evento o producto y necesitas piezas puntuales." },
  { icon: "📲", text: "Quieres plantillas reutilizables para gestionar tus redes con facilidad." },
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
            <span className="text-vivid">ES IDEAL</span>{" "}
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
              <p className="text-cream/70 text-sm leading-relaxed">{item.text}</p>
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
    icon: Image,
    color: "bg-vivid",
    title: "Diseño de Piezas",
    items: [
      "Posts estáticos (cuadrados, verticales)",
      "Carruseles multi-slide",
      "Historias / Stories",
      "Reels covers y portadas de TikTok",
      "Portadas y banners (FB, LinkedIn, YT)",
      "Fotos de perfil e Highlights",
      "Piezas para campañas o promociones",
    ],
  },
  {
    icon: Palette,
    color: "bg-accent",
    title: "Coherencia Visual",
    items: [
      "Aplicación de tu identidad de marca",
      "Colores y tipografías de tu manual",
      "Composición visual jerarquizada",
      "Adaptaciones por formato y red social",
    ],
  },
  {
    icon: Folder,
    color: "bg-brand",
    title: "Archivos Finales",
    items: [
      "PNG / JPG listos para publicar",
      "Alta resolución",
      "Plantillas editables en Canva o Figma (si aplica)",
      "Organizados por carpetas y fechas",
    ],
  },
  {
    icon: Gift,
    color: "bg-dark",
    title: "Extras del Plan",
    items: [
      "Mini guía de uso de plantillas",
      "Rondas de revisión incluidas",
      "Diseño exprés para piezas urgentes",
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
          className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
        >
          {DELIVERABLES.map(({ icon: Icon, color, title, items }, i) => (
            <motion.div key={i} variants={fadeUp} className="bg-cream/10 border border-cream/15 p-7 flex flex-col gap-5">
              <div className={`h-12 w-12 ${color} flex items-center justify-center text-cream`}>
                <Icon className="h-6 w-6" />
              </div>
              <p className="font-display text-cream text-lg uppercase tracking-wide leading-none">{title}</p>
              <ul className="space-y-2.5">
                {items.map((item, j) => (
                  <li key={j} className="flex items-start gap-2.5 text-sm text-cream/60">
                    <div className="h-4 w-4 bg-accent/70 flex items-center justify-center shrink-0 mt-0.5">
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

// ─── Modalities ───────────────────────────────────────────────────────────────

const MODALITIES = [
  {
    icon: Zap,
    badge: "🟢",
    title: "Por Pieza",
    subtitle: "Puntual",
    desc: "Ideal si necesitas piezas específicas o campañas concretas. Pagas solo por lo que diseñamos, sin compromisos de continuidad.",
    highlights: ["Sin compromisos mensuales", "Perfecto para campañas", "Entrega 2–5 días"],
  },
  {
    icon: CalendarDays,
    badge: "🟡",
    title: "Pack Mensual",
    subtitle: "Flujo constante",
    desc: "Cantidad fija de piezas al mes (ej. 12, 20 o 30 piezas). Perfecto si publicas con regularidad y quieres un flujo constante de diseño.",
    highlights: ["12 a 30+ piezas/mes", "Entregas semanales", "Precio preferencial"],
  },
  {
    icon: Layers,
    badge: "🔵",
    title: "Plantillas Editables",
    subtitle: "Autonomía con estilo",
    desc: "Diseñamos un kit de plantillas personalizadas en Canva o Figma para que tu equipo las edite fácilmente. Autonomía sin perder coherencia visual.",
    highlights: ["Canva o Figma", "Kit completo", "Capacitación incluida"],
  },
];

function Modalities() {
  return (
    <section id="modalidades" className="scroll-mt-16 bg-cream w-full">
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
            3{" "}<span className="text-vivid">FORMAS</span>{" "}DE TRABAJAR
          </h2>
        </motion.div>

        <motion.div
          className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
        >
          {MODALITIES.map(({ icon: Icon, badge, title, subtitle, desc, highlights }, i) => (
            <motion.div key={i} variants={fadeUp} className="border-2 border-brand/10 p-8 flex flex-col gap-5">
              <div className="flex items-start justify-between">
                <div className="h-12 w-12 bg-brand flex items-center justify-center text-cream">
                  <Icon className="h-6 w-6" />
                </div>
                <span className="text-2xl">{badge}</span>
              </div>
              <div>
                <p className="font-display text-brand text-xl uppercase leading-none">{title}</p>
                <p className="text-accent text-xs font-semibold tracking-[0.2em] uppercase mt-1">{subtitle}</p>
              </div>
              <p className="text-dark/60 text-sm leading-relaxed">{desc}</p>
              <ul className="space-y-2 border-t border-brand/10 pt-4">
                {highlights.map((h, j) => (
                  <li key={j} className="flex items-center gap-2 text-sm text-dark/70">
                    <div className="h-4 w-4 bg-vivid flex items-center justify-center shrink-0">
                      <Check className="h-2.5 w-2.5 text-cream" />
                    </div>
                    {h}
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
  { n: "01", icon: ClipboardList, day: "Día 1",    title: "Brief Inicial",         desc: "Cuestionario sobre tu marca, estilo y referentes. Definimos alcance, formatos y redes. Aplicamos tu manual de marca o definimos un mini estilo visual." },
  { n: "02", icon: Inbox,         day: "Día 2",    title: "Recepción de Contenido", desc: "Nos envías los textos e ideas a diseñar. Definimos prioridades, fechas y orden de entrega." },
  { n: "03", icon: Palette,       day: "Días 3–5", title: "Diseño",                 desc: "Diseñamos las piezas siguiendo tu identidad de marca, aplicando jerarquía visual y mejores prácticas para cada red social." },
  { n: "04", icon: Eye,           day: "Revisión", title: "Feedback",               desc: "Te enviamos las piezas para tu revisión. Incluye 1–2 rondas de ajustes por pieza para asegurar que quedes 100% satisfecho." },
  { n: "05", icon: PackageCheck,  day: "Entrega",  title: "Archivos Finales",       desc: "Piezas listas para publicar, organizadas por carpetas, disponibles en tu drive o nube preferida." },
];

function Process() {
  return (
    <section id="proceso" className="scroll-mt-16 bg-dark w-full">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-20 sm:py-28">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <p className="text-accent text-xs font-semibold tracking-[0.3em] uppercase">Paso a paso</p>
          <h2
            className="font-display text-cream leading-[0.88] uppercase mt-2"
            style={{ fontSize: "clamp(2.5rem, 7vw, 7rem)" }}
          >
            EL{" "}<span className="text-vivid">PROCESO</span>
          </h2>
        </motion.div>

        <motion.div
          className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-px bg-cream/10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
        >
          {STEPS.map(({ n, icon: Icon, day, title, desc }, i) => (
            <motion.div key={i} variants={fadeUp} className="bg-dark p-6 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-vivid flex items-center justify-center shrink-0">
                  <Icon className="h-5 w-5 text-cream" />
                </div>
                <span className="font-display text-cream/25 text-3xl uppercase leading-none">{n}</span>
              </div>
              <p className="text-accent text-xs font-semibold uppercase tracking-[0.15em]">{day}</p>
              <p className="font-display text-cream text-base uppercase leading-none">{title}</p>
              <p className="text-cream/45 text-xs leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-6 text-cream/35 text-xs text-center"
        >
          ⚡ Para packs mensuales: flujo continuo con entregas semanales o quincenales.
        </motion.p>
      </div>
    </section>
  );
}

// ─── Why Us ──────────────────────────────────────────────────────────────────

const PROS = [
  "Diseño coherente con tu identidad de marca",
  "Entregas puntuales y bien organizadas",
  "Comunicación clara y ágil",
  "Calidad profesional en cada pieza",
];
const CONS = [
  "Plantillas genéricas mal adaptadas",
  "Improvisación y retrasos de último minuto",
  "Procesos confusos o sin seguimiento",
  '"Lo subo y ya, no importa cómo se vea"',
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
    <section id="inversion" className="scroll-mt-16 bg-cream w-full">
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
              PRECIO{" "}<span className="text-vivid">FLEXIBLE</span>
            </h2>
            <p className="mt-6 text-dark/55 text-sm leading-relaxed">
              El costo varía según el volumen de piezas, los formatos y la modalidad elegida.
              Armamos un plan a la medida de tu marca y presupuesto.
            </p>
            <div className="mt-5 space-y-3">
              {[
                "Descuentos en packs mensuales",
                "Precios diferenciados por volumen",
                "Cotización gratuita sin compromiso",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="h-5 w-5 bg-vivid flex items-center justify-center shrink-0">
                    <Check className="h-3 w-3 text-cream" />
                  </div>
                  <p className="text-dark/70 text-sm">{item}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="bg-dark p-10">
            <p className="text-cream/50 text-xs uppercase tracking-[0.25em]">Diseño para Redes Sociales</p>
            <p
              className="font-display text-cream uppercase mt-3 leading-none"
              style={{ fontSize: "clamp(3.5rem, 8vw, 9rem)" }}
            >
              $250
            </p>
            <p className="text-accent font-semibold text-sm tracking-widest mt-1">USD / desde</p>
            <div className="mt-6 space-y-1.5 text-sm text-cream/50">
              <p>Por pieza puntual o pack mensual</p>
              <p>Entrega en 2–5 días hábiles por pieza</p>
              <p>Cotización personalizada sin costo</p>
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
  { q: "¿Ustedes manejan mis redes sociales?", a: "No. Este es un servicio exclusivo de diseño. No incluye estrategia de contenido, copywriting, programación de publicaciones ni community management." },
  { q: "¿Tengo que enviarles los textos?", a: "Sí. Tú (o tu equipo) nos envías el contenido a diseñar. Nosotros nos encargamos de convertirlo en piezas visuales profesionales." },
  { q: "¿Trabajan con mi identidad de marca actual?", a: "Sí. Si tienes manual de marca, lo aplicamos. Si no, definimos un mini estilo visual contigo antes de empezar, sin costo adicional." },
  { q: "¿Cuántas piezas pueden hacer al mes?", a: "Depende del plan. Tenemos packs desde 12 piezas/mes hasta volúmenes mayores para agencias o marcas con alta frecuencia de publicación." },
  { q: "¿Hacen videos o solo piezas estáticas?", a: "Nos enfocamos en diseño gráfico estático y motion básico (animaciones simples en GIF o MP4 cortos). No producimos video ni edición avanzada de Reels." },
  { q: "¿Puedo editar las piezas después de la entrega?", a: "Si contratas el plan de plantillas editables en Canva o Figma, sí. En los demás casos, entregamos archivos finales listos para publicar." },
  { q: "¿Cuánto tardan en entregar?", a: "Piezas puntuales: 2 a 5 días hábiles. Packs mensuales: entregas continuas según el calendario que acordemos juntos." },
  { q: "¿Y si necesito algo urgente?", a: "Tenemos servicio express con un costo adicional. Entregamos en 24–48 horas para cuando el tiempo apremia." },
];

function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="scroll-mt-16 bg-brand w-full">
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
            REDES QUE{" "}
            <span className="text-vivid">REFLEJAN</span>{" "}
            TU NIVEL
          </motion.h2>
          <motion.p variants={fadeUp} className="text-cream/55 text-base max-w-sm leading-relaxed">
            Cuéntanos qué necesitas y armemos juntos el plan ideal para tu marca.
          </motion.p>
          <motion.div variants={fadeUp}>
            <Link
              href="/#contacto"
              className="inline-flex items-center gap-2 bg-accent text-cream font-display text-sm px-8 py-4 tracking-[0.15em] uppercase hover:bg-vivid transition-colors"
            >
              Solicitar mi cotización <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Page export ─────────────────────────────────────────────────────────────

export function RedesSocialesServicePage() {
  return (
    <>
      <Hero />
      <WhatIs />
      <ForYou />
      <Deliverables />
      <Modalities />
      <Process />
      <WhyUs />
      <Pricing />
      <FAQ />
      <FinalCTA />
    </>
  );
}
