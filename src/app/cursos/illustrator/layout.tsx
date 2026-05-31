import type { Metadata } from "next";
import Script from "next/script";

const SITE_URL = "https://www.caremcreativa.com";
const PAGE_URL = `${SITE_URL}/cursos/illustrator`;

export const metadata: Metadata = {
  title: "Curso Adobe Illustrator de Cero a Pro — 7 Módulos · 90 Videos",
  description:
    "Aprende Adobe Illustrator desde cero hasta nivel avanzado. 7 módulos, 90 videos, acceso de por vida. Sin experiencia previa. Solo $70 USD en oferta. Por CaremCreativa.",
  keywords: [
    "curso adobe illustrator",
    "curso illustrator español",
    "aprender illustrator",
    "curso diseño gráfico",
    "adobe illustrator desde cero",
    "curso illustrator colombia",
    "diseño vectorial",
    "curso illustrator online",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Curso Adobe Illustrator de Cero a Pro · CaremCreativa",
    description:
      "7 módulos, 90 videos, acceso de por vida. Aprende Illustrator desde cero sin experiencia previa. Solo $70 USD.",
    url: PAGE_URL,
    type: "website",
    images: [{ url: "/og-curso-illustrator.png", width: 1200, height: 630 }],
  },
};

// JSON-LD — Course schema (aparece como resultado rico en Google)
const courseSchema = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: "Curso Básico Adobe Illustrator — De Cero a Pro",
  description:
    "Aprende Adobe Illustrator desde cero hasta nivel avanzado. 7 módulos y 90 videos con acceso de por vida. No requiere experiencia previa.",
  url: PAGE_URL,
  provider: {
    "@type": "Organization",
    name: "CaremCreativa",
    url: SITE_URL,
  },
  offers: {
    "@type": "Offer",
    price: "70",
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
    url: "https://pay.hotmart.com/D97908733L?off=7y2xqfjl",
    validFrom: new Date().toISOString().split("T")[0],
  },
  hasCourseInstance: {
    "@type": "CourseInstance",
    courseMode: "online",
    instructor: {
      "@type": "Organization",
      name: "CaremCreativa",
    },
  },
  numberOfCredits: 90,
  educationalLevel: "Beginner to Advanced",
  inLanguage: "es",
  teaches: [
    "Adobe Illustrator",
    "Diseño vectorial",
    "Diseño de logotipos",
    "Ilustración vectorial",
    "Branding",
    "Herramienta Pluma",
  ],
};

export default function IllustratorCourseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Script
        id="course-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />
      {children}
    </>
  );
}
