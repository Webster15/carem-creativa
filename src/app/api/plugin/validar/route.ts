import { NextResponse } from "next/server";
import { z } from "zod";
import { frena } from "@/lib/plugin/limitador";
import { validaEquipo } from "@/lib/plugin/licencias";

/**
 * Reconfirma en silencio una licencia ya activada. El panel la llama cada 7 días.
 * Lo consume el panel de Vértice dentro de Illustrator.
 */

const Body = z.object({
  clave: z.string().min(6).max(64),
  huella: z.string().min(8).max(128),
});

export const runtime = "edge";

export async function POST(req: Request) {
  // El panel la llama sola cada 7 dias: 30 por minuto sobra para uso legitimo.
  const freno = frena(req, "validar", 30, 60_000);
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
  const { clave, huella } = parsed.data;
  try {
    const r = await validaEquipo(clave, huella);
    if (!r.ok) return NextResponse.json({ error: r.error }, { status: r.codigo });
    return NextResponse.json({
      herramientas: r.licencia.herramientas,
      correo: r.licencia.correo,
    });
  } catch (e) {
    console.error("[plugin/validar]", e);
    return NextResponse.json({ error: "Error del servidor." }, { status: 500 });
  }
}
