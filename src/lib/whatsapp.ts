// Número de WhatsApp de CaremCreativa (formato internacional sin + ni espacios)
export const WHATSAPP_NUMBER = "573001231152";

/** Construye un enlace wa.me con mensaje opcional pre-rellenado. */
export function whatsappLink(message?: string): string {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
