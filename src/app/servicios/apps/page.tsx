import type { Metadata } from "next";
import { AppsServicePage } from "@/components/servicios/apps";

export const metadata: Metadata = {
  title: "Desarrollo de Apps Web y Móviles en Colombia",
  description:
    "Diseño y desarrollo de apps web y móviles a la medida en Colombia. React Native, Next.js. MVP desde $3.000 USD. De la idea al lanzamiento en App Store y Google Play. CaremCreativa.",
  keywords: ["desarrollo de apps colombia", "aplicaciones móviles colombia", "desarrollo web colombia", "apps a medida colombia"],
  alternates: { canonical: "https://www.caremcreativa.com/servicios/apps" },
  openGraph: { title: "Desarrollo Apps Web y Móviles · CaremCreativa Colombia", url: "https://www.caremcreativa.com/servicios/apps" },
};

export default function AppsPage() {
  return <AppsServicePage />;
}
