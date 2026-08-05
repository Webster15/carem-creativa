/**
 * LogoForge — integración con Wompi (Bancolombia)
 * ---------------------------------------------------------------
 * Web Checkout por redirección y validación de webhooks.
 *
 * Todo el criptográfico usa Web Crypto, así que funciona en el runtime
 * edge de Vercel sin dependencias.
 */

const CHECKOUT = "https://checkout.wompi.co/p/";

/**
 * Sandbox o producción se deduce del prefijo de la llave privada, igual que
 * en el proyecto lab: así no hay una variable de entorno que pueda quedar
 * desincronizada con las credenciales.
 */
function api(): string {
  const key = process.env.WOMPI_PRIVATE_KEY ?? "";
  return key.startsWith("prv_prod_")
    ? "https://production.wompi.co/v1"
    : "https://sandbox.wompi.co/v1";
}

async function sha256(texto: string): Promise<string> {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(texto));
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/**
 * Firma de integridad del Web Checkout.
 * Wompi exige exactamente este orden: referencia + centavos + moneda + secreto.
 * Debe calcularse SIEMPRE en el servidor: el secreto no puede llegar al navegador.
 */
export async function firmaIntegridad(
  referencia: string,
  centavos: number,
  moneda = "COP"
): Promise<string> {
  const secreto = process.env.WOMPI_INTEGRITY_SECRET;
  if (!secreto) throw new Error("Falta WOMPI_INTEGRITY_SECRET");
  return sha256(`${referencia}${centavos}${moneda}${secreto}`);
}

/** URL del checkout alojado, lista para redirigir al comprador. */
export async function urlCheckout(opciones: {
  referencia: string;
  centavos: number;
  urlRedireccion: string;
  correo?: string;
}): Promise<string> {
  const publica = process.env.NEXT_PUBLIC_WOMPI_PUBLIC_KEY;
  if (!publica) throw new Error("Falta NEXT_PUBLIC_WOMPI_PUBLIC_KEY");

  const firma = await firmaIntegridad(opciones.referencia, opciones.centavos);

  const p = new URLSearchParams({
    "public-key": publica,
    currency: "COP",
    "amount-in-cents": String(opciones.centavos),
    reference: opciones.referencia,
    "signature:integrity": firma,
    "redirect-url": opciones.urlRedireccion,
  });
  if (opciones.correo) p.set("customer-data:email", opciones.correo);

  return `${CHECKOUT}?${p.toString()}`;
}

// ---------------------------------------------------------------
// Webhooks
// ---------------------------------------------------------------

export type EventoWompi = {
  event: string;
  data: { transaction?: TransaccionWompi };
  environment: string;
  signature: { properties: string[]; checksum: string };
  timestamp: number;
  sent_at: string;
};

export type TransaccionWompi = {
  id: string;
  status: "APPROVED" | "DECLINED" | "VOIDED" | "ERROR" | "PENDING";
  reference: string;
  amount_in_cents: number;
  currency: string;
  customer_email?: string;
  payment_method_type?: string;
};

/** Lee una propiedad anidada del tipo "transaction.status". */
function propiedad(evento: EventoWompi, ruta: string): unknown {
  return ruta.split(".").reduce<unknown>((acc, parte) => {
    if (acc && typeof acc === "object" && parte in acc) {
      return (acc as Record<string, unknown>)[parte];
    }
    return undefined;
  }, evento.data);
}

/**
 * Comprueba que el evento viene realmente de Wompi.
 * Se concatenan los valores de los campos que el propio evento lista en
 * signature.properties, después el timestamp y por último tu secreto de
 * eventos; el SHA256 debe coincidir con el checksum recibido.
 *
 * Sin esta comprobación, cualquiera podría fabricar un pago aprobado y
 * conseguir una licencia gratis.
 */
export async function eventoValido(
  evento: EventoWompi,
  checksumCabecera?: string | null
): Promise<boolean> {
  const secreto = process.env.WOMPI_EVENTS_SECRET;
  if (!secreto) {
    console.error("[wompi] falta WOMPI_EVENTS_SECRET");
    return false;
  }
  if (!evento?.signature?.properties || !Array.isArray(evento.signature.properties)) {
    return false;
  }

  const valores = evento.signature.properties.map((p) => String(propiedad(evento, p) ?? ""));
  const calculado = await sha256(`${valores.join("")}${evento.timestamp}${secreto}`);

  const esperado = (checksumCabecera || evento.signature.checksum || "").toLowerCase();
  return calculado === esperado;
}

/**
 * Consulta el estado real de una transacción contra la API.
 * Se usa en la página de retorno: el parámetro de la URL lo controla el
 * navegador, así que no basta con creerse lo que traiga.
 */
export async function consultaTransaccion(id: string): Promise<TransaccionWompi | null> {
  try {
    const res = await fetch(`${api()}/transactions/${encodeURIComponent(id)}`, {
      signal: AbortSignal.timeout(8000),
      cache: "no-store",
    });
    if (!res.ok) return null;
    const d = (await res.json()) as { data?: TransaccionWompi };
    return d?.data ?? null;
  } catch (e) {
    console.error("[wompi] error consultando transacción", e);
    return null;
  }
}

/** Referencia única de pago. Codifica el producto para poder leerlo luego. */
export function nuevaReferencia(producto: string): string {
  const azar = crypto.getRandomValues(new Uint8Array(6));
  const sufijo = Array.from(azar)
    .map((b) => b.toString(36).padStart(2, "0"))
    .join("");
  return `LF-${producto}-${Date.now().toString(36)}-${sufijo}`.toUpperCase();
}

/** Extrae el producto de una referencia generada por nuevaReferencia. */
export function productoDeReferencia(referencia: string): string | null {
  const partes = String(referencia).split("-");
  return partes.length >= 4 ? partes[1] : null;
}
