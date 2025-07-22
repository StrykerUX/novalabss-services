"use client";

import SmoothMagneticButton from './SmoothMagneticButton';

export default function PricingPlans() {
  const handleDirectCheckout = async (plan: 'rocket' | 'galaxy') => {
    // Crear sesión de Stripe Checkout para hot leads
    try {
      console.log('🚀 Iniciando checkout para plan:', plan)
      
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          plan: plan,
          metadata: {
            source: 'pricing',
            flow: 'direct'
          }
        })
      })
      
      console.log('📡 Response status:', response.status)
      console.log('📡 Response ok:', response.ok)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      console.log('📋 Response data:', data)
      
      if (!data.url) {
        throw new Error('No URL received from API')
      }
      
      console.log('✅ Redirecting to:', data.url)
      // Redirigir a Stripe Checkout
      window.location.href = data.url
    } catch (error) {
      console.error('❌ Error creating checkout session:', error)
      console.error('❌ Error details:', error)
      // Fallback al checkout page si hay error
      window.location.href = `/checkout/${plan}?source=pricing`
    }
  }

  return (
    <section id="planes" className="py-20">
      <div className="w-full max-w-[1780px] mx-auto px-[5%]">
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="text-5xl sm:text-5xl lg:text-6xl font-black bg-gradient-to-b from-white to-white/10 bg-clip-text text-transparent leading-[100%] tracking-tight mb-6">
            ELIGE TU PLAN
          </h2>
        </div>

        {/* Plans grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Plan Rocket - Popular */}
          <div className="bg-gradient-to-br from-[#0147FF]/10 to-[#0147FF]/5 rounded-[48px] p-8 lg:p-12 relative overflow-hidden border-2 border-[#0147FF]/30">
            {/* Popular badge */}
            <div className="absolute top-6 right-6 bg-[#0147FF] text-white px-4 py-2 rounded-full text-sm font-semibold">
              Más popular
            </div>
            
            <div className="relative z-10">
              <h3 className="text-white text-2xl lg:text-3xl font-bold mb-4 tracking-wide">
                PLAN ROCKET
              </h3>
              <p className="text-white/80 text-base mb-8 leading-relaxed">
                El punto de partida inteligente para emprendedores ambiciosos
              </p>
              
              <div className="mb-8">
                <div className="flex items-baseline mb-2">
                  <span className="text-4xl lg:text-5xl font-black text-white">$999</span>
                  <span className="text-white/60 ml-2 text-lg">MXN</span>
                </div>
                <p className="text-white/60 text-sm">Pago bimestral</p>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-center text-white/90">
                  <svg className="w-5 h-5 text-blue-400 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  1 landing page profesional
                </li>
                <li className="flex items-center text-white/90">
                  <svg className="w-5 h-5 text-blue-400 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Entrega garantizada en 72 horas
                </li>
                <li className="flex items-center text-white/90">
                  <svg className="w-5 h-5 text-blue-400 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Optimización para Google
                </li>
                <li className="flex items-center text-white/90">
                  <svg className="w-5 h-5 text-blue-400 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Analytics de rendimiento
                </li>
                <li className="flex items-center text-white/90">
                  <svg className="w-5 h-5 text-blue-400 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Versión optimizada para móvil
                </li>
                <li className="flex items-center text-white/90">
                  <svg className="w-5 h-5 text-blue-400 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Formulario de contacto
                </li>
                <li className="flex items-center text-white/90">
                  <svg className="w-5 h-5 text-blue-400 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Soporte continuo
                </li>
                <li className="flex items-center text-white/90">
                  <svg className="w-5 h-5 text-blue-400 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Hosting seguro incluido
                </li>
              </ul>

              <p className="text-white/40 text-xs mb-6">
                * Dominio (.com) incluido en el segundo pago de suscripción
              </p>

              <SmoothMagneticButton 
                onClick={() => handleDirectCheckout('rocket')}
                className="w-full text-white px-8 py-4 font-semibold text-lg hover:shadow-2xl hover:shadow-blue-500/40 transition-shadow duration-300 shadow-xl shadow-blue-600/30 flex items-center justify-center space-x-3"
                magneticStrength={0.15}
              >
                <span>Comenzar Plan Rocket</span>
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

          {/* Plan Galaxy */}
          <div className="bg-[#1A1A1A] rounded-[48px] p-8 lg:p-12 relative overflow-hidden border border-white/10">
            <div className="relative z-10">
              <h3 className="text-white text-2xl lg:text-3xl font-bold mb-4 tracking-wide">
                PLAN GALAXY
              </h3>
              <p className="text-white/80 text-base mb-8 leading-relaxed">
                Cuando ser bueno ya no es suficiente, necesitas ser extraordinario
              </p>
              
              <div className="mb-8">
                <div className="flex items-baseline mb-2">
                  <span className="text-4xl lg:text-5xl font-black text-white">$1,799</span>
                  <span className="text-white/60 ml-2 text-lg">MXN</span>
                </div>
                <p className="text-white/60 text-sm">Pago bimestral</p>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-center text-white/90">
                  <svg className="w-5 h-5 text-blue-400 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Sitio completo de 3-5 páginas
                </li>
                <li className="flex items-center text-white/90">
                  <svg className="w-5 h-5 text-blue-400 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Entrega garantizada en 96 horas
                </li>
                <li className="flex items-center text-white/90">
                  <svg className="w-5 h-5 text-blue-400 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Optimización avanzada para Google
                </li>
                <li className="flex items-center text-white/90">
                  <svg className="w-5 h-5 text-blue-400 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Analytics de rendimiento avanzado
                </li>
                <li className="flex items-center text-white/90">
                  <svg className="w-5 h-5 text-blue-400 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Versión optimizada para móvil
                </li>
                <li className="flex items-center text-white/90">
                  <svg className="w-5 h-5 text-blue-400 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Múltiples formularios de contacto
                </li>
                <li className="flex items-center text-white/90">
                  <svg className="w-5 h-5 text-blue-400 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Soporte prioritario continuo
                </li>
                <li className="flex items-center text-white/90">
                  <svg className="w-5 h-5 text-blue-400 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Hosting seguro incluido
                </li>
              </ul>

              <p className="text-white/40 text-xs mb-6">
                * Dominio (.com) incluido en el segundo pago de suscripción
              </p>

              <SmoothMagneticButton 
                onClick={() => handleDirectCheckout('galaxy')}
                className="w-full text-white px-8 py-4 font-semibold text-lg hover:shadow-2xl hover:shadow-blue-500/40 transition-shadow duration-300 shadow-xl shadow-blue-600/30 flex items-center justify-center space-x-3"
                magneticStrength={0.15}
              >
                <span>Comenzar Plan Galaxy</span>
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