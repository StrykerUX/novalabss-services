import { useOnboardingState } from "./useOnboardingState"

export function useOnboardingProgress() {
  const { 
    businessInfo, 
    objectives, 
    contentArchitecture, 
    brandDesign, 
    technicalSetup, 
    step,
    completedSteps 
  } = useOnboardingState()

  // Calcular si el onboarding está completo basado en pasos realmente completados
  const isOnboardingComplete = () => {
    // Lista de pasos OBLIGATORIOS que deben estar completados
    const requiredSteps = [1, 2, 3, 4, 5, 6, 9, 10, 12, 13, 15]
    
    // Verificar que todos los pasos requeridos estén en completedSteps
    const allRequiredCompleted = requiredSteps.every(step => completedSteps.includes(step))
    
    // Si todos los pasos requeridos están completados, considerar completo
    // (la verificación de datos es redundante si los pasos ya validaron los datos)
    return allRequiredCompleted
  }

  // Calcular progreso porcentual basado en pasos requeridos
  const getProgressPercentage = () => {
    const requiredSteps = [1, 2, 3, 4, 5, 6, 9, 10, 12, 13, 15] // 11 pasos requeridos
    const completedRequiredSteps = requiredSteps.filter(step => completedSteps.includes(step)).length
    return Math.round((completedRequiredSteps / requiredSteps.length) * 100)
  }

  // Obtener próximo paso pendiente basado en completedSteps array
  const getNextIncompleteStep = () => {
    const stepChecks = [
      { step: 1, complete: completedSteps.includes(1), title: "Nombre y Tipo de Negocio", required: true },
      { step: 2, complete: completedSteps.includes(2), title: "Industria", required: true },
      { step: 3, complete: completedSteps.includes(3), title: "Ubicación", required: true },
      { step: 4, complete: completedSteps.includes(4), title: "Experiencia", required: true },
      { step: 5, complete: completedSteps.includes(5), title: "Objetivo Principal", required: true },
      { step: 6, complete: completedSteps.includes(6), title: "Audiencia", required: true },
      { step: 7, complete: completedSteps.includes(7), title: "Intereses", required: false },
      { step: 8, complete: completedSteps.includes(8), title: "Competidores", required: false },
      { step: 9, complete: completedSteps.includes(9), title: "Páginas", required: true },
      { step: 10, complete: completedSteps.includes(10), title: "Funcionalidades", required: true },
      { step: 11, complete: completedSteps.includes(11), title: "Contenido", required: false },
      { step: 12, complete: completedSteps.includes(12), title: "Colores", required: true },
      { step: 13, complete: completedSteps.includes(13), title: "Estilo", required: true },
      { step: 14, complete: completedSteps.includes(14), title: "Logo", required: false },
      { step: 15, complete: completedSteps.includes(15), title: "Dominio", required: true },
      { step: 16, complete: completedSteps.includes(16), title: "Revisión", required: false }
    ]

    // Buscar el primer paso requerido que no esté completo
    return stepChecks.find(check => check.required && !check.complete)
  }

  // Obtener categoría de la fase actual basada en último paso completado
  const getCurrentPhase = () => {
    // Encontrar el último paso completado para determinar la fase real
    const lastCompletedStep = Math.max(...completedSteps, 0)
    
    // Si no hay pasos completados, usar el step actual
    const referenceStep = lastCompletedStep > 0 ? lastCompletedStep : step
    
    if (referenceStep <= 4) return { name: "Información del Negocio", icon: "🏢" }
    if (referenceStep <= 8) return { name: "Objetivos y Audiencia", icon: "🎯" }
    if (referenceStep <= 11) return { name: "Contenido y Estructura", icon: "📄" }
    if (referenceStep <= 14) return { name: "Identidad Visual", icon: "🎨" }
    if (referenceStep <= 15) return { name: "Configuración Técnica", icon: "🌐" }
    return { name: "Revisión Final", icon: "✅" }
  }

  return {
    isComplete: isOnboardingComplete(),
    progressPercentage: getProgressPercentage(),
    nextIncompleteStep: getNextIncompleteStep(),
    currentPhase: getCurrentPhase(),
    currentStep: step,
    totalCompletedSteps: completedSteps.length,
    totalSteps: 16
  }
}