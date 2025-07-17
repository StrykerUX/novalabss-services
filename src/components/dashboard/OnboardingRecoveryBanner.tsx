import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import SmoothMagneticButton from "../SmoothMagneticButton"
import { useOnboardingProgress } from "@/hooks/useOnboardingProgress"

export default function OnboardingRecoveryBanner() {
  const router = useRouter()
  const { 
    isComplete, 
    progressPercentage, 
    nextIncompleteStep, 
    currentPhase,
    currentStep,
    totalCompletedSteps,
    totalSteps
  } = useOnboardingProgress()

  // No mostrar banner si el onboarding está completo
  if (isComplete) return null

  const handleContinueOnboarding = () => {
    router.push('/onboarding')
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8"
    >
      <div className="bg-gradient-to-br from-amber-500/15 to-yellow-500/10 rounded-[48px] p-8 border border-amber-400/35 relative overflow-hidden shadow-lg shadow-amber-500/25">
        {/* Efectos visuales de fondo */}
        <div className="absolute top-4 right-4 w-16 h-16 bg-amber-500/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-4 left-4 w-12 h-12 bg-yellow-500/10 rounded-full blur-lg"></div>
        
        <div className="relative">
          {/* Header del banner */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-amber-500/20 rounded-full flex items-center justify-center mr-4 animate-pulse">
                <svg className="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.982 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white font-space-grotesk mb-1">
                  ⚠️ ¡Termina de configurar tu sitio web!
                </h3>
                <p className="text-amber-100 text-sm">
                  Tu sitio web está esperando - solo faltan unos pasos para comenzar el desarrollo
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-amber-200 font-bold text-lg">
                {totalCompletedSteps}/{totalSteps}
              </div>
              <div className="text-amber-100 text-xs">pasos completados</div>
            </div>
          </div>

          {/* Barra de progreso */}
          <div className="mb-4">
            <div className="flex justify-between text-sm text-amber-100 mb-2">
              <span>Progreso del onboarding</span>
              <span>{progressPercentage}%</span>
            </div>
            <div className="w-full bg-amber-900/30 rounded-full h-3">
              <motion.div 
                className="bg-gradient-to-r from-amber-400 to-yellow-400 h-3 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </div>
          </div>

          {/* Información de la fase actual */}
          <div className="bg-amber-500/10 rounded-[24px] p-4 mb-4 border border-amber-500/20">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-lg">{currentPhase.icon}</span>
                  <span className="text-amber-200 font-semibold text-sm">Fase actual:</span>
                  <span className="text-white font-bold">{currentPhase.name}</span>
                </div>
                {nextIncompleteStep && (
                  <p className="text-amber-100 text-sm">
                    Próximo paso: <span className="font-semibold">{nextIncompleteStep.title}</span>
                  </p>
                )}
              </div>
              <div className="text-amber-200 font-bold text-sm bg-amber-500/20 px-3 py-1 rounded-full">
                Paso {currentStep}
              </div>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button
                onClick={handleContinueOnboarding}
                className="px-4 py-2 bg-amber-500 text-white font-medium text-sm rounded-[24px] hover:bg-amber-600 transition-colors"
              >
                <div className="flex items-center space-x-2">
                  <span>🚀 Continuar configuración</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </button>
              
              <button className="px-4 py-2 text-amber-200 hover:text-white transition-colors text-sm border border-amber-500/30 rounded-[24px] hover:border-amber-500/50">
                Recordar más tarde
              </button>
            </div>
            
            <div className="text-amber-100 text-xs">
              ⏰ Solo toma <span className="font-semibold">3-5 minutos</span> más
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}