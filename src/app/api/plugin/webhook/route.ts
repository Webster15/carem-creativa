import { NextResponse } from "next/server";
import { eventoValido, productoDeReferencia, type EventoWompi } from "@/lib/plugin/wompi";
import { creaLicencia } from "@/lib/plugin/licencias";
import { esProducto, PRODUCTOS } from "@/lib/plugin/precios";
import { enviaClave } from "@/lib/plugin/correo";

/**
 * Webhook de Wompi. Al aprobarse un pago se emite la licencia y se envía
 * la clave por correo.
 *
 * Runtime Node (no edge) porque nodemailer necesita Node para el SMTP.
 *
 * CÓDIGOS DE RESPUESTA
 * Wompi reintenta el envío cuando no recibe un 2xx, y de eso depende que no
 * se pierda una venta:
 *
 *   200  cuando no hay nada que hacer (pago no aprobado, evento de otro tipo,
 *        producto no reconocido). Reintentar no arreglaría nada.
 *   5xx  cuando falla algo NUESTRO al emitir la licencia, típicamente que la
 *        base de datos esté dormida (el plan gratuito de Supabase pausa los
 *        proyectos por inactividad). Así Wompi vuelve a intentarlo y la
 *        siguiente llamada la encuentra despierta.
 *
 * La emisión es idempotente: la columna `transaccion` es única, de modo que
 * varios reintentos nunca generan dos licencias.
 */

export const runtime = "nodejs";

export async function POST(req: Request) {
  const cuerpo = await req.text();

  let evento: EventoWompi;
  try {
    evento = JSON.parse(cuerpo);
  } catch {
    return NextResponse.json({ error: "JSON inválido." }, { status: 400 });
  }

  // Sin esta comprobación cualquiera podría fabricar un pago aprobado.
  const valido = await eventoValido(evento, req.headers.get("x-event-checksum"));
  if (!valido) {
    console.error("[plugin/webhook] checksum inválido", evento?.data);
    return NextResponse.json({ error: "Firma inválida." }, { status: 401 });
  }

  if (evento.event !== "transaction.updated") {
    return NextResponse.json({ ok: true, ignorado: evento.event });
  }

  const tx = evento.data?.transaction;
  if (!tx) return NextResponse.json({ ok: true, ignorado: "sin transacción" });

  if (tx.status !== "APPROVED") {
    console.log(`[plugin/webhook] ${tx.reference} -> ${tx.status}`);
    return NextResponse.json({ ok: true, estado: tx.status });
  }

  try {
    const producto = productoDeReferencia(tx.reference)?.toLowerCase();
    const encontrado = Object.keys(PRODUCTOS).find((p) => p.toLowerCase() === producto);
    if (!encontrado || !esProducto(encontrado)) {
      console.error("[plugin/webhook] producto no reconocido en", tx.reference);
      return NextResponse.json({ ok: true });
    }

    const correo = tx.customer_email;
    if (!correo) {
      console.error("[plugin/webhook] transacción sin correo", tx.id);
      return NextResponse.json({ ok: true });
    }

    const { licencia, nueva } = await creaLicencia({
      producto: encontrado,
      correo,
      referencia: tx.reference,
      transaccion: tx.id,
      centavos: tx.amount_in_cents,
      usd: PRODUCTOS[encontrado].usd,
    });

    if (nueva) {
      console.log(`[plugin/webhook] licencia emitida para ${correo} (${encontrado})`);
      try {
        await enviaClave(licencia.correo, licencia.clave, PRODUCTOS[encontrado].nombre);
      } catch (e) {
        // El correo puede fallar; la clave sigue disponible en /plugin/gracias.
        console.error("[plugin/webhook] fallo al enviar el correo", e);
      }
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    // Muy probablemente la base está pausada o inaccesible. Se devuelve error
    // a propósito para que Wompi reintente: si respondiéramos 200, el cliente
    // habría pagado y se quedaría sin licencia.
    console.error("[plugin/webhook] error emitiendo licencia, se pide reintento", e);
    return NextResponse.json(
      { error: "No se pudo emitir la licencia; reintentar." },
      { status: 503 }
    );
  }
}
