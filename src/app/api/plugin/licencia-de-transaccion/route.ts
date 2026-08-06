import { NextResponse } from "next/server";
import { z } from "zod";
import { tokenRetorno, tokenValido } from "@/lib/plugin/lemonsqueezy";
import { licenciaDeReferencia } from "@/lib/plugin/licencias";

/**
 * Recupera la clave de una compra al volver de Lemon Squeezy.
 *
 * Se busca por NUESTRA referencia, no por el pedido de Lemon Squeezy: la
 * referencia se genera al iniciar la compra y viaja tanto en la URL de retorno
 * como en el `custom` del pedido, así que es lo único que enlaza las dos
 * puntas sin depender de consultar su API.
 *
 * La verificación se apoya en dos hechos:
 *
 *   1. La licencia solo existe si el webhook la creó, y el webhook valida la
 *      firma antes de emitir nada. Que haya fila prueba que hubo pago.
 *   2. El testigo firmado acredita que esta compra la inició este servidor.
 *      Sin él bastaría con adivinar una referencia ajena para ver su clave.
 *
 * Esta ruta nunca crea licencias; solo lee las que ya emitió el webhook.
 */

const Body = z.object({
  referencia: z.string().min(4).max(120),
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

  const { referencia, token } = parsed.data;

  try {
    // El testigo se comprueba ANTES de mirar la base: así una referencia
    // inventada no llega siquiera a consultar nada.
    const esperado = await tokenRetorno(referencia);
    if (!tokenValido(esperado, token)) {
      console.error(`[plugin/gracias] testigo inválido para ${referencia}`);
      // Se responde como si aún no existiera: no confirma ni desmiente que la
      // referencia sea real, para no ayudar a quien esté probando suerte.
      return NextResponse.json({ pendiente: true });
    }

    const lic = await licenciaDeReferencia(referencia);

    // Todavía sin licencia: el webhook puede tardar unos segundos, o el pago
    // no se completó. La página reintenta unas cuantas veces.
    if (!lic) return NextResponse.json({ pendiente: true });

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
