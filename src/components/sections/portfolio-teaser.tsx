"use client";

import { motion, type Variants } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

const PROJECTS = [
  {
    title: "Portafolio Redes Sociales",
    category: "Social Media",
    image: "https://mir-s3-cdn-cf.behance.net/projects/max_808/79029c231849357.Y3JvcCwxNDAxLDEwOTUsMCww.jpg",
    url: "https://www.behance.net/gallery/231849357/PORTAFOLIO-DE-REDES-SOCIALES",
  },
  {
    title: "The Tattoo Woman",
    category: "Branding",
    image: "https://mir-s3-cdn-cf.behance.net/projects/max_808/67880e231672753.Y3JvcCwxNDAwLDEwOTUsMCww.jpg",
    url: "https://www.behance.net/gallery/231672753/THE-TATTOO-WOMAN",
  },
  {
    title: "The MCA Open University",
    category: "Identidad Corporativa",
    image: "https://mir-s3-cdn-cf.behance.net/projects/max_808/95d23a230953635.Y3JvcCwxNDAwLDEwOTUsMCww.jpg",
    url: "https://www.behance.net/gallery/230953635/Proyecto-The-MCA-Open-University",
  },
  {
    title: "Banco Confía",
    category: "Branding Fintech",
    image: "https://mir-s3-cdn-cf.behance.net/projects/max_808/591678230934689.Y3JvcCwxNDAwLDEwOTUsMCww.jpg",
    url: "https://www.behance.net/gallery/230934689/Proyecto-banco-confia",
  },
  {
    title: "Fitbrisa",
    category: "Identidad Fitness",
    image: "https://mir-s3-cdn-cf.behance.net/projects/max_808/ad0ad3230933981.Y3JvcCwxNDAwLDEwOTUsMCww.jpg",
    url: "https://www.behance.net/gallery/230933981/Proyecto-Fitbrisa",
  },
  {
    title: "Luna Verde",
    category: "Branding Natural",
    image: "https://mir-s3-cdn-cf.behance.net/projects/max_808/0561aa230933783.Y3JvcCwxNDAwLDEwOTUsMCww.jpg",
    url: "https://www.behance.net/gallery/230933783/Proyecto-Luna-Verde",
  },
  {
    title: "Lunéa Eventos",
    category: "Branding Eventos",
    image: "https://mir-s3-cdn-cf.behance.net/projects/max_808/ac7bf5224942879.Y3JvcCwxNDAwLDEwOTUsMCww.jpg",
    url: "https://www.behance.net/gallery/224942879/Luna-Eventos",
  },
  {
    title: "Maison Soléne",
    category: "Branding Lujo",
    image: "https://mir-s3-cdn-cf.behance.net/projects/max_808/45535b224939439.Y3JvcCwxNDAwLDEwOTUsMCww.jpg",
    url: "https://www.behance.net/gallery/224939439/Proyecto-Maison-Solne",
  },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const staggerGrid: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

export function PortfolioTeaser() {
  return (
    <section id="portafolio" className="scroll-mt-16 bg-dark w-full">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-20 sm:py-28">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="flex items-end justify-between flex-wrap gap-4"
        >
          <div>
            <p className="text-accent text-xs font-semibold tracking-[0.3em] uppercase">
              Portafolio
            </p>
            <h2
              className="font-display text-cream leading-[0.88] uppercase mt-2"
              style={{ fontSize: "clamp(3rem, 10vw, 8rem)" }}
            >
              TRABAJO{" "}
              <span className="text-accent">REAL</span>
            </h2>
          </div>
          <a
            href="https://www.behance.net/caremcreativa"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 border-2 border-cream/20 text-cream/50 hover:border-accent hover:text-accent text-xs font-semibold uppercase tracking-[0.2em] px-4 py-2.5 transition-colors"
          >
            Ver Behance <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </motion.div>

        <motion.div
          className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerGrid}
        >
          {PROJECTS.map((p) => (
            <motion.a
              key={p.url}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              variants={fadeUp}
              className="group relative aspect-[3/4] overflow-hidden bg-brand/20 block"
            >
              <Image
                src={p.image}
                alt={p.title}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Permanent bottom gradient for legibility */}
              <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-dark/80 to-transparent" />
              {/* Hover full overlay */}
              <div className="absolute inset-0 bg-brand/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              {/* Text — always visible at bottom */}
              <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4">
                <p className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-accent font-semibold">
                  {p.category}
                </p>
                <p className="font-display text-sm sm:text-base text-cream uppercase leading-tight mt-0.5">
                  {p.title}
                </p>
              </div>
              {/* Arrow shown on hover */}
              <div className="absolute top-3 right-3 bg-accent text-cream p-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ArrowUpRight className="h-3.5 w-3.5" />
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
