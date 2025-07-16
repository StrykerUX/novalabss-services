"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  delay: number;
  duration: number;
}

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const cursorRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    
    // Generate particles for success effect
    const generateParticles = () => {
      const newParticles: Particle[] = [];
      for (let i = 0; i < 12; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 3 + 2,
          opacity: Math.random() * 0.4 + 0.2,
          delay: Math.random() * 2,
          duration: Math.random() * 3 + 2
        });
      }
      setParticles(newParticles);
    };
    
    generateParticles();
  }, []);

  const testimonials = [
    {
      category: "RESULTADOS INCREÍBLES",
      quote: "NovaLabs transformó completamente nuestro negocio. En solo 2 meses triplicamos nuestras reservas online y ahora somos el restaurante más buscado de la zona.",
      name: "María González",
      role: "Propietaria, Restaurante La Cantina",
      image: "/imgs/client1.jpg"
    },
    {
      category: "LA MEJOR INVERSIÓN",
      quote: "Increíble equipo, resultados de primer nivel y la mejor atención al cliente. Todo en un solo lugar, justo lo que necesitábamos para crecer.",
      name: "Carlos Mendoza",
      role: "CEO, Tienda Artesanal Maya",
      image: "/imgs/client2.jpg"
    },
    {
      category: "OPORTUNIDADES SIN LÍMITES",
      quote: "Desde talleres prácticos hasta estrategias visionarias, NovaLabs es imprescindible para cualquier emprendedor que quiera destacar en el mercado digital.",
      name: "Ana Rodríguez",
      role: "Directora, Consultora Legal Pro",
      image: "/imgs/client3.jpg"
    },
    {
      category: "CRECIMIENTO EXPONENCIAL",
      quote: "En 3 meses pasamos de 0 a ser líderes en nuestro sector. El ROI ha sido espectacular y el soporte técnico es excepcional.",
      name: "Roberto Silva",
      role: "Fundador, TechStart Solutions",
      image: "/imgs/client4.jpg"
    },
    {
      category: "RESULTADOS GARANTIZADOS",
      quote: "No solo cumplieron con los tiempos prometidos, sino que superaron nuestras expectativas. Ahora generamos 5x más leads calificados.",
      name: "Laura Morales",
      role: "CMO, Innovate Marketing",
      image: "/imgs/client5.jpg"
    }
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
    
    // Trigger particle burst on testimonial change
    if (particlesRef.current) {
      const particleElements = particlesRef.current.children;
      
      // Reset particles
      gsap.set(particleElements, {
        opacity: 0,
        scale: 0.5,
        x: 0,
        y: 0
      });
      
      // Animate particles
      gsap.to(particleElements, {
        opacity: 0.6,
        scale: 1,
        x: () => (Math.random() - 0.5) * 200,
        y: () => (Math.random() - 0.5) * 200,
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.05,
        onComplete: () => {
          gsap.to(particleElements, {
            opacity: 0,
            scale: 0.3,
            duration: 1,
            ease: "power2.in"
          });
        }
      });
    }
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
    
    // Trigger particle burst on testimonial change
    if (particlesRef.current) {
      const particleElements = particlesRef.current.children;
      
      // Reset particles
      gsap.set(particleElements, {
        opacity: 0,
        scale: 0.5,
        x: 0,
        y: 0
      });
      
      // Animate particles
      gsap.to(particleElements, {
        opacity: 0.6,
        scale: 1,
        x: () => (Math.random() - 0.5) * 200,
        y: () => (Math.random() - 0.5) * 200,
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.05,
        onComplete: () => {
          gsap.to(particleElements, {
            opacity: 0,
            scale: 0.3,
            duration: 1,
            ease: "power2.in"
          });
        }
      });
    }
  };

  const getVisibleTestimonials = () => {
    const visible = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % testimonials.length;
      visible.push(testimonials[index]);
    }
    return visible;
  };

  const visibleTestimonials = getVisibleTestimonials();

  // Custom cursor effect
  useEffect(() => {
    if (!mounted) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      if (cursorRef.current && sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        gsap.to(cursorRef.current, {
          x: x - 15,
          y: y - 15,
          duration: 0.3,
          ease: "power2.out"
        });
      }
    };

    const section = sectionRef.current;
    if (section) {
      section.addEventListener('mousemove', handleMouseMove);
      return () => section.removeEventListener('mousemove', handleMouseMove);
    }
  }, [mounted]);

  return (
    <section className="py-20">
      <div className="w-full max-w-[1780px] mx-auto px-[5%]">
        {/* Header with title and navigation */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center mb-16 gap-6">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black bg-gradient-to-b from-white to-white/10 bg-clip-text text-transparent leading-[100%] tracking-tight">
            LO QUE DICEN NUESTROS CLIENTES
          </h2>
          
          {/* Navigation arrows */}
          <div className="flex gap-4 lg:flex-shrink-0">
            <button 
              onClick={prevTestimonial}
              className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:border-white/40 transition-all duration-300 hover:bg-white/5"
            >
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </button>
            <button 
              onClick={nextTestimonial}
              className="w-12 h-12 rounded-full bg-gradient-to-r from-[#0147FF] to-[#0147FF80] flex items-center justify-center hover:shadow-lg hover:shadow-blue-600/30 transition-all duration-300"
            >
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>

        {/* Testimonials carousel */}
        <div ref={sectionRef} className="relative overflow-hidden">
          {/* Floating particles for success effect */}
          {mounted && particles.length > 0 && (
            <div ref={particlesRef} className="absolute inset-0 pointer-events-none z-10">
              {particles.map((particle) => (
                <div
                  key={particle.id}
                  className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-0"
                  style={{
                    left: `${particle.x}%`,
                    top: `${particle.y}%`,
                    width: `${particle.size}px`,
                    height: `${particle.size}px`,
                    boxShadow: '0 0 6px rgba(1, 71, 255, 0.6)'
                  }}
                />
              ))}
            </div>
          )}
          {/* Custom cursor - only show on mounted */}
          {mounted && (
            <div
              ref={cursorRef}
              className="absolute w-8 h-8 bg-[#0147FF]/30 rounded-full pointer-events-none z-50 mix-blend-difference opacity-0 transition-opacity duration-300"
              style={{ transform: 'translate(-50%, -50%)' }}
            />
          )}
          {/* Desktop version - 3 cards */}
          <div 
            className="hidden lg:flex transition-transform duration-700 ease-out"
            style={{ transform: `translateX(calc(-${currentIndex * (100 / 3)}% + ${100 / 3}%))` }}
          >
            {testimonials.map((testimonial, index) => {
              // Calculate position relative to center (currentIndex)
              let relativePosition = index - currentIndex;
              
              // Normalize to handle wrap-around
              if (relativePosition > testimonials.length / 2) {
                relativePosition -= testimonials.length;
              } else if (relativePosition < -testimonials.length / 2) {
                relativePosition += testimonials.length;
              }
              
              let cardStyle = "";
              let opacity = "";
              
              // Determine card style based on relative position
              if (relativePosition === -1) {
                // Left card - Dark
                cardStyle = "bg-[#1A1A1A] border border-white/10";
                opacity = "opacity-100";
              } else if (relativePosition === 0) {
                // Center card - Blue (highlighted) - Transparent border to maintain spacing
                cardStyle = "bg-gradient-to-br from-[#0147FF] to-[#0147FF80] border border-transparent";
                opacity = "opacity-100";
              } else if (relativePosition === 1) {
                // Right card - Light
                cardStyle = "bg-white/10 backdrop-blur-sm border border-white/20";
                opacity = "opacity-100";
              } else {
                // Hidden cards - Keep consistent background
                cardStyle = "bg-[#1A1A1A] border border-white/10";
                opacity = "opacity-50";
              }

              return (
                <div 
                  key={index}
                  className={`w-1/3 flex-shrink-0 px-3`}
                >
                  <div className={`${cardStyle} ${opacity} rounded-[48px] p-8 lg:p-10 relative overflow-hidden min-h-[400px] flex flex-col transition-all duration-700 hover:shadow-xl hover:shadow-blue-500/20`}>
                    <div className="relative z-10 flex-1 flex flex-col">
                      {/* Category */}
                      <h3 className={`text-sm font-semibold mb-6 tracking-wider transition-all duration-700 ${
                        relativePosition === 0 ? 'text-white/80' : 'text-white/60'
                      }`}>
                        {testimonial.category}
                      </h3>
                      
                      {/* Quote */}
                      <p className={`text-white/90 text-lg leading-relaxed mb-8 flex-1 transition-all duration-700 ${
                        relativePosition === 0 
                          ? 'text-white font-medium' 
                          : ''
                      }`}>
                        "{testimonial.quote}"
                      </p>
                      
                      {/* Client info */}
                      <div className="flex items-center">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 transition-all duration-700 ${
                          relativePosition === -1 
                            ? 'bg-gradient-to-br from-gray-400 to-gray-600' 
                            : 'bg-white/20'
                        }`}>
                          <span className="text-white text-sm font-bold">
                            {testimonial.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <p className="text-white font-semibold text-base">{testimonial.name}</p>
                          <p className={`text-sm transition-all duration-700 ${
                            relativePosition === 0 ? 'text-white/80' : 'text-white/60'
                          }`}>
                            {testimonial.role}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mobile version - Single card */}
          <div 
            className="lg:hidden flex transition-transform duration-700 ease-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="w-full flex-shrink-0 px-4"
              >
                <div className="bg-gradient-to-br from-[#0147FF] to-[#0147FF80] border border-transparent rounded-[48px] p-8 relative overflow-hidden min-h-[400px] flex flex-col hover:shadow-xl hover:shadow-blue-500/20 transition-shadow duration-300">
                  <div className="relative z-10 flex-1 flex flex-col">
                    {/* Category */}
                    <h3 className="text-white/80 text-sm font-semibold mb-6 tracking-wider">
                      {testimonial.category}
                    </h3>
                    
                    {/* Quote */}
                    <p className="text-white text-lg leading-relaxed mb-8 flex-1 font-medium">
                      "{testimonial.quote}"
                    </p>
                    
                    {/* Client info */}
                    <div className="flex items-center">
                      <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mr-4">
                        <span className="text-white text-sm font-bold">
                          {testimonial.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <p className="text-white font-semibold text-base">{testimonial.name}</p>
                        <p className="text-white/80 text-sm">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots indicator */}
        <div className="flex justify-center mt-12 gap-2">
          {Array.from({ length: testimonials.length }, (_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentIndex(index);
                // Trigger particle burst on manual navigation
                if (particlesRef.current) {
                  const particleElements = particlesRef.current.children;
                  
                  // Reset particles
                  gsap.set(particleElements, {
                    opacity: 0,
                    scale: 0.5,
                    x: 0,
                    y: 0
                  });
                  
                  // Animate particles
                  gsap.to(particleElements, {
                    opacity: 0.6,
                    scale: 1,
                    x: () => (Math.random() - 0.5) * 200,
                    y: () => (Math.random() - 0.5) * 200,
                    duration: 0.8,
                    ease: "power2.out",
                    stagger: 0.05,
                    onComplete: () => {
                      gsap.to(particleElements, {
                        opacity: 0,
                        scale: 0.3,
                        duration: 1,
                        ease: "power2.in"
                      });
                    }
                  });
                }
              }}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-[#0147FF] w-8' 
                  : 'bg-white/30 hover:bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}