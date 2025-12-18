"use client";

import { services } from "@/app/lib/data/services";
import Image from "next/image";

export default function ServiceCard() {
  return (
    <div className="flex flex-wrap justify-center gap-5 ">
      {services.map((service) => (
        <div
          key={service.id}
          className="group bg-white w-96 max-w-full rounded-2xl shadow-lg overflow-hidden 
                   border border-gray-100 hover:border-amber-300 transition-all duration-300 
                   hover:shadow-xl m-5 flex flex-col"
        >
          {/* Image container avec effet de survol */}
          <div className="relative w-full h-64 overflow-hidden rounded-t-2xl">
            <Image
              src={service.image}
              alt={service.title}
              fill
              sizes="(max-width: 384px) 100vw, 384px"
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-linear-to-t from-black/10 to-transparent" />
          </div>

          {/* Contenu */}
          <div className="flex flex-col grow p-6">
            <div className="mb-4">
              <h3 className="text-2xl font-bold text-amber-900 mb-2">
                {service.title}
              </h3>
              <div className="h-1 w-12 bg-amber-600 rounded-full mb-3"></div>
            </div>

            <p className="text-gray-700 mb-6 grow">
              {service.shortDescription}
            </p>

            <div className="mt-auto pt-4 border-t border-gray-100">
              <button className="w-full py-3 bg-linear-to-r from-amber-600 to-amber-700 
                               text-white font-semibold rounded-xl hover:from-amber-700 
                               hover:to-amber-800 transition-all duration-300 
                               transform hover:-translate-y-1 shadow-md hover:shadow-lg">
                En savoir plus
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}