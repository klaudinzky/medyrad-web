import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Scan, Activity, FileText, Microscope, Zap } from "lucide-react";
import { Link } from "wouter";
import mriImg from "@/assets/service-mri.jpg";
import ctImg from "@/assets/service-ct.webp";
import xrayImg from "@/assets/service-xray.jpg";
import ultrasoundImg from "@/assets/service-ultrasound.jpg";
import labImg from "@/assets/service-lab.jpg";

const services = [
  {
    title: "Resonancia Magnética",
    description: "Imágenes de alta resolución para diagnósticos neurológicos, musculoesqueléticos y más, sin radiación ionizante.",
    icon: Scan,
    image: mriImg,
    color: "bg-blue-50 text-blue-600",
    href: "/resonancia-magnetica-osorno",
  },
  {
    title: "Scanner / Tomografía",
    description: "Tecnología multicorte para exploraciones rápidas y precisas del cuerpo entero con mínima exposición.",
    icon: Zap,
    image: ctImg,
    color: "bg-cyan-50 text-cyan-600",
    href: "/scanner-tomografia-osorno",
  },
  {
    title: "Radiografías",
    description: "Radiología digital de última generación para evaluación ósea y pulmonar con entrega inmediata.",
    icon: FileText,
    image: xrayImg,
    color: "bg-indigo-50 text-indigo-600",
    href: "/radiografias-osorno",
  },
  {
    title: "Ecografías",
    description: "Ecografías abdominal, partes blandas y vascular.",
    icon: Activity,
    image: ultrasoundImg,
    color: "bg-teal-50 text-teal-600",
    href: "/ecografias-osorno",
  },
  {
    title: "Laboratorio Clínico",
    description: "Análisis de sangre y exámenes bioquímicos con procesamiento rápido y resultados en línea.",
    icon: Microscope,
    image: labImg,
    color: "bg-rose-50 text-rose-600",
    href: "/laboratorio-clinico-osorno",
  },
];

export function Services() {
  return (
    <section id="servicios" className="py-24 bg-gray-50/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900">
            Nuestros Servicios
          </h2>
          <p className="text-lg text-gray-600">
            Contamos con equipamiento de última generación para brindar exámenes seguros, precisos y oportunos.
          </p>
          <div className="w-20 h-1.5 bg-secondary mx-auto rounded-full mt-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="group overflow-hidden border-none shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              {service.image ? (
                <div className="h-48 overflow-hidden relative">
                  <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors z-10" />
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    width={1366}
                    height={768}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className={`absolute top-4 right-4 p-2 rounded-lg ${service.color} shadow-sm z-20`}>
                    <service.icon className="h-6 w-6" />
                  </div>
                </div>
              ) : (
                <div className={`h-48 ${service.color} flex items-center justify-center`}>
                   <service.icon className="h-16 w-16 opacity-80" />
                </div>
              )}
              
              <CardHeader className="pb-2">
                <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors">
                  {service.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base text-gray-600 line-clamp-3">
                  {service.description}
                </CardDescription>
              </CardContent>
              <CardFooter className="pt-0 pb-6">
                <Button asChild variant="outline" className="w-full justify-between rounded-full border-primary/25 font-bold text-primary hover:bg-primary hover:text-white">
                  <Link href={service.href}>
                    Ver más sobre {service.title}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
