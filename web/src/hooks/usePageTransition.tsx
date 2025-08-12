"use client";

import { createContext, useContext, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { gsap } from 'gsap';
import Navigation from '@/components/Navigation';

interface PageTransitionContextType {
  navigateWithTransition: (href: string) => void;
  isTransitioning: boolean;
}

const PageTransitionContext = createContext<PageTransitionContextType | undefined>(undefined);

export function PageTransitionProvider({ children }: { children: React.ReactNode }) {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const router = useRouter();

  const navigateWithTransition = useCallback((href: string) => {
    if (isTransitioning) return; // Prevenir múltiples transiciones
    
    setIsTransitioning(true);
    
    // Prevenir scroll horizontal y asegurar fondo negro
    document.body.style.overflowX = 'hidden';
    document.documentElement.style.overflowX = 'hidden';
    document.body.style.backgroundColor = 'black';
    document.documentElement.style.backgroundColor = 'black';
    
    // Esperar un frame para que el overlay aparezca en el DOM
    setTimeout(() => {
      const tl = gsap.timeline();
      
      // Fase 1: Fade in del overlay (0.2 segundos)
      tl.fromTo('.transition-overlay', 
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.2,
          ease: "power2.out"
        })
        // Fase 2: Salida de la página actual (0.8 segundos) - excluir navigation
        .to('.page-content > *:not(nav)', {
          opacity: 0,
          y: -20,
          scale: 0.98,
          duration: 0.8,
          ease: "power2.in"
        }, "-=0.1") // Overlap ligero
        .call(() => {
          // Navegar a la nueva página
          router.push(href);
          
          // Pequeña pausa para asegurar que la página cambió
          setTimeout(() => {
            const tl2 = gsap.timeline();
            
            // Fase 3: Entrada de la nueva página (1.0 segundos) - excluir navigation
            tl2.fromTo('.page-content > *:not(nav)', 
              {
                opacity: 0,
                y: 20,
                scale: 1.02
              },
              {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 1.0,
                ease: "power2.out"
              })
              // Fase 4: Fade out del overlay (0.2 segundos)
              .to('.transition-overlay', {
                opacity: 0,
                duration: 0.2,
                ease: "power2.in",
                onComplete: () => {
                  setIsTransitioning(false);
                  // Restaurar configuraciones normales después de la transición
                  document.body.style.overflowX = '';
                  document.documentElement.style.overflowX = '';
                  // Mantener fondo negro (no restaurar aquí)
                }
              }, "-=0.3"); // Empezar el fade out antes de que termine la entrada
          }, 100);
        });
    }, 10); // Pequeño delay para que el DOM se actualice
  }, [isTransitioning, router]);

  return (
    <PageTransitionContext.Provider value={{ navigateWithTransition, isTransitioning }}>
      {/* Navigation fijo fuera del contexto de animaciones pero dentro del provider */}
      <Navigation />
      
      {/* Overlay global de transición */}
      {isTransitioning && (
        <div className="transition-overlay fixed inset-0 z-50 pointer-events-none">
          {/* Fondo negro sólido para prevenir destellos */}
          <div className="absolute inset-0 bg-black/80" />
          {/* Overlay con blur por encima */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-black/40 to-purple-900/10 backdrop-blur-md">
            {/* Efecto de loading elegante */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="relative">
                {/* Spinner principal - 50% más grande */}
                <div className="w-24 h-24 border-3 border-blue-400/20 border-t-blue-400 rounded-full animate-spin" />
                
                {/* Logo NovaLabss en el centro - 50% más grande */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="w-12 h-12 text-blue-400" viewBox="0 0 432 432" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="237.073" y="326.634" width="105.366" height="42.1463" rx="21.0731" transform="rotate(90 237.073 326.634)" fill="currentColor"/>
                    <rect x="105.366" y="237.073" width="105.366" height="42.1463" rx="21.0732" transform="rotate(180 105.366 237.073)" fill="currentColor"/>
                    <rect x="279.329" y="122.869" width="105.366" height="42.1463" rx="21.0732" transform="rotate(-45 279.329 122.869)" fill="currentColor"/>
                    <rect x="326.634" y="194.927" width="105.366" height="42.1463" rx="21.0732" fill="currentColor"/>
                    <rect x="148.946" y="305.405" width="63.2195" height="31.6097" rx="15.8049" transform="rotate(135 148.946 305.405)" fill="currentColor"/>
                    <path d="M137.77 137.769C129.54 129.54 116.034 129.46 109.22 138.896C94.2908 159.572 85.5921 184.276 84.4272 210.054C82.9432 242.895 93.7946 275.104 114.849 300.352C135.904 325.599 165.639 342.06 198.212 346.5C230.786 350.94 263.842 343.038 290.885 324.346C317.929 305.655 337.005 277.525 344.364 245.485C351.724 213.445 346.835 179.811 330.659 151.191C314.483 122.572 288.188 101.037 256.943 90.8176C232.417 82.7961 206.232 82.2017 181.614 88.8599C170.379 91.8984 165.68 104.561 170.47 115.169C175.259 125.776 187.756 130.215 199.187 128.031C213.963 125.207 229.329 126.129 243.841 130.876C265.088 137.825 282.968 152.469 293.968 171.93C304.968 191.391 308.292 214.262 303.288 236.05C298.283 257.837 285.312 276.965 266.922 289.675C248.532 302.386 226.054 307.759 203.904 304.74C181.755 301.721 161.534 290.527 147.217 273.359C132.9 256.191 125.521 234.289 126.531 211.957C127.22 196.704 131.788 182.003 139.652 169.18C145.736 159.258 146 145.999 137.77 137.769Z" fill="currentColor"/>
                    <path d="M216 184.39C216.749 184.39 217.493 184.416 218.23 184.467C222.885 184.791 223.902 191.218 223.902 195.884C223.902 202.232 229.048 207.379 235.396 207.379C240.25 207.379 247.022 208.205 247.472 213.039C247.563 214.013 247.609 215.001 247.609 215.999C247.609 233.457 233.457 247.609 216 247.609C198.542 247.609 184.39 233.457 184.39 215.999C184.39 198.541 198.542 184.39 216 184.39Z" fill="currentColor"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div className={`page-content overflow-x-hidden min-h-screen ${isTransitioning ? 'bg-black' : ''}`}>
        {children}
      </div>
    </PageTransitionContext.Provider>
  );
}

export function usePageTransition() {
  const context = useContext(PageTransitionContext);
  if (context === undefined) {
    throw new Error('usePageTransition must be used within a PageTransitionProvider');
  }
  return context;
}