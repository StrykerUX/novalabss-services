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

export default function Hero() {
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
    if (typeof window === 'undefined' || !mounted) return;

    // Parallax effect for rocket
    if (rocketRef.current) {
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

    // Floating particles animation - diagonal movement
    if (particlesRef.current) {
      const particles = particlesRef.current.children;
      Array.from(particles).forEach((particle, index) => {
        gsap.to(particle, {
          x: -100,
          y: 80,
          rotation: 45,
          opacity: 0.1,
          duration: `random(8, 12)`,
          repeat: -1,
          ease: "none",
          delay: index * 1.5,
          onComplete: () => {
            gsap.set(particle, { x: 100, y: -80, opacity: 0.2 });
          }
        });
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [mounted]);
  return (
    <section className="min-h-screen">
      <div className="w-full max-w-[1780px] mx-auto px-[5%] mt-6">
        <div className="bg-[#1A1A1A] rounded-[32px] relative overflow-hidden h-[85vh] flex flex-col justify-start">
          
          {/* Infinity shape as background */}
          <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
            <div className="relative">
              <div className="w-96 h-48 bg-gradient-to-r from-blue-600/30 to-transparent rounded-full transform rotate-45"></div>
              <div className="absolute top-0 left-0 w-96 h-48 bg-gradient-to-l from-blue-600/30 to-transparent rounded-full transform -rotate-45"></div>
            </div>
          </div>

          {/* Floating particles */}
          {mounted && particlePositions.length > 0 && (
            <div ref={particlesRef} className="absolute inset-0 pointer-events-none">
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
            <div ref={rocketRef} className="absolute top-[60%] right-0 transform -translate-y-1/2 pointer-events-none">
              <DotLottieReact
                src="/animations/rocket-v1.lottie"
                loop
                autoplay
                className="w-80 h-80 lg:w-[510px] lg:h-[510px] scale-95 opacity-40"
              />
            </div>
          )}
          
          {/* Main content */}
          <div className="flex flex-col justify-between p-8 lg:p-12 h-full relative z-10">
            {/* Title, subtitle and badges at top */}
            <div className="max-w-4xl xl:max-w-5xl space-y-12">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-white leading-[100%] tracking-tight">
                MIENTRAS TU COMPETENCIA LUCHA CON TECNOLOGÍA,
                <br />
                <span className="text-blue-400">TÚ YA ESTÁS VENDIENDO</span>
              </h1>
              
              <p className="text-base lg:text-2xl text-white/90 leading-relaxed font-medium max-w-3xl">
                Tu ventaja competitiva: tecnología profesional sin complicaciones ni dolores de cabeza
              </p>
              
              <div className="flex flex-wrap gap-3">
                <AnimatedBadge 
                  className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-sm font-medium text-white"
                  pulseDelay={0}
                >
                  Plan desde $999 MXN/bimestre
                </AnimatedBadge>
                <AnimatedBadge 
                  className="bg-blue-600/20 backdrop-blur-sm border border-blue-400/30 rounded-full px-4 py-2 text-sm font-medium text-blue-200"
                  pulseDelay={0.5}
                >
                  Tecnología enterprise
                </AnimatedBadge>
                <AnimatedBadge 
                  className="bg-green-600/20 backdrop-blur-sm border border-green-400/30 rounded-full px-4 py-2 text-sm font-medium text-green-200"
                  pulseDelay={1}
                >
                  Solo queda vender
                </AnimatedBadge>
              </div>
            </div>
            
            {/* Button at bottom */}
            <div className="max-w-4xl mb-8">
              <SmoothMagneticButton 
                className="text-white px-8 py-4 font-space-grotesk font-semibold text-lg hover:shadow-2xl hover:shadow-blue-500/40 transition-shadow duration-300 shadow-xl shadow-blue-600/30 flex items-center space-x-3"
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}