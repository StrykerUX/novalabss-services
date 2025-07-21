import React from 'react'
import { motion } from 'framer-motion'
import { useOnboardingState } from '@/hooks/useOnboardingState'

const experienceOptions = [
  { 
    value: 0, 
    label: 'Nuevo', 
    icon: '🌱', 
    desc: 'Acabo de empezar',
    color: 'from-green-500 to-emerald-500'
  },
  { 
    value: 1, 
    label: '1-2 años', 
    icon: '🌿', 
    desc: 'Primeros pasos',
    color: 'from-blue-500 to-cyan-500'
  },
  { 
    value: 3, 
    label: '3-5 años', 
    icon: '🌳', 
    desc: 'En crecimiento',
    color: 'from-purple-500 to-pink-500'
  },
  { 
    value: 6, 
    label: '6+ años', 
    icon: '🏆', 
    desc: 'Bien establecido',
    color: 'from-orange-500 to-red-500'
  }
]

export default function Step4Experience() {
  const { businessInfo, updateBusinessInfo } = useOnboardingState()

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
          ¿Cuánto tiempo llevas operando?
        </h3>
        <p className="text-sm text-gray-400">
          Esto nos ayuda a entender tu nivel de experiencia
        </p>
      </motion.div>

      {/* Opciones de experiencia */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-2 gap-4"
      >
        {experienceOptions.map((option, index) => (
          <motion.button
            key={option.value}
            onClick={() => updateBusinessInfo({ yearsOperating: option.value })}
            className={`p-6 rounded-xl border-2 transition-all text-center relative overflow-hidden ${
              businessInfo.yearsOperating === option.value
                ? 'border-blue-500 bg-blue-500/10 text-white'
                : 'border-gray-700 hover:border-gray-600 text-gray-300'
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Gradient background cuando está seleccionado */}
            {businessInfo.yearsOperating === option.value && (
              <div className={`absolute inset-0 bg-gradient-to-br ${option.color} opacity-10`} />
            )}
            
            <div className="relative z-10">
              <div className="text-4xl mb-3">{option.icon}</div>
              <div className="font-semibold text-lg mb-1">{option.label}</div>
              <div className="text-sm opacity-70">{option.desc}</div>
            </div>
          </motion.button>
        ))}
      </motion.div>

      {/* Preview seleccionado */}
      {businessInfo.yearsOperating !== undefined && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-6 p-4 bg-gradient-to-br from-blue-500/5 to-purple-500/5 border border-blue-500/20 rounded-xl text-center"
        >
          <div className="flex items-center justify-center space-x-2 text-lg">
            <span>{experienceOptions.find(o => o.value === businessInfo.yearsOperating)?.icon}</span>
            <span className="font-semibold text-white">
              {businessInfo.yearsOperating === 0 ? 'Nuevo negocio' : `${businessInfo.yearsOperating}+ años de experiencia`}
            </span>
          </div>
        </motion.div>
      )}

      {/* Información adicional basada en selección */}
      {businessInfo.yearsOperating !== undefined && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center text-sm text-gray-400 bg-gray-900/50 p-4 rounded-xl"
        >
          {businessInfo.yearsOperating === 0 && (
            "¡Perfecto! Te ayudaremos a crear una presencia digital sólida desde el inicio."
          )}
          {businessInfo.yearsOperating === 1 && (
            "Excelente momento para fortalecer tu presencia digital y atraer más clientes."
          )}
          {businessInfo.yearsOperating === 3 && (
            "Con tu experiencia, podemos crear un sitio que refleje tu crecimiento y expertise."
          )}
          {businessInfo.yearsOperating === 6 && (
            "Tu experiencia es valiosa. Crearemos un sitio que demuestre tu autoridad en el sector."
          )}
        </motion.div>
      )}
    </div>
  )
}