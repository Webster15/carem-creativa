"use client";

import { useState } from "react";
import { motion, type Variants } from "framer-motion";
import {
  ArrowRight, Check, Compass, Grid3x3, Layers, Ruler, QrCode,
  Download, KeyRound, Sparkles, ShieldCheck, Loader2,
} from "lucide-react";
import { GuiaInstalacion } from "@/components/plugin/GuiaInstalacion";

// ─── Animaciones (mismas que el resto del sitio) ────────────────────────────

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};
const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
};
const vp = { once: true, amount: 0.12 };

// ─── Datos ──────────────────────────────────────────────────────────────────

const HERRAMIENTAS = [
  {
    id: "construccion",
    icono: Compass,
    nombre: "Construcción geométrica",
    usd: 4,
    texto:
      "Detecta las rectas y circunferencias del propio logo, las prolonga hasta los " +
      "bordes de la mesa y acota los ángulos de inclinación. La retícula que antes " +
      "trazabas a mano, en un clic.",
  },
  {
    id: "reticula",
    icono: Grid3x3,
    nombre: "Retícula modular",
    usd: 4,
    texto:
      "Columnas, filas y medianiles sobre la mesa de trabajo, con preajustes clásicos: " +
      "Müller-Brockmann, editorial de 12 columnas, sección áurea, canon de Villard.",
  },
  {
    id: "mesasColor",
    icono: Layers,
    nombre: "Versiones sobre color",
    usd: 4,
    texto:
      "Una mesa de trabajo por cada color de fondo, con el logo centrado y el nombre " +
      "puesto. Listo para exportar todas las versiones de golpe.",
  },
  {
    id: "areaRespeto",
    icono: Ruler,
    nombre: "Área de respeto",
    usd: 4,
    texto:
      "El área de seguridad calculada a partir de una medida X tomada del propio logo, " +
      "acotada y justificada. Escalable y replicable, como pide un manual de marca.",
  },
] as const;

const PASOS = [
  { icono: Download, titulo: "Instala", texto: "Descarga el plugin e instálalo. Es gratis y trae el generador de QR incluido." },
  { icono: Sparkles, titulo: "Elige", texto: "Compra solo las herramientas que necesites, o el pack completo." },
  { icono: KeyRound, titulo: "Activa", texto: "Pega la clave que te llega por correo en el panel y ya está." },
];

// ─── Compra ─────────────────────────────────────────────────────────────────

function useCompra() {
  const [cargando, setCargando] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function comprar(producto: string) {
    setCargando(producto);
    setError(null);
    try {
      const res = await fetch("/api/plugin/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ producto }),
      });
      const d = await res.json();
      if (!res.ok || !d.url) throw new Error(d.error || "No se pudo iniciar el pago.");
      window.location.href = d.url;
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error inesperado.");
      setCargando(null);
    }
  }

  return { comprar, cargando, error };
}

// ─── Página ─────────────────────────────────────────────────────────────────

