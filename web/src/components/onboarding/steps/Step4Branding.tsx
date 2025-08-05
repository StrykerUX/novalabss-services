'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useOptimizedOnboarding } from '@/hooks/useOptimizedOnboarding'
import { BRAND_STYLES, SOCIAL_NETWORKS, BRAND_PERSONALITY_OPTIONS } from '@/lib/onboarding-config'

export default function Step4Branding() {
  const { 
    branding, 
    updateBranding, 
    markStepCompleted, 
    nextStep 
  } = useOptimizedOnboarding()

  const [formData, setFormData] = useState({
    brandStyles: branding.brandStyles || [],
    socialMedia: {
      currentWebsite: branding.socialMedia?.currentWebsite || '',
      facebook: branding.socialMedia?.facebook || '',
      additional: {
        platform: branding.socialMedia?.additional?.platform || '',
        url: branding.socialMedia?.additional?.url || ''
      }
    },
    brandPersonality: {
      feeling: branding.brandPersonality?.feeling || '',
      word: branding.brandPersonality?.word || ''
    }
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleStyleToggle = (styleId: string) => {
    setFormData(prev => {
      const currentStyles = prev.brandStyles
      const isSelected = currentStyles.includes(styleId)
      
      if (isSelected) {
        // Remove style
        return {
          ...prev,
          brandStyles: currentStyles.filter(id => id !== styleId)
        }
      } else {
        // Add style (max 2)
        if (currentStyles.length >= 2) {
          // Replace first style with new one
          return {
            ...prev,
            brandStyles: [currentStyles[1], styleId]
          }
        } else {
          return {
            ...prev,
            brandStyles: [...currentStyles, styleId]
          }
        }
      }
    })
    
    if (errors.brandStyles) {
      setErrors(prev => ({ ...prev, brandStyles: '' }))
    }
  }

  const handleSocialMediaChange = (field: string, value: string) => {
    if (field === 'additionalPlatform') {
      setFormData(prev => ({
        ...prev,
        socialMedia: {
          ...prev.socialMedia,
          additional: { ...(prev.socialMedia.additional || {}), platform: value, url: '' }
        }
      }))
    } else if (field === 'additionalUrl') {
      setFormData(prev => ({
        ...prev,
        socialMedia: {
          ...prev.socialMedia,
          additional: { ...(prev.socialMedia.additional || {}), url: value }
        }
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        socialMedia: {
          ...prev.socialMedia,
          [field]: value
        }
      }))
    }
  }

  const handlePersonalityChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      brandPersonality: {
        ...prev.brandPersonality,
        [field]: value
      }
    }))
    
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (formData.brandStyles.length === 0) {
      newErrors.brandStyles = 'Selecciona al menos un estilo de marca'
    }

    if (!formData.brandPersonality.feeling.trim()) {
      newErrors.feeling = 'Describe cómo quieres que se sientan los clientes'
    }

    if (!formData.brandPersonality.word) {
      newErrors.word = 'Selecciona una palabra que describa tu negocio'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleContinue = () => {
    if (!validateForm()) return

    // Guardar datos
    updateBranding({
      brandStyles: formData.brandStyles,
      socialMedia: formData.socialMedia,
      brandPersonality: formData.brandPersonality
    })

    markStepCompleted(4)
    nextStep()
  }

  return (
    <div className="max-w-4xl mx-auto">
      
      {/* Header */}
      <div className="text-center mb-8">
        <motion.div 
          className="text-4xl mb-4"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', delay: 0.2 }}
        >
          🎨
        </motion.div>
        
        <h2 className="text-2xl lg:text-3xl font-bold text-white mb-2">
          Identidad Visual
        </h2>
        
        <p className="text-gray-400 text-lg">
          Define el estilo y personalidad de tu marca
        </p>
      </div>

      <div className="space-y-8">
        
        {/* Estilos de marca */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-xl font-semibold text-white mb-4">
            ¿Qué estilo representa mejor tu marca? * 
            <span className="text-sm font-normal text-gray-400 ml-2">
              (Puedes seleccionar hasta 2)
            </span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {BRAND_STYLES.map((style, index) => {
              const isSelected = formData.brandStyles.includes(style.id)
              return (
                <motion.button
                  key={style.id}
                  onClick={() => handleStyleToggle(style.id)}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    isSelected
                      ? 'bg-blue-500/20 border-blue-500/50 text-white'
                      : 'bg-gray-800/50 border-gray-700/50 text-gray-300 hover:border-gray-600'
                  }`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="text-center">
                    <div className="text-3xl mb-2">{style.emoji}</div>
                    <h4 className="font-semibold text-lg mb-1">{style.name}</h4>
                    <p className="text-xs opacity-75">{style.description}</p>
                  </div>
                </motion.button>
              )
            })}
          </div>
          
          {errors.brandStyles && (
            <p className="text-red-400 text-sm mt-2">{errors.brandStyles}</p>
          )}
          
          {formData.brandStyles.length > 0 && (
            <div className="mt-4 p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl">
              <p className="text-blue-400 text-sm">
                <span className="font-medium">Estilos seleccionados:</span> {' '}
                {formData.brandStyles.map(id => {
                  const style = BRAND_STYLES.find(s => s.id === id)
                  return style?.name
                }).join(' + ')}
              </p>
            </div>
          )}
        </motion.div>

        {/* Redes sociales */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h3 className="text-xl font-semibold text-white mb-4">
            Redes sociales (opcional)
          </h3>
          
          <div className="space-y-4">
            {/* Sitio web actual */}
            <div>
              <label className="block text-white font-medium mb-2">
                Sitio web actual
              </label>
              <input
                type="url"
                value={formData.socialMedia.currentWebsite}
                onChange={(e) => handleSocialMediaChange('currentWebsite', e.target.value)}
                placeholder="https://tuempresa.com"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
              />
            </div>

            {/* Facebook */}
            <div>
              <label className="block text-white font-medium mb-2">
                Facebook
              </label>
              <input
                type="url"
                value={formData.socialMedia.facebook}
                onChange={(e) => handleSocialMediaChange('facebook', e.target.value)}
                placeholder="https://facebook.com/tu-empresa"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
              />
            </div>

            {/* Red social adicional */}
            <div>
              <label className="block text-white font-medium mb-2">
                Red social adicional
              </label>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <select
                  value={formData.socialMedia.additional?.platform || ''}
                  onChange={(e) => handleSocialMediaChange('additionalPlatform', e.target.value)}
                  className="px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                >
                  <option value="">Selecciona red social</option>
                  {SOCIAL_NETWORKS.map(network => (
                    <option key={network.id} value={network.id}>{network.name}</option>
                  ))}
                </select>

                <input
                  type="url"
                  value={formData.socialMedia.additional?.url || ''}
                  onChange={(e) => handleSocialMediaChange('additionalUrl', e.target.value)}
                  placeholder={
                    formData.socialMedia.additional?.platform 
                      ? SOCIAL_NETWORKS.find(n => n.id === formData.socialMedia.additional.platform)?.placeholder || 'https://...'
                      : 'Primero selecciona una red social'
                  }
                  disabled={!formData.socialMedia.additional?.platform}
                  className="px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Personalidad de marca */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <h3 className="text-xl font-semibold text-white mb-6">
            Personalidad de marca *
          </h3>
          
          <div className="space-y-6">
            {/* Pregunta abierta */}
            <div>
              <label className="block text-white font-medium mb-2">
                ¿Cómo quieres que los clientes se sientan al ver tu negocio? *
              </label>
              <textarea
                value={formData.brandPersonality.feeling}
                onChange={(e) => handlePersonalityChange('feeling', e.target.value)}
                placeholder="Ej: Quiero que se sientan confiados de que van a recibir un servicio profesional y de calidad..."
                rows={4}
                className={`w-full px-4 py-3 bg-gray-800 border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all resize-none ${
                  errors.feeling 
                    ? 'border-red-500 focus:ring-red-500/20' 
                    : 'border-gray-700 focus:border-blue-500 focus:ring-blue-500/20'
                }`}
              />
              {errors.feeling && (
                <p className="text-red-400 text-sm mt-1">{errors.feeling}</p>
              )}
            </div>

            {/* Pregunta cerrada */}
            <div>
              <label className="block text-white font-medium mb-4">
                ¿Qué palabra describe mejor tu negocio? *
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {BRAND_PERSONALITY_OPTIONS.map((option, index) => (
                  <motion.button
                    key={option}
                    onClick={() => handlePersonalityChange('word', option)}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      formData.brandPersonality.word === option
                        ? 'bg-blue-500/20 border-blue-500/50 text-white'
                        : 'bg-gray-800/50 border-gray-700/50 text-gray-300 hover:border-gray-600'
                    }`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.9 + index * 0.05 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="font-medium text-sm">{option}</span>
                  </motion.button>
                ))}
              </div>
              {errors.word && (
                <p className="text-red-400 text-sm mt-2">{errors.word}</p>
              )}
            </div>
          </div>
        </motion.div>

        {/* Resumen */}
        {(formData.brandStyles.length > 0 || formData.brandPersonality.feeling || formData.brandPersonality.word) && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1 }}
            className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-6"
          >
            <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
              <span>🎨</span>
              Resumen de identidad visual
            </h4>
            
            <div className="space-y-2 text-sm">
              {formData.brandStyles.length > 0 && (
                <p className="text-gray-300">
                  <span className="text-blue-400 font-medium">Estilos:</span> {' '}
                  {formData.brandStyles.map(id => {
                    const style = BRAND_STYLES.find(s => s.id === id)
                    return style?.name
                  }).join(' + ')}
                </p>
              )}
              
              {formData.brandPersonality.word && (
                <p className="text-gray-300">
                  <span className="text-blue-400 font-medium">Personalidad:</span> {' '}
                  {formData.brandPersonality.word}
                </p>
              )}
              
              {(formData.socialMedia.currentWebsite || formData.socialMedia.facebook || formData.socialMedia.additional.url) && (
                <p className="text-gray-300">
                  <span className="text-blue-400 font-medium">Redes sociales:</span> {' '}
                  {[
                    formData.socialMedia.currentWebsite && 'Sitio web',
                    formData.socialMedia.facebook && 'Facebook',
                    formData.socialMedia.additional?.url && formData.socialMedia.additional?.platform && SOCIAL_NETWORKS.find(n => n.id === formData.socialMedia.additional.platform)?.name
                  ].filter(Boolean).join(', ') || 'Ninguna configurada'}
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
          transition={{ delay: 1.1 }}
        >
          <button
            onClick={handleContinue}
            disabled={formData.brandStyles.length === 0 || !formData.brandPersonality.feeling || !formData.brandPersonality.word}
            className="w-full px-6 py-4 bg-blue-500 text-white rounded-xl font-semibold text-lg hover:bg-blue-600 disabled:bg-gray-700 disabled:cursor-not-allowed transition-all"
          >
            Continuar a Configuración Técnica 🌐
          </button>
        </motion.div>
      </div>
    </div>
  )
}