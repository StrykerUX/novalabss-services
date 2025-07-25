'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useOptimizedOnboarding } from '@/hooks/useOptimizedOnboarding'

const PRIMARY_GOALS = [
  {
    value: 'sales',
    label: 'Aumentar ventas',
    emoji: '💰',
    description: 'Vender más productos o servicios online'
  },
  {
    value: 'leads',
    label: 'Generar leads',
    emoji: '📧',
    description: 'Capturar contactos y clientes potenciales'
  },
  {
    value: 'branding',
    label: 'Fortalecer marca',
    emoji: '🚀',
    description: 'Mejorar imagen y presencia profesional'
  },
  {
    value: 'portfolio',
    label: 'Mostrar portafolio',
    emoji: '🎨',
    description: 'Exhibir trabajos y casos de éxito'
  }
]

const AGE_RANGES = [
  '18-24 años', '25-34 años', '35-44 años', 
  '45-54 años', '55-64 años', '65+ años'
]

const AUDIENCE_LOCATIONS = [
  {
    value: 'local',
    label: 'Local',
    emoji: '🏘️',
    description: 'Mi ciudad o región'
  },
  {
    value: 'national',
    label: 'Nacional',
    emoji: '🇲🇽',
    description: 'Todo mi país'
  },
  {
    value: 'international',
    label: 'Internacional',
    emoji: '🌍',
    description: 'Múltiples países'
  }
]

