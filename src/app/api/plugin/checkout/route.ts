import { NextResponse } from "next/server";
import { z } from "zod";
import { esProducto, precioCop, PRODUCTOS } from "@/lib/plugin/precios";
import { nuevaReferencia, urlCheckout } from "@/lib/plugin/wompi";

/**
 * Arranca una compra: calcula el precio en pesos, firma la referencia y
 * devuelve la URL del checkout de Wompi.
 *
 * La firma se hace aquí y no en el navegador porque lleva el secreto de
 * integridad. Si se calculase en el cliente, cualquiera podría cambiar el
 * importe y pagar un euro por el pack.
 */

const Body = z.object({
  producto: z.string(),
  correo: z.email().optional(),
});

export const runtime = "edge";

export async function POST(req: Request) {
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
    const precio = await precioCop(producto);
    const referencia = nuevaReferencia(producto);
    const base = process.env.SITIO_URL || new URL(req.url).origin;

    const url = await urlCheckout({
      referencia,
      centavos: precio.centavos,
      urlRedireccion: `${base}/plugin/gracias`,
      correo,
    });

    return NextResponse.json({
      url,
      referencia,
      nombre: PRODUCTOS[producto].nombre,
      cop: precio.cop,
      usd: precio.usd,
    });
  } catch (e) {
    console.error("[plugin/checkout]", e);
    return NextResponse.json(
      { error: "No se pudo iniciar el pago. Inténtalo de nuevo." },
      { status: 500 }
    );
  }
}
