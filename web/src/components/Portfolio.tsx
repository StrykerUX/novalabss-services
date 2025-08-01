"use client";

export default function Portfolio() {
  return (
    <section className="py-20">
      <div className="w-full max-w-[1780px] mx-auto px-[5%]">
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="text-5xl sm:text-5xl lg:text-6xl font-black bg-gradient-to-b from-white to-white/10 bg-clip-text text-transparent leading-[100%] tracking-tight mb-6">
            NUESTROS PROYECTOS
          </h2>
          <p className="text-lg lg:text-xl text-white/80 max-w-4xl mx-auto">
            Resultados reales que hablan por sí solos
          </p>
        </div>

        {/* Asymmetric Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Main Project Card - Left (Large) */}
          <div className="bg-[#1A1A1A] rounded-[48px] p-8 lg:p-12 relative overflow-hidden border border-white/10 min-h-[500px] flex flex-col group">
            {/* Background Image */}
            <div className="absolute inset-0 opacity-30">
              <img 
                src="https://r-storage.novalabss.com/u/20c8ea89-d7a2-4256-b248-eef0d04d6502.png" 
                alt="Proyecto destacado"
                className="w-full h-full object-cover rounded-[48px]"
              />
            </div>
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/[0.01] group-hover:bg-black/40 transition-all duration-300"></div>
            
            <div className="relative z-10 flex-1 flex flex-col">
              {/* Title at top */}
              <h3 className="text-white text-3xl font-black mb-4 font-space-grotesk">
                Elizabeth Achirica - Psicóloga Online
              </h3>

              {/* Description - hidden by default, visible on hover */}
              <p className="text-white/80 text-base leading-relaxed mb-6 flex-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Plataforma profesional para consultas psicológicas online con sistema de citas, videollamadas seguras 
                y herramientas de seguimiento terapéutico. Diseño centrado en la confianza y privacidad del paciente.
              </p>

              {/* Badges at bottom - hidden by default, visible on hover */}
              <div className="flex flex-wrap gap-3 mb-8 mt-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-green-500/20 text-green-300 px-4 py-2 rounded-full text-sm font-semibold">
                  +350% consultas mensuales
                </div>
                <div className="bg-blue-500/20 text-blue-300 px-4 py-2 rounded-full text-sm font-semibold">
                  95% satisfacción pacientes
                </div>
                <div className="bg-purple-500/20 text-purple-300 px-4 py-2 rounded-full text-sm font-semibold">
                  +240% visibilidad online
                </div>
              </div>

              {/* Bottom section with circular button */}
              <div className="flex justify-end">
                <div className="group/btn flex items-center">
                  <span className="text-white text-sm font-medium opacity-0 group-hover/btn:opacity-100 translate-x-4 group-hover/btn:translate-x-0 transition-all duration-300 mr-3">
                    Ver proyecto
                  </span>
                  <button 
                    onClick={() => window.open('https://just-breathe.site/', '_blank')}
                    className="w-12 h-12 bg-gradient-to-r from-[#0147FF] to-[#0147FF80] rounded-full flex items-center justify-center hover:shadow-lg hover:shadow-blue-600/30 transition-all duration-300"
                  >
                    <svg className="w-5 h-5 text-white transition-transform duration-300 group-hover/btn:-rotate-[35deg]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Two smaller cards */}
          <div className="flex flex-col gap-6">
            
            {/* Project 2 - Top Right */}
            <div className="bg-[#1A1A1A] rounded-[48px] p-6 relative overflow-hidden border border-white/10 min-h-[280px] flex flex-col group">
              {/* Background Image */}
              <div className="absolute inset-0 opacity-30">
                <img 
                  src="https://r-storage.novalabss.com/u/0ee6298f-5f35-4f50-98bb-7f9b201b0436.png" 
                  alt="Sonrisa de Oro"
                  className="w-full h-full object-cover rounded-[48px]"
                />
              </div>
              {/* Dark overlay */}
              <div className="absolute inset-0 bg-black/[0.01] group-hover:bg-black/40 transition-all duration-300"></div>
              
              <div className="relative z-10 flex-1 flex flex-col">
                {/* Title at top */}
                <h3 className="text-white text-3xl font-black mb-3 font-space-grotesk">
                  Sonrisa de Oro
                </h3>

                {/* Description - hidden by default, visible on hover */}
                <p className="text-white/80 text-sm leading-relaxed mb-4 flex-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Sitio web profesional para clínica dental con servicios, promociones, sistema de citas y galería de casos de éxito.
                </p>

                {/* Badges at bottom - hidden by default, visible on hover */}
                <div className="flex flex-wrap gap-3 mb-6 mt-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-blue-500/20 text-blue-300 px-4 py-2 rounded-full text-sm font-semibold">
                    +75% nuevos pacientes
                  </div>
                  <div className="bg-green-500/20 text-green-300 px-4 py-2 rounded-full text-sm font-semibold">
                    +120% citas online
                  </div>
                  <div className="bg-yellow-500/20 text-yellow-300 px-4 py-2 rounded-full text-sm font-semibold">
                    SEO dental local
                  </div>
                </div>

                {/* Bottom section with circular button */}
                <div className="flex justify-end">
                  <div className="group/btn flex items-center">
                    <span className="text-white text-sm font-medium opacity-0 group-hover/btn:opacity-100 translate-x-4 group-hover/btn:translate-x-0 transition-all duration-300 mr-3">
                      Ver proyecto
                    </span>
                    <button 
                      onClick={() => window.open('https://sonrisadeoro.novalabss.com/', '_blank')}
                      className="w-10 h-10 bg-gradient-to-r from-[#0147FF] to-[#0147FF80] rounded-full flex items-center justify-center hover:shadow-lg hover:shadow-blue-600/30 transition-all duration-300"
                    >
                      <svg className="w-4 h-4 text-white transition-transform duration-300 group-hover/btn:-rotate-[35deg]" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Project 3 - Bottom Right */}
            <div className="bg-[#1A1A1A] rounded-[48px] p-6 relative overflow-hidden border border-white/10 min-h-[280px] flex flex-col group">
              {/* Background Image */}
              <div className="absolute inset-0 opacity-30">
                <img 
                  src="https://r-storage.novalabss.com/u/0191341d-f6b8-41b1-8ea9-91c73b5121e5.png" 
                  alt="La Cocina de María"
                  className="w-full h-full object-cover rounded-[48px]"
                />
              </div>
              {/* Dark overlay */}
              <div className="absolute inset-0 bg-black/[0.01] group-hover:bg-black/40 transition-all duration-300"></div>
              
              <div className="relative z-10 flex-1 flex flex-col">
                {/* Title at top */}
                <h3 className="text-white text-3xl font-black mb-3 font-space-grotesk">
                  La Cocina de María
                </h3>

                {/* Description - hidden by default, visible on hover */}
                <p className="text-white/80 text-sm leading-relaxed mb-4 flex-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Sitio web profesional para restaurante mexicano familiar con menú interactivo, galería de platillos y información de ubicación y contacto.
                </p>

                {/* Badges at bottom - hidden by default, visible on hover */}
                <div className="flex flex-wrap gap-3 mb-6 mt-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-green-500/20 text-green-300 px-4 py-2 rounded-full text-sm font-semibold">
                    +90% visitas web
                  </div>
                  <div className="bg-orange-500/20 text-orange-300 px-4 py-2 rounded-full text-sm font-semibold">
                    +45% clientes nuevos
                  </div>
                  <div className="bg-red-500/20 text-red-300 px-4 py-2 rounded-full text-sm font-semibold">
                    SEO optimizado
                  </div>
                </div>

                {/* Bottom section with circular button */}
                <div className="flex justify-end">
                  <div className="group/btn flex items-center">
                    <span className="text-white text-sm font-medium opacity-0 group-hover/btn:opacity-100 translate-x-4 group-hover/btn:translate-x-0 transition-all duration-300 mr-3">
                      Ver proyecto
                    </span>
                    <button 
                      onClick={() => window.open('https://la-cocina-de-maria.novalabss.com/', '_blank')}
                      className="w-10 h-10 bg-gradient-to-r from-[#0147FF] to-[#0147FF80] rounded-full flex items-center justify-center hover:shadow-lg hover:shadow-blue-600/30 transition-all duration-300"
                    >
                      <svg className="w-4 h-4 text-white transition-transform duration-300 group-hover/btn:-rotate-[35deg]" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}