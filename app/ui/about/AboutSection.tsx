"use client";
import { Building2, Clock, Heart, Leaf, Target, TreePine, Trophy, Users } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useRef } from 'react';

const AboutSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sectionEl = sectionRef.current;
    const valuesEl = valuesRef.current;
    const statsEl = statsRef.current;

    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };

    const handleIntersect = (
      entries: IntersectionObserverEntry[],
      observer: IntersectionObserver
    ) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add('opacity-100', 'translate-y-0');

        // Animation des compteurs
        if (entry.target === statsEl) {
          const counters = entry.target.querySelectorAll('[data-count]');
          counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count') || '0');
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;

            const updateCounter = () => {
              current += step;
              if (current < target) {
                counter.textContent = Math.floor(current).toLocaleString();
                requestAnimationFrame(updateCounter);
              } else {
                counter.textContent = target.toLocaleString();
              }
            };

            updateCounter();
          });
        }

        observer.unobserve(entry.target);
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    if (sectionEl) observer.observe(sectionEl);
    if (valuesEl) observer.observe(valuesEl);
    if (statsEl) observer.observe(statsEl);

    return () => {
      if (sectionEl) observer.unobserve(sectionEl);
      if (valuesEl) observer.unobserve(valuesEl);
      if (statsEl) observer.unobserve(statsEl);
    };
  }, []);

  return (
    <section id="about" className="py-24 bg-gradient-to-b from-stone-50 to-amber-50/30 overflow-hidden relative">
      {/* Texture bois subtile en arrière-plan */}
      <div
        className="absolute inset-0 opacity-5 z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%238b4513' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header avec titre */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center mb-6">
            <TreePine className="text-amber-700 mr-4" size={40} />
            <h2 className="text-4xl md:text-5xl font-bold text-amber-900 font-serif">
              L&apos;Artisanat dans l&apos;Âme
            </h2>
            <TreePine className="text-amber-700 ml-4" size={40} />
          </div>
          <p className="text-xl text-stone-700 max-w-3xl mx-auto italic">
            Depuis près de 10 ans, nous transformons le bois en œuvres d&apos;exception
          </p>
        </div>

        {/* Section principale */}
        <div
          ref={sectionRef}
          className="flex flex-col lg:flex-row items-center gap-16 opacity-0 translate-y-10 transition-all duration-1000 ease-out"
        >
          {/* Image d'atelier */}
          <div className="w-full lg:w-1/2 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-all duration-700">
              {/* Utilisez une image de test ou vérifiez le chemin */}
              <div className="w-full h-[500px] bg-gradient-to-br from-amber-200 to-amber-400 flex items-center justify-center">
                <Image
                  src="/images/about/tech1.jpeg"
                  alt="Image de technicien en poste"
                  className="w-full h-[500px] object-cover"
                  height={500}
                  width={500}
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-stone-900/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="flex items-center text-white">
                  <div className="mr-4 p-3 bg-amber-700/90 rounded-full">
                    <Clock size={24} />
                  </div>
                  <div>
                    <p className="font-semibold text-lg">8+ années d&apos;expertise</p>
                    <p className="text-amber-100">Un savoir-faire qui traverse les générations</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Éléments décoratifs bois */}
            <div className="absolute -bottom-8 -left-8 w-72 h-48 bg-gradient-to-br from-amber-300/20 to-amber-600/10 rounded-lg -z-10 rotate-12 shadow-lg border border-amber-200/30"></div>
            <div className="absolute -top-6 -right-6 w-48 h-32 bg-gradient-to-tr from-stone-300/20 to-stone-600/10 rounded-lg -z-10 -rotate-6 shadow-lg border border-stone-200/30"></div>
          </div>

          {/* Contenu texte */}
          <div className="w-full lg:w-1/2">
            <div className="mb-8">
              <span className="inline-block px-4 py-2 bg-amber-100 text-amber-800 rounded-full text-sm font-semibold mb-4">
                Depuis 2018
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-6 font-serif">
                Notre Passion : Donner Vie au Bois
              </h2>
              <p className="text-stone-700 text-lg mb-6 leading-relaxed">
                Fondé par <span className="font-semibold text-amber-700">Romain Samadjeu</span>,  notre atelier innove avec des techniques moderne et outils de pointes tout en intégrant les innovations modernes. Chaque projet est une nouvelle aventure où le bois révèle son potentiel.
              </p>
              <p className="text-stone-700 text-lg mb-8 leading-relaxed">
                Nous ne fabriquons pas simplement des meubles - nous créons des <span className="italic text-amber-700">héritages</span>. Des pièces uniques qui traverseront le temps, porteuses d&apos;histoire et d&apos;émotion.
              </p>
            </div>

            {/* Points forts */}
            <div className="grid grid-cols-2 gap-6">
              <div className="flex items-start p-4 bg-white/80 rounded-xl border border-amber-100 hover:border-amber-300 transition-colors">
                <div className="bg-amber-50 p-3 rounded-full mr-4 shrink-0">
                  <Heart className="text-amber-600" size={22} />
                </div>
                <div>
                  <h3 className="font-bold text-stone-900 mb-1">Passion</h3>
                  <p className="text-stone-600 text-sm">Amour du travail bien fait</p>
                </div>
              </div>

              <div className="flex items-start p-4 bg-white/80 rounded-xl border border-amber-100 hover:border-amber-300 transition-colors">
                <div className="bg-amber-50 p-3 rounded-full mr-4 shrink-0">
                  <Target className="text-amber-600" size={22} />
                </div>
                <div>
                  <h3 className="font-bold text-stone-900 mb-1">Précision</h3>
                  <p className="text-stone-600 text-sm">Au millimètre près</p>
                </div>
              </div>

              <div className="flex items-start p-4 bg-white/80 rounded-xl border border-amber-100 hover:border-amber-300 transition-colors">
                <div className="bg-amber-50 p-3 rounded-full mr-4 shrink-0">
                  <Leaf className="text-amber-600" size={22} />
                </div>
                <div>
                  <h3 className="font-bold text-stone-900 mb-1">Écologie</h3>
                  <p className="text-stone-600 text-sm">Bois locaux certifiés</p>
                </div>
              </div>

              <div className="flex items-start p-4 bg-white/80 rounded-xl border border-amber-100 hover:border-amber-300 transition-colors">
                <div className="bg-amber-50 p-3 rounded-full mr-4 shrink-0">
                  <Users className="text-amber-600" size={22} />
                </div>
                <div>
                  <h3 className="font-bold text-stone-900 mb-1">Accompagnement</h3>
                  <p className="text-stone-600 text-sm">De l&apos;idée à l&apos;installation</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section statistiques */}
        <div
          ref={statsRef}
          className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 opacity-0 translate-y-10 transition-all duration-1000 ease-out delay-200"
        >
          <div className="text-center p-6 bg-gradient-to-br from-white to-amber-50/50 rounded-2xl shadow-lg border border-amber-100">
            <Trophy className="mx-auto text-amber-600 mb-4" size={36} />
            <div className="text-4xl font-bold text-stone-900 mb-2" data-count="850">0</div>
            <p className="text-stone-600">Projets réalisés</p>
          </div>

          <div className="text-center p-6 bg-gradient-to-br from-white to-amber-50/50 rounded-2xl shadow-lg border border-amber-100">
            <Building2 className="mx-auto text-amber-600 mb-4" size={36} />
            <div className="text-4xl font-bold text-stone-900 mb-2" data-count="8">0</div>
            <p className="text-stone-600">Années d&apos;expérience</p>
          </div>

          <div className="text-center p-6 bg-gradient-to-br from-white to-amber-50/50 rounded-2xl shadow-lg border border-amber-100">
            <TreePine className="mx-auto text-amber-600 mb-4" size={36} />
            <div className="text-4xl font-bold text-stone-900 mb-2" data-count="15000">0</div>
            <p className="text-stone-600">Mètres de bois travaillés</p>
          </div>

          <div className="text-center p-6 bg-gradient-to-br from-white to-amber-50/50 rounded-2xl shadow-lg border border-amber-100">
            <Heart className="mx-auto text-amber-600 mb-4" size={36} />
            <div className="text-4xl font-bold text-stone-900 mb-2" data-count="99">0</div>
            <p className="text-stone-600">% de clients satisfaits</p>
          </div>
        </div>

        {/* Section valeurs */}
        <div
          ref={valuesRef}
          className="mt-24 opacity-0 translate-y-10 transition-all duration-1000 ease-out delay-300"
        >
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center gap-4 mb-6">
              <div className="h-px w-20 bg-gradient-to-r from-transparent to-amber-300"></div>
              <h2 className="text-3xl font-bold text-stone-900 font-serif">
                Notre Philosophie d&apos;Artisan
              </h2>
              <div className="h-px w-20 bg-gradient-to-l from-transparent to-amber-300"></div>
            </div>
            <p className="text-stone-700 text-lg max-w-2xl mx-auto">
              Ces principes guident chaque geste dans notre atelier
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group bg-gradient-to-br from-white to-stone-50 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-amber-100">
              <div className="bg-gradient-to-r from-amber-50 to-amber-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner group-hover:scale-110 transition-transform duration-500">
                <Target className="text-amber-700" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-stone-900 mb-4 text-center">L&apos;Excellence</h3>
              <p className="text-stone-700 text-center leading-relaxed">
                Chaque joint doit être parfait, chaque finition impeccable. Nous n&apos;acceptons que le meilleur, car le bois mérite le respect.
              </p>
            </div>

            <div className="group bg-gradient-to-br from-white to-stone-50 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-amber-100">
              <div className="bg-gradient-to-r from-amber-50 to-amber-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner group-hover:scale-110 transition-transform duration-500">
                <Heart className="text-amber-700" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-stone-900 mb-4 text-center">L&apos;Authenticité</h3>
              <p className="text-stone-700 text-center leading-relaxed">
                Nous travaillons avec des matériaux nobles, des essences locales, et préservons le caractère unique de chaque pièce de bois.
              </p>
            </div>

            <div className="group bg-gradient-to-br from-white to-stone-50 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-amber-100">
              <div className="bg-gradient-to-r from-amber-50 to-amber-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner group-hover:scale-110 transition-transform duration-500">
                <Users className="text-amber-700" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-stone-900 mb-4 text-center">La Transmission</h3>
              <p className="text-stone-700 text-center leading-relaxed">
                Nous formons la relève et partageons notre savoir-faire. Un artisanat qui se transmet, c&apos;est un héritage qui perdure.
              </p>
            </div>
          </div>
        </div>

        {/* Citation finale */}
        <div className="mt-24 text-center p-8 bg-gradient-to-r from-amber-50/50 to-stone-50/50 rounded-2xl border-l-4 border-amber-500">
          <TreePine className="inline-block text-amber-600 mb-4" size={40} />
          <blockquote className="max-w-3xl mx-auto">
            <p className="text-2xl font-serif text-stone-800 italic mb-6">
              Le bois n&apos;est pas seulement un matériau, c&apos;est un partenaire. Il a une histoire, une personnalité, une âme. Notre travail est de révéler cette beauté.
            </p>
            <footer className="text-stone-600">
              <cite className="font-semibold text-amber-700 not-italic">Romain Samadjeu</cite>, fondateur et maître ébéniste
            </footer>
          </blockquote>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;