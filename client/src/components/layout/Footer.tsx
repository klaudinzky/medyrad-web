import { Link } from "wouter";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import logoImg from "@/assets/logo.png";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="block">
              <img 
                src={logoImg} 
                alt="MEDYRAD" 
                className="h-12 w-auto object-contain brightness-0 invert opacity-90 hover:opacity-100 transition-opacity" 
              />
            </Link>
            <p className="text-gray-400 leading-relaxed">
              Centro de diagnóstico por imágenes comprometido con la excelencia médica y el cuidado humano de cada paciente.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-bold text-lg mb-6">Enlaces Rápidos</h3>
            <ul className="space-y-3">
              <li><a href="#inicio" className="text-gray-400 hover:text-secondary transition-colors">Inicio</a></li>
              <li><a href="#quienes-somos" className="text-gray-400 hover:text-secondary transition-colors">Quiénes Somos</a></li>
              <li><a href="#servicios" className="text-gray-400 hover:text-secondary transition-colors">Servicios</a></li>
              <li><a href="#especialidades" className="text-gray-400 hover:text-secondary transition-colors">Especialidades</a></li>
              <li><a href="#contacto" className="text-gray-400 hover:text-secondary transition-colors">Contacto</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-bold text-lg mb-6">Nuestros Servicios</h3>
            <ul className="space-y-3">
              <li className="text-gray-400">Resonancia Magnética</li>
              <li className="text-gray-400">Scanner / Tomografía</li>
              <li className="text-gray-400">Radiografía Digital</li>
              <li className="text-gray-400">Ecografía Doppler</li>
              <li className="text-gray-400">Laboratorio Clínico</li>
            </ul>
          </div>

          {/* Socials & Info */}
          <div>
            <h3 className="font-bold text-lg mb-6">Síguenos</h3>
            <div className="flex gap-4 mb-8">
              <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-secondary transition-colors text-white">
                <Facebook size={20} />
              </a>
              <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-secondary transition-colors text-white">
                <Instagram size={20} />
              </a>
              <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-secondary transition-colors text-white">
                <Linkedin size={20} />
              </a>
            </div>
            <p className="text-gray-400 text-sm">
              Horario: Lun - Vie 08:00 - 20:00<br/>
              Sáb 09:00 - 14:00
            </p>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} MEDYRAD. Todos los derechos reservados.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Políticas de Privacidad</a>
            <a href="#" className="hover:text-white transition-colors">Términos y Condiciones</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
