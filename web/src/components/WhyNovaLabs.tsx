"use client";

import FadeUpWords from './FadeUpWords';

export default function WhyNovaLabs() {
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Card 1 */}
          <div className="bg-[#1A1A1A] rounded-[24px] p-8 lg:p-12 relative overflow-hidden min-h-[280px] flex flex-col">
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
              <div className="text-[120px] lg:text-[140px] font-black bg-gradient-to-b from-[#0147FF] to-[#0147FF38] bg-clip-text text-transparent leading-none transform scale-125 translate-x-4 translate-y-16">
                01
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-[#1A1A1A] rounded-[24px] p-8 lg:p-12 relative overflow-hidden min-h-[280px] flex flex-col">
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
              <div className="text-[120px] lg:text-[140px] font-black bg-gradient-to-b from-[#0147FF] to-[#0147FF38] bg-clip-text text-transparent leading-none transform scale-125 translate-x-4 translate-y-16">
                02
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-[#1A1A1A] rounded-[24px] p-8 lg:p-12 relative overflow-hidden min-h-[280px] flex flex-col">
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
              <div className="text-[120px] lg:text-[140px] font-black bg-gradient-to-b from-[#0147FF] to-[#0147FF38] bg-clip-text text-transparent leading-none transform scale-125 translate-x-4 translate-y-16">
                03
              </div>
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-[#1A1A1A] rounded-[24px] p-8 lg:p-12 relative overflow-hidden min-h-[280px] flex flex-col">
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
              <div className="text-[120px] lg:text-[140px] font-black bg-gradient-to-b from-[#0147FF] to-[#0147FF38] bg-clip-text text-transparent leading-none transform scale-125 translate-x-4 translate-y-16">
                04
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}