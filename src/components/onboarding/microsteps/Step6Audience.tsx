import React from 'react'
import { motion } from 'framer-motion'
import { useOnboardingState } from '@/hooks/useOnboardingState'

const ageGroups = [
  { value: '18-24', label: 'Jóvenes Adultos', icon: '🎓', desc: 'Universitarios, primeros empleos' },
  { value: '25-34', label: 'Millennials', icon: '💼', desc: 'Profesionales, emprendedores' },
  { value: '35-44', label: 'Adultos', icon: '👨‍👩‍👧‍👦', desc: 'Familias, carrera establecida' },
  { value: '45-54', label: 'Adultos Maduros', icon: '🏠', desc: 'Estabilidad, crecimiento' },
  { value: '55-64', label: 'Pre-jubilados', icon: '🎯', desc: 'Experiencia, inversiones' },
  { value: '65+', label: 'Adultos Mayores', icon: '🌟', desc: 'Sabiduría, tiempo libre' }
]

const locations = [
  { value: 'local', label: 'Local', icon: '🏘️', desc: 'Mi ciudad/región' },
  { value: 'nacional', label: 'Nacional', icon: '🇲🇽', desc: 'Todo México' },
  { value: 'internacional', label: 'Internacional', icon: '🌍', desc: 'Varios países' },
  { value: 'online', label: 'Online', icon: '💻', desc: 'Sin límites geográficos' }
]

export default function Step6Audience() {
  const { objectives, updateObjectives } = useOnboardingState()

  const handleAgeUpdate = (age: string) => {
    updateObjectives({
      targetAudience: {
        ...objectives.targetAudience,
        ageRange: age
      }
    })
  }

  const handleLocationUpdate = (location: string) => {
    updateObjectives({
      targetAudience: {
        ...objectives.targetAudience,
        location: location
      }
    })
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
          ¿A quién te diriges?
        </h3>
        <p className="text-sm text-gray-400">
          Define tu audiencia principal
        </p>
      </motion.div>

      {/* Rango de Edad */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-3"
      >
        <h4 className="text-sm font-medium text-gray-300">Edad principal</h4>
        <div className="grid grid-cols-2 gap-3">
          {ageGroups.map((age, index) => (
            <motion.button
              key={age.value}
              onClick={() => handleAgeUpdate(age.value)}
              className={`p-4 rounded-xl border-2 transition-all text-left ${
                objectives.targetAudience?.ageRange === age.value
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
                <div className="text-2xl">{age.icon}</div>
                <div>
                  <div className="font-medium text-sm">{age.label}</div>
                  <div className="text-xs opacity-70">{age.desc}</div>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Alcance Geográfico */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="space-y-3"
      >
        <h4 className="text-sm font-medium text-gray-300">Alcance geográfico</h4>
        <div className="grid grid-cols-2 gap-3">
          {locations.map((location, index) => (
            <motion.button
              key={location.value}
              onClick={() => handleLocationUpdate(location.value)}
              className={`p-4 rounded-xl border-2 transition-all text-left ${
                objectives.targetAudience?.location === location.value
                  ? 'border-blue-500 bg-blue-500/10 text-white'
                  : 'border-gray-700 hover:border-gray-600 text-gray-300'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.05 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center space-x-3">
                <div className="text-2xl">{location.icon}</div>
                <div>
                  <div className="font-medium text-sm">{location.label}</div>
                  <div className="text-xs opacity-70">{location.desc}</div>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Preview */}
      {objectives.targetAudience?.ageRange && objectives.targetAudience?.location && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          className="p-4 bg-gradient-to-br from-blue-500/5 to-purple-500/5 border border-blue-500/20 rounded-xl"
        >
          <div className="flex items-center space-x-2 mb-2">
            <span>🎯</span>
            <span className="font-semibold text-white">Tu audiencia:</span>
          </div>
          <div className="text-sm text-gray-300">
            <span className="text-blue-400">
              {ageGroups.find(a => a.value === objectives.targetAudience?.ageRange)?.label}
            </span>
            <span className="text-gray-400"> con alcance </span>
            <span className="text-blue-400">
              {locations.find(l => l.value === objectives.targetAudience?.location)?.label.toLowerCase()}
            </span>
          </div>
        </motion.div>
      )}
    </div>
  )
}