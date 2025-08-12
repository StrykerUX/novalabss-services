"use client";

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { gsap } from 'gsap';

interface PageTransitionProps {
  children: React.ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayChildren, setDisplayChildren] = useState(children);

  useEffect(() => {
    // Solo hacer transición si la ruta cambió
    if (displayChildren !== children) {
      setIsTransitioning(true);
      
      // Fase 1: Salida (1 segundo)
      const tl = gsap.timeline({
        onComplete: () => {
          // Cambiar contenido en el punto medio
          setDisplayChildren(children);
          
          // Fase 2: Entrada (1 segundo)
          gsap.fromTo('.page-content', 
            {
              opacity: 0,
              y: 30,
              scale: 0.98
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 1,
              ease: "power3.out",
              onComplete: () => {
                setIsTransitioning(false);
              }
            }
          );
        }
      });

      // Animación de salida
      tl.to('.page-content', {
        opacity: 0,
        y: -20,
        scale: 1.02,
        duration: 1,
        ease: "power3.in"
      });
    }
  }, [children, displayChildren]);

  return (
    <div className="relative min-h-screen">
      {/* Overlay de transición */}
      {isTransitioning && (
        <div className="fixed inset-0 z-50 pointer-events-none">
          {/* Efecto de partículas durante transición */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-black to-purple-900/10">
            <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />
          </div>
          
          {/* Indicador de carga sutil */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-12 h-12 border-2 border-blue-400/30 border-t-blue-400 rounded-full animate-spin" />
          </div>
        </div>
      )}
      
      {/* Contenido de la página */}
      <div className="page-content">
        {displayChildren}
      </div>
    </div>
  );
}