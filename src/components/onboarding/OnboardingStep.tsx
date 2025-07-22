import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface OnboardingStepProps {
  step: number
  title: string
  description: string
  children: React.ReactNode
  isActive: boolean
  onNext?: () => void
  onPrevious?: () => void
  canGoNext?: boolean
  canGoPrevious?: boolean
  isLoading?: boolean
}

export default function OnboardingStep({
  step,
  title,
  description,
  children,
  isActive,
  onNext,
  onPrevious,
  canGoNext = true,
  canGoPrevious = true,
  isLoading = false
}: OnboardingStepProps) {
  return (
    <AnimatePresence mode="wait">
      {isActive && (
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
          className="w-full"
        >
          {/* Header del Step */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                {step}
              </div>
            </div>
            <h2 className="text-2xl font-semibold text-white mb-2" style={{textWrap: "pretty"}}>
              {title}
            </h2>
            <p className="text-gray-400 text-lg" style={{textWrap: "pretty"}}>
              {description}
            </p>
          </div>

          {/* Contenido del Step */}
          <div className="min-h-[400px] mb-8">
            {children}
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center pt-6 border-t border-gray-800">
            <button
              onClick={onPrevious}
              disabled={!canGoPrevious || isLoading}
              className="px-6 py-3 bg-gray-800 text-white rounded-lg font-semibold hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {step === 1 ? 'Saltar' : 'Anterior'}
            </button>

            <div className="flex items-center space-x-2">
              {/* Indicador de guardado */}
              <div className="text-sm text-gray-500">
                <span className="inline-block w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                Guardado automático
              </div>

              <button
                onClick={onNext}
                disabled={!canGoNext || isLoading}
                className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Procesando...</span>
                  </>
                ) : (
                  <span>{step === 6 ? 'Finalizar' : 'Siguiente'}</span>
                )}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}