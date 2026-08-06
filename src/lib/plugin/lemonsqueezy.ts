/**
 * Vértice — integración con Lemon Squeezy
 * ---------------------------------------------------------------
 * Sustituye a Wompi, que solo liquidaba en pesos colombianos. Lemon Squeezy
 * actúa como *merchant of record*: cobra en dólares desde cualquier país y se
 * hace cargo del IVA y del impuesto de ventas de cada jurisdicción.
 *
 * SEGURIDAD — dos reglas que sostienen todo lo demás:
 *
 *   1. El producto se deduce del `variant_id` que manda Lemon Squeezy, NUNCA
 *      de los datos que viajan con el comprador. Si nos fiáramos de `custom`,
 *      cualquiera podría pagar una herramienta suelta de 6 USD y pedir el pack.
 *
 *   2. El webhook se rechaza si la firma no cuadra. Sin eso, una petición
 *      falsa bastaría para emitir licencias gratis.
 */

import type { IdProducto } from "./precios";

const API = "https://api.lemonsqueezy.com/v1";

/** Tienda «Vertice by caremcreativa». No es un secreto. */
const TIENDA = process.env.LEMONSQUEEZY_STORE_ID || "446988";

/**
 * Producto -> variante de Lemon Squeezy.
 *
 * Estos identificadores se leyeron de la API con la tienda ya creada. No se
 * ha comprobado que el modo real use los mismos que el de pruebas; si al
 * activar la tienda los pagos empiezan a fallar, el webhook registra el
 * `variant_id` recibido para que la corrección sea evidente.
 */
const VARIANTES: Record<IdProducto, string> = {
  pack: "1990536",
  construccion: "1990544",
  reticula: "1990549",
  mesasColor: "1990562",
  areaRespeto: "1990579",
};

const POR_VARIANTE: Record<string, IdProducto> = Object.fromEntries(
  Object.entries(VARIANTES).map(([p, v]) => [v, p as IdProducto])
);

export function productoDeVariante(variante: string | number): IdProducto | null {
  return POR_VARIANTE[String(variante)] ?? null;
}

// ---------------------------------------------------------------
// Referencias y testigo de retorno
// ---------------------------------------------------------------

/** Referencia propia. Viaja en `custom` y ata la vuelta con la licencia. */
export function nuevaReferencia(producto: IdProducto): string {
  const azar = crypto.randomUUID().replace(/-/g, "").slice(0, 10);
  return `VT-${producto}-${Date.now().toString(36)}-${azar}`.toUpperCase();
}

function secretoTestigo(): string {
  const s = process.env.LEMONSQUEEZY_WEBHOOK_SECRET;
  if (!s) throw new Error("Falta LEMONSQUEEZY_WEBHOOK_SECRET");
  return s;
}

async function sha256Hex(texto: string): Promise<string> {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(texto));
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

/**
 * Testigo que acredita que esta compra la inició este servidor.
 *
 * El id de la compra viaja por la URL, que controla el navegador. Sin el
 * testigo bastaría con adivinar la referencia de otra persona para ver su
 * clave. Lleva el prefijo «gracias:» para separar dominios: aunque comparta
 * secreto con la firma del webhook, un valor no sirve para lo otro.
 */
export function tokenRetorno(referencia: string): Promise<string> {
  return sha256Hex(`gracias:${referencia}:${secretoTestigo()}`);
}

/** Comparación en tiempo constante: evita filtrar el testigo byte a byte. */
export function tokenValido(esperado: string, recibido: string): boolean {
  if (esperado.length !== recibido.length) return false;
  let d = 0;
  for (let i = 0; i < esperado.length; i++) {
    d |= esperado.charCodeAt(i) ^ recibido.charCodeAt(i);
  }
  return d === 0;
}

// ---------------------------------------------------------------
// Checkout
// ---------------------------------------------------------------

export async function creaCheckout(opciones: {
  producto: IdProducto;
  referencia: string;
  urlRetorno: string;
  correo?: string;
}): Promise<string> {
  const clave = process.env.LEMONSQUEEZY_API_KEY;
  if (!clave) throw new Error("Falta LEMONSQUEEZY_API_KEY");

  const variante = VARIANTES[opciones.producto];
  if (!variante) throw new Error(`Sin variante para ${opciones.producto}`);

  const res = await fetch(`${API}/checkouts`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${clave}`,
      "Content-Type": "application/vnd.api+json",
      Accept: "application/vnd.api+json",
    },
    body: JSON.stringify({
      data: {
        type: "checkouts",
        attributes: {
          checkout_data: {
            ...(opciones.correo ? { email: opciones.correo } : {}),
            // Solo sirve para reencontrar la compra al volver. El producto NO
            // se decide aquí: se decide por la variante.
            custom: { referencia: opciones.referencia },
          },
          product_options: {
            redirect_url: opciones.urlRetorno,
            enabled_variants: [Number(variante)],
          },
        },
        relationships: {
          store: { data: { type: "stores", id: String(TIENDA) } },
          variant: { data: { type: "variants", id: String(variante) } },
        },
      },
    }),
  });

  const texto = await res.text();
  if (!res.ok) {
    // El cuerpo de Lemon Squeezy dice exactamente qué falla (clave de pruebas
    // en producción, tienda sin activar, variante inexistente...).
    throw new Error(`Lemon Squeezy ${res.status}: ${texto.slice(0, 300)}`);
  }

  const d = JSON.parse(texto) as { data?: { attributes?: { url?: string } } };
  const url = d?.data?.attributes?.url;
  if (!url) throw new Error("Lemon Squeezy no devolvió URL de checkout");
  return url;
}

// ---------------------------------------------------------------
// Webhook
// ---------------------------------------------------------------

export type EventoLS = {
  meta?: { event_name?: string; custom_data?: { referencia?: string } };
  data?: {
    id?: string;
    attributes?: {
      status?: string;
      user_email?: string;
      identifier?: string;
      order_number?: number;
      total?: number;
      currency?: string;
      first_order_item?: { variant_id?: number; variant_name?: string };
    };
  };
};

/**
 * Comprueba la cabecera X-Signature: HMAC-SHA256 del cuerpo en crudo.
 * Hay que pasarle el texto tal cual llegó, no el JSON reserializado: cualquier
 * diferencia de espacios o de orden cambiaría la firma.
 */
export async function firmaValida(
  cuerpoCrudo: string,
  cabecera: string | null
): Promise<boolean> {
  if (!cabecera) return false;

  const secreto = process.env.LEMONSQUEEZY_WEBHOOK_SECRET;
  if (!secreto) {
    console.error("[lemonsqueezy] falta LEMONSQUEEZY_WEBHOOK_SECRET");
    return false;
  }

  const llave = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secreto),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const firma = await crypto.subtle.sign(
    "HMAC",
    llave,
    new TextEncoder().encode(cuerpoCrudo)
  );
  const esperado = [...new Uint8Array(firma)]
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  return tokenValido(esperado, cabecera.trim().toLowerCase());
}
