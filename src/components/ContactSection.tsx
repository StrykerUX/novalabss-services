"use client";

import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import AnimatedInput from './AnimatedInput';
import SmoothMagneticButton from './SmoothMagneticButton';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formData);
  };

  return (
    <section id="contacto" className="py-20">
      <div className="w-full max-w-[1780px] mx-auto px-[5%]">
        {/* Main contact card */}
        <div className="bg-[#1A1A1A] rounded-[48px] relative overflow-hidden border border-white/10 p-8 lg:p-16">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            
            {/* Left side - Contact information */}
            <div className="space-y-12">
              {/* Main title and description */}
              <div className="space-y-6">
                <h2 className="text-4xl lg:text-5xl font-black text-white leading-[110%] tracking-tight">
                  Estamos Aquí Para
                  <br />
                  Conectar Y
                  <br />
                  <span className="bg-gradient-to-r from-[#0147FF] to-[#0147FF80] bg-clip-text text-transparent">
                    Ayudarte
                  </span>
                </h2>
                <p className="text-white/80 text-base lg:text-lg leading-relaxed max-w-md">
                  ¿Tienes preguntas sobre nuestros servicios? ¿Necesitas ayuda para elegir el plan perfecto? 
                  Nuestro equipo está listo para impulsarte al éxito.
                </p>
              </div>

              {/* Contact information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-8">
                
                {/* Contact Us */}
                <div className="space-y-3">
                  <h3 className="text-white font-bold text-sm tracking-wider uppercase">
                    CONTÁCTANOS
                  </h3>
                  <div className="space-y-2">
                    <p className="text-white/90 font-medium">+52 55 1234 5678</p>
                    <p className="text-white/70 text-sm">Lunes a Viernes, 10:00 AM - 8:00 PM</p>
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-3">
                  <h3 className="text-white font-bold text-sm tracking-wider uppercase">
                    EMAIL
                  </h3>
                  <div className="space-y-2">
                    <p className="text-white/90 font-medium">hola@novalabss.com</p>
                    <p className="text-white/70 text-sm">Respuesta garantizada en 24 horas</p>
                  </div>
                </div>

                {/* Business Hours */}
                <div className="space-y-3">
                  <h3 className="text-white font-bold text-sm tracking-wider uppercase">
                    HORARIO DE ATENCIÓN
                  </h3>
                  <div className="space-y-2">
                    <p className="text-white/90 font-medium">Ciudad de México, México</p>
                    <p className="text-white/70 text-sm">Zona horaria GMT-6</p>
                  </div>
                </div>

                {/* Follow Us */}
                <div className="space-y-3">
                  <h3 className="text-white font-bold text-sm tracking-wider uppercase">
                    SÍGUENOS
                  </h3>
                  <div className="flex space-x-4">
                    {/* LinkedIn */}
                    <a 
                      href="#" 
                      className="w-10 h-10 bg-white/10 hover:bg-[#0147FF]/20 border border-white/20 hover:border-[#0147FF]/40 rounded-full flex items-center justify-center transition-all duration-300"
                    >
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </a>
                    
                    {/* Instagram */}
                    <a 
                      href="#" 
                      className="w-10 h-10 bg-white/10 hover:bg-[#0147FF]/20 border border-white/20 hover:border-[#0147FF]/40 rounded-full flex items-center justify-center transition-all duration-300"
                    >
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.621 5.367 11.987 11.988 11.987s11.987-5.366 11.987-11.987C24.004 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.611-3.197-1.559-.187-.238-.291-.537-.291-.852 0-.827.673-1.5 1.5-1.5.415 0 .793.169 1.061.441.268-.272.646-.441 1.061-.441.827 0 1.5.673 1.5 1.5 0 .315-.104.614-.291.852-.749.948-1.9 1.559-3.197 1.559z"/>
                      </svg>
                    </a>
                    
                    {/* Twitter/X */}
                    <a 
                      href="#" 
                      className="w-10 h-10 bg-white/10 hover:bg-[#0147FF]/20 border border-white/20 hover:border-[#0147FF]/40 rounded-full flex items-center justify-center transition-all duration-300"
                    >
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                      </svg>
                    </a>
                    
                    {/* YouTube */}
                    <a 
                      href="#" 
                      className="w-10 h-10 bg-white/10 hover:bg-[#0147FF]/20 border border-white/20 hover:border-[#0147FF]/40 rounded-full flex items-center justify-center transition-all duration-300"
                    >
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                      </svg>
                    </a>
                  </div>
                </div>

              </div>
            </div>

            {/* Right side - Contact form */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-[24px] p-8 lg:p-10">
              <div className="space-y-6">
                {/* Form header */}
                <div className="space-y-3">
                  <h3 className="text-white font-bold text-lg tracking-wide uppercase">
                    PONTE EN CONTACTO
                  </h3>
                  <p className="text-white/70 text-sm leading-relaxed">
                    Háblanos sobre tu proyecto, dudas sobre planes o cualquier consulta. 
                    Estamos aquí para ayudarte.
                  </p>
                </div>

                {/* Contact form */}
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Name field */}
                  <AnimatedInput
                    type="text"
                    name="name"
                    placeholder="Nombre"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />

                  {/* Email field */}
                  <AnimatedInput
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />

                  {/* Subject field */}
                  <AnimatedInput
                    type="text"
                    name="subject"
                    placeholder="Asunto"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                  />

                  {/* Message field */}
                  <AnimatedInput
                    type="text"
                    name="message"
                    placeholder="Mensaje"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    required
                  />

                  {/* Submit button */}
                  <div className="pt-4">
                    <SmoothMagneticButton
                      className="w-full text-white px-8 py-4 font-semibold text-base hover:shadow-2xl hover:shadow-blue-500/40 transition-shadow duration-300 shadow-xl shadow-blue-600/30 flex items-center justify-center space-x-3"
                      magneticStrength={0.15}
                      onClick={handleSubmit}
                    >
                      <span>Enviar mensaje</span>
                      <svg 
                        className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    </SmoothMagneticButton>
                  </div>
                </form>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}