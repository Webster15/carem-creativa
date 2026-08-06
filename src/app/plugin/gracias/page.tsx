"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Check, Copy, Loader2, XCircle, KeyRound } from "lucide-react";
import { GuiaInstalacion } from "@/components/plugin/GuiaInstalacion";

type Estado =
  | { fase: "cargando" }
  | { fase: "lista"; clave: string; correo: string }
  | { fase: "pendiente" }
  | { fase: "sin-rastro" }
  | { fase: "error"; mensaje: string };

/**
 * Página de retorno de Wompi.
 *
 * El id de transacción llega por la URL, que controla el navegador, así que
 * no basta con creérselo. No se puede verificar contra la API de Wompi —su
 * cortafuegos bloquea las peticiones desde centros de datos—, así que la
 * URL trae además un testigo firmado por el servidor al iniciar la compra,
 * y es eso lo que se comprueba.
 *
 * La clave se muestra aquí además de enviarse por correo, para que un fallo
 * del correo no deje al cliente sin lo que ha pagado.
 */
function Contenido() {
  const params = useSearchParams();
  const id = params.get("id");
  const token = params.get("t");
  // La ausencia de id se conoce ya en el primer render, así que se resuelve
  // en el estado inicial en lugar de con un setState dentro del efecto.
  const [estado, setEstado] = useState<Estado>(() =>
    id && token
      ? { fase: "cargando" }
      : { fase: "error", mensaje: "El enlace de retorno está incompleto." }
  );
  const [copiado, setCopiado] = useState(false);

  useEffect(() => {
    if (!id || !token) return;

    let intentos = 0;
    let vivo = true;

    async function consulta() {
      try {
        const res = await fetch("/api/plugin/licencia-de-transaccion", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ transaccion: id, token }),
        });
        const d = await res.json();
        if (!vivo) return;

        if (!res.ok) {
          setEstado({ fase: "error", mensaje: d.error || "No se pudo comprobar el pago." });
          return;
        }
        if (d.clave) {
          setEstado({ fase: "lista", clave: d.clave, correo: d.correo });
          return;
        }
        // El webhook tarda unos segundos en emitir la licencia. Si tras
        // varios intentos sigue sin aparecer, o el pago no se aprobó o algo
        // falló: en cualquier caso hay que decírselo a la persona.
        if (++intentos < 12) {
          setEstado({ fase: "pendiente" });
          setTimeout(consulta, 2500);
        } else {
          setEstado({ fase: "sin-rastro" });
        }
      } catch {
        if (vivo) setEstado({ fase: "error", mensaje: "Error de red." });
      }
    }

    consulta();
    return () => { vivo = false; };
  }, [id, token]);

  async function copia(clave: string) {
    try {
      await navigator.clipboard.writeText(clave);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    } catch { /* el usuario siempre puede seleccionarla a mano */ }
  }

  return (
    <section className="bg-brand min-h-screen w-full">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 py-20 sm:py-28">
        {(estado.fase === "cargando" || estado.fase === "pendiente") && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Loader2 className="h-8 w-8 text-cream animate-spin" />
            <h1
              className="font-display text-cream leading-[0.9] uppercase mt-6"
              style={{ fontSize: "clamp(2rem, 6vw, 3.5rem)" }}
            >
              {estado.fase === "cargando" ? "Comprobando el pago" : "Generando tu clave"}
            </h1>
            <p className="mt-4 text-cream/70 text-base leading-relaxed max-w-lg">
              {estado.fase === "cargando"
                ? "Un momento, estamos confirmando la transacción."
                : "El pago está aprobado. Estamos emitiendo tu licencia, tarda unos segundos."}
            </p>
          </motion.div>
        )}

        {estado.fase === "lista" && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="h-12 w-12 bg-accent flex items-center justify-center">
              <Check className="h-6 w-6 text-cream" />
            </div>
            <p className="text-accent text-xs font-semibold tracking-[0.3em] uppercase mt-8">
              Compra confirmada
            </p>
            <h1
              className="font-display text-cream leading-[0.88] uppercase mt-3"
              style={{ fontSize: "clamp(2.2rem, 7vw, 4rem)" }}
            >
              Ya es tuyo
            </h1>

            <div className="mt-10 bg-dark/30 border-2 border-cream/25 p-6 sm:p-8">
              <p className="text-cream/50 text-xs uppercase tracking-[0.2em]">
                Tu clave de licencia
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-4">
                <code className="font-display text-cream text-2xl sm:text-3xl tracking-[0.08em]">
                  {estado.clave}
                </code>
                <button
                  type="button"
                  onClick={() => copia(estado.clave)}
                  className="inline-flex items-center gap-2 border border-cream/30 text-cream text-xs font-display px-4 py-2 tracking-[0.12em] uppercase hover:border-cream transition-colors"
                >
                  {copiado ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                  {copiado ? "Copiada" : "Copiar"}
                </button>
              </div>
              <p className="mt-4 text-cream/50 text-sm">
                También te la hemos enviado a <strong className="text-cream/80">{estado.correo}</strong>.
                Guarda ese correo: es tu comprobante.
              </p>
            </div>

            <GuiaInstalacion />
          </motion.div>
        )}

        {estado.fase === "sin-rastro" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <XCircle className="h-10 w-10 text-cream/60" />
            <h1
              className="font-display text-cream leading-[0.9] uppercase mt-6"
              style={{ fontSize: "clamp(2rem, 6vw, 3.5rem)" }}
            >
              No encontramos tu compra
            </h1>
            <p className="mt-4 text-cream/70 text-base leading-relaxed max-w-lg">
              Si el pago no se completó, no se te ha cobrado nada y puedes volver
              a intentarlo. Si sí pagaste, escríbenos con la fecha y el correo
              que usaste y te enviamos la clave a mano.
            </p>
            <a
              href="/plugin"
              className="inline-flex items-center gap-2 bg-accent text-cream font-display text-sm px-8 py-4 tracking-[0.12em] uppercase hover:bg-cream hover:text-dark transition-colors mt-8"
            >
              Volver a la tienda
            </a>
          </motion.div>
        )}

        {estado.fase === "error" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <KeyRound className="h-10 w-10 text-cream/60" />
            <h1
              className="font-display text-cream leading-[0.9] uppercase mt-6"
              style={{ fontSize: "clamp(2rem, 6vw, 3.5rem)" }}
            >
              Algo salió mal
            </h1>
            <p className="mt-4 text-cream/70 text-base leading-relaxed max-w-lg">
              {estado.mensaje} Si ya has pagado, no te preocupes: la clave te llega
              igualmente por correo. Escríbenos si no aparece en unos minutos.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}

export default function GraciasPage() {
  return (
    <Suspense
      fallback={
        <section className="bg-brand min-h-screen w-full">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 py-20">
            <Loader2 className="h-8 w-8 text-cream animate-spin" />
          </div>
        </section>
      }
    >
      <Contenido />
    </Suspense>
  );
}
