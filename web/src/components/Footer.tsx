"use client";

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

export default function Footer() {
  const socialRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (socialRef.current) {
      const socialIcons = socialRef.current.children;
      
      Array.from(socialIcons).forEach((icon) => {
        const handleMouseEnter = () => {
          gsap.to(icon, {
            scale: 1.2,
            rotation: 15,
            duration: 0.3,
            ease: "back.out(1.7)"
          });
        };

        const handleMouseLeave = () => {
          gsap.to(icon, {
            scale: 1,
            rotation: 0,
            duration: 0.3,
            ease: "power2.out"
          });
        };

        icon.addEventListener('mouseenter', handleMouseEnter);
        icon.addEventListener('mouseleave', handleMouseLeave);
      });
    }
  }, []);

  return (
    <footer className="bg-[#0A0A0A] border-t border-white/5">
      <div className="w-full max-w-[1780px] mx-auto px-[5%] py-16">
        
        {/* Simplified footer content */}
        <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start gap-8 mb-12">
          
          {/* Left side - Branding */}
          <div className="text-center lg:text-left space-y-4">
            <h3 className="text-2xl font-black text-white font-space-grotesk">
              NovaLabs
            </h3>
            <p className="text-[#0147FF] text-sm font-semibold">
              El futuro del marketing digital mexicano
            </p>
            <p className="text-white/60 text-sm leading-relaxed max-w-md">
              Sitios web profesionales en 72 horas. Sin complicaciones técnicas, solo resultados.
            </p>
          </div>

          {/* Center Left - Plans */}
          <div className="space-y-3 text-center lg:text-left">
            <h4 className="text-white font-bold text-sm tracking-wider uppercase">
              Planes
            </h4>
            <nav className="space-y-2">
              <a href="#" className="block text-white/60 hover:text-[#0147FF] text-sm transition-colors duration-300 relative group">
                Plan Rocket
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[#0147FF] transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a href="#" className="block text-white/60 hover:text-[#0147FF] text-sm transition-colors duration-300 relative group">
                Plan Galaxy
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[#0147FF] transition-all duration-300 group-hover:w-full"></span>
              </a>
            </nav>
          </div>
          
          {/* Center Right - Contact */}
          <div className="space-y-3 text-center lg:text-left">
            <h4 className="text-white font-bold text-sm tracking-wider uppercase">
              Contacto
            </h4>
            <div className="space-y-2">
              <p className="text-white/90 text-sm">hola@novalabss.com</p>
              <p className="text-white/60 text-xs">Lun-Vie 10:00 AM - 8:00 PM</p>
            </div>
          </div>

          {/* Right side - Social media */}
          <div className="space-y-3 text-center lg:text-right">
            <p className="text-white/80 text-sm font-medium">Síguenos</p>
            <div ref={socialRef} className="flex justify-center lg:justify-end space-x-3">
              {/* LinkedIn */}
              <a 
                href="#" 
                className="w-8 h-8 bg-white/10 hover:bg-[#0147FF]/20 border border-white/20 hover:border-[#0147FF]/40 rounded-[12px] flex items-center justify-center transition-all duration-300"
              >
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              
              {/* Instagram */}
              <a 
                href="#" 
                className="w-8 h-8 bg-white/10 hover:bg-[#0147FF]/20 border border-white/20 hover:border-[#0147FF]/40 rounded-[12px] flex items-center justify-center transition-all duration-300"
              >
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom section */}
        <div className="border-t border-white/5 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
            
            {/* Copyright and made in Mexico */}
            <div className="flex flex-col sm:flex-row items-center gap-4 text-center lg:text-left">
              <p className="text-white/60 text-xs">
                © 2024 NovaLabs. Todos los derechos reservados.
              </p>
              <p className="text-white/60 text-xs flex items-center gap-1">
                Hecho con <span className="text-red-500">❤️</span> en México
              </p>
            </div>

            {/* Legal links */}
            <div className="flex items-center gap-6">
              <a href="#" className="text-white/60 hover:text-[#0147FF] text-xs transition-colors duration-300">
                Términos
              </a>
              <a href="#" className="text-white/60 hover:text-[#0147FF] text-xs transition-colors duration-300">
                Privacidad
              </a>
              <a href="#" className="text-white/60 hover:text-[#0147FF] text-xs transition-colors duration-300">
                Cookies
              </a>
            </div>

          </div>
        </div>

      </div>
    </footer>
  );
}