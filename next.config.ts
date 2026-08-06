import type { NextConfig } from "next";

/**
 * Cabeceras de seguridad.
 *
 * NO se pone `script-src` ni `style-src`. Una CSP de scripts estricta rompe
 * Next (inyecta scripts en línea), framer-motion y los widgets de voz y chat,
 * y una CSP rota se nota como una web que no carga. Las directivas de aquí
 * abajo cortan ataques reales sin ese riesgo:
 *
 *   frame-ancestors  impide que metan el sitio en un iframe ajeno para
 *                    engañar a alguien con clics superpuestos.
 *   base-uri         impide que una inyección cambie <base> y desvíe todas
 *                    las rutas relativas a un dominio del atacante.
 *   object-src       cierra <object>/<embed>, vía clásica de ejecución.
 *   form-action      impide que un formulario del sitio envíe a otro sitio.
 *
 * Si algún día quieres una CSP completa, el camino es ponerla primero en
 * modo Report-Only con un endpoint que recoja los avisos, no directamente.
 */
const CSP = [
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "object-src 'none'",
  "form-action 'self'",
].join("; ");

const CABECERAS = [
  { key: "Content-Security-Policy", value: CSP },

  // Evita que el navegador adivine el tipo de un archivo y acabe ejecutando
  // como script algo que se sirvió como texto.
  { key: "X-Content-Type-Options", value: "nosniff" },

  // frame-ancestors ya lo cubre en navegadores modernos; esto es el respaldo
  // para los que no leen CSP.
  { key: "X-Frame-Options", value: "DENY" },

  // Al salir del sitio solo se manda el dominio, nunca la ruta completa: las
  // URLs de /plugin/gracias llevan la referencia y el testigo de una compra.
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },

  // El sitio no necesita ninguna de estas, así que se apagan de raíz.
  //
  // NO se bloquea `microphone`: lo usa el asistente de voz. Ni `payment`:
  // hoy daría igual porque el checkout es una redirección a Lemon Squeezy,
  // pero si algún día se usa el incrustado, bloquearlo tumbaría Apple Pay y
  // Google Pay sin dar ninguna pista de por qué.
  {
    key: "Permissions-Policy",
    value: "camera=(), geolocation=(), usb=(), interest-cohort=()",
  },

  // Dos años e incluyendo subdominios. Vercel ya mandaba el max-age; esto
  // añade los subdominios, que es donde vive lab.caremcreativa.com.
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "mir-s3-cdn-cf.behance.net",
        pathname: "/**",
      },
    ],
  },

  async headers() {
    return [
      { source: "/:path*", headers: CABECERAS },

      // El .zxp se descarga, nunca se abre en el navegador. Forzarlo evita
      // que un navegador decida representarlo por su cuenta.
      {
        source: "/descargas/:archivo*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Content-Disposition", value: "attachment" },
        ],
      },
    ];
  },
};

export default nextConfig;
