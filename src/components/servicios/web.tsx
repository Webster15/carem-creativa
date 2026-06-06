"use client";

import { useState } from "react";
import { motion, type Variants } from "framer-motion";
import {
  ArrowRight, Check, ChevronDown, ChevronUp, Clock,
  Globe, FileText, ShoppingCart, BookOpen, GraduationCap, RefreshCw,
  Palette, Code, Smartphone, Zap, Search, Shield, Wrench,
  Layout, Users, MessageCircle, CalendarCheck,
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
    <section className="bg-accent overflow-hidden">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 pt-16 pb-20 sm:pb-28">
        <motion.div initial="hidden" animate="visible" variants={stagger}>
          <motion.p variants={fadeUp} className="text-dark/55 text-xs font-semibold tracking-[0.3em] uppercase">
            Páginas web — WordPress & WooCommerce
          </motion.p>
          <motion.h1
            variants={fadeUp}
            className="font-display text-dark leading-[0.86] uppercase mt-3"
            style={{ fontSize: "clamp(2.8rem, 7.5vw, 9.5rem)" }}
          >
            TU WEB TRABAJA{" "}
            <span className="text-cream">24/7</span>{" "}
            SIN DESCANSO
          </motion.h1>
          <motion.p variants={fadeUp} className="mt-6 max-w-xl text-dark/65 text-base leading-relaxed">
            Diseñamos y desarrollamos páginas web y tiendas virtuales en WordPress
            que no solo se ven increíbles, sino que convierten visitantes en clientes.
            Rápidas, optimizadas, autoadministrables y pensadas para crecer contigo.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap items-center gap-3">
            <WhatsAppButton
              message="Hola 👋 Quiero información sobre el diseño de mi página web."
              label="Quiero mi página web"
            />
            <Link
              href="#proceso"
              className="inline-flex items-center gap-2 border-2 border-dark/30 text-dark font-display text-xs px-6 py-3 tracking-[0.12em] uppercase hover:border-dark transition-colors"
            >
              Ver proceso
            </Link>
            <span className="flex items-center gap-1.5 text-dark/45 text-xs">
              <Clock className="h-3.5 w-3.5" />
              6–10 semanas · Desde $900 USD
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── What Is ─────────────────────────────────────────────────────────────────

const WHAT_ITEMS = [
  "Reflejar la esencia y profesionalismo de tu marca.",
  "Convertir visitantes en clientes, leads o ventas.",
  "Ser rápida, segura y optimizada para Google (SEO).",
  "Funcionar perfecto en móvil, tablet y escritorio.",
  "Ser autoadministrable: actualizas tú mismo sin saber código.",
  "Escalar contigo a medida que tu negocio crezca.",
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
              DISEÑO{" "}<span className="text-accent">ESTRATÉGICO</span>
            </h2>
            <p className="mt-6 text-dark/60 text-sm leading-relaxed">
              No solo "armamos una página". Diseñamos una herramienta estratégica sobre
              WordPress — el sistema más usado del mundo, que impulsa el{" "}
              <span className="font-semibold text-dark/80">43% de internet</span> —
              pensada para hacer crecer tu negocio.
            </p>
            <div className="mt-5 border-l-4 border-accent pl-4 py-2">
              <p className="text-dark/55 text-sm leading-relaxed italic">
                Con WordPress el sitio es 100% tuyo: sin cuotas a plataformas cerradas, con control total.
              </p>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="space-y-2.5">
            <p className="text-dark/40 text-xs uppercase tracking-[0.2em] font-semibold mb-4">
              Tu sitio estará diseñado para:
            </p>
            {WHAT_ITEMS.map((f, i) => (
              <div key={i} className="flex items-start gap-3 bg-brand/5 px-4 py-3">
                <div className="h-5 w-5 bg-brand flex items-center justify-center shrink-0 mt-0.5">
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

// ─── Project Types ─────────────────────────────────────────────────────────────

const TYPES = [
  {
    icon: Globe,
    title: "Sitio Web Corporativo",
    desc: "Para empresas, profesionales y servicios que necesitan presencia digital sólida y creíble.",
  },
  {
    icon: FileText,
    title: "Landing Page",
    desc: "Páginas enfocadas en una sola conversión: vender un producto, captar leads o promocionar un evento.",
  },
  {
    icon: ShoppingCart,
    title: "Tienda Virtual",
    desc: "E-commerce completo con WooCommerce: catálogo, carrito, pasarelas de pago y panel admin.",
  },
  {
    icon: BookOpen,
    title: "Blog y Sitio de Contenido",
    desc: "Plataformas optimizadas para SEO y publicación constante. Posiciónate como referente.",
  },
  {
    icon: GraduationCap,
    title: "Membresía y Cursos Online",
    desc: "Áreas privadas, suscripciones, contenido protegido y plataformas de aprendizaje.",
  },
  {
    icon: RefreshCw,
    title: "Rediseño y Migración",
    desc: "¿Tu sitio está obsoleto o lento? Lo rediseñamos o migramos a WordPress conservando tu SEO.",
  },
];

function ProjectTypes() {
  return (
    <section id="tipos" className="scroll-mt-16 bg-dark w-full">
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
            QUÉ{" "}<span className="text-accent">HACEMOS</span>
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
              className="bg-cream/5 border border-cream/10 p-7 flex flex-col gap-4"
            >
              <div className="h-11 w-11 bg-accent flex items-center justify-center shrink-0">
                <Icon className="h-5 w-5 text-dark" />
              </div>
              <p className="font-display text-cream text-base uppercase leading-none">{title}</p>
              <p className="text-cream/55 text-sm leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── For You ─────────────────────────────────────────────────────────────────

const IDEAL_FOR = [
  { icon: "🚀", text: "Estás lanzando tu negocio y necesitas presencia digital profesional desde el día uno." },
  { icon: "😬", text: "Tu sitio actual da vergüenza, está lento o no se ve bien en celular." },
  { icon: "💰", text: "Quieres vender online con una tienda virtual robusta y bien configurada." },
  { icon: "📈", text: "Te llegan visitas pero nadie compra ni te contacta — problema de conversión." },
  { icon: "🛠️", text: "Necesitas un sitio fácil de actualizar sin depender de un desarrollador para cada cambio." },
  { icon: "🌎", text: "Quieres aparecer en Google y atraer tráfico orgánico sin pagar publicidad." },
  { icon: "💼", text: "Tu marca creció y necesitas un sitio a la altura de tu nuevo nivel." },
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
    icon: Palette,
    color: "bg-accent",
    title: "Diseño UX/UI",
    items: [
      "Wireframes y mockups previos al desarrollo",
      "Diseño personalizado a tu identidad de marca",
      "Centrado en conversión",
      "100% responsive (móvil, tablet, desktop)",
    ],
  },
  {
    icon: Code,
    color: "bg-brand",
    title: "Desarrollo WordPress",
    items: [
      "Instalación y configuración profesional",
      "Desarrollo limpio y optimizado",
      "Plugins necesarios integrados",
      "Velocidad +80/100 en PageSpeed",
    ],
  },
  {
    icon: Search,
    color: "bg-vivid",
    title: "SEO y Seguridad",
    items: [
      "SEO on-page: meta tags, URLs, sitemap",
      "Google Analytics + Search Console",
      "Certificado SSL (https://)",
      "Backups automáticos y plugin de seguridad",
    ],
  },
  {
    icon: ShoppingCart,
    color: "bg-dark",
    title: "E-commerce (si aplica)",
    items: [
      "Catálogo con variantes y categorías",
      "PayU, Mercado Pago, Stripe, PayPal",
      "Configuración de envíos e impuestos",
      "Cupones, notificaciones y panel admin",
    ],
  },
];

const EXTRAS = [
  "Formularios de contacto inteligentes",
  "Integración con WhatsApp",
  "Email marketing (Mailchimp, MailerLite)",
  "Reservas y citas online",
  "Multi-idioma",
  "Áreas privadas / membresías",
  "Blog optimizado para SEO",
  "Integración con CRM",
];

function Deliverables() {
  return (
    <section id="que-incluye" className="scroll-mt-16 bg-cream w-full">
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
                    <div className="h-4 w-4 bg-accent flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="h-2.5 w-2.5 text-dark" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Extras */}
        <motion.div
          className="mt-8 bg-brand/5 border border-brand/10 p-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <p className="font-display text-brand text-sm uppercase tracking-[0.2em] mb-6">
            ➕ Funcionalidades adicionales según el proyecto
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {EXTRAS.map((e, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-dark/65">
                <div className="h-4 w-4 bg-brand flex items-center justify-center shrink-0">
                  <Check className="h-2.5 w-2.5 text-cream" />
                </div>
                {e}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Also included */}
        <motion.div
          className="mt-4 grid md:grid-cols-2 gap-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
        >
          <motion.div variants={fadeUp} className="flex gap-5 bg-brand p-7 items-start">
            <div className="h-12 w-12 bg-accent flex items-center justify-center shrink-0">
              <GraduationCap className="h-6 w-6 text-dark" />
            </div>
            <div>
              <p className="font-display text-cream text-base uppercase">Capacitación incluida</p>
              <p className="mt-2 text-cream/60 text-sm leading-relaxed">
                Sesión de entrenamiento para que administres tu sitio de forma autónoma.
                Manual en PDF o video tutoriales personalizados.
              </p>
            </div>
          </motion.div>
          <motion.div variants={fadeUp} className="flex gap-5 bg-brand p-7 items-start">
            <div className="h-12 w-12 bg-accent flex items-center justify-center shrink-0">
              <Wrench className="h-6 w-6 text-dark" />
            </div>
            <div>
              <p className="font-display text-cream text-base uppercase">30 días de soporte</p>
              <p className="mt-2 text-cream/60 text-sm leading-relaxed">
                Soporte gratuito post-lanzamiento para resolver dudas y ajustes menores.
                Planes de mantenimiento mensual disponibles.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Process ─────────────────────────────────────────────────────────────────

const PHASES = [
  { n: "01", icon: Search,         week: "Semana 1",   title: "Descubrimiento",        desc: "Kick-off, cuestionario estratégico, análisis de competencia, objetivos del sitio, arquitectura de información." },
  { n: "02", icon: Layout,         week: "Semana 2",   title: "Wireframes y UX",        desc: "Estructura visual de cada página, jerarquía y flujos de usuario. Validamos contigo antes de diseñar." },
  { n: "03", icon: Palette,        week: "Semana 3",   title: "Diseño UI",             desc: "Diseño visual de la home y páginas clave. Mockups en alta fidelidad. Aprobación antes de programar." },
  { n: "04", icon: Code,           week: "Sem. 4–6",   title: "Desarrollo",            desc: "Maquetación en WordPress, integración de funcionalidades, carga de contenido, e-commerce si aplica." },
  { n: "05", icon: Zap,            week: "Semana 7",   title: "Optimización",          desc: "Velocidad, SEO on-page, pruebas en dispositivos y navegadores, formularios, pagos y seguridad." },
  { n: "06", icon: Globe,          week: "Semana 8",   title: "Lanzamiento",           desc: "Migración al dominio definitivo, hosting, correos, Google Analytics, Search Console. ¡En línea!" },
  { n: "07", icon: GraduationCap,  week: "Post-lanz.", title: "Capacitación",          desc: "Entrenamiento personalizado, entrega de accesos y manuales, 30 días de soporte gratuito." },
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
          <p className="text-accent text-xs font-semibold tracking-[0.3em] uppercase">Metodología</p>
          <h2
            className="font-display text-cream leading-[0.88] uppercase mt-2"
            style={{ fontSize: "clamp(2.5rem, 7vw, 7rem)" }}
          >
            EL{" "}<span className="text-accent">PROCESO</span>
          </h2>
          <p className="mt-4 text-cream/45 text-sm max-w-md leading-relaxed">
            Tiempo total estimado: <span className="text-accent font-semibold">6 a 10 semanas</span> según la complejidad del proyecto.
          </p>
        </motion.div>

        <motion.div
          className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-cream/5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
        >
          {PHASES.slice(0, 4).map(({ n, icon: Icon, week, title, desc }, i) => (
            <motion.div key={i} variants={fadeUp} className="bg-dark p-6 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-accent flex items-center justify-center shrink-0">
                  <Icon className="h-5 w-5 text-dark" />
                </div>
                <span className="font-display text-cream/20 text-3xl uppercase leading-none">{n}</span>
              </div>
              <p className="text-accent text-xs font-semibold uppercase tracking-[0.15em]">{week}</p>
              <p className="font-display text-cream text-base uppercase leading-none">{title}</p>
              <p className="text-cream/45 text-xs leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </motion.div>
        <motion.div
          className="mt-px grid grid-cols-1 sm:grid-cols-3 gap-px bg-cream/5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
        >
          {PHASES.slice(4).map(({ n, icon: Icon, week, title, desc }, i) => (
            <motion.div key={i} variants={fadeUp} className="bg-dark p-6 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-accent flex items-center justify-center shrink-0">
                  <Icon className="h-5 w-5 text-dark" />
                </div>
                <span className="font-display text-cream/20 text-3xl uppercase leading-none">{n}</span>
              </div>
              <p className="text-accent text-xs font-semibold uppercase tracking-[0.15em]">{week}</p>
              <p className="font-display text-cream text-base uppercase leading-none">{title}</p>
              <p className="text-cream/45 text-xs leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── What We Need ─────────────────────────────────────────────────────────────

const NEEDS = [
  { icon: FileText,       title: "Textos y contenido",      desc: "Los textos del sitio. Si no los tienes, podemos cotizar copywriting aparte." },
  { icon: Layout,         title: "Imágenes propias",        desc: "Fotos de tu negocio, equipo o productos. Si no las tienes, gestionamos banco de imágenes." },
  { icon: Palette,        title: "Identidad de marca",      desc: "Logo, colores y tipografías. Si no la tienes, la creamos primero con nuestro servicio de Branding." },
  { icon: Globe,          title: "Dominio y hosting",       desc: "Te asesoramos en la compra y configuración. También podemos gestionarlos por ti." },
  { icon: MessageCircle,  title: "Disponibilidad",          desc: "Feedback oportuno en cada fase del proyecto para que los tiempos se cumplan." },
];

function WhatWeNeed() {
  return (
    <section className="bg-vivid w-full">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-20 sm:py-28">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <p className="text-cream/60 text-xs font-semibold tracking-[0.3em] uppercase">Tu parte</p>
          <h2
            className="font-display text-cream leading-[0.88] uppercase mt-2"
            style={{ fontSize: "clamp(2.5rem, 7vw, 7rem)" }}
          >
            QUÉ{" "}<span className="text-accent">NECESITAMOS</span>{" "}DE TI
          </h2>
        </motion.div>

        <motion.div
          className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
        >
          {NEEDS.map(({ icon: Icon, title, desc }, i) => (
            <motion.div key={i} variants={fadeUp} className="bg-cream/10 border border-cream/15 p-6 flex flex-col gap-4">
              <div className="h-10 w-10 bg-accent flex items-center justify-center shrink-0">
                <Icon className="h-5 w-5 text-dark" />
              </div>
              <p className="font-display text-cream text-sm uppercase leading-tight">{title}</p>
              <p className="text-cream/60 text-xs leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── Why Us ──────────────────────────────────────────────────────────────────

const PROS = [
  "Diseño estratégico enfocado en conversión",
  "Desarrollo limpio y optimizado",
  "Capacitación para que seas autónomo",
  "Soporte real y comunicación clara",
  "Sitios rápidos y SEO-ready",
  "Procesos transparentes y por fases",
];
const CONS = [
  "Sitios bonitos pero que no venden",
  "Plantillas pesadas y mal configuradas",
  "Dependencia eterna del desarrollador",
  "Desaparecer tras el lanzamiento",
  "Páginas lentas que Google penaliza",
  "Trabajar a ciegas sin saber qué pasa",
];

function WhyUs() {
  return (
    <section className="bg-brand w-full">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-20 sm:py-28">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <p className="text-accent text-xs font-semibold tracking-[0.3em] uppercase">Diferenciadores</p>
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

const PLANS = [
  {
    name: "Landing Page",
    price: "$900",
    time: "2–3 semanas",
    features: ["1 página de aterrizaje", "Formulario de contacto", "SEO básico", "Responsive", "30 días de soporte"],
    accent: "bg-accent",
  },
  {
    name: "Sitio Corporativo",
    price: "$1.500",
    time: "4–6 semanas",
    features: ["Hasta 8 páginas", "Blog incluido", "SEO on-page completo", "Formularios avanzados", "Capacitación incluida"],
    accent: "bg-brand",
    featured: true,
  },
  {
    name: "Tienda Virtual",
    price: "$2.500",
    time: "6–10 semanas",
    features: ["WooCommerce completo", "Pasarelas de pago locales", "Catálogo de productos", "Panel de pedidos", "Capacitación extendida"],
    accent: "bg-vivid",
  },
];

function Pricing() {
  return (
    <section id="precios" className="scroll-mt-16 bg-cream w-full">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-20 sm:py-28">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <p className="text-accent text-xs font-semibold tracking-[0.3em] uppercase">Inversión</p>
          <h2
            className="font-display text-brand leading-[0.88] uppercase mt-2"
            style={{ fontSize: "clamp(2.5rem, 7vw, 7rem)" }}
          >
            PLANES{" "}<span className="text-accent">DESDE</span>
          </h2>
          <p className="mt-4 text-dark/55 text-sm max-w-lg leading-relaxed">
            Precios orientativos. La cotización final se ajusta al alcance real de tu proyecto.
            Plazos de pago disponibles.
          </p>
        </motion.div>

        <motion.div
          className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
        >
          {PLANS.map(({ name, price, time, features, accent, featured }, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className={`flex flex-col ${featured ? "border-2 border-brand" : "border border-dark/10"}`}
            >
              {featured && (
                <div className="bg-brand px-4 py-1.5 text-center">
                  <p className="text-cream text-xs font-semibold uppercase tracking-[0.2em]">Más solicitado</p>
                </div>
              )}
              <div className="p-8 flex flex-col gap-5 flex-1">
                <div>
                  <p className="text-dark/50 text-xs uppercase tracking-[0.2em]">{name}</p>
                  <p
                    className="font-display text-brand uppercase leading-none mt-1"
                    style={{ fontSize: "clamp(2.5rem, 5vw, 5rem)" }}
                  >
                    {price}
                  </p>
                  <p className="text-accent font-semibold text-xs tracking-widest mt-0.5">USD / desde</p>
                </div>
                <p className="text-dark/50 text-xs border-t border-dark/10 pt-3">
                  Plazo estimado: <span className="text-dark/70 font-semibold">{time}</span>
                </p>
                <ul className="space-y-2.5 flex-1">
                  {features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2.5 text-sm text-dark/70">
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
                      : "border border-dark/20 text-dark hover:bg-brand hover:text-cream hover:border-brand"
                  }`}
                >
                  Cotizar este plan <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-6 text-dark/40 text-xs text-center"
        >
          ¿Proyecto especial? Cotización personalizada sin costo · Proyectos a la medida disponibles
        </motion.p>
      </div>
    </section>
  );
}

// ─── Maintenance ─────────────────────────────────────────────────────────────

const MAINT_ITEMS = [
  "Actualizaciones de WordPress, tema y plugins",
  "Backups automáticos diarios",
  "Monitoreo de seguridad 24/7",
  "Optimización de velocidad mensual",
  "Soporte técnico y cambios menores",
  "Reportes de rendimiento",
];

function Maintenance() {
  return (
    <section className="bg-dark w-full">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-20 sm:py-28">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <p className="text-accent text-xs font-semibold tracking-[0.3em] uppercase">Opcional</p>
          <h2
            className="font-display text-cream leading-[0.88] uppercase mt-2"
            style={{ fontSize: "clamp(2.5rem, 7vw, 7rem)" }}
          >
            PLAN DE{" "}
            <span className="text-vivid">MANTENIMIENTO</span>
          </h2>
        </motion.div>

        <motion.div
          className="mt-10 grid md:grid-cols-2 gap-12 items-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
        >
          <motion.div variants={fadeUp}>
            <p className="text-cream/55 text-sm leading-relaxed">
              Tu sitio necesita cuidados constantes para mantenerse rápido, seguro y actualizado.
              Nosotros lo hacemos por ti cada mes.
            </p>
            <div className="mt-8">
              <Link
                href="/#contacto"
                className="inline-flex items-center gap-2 bg-accent text-dark font-display text-xs px-6 py-3 tracking-[0.12em] uppercase hover:bg-cream transition-colors"
              >
                Consultar planes <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="space-y-2.5">
            {MAINT_ITEMS.map((item, i) => (
              <div key={i} className="flex items-center gap-3 bg-cream/5 border border-cream/10 px-5 py-3.5">
                <div className="h-5 w-5 bg-vivid flex items-center justify-center shrink-0">
                  <Check className="h-3 w-3 text-cream" />
                </div>
                <p className="text-cream/70 text-sm">{item}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── FAQ ─────────────────────────────────────────────────────────────────────

const FAQS = [
  { q: "¿Cuánto tarda el desarrollo de mi sitio?", a: "Depende de la complejidad. Una landing page puede estar lista en 2-3 semanas, un sitio corporativo en 4-6 semanas y una tienda virtual entre 6-10 semanas." },
  { q: "¿Yo puedo administrar el sitio después?", a: "¡Sí! Esa es una de las grandes ventajas de WordPress. Te capacitamos para que puedas editar textos, imágenes, agregar productos o publicar entradas sin depender de nadie." },
  { q: "¿Por qué WordPress y no Wix, Shopify o Squarespace?", a: "Con WordPress el sitio es 100% tuyo, no dependes de una plataforma cerrada. Es más flexible, escalable, mejor para SEO y a largo plazo más económico." },
  { q: "¿Incluye dominio y hosting?", a: "No están incluidos en el costo del desarrollo, pero te asesoramos en la compra y configuración. También podemos gestionarlos por ti." },
  { q: "¿El sitio se ve bien en celular?", a: "Sí. Todos nuestros sitios son 100% responsive y los probamos en múltiples dispositivos antes del lanzamiento." },
  { q: "¿Incluye SEO?", a: "Incluimos SEO on-page básico: estructura, meta tags, velocidad y sitemap. Si quieres una estrategia SEO avanzada, es un servicio aparte." },
  { q: "¿Y si no tengo logo ni identidad de marca?", a: "Te recomendamos primero nuestro servicio de Branding o Diseño de Logo, para que tu web tenga una base visual sólida desde el inicio." },
  { q: "¿Pueden migrar mi sitio actual a WordPress?", a: "Sí. Hacemos migraciones desde Wix, Shopify, Squarespace, Joomla y sitios estáticos, conservando tu contenido y SEO existente." },
  { q: "¿Qué pasarelas de pago integran?", a: "Trabajamos con PayU, Mercado Pago, Stripe, PayPal, Wompi, ePayco, transferencia bancaria, contra entrega, entre otras." },
  { q: "¿Qué pasa después del lanzamiento?", a: "Incluimos 30 días de soporte gratuito para ajustes menores. Luego puedes contratar un plan de mantenimiento mensual o pagar por hora cuando lo necesites." },
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
    <section className="bg-accent w-full">
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
            className="font-display text-dark leading-[0.88] uppercase"
            style={{ fontSize: "clamp(2.8rem, 9vw, 11rem)" }}
          >
            UNA WEB QUE{" "}
            <span className="text-cream">TRABAJA</span>{" "}
            POR TI
          </motion.h2>
          <motion.p variants={fadeUp} className="text-dark/60 text-base max-w-sm leading-relaxed">
            Agenda una llamada gratuita de 30 minutos. Analizamos tu proyecto y armamos juntos la mejor solución.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-3">
            <WhatsAppButton
              message="Hola 👋 Quiero información sobre el diseño de mi página web."
              label="Escríbenos por WhatsApp"
              className="px-8 py-4 text-sm tracking-[0.15em]"
            />
            <Link
              href="/#contacto"
              className="inline-flex items-center gap-2 border-2 border-dark/30 text-dark font-display text-sm px-8 py-4 tracking-[0.15em] uppercase hover:border-dark transition-colors"
            >
              <CalendarCheck className="h-4 w-4" /> Agendar por correo
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Page export ─────────────────────────────────────────────────────────────

export function WebServicePage() {
  return (
    <>
      <Hero />
      <WhatIs />
      <ProjectTypes />
      <ForYou />
      <Deliverables />
      <Process />
      <WhatWeNeed />
      <WhyUs />
      <Pricing />
      <Maintenance />
      <FAQ />
      <FinalCTA />
    </>
  );
}
