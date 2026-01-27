import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar } from "lucide-react";
import heroImage from "@/assets/hero-mri.jpg";

export function Hero() {
  const AGENDAMIENTO_URL = "https://www.medyrad.cl/agendamiento"; 

  return (
    <section id="inicio" className="relative w-full h-screen min-h-[600px] flex items-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Modern MRI Machine" 
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-transparent mix-blend-multiply" />
        <div className="absolute inset-0 bg-black/20" /> {/* Extra dimming */}
      </div>

      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="max-w-3xl space-y-6 animate-in slide-in-from-left duration-700 fade-in">
          <div className="inline-block px-3 py-1 bg-secondary/90 text-white rounded-full text-sm font-medium tracking-wide mb-2 backdrop-blur-sm">
            Líderes en Imagenología
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-heading font-extrabold text-white leading-[1.1] tracking-tight drop-shadow-sm">
            Diagnóstico Preciso, <br />
            <span className="text-secondary-foreground text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-200">
              Cuidado Humano.
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-100 max-w-xl leading-relaxed font-light drop-shadow-sm">
            En MEDYRAD combinamos tecnología de vanguardia con un equipo de especialistas comprometidos con su salud y bienestar. Resultados rápidos y confiables.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button 
              asChild 
              size="lg" 
              className="bg-secondary hover:bg-secondary/90 text-white text-lg px-8 rounded-full shadow-xl shadow-secondary/20 transition-all hover:scale-105 h-14"
            >
              <a href={AGENDAMIENTO_URL} target="_blank" rel="noopener noreferrer">
                <Calendar className="mr-2 h-5 w-5" /> Agendar Hora
              </a>
            </Button>
            
            <Button 
              asChild 
              size="lg" 
              variant="outline" 
              className="bg-white/10 hover:bg-white/20 text-white border-white/30 text-lg px-8 rounded-full backdrop-blur-sm transition-all h-14"
            >
              <a href="#servicios">
                Nuestros Servicios <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-white/70">
        <div className="w-6 h-10 border-2 border-current rounded-full flex justify-center p-1">
          <div className="w-1 h-3 bg-current rounded-full" />
        </div>
      </div>
    </section>
  );
}
