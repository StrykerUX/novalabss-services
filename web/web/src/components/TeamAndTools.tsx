"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function TeamAndTools() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !gridRef.current) return;

    const cards = gridRef.current.children;
    
    // Staggered reveal animation
    gsap.fromTo(cards, 
      { 
        opacity: 0, 
        y: 80,
        scale: 0.8
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: "back.out(1.7)",
        stagger: 0.1,
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Individual hover effects for each card
    Array.from(cards).forEach((card) => {
      const handleMouseEnter = () => {
        gsap.to(card, {
          y: -10,
          scale: 1.02,
          boxShadow: "0 20px 40px rgba(1, 71, 255, 0.2)",
          duration: 0.3,
          ease: "power2.out"
        });
      };

      const handleMouseLeave = () => {
        gsap.to(card, {
          y: 0,
          scale: 1,
          boxShadow: "0 0px 0px rgba(1, 71, 255, 0)",
          duration: 0.3,
          ease: "power2.out"
        });
      };

      card.addEventListener('mouseenter', handleMouseEnter);
      card.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section className="py-20">
      <div className="w-full max-w-[1780px] mx-auto px-[5%]">
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="text-5xl sm:text-5xl lg:text-6xl font-black bg-gradient-to-b from-white to-white/10 bg-clip-text text-transparent leading-[100%] tracking-tight mb-6">
            EL PODER DETRÁS DE NOVALABS
          </h2>
          <p className="text-lg lg:text-xl text-white/80 max-w-4xl mx-auto">
            3 especialistas + 4 herramientas de vanguardia = Tu éxito garantizado
          </p>
        </div>

        {/* Grid 2x4 */}
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Abraham Almazan */}
          <div className="rounded-[48px] relative overflow-hidden border border-white/10 group hover:border-blue-400/30 transition-all duration-300 h-[480px] flex flex-col">
            {/* Background with image placeholder */}
            <div className="h-full bg-gradient-to-br from-blue-500/20 to-blue-700/20 bg-[#1A1A1A] relative p-6 flex flex-col justify-between">
              {/* Name at top left */}
              <h3 className="text-white text-4xl font-black font-space-grotesk leading-tight">
                Abraham<br />Almazan
              </h3>
              {/* Default description - hidden on hover */}
              <p className="text-white/70 text-lg group-hover:opacity-0 transition-opacity duration-300">
                Fundador • UX/UI Designer • Full-Stack Developer • AI Prompt Engineer • AI Automations Specialist
              </p>
              
              {/* Hover experience summary - shown on hover */}
              <div className="absolute inset-6 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto">
                <h3 className="text-white text-4xl font-black font-space-grotesk leading-tight">
                  Abraham<br />Almazan
                </h3>
                <div className="text-white/90 text-sm leading-relaxed">
                  <p className="mb-3">
                    <span className="text-blue-300 font-semibold">Soy el fundador de NovaLabs</span>, y creo que cada negocio mexicano merece las mismas herramientas digitales que las grandes empresas.
                  </p>
                  <p className="mb-3">
                    He trabajado con <span className="text-blue-300">equipos en Canadá y Estados Unidos</span>, viendo de cerca la brecha tecnológica que existe.
                  </p>
                  <p className="mb-3">
                    Mi objetivo: <span className="text-blue-300">cerrar esa brecha</span> una PyME a la vez, con tecnología accesible y resultados reales.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Claude Code */}
          <div className="rounded-[48px] relative overflow-hidden border border-white/10 group hover:border-blue-400/30 transition-all duration-300 h-[480px] flex flex-col">
            {/* Background with image */}
            <div className="h-full bg-[#1A1A1A] relative p-6 flex flex-col justify-between">
              {/* Background image */}
              <div className="absolute inset-0 opacity-30 overflow-hidden">
                <img 
                  src="/imgs/claude.jpg" 
                  alt="Claude Code background"
                  className="w-full h-full object-cover transition-transform duration-300 ease-in-out transform-gpu group-hover:scale-150 group-hover:translate-x-[-25%] group-hover:rotate-3 origin-left"
                />
              </div>
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-orange-700/20"></div>
              {/* Name at top left */}
              <h3 className="text-white text-4xl font-black font-space-grotesk leading-tight relative z-10">
                Claude<br />Code
              </h3>
              {/* Description at bottom */}
              <p className="text-white/70 text-lg relative z-10">
                Desarrollo acelerado con IA de Anthropic
              </p>
            </div>
          </div>

          {/* Julio Levien */}
          <div className="rounded-[48px] relative overflow-hidden border border-white/10 group hover:border-blue-400/30 transition-all duration-300 h-[480px] flex flex-col">
            {/* Background with image placeholder */}
            <div className="h-full bg-gradient-to-br from-green-500/20 to-green-700/20 bg-[#1A1A1A] relative p-6 flex flex-col justify-between">
              {/* Name at top left */}
              <h3 className="text-white text-4xl font-black font-space-grotesk leading-tight">
                Julio<br />Levien
              </h3>
              {/* Default description - hidden on hover */}
              <p className="text-white/70 text-lg group-hover:opacity-0 transition-opacity duration-300">
                Co-Fundador • Frontend Designer • AI Prompt Engineer • Research & Market Specialist
              </p>
              
              {/* Hover experience summary - shown on hover */}
              <div className="absolute inset-6 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto">
                <h3 className="text-white text-4xl font-black font-space-grotesk leading-tight">
                  Julio<br />Levien
                </h3>
                <div className="text-white/90 text-sm leading-relaxed">
                  <p className="mb-3">
                    <span className="text-green-300 font-semibold">Frontend Designer</span> especializado en investigación de mercado y análisis de competencia.
                  </p>
                  <p className="mb-3">
                    Experto en <span className="text-green-300">AI prompting</span>, <span className="text-green-300">user research</span> y estrategias de posicionamiento.
                  </p>
                  <p>
                    Sus análisis han optimizado estrategias que generaron +$2M MXN en ventas.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Cursor */}
          <div className="rounded-[48px] relative overflow-hidden border border-white/10 group hover:border-blue-400/30 transition-all duration-300 h-[480px] flex flex-col">
            {/* Background with image */}
            <div className="h-full bg-[#1A1A1A] relative p-6 flex flex-col justify-between">
              {/* Background image */}
              <div className="absolute inset-0 opacity-30 overflow-hidden">
                <img 
                  src="/imgs/cursor.jpg" 
                  alt="Cursor background"
                  className="w-full h-full object-cover transition-transform duration-300 ease-in-out transform-gpu group-hover:scale-150 group-hover:translate-x-[-25%] group-hover:rotate-3 origin-left"
                />
              </div>
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-purple-700/20"></div>
              {/* Name at top left */}
              <h3 className="text-white text-4xl font-black font-space-grotesk leading-tight relative z-10">
                Cursor
              </h3>
              {/* Description at bottom */}
              <p className="text-white/70 text-lg relative z-10">
                Editor IA avanzado para desarrollo
              </p>
            </div>
          </div>

          {/* OpenAI CLI */}
          <div className="rounded-[48px] relative overflow-hidden border border-white/10 group hover:border-blue-400/30 transition-all duration-300 h-[480px] flex flex-col">
            {/* Background with image */}
            <div className="h-full bg-[#1A1A1A] relative p-6 flex flex-col justify-between">
              {/* Background image */}
              <div className="absolute inset-0 opacity-30 overflow-hidden">
                <img 
                  src="/imgs/openai.jpg" 
                  alt="OpenAI CLI background"
                  className="w-full h-full object-cover transition-transform duration-300 ease-in-out transform-gpu group-hover:scale-150 group-hover:translate-x-[-25%] group-hover:rotate-3 origin-left"
                />
              </div>
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-emerald-700/20"></div>
              {/* Name at top left */}
              <h3 className="text-white text-4xl font-black font-space-grotesk leading-tight relative z-10">
                OpenAI<br />CLI
              </h3>
              {/* Description at bottom */}
              <p className="text-white/70 text-lg relative z-10">
                Automatización inteligente avanzada
              </p>
            </div>
          </div>

          {/* Hector Sanchez */}
          <div className="rounded-[48px] relative overflow-hidden border border-white/10 group hover:border-blue-400/30 transition-all duration-300 h-[480px] flex flex-col">
            {/* Background with image placeholder */}
            <div className="h-full bg-gradient-to-br from-red-500/20 to-red-700/20 bg-[#1A1A1A] relative p-6 flex flex-col justify-between">
              {/* Name at top left */}
              <h3 className="text-white text-4xl font-black font-space-grotesk leading-tight">
                Hector<br />Sánchez
              </h3>
              {/* Default description - hidden on hover */}
              <p className="text-white/70 text-lg group-hover:opacity-0 transition-opacity duration-300">
                Frontend Developer • Server Infrastructure • Performance Expert • Technical Assistance
              </p>
              
              {/* Hover experience summary - shown on hover */}
              <div className="absolute inset-6 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto">
                <h3 className="text-white text-4xl font-black font-space-grotesk leading-tight">
                  Hector<br />Sánchez
                </h3>
                <div className="text-white/90 text-sm leading-relaxed">
                  <p className="mb-3">
                    <span className="text-red-300 font-semibold">Frontend Developer</span> especializado en infraestructura de servidores y optimización de rendimiento.
                  </p>
                  <p className="mb-3">
                    Experto en <span className="text-red-300">performance optimization</span>, <span className="text-red-300">server management</span> y soporte técnico avanzado.
                  </p>
                  <p>
                    Garantiza +99% uptime y soporte técnico 24/7 para todos los proyectos.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Hostinger */}
          <div className="rounded-[48px] relative overflow-hidden border border-white/10 group hover:border-blue-400/30 transition-all duration-300 h-[480px] flex flex-col">
            {/* Background with image */}
            <div className="h-full bg-[#1A1A1A] relative p-6 flex flex-col justify-between">
              {/* Background image */}
              <div className="absolute inset-0 opacity-30 overflow-hidden">
                <img 
                  src="/imgs/hostinger.jpg" 
                  alt="Hostinger background"
                  className="w-full h-full object-cover transition-transform duration-300 ease-in-out transform-gpu group-hover:scale-150 group-hover:translate-x-[-25%] group-hover:rotate-3 origin-left"
                />
              </div>
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-cyan-700/20"></div>
              {/* Name at top left */}
              <h3 className="text-white text-4xl font-black font-space-grotesk leading-tight relative z-10">
                Hostinger
              </h3>
              {/* Description at bottom */}
              <p className="text-white/70 text-lg relative z-10">
                Hosting & Servidores de alto rendimiento
              </p>
            </div>
          </div>

          {/* CTA with Discount */}
          <div className="rounded-[48px] relative overflow-hidden border-2 border-[#0147FF]/40 group hover:border-[#0147FF]/60 transition-all duration-300 h-[480px] flex flex-col">
            {/* Background with discount styling */}
            <div className="h-full bg-gradient-to-br from-[#0147FF]/20 to-[#0147FF]/10 bg-[#1A1A1A] relative p-6 flex flex-col justify-between">
              {/* Discount badge */}
              <div className="absolute top-6 right-6 bg-[#0147FF] text-white px-3 py-1 rounded-full text-xs font-bold">
                25% OFF
              </div>
              {/* Title at top left */}
              <h3 className="text-white text-4xl font-black font-space-grotesk leading-tight">
                ¡Empieza<br />Ahora!
              </h3>
              {/* Description and CTA at bottom */}
              <div>
                <p className="text-white/80 text-sm mb-4">
                  Tu sitio web por solo <span className="font-bold text-blue-300">$749 MXN</span> el primer mes
                </p>
                <button className="w-full bg-gradient-to-r from-[#0147FF] to-[#0147FF80] text-white px-4 py-3 rounded-full font-semibold text-sm hover:from-[#0147FF] hover:to-[#0147FF] transition-all duration-300 shadow-lg shadow-blue-600/30">
                  Reclamar descuento
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}