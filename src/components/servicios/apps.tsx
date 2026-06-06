"use client";

import { useState } from "react";
import { motion, type Variants } from "framer-motion";
import {
  ArrowRight, Check, ChevronDown, ChevronUp, Clock,
  Smartphone, Globe, Monitor, RefreshCw, ShoppingBag, Brain,
  Layout, Palette, Code, Shield, Server, Zap,
  TrendingUp, Users, Database, GitBranch, Layers,
  Rocket, MessageCircle, CalendarCheck, Lock,
} from "lucide-react";
import Link from "next/link";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";

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
            Apps web y móviles — De la idea al lanzamiento
          </motion.p>
          <motion.h1
            variants={fadeUp}
            className="font-display text-cream leading-[0.86] uppercase mt-3"
            style={{ fontSize: "clamp(2.8rem, 7.5vw, 9.5rem)" }}
          >
            CONVERTIMOS{" "}
            <span className="text-brand">IDEAS</span>{" "}
            EN APPS QUE{" "}
            <span className="text-accent">FUNCIONAN</span>
          </motion.h1>
          <motion.p variants={fadeUp} className="mt-6 max-w-xl text-cream/65 text-base leading-relaxed">
            Diseñamos y desarrollamos aplicaciones web y móviles a la medida — rápidas,
            escalables y centradas en el usuario. De la idea inicial al lanzamiento en
            App Store, Google Play y la web.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap items-center gap-3">
            <WhatsAppButton
              message="Hola 👋 Quiero información sobre el desarrollo de mi app."
              label="Quiero desarrollar mi app"
            />
            <Link
              href="/#contacto"
              className="inline-flex items-center gap-2 border-2 border-cream/30 text-cream font-display text-xs px-6 py-3 tracking-[0.12em] uppercase hover:border-cream transition-colors"
            >
              <CalendarCheck className="h-3.5 w-3.5" /> Consultoría gratuita
            </Link>
            <span className="flex items-center gap-1.5 text-cream/35 text-xs">
              <Clock className="h-3.5 w-3.5" />
              3–8 meses · Desde $3,000 USD
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Why Invest ──────────────────────────────────────────────────────────────

const WHY_ITEMS = [
  { icon: TrendingUp, text: "Escala tu operación sin multiplicar tu equipo." },
  { icon: Zap,        text: "Automatiza procesos que hoy haces manualmente." },
  { icon: Database,   text: "Genera nuevas fuentes de ingresos: suscripciones, pagos in-app, comisiones." },
  { icon: Users,      text: "Mejora la experiencia de tus clientes y empleados." },
  { icon: Brain,      text: "Recopila datos valiosos para tomar mejores decisiones." },
  { icon: Rocket,     text: "Diferénciate de competidores que trabajan con métodos tradicionales." },
];

