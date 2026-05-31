"use client";

import { useConversationClientTool } from "@elevenlabs/react";
import { useRouter, usePathname } from "next/navigation";
import {
  SECTION_IDS,
  SERVICE_IDS,
  getService,
  type SectionId,
  type ServiceId,
} from "@/lib/services";
import { useAgentUI } from "./agent-ui-context";

function scrollToId(id: string) {
  if (typeof document === "undefined") return false;
  const el = document.getElementById(id);
  if (!el) return false;
  // scrollIntoView con block:"start" respeta el scroll-mt-16 de CSS
  // y funciona de forma nativa en todos los navegadores incluyendo Safari iOS
  el.scrollIntoView({ behavior: "smooth", block: "start" });
  return true;
}

function isServiceId(v: unknown): v is ServiceId {
  return (
    typeof v === "string" && (SERVICE_IDS as readonly string[]).includes(v)
  );
}

function isSectionId(v: unknown): v is SectionId {
  return (
    typeof v === "string" && (SECTION_IDS as readonly string[]).includes(v)
  );
}

export function ClientTools() {
  const { actions } = useAgentUI();
  const router = useRouter();
  const pathname = usePathname();

  useConversationClientTool("mostrarServicio", (params) => {
    const serviceId = params.serviceId;
    const abrirDetalle = Boolean(params.abrirDetalle);
    const seccion = typeof params.seccion === "string" ? params.seccion.trim() : "";
    if (!isServiceId(serviceId)) {
      return `No conozco ese servicio. Disponibles: ${SERVICE_IDS.join(", ")}.`;
    }
    const svc = getService(serviceId)!;
    actions.highlightService(serviceId);
    if (abrirDetalle && svc.pageUrl) {
      // Navegar a la página del servicio, opcionalmente a una sección
      const target = seccion ? `${svc.pageUrl}#${seccion}` : svc.pageUrl;
      // Delay para que ElevenLabs procese el tool call antes de navegar
      setTimeout(() => router.push(target), 300);
      return `Abriendo página de ${svc.title}${seccion ? `, sección ${seccion}` : ""}.`;
    }
    const ok = scrollToId(`servicio-${svc.slug}`);
    if (!ok) scrollToId("servicios");
    return `Mostrando ${svc.title}.`;
  });

  useConversationClientTool("resaltarSeccion", (params) => {
    const sectionId = typeof params.sectionId === "string" ? params.sectionId.trim() : "";
    if (!sectionId) return "Sección desconocida.";
    // Si es una ruta URL (empieza con "/"), navegar a esa página
    if (sectionId.startsWith("/")) {
      setTimeout(() => router.push(sectionId), 300);
      return `Navegando a ${sectionId}.`;
    }
    scrollToId(sectionId);
    return `Yendo a ${sectionId}.`;
  });

  useConversationClientTool("mostrarPortafolio", () => {
    scrollToId("portafolio");
    return "Mostrando portafolio.";
  });

  useConversationClientTool("irAServicio", (params) => {
    const slug = typeof params.slug === "string" ? params.slug.trim() : "";
    const seccion = typeof params.seccion === "string" ? params.seccion.trim() : "";
    if (!slug) return "Necesito el identificador del servicio.";
    const targetPath = `/servicios/${slug}`;
    if (pathname === targetPath) {
      if (seccion) scrollToId(seccion);
      return `Mostrando ${seccion || slug}.`;
    }
    setTimeout(() => router.push(`${targetPath}${seccion ? `#${seccion}` : ""}`), 300);
    return `Abriendo página de ${slug}.`;
  });

  useConversationClientTool("agendarContacto", (params) => {
    const nombre = typeof params.nombre === "string" ? params.nombre : "";
    const email = typeof params.email === "string" ? params.email : "";
    const mensaje = typeof params.mensaje === "string" ? params.mensaje : "";
    if (!nombre || !email) {
      return "Necesito al menos nombre y email para agendar.";
    }
    actions.setContactDraft({ nombre, email, mensaje });
    scrollToId("contacto");
    return `Tomé nota: ${nombre}, ${email}. Por favor revisa el formulario y pulsa Enviar.`;
  });

  return null;
}
