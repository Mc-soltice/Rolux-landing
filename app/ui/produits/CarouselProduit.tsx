// app/components/ui/image-carousel.tsx
'use client';

import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react';
import Image from 'next/image';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

interface CarouselProductProps {
  autoPlay?: boolean;
  interval?: number;
  showControls?: boolean;
  showIndicators?: boolean;
  imageCount?: number;
  imagePrefix?: string;
  infiniteScroll?: boolean;
}

// Liste des extensions d'image supportées
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.avif', '.gif', '.bmp', '.tiff', '.svg'];

// Fonction utilitaire pour combiner les classes
function cn(...classes: (string | boolean | undefined | null)[]) {
  return classes.filter(Boolean).join(' ');
}

// Génère les chemins des images avec toutes les extensions possibles
function generateImagePaths(
  count: number = 50,
  prefix: string = 'produit-'
): Array<{ path: string; ext: string }>[] {
  return Array.from({ length: count }, (_, i) => {
    const number = String(i + 1).padStart(2, '0');
    const basePath = `/produits/${prefix}${number}`;

    // Retourne un tableau de tous les chemins possibles avec différentes extensions
    return IMAGE_EXTENSIONS.map(ext => ({
      path: `${basePath}${ext}`,
      ext: ext.replace('.', '')
    }));
  });
}

