/* Helpers de audio para Gemini Live API
 * - Entrada (mic): PCM16 mono 16kHz  →  base64
 * - Salida (modelo): PCM16 mono 24kHz →  reproducción en streaming
 */

/** Convierte un Float32Array [-1,1] a PCM16 little-endian y lo codifica en base64. */
export function float32ToBase64Pcm16(input: Float32Array): string {
  const int16 = new Int16Array(input.length);
  for (let i = 0; i < input.length; i++) {
    const s = Math.max(-1, Math.min(1, input[i]));
    int16[i] = s < 0 ? s * 0x8000 : s * 0x7fff;
  }
  const bytes = new Uint8Array(int16.buffer);
  let binary = "";
  const CHUNK = 0x8000;
  for (let i = 0; i < bytes.length; i += CHUNK) {
    binary += String.fromCharCode(...bytes.subarray(i, i + CHUNK));
  }
  return btoa(binary);
}

/** Decodifica base64 PCM16 a Float32Array [-1,1]. */
export function base64Pcm16ToFloat32(b64: string): Float32Array {
  const binary = atob(b64);
  const len = binary.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) bytes[i] = binary.charCodeAt(i);
  const sampleCount = Math.floor(len / 2);
  const view = new DataView(bytes.buffer);
  const float32 = new Float32Array(sampleCount);
  for (let i = 0; i < sampleCount; i++) {
    float32[i] = view.getInt16(i * 2, true) / 32768;
  }
  return float32;
}

/** Reproductor de PCM en streaming: encola chunks y los reproduce sin huecos. */
export class PcmStreamPlayer {
  private ctx: AudioContext;
  private nextTime = 0;
  private sources = new Set<AudioBufferSourceNode>();
  private readonly sampleRate: number;

  constructor(sampleRate = 24000) {
    this.sampleRate = sampleRate;
    const AC = (window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext);
    this.ctx = new AC({ sampleRate });
  }

  resume() {
    return this.ctx.resume();
  }

  enqueue(float32: Float32Array) {
    if (float32.length === 0) return;
    const buffer = this.ctx.createBuffer(1, float32.length, this.sampleRate);
    buffer.getChannelData(0).set(float32);
    const src = this.ctx.createBufferSource();
    src.buffer = buffer;
    src.connect(this.ctx.destination);
    const now = this.ctx.currentTime;
    const startAt = Math.max(now, this.nextTime);
    src.start(startAt);
    this.nextTime = startAt + buffer.duration;
    this.sources.add(src);
    src.onended = () => this.sources.delete(src);
  }

  /** true si todavía hay audio del asistente sonando (o por sonar). */
  isPlaying(): boolean {
    return this.nextTime > this.ctx.currentTime + 0.05;
  }

  /** Corta toda la reproducción pendiente (cuando el usuario interrumpe). */
  clear() {
    for (const s of this.sources) {
      try { s.stop(); } catch { /* ya detenido */ }
    }
    this.sources.clear();
    this.nextTime = 0;
  }

  async close() {
    this.clear();
    try { await this.ctx.close(); } catch { /* ya cerrado */ }
  }
}

/** Captura del micrófono a 16kHz mono y entrega chunks PCM16 en base64. */
export class MicCapture {
  private ctx?: AudioContext;
  private stream?: MediaStream;
  private source?: MediaStreamAudioSourceNode;
  private processor?: ScriptProcessorNode;

  async start(onChunk: (base64Pcm: string) => void) {
    this.stream = await navigator.mediaDevices.getUserMedia({
      audio: { channelCount: 1, echoCancellation: true, noiseSuppression: true, autoGainControl: true },
    });
    const AC = (window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext);
    this.ctx = new AC({ sampleRate: 16000 });
    this.source = this.ctx.createMediaStreamSource(this.stream);
    this.processor = this.ctx.createScriptProcessor(4096, 1, 1);
    this.processor.onaudioprocess = (e) => {
      const input = e.inputBuffer.getChannelData(0);
      onChunk(float32ToBase64Pcm16(input));
    };
    this.source.connect(this.processor);
    // Conectar a destination para que dispare onaudioprocess; el outputBuffer
    // queda en silencio (no lo escribimos), así que no hay eco.
    this.processor.connect(this.ctx.destination);
  }

  async stop() {
    try { this.processor?.disconnect(); } catch { /* */ }
    try { this.source?.disconnect(); } catch { /* */ }
    this.stream?.getTracks().forEach((t) => t.stop());
    if (this.ctx) {
      try { await this.ctx.close(); } catch { /* */ }
    }
  }
}
