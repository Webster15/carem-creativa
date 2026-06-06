import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Globe, FolderOpen, Mail, Sparkles } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/whatsapp-button";
import { whatsappLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Links · CaremCreativa",
  description:
    "Todos los enlaces de CaremCreativa en un solo lugar: servicios de diseño, curso de Illustrator, portafolio, WhatsApp y redes sociales.",
  alternates: { canonical: "https://www.caremcreativa.com/bio" },
  openGraph: {
    title: "CaremCreativa — Todos nuestros enlaces",
    description: "Servicios de diseño, curso de Illustrator, portafolio y contacto directo.",
    url: "https://www.caremcreativa.com/bio",
  },
};

/* ── Iconos de marca que no están en lucide ── */
function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64c.3 0 .59.05.86.13V9.4a6.33 6.33 0 00-1-.05A6.34 6.34 0 005 20.1a6.34 6.34 0 0010.86-4.43V8.83a8.27 8.27 0 004.77 1.52v-3.4a4.85 4.85 0 01-1.04-.26z" />
    </svg>
  );
}

type Tile = {
  label: string;
  sub?: string;
  href: string;
  external?: boolean;
  icon: React.ReactNode;
  span: string;
  cls: string;
};

const TILES: Tile[] = [
  {
    label: "Instagram",
    sub: "@caremcreativa",
    href: "https://www.instagram.com/caremcreativa",
    external: true,
    icon: <InstagramIcon className="h-6 w-6" />,
    span: "col-span-1 row-span-1",
    cls: "bg-vivid text-cream hover:brightness-110",
  },
  {
    label: "TikTok",
    sub: "@caremcreativa",
    href: "https://www.tiktok.com/@caremcreativa",
    external: true,
    icon: <TikTokIcon className="h-6 w-6" />,
    span: "col-span-1 row-span-1",
    cls: "bg-dark text-cream hover:bg-dark/90",
  },
  {
    label: "Escríbenos por WhatsApp",
    sub: "Respuesta el mismo día",
    href: whatsappLink("Hola 👋 Te escribo desde su página de enlaces."),
    external: true,
    icon: <WhatsAppIcon className="h-6 w-6" />,
    span: "col-span-2 row-span-1",
    cls: "bg-[#25D366] text-white hover:bg-[#1ebe5d]",
  },
  {
    label: "Nuestros servicios",
    sub: "Branding · Logo · Web · Apps",
    href: "/#servicios",
    icon: <Sparkles className="h-6 w-6" />,
    span: "col-span-2 row-span-1",
    cls: "bg-brand text-cream hover:bg-brand/90",
  },
  {
    label: "Portafolio",
    sub: "Mira nuestros trabajos",
    href: "/#portafolio",
    icon: <FolderOpen className="h-6 w-6" />,
    span: "col-span-1 row-span-1",
    cls: "bg-cream text-dark border-2 border-dark/15 hover:border-dark/40",
  },
  {
    label: "Sitio web",
    sub: "caremcreativa.com",
    href: "/",
    icon: <Globe className="h-6 w-6" />,
    span: "col-span-1 row-span-1",
    cls: "bg-accent text-cream hover:bg-accent/90",
  },
  {
    label: "Escríbenos un correo",
    sub: "Caremcreativa@gmail.com",
    href: "mailto:Caremcreativa@gmail.com",
    external: true,
    icon: <Mail className="h-6 w-6" />,
    span: "col-span-2 lg:col-span-4 row-span-1",
    cls: "bg-cream text-dark border-2 border-dark/15 hover:border-dark/40",
  },
];

function TileInner({ t }: { t: Tile }) {
  return (
    <>
      <div className="flex items-start justify-between">
        <span className="flex items-center justify-center">{t.icon}</span>
        <ArrowUpRight className="h-5 w-5 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
      </div>
      <div>
        <p className="font-display uppercase leading-none tracking-wide text-lg sm:text-xl">
          {t.label}
        </p>
        {t.sub && <p className="text-xs mt-1.5 opacity-75">{t.sub}</p>}
      </div>
    </>
  );
}

export default function BioPage() {
  return (
    <main className="min-h-screen bg-cream">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 py-12 sm:py-16">
        {/* ── Perfil ── */}
        <header className="flex flex-col items-center text-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.png"
            alt="CaremCreativa"
            className="h-24 w-24 rounded-full shadow-lg"
          />
          <h1
            className="font-display text-dark uppercase mt-5 leading-none"
            style={{ fontSize: "clamp(2.5rem, 12vw, 4rem)" }}
          >
            Carem<span className="text-accent">Creativa</span>
          </h1>
          <p className="text-dark/55 text-sm mt-2 max-w-xs">
            Agencia de diseño gráfico · Colombia. Marcas que se notan.
          </p>
        </header>

        {/* ── Anijam — banner destacado arriba ── */}
        <a
          href="https://www.anijam.ai/?src=ins/sc"
          target="_blank"
          rel="noopener noreferrer"
          className="group block mt-8 rounded-2xl overflow-hidden shadow-sm transition-transform hover:scale-[1.01]"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/anijam.png" alt="Anijam — descárgala en Google Play y App Store" className="w-full h-auto" />
        </a>

        {/* ── Curso Illustrator — imagen completa, grande ── */}
        <Link
          href="/cursos/illustrator"
          className="group block mt-4 rounded-2xl overflow-hidden shadow-sm transition-transform hover:scale-[1.01]"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/og-curso-illustrator.png"
            alt="Curso de Adobe Illustrator de 0 a avanzado · 90 videos"
            className="w-full h-auto"
          />
        </Link>

        {/* ── Bento grid de enlaces ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 auto-rows-[120px] sm:auto-rows-[130px] grid-flow-dense mt-4">
          {TILES.map((t) => {
            const cls = `group relative overflow-hidden rounded-2xl p-5 flex flex-col justify-between shadow-sm transition-all hover:scale-[1.02] hover:shadow-md ${t.span} ${t.cls}`;
            return t.external ? (
              <a key={t.label} href={t.href} target="_blank" rel="noopener noreferrer" className={cls}>
                <TileInner t={t} />
              </a>
            ) : (
              <Link key={t.label} href={t.href} className={cls}>
                <TileInner t={t} />
              </Link>
            );
          })}
        </div>

        {/* ── Pie ── */}
        <footer className="mt-12 text-center">
          <Link
            href="/"
            className="font-display text-xs text-dark/40 tracking-[0.2em] uppercase hover:text-brand transition-colors"
          >
            caremcreativa.com
          </Link>
        </footer>
      </div>
    </main>
  );
}
