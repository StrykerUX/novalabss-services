'use client'

import { motion } from 'framer-motion'
import { OPTIMIZED_STEPS } from '@/lib/onboarding-config'
import { useOptimizedOnboarding } from '@/hooks/useOptimizedOnboarding'

interface OptimizedProgressProps {
  currentStep: number
  className?: string
}

export default function OptimizedProgress({ currentStep, className = '' }: OptimizedProgressProps) {
  const { completedSteps, getTimeRemaining, getCompletionPercentage } = useOptimizedOnboarding()
  
  const timeRemaining = getTimeRemaining()
  const completionPercentage = getCompletionPercentage()
  
  return (
    <div className={`bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800 ${className}`}>
      
      {/* Header con tiempo restante */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-white font-semibold text-lg">Tu Progreso</h3>
          <p className="text-gray-400 text-sm">
            {completionPercentage}% completado
          </p>
        </div>
        
        {timeRemaining > 0 && (
          <div className="text-right">
            <div className="text-blue-400 font-semibold text-lg">
              ~{timeRemaining} min
            </div>
            <div className="text-gray-500 text-xs">restantes</div>
          </div>
        )}
      </div>

      {/* Barra de progreso principal */}
      <div className="mb-6">
        <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
            initial={{ width: 0 }}
            animate={{ width: `${completionPercentage}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        </div>
      </div>

      {/* Lista de pasos */}
      <div className="space-y-3">
        {OPTIMIZED_STEPS.map((step, index) => {
          const isCompleted = completedSteps.includes(step.id)
          const isCurrent = currentStep === step.id
          const isPending = step.id > currentStep
          
          return (
            <motion.div
              key={step.id}
              className={`flex items-center p-3 rounded-xl transition-all duration-200 ${
                isCompleted 
                  ? 'bg-green-500/10 border border-green-500/20' 
                  : isCurrent 
                    ? 'bg-blue-500/10 border border-blue-500/20' 
                    : 'bg-gray-800/30 border border-gray-700/30'
              }`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              
              {/* Icono de estado */}
              <div className={`flex items-center justify-center w-8 h-8 rounded-full mr-3 ${
                isCompleted 
                  ? 'bg-green-500 text-white' 
                  : isCurrent 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-700 text-gray-400'
              }`}>
                {isCompleted ? (
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                ) : isCurrent ? (
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                ) : (
                  <span className="text-xs font-bold">{step.id}</span>
                )}
              </div>

              {/* Contenido del paso */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-lg">{step.emoji}</span>
                  <h4 className={`font-medium ${
                    isCompleted || isCurrent ? 'text-white' : 'text-gray-400'
                  }`}>
                    {step.title}
                  </h4>
                </div>
                <p className={`text-sm ${
                  isCompleted || isCurrent ? 'text-gray-300' : 'text-gray-500'
                }`}>
                  {step.subtitle}
                </p>
              </div>

              {/* Tiempo estimado */}
              <div className={`text-xs px-2 py-1 rounded-full ${
                isCompleted 
                  ? 'bg-green-500/20 text-green-400' 
                  : isCurrent 
                    ? 'bg-blue-500/20 text-blue-400' 
                    : 'bg-gray-700/50 text-gray-500'
              }`}>
                {step.estimatedTime}min
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Celebración al completar */}
      {completionPercentage === 100 && (
        <motion.div
          className="mt-6 p-4 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-xl border border-green-500/20 text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="text-2xl mb-2">🎉</div>
          <h4 className="text-white font-semibold mb-1">¡Onboarding Completado!</h4>
          <p className="text-green-400 text-sm">
            Tu información está lista para crear tu sitio web
          </p>
        </motion.div>
      )}
    </div>
  )
}

// Componente más simple para móvil
export function MobileProgress({ currentStep }: { currentStep: number }) {
  const { getCompletionPercentage, getTimeRemaining } = useOptimizedOnboarding()
  
  const timeRemaining = getTimeRemaining()
  const completionPercentage = getCompletionPercentage()
  const currentStepInfo = OPTIMIZED_STEPS.find(s => s.id === currentStep)
  
  return (
    <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-4 border border-gray-800">
      
      {/* Header compacto */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-lg">{currentStepInfo?.emoji}</span>
          <div>
            <div className="text-white font-medium text-sm">
              Paso {currentStep} de {OPTIMIZED_STEPS.length}
            </div>
            <div className="text-gray-400 text-xs">
              {currentStepInfo?.title}
            </div>
          </div>
        </div>
        
        {timeRemaining > 0 && (
          <div className="text-blue-400 text-sm font-medium">
            ~{timeRemaining}min
          </div>
        )}
      </div>

      {/* Barra de progreso */}
      <div className="flex items-center gap-2">
        <div className="flex-1 h-1.5 bg-gray-800 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
            initial={{ width: 0 }}
            animate={{ width: `${completionPercentage}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        </div>
        <span className="text-gray-400 text-xs font-medium">
          {completionPercentage}%
        </span>
      </div>
    </div>
  )
}

// Componente de micro-celebración
export function MicroCelebration({ 
  show, 
  message, 
  onComplete 
}: { 
  show: boolean
  message: string
  onComplete: () => void 
}) {
  if (!show) return null
  
  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onComplete}
    >
      <motion.div
        className="bg-gray-900 rounded-2xl p-8 border border-gray-700 text-center max-w-sm mx-4"
        initial={{ scale: 0.8, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.8, y: 20 }}
        transition={{ type: 'spring', damping: 20 }}
      >
        <motion.div
          className="text-4xl mb-4"
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 0.5, repeat: 2 }}
        >
          ✨
        </motion.div>
        
        <h3 className="text-white font-semibold text-lg mb-2">
          ¡Excelente!
        </h3>
        
        <p className="text-gray-300 text-sm mb-6">
          {message}
        </p>
        
        <motion.button
          className="px-6 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onComplete}
        >
          Continuar
        </motion.button>
      </motion.div>
    </motion.div>
  )
}