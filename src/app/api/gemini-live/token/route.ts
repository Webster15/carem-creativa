import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export const GEMINI_LIVE_MODEL = "gemini-3.1-flash-live-preview";

export async function POST() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "missing_api_key" }, { status: 500 });
  }

  try {
    // Los tokens efímeros solo existen en v1alpha
    const ai = new GoogleGenAI({ apiKey, httpOptions: { apiVersion: "v1alpha" } });

    const token = await ai.authTokens.create({
      config: {
        uses: 1,
        // El token nuevo solo puede iniciar sesión durante el próximo minuto…
        newSessionExpireTime: new Date(Date.now() + 60 * 1000).toISOString(),
        // …y la sesión vive hasta 30 min
        expireTime: new Date(Date.now() + 30 * 60 * 1000).toISOString(),
        liveConnectConstraints: { model: GEMINI_LIVE_MODEL },
      },
    });

    return NextResponse.json({ token: token.name });
  } catch (err) {
    console.error("[gemini-live] error creando token:", err);
    return NextResponse.json({ error: "token_failed" }, { status: 502 });
  }
}
