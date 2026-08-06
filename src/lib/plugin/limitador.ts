/**
 * Vértice — límite de peticiones
 * ---------------------------------------------------------------
 * Protege los endpoints de licencia de que alguien los martillee. El riesgo
 * real NO es que adivinen una clave —el espacio es de 32^12, ni de lejos
 * alcanzable— sino que cada intento consulta Supabase: con suficiente ruido
 * se agota el plan y los clientes de verdad se quedan sin activar.
 *
 * Por eso el contador se mira ANTES de tocar la base de datos.
 *
 * LIMITACIÓN QUE HAY QUE CONOCER
 * El recuento vive en memoria de la instancia. En Vercel hay varias y son
 * efímeras, así que el límite efectivo es más alto que el configurado y se
 * reinicia en cada despliegue. No es un cortafuegos: es un amortiguador que
 * convierte un martilleo trivial en algo que exige repartirse entre IPs.
 *
 * Si algún día hace falta algo firme, el sitio para ponerlo es el WAF de
 * Vercel o un contador en Redis, no aquí.
 */

type Ventana = { hasta: number; n: number };

const memoria = new Map<string, Ventana>();

/** Se limpia de vez en cuando para que el mapa no crezca sin final. */
function purga(ahora: number) {
  if (memoria.size < 5000) return;
  for (const [k, v] of memoria) {
    if (v.hasta <= ahora) memoria.delete(k);
  }
}

export type Resultado = { ok: true } | { ok: false; esperaS: number };

export function limita(clave: string, max: number, ventanaMs: number): Resultado {
  const ahora = Date.now();
  purga(ahora);

  const v = memoria.get(clave);
  if (!v || v.hasta <= ahora) {
    memoria.set(clave, { hasta: ahora + ventanaMs, n: 1 });
    return { ok: true };
  }

  v.n++;
  if (v.n > max) {
    return { ok: false, esperaS: Math.ceil((v.hasta - ahora) / 1000) };
  }
  return { ok: true };
}

/**
 * Quién hace la petición. Detrás de Vercel el primer valor de
 * `x-forwarded-for` es el cliente; los siguientes son proxies.
 *
 * La cabecera es falsificable, así que esto NO sirve para autorizar nada:
 * solo para agrupar peticiones. Quien la falsee se salta el límite, pero
 * entonces ya está en el terreno de un ataque deliberado, que se corta en
 * el WAF y no aquí.
 */
export function quien(req: Request): string {
  const xff = req.headers.get("x-forwarded-for") || "";
  const ip = xff.split(",")[0].trim();
  return ip || req.headers.get("x-real-ip") || "desconocido";
}

/**
 * Comprueba el límite y devuelve la respuesta 429 ya montada si toca.
 * `Retry-After` es la cabecera estándar: un cliente educado la respeta.
 */
export function frena(
  req: Request,
  ambito: string,
  max: number,
  ventanaMs: number
): Response | null {
  const r = limita(`${ambito}:${quien(req)}`, max, ventanaMs);
  if (r.ok) return null;

  console.warn(`[plugin/limite] ${ambito} bloqueado para ${quien(req)}`);
  return new Response(
    JSON.stringify({ error: "Demasiados intentos. Espera un momento." }),
    {
      status: 429,
      headers: {
        "Content-Type": "application/json",
        "Retry-After": String(r.esperaS),
      },
    }
  );
}
