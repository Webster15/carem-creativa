"use client";

import { motion, type Variants } from "framer-motion";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const STATS = [
  { n: "+40", label: "Marcas" },
  { n: "12", label: "Apps" },
  { n: "9", label: "Países" },
];

export function About() {
  return (
    <section id="nosotros" className="scroll-mt-16 bg-vivid w-full">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-20 sm:py-28">
        <motion.div
          className="grid md:grid-cols-2 gap-12 md:gap-20 items-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
        >
          <motion.div variants={fadeUp}>
            <p className="text-cream/60 text-xs font-semibold tracking-[0.3em] uppercase">
              Nosotros
            </p>
            <h2
              className="font-display text-cream leading-[0.88] uppercase mt-2"
              style={{ fontSize: "clamp(3rem, 10vw, 8rem)" }}
            >
              HECHOS{" "}
              <span className="text-accent">PARA</span>{" "}
              CREAR
            </h2>
            {/* Decorative rule */}
            <div className="mt-8 flex items-center gap-4">
              <div className="h-[2px] w-12 bg-accent" />
              <p className="text-cream/40 text-xs uppercase tracking-widest font-semibold">
                Carem Creativa
              </p>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="space-y-5">
            <p className="text-cream/80 text-base leading-relaxed">
              Trabajo con fundadores y equipos que necesitan una marca clara y un
              producto bien construido. Cada proyecto pasa por estrategia, diseño
              y — cuando aplica — desarrollo.
            </p>
            <p className="text-cream/80 text-base leading-relaxed">
              Me importa entregar piezas que se vean bien y, sobre todo, que
              funcionen. No vendo lo que no puedo sostener. Clientes en Colombia,
              México, España y más allá.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 pt-4">
              {STATS.map((s) => (
                <div
                  key={s.label}
                  className="bg-cream/10 border border-cream/20 p-4 text-center"
                >
                  <p className="font-display text-3xl text-cream uppercase leading-none">
                    {s.n}
                  </p>
                  <p className="text-[10px] text-cream/50 mt-2 uppercase tracking-wider">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
