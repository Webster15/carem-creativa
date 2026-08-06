"use client";

import { Download, ChevronDown } from "lucide-react";

/**
 * Descarga del plugin y guías paso a paso.
 *
 * Las guías van en <details> nativos: se despliegan sin JavaScript, son
 * accesibles por teclado de serie, y mantienen corta la página — que era el
 * motivo de plegarlas.
 *
 * Se usa en la página de gracias y puede reutilizarse en /plugin.
 */

const INSTALAR = [
  {
    t: "Descarga el archivo LogoForge.zxp",
    d: "Con el botón de arriba. Guárdalo donde lo encuentres fácil, por ejemplo en Descargas.",
  },
  {
    t: "Instala un gestor de extensiones",
    d: "Un .zxp no se abre con doble clic. Necesitas ZXP Installer (gratuito) o el gestor " +
       "de extensiones de Anastasiy. Ambos son de un solo uso: instalas y te olvidas.",
  },
  {
    t: "Cierra Illustrator",
    d: "Del todo, no solo la ventana. Si está abierto, la extensión no aparecerá hasta reiniciarlo.",
  },
  {
    t: "Arrastra el .zxp al gestor",
    d: "Suéltalo sobre la ventana del instalador y confirma. Tarda unos segundos.",
  },
  {
    t: "Abre Illustrator y ve a Ventana › Extensiones › LogoForge",
    d: "El panel aparece acoplado como cualquier otro de Illustrator. Puedes moverlo donde quieras.",
  },
];

const ACTIVAR = [
  {
    t: "Abre el panel de LogoForge",
    d: "Ventana › Extensiones › LogoForge.",
  },
  {
    t: "Pulsa el banner azul de abajo",
    d: "Dice «Consigue tus herramientas». También sirve el icono de llave de la esquina superior derecha.",
  },
  {
    t: "Pega tu clave en «¿Ya tienes una clave?»",
    d: "La que aparece arriba en esta página y te llegó por correo. Tiene la forma LF-XXXX-XXXX-XXXX.",
  },
  {
    t: "Dale a Activar",
    d: "Las herramientas se descargan solas y quedan desbloqueadas en el panel. No hay que reiniciar nada.",
  },
];

function Pasos({ pasos }: { pasos: { t: string; d: string }[] }) {
  return (
    <ol className="mt-4 space-y-4">
      {pasos.map((p, i) => (
        <li key={p.t} className="flex items-start gap-4">
          <span className="font-display text-accent text-lg leading-none shrink-0 w-6 pt-0.5">
            {i + 1}
          </span>
          <span>
            <span className="block text-cream text-sm font-medium leading-snug">{p.t}</span>
            <span className="block mt-1 text-cream/55 text-sm leading-relaxed">{p.d}</span>
          </span>
        </li>
      ))}
    </ol>
  );
}

function Desplegable({
  titulo,
  children,
}: {
  titulo: string;
  children: React.ReactNode;
}) {
  return (
    <details className="group border border-cream/15 open:border-cream/30 transition-colors">
      <summary className="flex items-center justify-between gap-4 px-5 py-4 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
        <span className="font-display text-cream text-base uppercase leading-tight">
          {titulo}
        </span>
        <ChevronDown className="h-4 w-4 text-cream/50 shrink-0 transition-transform group-open:rotate-180" />
      </summary>
      <div className="px-5 pb-5">{children}</div>
    </details>
  );
}

export function GuiaInstalacion() {
  return (
    <div className="mt-12">
      <p className="text-cream/50 text-xs uppercase tracking-[0.2em] mb-4">
        Descarga el plugin
      </p>

      <a
        href="/descargas/LogoForge.zxp"
        download
        className="inline-flex items-center gap-2 bg-accent text-cream font-display text-sm px-8 py-4 tracking-[0.12em] uppercase hover:bg-cream hover:text-dark transition-colors"
      >
        <Download className="h-4 w-4" />
        Descargar LogoForge
      </a>
      <p className="mt-3 text-cream/50 text-xs">
        Archivo .zxp · Illustrator 2019 o posterior · Windows y macOS
      </p>

      <div className="mt-8 space-y-3">
        <Desplegable titulo="Cómo instalar el plugin">
          <Pasos pasos={INSTALAR} />
          <p className="mt-5 text-cream/40 text-xs leading-relaxed">
            ¿Se te resiste? Escríbenos y te acompañamos: es un paso que solo se hace una vez.
          </p>
        </Desplegable>

        <Desplegable titulo="Cómo activar tu licencia">
          <Pasos pasos={ACTIVAR} />
          <p className="mt-5 text-cream/40 text-xs leading-relaxed">
            Tu clave sirve para 2 equipos. Si cambias de ordenador, libera uno desde
            el propio panel con «Desactivar en este equipo».
          </p>
        </Desplegable>
      </div>
    </div>
  );
}
