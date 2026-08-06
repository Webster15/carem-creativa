import { NextResponse } from "next/server";
import { z } from "zod";
import { frena } from "@/lib/plugin/limitador";
import { validaEquipo } from "@/lib/plugin/licencias";
import { paqueteDe } from "@/lib/plugin/paquetes";

/**
 * Entrega el código firmado de una herramienta, solo a quien la ha comprado.
 * Lo consume el panel de Vértice dentro de Illustrator.
 */

const Body = z.object({
  clave: z.string().min(6).max(64),
  huella: z.string().min(8).max(128),
  id: z.string().min(2).max(40),
});

export const runtime = "edge";

export async function POST(req: Request) {
  // Se piden pocas veces, solo tras activar o al reinstalar.
  const freno = frena(req, "herramienta", 20, 60_000);
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
  const { clave, huella, id } = parsed.data;
  try {
    const r = await validaEquipo(clave, huella);
    if (!r.ok) return NextResponse.json({ error: r.error }, { status: r.codigo });

    // El permiso se comprueba ANTES de mirar si el paquete existe: así no se
    // filtra qué herramientas hay en catálogo a quien no las ha pagado.
    if (!r.licencia.herramientas.includes(id as never)) {
      return NextResponse.json(
        { error: "Tu licencia no incluye esta herramienta." },
        { status: 403 }
      );
    }

    const p = paqueteDe(id);
    if (!p) return NextResponse.json({ error: "Herramienta no disponible." }, { status: 404 });

    return NextResponse.json({ id: p.id, version: p.version, firma: p.firma, codigo: p.codigo });
  } catch (e) {
    console.error("[plugin/herramienta]", e);
    return NextResponse.json({ error: "Error del servidor." }, { status: 500 });
  }
}
