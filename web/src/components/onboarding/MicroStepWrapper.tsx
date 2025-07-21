import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface MicroStepWrapperProps {
  children: React.ReactNode
  isActive: boolean
  onNext?: () => void
  onPrevious?: () => void
  canGoNext?: boolean
  canGoPrevious?: boolean
  isLoading?: boolean
  isFirst?: boolean
  isLast?: boolean
}

export default function MicroStepWrapper({
  children,
  isActive,
  onNext,
  onPrevious,
  canGoNext = true,
  canGoPrevious = true,
  isLoading = false,
  isFirst = false,
  isLast = false
}: MicroStepWrapperProps) {
  return (
    <AnimatePresence mode="wait">
      {isActive && (
        <motion.div
          key="micro-step-content"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="w-full"
        >
          {/* Contenido del micro-paso */}
          <div className="min-h-[300px] flex items-center justify-center">
            <div className="w-full max-w-lg mx-auto">
              {children}
            </div>
          </div>

          {/* Navegación minimalista */}
          <div className="flex justify-between items-center pt-8 border-t border-gray-800/50">
            {/* Botón anterior */}
            <button
              onClick={onPrevious}
              disabled={!canGoPrevious || isLoading}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                isFirst 
                  ? 'text-gray-500 cursor-not-allowed' 
                  : 'text-gray-300 hover:text-white hover:bg-gray-800'
              }`}
            >
              {isFirst ? '' : '← Anterior'}
            </button>

            {/* Indicador de guardado */}
            <div className="flex items-center space-x-2 text-xs text-gray-500">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>Guardado</span>
            </div>

            {/* Botón siguiente */}
            <button
              onClick={onNext}
              disabled={!canGoNext || isLoading}
              className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
                canGoNext && !isLoading
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl'
                  : 'bg-gray-700 text-gray-400 cursor-not-allowed'
              }`}
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Procesando...</span>
                </div>
              ) : isLast ? (
                'Finalizar ✨'
              ) : (
                'Siguiente →'
              )}
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}