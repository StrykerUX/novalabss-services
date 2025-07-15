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
}

export default function Hero({ loaderComplete = false }: HeroProps) {
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
              <div className="space-y-3 lg:space-y-12">
              <h1 className="hero-title text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-white leading-[100%] tracking-tight opacity-0">
                MIENTRAS TU COMPETENCIA LUCHA CON TECNOLOGÍA,
                <br />
                <span className="text-blue-400">TÚ YA ESTÁS VENDIENDO</span>
              </h1>
              
              <p className="hero-subtitle text-base lg:text-2xl text-white/90 leading-relaxed font-medium max-w-3xl opacity-0">
                Tu ventaja competitiva: tecnología profesional sin complicaciones ni dolores de cabeza
              </p>
              
              <div className="hero-badges flex flex-wrap gap-2 sm:gap-3 opacity-0">
                <AnimatedBadge 
                  className="animated-badge bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium text-white"
                  pulseDelay={0}
                >
                  Plan desde $999 MXN/bimestre
                </AnimatedBadge>
                <AnimatedBadge 
                  className="animated-badge bg-blue-600/20 backdrop-blur-sm border border-blue-400/30 rounded-full px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium text-blue-200"
                  pulseDelay={0.5}
                >
                  Tecnología enterprise
                </AnimatedBadge>
                <AnimatedBadge 
                  className="animated-badge bg-green-600/20 backdrop-blur-sm border border-green-400/30 rounded-full px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium text-green-200"
                  pulseDelay={1}
                >
                  Solo queda vender
                </AnimatedBadge>
              </div>
              </div>
            </div>
            
            {/* Button at bottom */}
            <div className="hero-button max-w-4xl mt-16 lg:mt-0 mb-4 lg:mb-8 opacity-0">
              <a href="/start">
                <SmoothMagneticButton 
                  className="smooth-magnetic-button text-white px-8 py-4 font-space-grotesk font-semibold text-base lg:text-lg hover:shadow-2xl hover:shadow-blue-500/40 transition-shadow duration-300 shadow-xl shadow-blue-600/30 flex items-center space-x-3"
                  magneticStrength={0.2}
                >
                  <span>Quiero mi sitio web</span>
                  <svg 
                    className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </SmoothMagneticButton>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}