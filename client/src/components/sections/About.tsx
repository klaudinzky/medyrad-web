import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import teamImg from "@/assets/team-clinic.jpg";

export function About() {
  const benefits = [
    "Tecnología de vanguardia en imagenología",
    "Equipo médico altamente calificado",
    "Resultados rápidos y diagnósticos precisos",
    "Atención cálida y personalizada",
    "Convenios con Isapres y Fonasa"
  ];

  return (
    <section id="quienes-somos" className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Image Content */}
          <div className="w-full lg:w-1/2 relative animate-in slide-in-from-left duration-700">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src={teamImg} 
                alt="Equipo Médico MEDYRAD" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-primary/10 mix-blend-multiply" />
            </div>
            {/* Floating Badge */}
            <div className="absolute -bottom-6 -right-6 md:-bottom-10 md:-right-10 bg-white p-6 rounded-xl shadow-xl border border-gray-100 max-w-[200px] hidden md:block">
              <div className="text-4xl font-bold text-secondary mb-1">10+</div>
              <div className="text-sm font-medium text-gray-600 leading-tight">Años de experiencia cuidando su salud</div>
            </div>
            {/* Decoration */}
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-gray-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 -z-10" />
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-secondary/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 -z-10" />
          </div>

          {/* Text Content */}
          <div className="w-full lg:w-1/2 space-y-8 animate-in slide-in-from-right duration-700">
            <div>
              <span className="text-secondary font-semibold tracking-wide uppercase text-sm">Quiénes Somos</span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mt-2 mb-4">
                Comprometidos con un diagnóstico oportuno y confiable
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                En MEDYRAD, somos un centro de diagnóstico por imágenes dedicado a brindar una atención de excelencia. Entendemos que detrás de cada examen hay una persona esperando respuestas, por lo que combinamos tecnología avanzada con un trato humano y cercano.
              </p>
            </div>

            <ul className="space-y-4">
              {benefits.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-secondary shrink-0" />
                  <span className="text-gray-700 font-medium">{item}</span>
                </li>
              ))}
            </ul>

            <div className="pt-4">
              <Button
                asChild
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 h-12"
                data-testid="button-whatsapp-conozca-mas"
              >
                <a href="https://wa.me/56952191118" target="_blank" rel="noopener noreferrer">
                  Conozca más sobre nosotros
                </a>
              </Button>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
