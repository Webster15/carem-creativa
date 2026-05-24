import type { Metadata } from "next";
import { Barlow_Condensed, Poppins } from "next/font/google";
import "./globals.css";
import { VoiceAgentProvider } from "@/components/voice-agent/provider";
import { ServiceDetailDialog } from "@/components/sections/service-detail-dialog";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

const barlowCondensed = Barlow_Condensed({
  variable: "--font-barlow",
  weight: "900",
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Estudio · Diseño con asistente de voz",
  description:
    "Branding, identidad, naming, redes sociales, web y apps. Pídeselo al asistente de voz y la página te lo muestra.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${barlowCondensed.variable} ${poppins.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-cream text-dark font-sans">
        <VoiceAgentProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <ServiceDetailDialog />
        </VoiceAgentProvider>
      </body>
    </html>
  );
}
