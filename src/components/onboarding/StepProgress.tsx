import React from 'react'
import { motion } from 'framer-motion'

interface StepProgressProps {
  currentStep: number
  totalSteps: number
  completedSteps: number[]
  stepTitles: string[]
}

export default function StepProgress({
  currentStep,
  totalSteps,
  completedSteps,
  stepTitles
}: StepProgressProps) {
  const progress = (completedSteps.length / totalSteps) * 100

  return (
    <div className="mb-8">
      {/* Progress Bar */}
      <div className="relative mb-6">
        <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
        <div className="absolute -top-1 right-0 text-xs text-gray-400">
          {Math.round(progress)}%
        </div>
      </div>

      {/* Step Indicators */}
      <div className="flex items-center justify-center space-x-2 mb-4">
        {Array.from({ length: totalSteps }, (_, index) => {
          const stepNumber = index + 1
          const isCompleted = completedSteps.includes(stepNumber)
          const isCurrent = stepNumber === currentStep
          const isPast = stepNumber < currentStep

          return (
            <React.Fragment key={stepNumber}>
              <motion.div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                  isCompleted
                    ? 'bg-green-500 text-white'
                    : isCurrent
                    ? 'bg-blue-500 text-white ring-4 ring-blue-500/30'
                    : isPast
                    ? 'bg-gray-600 text-gray-300'
                    : 'bg-gray-800 text-gray-500'
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {isCompleted ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  stepNumber
                )}
              </motion.div>
              
              {stepNumber < totalSteps && (
                <div className={`w-8 h-0.5 mx-1 transition-colors duration-300 ${
                  stepNumber < currentStep ? 'bg-green-500' : 'bg-gray-800'
                }`} />
              )}
            </React.Fragment>
          )
        })}
      </div>

      {/* Current Step Title */}
      <div className="text-center">
        <p className="text-gray-400 text-sm">
          Paso {currentStep} de {totalSteps}
        </p>
        <h3 className="text-white font-medium mt-1" style={{textWrap: "pretty"}}>
          {stepTitles[currentStep - 1]}
        </h3>
      </div>
    </div>
  )
}