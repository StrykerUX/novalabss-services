import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useOnboardingState } from '@/hooks/useOnboardingState'
import { BusinessInfo } from '@/types/onboarding'

const industries = [
  'Tecnología', 'Salud', 'Educación', 'Retail', 'Restaurantes', 'Servicios Profesionales',
  'Bienes Raíces', 'Turismo', 'Fitness', 'Belleza', 'Automoción', 'Construcción',
  'Finanzas', 'Arte y Diseño', 'Entretenimiento', 'Consultoría', 'E-commerce', 'Otro'
]

const businessSizes = [
  { value: 'freelancer', label: 'Freelancer / Independiente', desc: 'Trabajo por mi cuenta' },
  { value: 'startup', label: 'Startup', desc: 'Empresa emergente (1-10 empleados)' },
  { value: 'pyme', label: 'PYME', desc: 'Pequeña/mediana empresa (10-50 empleados)' },
  { value: 'empresa', label: 'Empresa', desc: 'Empresa establecida (50+ empleados)' }
]

export default function Step1BusinessInfo() {
  const { businessInfo, updateBusinessInfo } = useOnboardingState()
  const [searchTerm, setSearchTerm] = useState('')
  const [showIndustryDropdown, setShowIndustryDropdown] = useState(false)

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (!target.closest('.industry-dropdown-container')) {
        setShowIndustryDropdown(false)
      }
    }

    if (showIndustryDropdown && typeof document !== 'undefined') {
      document.addEventListener('click', handleClickOutside)
      return () => document.removeEventListener('click', handleClickOutside)
    }
  }, [showIndustryDropdown])

  const filteredIndustries = industries.filter(industry =>
    industry.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleInputChange = (field: keyof BusinessInfo, value: any) => {
    updateBusinessInfo({ [field]: value })
  }

  useEffect(() => {
    if (businessInfo.industry) {
      setSearchTerm(businessInfo.industry)
    }
  }, [businessInfo.industry])

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Nombre del Negocio */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="space-y-2"
      >
        <label className="block text-sm font-medium text-gray-300">
          Nombre del negocio/empresa *
        </label>
        <input
          type="text"
          value={businessInfo.name || ''}
          onChange={(e) => handleInputChange('name', e.target.value)}
          placeholder="Ej: NovaLabs, Consultoría García, etc."
          className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
        />
      </motion.div>

      {/* Industria/Sector */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-2 relative"
      >
        <label className="block text-sm font-medium text-gray-300">
          Industria/Sector *
        </label>
        <div className="relative industry-dropdown-container">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value)
              setShowIndustryDropdown(true)
            }}
            onFocus={() => setShowIndustryDropdown(true)}
            placeholder="Buscar o seleccionar industria..."
            className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
          />
          
          {showIndustryDropdown && (
            <div className="absolute z-10 w-full mt-1 bg-gray-800 border border-gray-700 rounded-lg shadow-lg max-h-60 overflow-y-auto">
              {filteredIndustries.map((industry) => (
                <button
                  key={industry}
                  onClick={() => {
                    handleInputChange('industry', industry)
                    setSearchTerm(industry)
                    setShowIndustryDropdown(false)
                  }}
                  className="w-full px-4 py-2 text-left text-white hover:bg-gray-700 transition-colors"
                >
                  {industry}
                </button>
              ))}
            </div>
          )}
        </div>
      </motion.div>

      {/* Tamaño del Negocio */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="space-y-3"
      >
        <label className="block text-sm font-medium text-gray-300">
          Tamaño del negocio *
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {businessSizes.map((size) => (
            <motion.button
              key={size.value}
              onClick={() => handleInputChange('size', size.value)}
              className={`p-4 rounded-lg border-2 transition-all text-left ${
                businessInfo.size === size.value
                  ? 'border-blue-500 bg-blue-500/10'
                  : 'border-gray-700 hover:border-gray-600'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="font-semibold text-white">{size.label}</div>
              <div className="text-sm text-gray-400">{size.desc}</div>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Ubicación */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="space-y-2"
      >
        <label className="block text-sm font-medium text-gray-300">
          Ubicación principal *
        </label>
        <input
          type="text"
          value={businessInfo.location || ''}
          onChange={(e) => handleInputChange('location', e.target.value)}
          placeholder="Ej: Ciudad de México, CDMX"
          className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
        />
      </motion.div>

      {/* Años Operando */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="space-y-2"
      >
        <label className="block text-sm font-medium text-gray-300">
          ¿Cuántos años llevas operando? *
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { value: 0, label: 'Nuevo' },
            { value: 1, label: '1-2 años' },
            { value: 3, label: '3-5 años' },
            { value: 6, label: '6+ años' }
          ].map((option) => (
            <motion.button
              key={option.value}
              onClick={() => handleInputChange('yearsOperating', option.value)}
              className={`p-3 rounded-lg border-2 transition-all ${
                businessInfo.yearsOperating === option.value
                  ? 'border-blue-500 bg-blue-500/10 text-white'
                  : 'border-gray-700 hover:border-gray-600 text-gray-300'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {option.label}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Preview Card */}
      {businessInfo.name && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 p-6 bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-xl"
        >
          <h3 className="text-lg font-semibold text-white mb-3">Vista previa:</h3>
          <div className="space-y-2 text-gray-300">
            <p><span className="text-blue-400">Empresa:</span> {businessInfo.name}</p>
            {businessInfo.industry && (
              <p><span className="text-blue-400">Industria:</span> {businessInfo.industry}</p>
            )}
            {businessInfo.size && (
              <p><span className="text-blue-400">Tamaño:</span> {businessSizes.find(s => s.value === businessInfo.size)?.label}</p>
            )}
            {businessInfo.location && (
              <p><span className="text-blue-400">Ubicación:</span> {businessInfo.location}</p>
            )}
            {businessInfo.yearsOperating !== undefined && (
              <p><span className="text-blue-400">Experiencia:</span> {businessInfo.yearsOperating === 0 ? 'Nuevo negocio' : `${businessInfo.yearsOperating}+ años`}</p>
            )}
          </div>
        </motion.div>
      )}
    </div>
  )
}

// Click outside handler se maneja con useEffect para evitar SSR issues