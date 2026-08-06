/**
 * LogoForge — licencias en Supabase
 * ---------------------------------------------------------------
 * Se habla con Supabase por su API REST con fetch, sin añadir el SDK:
 * así funciona en el runtime edge y no crece el package.json.
 *
 * Usa la clave de SERVICIO, que salta las políticas de acceso por filas.
 * Solo puede vivir en el servidor; jamás debe llegar al navegador.
 */

import type { IdHerramienta, IdProducto } from "./precios";
import { PRODUCTOS } from "./precios";

export type Licencia = {
  clave: string;
  correo: string;
  herramientas: IdHerramienta[];
  producto: string;
  referencia: string | null;
  estado: "activa" | "anulada";
  max_equipos: number;
};

function conf() {
  // Misma variable que usa lab, para no duplicar credenciales.
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("Faltan NEXT_PUBLIC_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY");
  // El panel muestra la URL con /rest/v1/ al final; aquí se quiere solo el
  // dominio, así que se tolera que llegue de cualquiera de las dos formas.
  return { url: url.replace(/\/+$/, "").replace(/\/rest\/v1$/, ""), key };
}

async function sb(ruta: string, init: RequestInit = {}) {
  const { url, key } = conf();
  const res = await fetch(`${url}/rest/v1/${ruta}`, {
    ...init,
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      ...(init.headers || {}),
    },
    cache: "no-store",
  });
  if (!res.ok) {
    const texto = await res.text();
    throw new Error(`Supabase ${res.status}: ${texto.slice(0, 200)}`);
  }
  return res.status === 204 ? null : res.json();
}

// ---------------------------------------------------------------
// Claves
// ---------------------------------------------------------------

// Sin I, O, 0 ni 1: se confunden al copiarlas a mano de un correo.
const ALFABETO = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

export function generaClave(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(12));
  const letras = Array.from(bytes, (b) => ALFABETO[b % ALFABETO.length]);
  return (
    "LF-" +
    letras.slice(0, 4).join("") +
    "-" +
    letras.slice(4, 8).join("") +
    "-" +
    letras.slice(8, 12).join("")
  );
}

export function normaliza(clave: string): string {
  return String(clave || "").trim().toUpperCase();
}

// ---------------------------------------------------------------
// Operaciones
// ---------------------------------------------------------------

/** ¿Ya se emitió licencia para esta transacción? Evita duplicar por reintentos. */
export async function licenciaDeTransaccion(transaccion: string): Promise<Licencia | null> {
  const r = (await sb(
    `licencias?transaccion=eq.${encodeURIComponent(transaccion)}&select=*&limit=1`
  )) as Licencia[];
  return r?.[0] ?? null;
}

export async function licenciaDeReferencia(referencia: string): Promise<Licencia | null> {
  const r = (await sb(
    `licencias?referencia=eq.${encodeURIComponent(referencia)}&select=*&limit=1`
  )) as Licencia[];
  return r?.[0] ?? null;
}

export async function buscaLicencia(clave: string): Promise<Licencia | null> {
  const r = (await sb(
    `licencias?clave=eq.${encodeURIComponent(normaliza(clave))}&select=*&limit=1`
  )) as Licencia[];
  return r?.[0] ?? null;
}

/** Crea la licencia tras un pago aprobado. Devuelve la existente si ya estaba. */
export async function creaLicencia(datos: {
  producto: IdProducto;
  correo: string;
  referencia: string;
  transaccion: string;
  centavos: number;
  usd: number;
}): Promise<{ licencia: Licencia; nueva: boolean }> {
  const ya = await licenciaDeTransaccion(datos.transaccion);
  if (ya) return { licencia: ya, nueva: false };

  const fila = {
    clave: generaClave(),
    correo: datos.correo.toLowerCase(),
    herramientas: PRODUCTOS[datos.producto].herramientas,
    producto: datos.producto,
    referencia: datos.referencia,
    transaccion: datos.transaccion,
    monto_cop: Math.round(datos.centavos / 100),
    monto_usd: datos.usd,
    estado: "activa" as const,
    max_equipos: Number(process.env.PLUGIN_MAX_EQUIPOS || 2),
  };

  const r = (await sb("licencias", {
    method: "POST",
    headers: { Prefer: "return=representation" },
    body: JSON.stringify(fila),
  })) as Licencia[];

  return { licencia: r[0], nueva: true };
}

// ---------------------------------------------------------------
// Activaciones por equipo
// ---------------------------------------------------------------

export async function equiposDe(clave: string): Promise<string[]> {
  const r = (await sb(
    `activaciones?clave=eq.${encodeURIComponent(normaliza(clave))}&select=huella`
  )) as { huella: string }[];
  return (r || []).map((x) => x.huella);
}

export type ResultadoActivacion =
  | { ok: true; licencia: Licencia }
  | { ok: false; codigo: number; error: string };

export async function activaEquipo(
  clave: string,
  huella: string
): Promise<ResultadoActivacion> {
  const lic = await buscaLicencia(clave);
  if (!lic) return { ok: false, codigo: 404, error: "La clave de licencia no existe." };
  if (lic.estado !== "activa") {
    return { ok: false, codigo: 403, error: "Esta licencia está anulada." };
  }

  const equipos = await equiposDe(clave);
  if (!equipos.includes(huella)) {
    if (equipos.length >= lic.max_equipos) {
      return {
        ok: false,
        codigo: 409,
        error:
          `Esta clave ya está activada en ${lic.max_equipos} equipos. ` +
          `Desactívala en uno para liberar la plaza.`,
      };
    }
    await sb("activaciones", {
      method: "POST",
      headers: { Prefer: "resolution=merge-duplicates" },
      body: JSON.stringify({ clave: normaliza(clave), huella }),
    });
  }

  return { ok: true, licencia: lic };
}

export async function validaEquipo(
  clave: string,
  huella: string
): Promise<ResultadoActivacion> {
  const lic = await buscaLicencia(clave);
  if (!lic) return { ok: false, codigo: 404, error: "La clave de licencia ya no es válida." };
  if (lic.estado !== "activa") {
    return { ok: false, codigo: 403, error: "Esta licencia está anulada." };
  }
  const equipos = await equiposDe(clave);
  if (!equipos.includes(huella)) {
    return { ok: false, codigo: 403, error: "Este equipo no está activado con esa clave." };
  }
  return { ok: true, licencia: lic };
}

export async function desactivaEquipo(clave: string, huella: string): Promise<void> {
  await sb(
    `activaciones?clave=eq.${encodeURIComponent(normaliza(clave))}` +
      `&huella=eq.${encodeURIComponent(huella)}`,
    { method: "DELETE" }
  );
}
