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
    { name: "À propos", href: "/#about" },
    { name: "Contact", href: "/#contact" },
  ];

  const linkColor = scrolled
    ? "text-gray-800 hover:text-black"
    : "text-white hover:text-gray-200";

  return (
    <>
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          scroll
          className={`font-medium transition-colors duration-300 ${linkColor}`}
        >
          {link.name}
        </Link>
      ))}
    </>
  );
}