function WhyInvest() {
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
            <p className="text-accent text-xs font-semibold tracking-[0.3em] uppercase">¿Por qué invertir?</p>
            <h2
              className="font-display text-brand leading-[0.88] uppercase mt-2"
              style={{ fontSize: "clamp(2.5rem, 7vw, 7rem)" }}
            >
              UNA APP{" "}<span className="text-accent">CAMBIA</span>{" "}TU NEGOCIO
            </h2>
            <p className="mt-6 text-dark/60 text-sm leading-relaxed">
              Una app no es un lujo: es una{" "}
              <span className="font-semibold text-dark/80">herramienta estratégica</span>.
              Uber, Airbnb, Rappi y Nubank no son empresas con apps —
              son apps que se convirtieron en empresas.
            </p>
            <div className="mt-5 border-l-4 border-brand pl-4 py-2">
              <p className="text-dark/55 text-sm leading-relaxed italic">
                Cada proceso manual que automatizas hoy es dinero que dejas de perder mañana.
              </p>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="space-y-2.5">
            {WHY_ITEMS.map(({ icon: Icon, text }, i) => (
              <div key={i} className="flex items-center gap-4 bg-brand/5 px-4 py-3">
                <div className="h-8 w-8 bg-brand flex items-center justify-center shrink-0">
                  <Icon className="h-4 w-4 text-cream" />
                </div>
                <p className="text-dark/75 text-sm leading-relaxed">{text}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── App Types ───────────────────────────────────────────────────────────────

const TYPES = [
  { icon: Globe,       title: "Aplicaciones Web (SaaS)",       desc: "Software desde el navegador, sin instalación. Plataformas de gestión, dashboards, marketplaces, intranets." },
  { icon: Smartphone,  title: "Apps Móviles Nativas",           desc: "iOS (Swift) y Android (Kotlin) con máximo rendimiento y acceso total a las funciones del dispositivo." },
  { icon: RefreshCw,   title: "Apps Híbridas / Multiplataforma", desc: "React Native o Flutter: una base de código para iOS y Android. Más rápido y económico sin sacrificar calidad." },
  { icon: Monitor,     title: "Aplicaciones de Escritorio",     desc: "Software para Windows, Mac o Linux cuando tu operación lo requiere." },
  { icon: Layers,      title: "Sistemas a la Medida",           desc: "ERPs, CRMs, plataformas de reservas, gestores internos y paneles administrativos." },
  { icon: ShoppingBag, title: "Marketplaces Multi-usuario",     desc: "Plataformas que conectan oferta y demanda con múltiples roles: clientes, vendedores, administradores." },
  { icon: Brain,       title: "Apps con IA e Integraciones",    desc: "IA, machine learning, APIs de terceros, pasarelas de pago, geolocalización y mucho más." },
];

function AppTypes() {
  return (
    <section id="tipos" className="scroll-mt-16 bg-brand w-full">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-20 sm:py-28">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <p className="text-accent text-xs font-semibold tracking-[0.3em] uppercase">Tipos de proyecto</p>
          <h2
            className="font-display text-cream leading-[0.88] uppercase mt-2"
            style={{ fontSize: "clamp(2.5rem, 7vw, 7rem)" }}
          >
            QUÉ{" "}<span className="text-accent">DESARROLLAMOS</span>
          </h2>
        </motion.div>

        <motion.div
          className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
        >
          {TYPES.map(({ icon: Icon, title, desc }, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="bg-cream/10 border border-cream/15 p-6 flex flex-col gap-4"
            >
              <div className="h-11 w-11 bg-accent flex items-center justify-center shrink-0">
                <Icon className="h-5 w-5 text-dark" />
              </div>
              <p className="font-display text-cream text-base uppercase leading-none">{title}</p>
              <p className="text-cream/60 text-sm leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── For You ─────────────────────────────────────────────────────────────────

const IDEAL_FOR = [
  { icon: "💡", text: "Tienes una idea de app y necesitas convertirla en realidad con el equipo correcto." },
  { icon: "🚀", text: "Quieres lanzar un MVP validado al mercado lo antes posible." },
  { icon: "🏢", text: "Tu empresa necesita software interno a la medida: gestión, operaciones, ventas." },
  { icon: "🔄", text: "Tus procesos actuales son manuales, lentos o con demasiados errores." },
  { icon: "📲", text: "Quieres ofrecer una mejor experiencia a tus clientes a través de una app propia." },
  { icon: "📈", text: "Tu negocio creció y las herramientas genéricas ya no te alcanzan." },
  { icon: "💼", text: "Buscas un equipo técnico y estratégico que te acompañe a largo plazo." },
];

function ForYou() {
  return (
    <section className="bg-vivid w-full">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-20 sm:py-28">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <p className="text-cream/60 text-xs font-semibold tracking-[0.3em] uppercase">¿Es para ti?</p>
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
    title: "Estrategia y Producto",
    items: ["Definición de MVP", "Investigación de usuario", "Análisis de competencia", "Roadmap de fases", "KPIs y métricas de éxito"],
  },
  {
    icon: Layout,
    color: "bg-accent",
    title: "UX / Diseño UI",
    items: ["Wireframes y flujos de usuario", "Prototipo navegable en Figma", "Design System escalable", "Animaciones y microinteracciones", "Pruebas de usabilidad"],
  },
  {
    icon: Code,
    color: "bg-brand",
    title: "Desarrollo Full Stack",
    items: ["Frontend moderno (React, Next.js, Vue)", "Backend robusto (Node.js, Python, Laravel)", "Apps móviles (React Native, Flutter)", "APIs RESTful o GraphQL", "Bases de datos optimizadas"],
  },
  {
    icon: Shield,
    color: "bg-dark",
    title: "Seguridad e Infraestructura",
    items: ["Autenticación JWT / OAuth 2.0", "Cifrado de datos en tránsito y reposo", "Despliegue en la nube (AWS, GCP, Azure)", "CI/CD y escalabilidad automática", "Backups y monitoreo continuo"],
  },
];

const ALSO_INCLUDES = [
  "Pasarelas de pago (Stripe, PayU, Mercado Pago)",
  "Notificaciones push y email",
  "Login social (Google, Apple, Facebook)",
  "Geolocalización y mapas",
  "Integraciones con IA (OpenAI, Claude)",
  "Publicación en App Store y Google Play",
  "Documentación técnica completa",
  "Capacitación a tu equipo",
];

function Deliverables() {
  return (
    <section id="entregables" className="scroll-mt-16 bg-cream w-full">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-20 sm:py-28">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <p className="text-accent text-xs font-semibold tracking-[0.3em] uppercase">Entregables</p>
          <h2
            className="font-display text-brand leading-[0.88] uppercase mt-2"
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
            <motion.div key={i} variants={fadeUp} className="border-2 border-brand/10 p-7 flex flex-col gap-5">
              <div className={`h-12 w-12 ${color} flex items-center justify-center text-cream`}>
                <Icon className="h-6 w-6" />
              </div>
              <p className="font-display text-brand text-base uppercase tracking-wide leading-none">{title}</p>
              <ul className="space-y-2.5">
                {items.map((item, j) => (
                  <li key={j} className="flex items-start gap-2.5 text-sm text-dark/60">
                    <div className="h-4 w-4 bg-brand flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="h-2.5 w-2.5 text-cream" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-6 bg-brand/5 border border-brand/10 p-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <p className="font-display text-brand text-sm uppercase tracking-[0.2em] mb-5">
            ➕ También incluye
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {ALSO_INCLUDES.map((e, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-dark/65">
                <div className="h-4 w-4 bg-accent flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="h-2.5 w-2.5 text-dark" />
                </div>
                {e}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Process ─────────────────────────────────────────────────────────────────

const PHASES = [
  { n: "01", icon: Brain,       time: "2–3 sem.",  title: "Descubrimiento",       deliverable: "Documento estratégico + roadmap",   desc: "Reuniones de inmersión, análisis del mercado, definición de MVP y KPIs, validación de la idea." },
  { n: "02", icon: Layout,      time: "3–5 sem.",  title: "Diseño UX/UI",         deliverable: "Prototipo en Figma + Design System", desc: "Wireframes, prototipo navegable, diseño visual completo y sistema de diseño escalable." },
  { n: "03", icon: Server,      time: "1–2 sem.",  title: "Arquitectura Técnica",  deliverable: "Documento técnico + arquitectura",  desc: "Stack tecnológico, diseño de base de datos, APIs, plan de seguridad e infraestructura." },
  { n: "04", icon: GitBranch,   time: "8–20 sem.", title: "Desarrollo Ágil",       deliverable: "Versiones funcionales en cada sprint", desc: "Sprints de 1–2 semanas con demos semanales. Tablero en tiempo real para que veas el avance." },
  { n: "05", icon: Zap,         time: "2–3 sem.",  title: "Pruebas y QA",          deliverable: "App estable lista para lanzar",    desc: "Pruebas funcionales, de carga, seguridad y en múltiples dispositivos. Corrección de bugs." },
  { n: "06", icon: Rocket,      time: "1–2 sem.",  title: "Lanzamiento",           deliverable: "App en producción + accesos",      desc: "Publicación en App Store y Google Play, despliegue web, analítica y capacitación." },
  { n: "07", icon: RefreshCw,   time: "Continuo",  title: "Soporte y Evolución",   deliverable: "Planes de mantenimiento",          desc: "Garantía post-lanzamiento, mantenimiento mensual y desarrollo de nuevas funcionalidades." },
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
          <p className="text-accent text-xs font-semibold tracking-[0.3em] uppercase">Metodología ágil</p>
          <h2
            className="font-display text-cream leading-[0.88] uppercase mt-2"
            style={{ fontSize: "clamp(2.5rem, 7vw, 7rem)" }}
          >
            EL{" "}<span className="text-brand">PROCESO</span>
          </h2>
          <p className="mt-4 text-cream/45 text-sm max-w-lg">
            Tiempo total estimado:{" "}
            <span className="text-accent font-semibold">3 a 8 meses</span>{" "}
            según el alcance del proyecto.
          </p>
        </motion.div>

        <motion.div
          className="mt-12 space-y-px"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
        >
          {PHASES.map(({ n, icon: Icon, time, title, deliverable, desc }, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="grid grid-cols-[auto_1fr_1fr] gap-6 bg-cream/5 border border-cream/5 px-6 py-5 hover:bg-cream/[0.07] transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 bg-brand flex items-center justify-center shrink-0">
                  <Icon className="h-5 w-5 text-cream" />
                </div>
                <span className="font-display text-cream/20 text-3xl uppercase leading-none w-10">{n}</span>
              </div>
              <div>
                <p className="text-accent text-xs font-semibold uppercase tracking-[0.15em]">{time}</p>
                <p className="font-display text-cream text-base uppercase leading-tight mt-0.5">{title}</p>
                <p className="text-cream/45 text-xs leading-relaxed mt-1">{desc}</p>
              </div>
              <div className="hidden md:flex items-center">
                <div className="border border-brand/30 px-4 py-2">
                  <p className="text-brand/80 text-xs">📌 {deliverable}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── Tech Stack ───────────────────────────────────────────────────────────────

const STACK = [
  { area: "Frontend Web",   techs: ["React", "Next.js", "Vue", "TypeScript"] },
  { area: "Backend",        techs: ["Node.js", "Python", "Laravel", ".NET"] },
  { area: "Móvil",          techs: ["React Native", "Flutter", "Swift", "Kotlin"] },
  { area: "Bases de Datos", techs: ["PostgreSQL", "MySQL", "MongoDB", "Firebase"] },
  { area: "Cloud / DevOps", techs: ["AWS", "Google Cloud", "Docker", "Vercel"] },
  { area: "Diseño",         techs: ["Figma", "Adobe XD"] },
];

function TechStack() {
  return (
    <section className="bg-brand w-full">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-20 sm:py-28">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <p className="text-accent text-xs font-semibold tracking-[0.3em] uppercase">Tecnología</p>
          <h2
            className="font-display text-cream leading-[0.88] uppercase mt-2"
            style={{ fontSize: "clamp(2.5rem, 7vw, 7rem)" }}
          >
            NUESTRO{" "}<span className="text-accent">STACK</span>
          </h2>
          <p className="mt-4 text-cream/55 text-sm max-w-md leading-relaxed">
            Tecnologías modernas, robustas y respaldadas por la industria.
            Elegimos el stack según las necesidades reales de tu proyecto.
          </p>
        </motion.div>

        <motion.div
          className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
        >
          {STACK.map(({ area, techs }, i) => (
            <motion.div key={i} variants={fadeUp} className="bg-cream/10 border border-cream/15 p-6">
              <p className="text-accent text-xs font-semibold uppercase tracking-[0.2em] mb-4">{area}</p>
              <div className="flex flex-wrap gap-2">
                {techs.map((t, j) => (
                  <span
                    key={j}
                    className="font-display text-cream text-sm uppercase tracking-wide bg-cream/10 px-3 py-1"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── Why Us ──────────────────────────────────────────────────────────────────

const PROS = [
  "Equipo estratégico + técnico integrado",
  "Metodología ágil con avances visibles semana a semana",
  "Código limpio, documentado y 100% tuyo",
  "Diseño UX centrado en el usuario real",
  "Foco en MVP y validación antes de construir todo",
  "Acompañamiento real post-lanzamiento",
  "Comunicación clara y constante sin silencios",
];
const CONS = [
  "Solo programadores sin visión de negocio",
  '"Te entregamos en 3 meses, confía"',
  "Código indescifrable que te ata al proveedor",
  "Apps difíciles de usar que nadie entiende",
  "Construir 6 meses para ver si funciona",
  "Desaparecer cuando se entrega",
  "Reportes confusos o silencio largo",
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
                <li key={i} className="flex items-start gap-3">
                  <div className="h-5 w-5 bg-accent flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="h-3 w-3 text-dark" />
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
                <li key={i} className="flex items-start gap-3">
                  <div className="h-5 w-5 bg-cream/15 flex items-center justify-center shrink-0 mt-0.5">
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

// ─── Use Cases ────────────────────────────────────────────────────────────────

const USE_CASES = [
  { icon: "🛵", text: "Apps de delivery y logística con geolocalización en tiempo real." },
  { icon: "🏥", text: "Plataformas médicas de citas, telemedicina e historias clínicas." },
  { icon: "🛒", text: "Marketplaces con múltiples vendedores y pagos automáticos." },
  { icon: "🎓", text: "Plataformas educativas con cursos, membresías y certificados." },
  { icon: "💼", text: "Software empresarial: CRMs, ERPs y gestores internos a la medida." },
  { icon: "💳", text: "Apps fintech con pagos, billeteras digitales y transferencias." },
  { icon: "🏋️", text: "Apps de fitness y bienestar con planes y seguimiento personalizados." },
  { icon: "🤝", text: "Plataformas de reservas y gestión de citas para negocios de servicio." },
  { icon: "🤖", text: "Apps con IA integrada para automatización y análisis inteligente." },
];

function UseCases() {
  return (
    <section className="bg-cream w-full">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-20 sm:py-28">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <p className="text-accent text-xs font-semibold tracking-[0.3em] uppercase">Casos de uso</p>
          <h2
            className="font-display text-brand leading-[0.88] uppercase mt-2"
            style={{ fontSize: "clamp(2.5rem, 7vw, 7rem)" }}
          >
            LO QUE{" "}<span className="text-accent">HEMOS</span>{" "}RESUELTO
          </h2>
        </motion.div>

        <motion.div
          className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
        >
          {USE_CASES.map((item, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="flex gap-4 items-start bg-brand/5 border border-brand/10 p-5"
            >
              <span className="text-2xl shrink-0">{item.icon}</span>
              <p className="text-dark/70 text-sm leading-relaxed">{item.text}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── Pricing ─────────────────────────────────────────────────────────────────

const PLANS = [
  {
    name: "MVP Simple",
    price: "$3.000",
    time: "3–4 meses",
    note: "Web o móvil",
    features: ["1 plataforma (web o móvil)", "Funcionalidades core del MVP", "Diseño UX/UI incluido", "Publicación básica", "30 días de garantía"],
    accent: "bg-brand",
  },
  {
    name: "App Completa",
    price: "$8.000",
    time: "4–6 meses",
    note: "Web + iOS + Android",
    features: ["Multiplataforma (web + móvil)", "Integración de pagos y autenticación", "Panel de administración", "Analytics y notificaciones push", "60 días de garantía"],
    accent: "bg-vivid",
    featured: true,
  },
  {
    name: "Plataforma / SaaS",
    price: "$15.000",
    time: "6–8 meses",
    note: "Proyecto a la medida",
    features: ["Arquitectura escalable", "Multi-usuario y roles", "Integraciones avanzadas + IA", "DevOps y CI/CD completo", "Soporte extendido"],
    accent: "bg-accent",
  },
];

function Pricing() {
  return (
    <section id="inversion" className="scroll-mt-16 bg-dark w-full">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-20 sm:py-28">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <p className="text-accent text-xs font-semibold tracking-[0.3em] uppercase">Inversión</p>
          <h2
            className="font-display text-cream leading-[0.88] uppercase mt-2"
            style={{ fontSize: "clamp(2.5rem, 7vw, 7rem)" }}
          >
            PLANES{" "}<span className="text-brand">DESDE</span>
          </h2>
          <p className="mt-4 text-cream/50 text-sm max-w-lg leading-relaxed">
            Todas las cotizaciones son personalizadas tras una consultoría inicial gratuita.
            Trabajamos con pagos por fases — nunca pagos de todo adelantado.
          </p>
        </motion.div>

        <motion.div
          className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
        >
          {PLANS.map(({ name, price, time, note, features, accent, featured }, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className={`flex flex-col ${featured ? "border-2 border-brand" : "border border-cream/10"} bg-cream/5`}
            >
              {featured && (
                <div className="bg-brand px-4 py-1.5 text-center">
                  <p className="text-cream text-xs font-semibold uppercase tracking-[0.2em]">Más solicitado</p>
                </div>
              )}
              <div className="p-8 flex flex-col gap-5 flex-1">
                <div>
                  <p className="text-cream/40 text-xs uppercase tracking-[0.2em]">{name}</p>
                  <p
                    className="font-display text-cream uppercase leading-none mt-1"
                    style={{ fontSize: "clamp(2.5rem, 5vw, 5rem)" }}
                  >
                    {price}
                  </p>
                  <p className="text-accent font-semibold text-xs tracking-widest mt-0.5">USD / desde</p>
                </div>
                <div className="text-cream/40 text-xs border-t border-cream/10 pt-3 space-y-0.5">
                  <p>Plazo: <span className="text-cream/60 font-semibold">{time}</span></p>
                  <p>{note}</p>
                </div>
                <ul className="space-y-2.5 flex-1">
                  {features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2.5 text-sm text-cream/65">
                      <div className={`h-4 w-4 ${accent} flex items-center justify-center shrink-0`}>
                        <Check className="h-2.5 w-2.5 text-cream" />
                      </div>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/#contacto"
                  className={`mt-2 flex items-center justify-center gap-2 w-full font-display text-xs px-6 py-3 tracking-[0.15em] uppercase transition-colors ${
                    featured
                      ? "bg-brand text-cream hover:bg-accent hover:text-dark"
                      : "border border-cream/20 text-cream hover:bg-brand hover:border-brand"
                  }`}
                >
                  Cotizar este plan <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-6 flex items-center gap-4 bg-cream/5 border border-cream/10 px-6 py-4"
        >
          <Lock className="h-5 w-5 text-accent shrink-0" />
          <p className="text-cream/50 text-sm">
            Firmamos <span className="text-cream/70 font-semibold">NDA</span> antes de cualquier conversación sobre tu proyecto.
            Toda información es 100% confidencial.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

// ─── FAQ ─────────────────────────────────────────────────────────────────────

const FAQS = [
  { q: "¿Cuánto tarda desarrollar una app?", a: "Un MVP simple puede estar listo en 3-4 meses. Una app más compleja puede tomar 6-8 meses o más. La clave está en definir bien el alcance desde el inicio." },
  { q: "¿Es mejor app nativa o híbrida?", a: "Depende del proyecto. Las híbridas (React Native/Flutter) reducen tiempos y costos. Las nativas se justifican cuando el rendimiento o funciones avanzadas específicas del dispositivo lo requieren. Te asesoramos según tu caso." },
  { q: "¿El código es mío?", a: "Sí, el 100% del código es tuyo. Te entregamos todos los repositorios y la documentación completa. No te encadenamos al proveedor." },
  { q: "¿Cómo manejan los pagos del proyecto?", a: "Trabajamos con pagos por hitos o fases: un porcentaje al inicio y el resto contra entregables a lo largo del proyecto. Nunca pedimos todo por adelantado." },
  { q: "¿Pueden trabajar con mi equipo técnico interno?", a: "Sí. Podemos complementar a tu equipo, trabajar de forma colaborativa o integrarnos a tus procesos y herramientas existentes." },
  { q: "¿Qué pasa si necesito cambios durante el desarrollo?", a: "La metodología ágil está pensada exactamente para eso. Los cambios menores se integran en cada sprint. Los cambios mayores se evalúan en alcance y costo de forma transparente." },
  { q: "¿Publican la app en App Store y Google Play?", a: "Sí, nos encargamos del proceso completo de publicación, incluyendo configuración de cuentas de desarrollador, fichas de la app, capturas de pantalla y gestión de las aprobaciones." },
  { q: "¿Trabajan con startups o solo con empresas?", a: "Con ambas. Tenemos experiencia lanzando MVPs para startups en etapa temprana y digitalizando operaciones de empresas consolidadas." },
  { q: "¿Firman NDA?", a: "Por supuesto. Firmamos acuerdo de confidencialidad (NDA) antes de cualquier conversación profunda sobre tu proyecto." },
  { q: "¿Pueden integrar IA en mi app?", a: "Sí. Integramos modelos como OpenAI, Claude y otros para chatbots, automatizaciones, análisis de datos, recomendaciones personalizadas y más." },
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
                  : <ChevronDown className="h-4 w-4 text-brand/30 shrink-0" />}
              </button>
              {open === i && (
                <div className="bg-brand/5 px-6 py-4 border-t border-brand/10">
                  <p className="text-dark/60 text-sm leading-relaxed">{faq.a}</p>
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
            TU IDEA{" "}
            <span className="text-brand">MERECE</span>{" "}
            EJECUTARSE BIEN
          </motion.h2>
          <motion.p variants={fadeUp} className="text-cream/55 text-base max-w-sm leading-relaxed">
            Consultoría estratégica gratuita de 45 minutos. Analizamos tu idea,
            te damos recomendaciones técnicas y una estimación sin compromiso.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-3">
            <WhatsAppButton
              message="Hola 👋 Quiero información sobre el desarrollo de mi app."
              label="Escríbenos por WhatsApp"
              className="px-8 py-4 text-sm tracking-[0.15em]"
            />
            <Link
              href="/#contacto"
              className="inline-flex items-center gap-2 border-2 border-cream/20 text-cream font-display text-sm px-8 py-4 tracking-[0.15em] uppercase hover:border-cream transition-colors"
            >
              <CalendarCheck className="h-4 w-4" /> Agendar por correo
            </Link>
          </motion.div>
          <motion.p variants={fadeUp} className="text-cream/25 text-xs">
            🔒 Toda conversación es 100% confidencial · Firmamos NDA si lo necesitas
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Page export ─────────────────────────────────────────────────────────────

export function AppsServicePage() {
  return (
    <>
      <Hero />
      <WhyInvest />
      <AppTypes />
      <ForYou />
      <Deliverables />
      <Process />
      <TechStack />
      <WhyUs />
      <UseCases />
      <Pricing />
      <FAQ />
      <FinalCTA />
    </>
  );
}
