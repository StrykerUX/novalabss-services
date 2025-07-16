"use client"

import { useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useOnboardingState } from "@/hooks/useOnboardingState"
import MicroStepProgress from "@/components/onboarding/MicroStepProgress"
import MicroStepWrapper from "@/components/onboarding/MicroStepWrapper"
import Step1BusinessName from "@/components/onboarding/microsteps/Step1BusinessName"
import Step2Industry from "@/components/onboarding/microsteps/Step2Industry"
import Step3Location from "@/components/onboarding/microsteps/Step3Location"
import Step4Experience from "@/components/onboarding/microsteps/Step4Experience"
import Step5Objective from "@/components/onboarding/microsteps/Step5Objective"
import Step6Audience from "@/components/onboarding/microsteps/Step6Audience"
import Step7Interests from "@/components/onboarding/microsteps/Step7Interests"
import Step8Competitors from "@/components/onboarding/microsteps/Step8Competitors"
import Step9Pages from "@/components/onboarding/microsteps/Step9Pages"
import Step10Features from "@/components/onboarding/microsteps/Step10Features"
import Step11Content from "@/components/onboarding/microsteps/Step11Content"
import Step12Colors from "@/components/onboarding/microsteps/Step12Colors"
import Step13Style from "@/components/onboarding/microsteps/Step13Style"
import Step14Logo from "@/components/onboarding/microsteps/Step14Logo"
import Step15Domain from "@/components/onboarding/microsteps/Step15Domain"
import Step16Review from "@/components/onboarding/microsteps/Step16Review"
import { MicroStep } from "@/types/onboarding"

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
    objectives,
    contentArchitecture,
    brandDesign,
    technicalSetup
  } = useOnboardingState()

  const microSteps: MicroStep[] = [
    // Información del Negocio
    { id: 1, title: "Nombre y Tipo", subtitle: "¿Cómo se llama tu negocio?", category: 'business', required: true },
    { id: 2, title: "Industria", subtitle: "¿En qué sector trabajas?", category: 'business', required: true },
    { id: 3, title: "Ubicación", subtitle: "¿Dónde opera tu negocio?", category: 'business', required: true },
    { id: 4, title: "Experiencia", subtitle: "¿Cuánto tiempo llevas operando?", category: 'business', required: true },
    
    // Objetivos y Audiencia (por ahora placeholder)
    { id: 5, title: "Objetivo Principal", subtitle: "¿Cuál es tu meta principal?", category: 'objectives', required: true },
    { id: 6, title: "Audiencia", subtitle: "¿A quién te diriges?", category: 'objectives', required: true },
    { id: 7, title: "Intereses", subtitle: "¿Qué le interesa a tu audiencia?", category: 'objectives', required: false },
    { id: 8, title: "Competidores", subtitle: "¿Quiénes son tus competidores?", category: 'objectives', required: false },
    
    // Placeholders para el resto
    { id: 9, title: "Páginas", subtitle: "¿Qué páginas necesitas?", category: 'content', required: true },
    { id: 10, title: "Funcionalidades", subtitle: "¿Qué características específicas?", category: 'content', required: true },
    { id: 11, title: "Contenido", subtitle: "¿Tienes textos e imágenes?", category: 'content', required: false },
    { id: 12, title: "Colores", subtitle: "¿Qué colores prefieres?", category: 'design', required: true },
    { id: 13, title: "Estilo", subtitle: "¿Qué estilo visual te gusta?", category: 'design', required: true },
    { id: 14, title: "Logo", subtitle: "¿Tienes logo o necesitas uno?", category: 'design', required: false },
    { id: 15, title: "Dominio", subtitle: "¿Necesitas un dominio?", category: 'technical', required: true },
    { id: 16, title: "Revisión", subtitle: "Confirmemos todos los detalles", category: 'review', required: true }
  ]

  const totalSteps = microSteps.length

  useEffect(() => {
    // Solo cargar del storage en el cliente
    if (typeof window !== 'undefined') {
      loadFromStorage()
    }
  }, [loadFromStorage])

  const handleNext = () => {
    if (currentStep < totalSteps) {
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
        return businessInfo.name && businessInfo.size
      case 2:
        return businessInfo.industry
      case 3:
        return businessInfo.location
      case 4:
        return businessInfo.yearsOperating !== undefined
      case 5:
        return objectives.primaryGoal
      case 6:
        return objectives.targetAudience?.ageRange && objectives.targetAudience?.location
      case 7:
        return true // Intereses son opcionales
      case 8:
        return true // Competidores son opcionales
      case 9:
        return contentArchitecture.pages && contentArchitecture.pages.length > 0
      case 10:
        return contentArchitecture.features && contentArchitecture.features.length > 0
      case 11:
        return true // Contenido existente es opcional
      case 12:
        return brandDesign.colors && brandDesign.colors.length > 0
      case 13:
        return brandDesign.style
      case 14:
        return brandDesign.logoStatus
      case 15:
        return technicalSetup.domain?.name
      case 16:
        return true // Revisión siempre disponible
      default:
        return true // Placeholders por ahora
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <Step1BusinessName />
      case 2:
        return <Step2Industry />
      case 3:
        return <Step3Location />
      case 4:
        return <Step4Experience />
      case 5:
        return <Step5Objective />
      case 6:
        return <Step6Audience />
      case 7:
        return <Step7Interests />
      case 8:
        return <Step8Competitors />
      case 9:
        return <Step9Pages />
      case 10:
        return <Step10Features />
      case 11:
        return <Step11Content />
      case 12:
        return <Step12Colors />
      case 13:
        return <Step13Style />
      case 14:
        return <Step14Logo />
      case 15:
        return <Step15Domain />
      case 16:
        return <Step16Review />
      default:
        return <div className="text-center text-gray-400">Paso {currentStep} en desarrollo...</div>
    }
  }

  const currentMicroStep = microSteps.find(step => step.id === currentStep)

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-white mb-2" style={{textWrap: "pretty"}}>
              Creemos tu sitio web perfecto
            </h1>
            <p className="text-gray-400" style={{textWrap: "pretty"}}>
              Solo unos pasos simples para comenzar
            </p>
          </div>

          {/* Micro Progress Bar */}
          <MicroStepProgress
            currentStep={currentStep}
            totalSteps={totalSteps}
            completedSteps={completedSteps}
            microSteps={microSteps}
          />

          {/* Content Area */}
          <div className="bg-[#1A1A1A] rounded-2xl p-8 border border-gray-800">
            <MicroStepWrapper
              isActive={true}
              onNext={handleNext}
              onPrevious={handlePrevious}
              canGoNext={canGoNext()}
              canGoPrevious={currentStep > 1}
              isFirst={currentStep === 1}
              isLast={currentStep === totalSteps}
            >
              {renderStepContent()}
            </MicroStepWrapper>
          </div>

        </div>
      </div>
    </div>
  )
}