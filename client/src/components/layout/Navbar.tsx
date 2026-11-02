import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X, Calendar } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import logoImg from "@/assets/logo.png";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Inicio", href: "/#inicio" },
    { name: "Nosotros", href: "/#quienes-somos" },
    { name: "Servicios", href: "/#servicios" },
    { name: "Equipo", href: "/equipo" },
    { name: "Tecnología", href: "/#tecnologia-innovacion" },
    { name: "Contacto", href: "/#contacto" },
    { name: "Resultado de Exámenes", href: "https://medyrad.cui.date/intranet/login.php", external: true },
    { name: "Blog", href: "/blog/" },
  ];

  const AGENDAMIENTO_URL = "https://wa.me/56952191118"; // WhatsApp Link

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full",
        scrolled ? "bg-background/95 backdrop-blur-md shadow-md py-2" : "bg-background py-4"
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group cursor-pointer">
            <img 
              src={logoImg} 
              alt="MEDYRAD" 
              className="h-12 w-auto object-contain" 
            />
          </Link>

          {/* Desktop Nav */}
          <nav aria-label="Navegación principal" className="hidden xl:flex items-center gap-4 2xl:gap-6">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className="text-[11px] font-bold text-gray-600 hover:text-primary transition-colors uppercase tracking-[0.07em] whitespace-nowrap"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden xl:block">
            <Button 
              asChild 
              className="bg-secondary hover:bg-secondary/90 text-white font-semibold rounded-full px-6 shadow-lg shadow-secondary/20 transition-all hover:scale-105"
            >
              <a href={AGENDAMIENTO_URL} target="_blank" rel="noopener noreferrer">
                <Calendar className="mr-2 h-4 w-4" /> Agendar Hora
              </a>
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="xl:hidden text-gray-700 hover:text-primary transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Cerrar menú de navegación" : "Abrir menú de navegación"}
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="xl:hidden absolute top-full left-0 right-0 bg-background border-t border-border shadow-lg animate-in slide-in-from-top-5 duration-200">
          <div className="flex flex-col p-4 gap-4">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className="text-base font-medium text-gray-700 hover:text-primary py-2 border-b border-gray-50 last:border-0"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <Button 
              asChild 
              className="w-full bg-secondary hover:bg-secondary/90 text-white mt-2"
            >
              <a href={AGENDAMIENTO_URL} target="_blank" rel="noopener noreferrer">
                <Calendar className="mr-2 h-4 w-4" /> Agendar Hora
              </a>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
