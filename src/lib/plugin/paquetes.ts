/**
 * Vértice — paquetes firmados de las herramientas de pago
 * ---------------------------------------------------------------
 * Se importan como módulos JSON en lugar de leerlos del disco: así
 * funcionan en el runtime edge y quedan versionados con el código.
 *
 * Cada paquete lleva el código de la herramienta y su firma Ed25519. El
 * panel verifica esa firma antes de evaluar nada en Illustrator, de modo
 * que ni siquiera un servidor comprometido puede inyectar código.
 *
 * Los archivos los genera  servidor/empaquetar.js  del proyecto del plugin.
 * Tras cada cambio hay que volver a copiarlos aquí.
 */

import construccion from "@/plugin-herramientas/construccion.json";
import reticula from "@/plugin-herramientas/reticula.json";
import mesasColor from "@/plugin-herramientas/mesasColor.json";
import areaRespeto from "@/plugin-herramientas/areaRespeto.json";

export type Paquete = {
  id: string;
  version: string;
  firma: string;
  codigo: string;
};

const PAQUETES: Record<string, Paquete> = {
  construccion,
  reticula,
  mesasColor,
  areaRespeto,
};

export function paqueteDe(id: string): Paquete | null {
  return PAQUETES[id] ?? null;
}

export function versiones(): Record<string, string> {
  const r: Record<string, string> = {};
  for (const [id, p] of Object.entries(PAQUETES)) r[id] = p.version;
  return r;
}
