import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Branding y Diseño de Identidad de Marca en Colombia",
  description:
    "Construimos la identidad completa de tu marca: estrategia, logo, paleta, tipografía y manual de marca. Branding profesional desde $500 USD. Agencia CaremCreativa, Colombia.",
  keywords: ["branding colombia", "identidad de marca colombia", "diseño de marca colombia", "agencia branding colombia", "manual de marca", "estrategia de marca colombia"],
  alternates: { canonical: "https://www.caremcreativa.com/servicios/branding" },
  openGraph: {
    title: "Branding y Diseño de Identidad de Marca · CaremCreativa",
    description: "Estrategia, logo, paleta, tipografía y manual de marca completo. Desde $500 USD.",
    url: "https://www.caremcreativa.com/servicios/branding",
  },
};

export default function BrandingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
