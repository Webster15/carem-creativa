export async function fetchSignedUrl(): Promise<string> {
  const r = await fetch("/api/elevenlabs/signed-url", { method: "POST" });
  if (!r.ok) throw new Error(`signed-url failed: ${r.status}`);
  const { signedUrl } = (await r.json()) as { signedUrl: string };
  return signedUrl;
}
