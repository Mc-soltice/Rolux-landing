import { playfair } from "@/app/lib/font";
import Image from "next/image";
import HeaderClient from "./HeaderClient";
import NavLinks from "./NavLinks";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <HeaderClient>
        <div className="container mx-auto px-4 md:px-6 flex justify-between items-center py-4">

          {/* Logo */}
          <div className="flex items-center gap-3">
            <Image
              src="/images/logo.jpg"
              alt="Rolux Logo"
              width={60}
              height={60}
              priority
              className="rounded-full"
            />
            {/* Le texte aura une classe pour gérer la couleur */}
            <span className="font-bold text-amber-500 text-4xl transition-colors duration-300">
              <h1 className={`${playfair.className} italic`}>
                ROLUX
              </h1>

            </span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <NavLinks />
          </nav>

        </div>
      </HeaderClient>
    </header>
  );
}