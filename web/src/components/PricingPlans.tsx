"use client";

import { useState, useEffect } from 'react';
import SmoothMagneticButton from './SmoothMagneticButton';
import { REGIONS, RegionType, detectRegionFromCountry, getRegionInfo, isPromoActive, getCurrentPrice, getRegularPrice } from '@/lib/stripe-products';

export default function PricingPlans() {
  const [detectedRegion, setDetectedRegion] = useState<RegionType | null>(null)
  const [ipCountry, setIpCountry] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  
  // Modal de confirmación
  const [showRegionModal, setShowRegionModal] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<'rocket' | 'galaxy' | null>(null)
  const [selectedRegion, setSelectedRegion] = useState<RegionType | null>(null)
  const [showDiscrepancyMessage, setShowDiscrepancyMessage] = useState(false)

  // Auto-detectar región por IP al cargar
  useEffect(() => {
    const detectRegion = async () => {
      try {
        const response = await fetch('/api/pricing/detect')
        if (response.ok) {
          const data = await response.json()
          const country = data.metadata?.ipCountry
          const detected = detectRegionFromCountry(country)
          
          setIpCountry(country)
          setDetectedRegion(detected)
          setSelectedRegion(detected) // Pre-seleccionar región detectada
        } else {
          // Fallback a internacional si la detección falla
          setDetectedRegion('international')
          setSelectedRegion('international')
        }
      } catch (error) {
        console.error('Error detecting region:', error)
        setDetectedRegion('international')
        setSelectedRegion('international')
      } finally {
        setLoading(false)
      }
    }

    detectRegion()
  }, [])

  const handlePlanClick = (plan: 'rocket' | 'galaxy') => {
    setSelectedPlan(plan)
    setShowRegionModal(true)
  }

  const handleRegionSelect = (regionId: RegionType) => {
    setSelectedRegion(regionId)
    
    // Verificar discrepancia IP vs selección
    if (detectedRegion && regionId !== detectedRegion) {
      setShowDiscrepancyMessage(true)
    } else {
      setShowDiscrepancyMessage(false)
    }
  }

  const handleContinueToCheckout = async () => {
    if (!selectedPlan || !selectedRegion) return

    try {
      console.log('🚀 Iniciando checkout para plan:', selectedPlan, 'región:', selectedRegion)
      
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          plan: selectedPlan,
          region: selectedRegion,
          metadata: {
            source: 'pricing',
            flow: 'direct',
            selectedRegion: selectedRegion,
            detectedRegion: detectedRegion,
            ipCountry: ipCountry
          }
        })
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      
      if (!data.url) {
        throw new Error('No URL received from API')
      }
      
      console.log('✅ Redirecting to Stripe:', data.url)
      window.location.href = data.url
    } catch (error) {
      console.error('❌ Error creating checkout session:', error)
      // Fallback al checkout page si hay error
      window.location.href = `/checkout/${selectedPlan}?source=pricing&region=${selectedRegion}`
    }
  }

  const getCurrentPrices = () => {
    if (!detectedRegion) return { rocket: '...', galaxy: '...', currency: 'USD', rocketRegular: '...', galaxyRegular: '...', rocketPromo: true, galaxyPromo: true }
    const regionInfo = getRegionInfo(detectedRegion)
    return {
      rocket: getCurrentPrice('rocket', detectedRegion),
      galaxy: getCurrentPrice('galaxy', detectedRegion),
      rocketRegular: getRegularPrice('rocket', detectedRegion),
      galaxyRegular: getRegularPrice('galaxy', detectedRegion),
      rocketPromo: isPromoActive('rocket', detectedRegion),
      galaxyPromo: isPromoActive('galaxy', detectedRegion),
      currency: regionInfo?.currency || 'USD'
    }
  }

  const getSelectedPrices = () => {
    if (!selectedRegion) return { rocket: '...', galaxy: '...', currency: 'USD', rocketRegular: '...', galaxyRegular: '...', rocketPromo: true, galaxyPromo: true }
    const regionInfo = getRegionInfo(selectedRegion)
    return {
      rocket: getCurrentPrice('rocket', selectedRegion),
      galaxy: getCurrentPrice('galaxy', selectedRegion),
      rocketRegular: getRegularPrice('rocket', selectedRegion),
      galaxyRegular: getRegularPrice('galaxy', selectedRegion),
      rocketPromo: isPromoActive('rocket', selectedRegion),
      galaxyPromo: isPromoActive('galaxy', selectedRegion),
      currency: regionInfo?.currency || 'USD'
    }
  }

  const prices = getCurrentPrices()
  const selectedPrices = getSelectedPrices()

  return (
    <section id="planes" className="py-20">
      <div className="w-full max-w-[1780px] mx-auto px-[5%]">
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="text-5xl sm:text-5xl lg:text-6xl font-black bg-gradient-to-b from-white to-white/10 bg-clip-text text-transparent leading-[100%] tracking-tight mb-6">
            ELIGE TU PLAN
          </h2>
          {loading ? (
            <p className="text-white/60 text-sm">🌐 Detectando precios para tu región...</p>
          ) : (
            <p className="text-white/60 text-sm">
              Precios para {getRegionInfo(detectedRegion!)?.label || 'tu región'}
            </p>
          )}
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
                {/* Badge promocional */}
                {!loading && prices.rocketPromo && (
                  <div className="inline-flex items-center bg-gradient-to-r from-green-500/20 to-green-400/10 border border-green-400/30 rounded-full px-3 py-1 mb-3">
                    <span className="text-green-400 text-xs font-semibold">🔥 PRECIO ESPECIAL - PRIMER AÑO</span>
                  </div>
                )}
                
                <div className="flex items-baseline mb-2">
                  {loading ? (
                    <div className="text-4xl lg:text-5xl font-black text-white/50">Cargando...</div>
                  ) : (
                    <div className="flex items-baseline space-x-3">
                      {/* Precio promocional */}
                      <div className="flex items-baseline">
                        <span className="text-4xl lg:text-5xl font-black text-white">
                          ${prices.rocket}
                        </span>
                        <span className="text-white/60 ml-2 text-lg">{prices.currency}</span>
                      </div>
                      
                      {/* Precio regular tachado (solo si hay promoción) */}
                      {prices.rocketPromo && prices.rocketRegular !== prices.rocket && (
                        <div className="flex items-baseline">
                          <span className="text-xl lg:text-2xl font-bold text-white/40 line-through">
                            ${prices.rocketRegular}
                          </span>
                          <span className="text-white/30 ml-1 text-sm">{prices.currency}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <p className="text-white/60 text-sm">
                  Bimestral {prices.rocketPromo ? '• Después: $' + prices.rocketRegular + ' ' + prices.currency : ''}
                </p>
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

              <SmoothMagneticButton 
                onClick={() => handlePlanClick('rocket')}
                className="w-full text-white px-8 py-4 font-semibold text-lg hover:shadow-2xl hover:shadow-blue-500/40 transition-shadow duration-300 shadow-xl shadow-blue-600/30 flex items-center justify-center space-x-3"
                magneticStrength={0.15}
                disabled={loading}
              >
                <span>{loading ? 'Cargando...' : 'Comenzar Plan Rocket'}</span>
                {!loading && (
                  <svg 
                    className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                )}
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
                {/* Badge promocional */}
                {!loading && prices.galaxyPromo && (
                  <div className="inline-flex items-center bg-gradient-to-r from-green-500/20 to-green-400/10 border border-green-400/30 rounded-full px-3 py-1 mb-3">
                    <span className="text-green-400 text-xs font-semibold">🔥 PRECIO ESPECIAL - PRIMER AÑO</span>
                  </div>
                )}
                
                <div className="flex items-baseline mb-2">
                  {loading ? (
                    <div className="text-4xl lg:text-5xl font-black text-white/50">Cargando...</div>
                  ) : (
                    <div className="flex items-baseline space-x-3">
                      {/* Precio promocional */}
                      <div className="flex items-baseline">
                        <span className="text-4xl lg:text-5xl font-black text-white">
                          ${prices.galaxy}
                        </span>
                        <span className="text-white/60 ml-2 text-lg">{prices.currency}</span>
                      </div>
                      
                      {/* Precio regular tachado (solo si hay promoción) */}
                      {prices.galaxyPromo && prices.galaxyRegular !== prices.galaxy && (
                        <div className="flex items-baseline">
                          <span className="text-xl lg:text-2xl font-bold text-white/40 line-through">
                            ${prices.galaxyRegular}
                          </span>
                          <span className="text-white/30 ml-1 text-sm">{prices.currency}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <p className="text-white/60 text-sm">
                  Bimestral {prices.galaxyPromo ? '• Después: $' + prices.galaxyRegular + ' ' + prices.currency : ''}
                </p>
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

              <SmoothMagneticButton 
                onClick={() => handlePlanClick('galaxy')}
                className="w-full text-white px-8 py-4 font-semibold text-lg hover:shadow-2xl hover:shadow-blue-500/40 transition-shadow duration-300 shadow-xl shadow-blue-600/30 flex items-center justify-center space-x-3"
                magneticStrength={0.15}
                disabled={loading}
              >
                <span>{loading ? 'Cargando...' : 'Comenzar Plan Galaxy'}</span>
                {!loading && (
                  <svg 
                    className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                )}
              </SmoothMagneticButton>
            </div>
          </div>
        </div>

        {/* Modal de confirmación de región */}
        {showRegionModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-[#1A1A1A] rounded-[24px] p-8 max-w-2xl w-full border border-white/10 max-h-[90vh] overflow-y-auto">
              <h3 className="text-white font-bold text-xl mb-2">
                📍 Confirma tu región antes de continuar
              </h3>
              <p className="text-white/60 text-sm mb-6">
                Seleccionaste: <strong>Plan {selectedPlan === 'rocket' ? 'Rocket' : 'Galaxy'}</strong>
              </p>
              
              <h4 className="text-white font-semibold mb-4">¿Tu negocio está ubicado en:</h4>
              
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
                {REGIONS.map((region) => (
                  <button
                    key={region.id}
                    onClick={() => handleRegionSelect(region.id)}
                    className={`p-4 rounded-xl border-2 transition-all text-center ${
                      selectedRegion === region.id
                        ? 'border-blue-500 bg-blue-500/10'
                        : 'border-gray-700 hover:border-gray-600'
                    }`}
                  >
                    <div className="text-lg mb-2">{region.label.split(' ')[0]}</div>
                    <div className="text-sm font-medium text-white">
                      {region.label.substring(region.label.indexOf(' ') + 1)}
                    </div>
                  </button>
                ))}
              </div>

              {showDiscrepancyMessage && selectedRegion && detectedRegion && (
                <div className="mb-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl">
                  <div className="flex items-start space-x-3">
                    <span className="text-blue-400 text-lg">✨</span>
                    <div>
                      <h4 className="text-blue-300 font-semibold text-sm mb-2">
                        ¡Perfecto! Actualizamos tu región
                      </h4>
                      <p className="text-blue-200/80 text-sm">
                        Seleccionaste <strong>{getRegionInfo(selectedRegion)?.label}</strong> para tu negocio.
                        Los precios se han ajustado automáticamente para ofrecerte la mejor propuesta.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {selectedRegion && (
                <div className="mb-6 p-4 bg-gray-800/50 rounded-xl">
                  <div className="text-center">
                    <div className="text-sm text-white/60 mb-1">Precio final:</div>
                    <div className="text-2xl font-bold text-white">
                      ${selectedPlan === 'rocket' ? selectedPrices.rocket : selectedPrices.galaxy} {selectedPrices.currency}
                      <span className="text-sm text-white/60 ml-2">bimestral</span>
                    </div>
                  </div>
                </div>
              )}

              <p className="text-xs text-white/50 text-center mb-6">
                💡 Ofrecemos precios adaptados a cada región para hacer nuestros servicios más accesibles
              </p>

              <div className="flex space-x-4">
                <button
                  onClick={() => setShowRegionModal(false)}
                  className="flex-1 px-6 py-3 border border-gray-600 text-white rounded-xl hover:bg-gray-800 transition-colors"
                >
                  Cancelar
                </button>
                <SmoothMagneticButton
                  onClick={handleContinueToCheckout}
                  disabled={!selectedRegion}
                  className={`flex-1 px-6 py-3 font-semibold rounded-xl transition-all ${
                    selectedRegion
                      ? 'text-white shadow-xl shadow-blue-600/30'
                      : 'text-white/50 cursor-not-allowed'
                  }`}
                  magneticStrength={0.1}
                >
                  Continuar al pago
                </SmoothMagneticButton>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}