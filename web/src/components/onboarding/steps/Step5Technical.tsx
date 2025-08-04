'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useOptimizedOnboarding } from '@/hooks/useOptimizedOnboarding'

export default function Step5Technical() {
  const { 
    technical, 
    updateTechnical, 
    markStepCompleted, 
    nextStep 
  } = useOptimizedOnboarding()

  const [formData, setFormData] = useState({
    hasDomain: technical.domain?.hasDomain ?? undefined,
    domainName: technical.domain?.domainName || '',
    needsHelp: technical.domain?.needsHelp || false
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleDomainChoice = (hasDomain: boolean) => {
    setFormData(prev => ({ 
      ...prev, 
      hasDomain,
      domainName: hasDomain ? prev.domainName : '',
      needsHelp: !hasDomain
    }))
    
    if (errors.hasDomain) {
      setErrors(prev => ({ ...prev, hasDomain: '' }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (formData.hasDomain === undefined) {
      newErrors.hasDomain = 'Indica si ya tienes un dominio'
    }

    if (formData.hasDomain && !formData.domainName.trim()) {
      newErrors.domainName = 'Escribe tu dominio actual'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleContinue = () => {
    if (!validateForm()) return

    // Guardar datos
    updateTechnical({
      domain: {
        hasDomain: formData.hasDomain!,
        domainName: formData.domainName.trim() || undefined,
        needsHelp: formData.needsHelp
      }
    })

    markStepCompleted(5)
    nextStep()
  }

  return (
    <div className="max-w-3xl mx-auto">
      
      {/* Header */}
      <div className="text-center mb-8">
        <motion.div 
          className="text-4xl mb-4"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', delay: 0.2 }}
        >
          🌐
        </motion.div>
        
        <h2 className="text-2xl lg:text-3xl font-bold text-white mb-2">
          Configuración Técnica
        </h2>
        
        <p className="text-gray-400 text-lg">
          Configuración de dominio para tu sitio web
        </p>
      </div>

      <div className="space-y-8">
        
        {/* Dominio */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-xl font-semibold text-white mb-4">
            ¿Ya tienes un dominio para tu sitio web? *
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <motion.button
              onClick={() => handleDomainChoice(true)}
              className={`p-6 rounded-xl border text-left transition-all ${
                formData.hasDomain === true
                  ? 'bg-green-500/20 border-green-500/50 text-white'
                  : 'bg-gray-800/50 border-gray-700/50 text-gray-300 hover:border-gray-600'
              }`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-start gap-4">
                <span className="text-3xl">✅</span>
                <div>
                  <h4 className="font-semibold text-lg mb-1">Tengo dominio</h4>
                  <p className="text-sm opacity-75">
                    Tengo un dominio registrado que quiero usar
                  </p>
                </div>
              </div>
            </motion.button>

            <motion.button
              onClick={() => handleDomainChoice(false)}
              className={`p-6 rounded-xl border text-left transition-all ${
                formData.hasDomain === false
                  ? 'bg-blue-500/20 border-blue-500/50 text-white'
                  : 'bg-gray-800/50 border-gray-700/50 text-gray-300 hover:border-gray-600'
              }`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-start gap-4">
                <span className="text-3xl">🆘</span>
                <div>
                  <h4 className="font-semibold text-lg mb-1">No tengo dominio</h4>
                  <p className="text-sm opacity-75">
                    Te ayudaremos a registrar el dominio perfecto
                  </p>
                </div>
              </div>
            </motion.button>
          </div>
          
          {errors.hasDomain && (
            <p className="text-red-400 text-sm mt-2">{errors.hasDomain}</p>
          )}
        </motion.div>

        {/* Campo de dominio si ya tiene */}
        {formData.hasDomain === true && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.3 }}
          >
            <label className="block text-white font-semibold mb-2">
              ¿Cuál es tu dominio actual? *
            </label>
            
            <input
              type="text"
              value={formData.domainName}
              onChange={(e) => setFormData(prev => ({ ...prev, domainName: e.target.value }))}
              placeholder="tuempresa.com"
              className={`w-full px-4 py-3 bg-gray-800 border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all ${
                errors.domainName 
                  ? 'border-red-500 focus:ring-red-500/20' 
                  : 'border-gray-700 focus:border-green-500 focus:ring-green-500/20'
              }`}
            />
            
            {errors.domainName && (
              <p className="text-red-400 text-sm mt-1">{errors.domainName}</p>
            )}
            
            <p className="text-gray-500 text-sm mt-2">
              Solo el nombre del dominio, sin https:// ni www
            </p>
          </motion.div>
        )}

        {/* Mensaje de ayuda si no tiene dominio */}
        {formData.hasDomain === false && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.3 }}
            className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-6"
          >
            <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
              <span>💡</span>
              Te ayudaremos con tu dominio
            </h4>
            <p className="text-gray-300 text-sm mb-3">
              No te preocupes, nuestro equipo te ayudará a:
            </p>
            <ul className="text-gray-300 text-sm space-y-1">
              <li>• Encontrar el nombre de dominio perfecto para tu negocio</li>
              <li>• Verificar disponibilidad y registrarlo</li>
              <li>• Configurar todo para que funcione con tu sitio web</li>
            </ul>
          </motion.div>
        )}

        {/* Resumen */}
        {formData.hasDomain !== undefined && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
            className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-6"
          >
            <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
              <span>📋</span>
              Configuración de dominio
            </h4>
            
            <div className="space-y-2 text-sm">
              <p className="text-gray-300">
                <span className="text-blue-400 font-medium">Dominio:</span> {' '}
                {formData.hasDomain 
                  ? `Usar dominio existente ${formData.domainName ? `(${formData.domainName})` : ''}` 
                  : 'Ayuda para registrar nuevo dominio'
                }
              </p>
            </div>
          </motion.div>
        )}

        {/* Continue Button */}
        <motion.div
          className="pt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <button
            onClick={handleContinue}
            disabled={formData.hasDomain === undefined}
            className="w-full px-6 py-4 bg-blue-500 text-white rounded-xl font-semibold text-lg hover:bg-blue-600 disabled:bg-gray-700 disabled:cursor-not-allowed transition-all"
          >
            Continuar a Confirmación ✅
          </button>
        </motion.div>
      </div>
    </div>
  )
}