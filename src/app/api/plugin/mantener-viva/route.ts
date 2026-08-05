import { NextResponse } from "next/server";

/**
 * Mantiene despierto el proyecto de Supabase.
 *
 * El plan gratuito pausa los proyectos tras unos días sin actividad. Para una
 * web eso es inofensivo, pero aquí no: si la base está dormida cuando llega
 * un pago, el cliente paga y no recibe su licencia. Y el riesgo es mayor
 * justo al principio, cuando todavía hay pocas ventas que generen tráfico.
 *
 * Lo llama Vercel Cron una vez al día (ver vercel.json). Basta con una
 * consulta trivial para que cuente como actividad.
 *
 * Protegido con CRON_SECRET, igual que el cron del proyecto lab.
 */

export const runtime = "edge";

export async function GET(req: Request) {
  const auth = req.headers.get("authorization");
  if (process.env.CRON_SECRET && auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "No autorizado." }, { status: 401 });
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    return NextResponse.json({ error: "Supabase sin configurar." }, { status: 503 });
  }

  try {
    // Se tolera que la URL llegue con /rest/v1 al final, tal como la muestra
    // el panel de Supabase.
    const base = url.replace(/\/+$/, "").replace(/\/rest\/v1$/, "");

    // Consulta mínima: solo cuenta como actividad, no trae datos.
    const res = await fetch(`${base}/rest/v1/licencias?select=clave&limit=1`, {
      headers: { apikey: key, Authorization: `Bearer ${key}` },
      cache: "no-store",
      signal: AbortSignal.timeout(10000),
    });

    if (!res.ok) {
      console.error("[plugin/mantener-viva] Supabase respondió", res.status);
      return NextResponse.json({ ok: false, estado: res.status }, { status: 502 });
    }

    return NextResponse.json({ ok: true, comprobado: new Date().toISOString() });
  } catch (e) {
    console.error("[plugin/mantener-viva] sin respuesta de Supabase", e);
    return NextResponse.json({ ok: false }, { status: 502 });
  }
}
