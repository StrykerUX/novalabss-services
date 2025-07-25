'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useOptimizedOnboarding } from '@/hooks/useOptimizedOnboarding'

const INDUSTRIES = [
  'Tecnología', 'Salud y Bienestar', 'Educación', 'Retail/E-commerce',
  'Alimentación y Bebidas', 'Servicios Profesionales', 'Inmobiliaria',
  'Turismo y Hospitalidad', 'Manufactura', 'Finanzas', 'Arte y Entretenimiento',
  'Deportes y Fitness', 'Belleza y Cuidado Personal', 'Automotriz',
  'Construcción', 'Consultoría', 'Otro'
]

const COMPANY_SIZES = [
  { value: 'freelancer', label: 'Freelancer / Independiente', emoji: '👤' },
  { value: 'startup', label: 'Startup (2-10 empleados)', emoji: '🚀' },
  { value: 'pyme', label: 'PyME (11-50 empleados)', emoji: '🏢' },
  { value: 'empresa', label: 'Empresa (50+ empleados)', emoji: '🏭' }
]

const COUNTRIES = [
  'México', 'Argentina', 'Colombia', 'Chile', 'Perú', 'España',
  'Estados Unidos', 'Canadá', 'Brasil', 'Ecuador', 'Uruguay',
  'Costa Rica', 'Guatemala', 'Panamá', 'Otro'
]

