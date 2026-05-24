import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST() {
  const apiKey = process.env.ELEVENLABS_API_KEY;
  const agentId = process.env.ELEVENLABS_AGENT_ID;

  if (!apiKey || !agentId) {
    return NextResponse.json(
      { error: "ELEVENLABS_API_KEY o ELEVENLABS_AGENT_ID no configurados." },
      { status: 500 }
    );
  }

  const url = `https://api.elevenlabs.io/v1/convai/conversation/get-signed-url?agent_id=${encodeURIComponent(agentId)}`;
  const r = await fetch(url, {
    headers: { "xi-api-key": apiKey },
    cache: "no-store",
  });

  if (!r.ok) {
    const detail = await r.text().catch(() => "");
    console.error("[signed-url] upstream", r.status, detail);
    return NextResponse.json(
      { error: "Error al pedir URL firmada al servicio de voz." },
      { status: 502 }
    );
  }

  const data = (await r.json()) as { signed_url?: string };
  if (!data.signed_url) {
    return NextResponse.json(
      { error: "Respuesta inesperada del servicio de voz." },
      { status: 502 }
    );
  }
  return NextResponse.json({ signedUrl: data.signed_url });
}
