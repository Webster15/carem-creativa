import type { Metadata } from "next";
import { LogoServicePage } from "@/components/servicios/logo";

export const metadata: Metadata = {
  title: "Diseño de Logotipo · Carem Creativa",
  description:
    "Logotipos únicos, profesionales y memorables. Desde $400 USD. 7–10 días hábiles. Incluye variantes, mini guía y archivos en todos los formatos.",
};

export default function LogoPage() {
  return <LogoServicePage />;
}
