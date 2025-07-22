import React from 'react'
import { motion } from 'framer-motion'
import { useOnboardingState } from '@/hooks/useOnboardingState'

const logoOptions = [
  {
    value: 'existing',
    title: 'Ya tengo un logo',
    icon: '✅',
    desc: 'Tengo un logotipo listo para usar',
    color: 'from-green-500 to-emerald-500',
    benefits: ['Integración directa', 'Consistencia de marca', 'Implementación rápida']
  },
  {
    value: 'needs-design',
    title: 'Necesito un logo nuevo',
    icon: '🎨',
    desc: 'Quiero que diseñen un logotipo desde cero',
    color: 'from-purple-500 to-pink-500',
    benefits: ['Diseño personalizado', 'Alineado con el sitio', 'Marca cohesiva']
  },
  {
    value: 'needs-update',
    title: 'Tengo logo pero necesita actualización',
    icon: '🔄',
    desc: 'Mi logo actual necesita mejoras o modernización',
    color: 'from-blue-500 to-cyan-500',
    benefits: ['Mantiene reconocimiento', 'Versión mejorada', 'Actualizado y moderno']
  }
]

export default function Step14Logo() {
  const { brandDesign, updateBrandDesign } = useOnboardingState()

  const handleLogoSelect = (logoStatus: string) => {
    updateBrandDesign({ logoStatus: logoStatus as any })
  }

  const getSelectedOption = () => {
    return logoOptions.find(option => option.value === brandDesign.logoStatus)
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
          ¿Qué pasa con tu logo?
        </h3>
        <p className="text-sm text-gray-400">
          Esto nos ayuda a planificar la identidad visual
        </p>
      </motion.div>

      {/* Opciones de logo */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-4"
      >
        {logoOptions.map((option, index) => {
          const isSelected = brandDesign.logoStatus === option.value
          
          return (
            <motion.button
              key={option.value}
              onClick={() => handleLogoSelect(option.value)}
              className={`w-full p-6 rounded-xl border-2 transition-all text-left relative overflow-hidden ${
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
                <div className={`absolute inset-0 bg-gradient-to-br ${option.color} opacity-5`} />
              )}
              
              <div className="relative z-10">
                <div className="flex items-start space-x-4">
                  {/* Icono */}
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${option.color} flex items-center justify-center text-xl shadow-lg flex-shrink-0`}>
                    {option.icon}
                  </div>
                  
                  {/* Contenido */}
                  <div className="flex-1">
                    <h4 className="font-semibold text-white mb-2">{option.title}</h4>
                    <p className="text-sm text-gray-400 mb-3">{option.desc}</p>
                    
                    {/* Beneficios */}
                    <div className="space-y-1">
                      {option.benefits.map((benefit, idx) => (
                        <div key={idx} className="text-xs text-gray-500 flex items-center">
                          <span className={`w-1 h-1 rounded-full mr-2 bg-gradient-to-r ${option.color}`}></span>
                          {benefit}
                        </div>
                      ))}
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

      {/* Información específica según selección */}
      {getSelectedOption() && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="p-4 bg-gradient-to-br from-blue-500/5 to-purple-500/5 border border-blue-500/20 rounded-xl"
        >
          <div className="flex items-center space-x-2 mb-3">
            <span>{getSelectedOption()!.icon}</span>
            <span className="font-semibold text-white">Información importante:</span>
          </div>
          
          <div className="text-sm text-gray-300">
            {brandDesign.logoStatus === 'existing' && (
              <div>
                <p className="mb-2">
                  <span className="text-blue-400">Perfecto:</span> Podrás subir tu logo durante el proceso de desarrollo.
                </p>
                <p className="text-xs text-gray-400">
                  Asegúrate de tener tu logo en formato vectorial (SVG, AI, EPS) para mejor calidad.
                </p>
              </div>
            )}
            
            {brandDesign.logoStatus === 'needs-design' && (
              <div>
                <p className="mb-2">
                  <span className="text-blue-400">Incluido:</span> Diseñaremos un logo personalizado que combine con tu sitio web.
                </p>
                <p className="text-xs text-gray-400">
                  El diseño del logo se realizará en paralelo con el desarrollo del sitio para máxima coherencia.
                </p>
              </div>
            )}
            
            {brandDesign.logoStatus === 'needs-update' && (
              <div>
                <p className="mb-2">
                  <span className="text-blue-400">Modernización:</span> Actualizaremos tu logo actual mantiendo su esencia.
                </p>
                <p className="text-xs text-gray-400">
                  Comparte tu logo actual y te propondremos una versión mejorada y moderna.
                </p>
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* Mockup visual */}
      {getSelectedOption() && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gray-900 rounded-lg p-4 border border-gray-700"
        >
          <div className="text-xs text-gray-400 mb-3">Vista previa en el sitio:</div>
          <div className="bg-gray-800 rounded p-3 space-y-2">
            {/* Header mockup */}
            <div className="flex items-center space-x-3">
              <div className={`w-8 h-8 rounded bg-gradient-to-br ${getSelectedOption()!.color} flex items-center justify-center text-white text-xs font-bold`}>
                {brandDesign.logoStatus === 'existing' ? 'L' : 
                 brandDesign.logoStatus === 'needs-design' ? '?' : 'L+'}
              </div>
              <div className="flex-1">
                <div className="bg-gray-600 h-2 rounded w-24"></div>
              </div>
            </div>
            
            {/* Content mockup */}
            <div className="space-y-1 pt-2">
              <div className="bg-gray-700 h-1 rounded w-full"></div>
              <div className="bg-gray-700 h-1 rounded w-3/4"></div>
              <div className="bg-gray-700 h-1 rounded w-1/2"></div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Información adicional */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="text-center text-xs text-gray-500 bg-gray-900/50 p-3 rounded-xl"
      >
        💡 Un buen logo es esencial para la identidad de tu marca y se integra en todo el sitio
      </motion.div>
    </div>
  )
}