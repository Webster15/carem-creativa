import { NextResponse } from "next/server";
import { z } from "zod";
import { validaEquipo } from "@/lib/plugin/licencias";

/**
 * Reconfirma en silencio una licencia ya activada. El panel la llama cada 7 días.
 * Lo consume el panel de LogoForge dentro de Illustrator.
 */

const Body = z.object({
  clave: z.string().min(6).max(64),
  huella: z.string().min(8).max(128),
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