export default function PluginPage() {
  const { comprar, cargando, error } = useCompra();

  // Con llaves de sandbox el checkout no cobra de verdad. Mientras se prueba,
  // la página tiene que decirlo bien claro: si un visitante real llega aquí y
  // "compra", no recibiría nada y pensaría que le has fallado.
  const enPruebas = (process.env.NEXT_PUBLIC_WOMPI_PUBLIC_KEY || "").startsWith("pub_test_");

  return (
    <>
      {enPruebas && (
        <div className="bg-accent text-cream text-center px-4 py-3">
          <p className="mx-auto max-w-3xl text-sm leading-relaxed">
            <strong className="font-display uppercase tracking-[0.1em]">Modo de pruebas</strong>
            {" — "}
            los pagos de esta página no son reales todavía. Si querías comprar,
            escríbenos y te avisamos en cuanto esté disponible.
          </p>
        </div>
      )}

      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <section className="bg-brand overflow-hidden">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="mx-auto max-w-6xl px-4 sm:px-6 pt-16 pb-20 sm:pb-28"
        >
          <motion.p variants={fadeUp} className="text-accent text-xs font-semibold tracking-[0.3em] uppercase">
            Plugin para Adobe Illustrator
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="font-display text-cream leading-[0.86] uppercase mt-3"
            style={{ fontSize: "clamp(2.6rem, 9vw, 6.5rem)" }}
          >
            LogoForge
          </motion.h1>

          <motion.p variants={fadeUp} className="mt-6 max-w-xl text-cream/70 text-base leading-relaxed">
            La construcción geométrica, la retícula y el área de respeto de un logo,
            calculadas a partir del propio vector. Lo que te llevaba una tarde de
            trazar guías a mano, resuelto mientras te preparas un café.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-10 flex flex-wrap items-end gap-x-10 gap-y-6">
            <div>
              <p className="text-cream/50 text-xs uppercase tracking-[0.2em]">Pack completo</p>
              <p
                className="font-display text-cream leading-none uppercase mt-1"
                style={{ fontSize: "clamp(2.5rem, 7vw, 4.5rem)" }}
              >
                $10 USD
              </p>
              <p className="text-cream/40 text-xs uppercase tracking-wider mt-1">
                Pago único · 4 herramientas
              </p>
            </div>
            <div>
              <p className="text-cream/50 text-xs uppercase tracking-[0.2em]">Por separado</p>
              <p className="font-display text-cream/60 text-3xl uppercase leading-none mt-1">
                $4 USD
              </p>
              <p className="text-cream/40 text-xs uppercase tracking-wider mt-1">Cada una</p>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-10 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => comprar("pack")}
              disabled={cargando !== null}
              className="inline-flex items-center gap-2 bg-accent text-cream font-display text-sm px-8 py-4 tracking-[0.12em] uppercase hover:bg-cream hover:text-dark transition-colors disabled:opacity-60"
            >
              {cargando === "pack" ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <ArrowRight className="h-4 w-4" />
              )}
              Comprar el pack
            </button>
            <a
              href="#descargar"
              className="inline-flex items-center gap-2 border-2 border-cream/30 text-cream font-display text-sm px-8 py-4 tracking-[0.12em] uppercase hover:border-cream transition-colors"
            >
              <Download className="h-4 w-4" />
              Descargar gratis
            </a>
          </motion.div>

          {error && (
            <motion.p variants={fadeUp} className="mt-4 text-accent text-sm">
              {error}
            </motion.p>
          )}

          <motion.div variants={fadeUp} className="mt-12 flex items-start gap-3 max-w-lg">
            <QrCode className="h-5 w-5 text-cream/50 shrink-0 mt-0.5" />
            <p className="text-cream/50 text-sm leading-relaxed">
              El plugin es gratis e incluye un generador de <strong className="text-cream/80">códigos QR
              vectoriales</strong>. Son estáticos: la URL va dentro del código, sin servicios
              de por medio, así que no caducan nunca.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* ── Herramientas ───────────────────────────────────────────────── */}
      <section id="herramientas" className="scroll-mt-16 bg-cream w-full">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={vp}
          className="mx-auto max-w-6xl px-4 sm:px-6 py-20 sm:py-28"
        >
          <motion.p variants={fadeUp} className="text-accent text-xs font-semibold tracking-[0.3em] uppercase">
            Compra solo lo que uses
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="font-display text-brand leading-[0.88] uppercase mt-2"
            style={{ fontSize: "clamp(2rem, 6vw, 4rem)" }}
          >
            Cuatro herramientas
          </motion.h2>

          <div className="mt-10 grid sm:grid-cols-2 gap-4">
            {HERRAMIENTAS.map(({ id, icono: Icono, nombre, usd, texto }) => (
              <motion.div
                key={id}
                variants={fadeUp}
                className="flex flex-col bg-brand/5 border border-brand/10 p-6"
              >
                <div className="h-10 w-10 bg-brand flex items-center justify-center shrink-0">
                  <Icono className="h-5 w-5 text-cream" />
                </div>
                <p className="font-display text-dark text-xl uppercase mt-4 leading-tight">
                  {nombre}
                </p>
                <p className="mt-3 text-dark/70 text-sm leading-relaxed flex-1">{texto}</p>
                <div className="mt-6 flex items-center justify-between gap-4">
                  <span className="font-display text-brand text-2xl uppercase leading-none">
                    ${usd} USD
                  </span>
                  <button
                    type="button"
                    onClick={() => comprar(id)}
                    disabled={cargando !== null}
                    className="inline-flex items-center gap-2 bg-dark text-cream font-display text-xs px-5 py-3 tracking-[0.12em] uppercase hover:bg-brand transition-colors disabled:opacity-60"
                  >
                    {cargando === id ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    ) : (
                      <ArrowRight className="h-3.5 w-3.5" />
                    )}
                    Comprar
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            variants={fadeUp}
            className="mt-6 flex flex-wrap items-center justify-between gap-6 bg-dark p-6 sm:p-8"
          >
            <div>
              <p className="text-accent text-xs font-bold uppercase tracking-[0.2em]">
                Las cuatro juntas
              </p>
              <p className="font-display text-cream text-3xl uppercase leading-none mt-2">
                $10 USD
              </p>
              <p className="text-cream/50 text-sm mt-2">
                Ahorras $6 y entran las herramientas nuevas que añada al pack.
              </p>
            </div>
            <button
              type="button"
              onClick={() => comprar("pack")}
              disabled={cargando !== null}
              className="inline-flex items-center gap-2 bg-accent text-cream font-display text-sm px-8 py-4 tracking-[0.12em] uppercase hover:bg-cream hover:text-dark transition-colors disabled:opacity-60"
            >
              {cargando === "pack" ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <ArrowRight className="h-4 w-4" />
              )}
              Comprar el pack
            </button>
          </motion.div>
        </motion.div>
      </section>

      {/* ── Cómo funciona ──────────────────────────────────────────────── */}
      <section className="bg-dark w-full">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={vp}
          className="mx-auto max-w-6xl px-4 sm:px-6 py-20 sm:py-28"
        >
          <motion.p variants={fadeUp} className="text-accent text-xs font-semibold tracking-[0.3em] uppercase">
            En tres pasos
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="font-display text-cream leading-[0.88] uppercase mt-2"
            style={{ fontSize: "clamp(2rem, 6vw, 4rem)" }}
          >
            Cómo funciona
          </motion.h2>

          <div className="mt-10 grid sm:grid-cols-3 gap-4">
            {PASOS.map(({ icono: Icono, titulo, texto }, i) => (
              <motion.div key={titulo} variants={fadeUp} className="border border-cream/15 p-6">
                <div className="flex items-center justify-between">
                  <div className="h-10 w-10 bg-accent flex items-center justify-center">
                    <Icono className="h-5 w-5 text-cream" />
                  </div>
                  <span className="font-display text-cream/20 text-4xl leading-none">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <p className="font-display text-cream text-xl uppercase mt-4 leading-tight">
                  {titulo}
                </p>
                <p className="mt-2 text-cream/60 text-sm leading-relaxed">{texto}</p>
              </motion.div>
            ))}
          </div>

          <motion.div variants={fadeUp} className="mt-10 grid sm:grid-cols-2 gap-4">
            <div className="flex items-start gap-4 border border-cream/15 p-6">
              <ShieldCheck className="h-6 w-6 text-accent shrink-0" />
              <div>
                <p className="font-display text-cream text-lg uppercase leading-tight">
                  Dos equipos por licencia
                </p>
                <p className="mt-2 text-cream/60 text-sm leading-relaxed">
                  Tu portátil y tu ordenador de mesa. Si cambias de máquina, liberas la
                  plaza desde el propio panel, sin escribir a soporte.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 border border-cream/15 p-6">
              <Check className="h-6 w-6 text-accent shrink-0" />
              <div>
                <p className="font-display text-cream text-lg uppercase leading-tight">
                  Pago único
                </p>
                <p className="mt-2 text-cream/60 text-sm leading-relaxed">
                  Sin suscripción. Lo que compras es tuyo, y el pack recibe las
                  herramientas que vaya añadiendo.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ── Descarga e instalación ─────────────────────────────────────── */}
      <section id="descargar" className="scroll-mt-16 bg-brand w-full border-t border-cream/15">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={vp}
          className="mx-auto max-w-6xl px-4 sm:px-6 py-20 sm:py-28"
        >
          <motion.p variants={fadeUp} className="text-accent text-xs font-semibold tracking-[0.3em] uppercase">
            Gratis, sin cuenta
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="font-display text-cream leading-[0.88] uppercase mt-2"
            style={{ fontSize: "clamp(2rem, 6vw, 4rem)" }}
          >
            Instala el plugin
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-5 max-w-xl text-cream/70 text-base leading-relaxed">
            Descárgalo e instálalo aunque no compres nada: incluye el generador de
            códigos QR. Las demás herramientas se desbloquean con tu clave.
          </motion.p>
          <motion.div variants={fadeUp}>
            <GuiaInstalacion conTitulo={false} />
          </motion.div>
        </motion.div>
      </section>

      {/* ── Requisitos ─────────────────────────────────────────────────── */}
      <section className="bg-cream w-full">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={vp}
          className="mx-auto max-w-6xl px-4 sm:px-6 py-20 sm:py-28"
        >
          <motion.p variants={fadeUp} className="text-accent text-xs font-semibold tracking-[0.3em] uppercase">
            Antes de comprar
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="font-display text-brand leading-[0.88] uppercase mt-2"
            style={{ fontSize: "clamp(2rem, 6vw, 4rem)" }}
          >
            Qué necesitas
          </motion.h2>

          <motion.ul variants={fadeUp} className="mt-10 grid sm:grid-cols-2 gap-x-10 gap-y-4">
            {[
              "Adobe Illustrator 2019 o posterior, en Windows o macOS.",
              "El logo en vectores. Si tiene texto vivo, el plugin lo vectoriza en una copia temporal.",
              "Los símbolos y objetos vivos hay que expandirlos antes; el panel te avisa si los encuentra.",
              "Conexión a internet para activar la licencia. Después funciona sin conexión.",
            ].map((t) => (
              <li key={t} className="flex items-start gap-3">
                <Check className="h-5 w-5 text-brand shrink-0 mt-0.5" />
                <span className="text-dark/75 text-sm leading-relaxed">{t}</span>
              </li>
            ))}
          </motion.ul>

          <motion.p variants={fadeUp} className="mt-10 text-dark/50 text-xs leading-relaxed max-w-2xl">
            El precio se cobra en pesos colombianos al cambio del día, a través de Wompi
            (Bancolombia). Se aceptan tarjetas de crédito y débito, PSE y Nequi. Si tu
            tarjeta es extranjera, tu banco hará la conversión.
          </motion.p>
        </motion.div>
      </section>
    </>
  );
}
