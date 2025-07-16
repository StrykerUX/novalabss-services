"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import FrustrationCard from "@/components/flow/FrustrationCard"
import AspirationCard from "@/components/flow/AspirationCard"
import BenefitScreen from "@/components/flow/BenefitScreen"
import TestimonialScreen from "@/components/flow/TestimonialScreen"
import ROICard from "@/components/flow/ROICard"

export type Frustration = "pocos_encuentran" | "no_confianza" | "pierdo_competencia" | "no_tiempo"
export type Aspiration = "2-3_clientes" | "5-10_clientes" | "10-20_clientes" | "20_plus_clientes"

export default function WarmLeadJourney() {
  const [currentStep, setCurrentStep] = useState(1)
  const [frustration, setFrustration] = useState<Frustration | null>(null)
  const [aspiration, setAspiration] = useState<Aspiration | null>(null)
  const router = useRouter()
  const searchParams = useSearchParams()

  // Función para actualizar URL con estado actual
  const updateURL = (step: number, frustration?: Frustration, aspiration?: Aspiration) => {
    const params = new URLSearchParams()
    params.set('step', step.toString())
    if (frustration) params.set('frustration', frustration)
    if (aspiration) params.set('aspiration', aspiration)
    
    const newURL = `/start?${params.toString()}`
    router.replace(newURL, { scroll: false })
  }

  // Cargar estado desde URL al montar el componente
  useEffect(() => {
    const step = searchParams.get('step')
    const frustrationParam = searchParams.get('frustration') as Frustration
    const aspirationParam = searchParams.get('aspiration') as Aspiration

    if (step) {
      const stepNumber = parseInt(step)
      if (stepNumber >= 1 && stepNumber <= 5) {
        setCurrentStep(stepNumber)
      }
    }

    if (frustrationParam && ['pocos_encuentran', 'no_confianza', 'pierdo_competencia', 'no_tiempo'].includes(frustrationParam)) {
      setFrustration(frustrationParam)
    }

    if (aspirationParam && ['2-3_clientes', '5-10_clientes', '10-20_clientes', '20_plus_clientes'].includes(aspirationParam)) {
      setAspiration(aspirationParam)
    }
  }, [searchParams])

  const handleFrustrationSelect = (selected: Frustration) => {
    setFrustration(selected)
    setCurrentStep(2)
    updateURL(2, selected, aspiration || undefined)
  }

  const handleAspirationSelect = (selected: Aspiration) => {
    setAspiration(selected)
    setCurrentStep(3) // Paso beneficio
    updateURL(3, frustration || undefined, selected)
  }

  const handleBenefitContinue = () => {
    setCurrentStep(4) // Paso testimonio
    updateURL(4, frustration || undefined, aspiration || undefined)
  }

  const handleTestimonialContinue = () => {
    setCurrentStep(5) // Paso final
    updateURL(5, frustration || undefined, aspiration || undefined)
  }

  const handleProceedToCheckout = async (plan: "rocket" | "galaxy") => {
    // Guardar datos del flujo para Stripe metadata
    const flowData = {
      frustration,
      aspiration,
      recommendedPlan: plan,
      source: 'warm-lead'
    }
    
    // Crear sesión de Stripe Checkout
    try {
      console.log('🚀 Iniciando checkout warm-lead para plan:', plan)
      console.log('📋 Flow data:', flowData)
      
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          plan: plan,
          metadata: flowData
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
      router.push(`/checkout/${plan}?source=warm-lead`)
    }
  }

  return (
    <div className="min-h-screen bg-black flex justify-center px-4 py-8">
      <div className="w-full max-w-[480px] sm:max-w-[540px] lg:max-w-[620px]">
        
        {/* Progress Bar - Responsive */}
        <div className="mb-6 lg:mb-8">
          <div className="flex items-center justify-center space-x-1 sm:space-x-2 mb-4">
            {[1, 2, 3, 4, 5].map((step) => (
              <div key={step} className="flex items-center">
                {/* Número del paso responsive */}
                <div className={`relative w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10 rounded-full flex items-center justify-center text-xs sm:text-sm font-semibold transition-all duration-500 ease-out ${
                  step < currentStep 
                    ? 'bg-gradient-to-b from-blue-500 to-black text-white shadow-lg shadow-blue-500/30 scale-105' 
                    : step === currentStep
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/40 scale-110 animate-pulse'
                    : 'bg-gray-700/50 text-gray-400 border border-gray-600'
                }`}>
                  {/* Checkmark para pasos completados */}
                  {step < currentStep ? (
                    <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <span>{step}</span>
                  )}
                  
                  {/* Ring animado para el paso actual */}
                  {step === currentStep && (
                    <div className="absolute inset-0 rounded-full border-2 border-blue-400 animate-ping opacity-75"></div>
                  )}
                </div>
                
                {/* Línea conectora responsive */}
                {step < 5 && (
                  <div className="relative w-6 sm:w-8 lg:w-12 h-0.5 ml-2 mr-2 lg:ml-3 lg:mr-3 bg-gray-700 rounded-full overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full transition-all duration-700 ease-out ${
                      step < currentStep ? 'w-full' : 'w-0'
                    }`} />
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {/* Texto del paso responsive */}
          <div className="text-center transition-all duration-300 ease-out">
            <p className="text-gray-400 text-xs sm:text-sm">
              Paso {currentStep} de 5
            </p>
          </div>
        </div>

        {/* Cards - Padding optimizado */}
        <div className="bg-[#1A1A1A] rounded-[24px] lg:rounded-[48px] border border-gray-800 overflow-hidden">
          <div className="min-h-[520px] p-6 lg:p-8 flex flex-col">
            {currentStep === 1 && (
              <FrustrationCard onSelect={handleFrustrationSelect} />
            )}
            
            {currentStep === 2 && (
              <AspirationCard onSelect={handleAspirationSelect} />
            )}
            
            {currentStep === 3 && frustration && aspiration && (
              <BenefitScreen 
                frustration={frustration}
                aspiration={aspiration}
                onContinue={handleBenefitContinue}
              />
            )}
            
            {currentStep === 4 && frustration && aspiration && (
              <TestimonialScreen 
                frustration={frustration}
                aspiration={aspiration}
                onContinue={handleTestimonialContinue}
              />
            )}
            
            {currentStep === 5 && frustration && aspiration && (
              <ROICard 
                frustration={frustration}
                aspiration={aspiration}
                onProceedToCheckout={handleProceedToCheckout}
              />
            )}
          </div>
        </div>

      </div>
    </div>
  )
}