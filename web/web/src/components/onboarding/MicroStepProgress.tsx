import React from 'react'
import { motion } from 'framer-motion'
import { MicroStep } from '@/types/onboarding'

interface MicroStepProgressProps {
  currentStep: number
  totalSteps: number
  completedSteps: number[]
  microSteps: MicroStep[]
}

const categoryColors = {
  business: 'from-blue-500 to-cyan-500',
  objectives: 'from-purple-500 to-pink-500',
  content: 'from-green-500 to-emerald-500',
  design: 'from-orange-500 to-red-500',
  technical: 'from-gray-500 to-slate-500',
  review: 'from-yellow-500 to-amber-500'
}

const categoryIcons = {
  business: '🏢',
  objectives: '🎯',
  content: '📄',
  design: '🎨',
  technical: '⚙️',
  review: '✅'
}

export default function MicroStepProgress({
  currentStep,
  totalSteps,
  completedSteps,
  microSteps
}: MicroStepProgressProps) {
  const progress = (completedSteps.length / totalSteps) * 100
  const currentMicroStep = microSteps.find(step => step.id === currentStep)

  return (
    <div className="mb-8">
      {/* Main Progress Bar */}
      <div className="relative mb-6">
        <div className="h-3 bg-gray-800 rounded-full overflow-hidden border border-gray-700">
          <motion.div
            className={`h-full bg-gradient-to-r ${currentMicroStep ? categoryColors[currentMicroStep.category] : 'from-blue-500 to-purple-500'} rounded-full relative`}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            {/* Animated shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
          </motion.div>
        </div>
        
        {/* Progress indicators */}
        <div className="flex justify-between items-center mt-2">
          <div className="flex items-center space-x-2">
            <div className="text-xs text-gray-400">
              {completedSteps.length} de {totalSteps} completados
            </div>
          </div>
          <div className="text-xs text-gray-400">
            {Math.round(progress)}%
          </div>
        </div>
      </div>

      {/* Current Step Info */}
      <motion.div
        key={currentStep}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="text-center"
      >
        <div className="flex items-center justify-center space-x-3 mb-2">
          <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${currentMicroStep ? categoryColors[currentMicroStep.category] : 'from-blue-500 to-purple-500'} flex items-center justify-center text-lg shadow-lg`}>
            {currentMicroStep ? categoryIcons[currentMicroStep.category] : '📝'}
          </div>
        </div>
        
        <h2 className="text-xl font-semibold text-white mb-1" style={{textWrap: "pretty"}}>
          {currentMicroStep?.title || 'Cargando...'}
        </h2>
        
        <p className="text-gray-400 text-sm" style={{textWrap: "pretty"}}>
          {currentMicroStep?.subtitle || 'Preparando el siguiente paso...'}
        </p>
      </motion.div>

      {/* Mini category indicators */}
      <div className="flex justify-center space-x-2 mt-4">
        {Object.entries(categoryColors).map(([category, gradient]) => {
          const categorySteps = microSteps.filter(step => step.category === category)
          const completedInCategory = categorySteps.filter(step => 
            completedSteps.includes(step.id)
          ).length
          const totalInCategory = categorySteps.length
          const categoryProgress = totalInCategory > 0 ? (completedInCategory / totalInCategory) * 100 : 0
          
          return (
            <div
              key={category}
              className="relative group"
            >
              <div className="w-8 h-2 bg-gray-800 rounded-full overflow-hidden">
                <motion.div
                  className={`h-full bg-gradient-to-r ${gradient} rounded-full`}
                  initial={{ width: 0 }}
                  animate={{ width: `${categoryProgress}%` }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                />
              </div>
              
              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                {categoryIcons[category as keyof typeof categoryIcons]} {completedInCategory}/{totalInCategory}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}