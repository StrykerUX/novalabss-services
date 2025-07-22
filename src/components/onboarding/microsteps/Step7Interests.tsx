import React from 'react'
import { motion } from 'framer-motion'
import { useOnboardingState } from '@/hooks/useOnboardingState'

const interests = [
  { name: 'Tecnología', icon: '💻', color: 'from-blue-500 to-cyan-500' },
  { name: 'Salud', icon: '🏥', color: 'from-green-500 to-emerald-500' },
  { name: 'Fitness', icon: '💪', color: 'from-red-500 to-pink-500' },
  { name: 'Belleza', icon: '💄', color: 'from-pink-500 to-rose-500' },
  { name: 'Educación', icon: '🎓', color: 'from-purple-500 to-indigo-500' },
  { name: 'Viajes', icon: '✈️', color: 'from-sky-500 to-blue-500' },
  { name: 'Comida', icon: '🍽️', color: 'from-orange-500 to-red-500' },
  { name: 'Moda', icon: '👗', color: 'from-purple-500 to-pink-500' },
  { name: 'Deportes', icon: '⚽', color: 'from-green-500 to-teal-500' },
  { name: 'Música', icon: '🎵', color: 'from-indigo-500 to-purple-500' },
  { name: 'Arte', icon: '🎨', color: 'from-orange-500 to-pink-500' },
  { name: 'Negocios', icon: '💼', color: 'from-gray-500 to-slate-500' },
  { name: 'Familia', icon: '👨‍👩‍👧‍👦', color: 'from-yellow-500 to-orange-500' },
  { name: 'Hogar', icon: '🏠', color: 'from-amber-500 to-orange-500' },
  { name: 'Automóviles', icon: '🚗', color: 'from-slate-500 to-gray-500' },
  { name: 'Finanzas', icon: '💰', color: 'from-green-500 to-emerald-500' }
]

export default function Step7Interests() {
  const { objectives, updateObjectives } = useOnboardingState()

  const handleInterestToggle = (interest: string) => {
    const currentInterests = objectives.targetAudience?.interests || []
    const newInterests = currentInterests.includes(interest)
      ? currentInterests.filter(i => i !== interest)
      : [...currentInterests, interest]
    
    updateObjectives({
      targetAudience: {
        ...objectives.targetAudience,
        interests: newInterests
      }
    })
  }

  const selectedCount = objectives.targetAudience?.interests?.length || 0
  const canSelectMore = selectedCount < 5

  return (
    <div className="space-y-6">
      {/* Título */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-center"
      >
        <h3 className="text-lg font-medium text-gray-300 mb-2">
          ¿Qué le interesa a tu audiencia?
        </h3>
        <p className="text-sm text-gray-400">
          Selecciona hasta 5 intereses principales
        </p>
        <div className="mt-2 text-xs text-gray-500">
          {selectedCount}/5 seleccionados
        </div>
      </motion.div>

      {/* Grid de intereses */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-2 gap-3 max-h-80 overflow-y-auto"
      >
        {interests.map((interest, index) => {
          const isSelected = objectives.targetAudience?.interests?.includes(interest.name)
          const canSelect = canSelectMore || isSelected

          return (
            <motion.button
              key={interest.name}
              onClick={() => canSelect && handleInterestToggle(interest.name)}
              disabled={!canSelect}
              className={`p-4 rounded-xl border-2 transition-all text-left relative overflow-hidden ${
                isSelected
                  ? 'border-blue-500 bg-blue-500/10 text-white'
                  : canSelect
                  ? 'border-gray-700 hover:border-gray-600 text-gray-300'
                  : 'border-gray-800 text-gray-500 cursor-not-allowed opacity-50'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.03 }}
              whileHover={canSelect ? { scale: 1.02 } : {}}
              whileTap={canSelect ? { scale: 0.98 } : {}}
            >
              {/* Gradient background cuando está seleccionado */}
              {isSelected && (
                <div className={`absolute inset-0 bg-gradient-to-br ${interest.color} opacity-5`} />
              )}
              
              <div className="relative z-10 flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${interest.color} flex items-center justify-center text-lg shadow-sm`}>
                  {interest.icon}
                </div>
                <div className="flex-1">
                  <div className="font-medium text-sm">{interest.name}</div>
                </div>
                {isSelected && (
                  <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs">
                    ✓
                  </div>
                )}
              </div>
            </motion.button>
          )
        })}
      </motion.div>

      {/* Preview de intereses seleccionados */}
      {selectedCount > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="p-4 bg-gradient-to-br from-blue-500/5 to-purple-500/5 border border-blue-500/20 rounded-xl"
        >
          <div className="flex items-center space-x-2 mb-3">
            <span>💡</span>
            <span className="font-semibold text-white">Intereses seleccionados:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {objectives.targetAudience?.interests?.map((interest, index) => {
              const interestData = interests.find(i => i.name === interest)
              return (
                <div
                  key={index}
                  className="flex items-center space-x-2 bg-gray-800/50 px-3 py-1 rounded-full text-sm"
                >
                  <span>{interestData?.icon}</span>
                  <span className="text-gray-300">{interest}</span>
                </div>
              )
            })}
          </div>
        </motion.div>
      )}

      {/* Información sobre el paso opcional */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="text-center text-xs text-gray-500 bg-gray-900/50 p-3 rounded-xl"
      >
        💡 Este paso es opcional, pero nos ayuda a personalizar el contenido para tu audiencia
      </motion.div>
    </div>
  )
}