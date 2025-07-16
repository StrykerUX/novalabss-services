"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import FadeUpWords from './FadeUpWords';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function WhyNovaLabs() {
  const cardsRef = useRef<HTMLDivElement>(null);
  const numbersRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (typeof window === 'undefined' || !cardsRef.current) return;

    const cards = cardsRef.current.children;
    
    // Staggered reveal animation for cards
    gsap.fromTo(cards, 
      { 
        opacity: 0, 
        y: 60,
        scale: 0.9,
        rotationY: -15
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        rotationY: 0,
        duration: 0.8,
        ease: "back.out(1.4)",
        stagger: 0.2,
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // One-time entrance animation for numbers
    numbersRef.current.forEach((numberEl, index) => {
      if (numberEl) {
        gsap.fromTo(numberEl,
          {
            scale: 0.5,
            opacity: 0,
            rotationY: 90
          },
          {
            scale: 1,
            opacity: 1,
            rotationY: 0,
            duration: 0.8,
            ease: "back.out(1.7)",
            delay: 0.3 + (index * 0.2),
            scrollTrigger: {
              trigger: numberEl,
              start: "top 85%",
              toggleActions: "play none none none"
            }
          }
        );
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
  return (
    <section className="py-20">
      <div className="w-full max-w-[1780px] mx-auto px-[5%]">
        {/* Title and subtitle */}
        <div className="text-center mb-16">
          <h2 className="text-5xl sm:text-5xl lg:text-6xl font-black bg-gradient-to-b from-white to-white/10 bg-clip-text text-transparent leading-[100%] tracking-tight mb-6">
            ¿POR QUÉ NOVALABS?
          </h2>
        </div>

        {/* 4 cards grid */}
        <div ref={cardsRef} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Card 1 */}
          <div className="bg-[#1A1A1A] rounded-[48px] p-8 lg:p-12 relative overflow-hidden min-h-[280px] flex flex-col">
            <h3 className="text-white text-2xl lg:text-2xl font-semibold mb-6 tracking-wide">
              SIN COMPLICACIONES TÉCNICAS
            </h3>
            
            {/* Mobile layout - column */}
            <div className="flex flex-col lg:hidden flex-1">
              <p className="text-white/90 text-base leading-relaxed mb-6">
                Nosotros manejamos toda la tecnología mientras tú te enfocas en vender. Sin dolores de cabeza, sin curvas de aprendizaje, solo resultados.
              </p>
              <div className="text-[80px] font-black bg-gradient-to-b from-[#0147FF] to-[#0147FF38] bg-clip-text text-transparent leading-none text-center -mt-6 transform scale-[1.45] translate-x-12 translate-y-8">
                01
              </div>
            </div>
            
            {/* Desktop layout - row */}
            <div className="hidden lg:flex items-end justify-between flex-1">
              <div className="max-w-[60%]">
                <p className="text-white/90 text-base leading-relaxed">
                  Nosotros manejamos toda la tecnología mientras tú te enfocas en vender. Sin dolores de cabeza, sin curvas de aprendizaje, solo resultados.
                </p>
              </div>
              <div 
                ref={(el) => numbersRef.current[0] = el}
                className="text-[120px] lg:text-[140px] font-black bg-gradient-to-b from-[#0147FF] to-[#0147FF38] bg-clip-text text-transparent leading-none transform scale-125 translate-x-4 translate-y-16"
              >
                01
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-[#1A1A1A] rounded-[48px] p-8 lg:p-12 relative overflow-hidden min-h-[280px] flex flex-col">
            <h3 className="text-white text-2xl lg:text-2xl font-semibold mb-6 tracking-wide">
              RESULTADOS EN 72 HORAS
            </h3>
            
            {/* Mobile layout - column */}
            <div className="flex flex-col lg:hidden flex-1">
              <p className="text-white/90 text-base leading-relaxed mb-6">
                Tu sitio web funcionando y vendiendo en menos de una semana. Mientras tu competencia planifica, tú ya estás generando ingresos.
              </p>
              <div className="text-[80px] font-black bg-gradient-to-b from-[#0147FF] to-[#0147FF38] bg-clip-text text-transparent leading-none text-center -mt-6 transform scale-[1.45] translate-x-12 translate-y-8">
                02
              </div>
            </div>
            
            {/* Desktop layout - row */}
            <div className="hidden lg:flex items-end justify-between flex-1">
              <div className="max-w-[60%]">
                <p className="text-white/90 text-base leading-relaxed">
                  Tu sitio web funcionando y vendiendo en menos de una semana. Mientras tu competencia planifica, tú ya estás generando ingresos.
                </p>
              </div>
              <div 
                ref={(el) => numbersRef.current[1] = el}
                className="text-[120px] lg:text-[140px] font-black bg-gradient-to-b from-[#0147FF] to-[#0147FF38] bg-clip-text text-transparent leading-none transform scale-125 translate-x-4 translate-y-16"
              >
                02
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-[#1A1A1A] rounded-[48px] p-8 lg:p-12 relative overflow-hidden min-h-[280px] flex flex-col">
            <h3 className="text-white text-2xl lg:text-2xl font-semibold mb-6 tracking-wide">
              COSTO PREDECIBLE
            </h3>
            
            {/* Mobile layout - column */}
            <div className="flex flex-col lg:hidden flex-1">
              <p className="text-white/90 text-base leading-relaxed mb-6">
                $999 MXN bimestrales, sin sorpresas ni costos ocultos. Presupuesto controlado para que puedas proyectar tu crecimiento sin riesgos.
              </p>
              <div className="text-[80px] font-black bg-gradient-to-b from-[#0147FF] to-[#0147FF38] bg-clip-text text-transparent leading-none text-center -mt-6 transform scale-[1.45] translate-x-12 translate-y-8">
                03
              </div>
            </div>
            
            {/* Desktop layout - row */}
            <div className="hidden lg:flex items-end justify-between flex-1">
              <div className="max-w-[60%]">
                <p className="text-white/90 text-base leading-relaxed">
                  $999 MXN bimestrales, sin sorpresas ni costos ocultos. Presupuesto controlado para que puedas proyectar tu crecimiento sin riesgos.
                </p>
              </div>
              <div 
                ref={(el) => numbersRef.current[2] = el}
                className="text-[120px] lg:text-[140px] font-black bg-gradient-to-b from-[#0147FF] to-[#0147FF38] bg-clip-text text-transparent leading-none transform scale-125 translate-x-4 translate-y-16"
              >
                03
              </div>
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-[#1A1A1A] rounded-[48px] p-8 lg:p-12 relative overflow-hidden min-h-[280px] flex flex-col">
            <h3 className="text-white text-2xl lg:text-2xl font-semibold mb-6 tracking-wide">
              SOPORTE 100% MEXICANO
            </h3>
            
            {/* Mobile layout - column */}
            <div className="flex flex-col lg:hidden flex-1">
              <p className="text-white/90 text-base leading-relaxed mb-6">
                Entendemos tu negocio y hablamos tu idioma. Soporte en horario mexicano con gente que conoce tu mercado y desafíos reales.
              </p>
              <div className="text-[80px] font-black bg-gradient-to-b from-[#0147FF] to-[#0147FF38] bg-clip-text text-transparent leading-none text-center -mt-6 transform scale-[1.45] translate-x-12 translate-y-8">
                04
              </div>
            </div>
            
            {/* Desktop layout - row */}
            <div className="hidden lg:flex items-end justify-between flex-1">
              <div className="max-w-[60%]">
                <p className="text-white/90 text-base leading-relaxed">
                  Entendemos tu negocio y hablamos tu idioma. Soporte en horario mexicano con gente que conoce tu mercado y desafíos reales.
                </p>
              </div>
              <div 
                ref={(el) => numbersRef.current[3] = el}
                className="text-[120px] lg:text-[140px] font-black bg-gradient-to-b from-[#0147FF] to-[#0147FF38] bg-clip-text text-transparent leading-none transform scale-125 translate-x-4 translate-y-16"
              >
                04
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}