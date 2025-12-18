'use client';

import { services } from '@/app/lib/data/services';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';

const ServicesCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const totalSlides = services.length;

  // Fonction pour passer au slide suivant
  const nextSlide = useCallback(() => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 50);
    }, 600); // Durée de la transition
  }, [isTransitioning, totalSlides]);

  // Fonction pour passer au slide précédent
  const prevSlide = () => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 50);
    }, 600);
  };

  // Auto-défilement
  useEffect(() => {
    if (isTransitioning) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 5000); // Change toutes les 5 secondes

    return () => clearInterval(interval);
  }, [nextSlide, isTransitioning]);

  // Navigation par indicateurs
  const goToSlide = (index: number) => {
    if (isTransitioning || index === currentSlide) return;

    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide(index);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 50);
    }, 600);
  };

  return (
    <div className="relative w-full border rounded-2xl overflow-hidden">
      {/* Conteneur du carousel */}
      <div className="relative w-full h-[500px] md:h-[600px] overflow-hidden">
        {services.map((service, index) => {
          const isEven = index % 2 === 0;
          const isActive = index === currentSlide;
          const isPrev = index === ((currentSlide - 1 + totalSlides) % totalSlides);

          return (
            <div
              key={service.id}
              className={`absolute inset-0 w-full h-full transition-all duration-600 ease-in-out ${isActive
                  ? 'opacity-100 translate-x-0 z-10'
                  : isPrev
                    ? 'opacity-0 -translate-x-full z-0'
                    : 'opacity-0 translate-x-full z-0'
                }`}
            >
              {/* Image avec next/image */}
              <div className="relative w-full h-full">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover"
                  sizes="100vw"
                  priority={index === 0}
                />

                {/* Overlay pour améliorer la lisibilité du texte */}
                <div className="absolute inset-0 bg-black/40"></div>

                {/* Texte positionné alternativement à gauche/droite */}
                <div
                  className={`absolute inset-0 flex items-center justify-center transition-opacity duration-700 ${isActive ? 'opacity-100' : 'opacity-0'
                    }`}
                  style={{
                    animation: isActive ? 'fadeUp 0.8s ease-out forwards' : 'none'
                  }}
                >
                  <div className={`container mx-auto px-4 ${isEven ? 'text-left' : 'text-right'}`}>
                    <div className={`max-w-xl ${isEven ? 'ml-0 mr-auto' : 'ml-auto mr-0'}`}>
                      <h2
                        className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4"
                        style={{
                          animation: isActive ? 'fadeUp 0.8s ease-out 0.1s forwards' : 'none',
                          opacity: isActive ? 0 : 0
                        }}
                      >
                        {service.title}
                      </h2>
                      <p
                        className="text-lg md:text-xl text-white mb-6"
                        style={{
                          animation: isActive ? 'fadeUp 0.8s ease-out 0.2s forwards' : 'none',
                          opacity: isActive ? 0 : 0
                        }}
                      >
                        {service.shortDescription}
                      </p>
                      <p
                        className="text-base md:text-lg text-gray-200"
                        style={{
                          animation: isActive ? 'fadeUp 0.8s ease-out 0.3s forwards' : 'none',
                          opacity: isActive ? 0 : 0
                        }}
                      >
                        {service.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Boutons de navigation */}
        <div className="absolute left-5 right-5 top-1/2 -translate-y-1/2 flex justify-between z-20">
          <button
            onClick={prevSlide}
            disabled={isTransitioning}
            className="btn btn-circle opacity-50 h-16 w-16 md:h-20 md:w-20 hover:opacity-80 transition-opacity disabled:opacity-30 bg-black/30"
          >
            <span className="text-2xl">❮</span>
          </button>

          <button
            onClick={nextSlide}
            disabled={isTransitioning}
            className="btn btn-circle opacity-50 h-16 w-16 md:h-20 md:w-20 hover:opacity-80 transition-opacity disabled:opacity-30 bg-black/30"
          >
            <span className="text-2xl">❯</span>
          </button>
        </div>

        {/* Indicateurs de slide */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
          {services.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              disabled={isTransitioning}
              className={`transition-all duration-300 ${index === currentSlide
                  ? 'w-8 h-3 rounded-lg bg-white'
                  : 'w-3 h-3 rounded-full bg-white/50 hover:bg-white/80'
                }`}
              aria-label={`Aller au slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Indicateur de progression */}
        <div className="absolute bottom-0 left-0 right-0 h-1 z-20 bg-white/20">
          <div
            className="h-full bg-white/80 transition-all duration-5000 linear"
            style={{
              width: isTransitioning ? '100%' : '0%',
              animation: !isTransitioning ? 'progress 5s linear' : 'none'
            }}
          />
        </div>
      </div>

      {/* Styles CSS pour les animations */}
      <style jsx global>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes progress {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }
        
        /* Animation pour le bouton pulse */
        @keyframes pulseScale {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
          100% {
            transform: scale(1);
          }
        }
        
        .pulse-scale {
          animation: pulseScale 2s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default ServicesCarousel;