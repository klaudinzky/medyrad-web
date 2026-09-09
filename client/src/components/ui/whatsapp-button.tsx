import { MessageCircle } from "lucide-react";

export function WhatsAppButton() {
  const whatsappUrl = "https://wa.me/56952191118";

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 rounded-full bg-secondary p-4 text-white shadow-xl transition-transform duration-300 hover:scale-105 hover:bg-primary group"
      aria-label="Contactar a Medyrad por WhatsApp"
    >
      <MessageCircle size={28} className="fill-current" />
      <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-white text-gray-800 px-3 py-1.5 rounded-lg text-sm font-semibold shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 whitespace-nowrap">
        ¿Cómo podemos ayudarte?
      </span>
    </a>
  );
}
