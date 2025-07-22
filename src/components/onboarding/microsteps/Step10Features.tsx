import React from 'react'
import { motion } from 'framer-motion'
import { useOnboardingState } from '@/hooks/useOnboardingState'

const basicFeatures = [
  { 
    name: 'Formulario de Contacto', 
    icon: '📧', 
    desc: 'Permite a los visitantes contactarte',
    essential: true,
    color: 'from-blue-500 to-cyan-500'
  },
  { 
    name: 'Galería de Imágenes', 
    icon: '🖼️', 
    desc: 'Muestra fotos de productos/servicios',
    essential: true,
    color: 'from-purple-500 to-pink-500'
  },
  { 
    name: 'Mapa de Ubicación', 
    icon: '🗺️', 
    desc: 'Muestra dónde te encuentras',
    essential: true,
    color: 'from-green-500 to-emerald-500'
  },
  { 
    name: 'Integración Redes Sociales', 
    icon: '📱', 
    desc: 'Enlaces a tus perfiles sociales',
    essential: true,
    color: 'from-orange-500 to-red-500'
  }
]

const advancedFeatures = [
  { 
    name: 'Sistema de Reservas', 
    icon: '📅', 
    desc: 'Citas y reservaciones online',
    essential: false,
    color: 'from-indigo-500 to-purple-500'
  },
  { 
    name: 'Chat en Vivo', 
    icon: '💬', 
    desc: 'Atención al cliente en tiempo real',
    essential: false,
    color: 'from-pink-500 to-rose-500'
  },
  { 
    name: 'Newsletter', 
    icon: '📰', 
    desc: 'Suscripción a boletín informativo',
    essential: false,
    color: 'from-yellow-500 to-orange-500'
  },
  { 
    name: 'Testimonios Dinámicos', 
    icon: '⭐', 
    desc: 'Carrusel de reseñas de clientes',
    essential: false,
    color: 'from-teal-500 to-green-500'
  },
  { 
    name: 'Búsqueda Interna', 
    icon: '🔍', 
    desc: 'Buscar contenido en el sitio',
    essential: false,
    color: 'from-emerald-500 to-teal-500'
  },
  { 
    name: 'Sistema de Pagos', 
    icon: '💳', 
    desc: 'Procesar pagos online',
    essential: false,
    color: 'from-slate-500 to-gray-500'
  },
  { 
    name: 'Área de Clientes', 
    icon: '👤', 
    desc: 'Portal privado para usuarios',
    essential: false,
    color: 'from-cyan-500 to-blue-500'
  },
  { 
    name: 'Multiidioma', 
    icon: '🌍', 
    desc: 'Contenido en varios idiomas',
    essential: false,
    color: 'from-violet-500 to-purple-500'
  }
]

export default function Step10Features() {
  const { contentArchitecture, updateContentArchitecture } = useOnboardingState()

  const toggleFeature = (featureName: string) => {
    const currentFeatures = contentArchitecture.features || []
    const newFeatures = currentFeatures.includes(featureName)
      ? currentFeatures.filter(f => f !== featureName)
      : [...currentFeatures, featureName]
    
    updateContentArchitecture({ features: newFeatures })
  }

  const allFeatures = [...basicFeatures, ...advancedFeatures]
  const selectedFeatures = contentArchitecture.features || []

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
          ¿Qué funcionalidades necesitas?
        </h3>
        <p className="text-sm text-gray-400">
          Selecciona las características para tu sitio
        </p>
      </motion.div>

      {/* Funcionalidades básicas */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-3"
      >
        <h4 className="text-sm font-medium text-gray-300 flex items-center space-x-2">
          <span>⚡</span>
          <span>Funcionalidades básicas</span>
          <span className="text-xs text-gray-500">(recomendadas)</span>
        </h4>
        
        <div className="grid grid-cols-1 gap-3">
          {basicFeatures.map((feature, index) => {
            const isSelected = selectedFeatures.includes(feature.name)
            
            return (
              <motion.button
                key={feature.name}
                onClick={() => toggleFeature(feature.name)}
                className={`p-4 rounded-xl border-2 transition-all text-left relative overflow-hidden ${
                  isSelected
                    ? 'border-blue-500 bg-blue-500/10 text-white'
                    : 'border-gray-700 hover:border-gray-600 text-gray-300'
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.05 }}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                {/* Gradient background cuando está seleccionado */}
                {isSelected && (
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-5`} />
                )}
                
                <div className="relative z-10 flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-lg shadow-sm`}>
                    {feature.icon}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-sm">{feature.name}</div>
                    <div className="text-xs opacity-70">{feature.desc}</div>
                  </div>
                  {isSelected && (
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs">
                      ✓
                    </div>
                  )}
                </div>
              </motion.button>
            )
          })}
        </div>
      </motion.div>

      {/* Funcionalidades avanzadas */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="space-y-3"
      >
        <h4 className="text-sm font-medium text-gray-300 flex items-center space-x-2">
          <span>🚀</span>
          <span>Funcionalidades avanzadas</span>
          <span className="text-xs text-gray-500">(opcionales)</span>
        </h4>
        
        <div className="grid grid-cols-2 gap-3 max-h-80 overflow-y-auto">
          {advancedFeatures.map((feature, index) => {
            const isSelected = selectedFeatures.includes(feature.name)
            
            return (
              <motion.button
                key={feature.name}
                onClick={() => toggleFeature(feature.name)}
                className={`p-4 rounded-xl border-2 transition-all text-left relative overflow-hidden ${
                  isSelected
                    ? 'border-blue-500 bg-blue-500/10 text-white'
                    : 'border-gray-700 hover:border-gray-600 text-gray-300'
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.03 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Gradient background cuando está seleccionado */}
                {isSelected && (
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-5`} />
                )}
                
                <div className="relative z-10 flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${feature.color} flex items-center justify-center text-lg shadow-sm`}>
                    {feature.icon}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-sm">{feature.name}</div>
                    <div className="text-xs opacity-70">{feature.desc}</div>
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
        </div>
      </motion.div>

      {/* Resumen de funcionalidades seleccionadas */}
      {selectedFeatures.length > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          className="p-4 bg-gradient-to-br from-blue-500/5 to-purple-500/5 border border-blue-500/20 rounded-xl"
        >
          <div className="flex items-center space-x-2 mb-3">
            <span>🛠️</span>
            <span className="font-semibold text-white">
              {selectedFeatures.length} funcionalidad{selectedFeatures.length !== 1 ? 'es' : ''} seleccionada{selectedFeatures.length !== 1 ? 's' : ''}:
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {selectedFeatures.map((featureName, index) => {
              const featureData = allFeatures.find(f => f.name === featureName)
              return (
                <div
                  key={index}
                  className="flex items-center space-x-2 bg-gray-800/50 px-3 py-1 rounded-full text-sm"
                >
                  <span>{featureData?.icon}</span>
                  <span className="text-gray-300">{featureName}</span>
                </div>
              )
            })}
          </div>
        </motion.div>
      )}

      {/* Información adicional */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="text-center text-xs text-gray-500 bg-gray-900/50 p-3 rounded-xl"
      >
        💡 Las funcionalidades avanzadas pueden agregarse después según necesidades específicas
      </motion.div>
    </div>
  )
}