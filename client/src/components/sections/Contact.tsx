import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Contact() {
  return (
    <section id="contacto" className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4">
                Contacto y Ubicación
              </h2>
              <p className="text-lg text-gray-600">
                Estamos ubicados en un punto central y accesible. Contáctenos para resolver sus dudas o agendar su hora.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-secondary/10 p-3 rounded-lg text-secondary">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Dirección</h3>
                  <p className="text-gray-600">Calle Ejercito 395, Local 5, Complejo Sol de los Lagos.<br/>Boulevard. Rahue Bajo, Osorno, Chile</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-secondary/10 p-3 rounded-lg text-secondary">
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Teléfonos</h3>
                  <p className="text-gray-600">+56 9 5219 1118 (WhatsApp)</p>
                  <p className="text-gray-600">+56 64 2337941</p>
                  <p className="text-gray-600">+56 64 2337942</p>
                  <p className="text-sm text-gray-500 mt-1">Llámenos o escríbanos para agendar su hora.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-secondary/10 p-3 rounded-lg text-secondary">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Correo Electrónico</h3>
                  <p className="text-gray-600">Admision@medyrad.cl</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-secondary/10 p-3 rounded-lg text-secondary">
                  <Clock className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Horario de Atención</h3>
                  <p className="text-gray-600">Lunes a Viernes: 08:00 - 18:45 hrs</p>
                  <p className="text-gray-600">Sábado: 08:30 - 13:30 hrs</p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <Button asChild size="lg" className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white rounded-full">
                <a href="https://wa.me/56952191118" target="_blank" rel="noopener noreferrer">
                  Agendar Hora Ahora
                </a>
              </Button>
            </div>
          </div>

          {/* Map */}
          <div className="h-[400px] lg:h-full min-h-[400px] bg-gray-200 rounded-2xl overflow-hidden shadow-inner border border-gray-100">
            {/* Embed Google Map - Using a generic Santiago coordinates for demo since specific address isn't verified */}
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3329.5670732868224!2d-70.61860642442297!3d-33.434458573395045!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662cf779c16262b%3A0xc392476b7636e099!2sProvidencia%2C%20Regi%C3%B3n%20Metropolitana!5e0!3m2!1ses-419!2scl!4v1709123456789!5m2!1ses-419!2scl" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Mapa de Ubicación"
            ></iframe>
          </div>
          
        </div>
      </div>
    </section>
  );
}
