"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function NavLinks() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { name: "Accueil", href: "/#accueil" },
    { name: "Services", href: "/#services" },
    { name: "Produits", href: "/#produits" },
    { name: "À propos", href: "/#about", },
    { name: "Contact", href: "/#contact" },
  ];

  return (
    <>
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          scroll
          className={`
            group
            relative
            font-bold
            px-4 py-2
            rounded-lg
            transition-all duration-300
            flex items-center gap-2
            ${scrolled
              ? "text-gray-700 hover:text-amber-700 hover:bg-amber-50"
              : "text-white hover:text-amber-200 hover:bg-white/10"
            }
            hover:shadow-lg
            hover:translate-y-[-2px]
          `}
        >
          {/* Icône avec animation */}
          <span className="
            transition-transform duration-300
            group-hover:scale-110
            group-hover:rotate-12
          ">
            {link.icon}
          </span>

          {/* Texte */}
          <span>{link.name}</span>

          {/* Indicateur de hover (petit point) */}
          <span className="
            absolute -bottom-1 left-1/2 transform -translate-x-1/2
            w-1 h-1
            bg-amber-400
            rounded-full
            opacity-0
            group-hover:opacity-100
            transition-all duration-300
            group-hover:w-6
          " />
        </Link>
      ))}
    </>
  );
}