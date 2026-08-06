/**
 * Ilustraciones de la guía de instalación.
 *
 * Son SVG dibujados a mano, no capturas: una captura de Illustrator envejece
 * con cada versión y cambia según el idioma y el sistema del usuario. Un
 * esquema aguanta, pesa nada y se lee igual en móvil.
 *
 * Todas comparten viewBox 0 0 240 140 y se pintan sobre las tarjetas crema
 * de la guía, así que los colores van fijos en hexadecimal.
 */

const DARK = "#111111";
const BRAND = "#3D6EEE";
const ACCENT = "#F75D45";
const CREAM = "#FDF1D7";

const marco = {
  viewBox: "0 0 240 140",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  className: "w-full h-auto",
} as const;

/** Ficha de archivo con la esquina doblada. */
function Archivo({ x, y, w = 58, h = 70 }: { x: number; y: number; w?: number; h?: number }) {
  const c = 15; // esquina doblada
  return (
    <>
      <path
        d={`M${x} ${y} h${w - c} l${c} ${c} v${h - c} h${-w} z`}
        fill="#fff"
        stroke={DARK}
        strokeWidth="2.5"
        strokeLinejoin="miter"
      />
      <path d={`M${x + w - c} ${y} v${c} h${c}`} stroke={DARK} strokeWidth="2.5" />
    </>
  );
}

/** Paso 1 — hacen falta dos descargas, no una. */
export function IlusDosArchivos() {
  return (
    <svg {...marco} role="img" aria-label="Dos archivos a descargar: el plugin y el instalador">
      <Archivo x={26} y={16} />
      <rect x={34} y={62} width={42} height={16} fill={BRAND} />
      <text x={55} y={74} textAnchor="middle" className="font-display" fontSize="11" fill={CREAM} letterSpacing="1">
        .ZXP
      </text>
      <text x={55} y={104} textAnchor="middle" className="font-display" fontSize="12" fill={DARK}>
        EL PLUGIN
      </text>

      <text x={120} y={62} textAnchor="middle" className="font-display" fontSize="26" fill={ACCENT}>
        +
      </text>

      <Archivo x={156} y={16} />
      <rect x={164} y={62} width={42} height={16} fill={DARK} />
      <text x={185} y={74} textAnchor="middle" className="font-display" fontSize="10" fill={CREAM} letterSpacing="1">
        EXE/DMG
      </text>
      <text x={185} y={104} textAnchor="middle" className="font-display" fontSize="12" fill={DARK}>
        INSTALADOR
      </text>

      <path d="M40 118 h160" stroke={DARK} strokeWidth="2" strokeDasharray="5 5" opacity="0.35" />
    </svg>
  );
}

/** Paso 2 — cerrar Illustrator del todo antes de instalar. */
export function IlusCerrarAi() {
  return (
    <svg {...marco} role="img" aria-label="Cerrar por completo la ventana de Illustrator">
      <rect x={30} y={22} width={180} height={96} fill="#fff" stroke={DARK} strokeWidth="2.5" />
      <rect x={30} y={22} width={180} height={22} fill={DARK} />
      <rect x={38} y={28} width={12} height={10} fill="#FF9A00" />
      <text x={44} y={37} textAnchor="middle" className="font-display" fontSize="9" fill={DARK}>
        Ai
      </text>
      <path d="M192 29 l10 8 M202 29 l-10 8" stroke={ACCENT} strokeWidth="2.6" strokeLinecap="round" />
      <circle cx={197} cy={33} r={12} stroke={ACCENT} strokeWidth="2.5" fill="none" />

      {/* lienzo tenue: lo que se está cerrando */}
      <path d="M52 60 h60 M52 74 h96 M52 88 h72 M52 102 h44" stroke={DARK} strokeWidth="2" opacity="0.18" />
    </svg>
  );
}

