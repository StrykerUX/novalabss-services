'use client'

import { Suspense, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useOptimizedOnboarding } from '@/hooks/useOptimizedOnboarding'

// Componentes de pasos
import Step1Business from '@/components/onboarding/steps/Step1Business'
import Step2Goals from '@/components/onboarding/steps/Step2Goals'
import Step3Website from '@/components/onboarding/steps/Step3Website'
import Step4Branding from '@/components/onboarding/steps/Step4Branding'
import Step5Technical from '@/components/onboarding/steps/Step5Technical'
import Step6Confirmation from '@/components/onboarding/steps/Step6Confirmation'

// Componentes de UI
import OptimizedProgress, { MobileProgress, MicroCelebration } from '@/components/onboarding/OptimizedProgress'
import { OPTIMIZED_STEPS } from '@/lib/onboarding-config'

function OptimizedOnboardingContent() {
  const { data: session, status } = useSession()
  const router = useRouter()
  
  const { 
    step, 
    completedSteps,
    prevStep,
    loadFromStorage,
    getTimeRemaining
  } = useOptimizedOnboarding()

  const [showCelebration, setShowCelebration] = useState(false)
  const [celebrationMessage, setCelebrationMessage] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  // Cargar datos del storage al montar
  useEffect(() => {
    try {
      loadFromStorage()
    } catch (error) {
      console.error('Error loading onboarding data:', error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Redireccionar si no está autenticado
  useEffect(() => {
    if (status === 'loading') return
    
    if (!session) {
      router.push('/login?callback=/onboarding-optimized')
      return
    }
  }, [session, status, router])

  // Mostrar celebración al completar paso
  useEffect(() => {
    if (completedSteps.length > 0) {
      const lastCompletedStep = Math.max(...completedSteps)
      const stepInfo = OPTIMIZED_STEPS.find(s => s.id === lastCompletedStep)
      
      if (stepInfo && lastCompletedStep === step - 1) {
        setCelebrationMessage(`¡${stepInfo.title} completado exitosamente!`)
        setShowCelebration(true)
      }
    }
  }, [completedSteps, step])

  const renderStep = () => {
    switch (step) {
      case 1:
        return <Step1Business />
      case 2:
        return <Step2Goals />
      case 3:
        return <Step3Website />
      case 4:
        return <Step4Branding />
      case 5:
        return <Step5Technical />
      case 6:
        return <Step6Confirmation />
      default:
        return <Step1Business />
    }
  }

  const currentStepInfo = OPTIMIZED_STEPS.find(s => s.id === step)

  if (status === 'loading' || isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Cargando onboarding...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    return null // Will redirect
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-8">
        
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">NL</span>
            </div>
            <h1 className="text-white text-2xl font-bold">NovaLabs</h1>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400"
          >
            Onboarding Optimizado • {getTimeRemaining()} min restantes
          </motion.p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          
          {/* Sidebar con progreso - Desktop */}
          <div className="hidden xl:block xl:col-span-1">
            <div className="sticky top-8">
              <OptimizedProgress currentStep={step} />
            </div>
          </div>

          {/* Contenido principal */}
          <div className="xl:col-span-3">
            
            {/* Progress móvil */}
            <div className="xl:hidden mb-6">
              <MobileProgress currentStep={step} />
            </div>

            {/* Navegación superior */}
            <div className="flex items-center justify-between mb-8">
              
              {/* Botón volver */}
              {step > 1 && (
                <motion.button
                  onClick={prevStep}
                  className="flex items-center gap-2 px-4 py-2 text-gray-400 hover:text-white transition-colors"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  whileHover={{ x: -5 }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  <span className="hidden sm:inline">Volver</span>
                </motion.button>
              )}

              {/* Indicador de paso actual */}
              <div className="flex-1 text-center">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800/50 rounded-lg border border-gray-700/50"
                >
                  <span className="text-2xl">{currentStepInfo?.emoji}</span>
                  <div className="text-left">
                    <div className="text-white font-medium text-sm">
                      Paso {step} de {OPTIMIZED_STEPS.length}
                    </div>
                    <div className="text-gray-400 text-xs">
                      {currentStepInfo?.title}
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Espacio para balance */}
              <div className="w-20"></div>
            </div>

            {/* Contenedor del paso */}
            <motion.div
              className="bg-gray-900/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-800"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {renderStep()}
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Micro celebración */}
      <MicroCelebration 
        show={showCelebration}
        message={celebrationMessage}
        onComplete={() => setShowCelebration(false)}
      />
    </div>
  )
}

export default function OptimizedOnboardingPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-lg">Cargando...</div>
      </div>
    }>
      <OptimizedOnboardingContent />
    </Suspense>
  )
}