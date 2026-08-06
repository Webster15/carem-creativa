/**
 * Vértice — integración con Wompi (Bancolombia)
 * ---------------------------------------------------------------
 * Web Checkout por redirección y validación de webhooks.
 *
 * Todo el criptográfico usa Web Crypto, así que funciona en el runtime
 * edge de Vercel sin dependencias.
 */

const CHECKOUT = "https://checkout.wompi.co/p/";

/**
 * Sandbox o producción se deduce de la llave PÚBLICA, no de la privada.
 *
 * La pública es la que crea la transacción en el checkout, así que es la que
 * determina en qué entorno vive. Deducirlo de la privada permitía que un par
 * descuadrado (pública de pruebas, privada de producción) consultara el
 * entorno equivocado y no encontrara nunca la transacción, en silencio.
 *
 * Si las dos no concuerdan se deja constancia en el log, porque casi siempre
 * significa que una de las dos se pegó mal.
 */
function entorno(): "prod" | "test" {
  const pub = process.env.NEXT_PUBLIC_WOMPI_PUBLIC_KEY ?? "";
  const prv = process.env.WOMPI_PRIVATE_KEY ?? "";

  if (pub.startsWith("pub_prod_") || pub.startsWith("pub_test_")) {
    const porPublica = pub.startsWith("pub_prod_") ? "prod" : "test";
    const porPrivada = prv.startsWith("prv_prod_")
      ? "prod"
      : prv.startsWith("prv_test_")
        ? "test"
        : null;
    if (porPrivada && porPrivada !== porPublica) {
      console.error(
        `[wompi] las llaves no concuerdan: la pública es de ${porPublica} y ` +
          `la privada de ${porPrivada}. Se usa ${porPublica}, que es el entorno ` +
          `donde se crean las transacciones. Revisa las variables de entorno.`
      );
    }
    return porPublica;
  }

  // Sin pública reconocible se cae a la privada, y si tampoco, a pruebas:
  // equivocarse hacia sandbox nunca mueve dinero real.
  return prv.startsWith("prv_prod_") ? "prod" : "test";
}

function api(): string {
  return entorno() === "prod"
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
 * Testigo firmado que viaja en la URL de retorno.
 *
 * La página de gracias no puede consultar la API de Wompi: su cortafuegos
 * devuelve 403 a las peticiones que salen de un centro de datos, incluso
 * autenticadas. Así que, en lugar de verificar la transacción contra Wompi,
 * se firma la referencia al iniciar la compra y se comprueba a la vuelta.
 *
 * Sin esto bastaría con adivinar un identificador de transacción ajeno para
 * ver la clave de otra persona: los identificadores de Wompi llevan una
 * marca de tiempo y son parcialmente predecibles.
 */
export async function tokenRetorno(referencia: string): Promise<string> {
  const secreto = process.env.WOMPI_INTEGRITY_SECRET;
  if (!secreto) throw new Error("Falta WOMPI_INTEGRITY_SECRET");
  // El prefijo separa este uso del de la firma de integridad de Wompi, para
  // que un mismo secreto no genere valores intercambiables entre los dos.
  return sha256(`gracias:${referencia}:${secreto}`);
}

/** Comparación en tiempo constante, para no filtrar el testigo por temporización. */
export function tokenValido(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let dif = 0;
  for (let i = 0; i < a.length; i++) dif |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return dif === 0;
}

/**
 * NO USAR desde Vercel: el cortafuegos de Wompi responde 403 a las peticiones
 * que salen de un centro de datos. Se conserva por si algún día se ejecuta
 * desde una red permitida.
 */
export async function consultaTransaccion(id: string): Promise<TransaccionWompi | null> {
  const base = api();

  // La consulta de transacciones es pública, pero desde un centro de datos
  // Wompi responde 403 si va sin autenticar. Se manda la llave privada
  // cuando la hay: es una petición servidor a servidor, nunca llega al
  // navegador.
  const prv = process.env.WOMPI_PRIVATE_KEY ?? "";
  const cabeceras: Record<string, string> = { Accept: "application/json" };
  if (prv.startsWith("prv_test_") || prv.startsWith("prv_prod_")) {
    cabeceras.Authorization = `Bearer ${prv}`;
  }

  try {
    const res = await fetch(`${base}/transactions/${encodeURIComponent(id)}`, {
      headers: cabeceras,
      signal: AbortSignal.timeout(8000),
      cache: "no-store",
    });
    if (!res.ok) {
      // Antes se devolvía null sin más, y un 404 por consultar el entorno
      // equivocado era indistinguible de una transacción inexistente.
      const detalle = await res.text().catch(() => "");
      console.error(
        `[wompi] ${res.status} al consultar ${id} en ${base} ` +
          `(entorno ${entorno()}, autenticada: ${!!cabeceras.Authorization}) ` +
          detalle.slice(0, 300)
      );
      return null;
    }
    const d = (await res.json()) as { data?: TransaccionWompi };
    return d?.data ?? null;
  } catch (e) {
    console.error(`[wompi] error consultando ${id} en ${base}`, e);
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
