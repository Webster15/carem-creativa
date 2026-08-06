"use client";

import { Download, ExternalLink, ChevronDown, Apple, Monitor } from "lucide-react";
import {
  IlusDosArchivos,
  IlusCerrarAi,
  IlusSoltarZxp,
  IlusMenu,
  IlusPanel,
  IlusClave,
} from "./ilustraciones";

/**
 * Guía de instalación paso a paso.
 *
 * Instalar un .zxp es la barrera de entrada del producto: quien se atasca
 * aquí no llega a usar nada. Por eso va desplegada y con esquema en cada
 * paso, en vez de un acordeón que hay que ir abriendo.
 *
 * El instalador se enlaza a la página oficial de aescripts en vez de a su
 * binario: los enlaces directos a su CDN cambian con cada versión, y un
 * instalador que no descarga es peor que un clic de más.
 *
 * Se usa en /plugin (sección «descargar») y en /plugin/gracias.
 */

const ZXP_INSTALLER = "https://aescripts.com/learn/zxp-installer/";

type PasoProps = {
  n: number;
  titulo: string;
  children: React.ReactNode;
  ilustracion?: React.ReactNode;
};

function Paso({ n, titulo, children, ilustracion }: PasoProps) {
  return (
    <li className="bg-cream border-2 border-dark">
      {/* La segunda columna se reserva siempre, tenga ilustración o no: así
          todos los pasos comparten el mismo ancho de texto. */}
      <div className="grid md:grid-cols-[1fr_240px] gap-6 p-6 sm:p-8">
        <div>
          <div className="flex items-baseline gap-4">
            <span className="font-display text-accent text-3xl leading-none shrink-0">
              {String(n).padStart(2, "0")}
            </span>
            <h3 className="font-display text-dark text-xl sm:text-2xl uppercase leading-tight">
              {titulo}
            </h3>
          </div>
          <div className="mt-4 space-y-3 text-dark/70 text-sm leading-relaxed">
            {children}
          </div>
        </div>

        {ilustracion && (
          <div className="md:pt-2 seVT-start">{ilustracion}</div>
        )}
      </div>
    </li>
  );
}

function Sistema({
  icono: Icono,
  nombre,
  children,
}: {
  icono: typeof Apple;
  nombre: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3 border border-dark/20 p-3">
      <Icono className="h-4 w-4 text-brand shrink-0 mt-0.5" />
      <p className="text-dark/70 text-sm leading-relaxed">
        <strong className="text-dark font-semibold">{nombre}:</strong> {children}
      </p>
    </div>
  );
}

function Problema({ p, r }: { p: string; r: React.ReactNode }) {
  return (
    <details className="group border border-cream/20 open:border-cream/40 transition-colors">
      <summary className="flex items-center justify-between gap-4 px-5 py-3.5 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
        <span className="text-cream text-sm font-medium">{p}</span>
        <ChevronDown className="h-4 w-4 text-cream/50 shrink-0 transition-transform group-open:rotate-180" />
      </summary>
      <p className="px-5 pb-4 text-cream/60 text-sm leading-relaxed">{r}</p>
    </details>
  );
}

/**
 * `conTitulo` se apaga en /plugin, donde la sección ya trae su propio
 * encabezado y repetirlo sonaría a tartamudeo.
 */
