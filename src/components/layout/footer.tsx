export function Footer() {
  return (
    <footer className="bg-dark">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <p className="font-display text-cream/80 text-xl uppercase tracking-widest">
          CaremCreativa
        </p>
        <p className="font-sans text-cream/50 text-sm">
          © {new Date().getFullYear()} ·{" "}
          <a
            href="mailto:Caremcreativa@gmail.com"
            className="hover:text-cream transition-colors"
          >
            Caremcreativa@gmail.com
          </a>
        </p>
      </div>
    </footer>
  );
}
