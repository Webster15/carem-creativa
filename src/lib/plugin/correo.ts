/**
 * LogoForge — envío de la clave de licencia
 * ---------------------------------------------------------------
 * Usa nodemailer, que ya estaba en el proyecto. Requiere runtime Node:
 * el SMTP no funciona en edge.
 *
 * Si el envío falla, la compra NO se pierde: la clave se muestra igualmente
 * en /plugin/gracias, verificada contra la API de Wompi.
 */

import nodemailer from "nodemailer";

function transporte() {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!host || !user || !pass) throw new Error("Faltan credenciales SMTP");

  return nodemailer.createTransport({
    host,
    port: Number(process.env.SMTP_PORT || 465),
    secure: String(process.env.SMTP_SECURE ?? "true") === "true",
    auth: { user, pass },
  });
}

export async function enviaClave(destino: string, clave: string, producto: string) {
  const remitente = process.env.SMTP_FROM || process.env.SMTP_USER!;
  const sitio = process.env.SITIO_URL || "https://caremcreativa.com";

  const texto = [
    `Tu clave de LogoForge`,
    ``,
    `Producto: ${producto}`,
    `Clave: ${clave}`,
    ``,
    `Cómo activarla:`,
    `1. Instala LogoForge en Illustrator (${sitio}/plugin).`,
    `2. Abre Ventana › Extensiones › LogoForge.`,
    `3. Pulsa el icono de llave arriba a la derecha.`,
    `4. Pega la clave y dale a Activar.`,
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
    <li>Instala LogoForge en Illustrator desde <a href="${sitio}/plugin" style="color:#3D6EEE">${sitio}/plugin</a></li>
    <li>Abre <strong>Ventana › Extensiones › LogoForge</strong></li>
    <li>Pulsa el icono de llave, arriba a la derecha</li>
    <li>Pega la clave y dale a <strong>Activar</strong></li>
  </ol>

  <p style="font-size:13px;color:#666;line-height:1.6;margin:0">
    La clave sirve para 2 equipos y puedes liberar uno desde el panel si cambias
    de ordenador. Guarda este correo: es tu comprobante.
  </p>
</div>`.trim();

  await transporte().sendMail({
    from: remitente,
    to: destino,
    subject: `Tu clave de LogoForge — ${producto}`,
    text: texto,
    html,
  });
}
