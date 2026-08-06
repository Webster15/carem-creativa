/**
 * LogoForge — envío de la clave de licencia
 * ---------------------------------------------------------------
 * Usa la API HTTP de Resend en vez de SMTP. Motivos:
 *
 *   - Es una sola llamada `fetch`: no hace falta nodemailer ni mantener
 *     abierta una conexión SMTP, que es justo lo que peor se lleva con las
 *     funciones serverless de Vercel (se congelan a mitad del saludo TLS).
 *   - Una variable de entorno (RESEND_API_KEY) en lugar de seis.
 *   - Funciona igual en runtime edge, por si algún día movemos el webhook.
 *
 * Si el envío falla, la compra NO se pierde: la clave se muestra igualmente
 * en /plugin/gracias, verificada con el token de retorno firmado.
 */

const API = "https://api.resend.com/emails";

/** Remitente por defecto. El dominio debe estar verificado en Resend. */
const REMITENTE = "LogoForge <plugins@caremcreativa.com>";

export async function enviaClave(destino: string, clave: string, producto: string) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error("Falta RESEND_API_KEY");

  const remitente = process.env.CORREO_FROM || REMITENTE;
  const sitio = process.env.SITIO_URL || "https://www.caremcreativa.com";

  // plugins@ solo envía: Resend no le crea buzón. Sin Reply-To, a quien
  // conteste pidiendo ayuda le rebota el correo, que es la peor forma de
  // recibir a un cliente con un problema. Apunta a un buzón que se lea.
  const respuestas = process.env.CORREO_REPLY_TO;

  const texto = [
    `Tu clave de LogoForge`,
    ``,
    `Producto: ${producto}`,
    `Clave: ${clave}`,
    ``,
    `Cómo activarla:`,
    `1. Descarga e instala LogoForge (${sitio}/plugin).`,
    `2. Abre Ventana › Extensiones › LogoForge.`,
    `3. Pulsa el banner azul de abajo, "Consigue tus herramientas".`,
    `4. Pega la clave en "¿Ya tienes una clave?" y dale a Activar.`,
    ``,
    `La clave sirve para 2 equipos. Puedes liberar uno desde el propio panel`,
    `si cambias de ordenador.`,
    ``,
    `Guarda este correo: es tu comprobante.`,
  ].join("\n");

  const html = `
<div style="font-family:system-ui,-apple-system,'Segoe UI',sans-serif;max-width:520px;margin:0 auto;color:#111">
  <h1 style="font-size:20px;margin:0 0 4px">Tu clave de LogoForge</h1>
  <p style="color:#666;margin:0 0 24px;font-size:14px">${producto}</p>

  <div style="background:#FDF1D7;border:2px solid #111;padding:18px;text-align:center;margin-bottom:24px">
    <div style="font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:#666;margin-bottom:6px">Clave de licencia</div>
    <code style="font-size:22px;font-weight:700;letter-spacing:.06em">${clave}</code>
  </div>

  <ol style="font-size:14px;line-height:1.7;padding-left:20px;margin:0 0 24px">
    <li>Descarga e instala LogoForge desde <a href="${sitio}/plugin" style="color:#3D6EEE">${sitio}/plugin</a></li>
    <li>Abre <strong>Ventana › Extensiones › LogoForge</strong></li>
    <li>Pulsa el banner azul de abajo, <strong>«Consigue tus herramientas»</strong></li>
    <li>Pega la clave en <strong>«¿Ya tienes una clave?»</strong> y dale a <strong>Activar</strong></li>
  </ol>

  <p style="font-size:13px;color:#666;line-height:1.6;margin:0">
    La clave sirve para 2 equipos y puedes liberar uno desde el panel si cambias
    de ordenador. Guarda este correo: es tu comprobante.
  </p>
</div>`.trim();

  const res = await fetch(API, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: remitente,
      to: [destino],
      ...(respuestas ? { reply_to: respuestas } : {}),
      subject: `Tu clave de LogoForge — ${producto}`,
      text: texto,
      html,
    }),
  });

  // El cuerpo del error de Resend dice exactamente qué falla (dominio sin
  // verificar, clave revocada, destinatario no permitido en modo prueba...).
  // Sin esto los fallos de envío quedaban como un 500 mudo en los logs.
  if (!res.ok) {
    const detalle = await res.text().catch(() => "");
    throw new Error(`Resend ${res.status}: ${detalle.slice(0, 300)}`);
  }
}
