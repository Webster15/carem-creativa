import { NextResponse } from "next/server";
import { z } from "zod";
import { activaEquipo } from "@/lib/plugin/licencias";
import { frena } from "@/lib/plugin/limitador";

/**
 * Canjea una clave en este equipo y devuelve las herramientas que cubre.
 * Lo consume el panel de Vértice dentro de Illustrator.
 */

const Body = z.object({
  clave: z.string().min(6).max(64),
  huella: z.string().min(8).max(128),
});

export const runtime = "edge";

export async function POST(req: Request) {
  // Activar es el endpoint más goloso para probar claves a ciegas. Se frena
  // antes de leer nada, para que un intento fallido no cueste una consulta.
  const freno = frena(req, "activar", 10, 60_000);
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
    const r = await activaEquipo(clave, huella);
    if (!r.ok) return NextResponse.json({ error: r.error }, { status: r.codigo });
    return NextResponse.json({
      herramientas: r.licencia.herramientas,
      correo: r.licencia.correo,
    });
  } catch (e) {
    console.error("[plugin/activar]", e);
    return NextResponse.json({ error: "Error del servidor." }, { status: 500 });
  }
}
