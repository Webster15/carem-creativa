import type { Metadata } from "next";
import { RedesSocialesServicePage } from "@/components/servicios/redes-sociales";

export const metadata: Metadata = {
  title: "Diseño para Redes Sociales · Carem Creativa",
  description:
    "Piezas gráficas profesionales para Instagram, TikTok, LinkedIn y más. Desde $250 USD. Posts, carruseles, historias y plantillas editables. Solo diseño — tú pones el contenido.",
};

export default function RedesSocialesPage() {
  return <RedesSocialesServicePage />;
}
