"use client";

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

interface GalaxyFormationProps {
  onComplete?: () => void;
  duration?: number;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  size: number;
  opacity: number;
  delay: number;
}

export default function GalaxyFormation({ onComplete, duration = 4000 }: GalaxyFormationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const [isComplete, setIsComplete] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Generate particles on client side only
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    
    const newParticles: Particle[] = [];
    
    // Círculo incompleto (75% - empezando desde arriba, sentido horario)
    const logoPoints = [];
    
    // Generar círculo de 75% (270 grados) empezando desde arriba (-90°)
    const radius = 80;
    const startAngle = -Math.PI / 2; // Empezar desde arriba
    const endAngle = startAngle + (Math.PI * 2 * 0.75); // 75% del círculo
    const numPoints = 45; // Número de puntos en el arco
    
    for (let i = 0; i < numPoints; i++) {
      const angle = startAngle + (endAngle - startAngle) * (i / (numPoints - 1));
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      logoPoints.push({ x, y });
    }
    
    // Create particles following logo contour
    logoPoints.forEach((point, i) => {
      // Starting positions (scattered around screen)
      const startX = Math.random() * window.innerWidth;
      const startY = Math.random() * window.innerHeight;
      
      // Target positions (logo contour)
      const targetX = centerX + point.x;
      const targetY = centerY + point.y;
      
      newParticles.push({
        id: i,
        x: startX,
        y: startY,
        targetX,
        targetY,
        size: Math.random() * 4 + 6, // Empezar grandes (6-10px)
        opacity: Math.random() * 0.6 + 0.4,
        delay: i * 0.02 // Faster delay
      });
    });
    
    setParticles(newParticles);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !containerRef.current || particles.length === 0) return;

    const container = containerRef.current;
    const logo = logoRef.current;
    
    // Initial setup
    gsap.set(container, { opacity: 1 });
    gsap.set(logo, { opacity: 0, scale: 0, rotation: -180 });

    // Timeline for galaxy formation
    const tl = gsap.timeline();

    // Phase 1: Particles converge to form 75% circle while shrinking (1s) - MAS RAPIDO
    particles.forEach((particle, index) => {
      const particleEl = container.querySelector(`[data-particle="${index}"]`) as HTMLElement;
      if (particleEl) {
        // Set initial state - large particles
        gsap.set(particleEl, {
          x: particle.x,
          y: particle.y,
          opacity: particle.opacity,
          scale: 1 // Start at full size (already large from CSS)
        });

        // Move to target position while shrinking
        tl.to(particleEl, {
          x: particle.targetX,
          y: particle.targetY,
          scale: 0.3, // Shrink to 30% of original size
          duration: 1.0, // Mas rapido
          ease: "power2.inOut",
          delay: particle.delay
        }, 0);
      }
    });

    // Phase 2: Particles pulse to define the arc (0.5s) - MAS RAPIDO
    tl.to('[data-particle]', {
      scale: 0.4,
      duration: 0.25,
      ease: "power2.inOut",
      yoyo: true,
      repeat: 1
    }, 1.0)

    // Phase 3: Explosive expansion to reveal logo (0.4s) - MAS RAPIDO
    .to('[data-particle]', {
      scale: 4, // Explosive expansion
      opacity: 0.2,
      duration: 0.2,
      ease: "power2.out",
      stagger: {
        each: 0.008,
        from: "center"
      }
    }, 1.5)
    .to('[data-particle]', {
      scale: 8, // Continue expanding
      opacity: 0,
      duration: 0.2,
      ease: "power2.out",
      stagger: {
        each: 0.008,
        from: "center"
      }
    }, 1.7)

    // Phase 4: Logo materializes from center (0.8s)
    .to(logo, {
      opacity: 1,
      scale: 1,
      rotation: 0,
      duration: 0.8,
      ease: "back.out(1.7)"
    }, 1.8)

    // Phase 5: Logo glow effect (0.6s) - MAS TIEMPO
    .to(logo, {
      filter: "drop-shadow(0 0 30px rgba(1, 71, 255, 0.8))",
      duration: 0.6,
      ease: "power2.out"
    }, 2.4)

    // Phase 6: Logo visible longer, then fade out (0.8s) - MAS TIEMPO PARA LOGO
    .to(logo, {
      scale: 1.05,
      duration: 0.4,
      ease: "power2.inOut",
      yoyo: true,
      repeat: 1
    }, 3.0)
    .to(container, {
      opacity: 0,
      duration: 0.4,
      ease: "power2.out",
      onComplete: () => {
        setIsComplete(true);
        if (onComplete) {
          onComplete();
        }
      }
    }, 3.6);

    return () => {
      tl.kill();
    };
  }, [mounted, particles, onComplete]);

  if (!mounted) return null;

  return (
    <div 
      ref={containerRef}
      className={`fixed inset-0 z-[9999] bg-black ${isComplete ? 'pointer-events-none' : ''}`}
    >
      {/* Background galaxy effect */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-radial from-blue-900/20 via-black to-black"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(1,71,255,0.1),transparent_70%)]"></div>
      </div>

      {/* Particles */}
      {particles.map((particle, index) => (
        <div
          key={particle.id}
          data-particle={index}
          className="absolute rounded-full bg-blue-400"
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            left: '0px',
            top: '0px',
            boxShadow: '0 0 10px rgba(1, 71, 255, 0.6)'
          }}
        />
      ))}

      {/* Logo in center */}
      <div 
        ref={logoRef}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      >
        <div className="relative">
          {/* NovaLabs Logo */}
          <svg 
            width="120" 
            height="120" 
            viewBox="0 0 432 432" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-xl"
          >
            <rect x="237.073" y="326.634" width="105.366" height="42.1463" rx="21.0731" transform="rotate(90 237.073 326.634)" fill="#0147FF"/>
            <rect x="105.366" y="237.073" width="105.366" height="42.1463" rx="21.0732" transform="rotate(180 105.366 237.073)" fill="#0147FF"/>
            <rect x="279.329" y="122.869" width="105.366" height="42.1463" rx="21.0732" transform="rotate(-45 279.329 122.869)" fill="#0147FF"/>
            <rect x="326.634" y="194.927" width="105.366" height="42.1463" rx="21.0732" fill="#0147FF"/>
            <rect x="148.946" y="305.405" width="63.2195" height="31.6097" rx="15.8049" transform="rotate(135 148.946 305.405)" fill="#0147FF"/>
            <path d="M137.77 137.769C129.54 129.54 116.034 129.46 109.22 138.896C94.2908 159.572 85.5921 184.276 84.4272 210.054C82.9432 242.895 93.7946 275.104 114.849 300.352C135.904 325.599 165.639 342.06 198.212 346.5C230.786 350.94 263.842 343.038 290.885 324.346C317.929 305.655 337.005 277.525 344.364 245.485C351.724 213.445 346.835 179.811 330.659 151.191C314.483 122.572 288.188 101.037 256.943 90.8176C232.417 82.7961 206.232 82.2017 181.614 88.8599C170.379 91.8984 165.68 104.561 170.47 115.169C175.259 125.776 187.756 130.215 199.187 128.031C213.963 125.207 229.329 126.129 243.841 130.876C265.088 137.825 282.968 152.469 293.968 171.93C304.968 191.391 308.292 214.262 303.288 236.05C298.283 257.837 285.312 276.965 266.922 289.675C248.532 302.386 226.054 307.759 203.904 304.74C181.755 301.721 161.534 290.527 147.217 273.359C132.9 256.191 125.521 234.289 126.531 211.957C127.22 196.704 131.788 182.003 139.652 169.18C145.736 159.258 146 145.999 137.77 137.769Z" fill="#0147FF"/>
            <path d="M216 184.39C216.749 184.39 217.493 184.416 218.23 184.467C222.885 184.791 223.902 191.218 223.902 195.884C223.902 202.232 229.048 207.379 235.396 207.379C240.25 207.379 247.022 208.205 247.472 213.039C247.563 214.013 247.609 215.001 247.609 215.999C247.609 233.457 233.457 247.609 216 247.609C198.542 247.609 184.39 233.457 184.39 215.999C184.39 198.541 198.542 184.39 216 184.39Z" fill="#0147FF"/>
          </svg>
        </div>
      </div>

      {/* Loading text */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-center">
        <div className="text-white/60 text-sm font-medium tracking-wider animate-pulse">
          INICIALIZANDO SISTEMA
        </div>
      </div>
    </div>
  );
}