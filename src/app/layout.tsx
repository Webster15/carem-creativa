import type { Metadata } from "next";
import { Barlow_Condensed, Poppins } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { VoiceAgentProvider } from "@/components/voice-agent/provider";
import { ServiceDetailDialog } from "@/components/sections/service-detail-dialog";
import { SiteChrome } from "@/components/layout/site-chrome";

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

const SITE_URL = "https://www.caremcreativa.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "CaremCreativa — Agencia de Diseño Gráfico en Colombia",
    template: "%s · CaremCreativa",
  },
  description:
    "Agencia de diseño gráfico colombiana especializada en branding, identidad corporativa, naming, diseño para redes sociales, páginas web y apps. Más de 5 años de experiencia y +40 marcas diseñadas.",
  keywords: [
    "agencia de diseño gráfico Colombia",
    "diseño gráfico Colombia",
    "branding Colombia",
    "diseño de logo Colombia",
    "identidad corporativa Colombia",
    "naming Colombia",
    "diseño web Colombia",
    "páginas web Colombia",
    "diseño redes sociales Colombia",
    "agencia creativa Colombia",
    "CaremCreativa",
  ],
  authors: [{ name: "CaremCreativa", url: SITE_URL }],
  creator: "CaremCreativa",
  publisher: "CaremCreativa",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  openGraph: {
    type: "website",
    locale: "es_CO",
    url: SITE_URL,
    siteName: "CaremCreativa",
    title: "CaremCreativa — Agencia de Diseño Gráfico en Colombia",
    description:
      "Branding, identidad corporativa, naming, redes sociales, páginas web y apps. Tu marca en manos de quienes entienden el diseño.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "CaremCreativa — Agencia de Diseño Gráfico en Colombia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CaremCreativa — Agencia de Diseño Gráfico en Colombia",
    description:
      "Branding, identidad corporativa, naming, redes sociales, páginas web y apps.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: SITE_URL,
  },
};

// JSON-LD — Organización + Sitio web
const organizationSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "CaremCreativa",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.png`,
      },
      contactPoint: {
        "@type": "ContactPoint",
        email: "Caremcreativa@gmail.com",
        contactType: "customer service",
        availableLanguage: "Spanish",
      },
      sameAs: [],
      address: {
        "@type": "PostalAddress",
        addressCountry: "CO",
      },
      description:
        "Agencia de diseño gráfico colombiana especializada en branding, identidad corporativa, naming, diseño para redes sociales, páginas web y apps.",
      knowsAbout: [
        "Branding",
        "Diseño gráfico",
        "Identidad corporativa",
        "Naming",
        "Diseño web",
        "Adobe Illustrator",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "CaremCreativa",
      publisher: { "@id": `${SITE_URL}/#organization` },
      inLanguage: "es-CO",
    },
  ],
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
      <head>
        <Script
          id="org-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-cream text-dark font-sans">
        <VoiceAgentProvider>
          <SiteChrome>{children}</SiteChrome>
          <ServiceDetailDialog />
        </VoiceAgentProvider>
      </body>
    </html>
  );
}
