import type { Metadata } from "next";
import { NamingServicePage } from "@/components/servicios/naming";

export const metadata: Metadata = {
  title: "Naming — Creación del Nombre de tu Marca · Carem Creativa",
  description:
    "Nombres estratégicos, originales y disponibles para tu marca. Desde $300 USD. 10–14 días. Incluye 5–8 propuestas verificadas, estrategia y documento final.",
};

export default function NamingPage() {
  return <NamingServicePage />;
}
