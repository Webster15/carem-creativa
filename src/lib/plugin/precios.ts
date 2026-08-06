/**
 * Vértice — catálogo y precios
 * ---------------------------------------------------------------
 * Los precios viven en dólares y se cobran en dólares. Con Wompi había que
 * convertirlos a pesos en cada compra; con Lemon Squeezy el importe lo pone
 * la variante en su panel, así que estos valores son solo para mostrarlos.
 *
 * Si cambias un precio, cámbialo también en el producto de Lemon Squeezy:
 * el que se cobra de verdad es el suyo.
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
  construccion: { nombre: "Construcción geométrica", usd: 6, herramientas: ["construccion"] },
  reticula:     { nombre: "Retícula modular",        usd: 6, herramientas: ["reticula"] },
  mesasColor:   { nombre: "Versiones sobre color",   usd: 6, herramientas: ["mesasColor"] },
  areaRespeto:  { nombre: "Área de respeto",         usd: 6, herramientas: ["areaRespeto"] },
  pack: {
    nombre: "Pack completo",
    usd: 11.99,
    herramientas: ["construccion", "reticula", "mesasColor", "areaRespeto"],
  },
};

export function esProducto(v: unknown): v is IdProducto {
  return typeof v === "string" && v in PRODUCTOS;
}
