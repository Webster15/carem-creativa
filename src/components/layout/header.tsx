"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { SERVICES } from "@/lib/services";
import { whatsappLink } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/ui/whatsapp-button";

const NAV = [
  { href: "/#inicio", label: "Inicio" },
  { href: "/#portafolio", label: "Portafolio" },
  { href: "/#nosotros", label: "Nosotros" },
  { href: "/#contacto", label: "Contacto" },
];

const COURSES_NAV = [
  { href: "/cursos/illustrator", label: "Adobe Illustrator" },
];

const SERVICE_PAGES = SERVICES.filter((s) => s.pageUrl);

export function Header() {
  const [open, setOpen] = useState(false);
  const [openCourses, setOpenCourses] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const coursesRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeCoursesTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function scheduleCloseCourses() {
    closeCoursesTimer.current = setTimeout(() => setOpenCourses(false), 220);
  }
  function cancelCloseCourses() {
    if (closeCoursesTimer.current) clearTimeout(closeCoursesTimer.current);
  }

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

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (coursesRef.current && !coursesRef.current.contains(e.target as Node)) {
        setOpenCourses(false);
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
          CaremCreativa
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

          {/* Cursos dropdown */}
          <div
            ref={coursesRef}
            className="relative"
            onMouseLeave={scheduleCloseCourses}
            onMouseEnter={cancelCloseCourses}
          >
            <button
              type="button"
              onClick={() => setOpenCourses((v) => !v)}
              className="flex items-center gap-1 text-sm font-medium text-accent hover:text-brand transition-colors"
            >
              Cursos
              <ChevronDown
                className={`h-3.5 w-3.5 opacity-70 transition-transform duration-200 ${openCourses ? "rotate-180 opacity-100" : ""}`}
              />
            </button>

            {openCourses && (
              <div className="absolute top-full left-0 mt-2 z-50">
                <div className="bg-cream border-2 border-accent shadow-xl py-1 min-w-[210px]">
                  {COURSES_NAV.map((course) => (
                    <Link
                      key={course.href}
                      href={course.href}
                      onClick={() => setOpenCourses(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-dark hover:bg-accent hover:text-cream transition-colors"
                    >
                      <span className="text-accent text-base leading-none hover:text-cream">🎨</span>
                      <span className="font-medium">{course.label}</span>
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

          <a
            href="https://lab.caremcreativa.com"
            target="_blank"
            rel="noopener noreferrer"
            className="relative inline-flex items-center gap-1.5 font-display text-xs bg-brand text-cream px-4 py-1.5 tracking-[0.12em] uppercase hover:bg-dark transition-colors"
          >
            <span className="absolute -top-1.5 -right-1.5 bg-accent text-cream text-[9px] font-bold px-1.5 py-0.5 leading-none uppercase tracking-wide">
              nuevo
            </span>
            ⚗ Lab
          </a>
        </nav>

        <a
          href={whatsappLink("Hola 👋 Quiero cotizar un proyecto de diseño.")}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 font-display text-xs bg-[#25D366] text-white px-5 py-2.5 tracking-[0.15em] uppercase hover:bg-[#1ebe5d] transition-colors"
        >
          <WhatsAppIcon className="h-3.5 w-3.5" />
          Cotizar
        </a>
      </div>
    </header>
  );
}
