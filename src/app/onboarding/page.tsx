"use client"

import { useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useOnboardingState } from "@/hooks/useOnboardingState"
import StepProgress from "@/components/onboarding/StepProgress"
import OnboardingStep from "@/components/onboarding/OnboardingStep"
import Step1BusinessInfo from "@/components/onboarding/steps/Step1BusinessInfo"
import Step2Objectives from "@/components/onboarding/steps/Step2Objectives"

export default function OnboardingPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { 
    step: currentStep, 
    setStep, 
    completedSteps, 
    markStepCompleted,
    loadFromStorage,
    businessInfo,
    objectives
  } = useOnboardingState()

  const steps = [
    { id: 1, title: "Información del Negocio", description: "Cuéntanos sobre tu empresa y sector" },
    { id: 2, title: "Objetivos y Audiencia", description: "Define tus metas y público objetivo" },
    { id: 3, title: "Contenido y Funcionalidades", description: "Estructura y características del sitio" },
    { id: 4, title: "Identidad Visual", description: "Diseño, colores y estilo visual" },
    { id: 5, title: "Dominio y Hosting", description: "Configuración técnica y hosting" },
    { id: 6, title: "Revisión y Cronograma", description: "Resumen final y planificación" }
  ]

  const stepTitles = steps.map(step => step.title)

  useEffect(() => {
    // Solo cargar del storage en el cliente
    if (typeof window !== 'undefined') {
      loadFromStorage()
    }
  }, [loadFromStorage])

  const handleNext = () => {
    if (currentStep < steps.length) {
      markStepCompleted(currentStep)
      setStep(currentStep + 1)
    } else {
      router.push('/dashboard')
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setStep(currentStep - 1)
    } else {
      router.push('/dashboard')
    }
  }

  const canGoNext = () => {
    switch (currentStep) {
      case 1:
        return businessInfo.name && businessInfo.industry && businessInfo.size && businessInfo.location && businessInfo.yearsOperating !== undefined
      case 2:
        return objectives.primaryGoal && objectives.targetAudience?.ageRange && objectives.targetAudience?.location
      case 3:
        return true // Implementar validación del paso 3
      case 4:
        return true // Implementar validación del paso 4
      case 5:
        return true // Implementar validación del paso 5
      case 6:
        return true // Implementar validación del paso 6
      default:
        return false
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <Step1BusinessInfo />
      case 2:
        return <Step2Objectives />
      case 3:
        return <div className="text-center text-gray-400">Paso 3 en desarrollo...</div>
      case 4:
        return <div className="text-center text-gray-400">Paso 4 en desarrollo...</div>
      case 5:
        return <div className="text-center text-gray-400">Paso 5 en desarrollo...</div>
      case 6:
        return <div className="text-center text-gray-400">Paso 6 en desarrollo...</div>
      default:
        return null
    }
  }

  const currentStepData = steps.find(step => step.id === currentStep)

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2" style={{textWrap: "pretty"}}>
              ¡Comencemos tu sitio web! 🚀
            </h1>
            <p className="text-gray-400" style={{textWrap: "pretty"}}>
              Te guiaremos paso a paso para crear tu sitio perfecto
            </p>
          </div>

          {/* Progress Bar */}
          <StepProgress
            currentStep={currentStep}
            totalSteps={steps.length}
            completedSteps={completedSteps}
            stepTitles={stepTitles}
          />

          {/* Content Area */}
          <div className="bg-[#1A1A1A] rounded-2xl p-8 border border-gray-800">
            <OnboardingStep
              step={currentStep}
              title={currentStepData?.title || ''}
              description={currentStepData?.description || ''}
              isActive={true}
              onNext={handleNext}
              onPrevious={handlePrevious}
              canGoNext={canGoNext()}
              canGoPrevious={currentStep > 1}
            >
              {renderStepContent()}
            </OnboardingStep>
          </div>

        </div>
      </div>
    </div>
  )
}