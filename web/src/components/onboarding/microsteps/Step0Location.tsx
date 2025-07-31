import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useOnboardingState } from '@/hooks/useOnboardingState'

const regions = [
  {
    id: 'latam',
    title: 'Latinoamérica',
    flag: '🌎',
    desc: 'Tu negocio está ubicado en Latinoamérica',
    color: 'from-green-500 to-emerald-500',
    countries: [
      'México',
      'Colombia', 
      'Argentina',
      'Chile',
      'Perú',
      'Ecuador',
      'Venezuela',
      'Uruguay',
      'Paraguay',
      'Bolivia',
      'Costa Rica',
      'Panamá',
      'Guatemala',
      'Honduras',
      'El Salvador',
      'Nicaragua',
      'República Dominicana',
      'Cuba',
      'Puerto Rico',
      'Otro país latinoamericano'
    ]
  },
  {
    id: 'international',
    title: 'Internacional',
    flag: '🌍',
    desc: 'Tu negocio está en Norteamérica, Europa u otra región',
    color: 'from-blue-500 to-purple-500',
    countries: [
      'Estados Unidos',
      'Canadá',
      'España',
      'Reino Unido',
      'Alemania',
      'Francia',
      'Italia',
      'Portugal',
      'Países Bajos',
      'Suecia',
      'Noruega',
      'Dinamarca',
      'Suiza',
      'Austria',
      'Australia',
      'Nueva Zelanda',
      'Japón',
      'Corea del Sur',
      'Singapur',
      'Brasil',
      'Otro país'
    ]
  }
]

const pricingInfo = {
  latam: {
    rocket: 1199,
    galaxy: 1999,
    currency: 'MXN',
    note: 'Precios fijos para México'
  },
  international: {
    rocket: 1199,
    galaxy: 1999,
    currency: 'MXN', 
    note: 'Precios fijos para México'
  }
}

export default function Step0Location() {
  const { businessInfo, updateBusinessInfo } = useOnboardingState()
  const [selectedRegion, setSelectedRegion] = useState<string>(businessInfo.businessRegion || '')
  const [selectedCountry, setSelectedCountry] = useState<string>(businessInfo.businessCountry || '')
  const [showCountries, setShowCountries] = useState<string>('')

  const handleRegionSelect = (regionId: string) => {
    setSelectedRegion(regionId)
    setSelectedCountry('')
    setShowCountries(regionId)
    updateBusinessInfo({ 
      businessRegion: regionId as 'latam' | 'international',
      businessCountry: ''
    })
  }

  const handleCountrySelect = (country: string) => {
    setSelectedCountry(country)
    updateBusinessInfo({ businessCountry: country })
  }

  const getCurrentPricing = () => {
    if (!selectedRegion) return null
    return pricingInfo[selectedRegion as keyof typeof pricingInfo]
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
          ¿Dónde está ubicado tu negocio?
        </h3>
        <p className="text-sm text-gray-400">
          Esto nos ayuda a personalizar la experiencia y los precios para tu región
        </p>
      </motion.div>

      {/* Selección de región */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-3"
      >
        {regions.map((region, index) => {
          const isSelected = selectedRegion === region.id
          
          return (
            <motion.button
              key={region.id}
              onClick={() => handleRegionSelect(region.id)}
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
                <div className={`absolute inset-0 bg-gradient-to-br ${region.color} opacity-5`} />
              )}
              
              <div className="relative z-10 flex items-center space-x-4">
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${region.color} flex items-center justify-center text-2xl shadow-lg`}>
                  {region.flag}
                </div>
                <div className="flex-1">
                  <h4 className="text-white font-semibold text-lg mb-1">{region.title}</h4>
                  <p className="text-gray-400 text-sm">{region.desc}</p>
                </div>
                {isSelected && (
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white">
                    ✓
                  </div>
                )}
              </div>
            </motion.button>
          )
        })}
      </motion.div>

      {/* Selección de país específico */}
      {showCountries && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-3"
        >
          <h4 className="text-sm font-medium text-gray-300 flex items-center space-x-2">
            <span>📍</span>
            <span>Selecciona tu país específico</span>
          </h4>
          
          <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto bg-gray-900/50 p-4 rounded-xl">
            {regions.find(r => r.id === showCountries)?.countries.map((country, index) => (
              <motion.button
                key={country}
                onClick={() => handleCountrySelect(country)}
                className={`p-2 rounded-lg border transition-all text-sm text-left ${
                  selectedCountry === country
                    ? 'border-blue-500 bg-blue-500/10 text-white'
                    : 'border-gray-700 hover:border-gray-600 text-gray-300'
                }`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.05 * index }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {country}
                {selectedCountry === country && (
                  <span className="ml-2 text-blue-400">✓</span>
                )}
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Preview de precios */}
      {getCurrentPricing() && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="p-6 bg-gradient-to-br from-blue-500/5 to-purple-500/5 border border-blue-500/20 rounded-xl"
        >
          <div className="flex items-center space-x-2 mb-4">
            <span>💰</span>
            <span className="font-semibold text-white">Precios para tu región:</span>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-gray-800/50 rounded-lg">
              <div className="text-sm text-gray-400 mb-1">Plan Rocket</div>
              <div className="text-2xl font-bold text-white">
                ${getCurrentPricing()!.rocket}
                <span className="text-sm text-gray-400">/bimestre</span>
              </div>
            </div>
            <div className="text-center p-4 bg-gray-800/50 rounded-lg">
              <div className="text-sm text-gray-400 mb-1">Plan Galaxy</div>
              <div className="text-2xl font-bold text-white">
                ${getCurrentPricing()!.galaxy}
                <span className="text-sm text-gray-400">/bimestre</span>
              </div>
            </div>
          </div>
          
          <div className="mt-3 text-xs text-center text-gray-500">
            {getCurrentPricing()!.note}
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
        💡 Ofrecemos precios adaptados a cada región para hacer nuestros servicios más accesibles según el mercado local
      </motion.div>
    </div>
  )
}