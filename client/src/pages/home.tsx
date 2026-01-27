import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { About } from "@/components/sections/About";
import { Technology } from "@/components/sections/Technology";
import { Contact } from "@/components/sections/Contact";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen bg-background font-sans">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <About />
        <Technology />
        
        {/* Call to Action Strip */}
        <section className="bg-secondary py-16 text-white text-center">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
              ¿Necesita realizarse un examen?
            </h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Agende su hora hoy mismo de forma rápida y sencilla a través de nuestra plataforma online.
            </p>
            <Button size="lg" className="bg-white text-secondary hover:bg-gray-100 font-bold rounded-full px-10 h-14 text-lg shadow-xl">
              Agendar mi Hora
            </Button>
          </div>
        </section>

        <Contact />
      </main>
      <Footer />
    </div>
  );
}
