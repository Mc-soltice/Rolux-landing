"use client";

import { heroSlides } from "@/app/lib/heroSlides";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) =>
        prev === heroSlides.length - 1 ? 0 : prev + 1
      );
    }, 5000); // 5 secondes

    return () => clearInterval(interval);
  }, []);

  const slide = heroSlides[current];

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background image */}
      <Image
        src={slide.image}
        alt={slide.title}
        fill
        priority
        className="object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />


      {/* Content */}
      <div className="relative z-20 hero min-h-screen text-neutral-content">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">
              {slide.title}
            </h1>
            <p className="mb-5">{slide.description}</p>
            <button className="btn btn-primary">
              {slide.cta}
            </button>
          </div>
        </div>
      </div>

      {/* Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full ${index === current ? "bg-white" : "bg-white/50"
              }`}
          />
        ))}
      </div>
      {/* Gradient to transition to next section */}
      <div className="absolute bottom-0 left-0 w-full h-10 bg-gradient-to-b from-transparent to-gray-100 z-10" />
    </div>
  );
}
