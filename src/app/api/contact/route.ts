import { NextResponse } from "next/server";
import { z } from "zod";

const Body = z.object({
  nombre: z.string().min(2).max(80),
  email: z.email(),
  mensaje: z.string().min(10).max(2000),
});

export const runtime = "nodejs";

export async function POST(req: Request) {
  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido." }, { status: 400 });
  }

  const parsed = Body.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Datos inválidos.", issues: parsed.error.flatten() },
      { status: 400 }
    );
  }

  // MVP: log it. Replace with Resend / Slack / DB in milestone 2.
  console.log("[contact]", parsed.data);

  return NextResponse.json({ ok: true });
}
