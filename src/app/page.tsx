import { Hero } from "@/components/sections/hero";
import { ServicesGrid } from "@/components/sections/services-grid";
import { PortfolioTeaser } from "@/components/sections/portfolio-teaser";
import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <>
      <Hero />
      <ServicesGrid />
      <PortfolioTeaser />
      <About />
      <Contact />
    </>
  );
}
