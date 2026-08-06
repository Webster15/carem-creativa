/**
 * Vértice — envío de la clave de licencia
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
const REMITENTE = "Vértice <plugins@caremcreativa.com>";

/* ── Identidad de marca ─────────────────────────────────────────────────────
 * Los mismos valores que globals.css. Aquí van repetidos a propósito: el
 * correo no puede leer las variables CSS del sitio.
 */
const C = {
  cream: "#FDF1D7",
  brand: "#3D6EEE",
  accent: "#F75D45",
  dark: "#111111",
};

/* Barlow y Poppins se declaran primero, pero Gmail elimina las fuentes web:
 * ahí caerá en Helvetica. Por eso el peso de la identidad lo llevan el color,
 * las mayúsculas y el espaciado, que sí sobreviven en todos los clientes. */
const DISPLAY = "'Barlow Condensed', 'Arial Narrow', Arial, Helvetica, sans-serif";
const TEXTO = "Poppins, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";
const MONO = "'SF Mono', Menlo, Consolas, 'Courier New', monospace";

function escapa(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

type Paso = { n: string; t: string; d: string };

function pasoHtml({ n, t, d }: Paso) {
  return `
  <tr>
    <td width="44" valign="top" style="padding:0 0 20px;font-family:${DISPLAY};font-size:26px;line-height:1;color:${C.accent};font-weight:700">${n}</td>
    <td valign="top" style="padding:0 0 20px">
      <div style="font-family:${TEXTO};font-size:15px;line-height:1.4;color:${C.dark};font-weight:600">${t}</div>
      <div style="font-family:${TEXTO};font-size:13px;line-height:1.6;color:rgba(17,17,17,.62);padding-top:3px">${d}</div>
    </td>
  </tr>`;
}

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
    `Tu clave de Vértice`,
    ``,
    `Producto: ${producto}`,
    `Clave: ${clave}`,
    ``,
    `Cómo activarla:`,
    `1. Descarga e instala Vértice (${sitio}/plugin#descargar).`,
    `2. Abre Ventana › Extensiones › Vértice en Illustrator.`,
    `3. Pulsa el banner azul de abajo, "Consigue tus herramientas".`,
    `4. Pega la clave en "¿Ya tienes una clave?" y dale a Activar.`,
    ``,
    `La clave sirve para 2 equipos. Puedes liberar uno desde el propio panel`,
    `si cambias de ordenador.`,
    ``,
    `Guarda este correo: es tu comprobante.`,
    respuestas ? `\n¿Alguna duda? Responde a este correo.` : ``,
  ].join("\n");

  const pasos: Paso[] = [
    {
      n: "01",
      t: "Descarga e instala Vértice",
      d: `Desde ${sitio.replace(/^https?:\/\//, "")}/plugin. La guía te lleva de la mano.`,
    },
    { n: "02", t: "Abre Ventana › Extensiones › Vértice", d: "El panel aparece acoplado dentro de Illustrator." },
    { n: "03", t: "Pulsa el banner azul de abajo", d: "El que dice «Consigue tus herramientas»." },
    { n: "04", t: "Pega la clave y dale a Activar", d: "En «¿Ya tienes una clave?». Las herramientas se desbloquean solas." },
  ];

  const html = `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="light only">
<meta name="supported-color-schemes" content="light only">
<title>Tu clave de Vértice</title>
</head>
<body style="margin:0;padding:0;background:${C.cream}">
<div style="display:none;max-height:0;overflow:hidden;opacity:0">Tu clave: ${escapa(clave)} — sirve para 2 equipos.</div>

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${C.cream}">
<tr><td align="center" style="padding:32px 16px">

  <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px">

    <!-- Cabecera -->
    <tr><td style="background:${C.brand};padding:38px 34px 34px">
      <div style="font-family:${TEXTO};font-size:11px;letter-spacing:.24em;text-transform:uppercase;color:${C.accent};font-weight:700">
        Carem Creativa
      </div>
      <div style="font-family:${DISPLAY};font-size:52px;line-height:.9;letter-spacing:.01em;text-transform:uppercase;color:${C.cream};font-weight:700;padding-top:10px">
        Vértice
      </div>
      <div style="font-family:${TEXTO};font-size:14px;line-height:1.5;color:rgba(253,241,215,.72);padding-top:12px">
        ${escapa(producto)}
      </div>
    </td></tr>

    <!-- Clave -->
    <tr><td style="background:#FFFFFF;padding:34px 34px 6px">
      <div style="font-family:${TEXTO};font-size:15px;line-height:1.6;color:rgba(17,17,17,.72);padding-bottom:22px">
        Gracias por tu compra. Esta es tu clave:
      </div>

      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
      <tr><td align="center" style="background:${C.cream};border:2px solid ${C.dark};padding:22px 16px">
        <div style="font-family:${TEXTO};font-size:10px;letter-spacing:.2em;text-transform:uppercase;color:rgba(17,17,17,.55);font-weight:600">
          Clave de licencia
        </div>
        <div style="font-family:${MONO};font-size:23px;line-height:1.3;letter-spacing:.08em;color:${C.dark};font-weight:700;padding-top:8px">
          ${escapa(clave)}
        </div>
      </td></tr>
      </table>
    </td></tr>

    <!-- Pasos -->
    <tr><td style="background:#FFFFFF;padding:34px 34px 10px">
      <div style="font-family:${DISPLAY};font-size:24px;line-height:1;letter-spacing:.04em;text-transform:uppercase;color:${C.brand};font-weight:700;padding-bottom:22px">
        Cómo activarla
      </div>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
        ${pasos.map(pasoHtml).join("")}
      </table>
    </td></tr>

    <!-- Botón -->
    <tr><td style="background:#FFFFFF;padding:6px 34px 34px">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0">
      <tr><td style="background:${C.accent}">
        <a href="${sitio}/plugin#descargar"
           style="display:inline-block;padding:16px 34px;font-family:${DISPLAY};font-size:15px;letter-spacing:.12em;text-transform:uppercase;color:${C.cream};text-decoration:none;font-weight:700">
          Descargar el plugin
        </a>
      </td></tr>
      </table>
      <div style="font-family:${TEXTO};font-size:12px;line-height:1.7;color:rgba(17,17,17,.5);padding-top:20px">
        Tu clave sirve para <strong style="color:rgba(17,17,17,.72)">2 equipos</strong>. Si cambias de
        ordenador, liberas una plaza desde el propio panel.<br>
        Guarda este correo: es tu comprobante.
      </div>
    </td></tr>

    <!-- Pie -->
    <tr><td style="background:${C.dark};padding:24px 34px">
      <div style="font-family:${TEXTO};font-size:12px;line-height:1.7;color:rgba(253,241,215,.55)">
        ${respuestas
          ? `¿Algo no encaja? <strong style="color:${C.cream}">Responde a este correo</strong> y te echamos una mano.`
          : `Escríbenos si algo no encaja.`}
      </div>
      <div style="font-family:${TEXTO};font-size:12px;line-height:1.7;color:rgba(253,241,215,.4);padding-top:6px">
        <a href="${sitio}" style="color:rgba(253,241,215,.6);text-decoration:none">caremcreativa.com</a>
        &nbsp;·&nbsp; @caremcreativa
      </div>
    </td></tr>

  </table>

</td></tr>
</table>
</body>
</html>`;

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
      subject: `Tu clave de Vértice — ${producto}`,
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
