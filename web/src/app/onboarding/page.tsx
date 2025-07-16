"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import SmoothMagneticButton from "@/components/SmoothMagneticButton"

export default function OnboardingPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [currentStep, setCurrentStep] = useState(1)

  const steps = [
    { id: 1, title: "Información básica", description: "Cuéntanos sobre tu negocio" },
    { id: 2, title: "Contenido del sitio", description: "Qué información incluir" },
    { id: 3, title: "Diseño y estilo", description: "Cómo se verá tu sitio" },
    { id: 4, title: "Dominio y hosting", description: "Tu dirección web" },
    { id: 5, title: "Revisión final", description: "Confirma todos los detalles" }
  ]

  const currentStepData = steps.find(step => step.id === currentStep)

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">
              ¡Comencemos tu sitio web! 🚀
            </h1>
            <p className="text-gray-400">
              Te guiaremos paso a paso para crear tu sitio perfecto
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-center space-x-2 mb-4">
              {steps.map((step) => (
                <div key={step.id} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                    step.id < currentStep 
                      ? 'bg-green-500 text-white' 
                      : step.id === currentStep
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-700 text-gray-400'
                  }`}>
                    {step.id < currentStep ? '✓' : step.id}
                  </div>
                  {step.id < steps.length && (
                    <div className={`w-8 h-0.5 mx-2 ${
                      step.id < currentStep ? 'bg-green-500' : 'bg-gray-700'
                    }`} />
                  )}
                </div>
              ))}
            </div>
            <div className="text-center">
              <p className="text-gray-400 text-sm">
                Paso {currentStep} de {steps.length}: {currentStepData?.title}
              </p>
            </div>
          </div>

          {/* Content Area */}
          <div className="bg-[#1A1A1A] rounded-2xl p-8 border border-gray-800">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">
                {currentStepData?.title}
              </h2>
              <p className="text-gray-400">
                {currentStepData?.description}
              </p>
            </div>

            {/* Step Content */}
            <div className="min-h-[400px] flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">🚧</div>
                <h3 className="text-xl text-white mb-2">
                  Paso {currentStep} en construcción
                </h3>
                <p className="text-gray-400 mb-6">
                  Aquí irá el contenido específico para: {currentStepData?.title}
                </p>
                
                {/* Placeholder form */}
                <div className="max-w-md mx-auto space-y-4">
                  <div className="bg-gray-900/50 rounded-lg p-4">
                    <p className="text-gray-500 text-sm">
                      Formulario para {currentStepData?.title.toLowerCase()}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center mt-8">
              <button
                onClick={() => currentStep > 1 && setCurrentStep(currentStep - 1)}
                disabled={currentStep === 1}
                className="px-6 py-3 bg-gray-800 text-white rounded-lg font-semibold hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Anterior
              </button>

              <div className="flex space-x-4">
                <button
                  onClick={() => router.push('/dashboard')}
                  className="px-6 py-3 border border-gray-600 text-gray-300 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
                >
                  Saltar por ahora
                </button>

                {currentStep < steps.length ? (
                  <SmoothMagneticButton
                    onClick={() => setCurrentStep(currentStep + 1)}
                    className="px-6 py-3 font-space-grotesk font-semibold hover:shadow-lg hover:shadow-blue-500/40 transition-shadow duration-300"
                    magneticStrength={0.1}
                  >
                    Siguiente
                  </SmoothMagneticButton>
                ) : (
                  <SmoothMagneticButton
                    onClick={() => router.push('/dashboard')}
                    className="px-6 py-3 font-space-grotesk font-semibold hover:shadow-lg hover:shadow-blue-500/40 transition-shadow duration-300"
                    magneticStrength={0.1}
                  >
                    Finalizar
                  </SmoothMagneticButton>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}