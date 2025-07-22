import React from 'react'
import { motion } from 'framer-motion'
import { useOnboardingState } from '@/hooks/useOnboardingState'

const styles = [
  {
    value: 'modern',
    title: 'Moderno',
    icon: '✨',
    desc: 'Limpio, minimalista, espacios amplios',
    features: ['Tipografía sans-serif', 'Espacios amplios', 'Colores vibrantes', 'Animaciones suaves'],
    color: 'from-blue-500 to-cyan-500',
    preview: {
      bg: 'bg-white',
      accent: 'bg-blue-500',
      text: 'text-gray-900',
      border: 'border-gray-200'
    }
  },
  {
    value: 'classic',
    title: 'Clásico',
    icon: '🏛️',
    desc: 'Elegante, tradicional, atemporal',
    features: ['Tipografía serif', 'Diseño estructurado', 'Colores sobrios', 'Elementos formales'],
    color: 'from-gray-600 to-gray-800',
    preview: {
      bg: 'bg-gray-50',
      accent: 'bg-gray-700',
      text: 'text-gray-800',
      border: 'border-gray-400'
    }
  },
  {
    value: 'minimalist',
    title: 'Minimalista',
    icon: '⚪',
    desc: 'Simple, enfocado, sin distracciones',
    features: ['Mucho espacio en blanco', 'Tipografía simple', 'Colores neutros', 'Elementos esenciales'],
    color: 'from-gray-400 to-gray-600',
    preview: {
      bg: 'bg-gray-100',
      accent: 'bg-gray-600',
      text: 'text-gray-700',
      border: 'border-gray-300'
    }
  },
  {
    value: 'bold',
    title: 'Audaz',
    icon: '🔥',
    desc: 'Llamativo, dinámico, impactante',
    features: ['Colores contrastantes', 'Tipografía bold', 'Elementos grandes', 'Diseño dinámico'],
    color: 'from-red-500 to-orange-500',
    preview: {
      bg: 'bg-red-50',
      accent: 'bg-red-600',
      text: 'text-red-900',
      border: 'border-red-300'
    }
  },
  {
    value: 'creative',
    title: 'Creativo',
    icon: '🎨',
    desc: 'Artístico, único, expresivo',
    features: ['Layouts únicos', 'Colores creativos', 'Elementos artísticos', 'Diseño experimental'],
    color: 'from-purple-500 to-pink-500',
    preview: {
      bg: 'bg-purple-50',
      accent: 'bg-purple-600',
      text: 'text-purple-900',
      border: 'border-purple-300'
    }
  }
]

export default function Step13Style() {
  const { brandDesign, updateBrandDesign } = useOnboardingState()

  const handleStyleSelect = (styleValue: string) => {
    updateBrandDesign({ style: styleValue as any })
  }

  const getSelectedStyle = () => {
    return styles.find(style => style.value === brandDesign.style)
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
          ¿Qué estilo visual prefieres?
        </h3>
        <p className="text-sm text-gray-400">
          Esto define la personalidad de tu sitio web
        </p>
      </motion.div>

      {/* Estilos */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 gap-4"
      >
        {styles.map((style, index) => {
          const isSelected = brandDesign.style === style.value
          
          return (
            <motion.button
              key={style.value}
              onClick={() => handleStyleSelect(style.value)}
              className={`p-5 rounded-xl border-2 transition-all text-left relative overflow-hidden ${
                isSelected
                  ? 'border-blue-500 bg-blue-500/10'
                  : 'border-gray-700 hover:border-gray-600'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              {/* Gradient background cuando está seleccionado */}
              {isSelected && (
                <div className={`absolute inset-0 bg-gradient-to-br ${style.color} opacity-5`} />
              )}
              
              <div className="relative z-10">
                <div className="flex items-start space-x-4">
                  {/* Icono y título */}
                  <div className="flex-shrink-0">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${style.color} flex items-center justify-center text-xl shadow-lg`}>
                      {style.icon}
                    </div>
                  </div>
                  
                  {/* Información */}
                  <div className="flex-1">
                    <h4 className="font-semibold text-white mb-1">{style.title}</h4>
                    <p className="text-sm text-gray-400 mb-3">{style.desc}</p>
                    
                    {/* Características */}
                    <div className="grid grid-cols-2 gap-1 mb-3">
                      {style.features.map((feature, idx) => (
                        <div key={idx} className="text-xs text-gray-500 flex items-center">
                          <span className="w-1 h-1 bg-gray-500 rounded-full mr-2"></span>
                          {feature}
                        </div>
                      ))}
                    </div>
                    
                    {/* Preview mockup */}
                    <div className="bg-gray-900 rounded-lg p-3 border border-gray-700">
                      <div className="text-xs text-gray-400 mb-2">Vista previa:</div>
                      <div className={`${style.preview.bg} rounded p-2 space-y-1`}>
                        <div className={`${style.preview.accent} h-2 rounded w-3/4`} />
                        <div className={`${style.preview.border} border-l-2 pl-2`}>
                          <div className="bg-gray-300 h-1 rounded w-full mb-1" />
                          <div className="bg-gray-400 h-1 rounded w-2/3" />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Checkmark */}
                  {isSelected && (
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs">
                      ✓
                    </div>
                  )}
                </div>
              </div>
            </motion.button>
          )
        })}
      </motion.div>

      {/* Información del estilo seleccionado */}
      {getSelectedStyle() && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="p-4 bg-gradient-to-br from-blue-500/5 to-purple-500/5 border border-blue-500/20 rounded-xl"
        >
          <div className="flex items-center space-x-2 mb-3">
            <span>{getSelectedStyle()!.icon}</span>
            <span className="font-semibold text-white">Estilo seleccionado:</span>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${getSelectedStyle()!.color} flex items-center justify-center text-lg shadow-sm`}>
                {getSelectedStyle()!.icon}
              </div>
              <div>
                <div className="font-medium text-white">{getSelectedStyle()!.title}</div>
                <div className="text-sm text-gray-400">{getSelectedStyle()!.desc}</div>
              </div>
            </div>
            
            <div className="text-sm text-gray-300">
              <span className="text-blue-400">Características:</span> {getSelectedStyle()!.features.join(', ')}
            </div>
          </div>
        </motion.div>
      )}

      {/* Información adicional */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="text-center text-xs text-gray-500 bg-gray-900/50 p-3 rounded-xl"
      >
        💡 El estilo se puede refinar durante el proceso de diseño según tu feedback
      </motion.div>
    </div>
  )
}