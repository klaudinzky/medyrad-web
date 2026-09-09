import { BrainCircuit, Cpu, ShieldCheck, Clock } from "lucide-react";

const features = [
  {
    icon: Cpu,
    title: "Equipamiento Moderno",
    description: "Contamos con resonadores y scanners de última generación que permiten imágenes más nítidas en menos tiempo."
  },
  {
    icon: BrainCircuit,
    title: "Inteligencia Artificial",
    description: "Software asistido por IA para apoyar el diagnóstico médico y detectar anomalías con mayor precisión."
  },
  {
    icon: ShieldCheck,
    title: "Seguridad del Paciente",
    description: "Protocolos estrictos de baja dosis de radiación y máxima seguridad en todos nuestros procedimientos."
  },
  {
    icon: Clock,
    title: "Entrega Digital",
    description: "Acceda a sus resultados e imágenes de manera online, rápida y desde la comodidad de su hogar."
  }
];

export function Technology() {
  return (
    <section id="tecnologia-innovacion" className="py-24 bg-primary text-white relative overflow-hidden scroll-mt-20">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
        </svg>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            Tecnología e Innovación
          </h2>
          <p className="text-primary-foreground/80 text-lg">
            Invertimos constantemente para ofrecerle la mejor calidad diagnóstica del mercado.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, i) => (
            <div key={i} className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:bg-white/20 transition-colors text-center group">
              <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-primary-foreground/70 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
