import type { Metadata } from "next";
import { AppsServicePage } from "@/components/servicios/apps";

export const metadata: Metadata = {
  title: "Desarrollo de Apps Web y Móviles · Carem Creativa",
  description:
    "Diseño y desarrollo de aplicaciones web y móviles a la medida. React Native, Flutter, Next.js, WordPress. MVP desde $3,000 USD. De la idea al lanzamiento en App Store y Google Play.",
};

export default function AppsPage() {
  return <AppsServicePage />;
}
