import React from 'react'
import { motion } from 'framer-motion'
import { useOnboardingState } from '@/hooks/useOnboardingState'

const businessSizes = [
  { value: 'freelancer', label: 'Freelancer', icon: '👤', desc: 'Trabajo independiente' },
  { value: 'startup', label: 'Startup', icon: '🚀', desc: 'Empresa emergente' },
  { value: 'pyme', label: 'PYME', icon: '🏢', desc: 'Pequeña/mediana empresa' },
  { value: 'empresa', label: 'Empresa', icon: '🏛️', desc: 'Empresa establecida' }
]

export default function Step1BusinessName() {
  const { businessInfo, updateBusinessInfo } = useOnboardingState()

  return (
    <div className="space-y-6">
      {/* Nombre del negocio */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="space-y-3"
      >
        <label className="block text-sm font-medium text-gray-300">
          ¿Cuál es el nombre de tu negocio?
        </label>
        <input
          type="text"
          value={businessInfo.name || ''}
          onChange={(e) => updateBusinessInfo({ name: e.target.value })}
          placeholder="Ej: Mi Empresa, Consultoría García..."
          className="w-full px-4 py-4 bg-gray-900 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all text-lg"
          autoFocus
        />
      </motion.div>

      {/* Tamaño del negocio */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-3"
      >
        <label className="block text-sm font-medium text-gray-300">
          ¿Qué describe mejor tu negocio?
        </label>
        <div className="grid grid-cols-2 gap-3">
          {businessSizes.map((size) => (
            <motion.button
              key={size.value}
              onClick={() => updateBusinessInfo({ size: size.value as any })}
              className={`p-4 rounded-xl border-2 transition-all text-left relative overflow-hidden ${
                businessInfo.size === size.value
                  ? 'border-blue-500 bg-blue-500/10 text-white'
                  : 'border-gray-700 hover:border-gray-600 text-gray-300'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center space-x-3">
                <div className="text-2xl">{size.icon}</div>
                <div>
                  <div className="font-semibold">{size.label}</div>
                  <div className="text-sm opacity-70">{size.desc}</div>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Preview minimalista */}
      {businessInfo.name && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-6 p-4 bg-gradient-to-br from-blue-500/5 to-purple-500/5 border border-blue-500/20 rounded-xl text-center"
        >
          <div className="text-lg font-semibold text-white mb-1">
            {businessInfo.name}
          </div>
          {businessInfo.size && (
            <div className="text-sm text-gray-400">
              {businessSizes.find(s => s.value === businessInfo.size)?.label}
            </div>
          )}
        </motion.div>
      )}
    </div>
  )
}