export default function Step2Goals() {
  const { 
    goals, 
    updateGoals, 
    markStepCompleted, 
    nextStep 
  } = useOptimizedOnboarding()

  const [formData, setFormData] = useState({
    primaryGoal: goals.primaryGoal || '',
    ageRanges: goals.targetAudience?.ageRanges || [],
    audienceLocation: goals.targetAudience?.location || '',
    audienceDescription: goals.targetAudience?.description || ''
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleGoalSelect = (goal: string) => {
    setFormData(prev => ({ ...prev, primaryGoal: goal }))
    if (errors.primaryGoal) {
      setErrors(prev => ({ ...prev, primaryGoal: '' }))
    }
  }

  const handleAgeRangeToggle = (ageRange: string) => {
    setFormData(prev => {
      const newAgeRanges = prev.ageRanges.includes(ageRange)
        ? prev.ageRanges.filter(range => range !== ageRange)
        : [...prev.ageRanges, ageRange]
      
      // Límite de 2 rangos para mantener focus
      if (newAgeRanges.length > 2) {
        return prev
      }
      
      return { ...prev, ageRanges: newAgeRanges }
    })
    
    if (errors.ageRanges) {
      setErrors(prev => ({ ...prev, ageRanges: '' }))
    }
  }

  const handleLocationSelect = (location: string) => {
    setFormData(prev => ({ ...prev, audienceLocation: location }))
    if (errors.audienceLocation) {
      setErrors(prev => ({ ...prev, audienceLocation: '' }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.primaryGoal) {
      newErrors.primaryGoal = 'Selecciona tu objetivo principal'
    }

    if (formData.ageRanges.length === 0) {
      newErrors.ageRanges = 'Selecciona al menos un rango de edad'
    }

    if (!formData.audienceLocation) {
      newErrors.audienceLocation = 'Selecciona el alcance de tu audiencia'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleContinue = () => {
    if (!validateForm()) return

    // Guardar datos
    updateGoals({
      primaryGoal: formData.primaryGoal as any,
      targetAudience: {
        ageRanges: formData.ageRanges,
        location: formData.audienceLocation as any,
        description: formData.audienceDescription.trim() || undefined
      }
    })

    markStepCompleted(2)
    nextStep()
  }

  return (
    <div className="max-w-3xl mx-auto">
      
      {/* Header */}
      <div className="text-center mb-8">
        <motion.div 
          className="text-4xl mb-4"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', delay: 0.2 }}
        >
          🎯
        </motion.div>
        
        <h2 className="text-2xl lg:text-3xl font-bold text-white mb-2">
          Objetivos y Audiencia
        </h2>
        
        <p className="text-gray-400 text-lg">
          Define tu meta principal y a quién quieres llegar
        </p>
      </div>

      <div className="space-y-8">
        
        {/* Objetivo Principal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-xl font-semibold text-white mb-4">
            ¿Cuál es tu objetivo principal? *
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {PRIMARY_GOALS.map((goal, index) => (
              <motion.button
                key={goal.value}
                type="button"
                onClick={() => handleGoalSelect(goal.value)}
                className={`p-6 rounded-xl border text-left transition-all ${
                  formData.primaryGoal === goal.value
                    ? 'bg-blue-500/20 border-blue-500/50 text-white'
                    : 'bg-gray-800/50 border-gray-700/50 text-gray-300 hover:border-gray-600'
                }`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-start gap-4">
                  <span className="text-3xl">{goal.emoji}</span>
                  <div>
                    <h4 className="font-semibold text-lg mb-1">{goal.label}</h4>
                    <p className="text-sm opacity-75">{goal.description}</p>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
          
          {errors.primaryGoal && (
            <p className="text-red-400 text-sm mt-2">{errors.primaryGoal}</p>
          )}
        </motion.div>

        {/* Audiencia - Edad */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h3 className="text-xl font-semibold text-white mb-4">
            ¿Qué edad tiene tu audiencia objetivo? *
            <span className="text-sm text-gray-400 font-normal ml-2">
              (máximo 2 rangos)
            </span>
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {AGE_RANGES.map((ageRange, index) => (
              <motion.button
                key={ageRange}
                type="button"
                onClick={() => handleAgeRangeToggle(ageRange)}
                disabled={formData.ageRanges.length >= 2 && !formData.ageRanges.includes(ageRange)}
                className={`p-4 rounded-xl border text-center transition-all ${
                  formData.ageRanges.includes(ageRange)
                    ? 'bg-green-500/20 border-green-500/50 text-white'
                    : formData.ageRanges.length >= 2
                      ? 'bg-gray-800/30 border-gray-700/30 text-gray-500 cursor-not-allowed'
                      : 'bg-gray-800/50 border-gray-700/50 text-gray-300 hover:border-gray-600'
                }`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 + index * 0.05 }}
                whileHover={{ 
                  scale: (formData.ageRanges.length >= 2 && !formData.ageRanges.includes(ageRange)) ? 1 : 1.05 
                }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="font-medium">{ageRange}</div>
                {formData.ageRanges.includes(ageRange) && (
                  <div className="text-green-400 text-sm mt-1">✓ Seleccionado</div>
                )}
              </motion.button>
            ))}
          </div>
          
          {errors.ageRanges && (
            <p className="text-red-400 text-sm mt-2">{errors.ageRanges}</p>
          )}
        </motion.div>

        {/* Audiencia - Ubicación */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <h3 className="text-xl font-semibold text-white mb-4">
            ¿Cuál es el alcance de tu audiencia? *
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {AUDIENCE_LOCATIONS.map((location, index) => (
              <motion.button
                key={location.value}
                type="button"
                onClick={() => handleLocationSelect(location.value)}
                className={`p-6 rounded-xl border text-center transition-all ${
                  formData.audienceLocation === location.value
                    ? 'bg-purple-500/20 border-purple-500/50 text-white'
                    : 'bg-gray-800/50 border-gray-700/50 text-gray-300 hover:border-gray-600'
                }`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="text-3xl mb-2">{location.emoji}</div>
                <h4 className="font-semibold text-lg mb-1">{location.label}</h4>
                <p className="text-sm opacity-75">{location.description}</p>
              </motion.button>
            ))}
          </div>
          
          {errors.audienceLocation && (
            <p className="text-red-400 text-sm mt-2">{errors.audienceLocation}</p>
          )}
        </motion.div>

        {/* Descripción adicional */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <h3 className="text-xl font-semibold text-white mb-4">
            Describe tu audiencia (opcional)
          </h3>
          
          <textarea
            value={formData.audienceDescription}
            onChange={(e) => setFormData(prev => ({ ...prev, audienceDescription: e.target.value }))}
            placeholder="Ej: Emprendedores jóvenes interesados en tecnología, profesionales que buscan eficiencia, padres de familia que valoran la calidad..."
            rows={4}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all resize-none"
          />
          
          <p className="text-gray-500 text-sm mt-2">
            Esto nos ayuda a personalizar mejor tu sitio web
          </p>
        </motion.div>

        {/* Resumen */}
        {formData.primaryGoal && formData.ageRanges.length > 0 && formData.audienceLocation && (
          <motion.div
            className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-6"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.1 }}
          >
            <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
              <span>📋</span>
              Resumen de tu estrategia
            </h4>
            
            <div className="space-y-2 text-sm">
              <p className="text-gray-300">
                <span className="text-blue-400 font-medium">Objetivo:</span> {' '}
                {PRIMARY_GOALS.find(g => g.value === formData.primaryGoal)?.label}
              </p>
              <p className="text-gray-300">
                <span className="text-blue-400 font-medium">Audiencia:</span> {' '}
                {formData.ageRanges.join(', ')} • {' '}
                {AUDIENCE_LOCATIONS.find(l => l.value === formData.audienceLocation)?.label}
              </p>
              {formData.audienceDescription && (
                <p className="text-gray-300">
                  <span className="text-blue-400 font-medium">Descripción:</span> {' '}
                  {formData.audienceDescription}
                </p>
              )}
            </div>
          </motion.div>
        )}

        {/* Continue Button */}
        <motion.div
          className="pt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <button
            onClick={handleContinue}
            disabled={!formData.primaryGoal || formData.ageRanges.length === 0 || !formData.audienceLocation}
            className="w-full px-6 py-4 bg-blue-500 text-white rounded-xl font-semibold text-lg hover:bg-blue-600 disabled:bg-gray-700 disabled:cursor-not-allowed transition-all"
          >
            Continuar a Estructura del Sitio 📄
          </button>
        </motion.div>
      </div>
    </div>
  )
}