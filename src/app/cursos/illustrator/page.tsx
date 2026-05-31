"use client";

import { useEffect, useState } from "react";
import { motion, type Variants } from "framer-motion";
import {
  ArrowRight, Check, Play, Star, Clock, BookOpen,
  Infinity as InfinityIcon, ChevronDown, ChevronUp, Zap,
  Users, Palette, PenTool, Layers, Award, ShoppingCart,
} from "lucide-react";

const HOTMART_URL = "https://pay.hotmart.com/D97908733L?off=7y2xqfjl";
const PROMO_STORAGE_KEY = "carem_illustrator_promo_deadline";
const PROMO_DURATION_MS = 2 * 24 * 60 * 60 * 1000; // 2 días

// ─── Animations ─────────────────────────────────────────────────────────────

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};
const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
};
const vp = { once: true, amount: 0.12 };

// ─── Countdown ───────────────────────────────────────────────────────────────

function getDeadline(): number {
  if (typeof window === "undefined") return Date.now() + PROMO_DURATION_MS;
  const saved = localStorage.getItem(PROMO_STORAGE_KEY);
  if (saved) {
    const d = parseInt(saved, 10);
    if (d > Date.now()) return d;
  }
  const deadline = Date.now() + PROMO_DURATION_MS;
  localStorage.setItem(PROMO_STORAGE_KEY, String(deadline));
  return deadline;
}

