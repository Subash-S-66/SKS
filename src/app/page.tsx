import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Hero />
      <Services />

      {/* Spacer / Divider */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-10" />

      <Contact />
      <Footer />
    </main>
  );
}
