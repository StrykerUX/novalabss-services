"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
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

  const handleFrustrationSelect = (selected: Frustration) => {
    setFrustration(selected)
    setCurrentStep(2)
  }

  const handleAspirationSelect = (selected: Aspiration) => {
    setAspiration(selected)
    setCurrentStep(3) // Paso beneficio
  }

  const handleBenefitContinue = () => {
    setCurrentStep(4) // Paso testimonio
  }

  const handleTestimonialContinue = () => {
    setCurrentStep(5) // Paso final
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
      
      const { url } = await response.json()
      
      // Redirigir a Stripe Checkout
      window.location.href = url
    } catch (error) {
      console.error('Error creating checkout session:', error)
      // Fallback al checkout page si hay error
      router.push(`/checkout/${plan}?source=warm-lead`)
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="w-full max-w-7xl">
        
        {/* Progress Bar - 5 pasos */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4 mb-4">
            {[1, 2, 3, 4, 5].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                  step <= currentStep 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-700 text-gray-400'
                }`}>
                  {step}
                </div>
                {step < 5 && (
                  <div className={`w-16 h-0.5 ml-4 ${
                    step < currentStep ? 'bg-blue-600' : 'bg-gray-700'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="text-center text-gray-400 text-sm">
            Paso {currentStep} de 5 - Personalizar tu experiencia
          </div>
        </div>

        {/* Cards */}
        <div className="bg-[#1A1A1A] rounded-2xl border border-gray-800 overflow-hidden">
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

        {/* Skip Option */}
        <div className="text-center mt-6">
          <button 
            onClick={() => router.push('/checkout/rocket?source=skip')}
            className="text-gray-400 hover:text-white transition-colors text-sm"
          >
            Saltar y pagar directo →
          </button>
        </div>
      </div>
    </div>
  )
}