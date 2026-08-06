import { NextResponse } from "next/server";
import { firmaValida, productoDeVariante, type EventoLS } from "@/lib/plugin/lemonsqueezy";
import { creaLicencia } from "@/lib/plugin/licencias";
import { PRODUCTOS } from "@/lib/plugin/precios";
import { enviaClave } from "@/lib/plugin/correo";

/**
 * Webhook de Lemon Squeezy. Al completarse un pedido se emite la licencia y
 * se envía la clave por correo.
 *
 * CÓDIGOS DE RESPUESTA
 * Lemon Squeezy reintenta cuando no recibe un 2xx, y de eso depende que no se
 * pierda una venta:
 *
 *   200  cuando no hay nada que hacer (otro tipo de evento, pedido no pagado,
 *        variante que no reconocemos). Reintentar no lo arreglaría.
 *   5xx  cuando falla algo NUESTRO al emitir, típicamente que Supabase esté
 *        dormido (el plan gratuito pausa los proyectos por inactividad). Así
 *        el reintento la encuentra despierta.
 *
 * La emisión es idempotente: la columna `transaccion` es única, de modo que
 * varios reintentos nunca generan dos licencias.
 */

export const runtime = "nodejs";

export async function POST(req: Request) {
  // El cuerpo en crudo, sin reserializar: la firma se calcula sobre estos
  // bytes exactos y cualquier cambio de espacios la invalidaría.
  const crudo = await req.text();

  // Sin esta comprobación cualquiera podría fabricar un pago y darse licencias.
  if (!(await firmaValida(crudo, req.headers.get("x-signature")))) {
    console.error("[plugin/webhook] firma inválida");
    return NextResponse.json({ error: "Firma inválida." }, { status: 401 });
  }

  let evento: EventoLS;
  try {
    evento = JSON.parse(crudo);
  } catch {
    return NextResponse.json({ error: "JSON inválido." }, { status: 400 });
  }

  const tipo = evento.meta?.event_name;
  if (tipo !== "order_created") {
    return NextResponse.json({ ok: true, ignorado: tipo });
  }

  const a = evento.data?.attributes;
  if (!a) return NextResponse.json({ ok: true, ignorado: "sin datos" });

  if (a.status !== "paid") {
    console.log(`[plugin/webhook] pedido ${a.identifier} -> ${a.status}`);
    return NextResponse.json({ ok: true, estado: a.status });
  }

  // El producto sale de la variante, que la pone Lemon Squeezy. Fiarse aquí de
  // `custom` dejaría comprar una suelta y reclamar el pack.
  const variante = a.first_order_item?.variant_id;
  const producto = variante != null ? productoDeVariante(variante) : null;
  if (!producto) {
    console.error(
      `[plugin/webhook] variante desconocida: ${variante} (${a.first_order_item?.variant_name}). ` +
        `Si la tienda acaba de pasar a modo real, actualiza VARIANTES en lib/plugin/lemonsqueezy.ts.`
    );
    return NextResponse.json({ ok: true, ignorado: "variante desconocida" });
  }

  const correo = a.user_email;
  if (!correo) {
    console.error("[plugin/webhook] pedido sin correo", a.identifier);
    return NextResponse.json({ ok: true });
  }

  // La referencia es nuestra y llega por `custom`. Si faltara —una compra hecha
  // desde el escaparate de Lemon Squeezy, sin pasar por la web— se cae en el
  // identificador del pedido: la licencia se emite igual y llega por correo.
  const referencia = evento.meta?.custom_data?.referencia || a.identifier || "";
  const transaccion = a.identifier || String(evento.data?.id ?? referencia);

  try {
    const { licencia, nueva } = await creaLicencia({
      producto,
      correo,
      referencia,
      transaccion,
      centavos: a.total ?? 0,
      usd: PRODUCTOS[producto].usd,
    });

    if (nueva) {
      console.log(`[plugin/webhook] licencia emitida para ${correo} (${producto})`);
      try {
        await enviaClave(licencia.correo, licencia.clave, PRODUCTOS[producto].nombre);
      } catch (e) {
        // El correo puede fallar; la clave sigue disponible en /plugin/gracias.
        console.error("[plugin/webhook] fallo al enviar el correo", e);
      }
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    // Muy probablemente la base está pausada. Se devuelve error a propósito
    // para que reintente: con un 200 el cliente habría pagado y se quedaría
    // sin licencia.
    console.error("[plugin/webhook] error emitiendo licencia, se pide reintento", e);
    return NextResponse.json(
      { error: "No se pudo emitir la licencia; reintentar." },
      { status: 503 }
    );
  }
}
