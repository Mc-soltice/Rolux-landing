"use client";

import Link from "next/link";

export default function MobileMenu({
  isOpen,
  close,
}: {
  isOpen: boolean;
  close: () => void;
}) {
  return (
    <div
      className={`md:hidden bg-white transition-all ${isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
    >
      <div className="flex flex-col p-4 space-y-4">
        <Link href="/" onClick={close}>Accueil</Link>
        <Link href="/services" onClick={close}>Services</Link>
        <Link href="/about" onClick={close}>À propos</Link>
        <Link href="/contact" onClick={close}>Contact</Link>
      </div>
    </div>
  );
}
