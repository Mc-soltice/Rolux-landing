"use client";

import { Menu, X } from "lucide-react";
import { ReactNode, useEffect, useState } from "react";

interface HeaderClientProps {
  children: ReactNode;
}

export default function HeaderClient({ children }: HeaderClientProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Empêche le scroll quand le menu mobile est ouvert
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [mobileOpen]);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out ${scrolled ? "bg-white shadow-lg" : "bg-transparent"
        }`}
    >
      <div className="relative">
        {/* Header desktop */}
        <div className="hidden md:block">{children}</div>

        {/* Header mobile */}
        <div className="flex md:hidden items-center justify-between px-4 py-4">
          <div className="font-bold text-lg">Logo</div>
          <button
            aria-label="Ouvrir le menu"
            onClick={() => setMobileOpen(true)}
            className="p-2 rounded-lg hover:bg-stone-100 transition"
          >
            <Menu size={28} />
          </button>
        </div>

        {/* Overlay mobile */}
        <div
          className={`fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 md:hidden ${mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
            }`}
          onClick={() => setMobileOpen(false)}
        />

        {/* Menu mobile */}
        <div
          className={`fixed top-0 right-0 h-full w-[80%] max-w-sm bg-white shadow-2xl transform transition-transform duration-500 md:hidden ${mobileOpen ? "translate-x-0" : "translate-x-full"
            }`}
        >
          <div className="flex items-center justify-between p-4 border-b">
            <span className="font-bold text-lg">Menu</span>
            <button
              aria-label="Fermer le menu"
              onClick={() => setMobileOpen(false)}
              className="p-2 rounded-lg hover:bg-stone-100 transition"
            >
              <X size={26} />
            </button>
          </div>

          <nav className="flex flex-col gap-6 p-6 text-lg">
            {/* Exemple de liens */}
            <a href="#about" onClick={() => setMobileOpen(false)}>À propos</a>
            <a href="#services" onClick={() => setMobileOpen(false)}>Services</a>
            <a href="#projects" onClick={() => setMobileOpen(false)}>Projets</a>
            <a href="#contact" onClick={() => setMobileOpen(false)}>Contact</a>
          </nav>
        </div>
      </div>
    </header>
  );
}
