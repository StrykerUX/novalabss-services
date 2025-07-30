import React from 'react'
import { motion } from 'framer-motion'
import { useOnboardingState } from '@/hooks/useOnboardingState'

const contentOptions = [
  {
    key: 'hasLogo',
    title: 'Logo',
    icon: '🎨',
    desc: 'Logotipo de tu empresa',
    color: 'from-purple-500 to-pink-500'
  },
  {
    key: 'hasPhotos',
    title: 'Fotografías',
    icon: '📸',
    desc: 'Fotos de productos, servicios o equipo',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    key: 'hasVideos',
    title: 'Videos',
    icon: '🎬',
    desc: 'Material audiovisual promocional',
    color: 'from-green-500 to-emerald-500'
  },
  {
    key: 'hasTexts',
    title: 'Textos',
    icon: '📝',
    desc: 'Descripciones, biografías, contenido escrito',
    color: 'from-orange-500 to-red-500'
  }
]

const copywritingOptions = [
  {
    value: 'complete',
    title: 'Tengo todo el contenido',
    icon: '✅',
    desc: 'Textos, descripciones y copy listo',
    color: 'from-green-500 to-emerald-500'
  },
  {
    value: 'partial',
    title: 'Tengo contenido parcial',
    icon: '📝',
    desc: 'Algunos textos, necesito ayuda con el resto',
    color: 'from-yellow-500 to-orange-500'
  },
  {
    value: 'none',
    title: 'Necesito ayuda con el copywriting',
    icon: '🤝',
    desc: 'Necesito que creen todos los textos',
    color: 'from-blue-500 to-purple-500'
  }
]

export default function Step11Content() {
  const { contentArchitecture, updateContentArchitecture } = useOnboardingState()

  const toggleContent = (key: string) => {
    const currentMultimedia = contentArchitecture.multimedia || {}
    updateContentArchitecture({
      multimedia: {
        ...currentMultimedia,
        [key]: !currentMultimedia[key as keyof typeof currentMultimedia]
      }
    })
  }

  const handleCopywritingChange = (value: string) => {
    updateContentArchitecture({
      existingContent: value === 'complete',
      needsCopywriting: value === 'none'
    })
  }

  const getCurrentCopywritingValue = () => {
    if (contentArchitecture.existingContent) return 'complete'
    if (contentArchitecture.needsCopywriting) return 'none'
    return 'partial'
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
          ¿Qué contenido tienes listo?
        </h3>
        <p className="text-sm text-gray-400">
          Esto nos ayuda a planificar mejor tu sitio
        </p>
      </motion.div>

      {/* Contenido multimedia */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-3"
      >
        <h4 className="text-sm font-medium text-gray-300 flex items-center space-x-2">
          <span>🎯</span>
          <span>Material multimedia</span>
        </h4>
        
        <div className="grid grid-cols-2 gap-3">
          {contentOptions.map((option, index) => {
            const isSelected = contentArchitecture.multimedia?.[option.key as keyof typeof contentArchitecture.multimedia]
            
            return (
              <motion.button
                key={option.key}
                onClick={() => toggleContent(option.key)}
                className={`p-4 rounded-xl border-2 transition-all text-left relative overflow-hidden ${
                  isSelected
                    ? 'border-green-500 bg-green-500/10 text-white'
                    : 'border-gray-700 hover:border-gray-600 text-gray-300'
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.05 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Gradient background cuando está seleccionado */}
                {isSelected && (
                  <div className={`absolute inset-0 bg-gradient-to-br ${option.color} opacity-5`} />
                )}
                
                <div className="relative z-10 flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${option.color} flex items-center justify-center text-lg shadow-sm`}>
                    {option.icon}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-sm">{option.title}</div>
                    <div className="text-xs opacity-70">{option.desc}</div>
                  </div>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-xs ${
                    isSelected ? 'bg-green-500' : 'bg-gray-600'
                  }`}>
                    {isSelected ? '✓' : '○'}
                  </div>
                </div>
              </motion.button>
            )
          })}
        </div>
      </motion.div>

      {/* Estado del copywriting */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="space-y-3"
      >
        <h4 className="text-sm font-medium text-gray-300 flex items-center space-x-2">
          <span>✍️</span>
          <span>Contenido escrito</span>
        </h4>
        
        <div className="space-y-3">
          {copywritingOptions.map((option, index) => {
            const isSelected = getCurrentCopywritingValue() === option.value
            
            return (
              <motion.button
                key={option.value}
                onClick={() => handleCopywritingChange(option.value)}
                className={`w-full p-4 rounded-xl border-2 transition-all text-left relative overflow-hidden ${
                  isSelected
                    ? 'border-blue-500 bg-blue-500/10 text-white'
                    : 'border-gray-700 hover:border-gray-600 text-gray-300'
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                {/* Gradient background cuando está seleccionado */}
                {isSelected && (
                  <div className={`absolute inset-0 bg-gradient-to-br ${option.color} opacity-5`} />
                )}
                
                <div className="relative z-10 flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${option.color} flex items-center justify-center text-lg shadow-sm`}>
                    {option.icon}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-sm">{option.title}</div>
                    <div className="text-xs opacity-70">{option.desc}</div>
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

      {/* Resumen del contenido */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6 }}
        className="p-4 bg-gradient-to-br from-blue-500/5 to-purple-500/5 border border-blue-500/20 rounded-xl"
      >
        <div className="flex items-center space-x-2 mb-3">
          <span>📦</span>
          <span className="font-semibold text-white">Resumen de contenido:</span>
        </div>
        
        <div className="space-y-2 text-sm">
          {/* Material multimedia */}
          <div className="flex items-center space-x-2">
            <span className="text-blue-400">Material disponible:</span>
            <div className="flex flex-wrap gap-1">
              {contentOptions.map((option) => {
                const hasContent = contentArchitecture.multimedia?.[option.key as keyof typeof contentArchitecture.multimedia]
                return (
                  <span
                    key={option.key}
                    className={`text-xs px-2 py-1 rounded-full ${
                      hasContent ? 'bg-green-500/20 text-green-400' : 'bg-gray-800 text-gray-500'
                    }`}
                  >
                    {option.icon} {option.title}
                  </span>
                )
              })}
            </div>
          </div>
          
          {/* Estado del copywriting */}
          <div className="flex items-center space-x-2">
            <span className="text-blue-400">Copywriting:</span>
            <span className="text-gray-300">
              {copywritingOptions.find(opt => opt.value === getCurrentCopywritingValue())?.title}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Información adicional */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="text-center text-xs text-gray-500 bg-gray-900/50 p-3 rounded-xl"
      >
        💡 No te preocupes si no tienes todo listo, podemos ayudarte a crear el contenido faltante
      </motion.div>
    </div>
  )
}