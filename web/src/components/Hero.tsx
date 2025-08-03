"use client";

import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SmoothMagneticButton from './SmoothMagneticButton';
import AnimatedBadge from './AnimatedBadge';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface HeroProps {
  loaderComplete?: boolean;
  showOfferModal?: boolean;
  setShowOfferModal?: (show: boolean) => void;
}

export default function Hero({ loaderComplete = false, showOfferModal = false, setShowOfferModal }: HeroProps) {
  const [mounted, setMounted] = useState(false);
  const [particlePositions, setParticlePositions] = useState<Array<{left: string, top: string}>>([]);
  const rocketRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Generate fixed positions on client side only
    const positions = Array.from({ length: 8 }, () => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
    }));
    setParticlePositions(positions);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined' || !mounted || !loaderComplete) return;

    // "Professional Fade-Up" - Quick Professional Entrance (2.5s)
    const tl = gsap.timeline();
    
    // Create subtle professional overlay
    const professionalOverlay = document.createElement('div');
    professionalOverlay.className = 'professional-overlay fixed inset-0 z-40 pointer-events-none';
    professionalOverlay.innerHTML = `
      <div class="professional-glow absolute inset-0 bg-gradient-radial from-blue-500/20 via-blue-600/10 to-transparent opacity-0"></div>
    `;
    document.body.appendChild(professionalOverlay);

    // Hide hero elements initially - Don't use selectors since they might not match the conditional classes
    gsap.set([
      '.hero-title', '.hero-subtitle', '.hero-badges', '.hero-button'
    ], { opacity: 0, y: 40, scale: 0.98 });

    // Professional sequence (2.5s total)
    
    // Phase 1: Subtle blue background illumination (0.3s)
    tl.to('.professional-glow', {
      opacity: 1,
      duration: 0.8,
      ease: "power2.out"
    }, 0)
    
    // Phase 2: Title emerges from below with breathing effect (1s)
    .fromTo('.hero-title', {
      opacity: 0,
      y: 40,
      scale: 0.98
    }, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 1.2,
      ease: "power2.out"
    }, 0.2)
    .to('.hero-title', {
      scale: 1.02,
      duration: 0.4,
      yoyo: true,
      repeat: 1,
      ease: "sine.inOut"
    }, 1.0)
    
    // Phase 3: Sequential organization of elements (2s)
    .fromTo('.hero-subtitle', {
      opacity: 0,
      y: 25,
      scale: 0.99
    }, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.8,
      ease: "power2.out"
    }, 1.2)
    .to('.hero-badges', {
      opacity: 1,
      duration: 0.8,
      ease: "power2.out"
    }, 1.5)
    .fromTo('.hero-badges .animated-badge', {
      opacity: 0,
      y: 40,
      scale: 0.98
    }, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.8,
      stagger: 0.1,
      ease: "power2.out"
    }, 1.5)
    .fromTo('.hero-button', {
      opacity: 0,
      y: 40,
      scale: 0.98
    }, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.8,
      ease: "power2.out"
    }, 1.8)
    
    // Remove overlay smoothly
    .to('.professional-overlay', {
      opacity: 0,
      duration: 0.5,
      ease: "power2.out",
      onComplete: () => {
        professionalOverlay.remove();
      }
    }, 2.0);

    // Rocket enters with professional confidence
    if (rocketRef.current) {
      gsap.set(rocketRef.current, { opacity: 0, scale: 0.85, y: 30 });
      tl.to(rocketRef.current, {
        opacity: 0.4,
        scale: 0.95,
        y: 0,
        duration: 1,
        ease: "power2.out"
      }, 1.4);

      // Parallax effect
      gsap.to(rocketRef.current, {
        y: -50,
        scrollTrigger: {
          trigger: rocketRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        }
      });
    }

    // Particles appear in organized, professional manner
    if (particlesRef.current) {
      const particles = particlesRef.current.children;
      
      gsap.set(particles, { opacity: 0, scale: 0.8, y: 20 });
      tl.to(particlesRef.current, {
        opacity: 1,
        duration: 0.8,
        ease: "power2.out"
      }, 1.7)
      .to(particles, {
        opacity: 0.2,
        scale: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.04,
        ease: "power2.out"
      }, 1.7);

      // Professional floating animation
      Array.from(particles).forEach((particle, index) => {
        gsap.to(particle, {
          x: -100,
          y: 80,
          rotation: 45,
          opacity: 0.1,
          duration: `random(8, 12)`,
          repeat: -1,
          ease: "none",
          delay: index * 1.5 + 2.5,
          onComplete: () => {
            gsap.set(particle, { x: 100, y: -80, opacity: 0.2 });
          }
        });
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      const overlay = document.querySelector('.professional-overlay');
      if (overlay) overlay.remove();
    };
  }, [mounted, loaderComplete]);
  return (
    <section id="inicio" className="min-h-screen">
      <div className="w-full max-w-[1780px] mx-auto px-[5%] mt-6">
        <div className="bg-[#1A1A1A] rounded-[48px] relative overflow-hidden min-h-[600px] h-auto lg:h-[85vh] flex flex-col justify-start">
          

          {/* Floating particles */}
          {mounted && particlePositions.length > 0 && (
            <div ref={particlesRef} className="absolute inset-0 pointer-events-none opacity-0">
              {particlePositions.map((position, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 bg-blue-500/20 rounded-full"
                  style={position}
                />
              ))}
            </div>
          )}

          {/* Rocket animation - center right large */}
          {mounted && (
            <div ref={rocketRef} className="absolute top-[60%] right-0 transform -translate-y-1/2 pointer-events-none opacity-0">
              <DotLottieReact
                src="/animations/rocket-v1.lottie"
                loop
                autoplay
                className="w-80 h-80 lg:w-[510px] lg:h-[510px] scale-95"
              />
            </div>
          )}
          
          {/* Main content */}
          <div className="flex flex-col p-6 lg:p-12 h-full relative z-10">
            {/* Title, subtitle and badges at top */}
            <div className="max-w-4xl xl:max-w-5xl flex-1">
              <div className="space-y-3 lg:space-y-6">
              <h1 className="hero-title text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-white leading-[100%] tracking-tight opacity-0">
                MIENTRAS TU COMPETENCIA LUCHA CON TECNOLOGÍA,
                <br />
                <span className="text-blue-400">TÚ YA ESTÁS VENDIENDO</span>
              </h1>
              
              <p className="hero-subtitle text-base lg:text-2xl text-white/90 leading-relaxed font-medium max-w-3xl opacity-0">
                Diseñamos sitios web que convierten visitantes en clientes: interfaz profesional, SEO estratégico y hosting confiable. 
                <br />
                <span className="text-blue-400 font-semibold">Tu presencia digital lista en solo días</span>
              </p>
              
              <div className="hero-badges flex flex-wrap gap-2 sm:gap-3 opacity-0">
                <AnimatedBadge 
                  className="animated-badge bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium text-white"
                  pulseDelay={0}
                >
                  Página web personalizada
                </AnimatedBadge>
                <AnimatedBadge 
                  className="animated-badge bg-blue-600/20 backdrop-blur-sm border border-blue-400/30 rounded-full px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium text-blue-200"
                  pulseDelay={0.5}
                >
                  Soporte continuo
                </AnimatedBadge>
                <AnimatedBadge 
                  className="animated-badge bg-green-600/20 backdrop-blur-sm border border-green-400/30 rounded-full px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium text-green-200"
                  pulseDelay={1}
                >
                  Sin complicaciones técnicas
                </AnimatedBadge>
              </div>

              </div>
            </div>
            
            {/* Dual CTA Buttons */}
            <div className="hero-button max-w-4xl mt-16 lg:mt-0 opacity-0">
              <div className="flex flex-col sm:flex-row gap-6 items-center">
                
                {/* CTA Primario - Comenzar ahora */}
                <SmoothMagneticButton 
                  onClick={() => {
                    const planesSection = document.getElementById('planes');
                    if (planesSection) {
                      planesSection.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                      });
                    }
                  }}
                  className="w-full sm:w-auto smooth-magnetic-button text-white px-8 py-4 font-space-grotesk font-semibold text-base lg:text-lg hover:shadow-2xl hover:shadow-blue-500/40 transition-shadow duration-300 shadow-xl shadow-blue-600/30 flex items-center justify-center space-x-3"
                  magneticStrength={0.2}
                >
                  <span>🚀 Comenzar ahora</span>
                  <svg 
                    className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </SmoothMagneticButton>
                
                {/* CTA Secundario - Reclamar oferta */}
                <SmoothMagneticButton
                  onClick={() => setShowOfferModal?.(true)}
                  className="w-full sm:w-auto border-2 border-white bg-gradient-to-r from-black/0 to-black/100 text-white px-8 py-4 font-space-grotesk font-semibold text-base lg:text-lg hover:shadow-2xl hover:shadow-white/40 transition-shadow duration-300 shadow-xl shadow-white/30 flex items-center justify-center space-x-2"
                  magneticStrength={0.2}
                >
                  <span>🔥 Reclamar mi oferta</span>
                </SmoothMagneticButton>
                
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Oferta Exclusiva */}
      {showOfferModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setShowOfferModal?.(false)}
          />
          
          {/* Modal Content */}
          <div className="relative bg-gradient-to-br from-gray-900 to-black border border-red-500/50 rounded-2xl p-8 max-w-md mx-4 shadow-2xl shadow-red-500/25">
            {/* Close Button */}
            <button
              onClick={() => setShowOfferModal?.(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            {/* Header */}
            <div className="text-center mb-6">
              <h3 className="text-2xl font-black text-red-400 mb-2">
                🔥 OFERTA EXCLUSIVA
              </h3>
              <p className="text-white/60 text-sm">
                Solo quedan 11 espacios de 12
              </p>
            </div>
            
            {/* Offer Details */}
            <div className="space-y-4 mb-6">
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <h4 className="text-white font-bold text-lg mb-2">Plan Rocket Exclusivo</h4>
                <div className="flex items-center space-x-3 mb-3">
                  <span className="text-3xl font-black text-green-400">$1,199</span>
                  <span className="text-white/60">bimestrales</span>
                  <span className="text-gray-500 line-through text-lg">$1,799</span>
                </div>
                <p className="text-green-400 text-sm font-semibold">
                  💰 Ahorras $3,600 MXN en tu primer año
                </p>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center text-white/90">
                  <span className="text-green-400 mr-2">✅</span>
                  Sitio web profesional en 3 días
                </div>
                <div className="flex items-center text-white/90">
                  <span className="text-green-400 mr-2">✅</span>
                  Soporte continuo incluido
                </div>
                <div className="flex items-center text-white/90">
                  <span className="text-green-400 mr-2">✅</span>
                  Hosting seguro + SSL + optimización SEO
                </div>
                <div className="flex items-center text-white/90">
                  <span className="text-green-400 mr-2">✅</span>
                  Analytics y versión móvil optimizada
                </div>
              </div>
            </div>
            
            {/* Urgency */}
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-3 mb-6 text-center">
              <p className="text-red-200 text-sm font-bold">
                ⏰ Esta oferta expira cuando se agoten los espacios
              </p>
            </div>
            
            {/* CTA */}
            <button
              onClick={() => {
                setShowOfferModal?.(false);
                const planesSection = document.getElementById('planes');
                if (planesSection) {
                  planesSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                  });
                }
              }}
              className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-8 py-4 font-bold text-lg rounded-xl shadow-xl shadow-red-500/40 transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <span>🚀 Aprovechar oferta ahora</span>
            </button>
          </div>
        </div>
      )}
    </section>
  );
}