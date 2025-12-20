import { ShieldCheck, TreePine } from "lucide-react";
import Hero from "./ui/Hero/Hero";
import AboutSection from "./ui/about/AboutSection";
import ContactSection from "./ui/contact/ContactSection";
import Footer from "./ui/footer/Footer";
import Header from "./ui/header/Header";
import CarouselProduit from "./ui/produits/CarouselProduit";
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
              <div className="text-center mb-8 md:mb-12 px-4">
                {/* Container principal avec breakpoints progressifs */}
                <div className="relative mb-4 md:mb-6">
                  {/* Lignes décoratives uniquement sur desktop */}
                  <div className="hidden lg:flex absolute inset-x-0 top-1/2 -translate-y-1/2 items-center justify-between pointer-events-none">
                    <div className="w-20 h-[2px] bg-gradient-to-r from-transparent to-amber-600/60" />
                    <div className="w-20 h-[2px] bg-gradient-to-l from-transparent to-amber-600/60" />
                  </div>

                  {/* Titre avec icônes adaptatives */}
                  <div className="flex items-center justify-center gap-2 sm:gap-3 md:gap-4">
                    {/* Icône gauche - visible à partir de sm */}
                    <div className="hidden sm:block opacity-80">
                      <TreePine
                        className="text-amber-600"
                        size={20}
                        aria-hidden="true"
                      />
                    </div>

                    {/* Icône gauche - version mobile réduite */}
                    <div className="sm:hidden opacity-70">
                      <TreePine
                        className="text-amber-600"
                        size={18}
                        aria-hidden="true"
                      />
                    </div>

                    {/* Titre principal avec breakpoints */}
                    <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-amber-900 font-serif px-2">
                      <span className="block sm:inline">Nos Services</span>{' '}
                      <span className="block sm:inline">Professionnels</span>
                    </h1>

                    {/* Icône droite - version mobile réduite */}
                    <div className="sm:hidden opacity-70">
                      <TreePine
                        className="text-amber-600"
                        size={18}
                        aria-hidden="true"
                      />
                    </div>

                    {/* Icône droite - visible à partir de sm */}
                    <div className="hidden sm:block opacity-80">
                      <TreePine
                        className="text-amber-600"
                        size={20}
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                </div>

                {/* Sous-titre responsive */}
                <div className="max-w-3xl md:max-w-4xl mx-auto">
                  <p className="text-base xs:text-lg sm:text-xl text-stone-700 mt-4 sm:mt-6 mb-8 sm:mb-10 leading-relaxed sm:leading-normal">
                    Des créations sur mesure qui allient{' '}
                    <span className="text-amber-700 font-semibold whitespace-nowrap">
                      tradition artisanale
                    </span>{' '}
                    et{' '}
                    <span className="text-amber-700 font-semibold whitespace-nowrap">
                      innovation technique
                    </span>
                  </p>
                </div>
              </div>
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

      {/* ===================== SECTION PRODUITS ===================== */}
      <section className="relative mt-25 overflow-hidden" id="produits" >
        {/* Background animé */}
        <div className="absolute inset-0 z-0 bg-animated" />
        {/* Contenu */}
        <div className="container mx-auto relative z-10 mb-24">
          <div className="text-center">
            <div className="text-center mb-3 md:mb-12 px-4">
              {/* Container principal avec breakpoints progressifs */}
              <div className="relative mb-4 md:mb-6">
                {/* Lignes décoratives uniquement sur desktop */}
                <div className="hidden lg:flex absolute inset-x-0 top-1/2 -translate-y-1/2 items-center justify-between pointer-events-none">
                  <div className="w-20 h-[2px] bg-gradient-to-r from-transparent to-amber-600/60" />
                  <div className="w-20 h-[2px] bg-gradient-to-l from-transparent to-amber-600/60" />
                </div>

                {/* Titre avec icônes adaptatives */}
                <div className="flex items-center justify-center gap-2 sm:gap-3 md:gap-4">
                  {/* Icône gauche - visible à partir de sm */}
                  <div className="hidden sm:block opacity-80">
                    <TreePine
                      className="text-amber-600"
                      size={20}
                      aria-hidden="true"
                    />
                  </div>

                  {/* Icône gauche - version mobile réduite */}
                  <div className="sm:hidden opacity-70">
                    <TreePine
                      className="text-amber-600"
                      size={18}
                      aria-hidden="true"
                    />
                  </div>

                  {/* Titre principal avec breakpoints */}
                  <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-amber-900 font-serif px-2">
                    <span className="block sm:inline">Nos Produits</span>{' '}
                    <span className="block sm:inline">& réalisations</span>
                  </h1>

                  {/* Icône droite - version mobile réduite */}
                  <div className="sm:hidden opacity-70">
                    <TreePine
                      className="text-amber-600"
                      size={18}
                      aria-hidden="true"
                    />
                  </div>

                  {/* Icône droite - visible à partir de sm */}
                  <div className="hidden sm:block opacity-80">
                    <TreePine
                      className="text-amber-600"
                      size={20}
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </div>

              {/* Sous-titre responsive */}
              <div className="max-w-3xl md:max-w-4xl mx-auto">
                <p className="text-base xs:text-lg sm:text-xl text-stone-700 mt-4 sm:mt-6 mb-8 sm:mb-10 leading-relaxed sm:leading-normal">
                  Des créations sur mesure qui allient{' '}
                  <span className="text-amber-700 font-semibold whitespace-nowrap">
                    tradition artisanale
                  </span>{' '}
                  et{' '}
                  <span className="text-amber-700 font-semibold whitespace-nowrap">
                    innovation technique
                  </span>
                </p>
              </div>
            </div>
            <CarouselProduit
              autoPlay={true}
              interval={5000}
              showControls={true}
              showIndicators={true}
              imageCount={50}
            />
          </div>
        </div>
      </section>

      {/* À propos */}
      <section id="about" className="relative overflow-hidden">
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
