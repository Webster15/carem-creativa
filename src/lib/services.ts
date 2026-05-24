import {
  Sparkles,
  Hexagon,
  Type,
  Share2,
  Globe,
  Smartphone,
  type LucideIcon,
} from "lucide-react";

export const SERVICE_IDS = [
  "branding",
  "logo",
  "naming",
  "redes-sociales",
  "web",
  "apps",
] as const;

export type ServiceId = (typeof SERVICE_IDS)[number];

export interface Service {
  id: ServiceId;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  bullets: string[];
  icon: LucideIcon;
  priceFrom: number;
  deliverables: string[];
  pageUrl?: string;
}

export const SERVICES: readonly Service[] = [
  {
    id: "branding",
    slug: "branding",
    title: "Branding",
    tagline: "Identidad de marca completa",
    description:
      "Construimos el sistema visual y verbal de tu marca: estrategia, logo, paleta, tipografía, voz y manual. El paquete completo para que tu marca se vea y suene consistente en todos lados.",
    bullets: [
      "Estrategia y posicionamiento",
      "Sistema visual completo",
      "Manual de marca en PDF",
      "Aplicaciones clave",
    ],
    icon: Sparkles,
    priceFrom: 500,
    deliverables: [
      "Manual de marca",
      "Logo y variantes",
      "Paleta y tipografías",
      "Plantillas base",
    ],
    pageUrl: "/servicios/branding",
  },
  {
    id: "logo",
    slug: "identidad-corporativa",
    title: "Identidad corporativa",
    tagline: "Diseño de logo profesional",
    description:
      "Diseñamos tu logo en versión principal, secundaria e isotipo, listo para impresión y digital. Tres propuestas iniciales y dos rondas de ajustes.",
    bullets: [
      "3 propuestas iniciales",
      "2 rondas de ajustes",
      "Archivos vectoriales (AI, SVG, PNG)",
      "Mini guía de uso",
    ],
    icon: Hexagon,
    priceFrom: 400,
    deliverables: [
      "Logo en AI, SVG y PNG",
      "Variantes color, blanco y negro",
      "Mini guía de uso",
    ],
    pageUrl: "/servicios/logo",
  },
  {
    id: "naming",
    slug: "naming",
    title: "Naming",
    tagline: "El nombre correcto para tu marca",
    description:
      "Investigación, generación y validación de nombre con disponibilidad de dominio y filtro lingüístico. Te entregamos entre 10 y 15 propuestas con justificación creativa.",
    bullets: [
      "Investigación de mercado",
      "10–15 propuestas",
      "Filtro lingüístico y legal",
      "Justificación creativa",
    ],
    icon: Type,
    priceFrom: 300,
    deliverables: [
      "Documento de naming",
      "Disponibilidad de dominio",
      "Recomendación final",
    ],
    pageUrl: "/servicios/naming",
  },
  {
    id: "redes-sociales",
    slug: "redes-sociales",
    title: "Diseño para redes sociales",
    tagline: "Plantillas y piezas listas para publicar",
    description:
      "Solo diseño visual: kit de plantillas y publicaciones para Instagram, TikTok y LinkedIn, adaptadas a tu identidad. No incluye pauta ni community management.",
    bullets: [
      "Kit de plantillas editables",
      "Posts e historias",
      "Carruseles",
      "Adaptado a tu identidad",
    ],
    icon: Share2,
    priceFrom: 250,
    deliverables: [
      "Plantillas en Figma o Canva",
      "Set de publicaciones",
      "Guía de uso",
    ],
    pageUrl: "/servicios/redes-sociales",
  },
  {
    id: "web",
    slug: "paginas-web",
    title: "Páginas web",
    tagline: "Sitios rápidos y bien diseñados",
    description:
      "Sitios estáticos o dinámicos en Next.js, optimizados para rendimiento y SEO técnico. Diseño a medida hasta seis secciones.",
    bullets: [
      "Diseño a medida",
      "Next.js + Vercel",
      "SEO técnico",
      "Hasta 6 secciones",
    ],
    icon: Globe,
    priceFrom: 900,
    deliverables: [
      "Sitio en producción",
      "Panel de contenido (opcional)",
      "Capacitación básica",
    ],
    pageUrl: "/servicios/web",
  },
  {
    id: "apps",
    slug: "apps",
    title: "Aplicaciones web y móviles",
    tagline: "Producto digital de extremo a extremo",
    description:
      "Diseño y desarrollo de apps web y móviles con foco en producto, UX y escalabilidad. Auth, pagos, tiempo real e integraciones a la medida.",
    bullets: [
      "UX/UI",
      "Frontend + backend",
      "Auth, pagos, tiempo real",
      "iOS / Android (React Native + Expo)",
    ],
    icon: Smartphone,
    priceFrom: 3000,
    deliverables: ["MVP funcional", "Documentación", "Despliegue"],
    pageUrl: "/servicios/apps",
  },
] as const;

export const getService = (id: ServiceId): Service | undefined =>
  SERVICES.find((s) => s.id === id);

export const SECTION_IDS = [
  "inicio",
  "servicios",
  "portafolio",
  "nosotros",
  "contacto",
] as const;

export type SectionId = (typeof SECTION_IDS)[number];
