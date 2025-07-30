import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useOnboardingState } from '@/hooks/useOnboardingState'

const popularLocations = [
  { name: 'Ciudad de México, CDMX', icon: '🏙️' },
  { name: 'Guadalajara, Jalisco', icon: '🌮' },
  { name: 'Monterrey, Nuevo León', icon: '🏔️' },
  { name: 'Puebla, Puebla', icon: '🏛️' },
  { name: 'Cancún, Quintana Roo', icon: '🏖️' },
  { name: 'Tijuana, Baja California', icon: '🌊' },
  { name: 'León, Guanajuato', icon: '👞' },
  { name: 'Mérida, Yucatán', icon: '🦩' },
  { name: 'Nacional (Todo México)', icon: '🇲🇽' },
  { name: 'Internacional', icon: '🌍' }
]

export default function Step3Location() {
  const { businessInfo, updateBusinessInfo } = useOnboardingState()
  const [customLocation, setCustomLocation] = useState('')
  const [showCustomInput, setShowCustomInput] = useState(false)

  const handleLocationSelect = (location: string) => {
    updateBusinessInfo({ location })
    setShowCustomInput(false)
    setCustomLocation('')
  }

  const handleCustomLocation = () => {
    if (customLocation.trim()) {
      updateBusinessInfo({ location: customLocation.trim() })
      setShowCustomInput(false)
      setCustomLocation('')
    }
  }

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
          ¿Dónde opera tu negocio?
        </h3>
        <p className="text-sm text-gray-400">
          Selecciona tu ubicación principal
        </p>
      </motion.div>

      {/* Ubicaciones populares */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-2 gap-3 max-h-80 overflow-y-auto"
      >
        {popularLocations.map((location, index) => (
          <motion.button
            key={location.name}
            onClick={() => handleLocationSelect(location.name)}
            className={`p-4 rounded-xl border-2 transition-all text-left ${
              businessInfo.location === location.name
                ? 'border-blue-500 bg-blue-500/10 text-white'
                : 'border-gray-700 hover:border-gray-600 text-gray-300'
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.05 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center space-x-3">
              <div className="text-2xl">{location.icon}</div>
              <div className="font-medium text-sm">{location.name}</div>
            </div>
          </motion.button>
        ))}
      </motion.div>

      {/* Opción personalizada */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="space-y-3"
      >
        {!showCustomInput ? (
          <button
            onClick={() => setShowCustomInput(true)}
            className="w-full p-4 border-2 border-dashed border-gray-600 rounded-xl text-gray-400 hover:border-gray-500 hover:text-gray-300 transition-all"
          >
            <div className="flex items-center justify-center space-x-2">
              <span>📍</span>
              <span>Otra ubicación</span>
            </div>
          </button>
        ) : (
          <div className="flex space-x-2">
            <input
              type="text"
              value={customLocation}
              onChange={(e) => setCustomLocation(e.target.value)}
              placeholder="Escribe tu ubicación..."
              className="flex-1 px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
              autoFocus
              onKeyPress={(e) => e.key === 'Enter' && handleCustomLocation()}
            />
            <button
              onClick={handleCustomLocation}
              disabled={!customLocation.trim()}
              className="px-4 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 disabled:bg-gray-700 disabled:cursor-not-allowed transition-all"
            >
              ✓
            </button>
          </div>
        )}
      </motion.div>

      {/* Preview seleccionado */}
      {businessInfo.location && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-6 p-4 bg-gradient-to-br from-blue-500/5 to-purple-500/5 border border-blue-500/20 rounded-xl text-center"
        >
          <div className="flex items-center justify-center space-x-2 text-lg">
            <span>📍</span>
            <span className="font-semibold text-white">{businessInfo.location}</span>
          </div>
        </motion.div>
      )}
    </div>
  )
}