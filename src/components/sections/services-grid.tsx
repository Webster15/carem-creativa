"use client";

import { motion, type Variants } from "framer-motion";
import { SERVICES } from "@/lib/services";
import { ServiceCard } from "./service-card";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
};

export function ServicesGrid() {
  return (
    <section id="servicios" className="scroll-mt-16 bg-brand w-full">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-20 sm:py-28">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <p className="text-accent text-xs font-semibold tracking-[0.3em] uppercase">
            Servicios
          </p>
          <div className="flex items-end justify-between flex-wrap gap-4 mt-2">
            <h2
              className="font-display text-cream leading-[0.88] uppercase"
              style={{ fontSize: "clamp(3rem, 10vw, 8rem)" }}
            >
              LO QUE{" "}
              <span className="text-accent">HACEMOS</span>
            </h2>
            <p className="text-cream/40 text-sm max-w-xs">
              Desde identidad visual hasta desarrollo digital — todo bajo un mismo techo.
            </p>
          </div>
        </motion.div>

        <motion.div
          className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
        >
          {SERVICES.map((s, i) => (
            <motion.div key={s.id} variants={fadeUp}>
              {/* Number badge */}
              <p className="font-display text-cream/15 text-4xl leading-none mb-2 select-none">
                {String(i + 1).padStart(2, "0")}
              </p>
              <ServiceCard service={s} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
