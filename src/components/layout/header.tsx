"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { SERVICES } from "@/lib/services";

const NAV = [
  { href: "/#inicio", label: "Inicio" },
  { href: "/#portafolio", label: "Portafolio" },
  { href: "/#nosotros", label: "Nosotros" },
  { href: "/#contacto", label: "Contacto" },
];

const SERVICE_PAGES = SERVICES.filter((s) => s.pageUrl);

export function Header() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function scheduleClose() {
    closeTimer.current = setTimeout(() => setOpen(false), 220);
  }

  function cancelClose() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }

  // Close on outside click
  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-30 bg-cream border-b-2 border-brand">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="font-display text-brand text-2xl tracking-tight uppercase"
        >
          Estudio
        </Link>

        <nav className="hidden md:flex items-center gap-7">
          {/* Servicios dropdown */}
          <div
            ref={dropdownRef}
            className="relative"
            onMouseLeave={scheduleClose}
            onMouseEnter={cancelClose}
          >
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="flex items-center gap-1 text-sm font-medium text-dark hover:text-brand transition-colors"
            >
              Servicios
              <ChevronDown
                className={`h-3.5 w-3.5 opacity-50 transition-transform duration-200 ${open ? "rotate-180 opacity-100" : ""}`}
              />
            </button>

            {open && SERVICE_PAGES.length > 0 && (
              <div className="absolute top-full left-0 mt-2 z-50">
                <div className="bg-cream border-2 border-brand shadow-xl py-1 min-w-[210px]">
                  <Link
                    href="/#servicios"
                    onClick={() => setOpen(false)}
                    className="block px-4 py-2 text-xs font-semibold text-dark/40 uppercase tracking-[0.2em] hover:bg-brand/5"
                  >
                    Ver todos
                  </Link>
                  <div className="border-t border-dark/10 my-1" />
                  {SERVICE_PAGES.map((svc) => (
                    <Link
                      key={svc.id}
                      href={svc.pageUrl!}
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-dark hover:bg-brand hover:text-cream transition-colors group/item"
                    >
                      <svc.icon className="h-4 w-4 text-brand group-hover/item:text-cream transition-colors shrink-0" />
                      <span className="font-medium">{svc.title}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-dark hover:text-brand transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/#contacto"
          className="font-display text-xs bg-brand text-cream px-5 py-2.5 tracking-[0.15em] uppercase hover:bg-accent transition-colors"
        >
          Cotizar
        </Link>
      </div>
    </header>
  );
}