export default function Step1Business() {
  const { 
    business, 
    updateBusiness, 
    markStepCompleted, 
    nextStep 
  } = useOptimizedOnboarding()

  const [formData, setFormData] = useState({
    name: business.name || '',
    industry: business.industry || '',
    customIndustry: business.customIndustry || '',
    size: business.size || '',
    country: business.location?.country || '',
    region: business.location?.region || '',
    city: business.location?.city || ''
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    // Auto-detectar región basada en el país
    if (formData.country) {
      const latinCountries = [
        'México', 'Argentina', 'Colombia', 'Chile', 'Perú', 'Ecuador', 
        'Uruguay', 'Costa Rica', 'Guatemala', 'Panamá', 'Brasil'
      ]
      
      const detectedRegion = latinCountries.includes(formData.country) ? 'latam' : 'international'
      
      if (detectedRegion !== formData.region) {
        setFormData(prev => ({ ...prev, region: detectedRegion }))
      }
    }
  }, [formData.country])

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    
    // Limpiar error del campo
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'El nombre del negocio es requerido'
    }

    if (!formData.industry) {
      newErrors.industry = 'Selecciona tu industria'
    }

    if (formData.industry === 'Otro' && !formData.customIndustry.trim()) {
      newErrors.customIndustry = 'Especifica tu industria'
    }

    if (!formData.size) {
      newErrors.size = 'Selecciona el tamaño de tu empresa'
    }

    if (!formData.country) {
      newErrors.country = 'Selecciona tu país'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleContinue = () => {
    if (!validateForm()) return

    // Guardar datos
    updateBusiness({
      name: formData.name.trim(),
      industry: formData.industry,
      customIndustry: formData.industry === 'Otro' ? formData.customIndustry.trim() : undefined,
      size: formData.size as any,
      location: {
        country: formData.country,
        region: formData.region,
        city: formData.city.trim() || undefined
      }
    })

    markStepCompleted(1)
    nextStep()
  }

  return (
    <div className="max-w-2xl mx-auto">
      
      {/* Header */}
      <div className="text-center mb-8">
        <motion.div 
          className="text-4xl mb-4"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', delay: 0.2 }}
        >
          🏢
        </motion.div>
        
        <h2 className="text-2xl lg:text-3xl font-bold text-white mb-2">
          Información de tu Negocio
        </h2>
        
        <p className="text-gray-400 text-lg">
          Cuéntanos sobre tu empresa para personalizar tu experiencia
        </p>
      </div>

      <div className="space-y-6">
        
        {/* Nombre del negocio */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <label className="block text-white font-semibold mb-2">
            Nombre de tu negocio *
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            placeholder="Ej: NovaLabs Design Studio"
            className={`w-full px-4 py-3 bg-gray-800 border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all ${
              errors.name 
                ? 'border-red-500 focus:ring-red-500/20' 
                : 'border-gray-700 focus:border-blue-500 focus:ring-blue-500/20'
            }`}
          />
          {errors.name && (
            <p className="text-red-400 text-sm mt-1">{errors.name}</p>
          )}
        </motion.div>

        {/* Industria */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <label className="block text-white font-semibold mb-2">
            ¿En qué industria trabajas? *
          </label>
          <select
            value={formData.industry}
            onChange={(e) => handleInputChange('industry', e.target.value)}
            className={`w-full px-4 py-3 bg-gray-800 border rounded-xl text-white focus:outline-none focus:ring-2 transition-all ${
              errors.industry 
                ? 'border-red-500 focus:ring-red-500/20' 
                : 'border-gray-700 focus:border-blue-500 focus:ring-blue-500/20'
            }`}
          >
            <option value="">Selecciona tu industria</option>
            {INDUSTRIES.map(industry => (
              <option key={industry} value={industry}>{industry}</option>
            ))}
          </select>
          {errors.industry && (
            <p className="text-red-400 text-sm mt-1">{errors.industry}</p>
          )}
        </motion.div>

        {/* Industria personalizada */}
        {formData.industry === 'Otro' && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.3 }}
          >
            <input
              type="text"
              value={formData.customIndustry}
              onChange={(e) => handleInputChange('customIndustry', e.target.value)}
              placeholder="Especifica tu industria"
              className={`w-full px-4 py-3 bg-gray-800 border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all ${
                errors.customIndustry 
                  ? 'border-red-500 focus:ring-red-500/20' 
                  : 'border-gray-700 focus:border-blue-500 focus:ring-blue-500/20'
              }`}
            />
            {errors.customIndustry && (
              <p className="text-red-400 text-sm mt-1">{errors.customIndustry}</p>
            )}
          </motion.div>
        )}

        {/* Tamaño de empresa */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <label className="block text-white font-semibold mb-4">
            Tamaño de tu empresa *
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {COMPANY_SIZES.map((size, index) => (
              <motion.button
                key={size.value}
                type="button"
                onClick={() => handleInputChange('size', size.value)}
                className={`p-4 rounded-xl border text-left transition-all ${
                  formData.size === size.value
                    ? 'bg-blue-500/20 border-blue-500/50 text-white'
                    : 'bg-gray-800/50 border-gray-700/50 text-gray-300 hover:border-gray-600'
                }`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{size.emoji}</span>
                  <div>
                    <div className="font-medium">{size.label}</div>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
          {errors.size && (
            <p className="text-red-400 text-sm mt-2">{errors.size}</p>
          )}
        </motion.div>

        {/* Ubicación */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <label className="block text-white font-semibold mb-2">
            Ubicación *
          </label>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* País */}
            <div>
              <select
                value={formData.country}
                onChange={(e) => handleInputChange('country', e.target.value)}
                className={`w-full px-4 py-3 bg-gray-800 border rounded-xl text-white focus:outline-none focus:ring-2 transition-all ${
                  errors.country 
                    ? 'border-red-500 focus:ring-red-500/20' 
                    : 'border-gray-700 focus:border-blue-500 focus:ring-blue-500/20'
                }`}
              >
                <option value="">Selecciona país</option>
                {COUNTRIES.map(country => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
              {errors.country && (
                <p className="text-red-400 text-sm mt-1">{errors.country}</p>
              )}
            </div>

            {/* Ciudad */}
            <div>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => handleInputChange('city', e.target.value)}
                placeholder="Ciudad (opcional)"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
              />
            </div>
          </div>

          {/* Región detectada */}
          {formData.region && (
            <div className="mt-3 p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
              <p className="text-blue-400 text-sm">
                <span className="font-medium">Región detectada:</span> {' '}
                {formData.region === 'latam' ? '🌎 Latinoamérica' : '🌍 Internacional'}
              </p>
            </div>
          )}
        </motion.div>

        {/* Continue Button */}
        <motion.div
          className="pt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <button
            onClick={handleContinue}
            disabled={!formData.name || !formData.industry || !formData.size || !formData.country}
            className="w-full px-6 py-4 bg-blue-500 text-white rounded-xl font-semibold text-lg hover:bg-blue-600 disabled:bg-gray-700 disabled:cursor-not-allowed transition-all"
          >
            Continuar a Objetivos 🎯
          </button>
        </motion.div>
      </div>
    </div>
  )
}