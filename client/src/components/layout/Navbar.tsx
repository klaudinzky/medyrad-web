import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X, Calendar, Phone, MapPin, Clock } from "lucide-react";
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
    { name: "Inicio", href: "#inicio" },
    { name: "Quiénes Somos", href: "#quienes-somos" },
    { name: "Servicios", href: "#servicios" },
    { name: "Especialidades", href: "#especialidades" },
    { name: "Contacto", href: "#contacto" },
  ];

  const AGENDAMIENTO_URL = "https://www.medyrad.cl/agendamiento"; // Placeholder based on request

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full",
        scrolled ? "bg-white/95 backdrop-blur-md shadow-md py-2" : "bg-white py-4"
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
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                className="text-sm font-medium text-gray-600 hover:text-primary transition-colors uppercase tracking-wide"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:block">
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
            className="lg:hidden text-gray-700 hover:text-primary transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-t border-gray-100 shadow-lg animate-in slide-in-from-top-5 duration-200">
          <div className="flex flex-col p-4 gap-4">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
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
