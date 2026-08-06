/**
 * LogoForge — catálogo y precios
 * ---------------------------------------------------------------
 * Los precios se definen en USD, pero Wompi solo liquida en pesos
 * colombianos, así que hay que convertir en cada compra.
 *
 * La conversión consulta una API de divisas, pero SIEMPRE con un tipo de
 * cambio de reserva configurado: si la API falla, la venta sigue adelante
 * con el respaldo en lugar de romperse en el momento de pagar.
 */

export type IdHerramienta =
  | "construccion"
  | "reticula"
  | "mesasColor"
  | "areaRespeto";

export const HERRAMIENTAS: Record<
  IdHerramienta,
  { nombre: string; descripcion: string }
> = {
  construccion: {
    nombre: "Construcción geométrica",
    descripcion:
      "Detecta las rectas y circunferencias del logo, las prolonga hasta los bordes " +
      "de la mesa de trabajo y acota los ángulos de inclinación.",
  },
  reticula: {
    nombre: "Retícula modular",
    descripcion:
      "Retículas de columnas y filas sobre la mesa de trabajo, con preajustes " +
      "clásicos: Müller-Brockmann, editorial, sección áurea, canon de Villard.",
  },
  mesasColor: {
    nombre: "Versiones sobre color",
    descripcion:
      "Una mesa de trabajo por cada color de fondo, con el logo centrado y " +
      "el nombre listo para exportar.",
  },
  areaRespeto: {
    nombre: "Área de respeto",
    descripcion:
      "Área de seguridad calculada a partir de una medida X tomada del propio " +
      "logo, justificada y escalable.",
  },
};

export type IdProducto = IdHerramienta | "pack";

/** Lo que desbloquea cada producto y cuánto cuesta en dólares. */
export const PRODUCTOS: Record<
  IdProducto,
  { nombre: string; usd: number; herramientas: IdHerramienta[] }
> = {
  construccion: { nombre: "Construcción geométrica", usd: 4, herramientas: ["construccion"] },
  reticula:     { nombre: "Retícula modular",        usd: 4, herramientas: ["reticula"] },
  mesasColor:   { nombre: "Versiones sobre color",   usd: 4, herramientas: ["mesasColor"] },
  areaRespeto:  { nombre: "Área de respeto",         usd: 4, herramientas: ["areaRespeto"] },
  pack: {
    nombre: "Pack completo",
    usd: 10,
    herramientas: ["construccion", "reticula", "mesasColor", "areaRespeto"],
  },
};

export function esProducto(v: unknown): v is IdProducto {
  return typeof v === "string" && v in PRODUCTOS;
}

// ---------------------------------------------------------------
// Conversión USD → COP
// ---------------------------------------------------------------

const FUENTE = "https://open.er-api.com/v6/latest/USD";

/** Tipo de cambio de reserva. Se usa si la API de divisas no responde. */
function respaldo(): number {
  const v = Number(process.env.USD_COP_RESPALDO);
  return Number.isFinite(v) && v > 0 ? v : 4000;
}

let cache: { tasa: number; hasta: number } | null = null;

/**
 * Tipo de cambio USD→COP. Se guarda en memoria una hora: no tiene sentido
 * consultarlo en cada visita, y así una caída momentánea no afecta.
 */
export async function tasaUsdCop(): Promise<{ tasa: number; origen: "api" | "respaldo" }> {
  if (cache && cache.hasta > Date.now()) {
    return { tasa: cache.tasa, origen: "api" };
  }
  try {
    const res = await fetch(FUENTE, { signal: AbortSignal.timeout(4000) });
    if (res.ok) {
      const d = (await res.json()) as { result?: string; rates?: Record<string, number> };
      const tasa = d?.rates?.COP;
      if (d?.result === "success" && typeof tasa === "number" && tasa > 0) {
        cache = { tasa, hasta: Date.now() + 3600_000 };
        return { tasa, origen: "api" };
      }
    }
  } catch {
    // Se cae al respaldo sin ruido: el objetivo es no bloquear la compra.
  }
  console.error("[plugin/precios] usando tipo de cambio de respaldo");
  return { tasa: respaldo(), origen: "respaldo" };
}

/**
 * Precio en pesos, redondeado al millar para que la cifra sea presentable.
 * Wompi trabaja en centavos, de ahí el segundo valor.
 */
export async function precioCop(producto: IdProducto) {
  const { tasa, origen } = await tasaUsdCop();
  const usd = PRODUCTOS[producto].usd;
  const cop = Math.round((usd * tasa) / 1000) * 1000;
  return { usd, cop, centavos: cop * 100, tasa, origen };
}

export function formateaCop(cop: number): string {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(cop);
}
