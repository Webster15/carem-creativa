import type { Metadata } from "next";
import { LogoServicePage } from "@/components/servicios/logo";

export const metadata: Metadata = {
  title: "Diseño de Logo e Identidad Corporativa en Colombia",
  description:
    "Diseño de logotipos profesionales en Colombia. 3 propuestas, 2 rondas de ajustes, archivos vectoriales y mini guía de uso. Desde $400 USD. Agencia CaremCreativa.",
  keywords: ["diseño de logo colombia", "diseño de logotipo colombia", "identidad corporativa colombia", "logo profesional colombia"],
  alternates: { canonical: "https://www.caremcreativa.com/servicios/logo" },
  openGraph: { title: "Diseño de Logo Profesional · CaremCreativa Colombia", url: "https://www.caremcreativa.com/servicios/logo" },
};

export default function LogoPage() {
  return <LogoServicePage />;
}