export default function CarouselProduct({
  autoPlay = true,
  interval = 4000,
  showControls = true,
  showIndicators = true,
  imageCount = 50,
  imagePrefix = 'produit-',
  infiniteScroll = true,
}: CarouselProductProps) {

  // Chemins des images avec toutes les extensions possibles
  const imageVariants = useMemo(() =>
    generateImagePaths(imageCount, imagePrefix),
    [imageCount, imagePrefix]
  );

  // États pour les images détectées
  const [detectedImages, setDetectedImages] = useState<string[]>([]);
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set());
  const [availableImages, setAvailableImages] = useState<Map<number, string>>(new Map());

  // Référence pour l'intervalle d'auto-play
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  // Calcul du nombre d'images valides
  const validImageCount = detectedImages.length;

  // Initialisation : détection des images disponibles
  useEffect(() => {
    const checkImages = async () => {
      const available = new Map<number, string>();
      const errors = new Set<number>();

      for (let i = 0; i < imageVariants.length; i++) {
        let found = false;

        for (const variant of imageVariants[i]) {
          try {
            const res = await fetch(variant.path, { method: 'HEAD' });
            if (res.ok) {
              available.set(i, variant.path);
              found = true;
              break;
            }
          } catch { }
        }

        if (!found) errors.add(i);
      }

      setAvailableImages(available);
      setImageErrors(errors);
      setDetectedImages(Array.from(available.values()));
      setLoading(false);
    };

    checkImages();
  }, [imageVariants]);


  const getImagePath = useCallback((index: number): string => {
    // Retourne le chemin de l'image si disponible, sinon un placeholder
    if (availableImages.has(index)) {
      return availableImages.get(index)!;
    }

    // Fallback : construit le chemin avec .jpg par défaut
    const number = String(index + 1).padStart(2, '0');
    return `/produits/${imagePrefix}${number}.jpg`;
  }, [availableImages, imagePrefix]);

  const handlePrevious = useCallback(() => {
    if (infiniteScroll && validImageCount > 0) {
      setActive((prev) => (prev === 0 ? validImageCount - 1 : prev - 1));
    } else {
      setActive((prev) => (prev > 0 ? prev - 1 : prev));
    }
  }, [infiniteScroll, validImageCount]);

  const handleNext = useCallback(() => {
    if (infiniteScroll && validImageCount > 0) {
      setActive((prev) => (prev === validImageCount - 1 ? 0 : prev + 1));
    } else {
      setActive((prev) => (prev < validImageCount - 1 ? prev + 1 : prev));
    }
  }, [infiniteScroll, validImageCount]);

  // Auto-play avec défilement infini
  useEffect(() => {
    if (!autoPlay || isPaused || validImageCount <= 1 || loading) {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
        autoPlayRef.current = null;
      }
      return;
    }

    autoPlayRef.current = setInterval(() => {
      handleNext();
    }, interval);

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
        autoPlayRef.current = null;
      }
    };
  }, [autoPlay, handleNext, interval, isPaused, validImageCount, loading]);

  // Navigation clavier
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handlePrevious();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'Escape') setSelectedImage(null);
      if (e.key === ' ') {
        e.preventDefault();
        setIsPaused(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlePrevious, handleNext]);

  const openLightbox = (index: number) => {
    const path = getImagePath(index);
    if (path) setSelectedImage(path);
  };

  const handleImageError = (index: number) => {
    setImageErrors(prev => new Set(prev).add(index));

    // Essayer la variante suivante si disponible
    const currentPath = getImagePath(index);
    const variants = imageVariants[index];

    if (variants && variants.length > 1) {
      const currentExt = currentPath.split('.').pop();
      const nextVariant = variants.find(v => !v.path.includes(currentExt || ''));

      if (nextVariant) {
        setAvailableImages(prev => {
          const newMap = new Map(prev);
          newMap.set(index, nextVariant.path);
          return newMap;
        });
      }
    }
  };

  // Calcul des indices pour le défilement infini avec reflets
  const getVisibleIndices = useCallback(() => {
    const indices = [];
    const maxReflections = 4; // Nombre de reflets de chaque côté

    if (validImageCount === 0) return indices;

    // Ajouter les reflets à gauche (images passées)
    for (let i = 1; i <= maxReflections; i++) {
      const index = (active - i + validImageCount) % validImageCount;
      indices.unshift({
        index,
        type: 'reflection-left',
        distance: i,
      });
    }

    // Ajouter l'image active
    indices.push({
      index: active,
      type: 'active',
      distance: 0,
    });

    // Ajouter les reflets à droite (images futures)
    for (let i = 1; i <= maxReflections; i++) {
      const index = (active + i) % validImageCount;
      indices.push({
        index,
        type: 'reflection-right',
        distance: i,
      });
    }

    return indices;
  }, [active, validImageCount]);

  const visibleIndices = getVisibleIndices();

  // Calcul des indices des 3 cartes principales
  const getMainCardsIndices = useCallback(() => {
    if (validImageCount === 0) return [];
    if (validImageCount === 1) return [active];
    if (validImageCount === 2) {
      return [active, (active + 1) % validImageCount];
    }

    // Pour 3 cartes : précédente, active, suivante
    const indices = [
      (active - 1 + validImageCount) % validImageCount,
      active,
      (active + 1) % validImageCount,
    ];

    return indices;
  }, [active, validImageCount]);

  const mainCardsIndices = getMainCardsIndices();

  if (loading) {
    return (
      <div className="w-full max-w-6xl mx-auto px-4">
        <div className="relative w-full h-[70vh] min-h-[500px] flex items-center justify-center">
          <div className="text-amber-400 text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white mb-4"></div>
            <p>Chargement des images...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="w-full max-w-7xl mx-auto px-4">
        {/* Conteneur principal du carrousel */}
        <div
          className="relative w-full h-[80vh] min-h-[600px] max-h-[900px] overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Zone de reflets (fond) */}
          <div className="absolute inset-0 z-0 flex items-center justify-center">
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Réflexions des images passées et futures */}
              {visibleIndices.map((item, idx) => {
                if (item.type === 'active') return null;

                const imagePath = getImagePath(item.index);
                const opacity = Math.max(0.1, 0.5 - (item.distance * 0.1));
                const scale = 1 - (item.distance * 0.15);
                const blur = item.distance * 4;
                const translateX = item.type === 'reflection-left'
                  ? `-${120 + (item.distance * 60)}%`
                  : `${120 + (item.distance * 60)}%`;

                return (
                  <div
                    key={`${item.type}-${item.index}-${idx}`}
                    className="absolute w-[25%] h-[50%] transition-all duration-700 ease-out rounded-xl overflow-hidden"
                    style={{
                      transform: `translateX(${translateX}) scale(${scale})`,
                      opacity: opacity,
                      filter: `blur(${blur}px) brightness(0.6)`,
                      zIndex: 10 - item.distance,
                    }}
                  >
                    <div className="relative w-full h-full">
                      <Image
                        src={imagePath}
                        alt={`Reflet ${item.index + 1}`}
                        fill
                        className="object-cover"
                        sizes="25vw"
                        priority={item.distance <= 2}
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Boutons de navigation */}
          {showControls && validImageCount > 1 && (
            <>
              <button
                onClick={handlePrevious}
                className={cn(
                  "absolute left-4 top-1/2 -translate-y-1/2 z-40",
                  "p-4 rounded-full bg-white/10 backdrop-blur-lg border border-white/20",
                  "text-amber-400 hover:text-amber-300 hover:bg-white/20 transition-all duration-300",
                  "shadow-2xl hover:shadow-3xl hover:scale-110",
                  "group"
                )}
                aria-label="Image précédente"
              >
                <ChevronLeft className="w-8 h-8 md:w-10 md:h-10 group-hover:-translate-x-1 transition-transform" />
              </button>

              <button
                onClick={handleNext}
                className={cn(
                  "absolute right-4 top-1/2 -translate-y-1/2 z-40",
                  "p-4 rounded-full bg-white/10 backdrop-blur-lg border border-white/20",
                  "text-amber-400 hover:text-amber-300 hover:bg-white/20 transition-all duration-300",
                  "shadow-2xl hover:shadow-3xl hover:scale-110",
                  "group"
                )}
                aria-label="Image suivante"
              >
                <ChevronRight className="w-8 h-8 md:w-10 md:h-10 group-hover:translate-x-1 transition-transform" />
              </button>
            </>
          )}

          {/* Bouton pause/play */}
          {/* {validImageCount > 0 && (
            <button
              onClick={() => setIsPaused(!isPaused)}
              className={cn(
                "absolute top-4 right-4 z-40",
                "p-3 rounded-full bg-white/10 backdrop-blur-lg border border-white/20",
                "text-amber-400 hover:text-amber-300 hover:bg-white/20 transition-all duration-300",
                "shadow-lg hover:shadow-xl",
                "focus:outline-none focus:ring-2 focus:ring-white/50"
              )}
              aria-label={isPaused ? "Reprendre" : "Pause"}
            >
              {isPaused ? (
                <Play className="w-6 h-6" />
              ) : (
                <Pause className="w-6 h-6" />
              )}
            </button>
          )} */}

          {/* Indicateurs de progression */}
          {showIndicators && validImageCount > 1 && (
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-40">
              <div className="flex items-center gap-2 bg-black/40 backdrop-blur-lg rounded-full px-6 py-3 border border-white/10">
                <span className="text-amber-400/80 text-sm font-medium">
                  {active + 1} / {validImageCount}
                </span>
                <div className="h-4 w-px bg-white/20" />
                {Array.from({ length: Math.min(7, validImageCount) }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActive(index)}
                    className={cn(
                      "w-2 h-2 rounded-full transition-all duration-300",
                      index === active
                        ? "bg-amber-400 w-6 scale-125"
                        : "bg-white/30 hover:bg-white/60 hover:scale-110"
                    )}
                    aria-label={`Aller à l'image ${index + 1}`}
                  />
                ))}
                {validImageCount > 7 && (
                  <span className="text-amber-400/60 text-xs px-2">
                    +{validImageCount - 7}
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Message si aucune image */}
          {validImageCount === 0 && (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-amber-400 z-40">
              <svg className="w-20 h-20 text-amber-400/30 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-xl mb-2">Aucune image trouvée</p>
              <p className="text-amber-400/70 text-sm">
                Placez vos images dans <code className="bg-white/10 px-2 py-1 rounded">public/produits/</code>
              </p>
              <p className="text-amber-400/50 text-xs mt-2">
                Format attendu: produit-01.jpg, produit-02.png, etc.
              </p>
            </div>
          )}

          {/* Conteneur des 3 cartes principales */}
          {validImageCount > 0 && (
            <div className="absolute inset-0 z-30 flex items-center justify-center">
              <div className="relative w-full h-full flex items-center justify-center">
                {mainCardsIndices.map((index, positionIndex) => {
                  const isActive = index === active;
                  const isLeft = positionIndex === 0;
                  const isRight = positionIndex === 2;
                  const isCenter = positionIndex === 1;

                  const hasError = imageErrors.has(index);
                  const imagePath = getImagePath(index);

                  return (
                    <div
                      key={index}
                      className={cn(
                        "absolute transition-all duration-700 ease-out rounded-3xl shadow-2xl border-2 overflow-hidden",
                        "group cursor-pointer transform-gpu",
                        isCenter ? "z-30" : "z-20",
                        isActive && "shadow-amber-400/20 border-amber-400/30",
                        !isActive && "border-white/10"
                      )}
                      style={{
                        width: isCenter ? '40%' : '30%',
                        height: isCenter ? '75%' : '60%',
                        transform: isCenter
                          ? 'translateX(0) scale(1) rotateY(0deg)'
                          : isLeft
                            ? 'translateX(-110%) scale(0.85) rotateY(-15deg)'
                            : 'translateX(110%) scale(0.85) rotateY(15deg)',
                        opacity: isCenter ? 1 : 0.9,
                        filter: isCenter
                          ? 'brightness(1.1) drop-shadow(0 25px 25px rgba(0, 0, 0, 0.5))'
                          : 'brightness(0.8) contrast(0.95) drop-shadow(0 15px 15px rgba(0, 0, 0, 0.3))',
                        transition: 'all 700ms cubic-bezier(0.4, 0, 0.2, 1)',
                      }}
                      onClick={() => !hasError && openLightbox(index)}
                    >
                      <div className="relative w-full h-full bg-linear-to-br from-gray-900/80 to-gray-700/80 backdrop-blur-sm">
                        {hasError ? (
                          <div className="w-full h-full flex flex-col items-center justify-center p-8">
                            <div className="text-amber-400/50 mb-4">
                              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            </div>
                            <p className="text-amber-400/70 text-center text-sm">
                              Image {String(index + 1).padStart(2, '0')} non chargée
                            </p>
                          </div>
                        ) : (
                          <>
                            {/* Image principale */}
                            <Image
                              src={imagePath}
                              alt={`Produit ${String(index + 1).padStart(2, '0')}`}
                              fill
                              className="object-cover transition-transform duration-500 group-hover:scale-110"
                              sizes="(max-width: 768px) 40vw, 40vw"
                              priority={isCenter}
                              onError={() => handleImageError(index)}
                            />

                            {/* Overlay de profondeur */}
                            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent" />

                            {/* Effet de brillance */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            {/* Numéro de l'image
                            <div className="absolute top-6 left-6 bg-black/50 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
                              <span className="text-amber-300 text-sm font-bold tracking-wider">
                                #{String(index + 1).padStart(2, '0')}
                              </span>
                            </div> */}

                            {/* Effet de lumière sur les bords */}
                            <div className={cn(
                              "absolute inset-0 border-2 pointer-events-none transition-all duration-500",
                              isCenter
                                ? "border-amber-400/30 shadow-[0_0_40px_rgba(251,191,36,0.3)]"
                                : "border-white/10"
                            )} />

                            {/* Bouton zoom */}
                            {isCenter && (
                              <div className="absolute bottom-6 right-6 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                                <div className="p-3 bg-amber-400/90 backdrop-blur-md rounded-full shadow-lg hover:scale-110 transition-transform duration-300">
                                  <ZoomIn className="w-6 h-6 text-gray-900" />
                                </div>
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Effet de bokeh/lumières en arrière-plan */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-amber-400/10 animate-pulse"
                style={{
                  width: `${Math.random() * 100 + 50}px`,
                  height: `${Math.random() * 100 + 50}px`,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  filter: 'blur(40px)',
                  animationDuration: `${Math.random() * 10 + 5}s`,
                  animationDelay: `${Math.random() * 5}s`,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 animate-in fade-in duration-300"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-6 right-6 text-amber-400 hover:text-amber-300 transition-colors z-50"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedImage(null);
            }}
            aria-label="Fermer"
          >
            <X className="w-10 h-10" />
          </button>

          {/* Navigation dans la lightbox */}
          {validImageCount > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrevious();
                  const newIndex = active > 0 ? active - 1 : validImageCount - 1;
                  setSelectedImage(getImagePath(newIndex));
                }}
                className="absolute left-6 top-1/2 -translate-y-1/2 text-amber-400 hover:text-amber-300 transition-colors z-50"
                aria-label="Image précédente"
              >
                <ChevronLeft className="w-12 h-12" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                  const newIndex = active < validImageCount - 1 ? active + 1 : 0;
                  setSelectedImage(getImagePath(newIndex));
                }}
                className="absolute right-6 top-1/2 -translate-y-1/2 text-amber-400 hover:text-amber-300 transition-colors z-50"
                aria-label="Image suivante"
              >
                <ChevronRight className="w-12 h-12" />
              </button>
            </>
          )}

          {/* Image agrandie */}
          <div className="relative max-w-[90vw] max-h-[90vh] w-full h-full">
            <Image
              src={selectedImage}
              alt="Vue agrandie"
              fill
              className="object-contain"
              sizes="90vw"
              priority
            />

            {/* Info image */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-md rounded-full px-6 py-3 border border-white/10">
              <span className="text-amber-300 font-medium">
                Image {active + 1} sur {validImageCount}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}