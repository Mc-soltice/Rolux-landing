'use client';

import { useEffect, useState } from 'react';
import ServiceCard from './Servicecard';
import ServicesCarousel from './Servicescarrousel';


const ServicesResponsive = () => {
  const [deviceType, setDeviceType] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');

  useEffect(() => {
    const determineDeviceType = () => {
      const width = window.innerWidth;

      if (width < 768) {
        return 'mobile';
      } else if (width < 1024) {
        return 'tablet';
      } else {
        return 'desktop';
      }
    };

    const updateDeviceType = () => {
      setDeviceType(determineDeviceType());
    };

    // Initialiser
    updateDeviceType();

    // Gérer le redimensionnement avec debounce pour performance
    let timeoutId: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(updateDeviceType, 150); // 150ms debounce
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  // Logique d'affichage
  switch (deviceType) {
    case 'desktop':
      return <ServicesCarousel />;
    case 'tablet':
      // Vous pouvez choisir ce qui convient le mieux pour les tablettes
      return <ServicesCarousel />; // ou <ServicesCard /> selon votre préférence
    case 'mobile':
      return <ServiceCard />;
    default:
      return <ServiceCard />;
  }
};

export default ServicesResponsive;