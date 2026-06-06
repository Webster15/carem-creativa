"use client";

import { usePathname } from "next/navigation";
import { Header } from "./header";
import { Footer } from "./footer";

// Rutas que se muestran "limpias", sin header ni footer del sitio
const BARE_ROUTES = ["/bio"];

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const bare = BARE_ROUTES.includes(pathname);

  return (
    <>
      {!bare && <Header />}
      <main className="flex-1">{children}</main>
      {!bare && <Footer />}
    </>
  );
}
