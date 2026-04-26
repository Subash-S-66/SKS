import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Features } from "@/components/sections/Features";
import { Portfolio } from "@/components/sections/Portfolio";
import { Testimonials } from "@/components/sections/Testimonials";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Hero />
      <Features />
      <Services />
      <Portfolio />
      <Testimonials />

      {/* Spacer / Divider before Contact */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-10" />

      <Contact />
      <Footer />
    </main>
  );
}