export function GuiaInstalacion({ conTitulo = true }: { conTitulo?: boolean }) {
  return (
    <div className="mt-12">
      {conTitulo && (
        <>
          <p className="text-cream/50 text-xs uppercase tracking-[0.2em]">
            Cinco pasos · una sola vez
          </p>
          <h3
            className="font-display text-cream uppercase leading-[0.9] mt-2"
            style={{ fontSize: "clamp(1.8rem, 5vw, 3rem)" }}
          >
            Cómo instalarlo
          </h3>
        </>
      )}
      <p className="mt-4 max-w-xl text-cream/70 text-sm leading-relaxed">
        Illustrator no instala extensiones por sí solo, así que el primer paso
        lleva dos descargas en lugar de una. Se hace una vez y nunca más.
      </p>

      <ol className="mt-8 space-y-4">
        <Paso n={1} titulo="Descarga los dos archivos" ilustracion={<IlusDosArchivos />}>
          <p>
            El plugin viene en un archivo <code className="font-mono text-dark">.zxp</code>, que
            es un paquete de extensión. <strong className="text-dark">No se abre con doble
            clic tal cual</strong>: hace falta un instalador, gratuito y de un solo uso.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <a
              href="/descargas/Vertice.zxp"
              download
              className="inline-flex items-center gap-2 bg-accent text-cream font-display text-sm px-6 py-3.5 tracking-[0.12em] uppercase hover:bg-dark transition-colors"
            >
              <Download className="h-4 w-4" />
              Vertice.zxp
            </a>
            <a
              href={ZXP_INSTALLER}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border-2 border-dark text-dark font-display text-sm px-6 py-3.5 tracking-[0.12em] uppercase hover:bg-dark hover:text-cream transition-colors"
            >
              <ExternalLink className="h-4 w-4" />
              ZXP Installer
            </a>
          </div>
          <p className="text-dark/50 text-xs">
            El instalador es de aescripts, es gratuito y sirve para cualquier extensión de
            Adobe. En su página elige la descarga de tu sistema.
          </p>
        </Paso>

        <Paso n={2} titulo="Cierra Illustrator del todo" ilustracion={<IlusCerrarAi />}>
          <p>
            No basta con cerrar el documento: cierra el programa entero. Illustrator lee las
            extensiones al arrancar, así que{" "}
            <strong className="text-dark">si lo dejas abierto, el panel no aparecerá</strong>{" "}
            aunque la instalación haya ido bien.
          </p>
          <p className="text-dark/50 text-xs">
            En Windows compruébalo en la barra de tareas; en Mac, que no quede el punto bajo
            el icono del Dock.
          </p>
        </Paso>

        <Paso n={3} titulo="Instala el ZXP Installer">
          <p>
            Es un instalador normal y corriente: lo abres, siguiente, siguiente, listo. No
            toca tus archivos ni tus documentos de Illustrator.
          </p>
          <p className="text-dark/50 text-xs">
            Si tu sistema avisa de que es de un desarrollador desconocido, es lo habitual con
            herramientas pequeñas. Lo descargas de la web oficial de aescripts, que es un
            proveedor conocido del mundo Adobe.
          </p>
        </Paso>

        <Paso n={4} titulo="Abre Vertice.zxp con el instalador" ilustracion={<IlusSoltarZxp />}>
          <p>Aquí cambia según el sistema:</p>
          <div className="space-y-2 pt-1">
            <Sistema icono={Monitor} nombre="Windows">
              haz <strong className="text-dark">doble clic</strong> sobre el archivo{" "}
              <code className="font-mono text-dark">Vertice.zxp</code> que descargaste.
            </Sistema>
            <Sistema icono={Apple} nombre="macOS">
              abre el instalador y{" "}
              <strong className="text-dark">arrastra el archivo</strong> a su ventana.
            </Sistema>
          </div>
          <p>Tarda unos segundos y te avisa cuando termina.</p>
        </Paso>

        <Paso n={5} titulo="Abre Illustrator y busca el panel" ilustracion={<IlusMenu />}>
          <p>
            Ve a <strong className="text-dark">Ventana › Extensiones › Vértice</strong>. Si
            tienes Illustrator en inglés, la ruta es{" "}
            <strong className="text-dark">Window › Extensions › Vértice</strong>.
          </p>
          <p>
            El panel aparece acoplado como cualquier otro de Illustrator: puedes moverlo,
            anclarlo donde quieras o dejarlo flotando.
          </p>
          <p className="text-dark/50 text-xs">
            Ya puedes usar el generador de códigos QR, que va incluido gratis.
          </p>
        </Paso>
      </ol>

      {/* ── Activación ────────────────────────────────────────────────── */}
      <div className="mt-14">
        <p className="text-cream/50 text-xs uppercase tracking-[0.2em]">
          Si has comprado alguna herramienta
        </p>
        <h3
          className="font-display text-cream uppercase leading-[0.9] mt-2"
          style={{ fontSize: "clamp(1.8rem, 5vw, 3rem)" }}
        >
          Cómo activar tu clave
        </h3>

        <ol className="mt-8 space-y-4">
          <Paso n={6} titulo="Pulsa el banner azul del panel" ilustracion={<IlusPanel />}>
            <p>
              Abajo del todo, en el panel, hay una franja azul que dice{" "}
              <strong className="text-dark">«Consigue tus herramientas»</strong>. Ábrela: ahí
              está la tienda y también la activación.
            </p>
            <p className="text-dark/50 text-xs">
              También sirve el icono de llave de la esquina superior derecha.
            </p>
          </Paso>

          <Paso n={7} titulo="Pega la clave y dale a Activar" ilustracion={<IlusClave />}>
            <p>
              En <strong className="text-dark">«¿Ya tienes una clave?»</strong> pega la clave
              que te llegó por correo. Tiene la forma{" "}
              <code className="font-mono text-dark">VT-XXXX-XXXX-XXXX</code>.
            </p>
            <p>
              Las herramientas se descargan solas y quedan desbloqueadas. No hay que
              reiniciar nada.
            </p>
            <p className="text-dark/50 text-xs">
              Tu clave sirve para 2 equipos. Si cambias de ordenador, liberas una plaza desde
              el propio panel con «Desactivar en este equipo».
            </p>
          </Paso>
        </ol>
      </div>

      {/* ── Si algo falla ─────────────────────────────────────────────── */}
      <div className="mt-14">
        <p className="text-cream/50 text-xs uppercase tracking-[0.2em] mb-4">
          Si algo no sale
        </p>
        <div className="space-y-2">
          <Problema
            p="Instalé el plugin pero no aparece en Extensiones"
            r="Casi siempre es que Illustrator estaba abierto durante la instalación. Ciérralo del todo, vuelve a abrirlo y míralo otra vez. Si sigue sin salir, reinstala el .zxp con Illustrator ya cerrado."
          />
          <Problema
            p="El doble clic sobre el .zxp no hace nada"
            r="Es que aún no está instalado el ZXP Installer, o Windows no ha asociado el tipo de archivo. Abre el instalador primero y arrastra el .zxp a su ventana."
          />
          <Problema
            p="Mi clave dice que no es válida"
            r="Cópiala del correo entera, sin espacios al principio ni al final, y con los guiones. Si ya la usaste en dos equipos, libera uno desde el panel del equipo antiguo. Si nada de eso encaja, responde al correo de tu compra y lo miramos."
          />
          <Problema
            p="Uso una versión antigua de Illustrator"
            r="Hace falta Illustrator 2019 o posterior, en Windows o macOS. En versiones anteriores el panel no llega a cargarse."
          />
        </div>
      </div>
    </div>
  );
}
