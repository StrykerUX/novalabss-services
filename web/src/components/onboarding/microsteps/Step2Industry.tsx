import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useOnboardingState } from '@/hooks/useOnboardingState'

const industries = [
  { name: 'Tecnología', icon: '💻', desc: 'Software, apps, IT' },
  { name: 'Salud', icon: '🏥', desc: 'Médicos, clínicas, wellness' },
  { name: 'Educación', icon: '🎓', desc: 'Escuelas, cursos, formación' },
  { name: 'Retail', icon: '🛍️', desc: 'Tiendas, e-commerce' },
  { name: 'Restaurantes', icon: '🍽️', desc: 'Comida, delivery, cafeterías' },
  { name: 'Servicios Profesionales', icon: '💼', desc: 'Consultoría, legal, contabilidad' },
  { name: 'Bienes Raíces', icon: '🏠', desc: 'Inmobiliarias, propiedades' },
  { name: 'Turismo', icon: '✈️', desc: 'Viajes, hoteles, tours' },
  { name: 'Fitness', icon: '💪', desc: 'Gimnasios, entrenamiento' },
  { name: 'Belleza', icon: '💄', desc: 'Salones, spa, estética' },
  { name: 'Automoción', icon: '🚗', desc: 'Autos, repuestos, talleres' },
  { name: 'Construcción', icon: '🏗️', desc: 'Obra, materiales, arquitectura' },
  { name: 'Finanzas', icon: '💰', desc: 'Bancos, seguros, inversiones' },
  { name: 'Arte y Diseño', icon: '🎨', desc: 'Creatividad, diseño, arte' },
  { name: 'Entretenimiento', icon: '🎬', desc: 'Eventos, música, medios' },
  { name: 'Otro', icon: '📋', desc: 'Otra industria' }
]

export default function Step2Industry() {
  const { businessInfo, updateBusinessInfo } = useOnboardingState()
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    if (businessInfo.industry) {
      setSearchTerm(businessInfo.industry)
    }
  }, [businessInfo.industry])

  const filteredIndustries = industries.filter(industry =>
    industry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    industry.desc.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Búsqueda */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="space-y-3"
      >
        <label className="block text-sm font-medium text-gray-300">
          ¿En qué industria trabajas?
        </label>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar industria..."
          className="w-full px-4 py-4 bg-gray-900 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all text-lg"
          autoFocus
        />
      </motion.div>

      {/* Grid de industrias */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-2 gap-3 max-h-80 overflow-y-auto"
      >
        {filteredIndustries.map((industry, index) => (
          <motion.button
            key={industry.name}
            onClick={() => {
              updateBusinessInfo({ industry: industry.name })
              setSearchTerm(industry.name)
            }}
            className={`p-4 rounded-xl border-2 transition-all text-left ${
              businessInfo.industry === industry.name
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
              <div className="text-2xl">{industry.icon}</div>
              <div>
                <div className="font-semibold text-sm">{industry.name}</div>
                <div className="text-xs opacity-70">{industry.desc}</div>
              </div>
            </div>
          </motion.button>
        ))}
      </motion.div>

      {/* Preview seleccionado */}
      {businessInfo.industry && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-6 p-4 bg-gradient-to-br from-blue-500/5 to-purple-500/5 border border-blue-500/20 rounded-xl text-center"
        >
          <div className="flex items-center justify-center space-x-2 text-lg">
            <span>{industries.find(i => i.name === businessInfo.industry)?.icon}</span>
            <span className="font-semibold text-white">{businessInfo.industry}</span>
          </div>
        </motion.div>
      )}
    </div>
  )
}