function useCountdown() {
  const [timeLeft, setTimeLeft] = useState({ d: 2, h: 0, m: 0, s: 0 });
  const [deadline] = useState<number>(() =>
    typeof window !== "undefined" ? getDeadline() : Date.now() + PROMO_DURATION_MS
  );

  useEffect(() => {
    function tick() {
      const diff = Math.max(0, deadline - Date.now());
      setTimeLeft({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
    }
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [deadline]);

  return timeLeft;
}

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center bg-dark/20 border border-cream/20 px-4 py-3 min-w-[64px]">
      <span className="font-display text-cream text-3xl leading-none uppercase">
        {String(value).padStart(2, "0")}
      </span>
      <span className="text-cream/50 text-[10px] uppercase tracking-[0.2em] mt-1">{label}</span>
    </div>
  );
}

// ─── Data ────────────────────────────────────────────────────────────────────

const MODULES = [
  {
    n: "01", title: "Fundamentos e interfaz",
    videos: 10,
    items: ["Instalación y configuración", "Interfaz y workspace", "Documentos y artboards", "Modos de color (RGB/CMYK)"],
  },
  {
    n: "02", title: "Herramientas esenciales",
    videos: 14,
    items: ["Herramienta Pluma (Pen Tool)", "Formas básicas y avanzadas", "Selección y edición de puntos", "Alinear y distribuir objetos"],
  },
  {
    n: "03", title: "Color y tipografía",
    videos: 12,
    items: ["Rellenos, trazos y gradientes", "Guías de color y muestras", "Tipografía y párrafos", "Estilos y efectos de texto"],
  },
  {
    n: "04", title: "Diseño de logotipos",
    videos: 15,
    items: ["Proceso de conceptualización", "Construcción de logos vectoriales", "Variantes y versiones", "Exportación para todos los usos"],
  },
  {
    n: "05", title: "Ilustración vectorial",
    videos: 16,
    items: ["Íconos y pictogramas", "Personajes y mascotas", "Ilustraciones planas (flat design)", "Sombras y volumen vectorial"],
  },
  {
    n: "06", title: "Branding y aplicaciones",
    videos: 13,
    items: ["Piezas para redes sociales", "Papelería corporativa", "Presentaciones y mockups", "Sistemas de identidad visual"],
  },
  {
    n: "07", title: "Técnicas avanzadas",
    videos: 10,
    items: ["Mallas de degradado (Mesh)", "Patrones y texturas", "Efectos 3D y perspectiva", "Flujos de trabajo profesionales"],
  },
];

const LEARN_ITEMS = [
  { icon: PenTool,  text: "Dominar la herramienta Pluma — la más importante del diseño vectorial" },
  { icon: Palette,  text: "Crear logos, íconos e identidades visuales desde cero" },
  { icon: Layers,   text: "Diseñar piezas para redes sociales, branding y materiales impresos" },
  { icon: Zap,      text: "Ilustración vectorial: personajes, íconos y escenas completas" },
  { icon: Award,    text: "Exportar correctamente para impresión (CMYK) y pantalla (RGB)" },
  { icon: Users,    text: "Flujos de trabajo profesionales usados en agencias reales" },
];

const FOR_WHOM = [
  {
    icon: "🚀",
    title: "Principiantes",
    desc: "Nunca has usado Illustrator o programas de diseño. Empiezas desde cero y llegas a nivel avanzado.",
  },
  {
    icon: "🎨",
    title: "Diseñadores",
    desc: "Ya diseñas pero usas otras herramientas. Quieres dominar el estándar de la industria para el diseño vectorial.",
  },
  {
    icon: "💼",
    title: "Emprendedores",
    desc: "Tienes un negocio y quieres crear tus propios materiales de marca sin depender de un diseñador para cada pieza.",
  },
];

const INCLUDES = [
  { icon: Play,         text: "90 clases en video de alta calidad" },
  { icon: BookOpen,     text: "7 módulos estructurados de menor a mayor dificultad" },
  { icon: InfinityIcon, text: "Acceso de por vida — estudia a tu ritmo" },
  { icon: Clock,        text: "Disponible 24/7 desde cualquier dispositivo" },
  { icon: ShoppingCart, text: "Pago único — sin suscripciones ni cobros ocultos" },
  { icon: Star,         text: "Actualizaciones incluidas sin costo adicional" },
];

// ─── Sections ────────────────────────────────────────────────────────────────

function Hero() {
  const t = useCountdown();
  return (
    <section className="bg-brand overflow-hidden">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 pt-16 pb-20 sm:pb-28">
        <motion.div initial="hidden" animate="visible" variants={stagger}>
          <motion.p variants={fadeUp} className="text-accent text-xs font-semibold tracking-[0.3em] uppercase">
            Curso online · Adobe Illustrator CC
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="font-display text-cream leading-[0.86] uppercase mt-3"
            style={{ fontSize: "clamp(3rem, 10vw, 11rem)" }}
          >
            DOMINA<br />
            <span className="text-accent">ILLUSTRATOR</span><br />
            DE CERO A PRO
          </motion.h1>

          <motion.p variants={fadeUp} className="mt-6 max-w-xl text-cream/70 text-base leading-relaxed">
            El curso más completo de Adobe Illustrator en español. 7 módulos,
            90 videos y cero experiencia previa necesaria. Una sola vez y es tuyo para siempre.
          </motion.p>

          {/* Promo price */}
          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap items-end gap-5">
            <div>
              <p className="text-cream/40 text-xs uppercase tracking-[0.2em]">Precio normal</p>
              <p className="font-display text-cream/40 text-3xl uppercase line-through leading-none mt-1">$140 USD</p>
            </div>
            <div>
              <p className="text-accent text-xs font-bold uppercase tracking-[0.2em]">🔥 Precio promo — 50% OFF</p>
              <p className="font-display text-cream leading-none uppercase mt-1" style={{ fontSize: "clamp(3rem, 8vw, 6rem)" }}>
                $70 USD
              </p>
            </div>
          </motion.div>

          {/* Countdown */}
          <motion.div variants={fadeUp} className="mt-6">
            <p className="text-cream/50 text-xs uppercase tracking-[0.2em] mb-3">⏳ La promo termina en:</p>
            <div className="flex gap-2">
              <CountdownUnit value={t.d} label="días" />
              <CountdownUnit value={t.h} label="horas" />
              <CountdownUnit value={t.m} label="min" />
              <CountdownUnit value={t.s} label="seg" />
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-3">
            <a
              href={HOTMART_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-accent text-cream font-display text-sm px-8 py-4 tracking-[0.12em] uppercase hover:bg-cream hover:text-dark transition-colors"
            >
              Quiero el 50% de descuento <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#contenido"
              className="inline-flex items-center gap-2 border-2 border-cream/30 text-cream font-display text-sm px-8 py-4 tracking-[0.12em] uppercase hover:border-cream transition-colors"
            >
              Ver el contenido
            </a>
          </motion.div>

          {/* Quick stats */}
          <motion.div variants={fadeUp} className="mt-10 flex flex-wrap gap-6">
            {[
              { n: "7", label: "Módulos" },
              { n: "90", label: "Videos" },
              { n: "∞", label: "Acceso" },
              { n: "$0", label: "Xperiencia previa" },
            ].map((s) => (
              <div key={s.label} className="border-l-2 border-accent pl-3">
                <p className="font-display text-cream text-2xl uppercase leading-none">{s.n}</p>
                <p className="text-cream/40 text-xs uppercase tracking-wider mt-0.5">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function LearnSection() {
  return (
    <section className="bg-cream w-full">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-20 sm:py-28">
        <motion.div initial="hidden" whileInView="visible" viewport={vp} variants={stagger}>
          <motion.p variants={fadeUp} className="text-accent text-xs font-semibold tracking-[0.3em] uppercase">
            Lo que aprenderás
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="font-display text-brand leading-[0.88] uppercase mt-2"
            style={{ fontSize: "clamp(2.5rem, 7vw, 7rem)" }}
          >
            DE CERO A <span className="text-accent">PROFESIONAL</span>
          </motion.h2>

          <motion.div
            variants={stagger}
            className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {LEARN_ITEMS.map(({ icon: Icon, text }) => (
              <motion.div
                key={text}
                variants={fadeUp}
                className="flex items-start gap-4 bg-brand/5 border border-brand/10 p-5"
              >
                <div className="h-10 w-10 bg-brand flex items-center justify-center shrink-0">
                  <Icon className="h-5 w-5 text-cream" />
                </div>
                <p className="text-dark/75 text-sm leading-relaxed">{text}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function ForWhom() {
  return (
    <section className="bg-dark w-full">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-20 sm:py-28">
        <motion.div initial="hidden" whileInView="visible" viewport={vp} variants={stagger}>
          <motion.p variants={fadeUp} className="text-accent text-xs font-semibold tracking-[0.3em] uppercase">
            ¿Es para ti?
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="font-display text-cream leading-[0.88] uppercase mt-2"
            style={{ fontSize: "clamp(2.5rem, 7vw, 7rem)" }}
          >
            ESTE CURSO ES <span className="text-accent">IDEAL</span> SI…
          </motion.h2>

          <motion.div
            variants={stagger}
            className="mt-10 grid sm:grid-cols-3 gap-4"
          >
            {FOR_WHOM.map(({ icon, title, desc }) => (
              <motion.div
                key={title}
                variants={fadeUp}
                className="border-2 border-cream/15 p-8 hover:border-accent/50 transition-colors"
              >
                <span className="text-4xl">{icon}</span>
                <p className="font-display text-cream text-xl uppercase mt-4 leading-tight">{title}</p>
                <p className="text-cream/55 text-sm leading-relaxed mt-3">{desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function CourseContent() {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <section id="contenido" className="scroll-mt-16 bg-cream w-full">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-20 sm:py-28">
        <motion.div initial="hidden" whileInView="visible" viewport={vp} variants={stagger}>
          <motion.p variants={fadeUp} className="text-accent text-xs font-semibold tracking-[0.3em] uppercase">
            Temario completo
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="font-display text-brand leading-[0.88] uppercase mt-2"
            style={{ fontSize: "clamp(2.5rem, 7vw, 7rem)" }}
          >
            7 MÓDULOS · <span className="text-accent">90 VIDEOS</span>
          </motion.h2>

          <motion.div variants={stagger} className="mt-10 divide-y-2 divide-dark/10">
            {MODULES.map((mod) => {
              const isOpen = open === mod.n;
              return (
                <motion.div key={mod.n} variants={fadeUp}>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : mod.n)}
                    className="w-full flex items-center justify-between py-5 text-left group"
                  >
                    <div className="flex items-center gap-5">
                      <span className="font-display text-accent/40 text-3xl leading-none group-hover:text-accent transition-colors">
                        {mod.n}
                      </span>
                      <div>
                        <p className="font-display text-dark text-lg uppercase leading-tight group-hover:text-brand transition-colors">
                          {mod.title}
                        </p>
                        <p className="text-dark/40 text-xs mt-0.5">{mod.videos} videos</p>
                      </div>
                    </div>
                    {isOpen
                      ? <ChevronUp className="h-5 w-5 text-accent shrink-0" />
                      : <ChevronDown className="h-5 w-5 text-dark/30 shrink-0" />}
                  </button>
                  {isOpen && (
                    <div className="pb-5 pl-16">
                      <ul className="space-y-2">
                        {mod.items.map((item) => (
                          <li key={item} className="flex items-center gap-2.5 text-sm text-dark/65">
                            <div className="h-4 w-4 bg-brand flex items-center justify-center shrink-0">
                              <Check className="h-2.5 w-2.5 text-cream" />
                            </div>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function Includes() {
  return (
    <section className="bg-brand w-full">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-20 sm:py-28">
        <motion.div initial="hidden" whileInView="visible" viewport={vp} variants={stagger}>
          <motion.p variants={fadeUp} className="text-accent text-xs font-semibold tracking-[0.3em] uppercase">
            Todo lo que incluye
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="font-display text-cream leading-[0.88] uppercase mt-2"
            style={{ fontSize: "clamp(2.5rem, 7vw, 7rem)" }}
          >
            UNA VEZ · <span className="text-accent">PARA SIEMPRE</span>
          </motion.h2>

          <motion.div
            variants={stagger}
            className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {INCLUDES.map(({ icon: Icon, text }) => (
              <motion.div
                key={text}
                variants={fadeUp}
                className="flex items-center gap-4 bg-cream/10 border border-cream/15 px-6 py-5"
              >
                <div className="h-10 w-10 bg-accent flex items-center justify-center shrink-0">
                  <Icon className="h-5 w-5 text-dark" />
                </div>
                <p className="text-cream/80 text-sm leading-snug">{text}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function PromoCTA() {
  const t = useCountdown();
  return (
    <section className="bg-accent w-full">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-24 sm:py-32">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={vp}
          variants={stagger}
          className="flex flex-col items-center text-center gap-8"
        >
          <motion.p variants={fadeUp} className="text-dark/60 text-xs font-semibold tracking-[0.3em] uppercase">
            Oferta por tiempo limitado
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="font-display text-dark leading-[0.88] uppercase"
            style={{ fontSize: "clamp(2.8rem, 9vw, 11rem)" }}
          >
            50% OFF<br />
            HOY <span className="text-cream">$70 USD</span>
          </motion.h2>

          <motion.div variants={fadeUp}>
            <p className="text-dark/60 text-xs uppercase tracking-[0.2em] mb-3">⏳ La promo termina en:</p>
            <div className="flex gap-2 justify-center">
              <CountdownUnit value={t.d} label="días" />
              <CountdownUnit value={t.h} label="horas" />
              <CountdownUnit value={t.m} label="min" />
              <CountdownUnit value={t.s} label="seg" />
            </div>
          </motion.div>

          <motion.a
            variants={fadeUp}
            href={HOTMART_URL}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-3 bg-dark text-cream font-display text-base px-10 py-5 tracking-[0.12em] uppercase hover:bg-brand transition-colors shadow-2xl"
          >
            <ShoppingCart className="h-5 w-5" />
            Comprar por $70 USD — 50% OFF
            <ArrowRight className="h-5 w-5" />
          </motion.a>

          <motion.p variants={fadeUp} className="text-dark/50 text-xs">
            Pago seguro · Acceso inmediato · Garantía de 7 días de Hotmart
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function IllustratorCoursePage() {
  return (
    <>
      <Hero />
      <LearnSection />
      <ForWhom />
      <CourseContent />
      <Includes />
      <PromoCTA />
    </>
  );
}
