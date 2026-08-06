import { NextResponse } from "next/server";
import { z } from "zod";
import { desactivaEquipo } from "@/lib/plugin/licencias";

/**
 * Libera la plaza de este equipo para poder usar la clave en otro.
 * Lo consume el panel de Vértice dentro de Illustrator.
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
    await desactivaEquipo(clave, huella);
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[plugin/desactivar]", e);
    return NextResponse.json({ error: "Error del servidor." }, { status: 500 });
  }
}
