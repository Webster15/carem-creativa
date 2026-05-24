import type { Metadata } from "next";
import { WebServicePage } from "@/components/servicios/web";

export const metadata: Metadata = {
  title: "Páginas Web y Tiendas Virtuales en WordPress · Carem Creativa",
  description:
    "Diseño y desarrollo web en WordPress: sitios corporativos, landing pages y tiendas WooCommerce. Desde $900 USD. Rápidos, optimizados para SEO y autoadministrables.",
};

export default function WebPage() {
  return <WebServicePage />;
}
