import { NextResponse } from "next/server";
import { z } from "zod";
import { tokenRetorno, tokenValido } from "@/lib/plugin/wompi";
import { licenciaDeTransaccion } from "@/lib/plugin/licencias";

/**
 * Recupera la clave de una compra tras volver de Wompi.
 *
 * NO consulta la API de Wompi: su cortafuegos devuelve 403 a las peticiones
 * que salen de un centro de datos, incluso autenticadas. La verificación se
 * apoya en dos hechos que no dependen de ella:
 *
 *   1. La licencia solo existe si el webhook la creó, y el webhook valida el
 *      X-Event-Checksum antes de emitir nada. Que haya fila es prueba de que
 *      hubo un pago aprobado de verdad.
 *   2. El testigo firmado de la URL acredita que esta compra la inició este
 *      servidor. Sin él bastaría con adivinar un identificador de transacción
 *      ajeno para ver la clave de otra persona.
 *
 * Esta ruta nunca crea licencias; solo lee las que ya emitió el webhook.
 */

const Body = z.object({
  transaccion: z.string().min(4).max(80),
  token: z.string().min(16).max(128),
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

  try {
    const lic = await licenciaDeTransaccion(parsed.data.transaccion);

    // Todavía sin licencia: puede que el webhook aún no haya llegado, o que
    // el pago no se aprobara. La página reintenta unas cuantas veces.
    if (!lic) return NextResponse.json({ pendiente: true });

    const esperado = await tokenRetorno(lic.referencia ?? "");
    if (!tokenValido(esperado, parsed.data.token)) {
      console.error(`[plugin/gracias] testigo inválido para ${parsed.data.transaccion}`);
      // Se responde como si no existiera: no confirma ni desmiente que la
      // transacción sea real, para no ayudar a quien esté probando suerte.
      return NextResponse.json({ pendiente: true });
    }

    return NextResponse.json({
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