/** Paso 4 — el .zxp entra en el instalador. */
export function IlusSoltarZxp() {
  return (
    <svg {...marco} role="img" aria-label="El archivo .zxp se abre con el instalador">
      <rect x={44} y={44} width={152} height={80} fill="#fff" stroke={DARK} strokeWidth="2.5" />
      <rect x={44} y={44} width={152} height={18} fill={DARK} />
      <circle cx={54} cy={53} r={3} fill={ACCENT} />
      <circle cx={64} cy={53} r={3} fill={CREAM} opacity="0.5" />

      <rect
        x={60}
        y={74}
        width={120}
        height={36}
        stroke={BRAND}
        strokeWidth="2.5"
        strokeDasharray="7 5"
        fill={BRAND}
        fillOpacity="0.07"
      />
      <text x={120} y={97} textAnchor="middle" className="font-display" fontSize="12" fill={BRAND} letterSpacing="1">
        SUÉLTALO AQUÍ
      </text>

      {/* el archivo cayendo dentro */}
      <g transform="translate(96 4)">
        <Archivo x={0} y={0} w={38} h={34} />
        <rect x={5} y={12} width={26} height={12} fill={BRAND} />
        <text x={18} y={22} textAnchor="middle" className="font-display" fontSize="8" fill={CREAM}>
          ZXP
        </text>
      </g>
      <path d="M120 42 v-4" stroke={DARK} strokeWidth="2.5" />
      <path d="M113 36 l7 8 l7 -8" fill="none" stroke={DARK} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Paso 5 — dónde aparece el panel dentro de Illustrator. */
export function IlusMenu() {
  return (
    <svg {...marco} role="img" aria-label="Menú Ventana, Extensiones, LogoForge">
      <rect x={16} y={16} width={208} height={20} fill={DARK} />
      <text x={26} y={30} className="font-display" fontSize="11" fill={CREAM} opacity="0.5">
        Archivo
      </text>
      <text x={70} y={30} className="font-display" fontSize="11" fill={CREAM} opacity="0.5">
        Objeto
      </text>
      <rect x={108} y={16} width={54} height={20} fill={BRAND} />
      <text x={135} y={30} textAnchor="middle" className="font-display" fontSize="11" fill={CREAM}>
        Ventana
      </text>

      <rect x={108} y={40} width={104} height={26} fill="#fff" stroke={DARK} strokeWidth="2.5" />
      <text x={118} y={57} className="font-display" fontSize="11" fill={DARK}>
        Extensiones
      </text>
      <path d="M196 48 l6 5 l-6 5" stroke={DARK} strokeWidth="2" fill="none" strokeLinecap="round" />

      <rect x={126} y={78} width={98} height={26} fill={ACCENT} stroke={DARK} strokeWidth="2.5" />
      <text x={175} y={95} textAnchor="middle" className="font-display" fontSize="11" fill={CREAM} letterSpacing="0.5">
        LOGOFORGE
      </text>
      <path d="M212 66 v12" stroke={DARK} strokeWidth="2" strokeDasharray="3 3" />
    </svg>
  );
}

/** Activación — el banner azul del panel. */
export function IlusPanel() {
  return (
    <svg {...marco} role="img" aria-label="El panel de LogoForge y su banner azul">
      <rect x={68} y={10} width={104} height={120} fill="#fff" stroke={DARK} strokeWidth="2.5" />
      <rect x={68} y={10} width={104} height={18} fill={DARK} />
      <text x={78} y={23} className="font-display" fontSize="9" fill={CREAM} letterSpacing="0.5">
        LOGOFORGE
      </text>

      {/* rejilla de herramientas */}
      {[0, 1, 2, 3, 4].map((i) => (
        <rect
          key={i}
          x={78 + (i % 2) * 44}
          y={38 + Math.floor(i / 2) * 26}
          width={38}
          height={20}
          fill={DARK}
          opacity={i === 0 ? 0.75 : 0.16}
        />
      ))}

      <rect x={74} y={112} width={92} height={14} fill={BRAND} />
      <text x={120} y={122} textAnchor="middle" className="font-display" fontSize="7.5" fill={CREAM}>
        CONSIGUE TUS HERRAMIENTAS
      </text>

      {/* puntero señalando el banner */}
      <path d="M186 100 l-14 18" stroke={ACCENT} strokeWidth="2.5" strokeLinecap="round" />
      <path d="M172 118 l10 -3 l-4 -6 z" fill={ACCENT} />
    </svg>
  );
}

/** Activación — pegar la clave. */
export function IlusClave() {
  return (
    <svg {...marco} role="img" aria-label="Pegar la clave y pulsar Activar">
      <rect x={24} y={34} width={192} height={72} fill="#fff" stroke={DARK} strokeWidth="2.5" />
      <text x={38} y={56} className="font-display" fontSize="10" fill={DARK} opacity="0.55" letterSpacing="1">
        ¿YA TIENES UNA CLAVE?
      </text>
      <rect x={38} y={64} width={110} height={24} fill={CREAM} stroke={DARK} strokeWidth="2" />
      <text x={48} y={81} fontFamily="monospace" fontSize="11" fill={DARK} letterSpacing="0.5">
        LF-••••-••••
      </text>
      <rect x={156} y={64} width={46} height={24} fill={ACCENT} />
      <text x={179} y={80} textAnchor="middle" className="font-display" fontSize="10" fill={CREAM}>
        ACTIVAR
      </text>
    </svg>
  );
}
