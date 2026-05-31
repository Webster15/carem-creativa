import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { ServicesGrid } from "@/components/sections/services-grid";
import { PortfolioTeaser } from "@/components/sections/portfolio-teaser";
import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";

export const metadata: Metadata = {
  title: "CaremCreativa — Agencia de Diseño Gráfico en Colombia",
  description:
    "Branding, identidad corporativa, naming, diseño para redes sociales, páginas web y apps. Agencia colombiana con +5 años de experiencia y más de 40 marcas diseñadas.",
  alternates: { canonical: "https://www.caremcreativa.com" },
  openGraph: {
    title: "CaremCreativa — Agencia de Diseño Gráfico en Colombia",
    description:
      "Branding, identidad corporativa, naming, redes sociales, web y apps. Tu marca en manos de quienes entienden el diseño.",
    url: "https://www.caremcreativa.com",
  },
};

export default function Home() {
  return (
    <>
      <Hero />
      <ServicesGrid />
      <PortfolioTeaser />
      <About />
      <Contact />
    </>
  );
}
