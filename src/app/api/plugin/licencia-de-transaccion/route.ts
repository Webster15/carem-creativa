import { NextResponse } from "next/server";
import { z } from "zod";
import { consultaTransaccion } from "@/lib/plugin/wompi";
import { licenciaDeTransaccion } from "@/lib/plugin/licencias";

/**
 * Recupera la clave de una compra a partir del id de transacción.
 * La usa la página de retorno tras pagar.
 *
 * El id llega por la URL, que controla el navegador, así que NO se cree
 * nada: se consulta el estado real contra la API de Wompi antes de revelar
 * ninguna clave. Y solo se devuelve una licencia ya emitida por el webhook;
 * esta ruta nunca crea licencias.
 */

const Body = z.object({ transaccion: z.string().min(4).max(80) });

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

  try {
    const tx = await consultaTransaccion(parsed.data.transaccion);
    if (!tx) {
      return NextResponse.json({ error: "No se encontró la transacción." }, { status: 404 });
    }
    if (tx.status !== "APPROVED") {
      return NextResponse.json({ estado: tx.status, referencia: tx.reference });
    }

    const lic = await licenciaDeTransaccion(tx.id);
    if (!lic) {
      // El webhook puede tardar unos segundos; la página reintenta.
      return NextResponse.json({ estado: "APPROVED", pendiente: true });
    }

    return NextResponse.json({
      estado: "APPROVED",
      clave: lic.clave,
      correo: lic.correo,
      herramientas: lic.herramientas,
      producto: lic.producto,
    });
  } catch (e) {
    console.error("[plugin/licencia-de-transaccion]", e);
    return NextResponse.json({ error: "Error del servidor." }, { status: 500 });
  }
}
