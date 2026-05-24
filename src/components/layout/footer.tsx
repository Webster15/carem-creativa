export function Footer() {
  return (
    <footer className="bg-dark">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <p className="font-display text-cream/80 text-xl uppercase tracking-widest">
          Estudio
        </p>
        <p className="font-sans text-cream/50 text-sm">
          © {new Date().getFullYear()} ·{" "}
          <a
            href="mailto:hola@estudio.test"
            className="hover:text-cream transition-colors"
          >
            hola@estudio.test
          </a>
        </p>
      </div>
    </footer>
  );
}
