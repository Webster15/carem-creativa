import { NextResponse } from "next/server";
import { z } from "zod";
import { esProducto, PRODUCTOS } from "@/lib/plugin/precios";
import { creaCheckout, nuevaReferencia, tokenRetorno } from "@/lib/plugin/lemonsqueezy";
import { frena } from "@/lib/plugin/limitador";

/**
 * Arranca una compra y devuelve la URL del checkout de Lemon Squeezy.
 *
 * El precio no viaja desde el navegador: lo pone Lemon Squeezy a partir de la
 * variante. Aquí solo se elige QUÉ se compra, nunca por cuánto.
 */

const Body = z.object({
  producto: z.string(),
  correo: z.email().optional(),
});

export const runtime = "edge";

export async function POST(req: Request) {
  // Cada llamada crea un checkout real en Lemon Squeezy y consume su cuota.
  // Se deja holgado: alguien indeciso puede pulsar varios productos seguidos.
  const freno = frena(req, "checkout", 20, 60_000);
  if (freno) return freno;

  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido." }, { status: 400 });
  }

  const parsed = Body.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Datos inválidos." }, { status: 400 });
  }

  const { producto, correo } = parsed.data;
  if (!esProducto(producto)) {
    return NextResponse.json({ error: "Producto desconocido." }, { status: 400 });
  }

  try {
    const referencia = nuevaReferencia(producto);
    const base = process.env.SITIO_URL || new URL(req.url).origin;

    // El testigo acredita en la vuelta que esta compra la inició este servidor.
    const token = await tokenRetorno(referencia);

    const url = await creaCheckout({
      producto,
      referencia,
      correo,
      urlRetorno: `${base}/plugin/gracias?ref=${encodeURIComponent(referencia)}&t=${token}`,
    });

    return NextResponse.json({
      url,
      referencia,
      nombre: PRODUCTOS[producto].nombre,
      usd: PRODUCTOS[producto].usd,
    });
  } catch (e) {
    console.error("[plugin/checkout]", e);
    return NextResponse.json(
      { error: "No se pudo iniciar el pago. Inténtalo de nuevo." },
      { status: 500 }
    );
  }
}
