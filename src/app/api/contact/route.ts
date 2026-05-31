import { NextResponse } from "next/server";
import { z } from "zod";

const Body = z.object({
  nombre: z.string().min(2).max(80),
  email: z.email(),
  mensaje: z.string().min(10).max(2000),
});

const WEB3FORMS_KEY = "bdc03151-b165-410b-b5dc-2816d223bc05";

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
    return NextResponse.json(
      { error: "Datos inválidos.", issues: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { nombre, email, mensaje } = parsed.data;

  try {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: WEB3FORMS_KEY,
        subject: "Nuevo cliente interesado de la web",
        email,
        "Nombre": nombre,
        "Correo": email,
        "Mensaje": mensaje,
        from_name: "CaremCreativa Web",
      }),
    });

    const data = await res.json();
    if (!data.success) {
      console.error("[contact] web3forms error", data);
      return NextResponse.json({ error: "Error al enviar." }, { status: 502 });
    }
  } catch (err) {
    console.error("[contact] fetch error", err);
    return NextResponse.json({ error: "Error de red." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
