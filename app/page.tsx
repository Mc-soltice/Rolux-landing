import { ShieldCheck, TreePine } from "lucide-react";
import Hero from "./ui/Hero/Hero";
import AboutSection from "./ui/about/AboutSection";
import ContactSection from "./ui/contact/ContactSection";
import Footer from "./ui/footer/Footer";
import Header from "./ui/header/Header";
import AnimatedContent from "./ui/services/Serviceanimation";
import ServicesResponsive from "./ui/services/ServicesResponsive";


export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 font-sans dark:bg-black">
      {/* Header sticky */}
      <Header />

      {/* Hero principal */}
      <section id="accueil">
        <Hero />
      </section>


      <AnimatedContent
        distance={150}
        direction="horizontal"
        reverse={false}
        duration={1}
        ease="bounce.out"
        initialOpacity={0.2}
        animateOpacity
        scale={1.1}
        threshold={0.2}
        delay={0.3}
      >
        {/* ===================== SECTION SERVICES ===================== */}
        <section className="relative pt-10 overflow-hidden" id="services" >
          {/* Background animé */}
          <div className="absolute inset-0 z-0 bg-animated" />
          {/* Contenu */}
          <div className="container mx-auto relative z-10 mb-24">
            <div className="text-center">
              <div className="inline-flex items-center justify-center mb-4">
                <div className="w-16 h-[2px] bg-linear-to-r from-transparent to-amber-700 mr-4" />
                <TreePine className="text-amber-700" size={32} />
                <h2 className="mx-4 text-4xl md:text-5xl font-bold text-amber-900 font-serif">
                  Nos Services Professionnels
                </h2>
                <TreePine className="text-amber-700" size={32} />
                <div className="w-16 h-[2px] bg-linear-to-l from-transparent to-amber-700 ml-4" />
              </div>
              <p className="text-xl text-stone-700 max-w-3xl mx-auto mt-6 mb-10">
                Des créations sur mesure qui allient <span className="text-amber-700 font-semibold">tradition artisanale</span> et <span className="text-amber-700 font-semibold">innovation technique</span>
              </p>
              <ServicesResponsive />
            </div>
          </div>
        </section>
      </AnimatedContent>

      {/* Témoignage d'expertise */}
      <div className="mt-10 mx-15 py-8 bg-linear-to-r from-amber-50 to-stone-100 rounded-2xl border border-amber-200 shadow-lg">
        <div className="max-w-4xl mx-auto text-center">
          <ShieldCheck className="inline-block text-amber-700 mb-4" size={48} />
          <h3 className="text-2xl font-bold text-amber-900 mb-4">
            Excellence Artisanale Garantie
          </h3>
          <p className="text-stone-700 text-lg mb-6">
            Chaque projet est supervisé par nos maîtres artisans, avec une <span className="font-semibold text-amber-700">garantie décennale</span> sur tous nos ouvrages.
          </p>
          <div className="flex flex-wrap justify-center gap-6 mt-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-700">8+</div>
              <div className="text-sm text-stone-600">Années d`expérience</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-700">500+</div>
              <div className="text-sm text-stone-600">Projets réalisés</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-700">100%</div>
              <div className="text-sm text-stone-600">Satisfaction client</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-700">10 ans</div>
              <div className="text-sm text-stone-600">Garantie</div>
            </div>
          </div>
        </div>
      </div>

      {/* À propos */}
      <section id="about" className="relative pt-10 overflow-hidden">
        <AboutSection />
      </section>

      {/* Contact */}
      <section id="contact" className="relative pt-10 overflow-hidden">
        <ContactSection />
      </section>

      {/* Footer */}
      <section className="relative pt-10 overflow-hidden">
        <Footer />
      </section>


    </div >
  );
}
