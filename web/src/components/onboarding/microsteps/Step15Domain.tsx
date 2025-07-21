import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useOnboardingState } from '@/hooks/useOnboardingState'

const domainOptions = [
  {
    value: 'existing',
    title: 'Ya tengo un dominio',
    icon: '✅',
    desc: 'Tengo un dominio registrado y listo para usar',
    color: 'from-green-500 to-emerald-500'
  },
  {
    value: 'new',
    title: 'Necesito un dominio nuevo',
    icon: '🆕',
    desc: 'Quiero registrar un dominio nuevo',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    value: 'help',
    title: 'Necesito ayuda para decidir',
    icon: '🤝',
    desc: 'No estoy seguro, necesito asesoría',
    color: 'from-purple-500 to-pink-500'
  }
]

const extensions = ['.com', '.mx', '.com.mx', '.org', '.net', '.info']

export default function Step15Domain() {
  const { technicalSetup, updateTechnicalSetup, businessInfo } = useOnboardingState()
  const [domainName, setDomainName] = useState('')
  const [selectedExtension, setSelectedExtension] = useState('.com')
  const [isChecking, setIsChecking] = useState(false)

  const handleDomainOptionChange = (option: string) => {
    updateTechnicalSetup({
      domain: {
        ...technicalSetup.domain,
        existing: option === 'existing',
        needsRegistration: option === 'new'
      }
    })
  }

  const handleExistingDomainChange = (domain: string) => {
    updateTechnicalSetup({
      domain: {
        ...technicalSetup.domain,
        name: domain,
        existing: true,
        needsRegistration: false
      }
    })
  }

  const checkDomainAvailability = async () => {
    setIsChecking(true)
    // Simular verificación de disponibilidad
    setTimeout(() => {
      setIsChecking(false)
      const fullDomain = domainName + selectedExtension
      updateTechnicalSetup({
        domain: {
          ...technicalSetup.domain,
          name: fullDomain,
          existing: false,
          needsRegistration: true
        }
      })
    }, 1500)
  }

  const suggestDomain = () => {
    if (businessInfo.name) {
      const suggestion = businessInfo.name
        .toLowerCase()
        .replace(/\s+/g, '')
        .replace(/[^a-z0-9]/g, '')
        .substring(0, 15)
      setDomainName(suggestion)
    }
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
          ¿Qué pasa con tu dominio?
        </h3>
        <p className="text-sm text-gray-400">
          Tu dirección web (ejemplo: tuempresa.com)
        </p>
      </motion.div>

      {/* Opciones de dominio */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-3"
      >
        {domainOptions.map((option, index) => {
          const isSelected = 
            (option.value === 'existing' && technicalSetup.domain?.existing) ||
            (option.value === 'new' && technicalSetup.domain?.needsRegistration) ||
            (option.value === 'help' && !technicalSetup.domain?.existing && !technicalSetup.domain?.needsRegistration)
          
          return (
            <motion.button
              key={option.value}
              onClick={() => handleDomainOptionChange(option.value)}
              className={`w-full p-4 rounded-xl border-2 transition-all text-left relative overflow-hidden ${
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
              
              <div className="relative z-10 flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${option.color} flex items-center justify-center text-lg shadow-sm`}>
                  {option.icon}
                </div>
                <div className="flex-1">
                  <div className="font-medium text-white">{option.title}</div>
                  <div className="text-sm text-gray-400">{option.desc}</div>
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
      </motion.div>

      {/* Dominio existente */}
      {technicalSetup.domain?.existing && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-3"
        >
          <h4 className="text-sm font-medium text-gray-300">Ingresa tu dominio actual</h4>
          <input
            type="text"
            value={technicalSetup.domain?.name || ''}
            onChange={(e) => handleExistingDomainChange(e.target.value)}
            placeholder="ejemplo: tuempresa.com"
            className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
          />
        </motion.div>
      )}

      {/* Dominio nuevo */}
      {technicalSetup.domain?.needsRegistration && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-4"
        >
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium text-gray-300">Buscar dominio disponible</h4>
            <button
              onClick={suggestDomain}
              className="text-xs text-blue-400 hover:text-blue-300 underline"
            >
              Sugerir basado en mi empresa
            </button>
          </div>
          
          <div className="flex space-x-2">
            <input
              type="text"
              value={domainName}
              onChange={(e) => setDomainName(e.target.value)}
              placeholder="nombreempresa"
              className="flex-1 px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
            />
            <select
              value={selectedExtension}
              onChange={(e) => setSelectedExtension(e.target.value)}
              className="px-3 py-3 bg-gray-900 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
            >
              {extensions.map(ext => (
                <option key={ext} value={ext}>{ext}</option>
              ))}
            </select>
          </div>
          
          <button
            onClick={checkDomainAvailability}
            disabled={!domainName || isChecking}
            className="w-full px-4 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 disabled:bg-gray-700 disabled:cursor-not-allowed transition-all flex items-center justify-center space-x-2"
          >
            {isChecking ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Verificando...</span>
              </>
            ) : (
              <span>Verificar disponibilidad</span>
            )}
          </button>
        </motion.div>
      )}

      {/* Resumen del dominio */}
      {technicalSetup.domain?.name && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="p-4 bg-gradient-to-br from-blue-500/5 to-purple-500/5 border border-blue-500/20 rounded-xl"
        >
          <div className="flex items-center space-x-2 mb-3">
            <span>🌐</span>
            <span className="font-semibold text-white">Tu dominio:</span>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <div className="bg-gray-800 px-3 py-1 rounded-full text-sm text-white font-mono">
                {technicalSetup.domain.name}
              </div>
              <span className={`text-xs px-2 py-1 rounded-full ${
                technicalSetup.domain.existing 
                  ? 'bg-green-500/20 text-green-400' 
                  : 'bg-blue-500/20 text-blue-400'
              }`}>
                {technicalSetup.domain.existing ? 'Existente' : 'Nuevo registro'}
              </span>
            </div>
            
            <div className="text-sm text-gray-400">
              {technicalSetup.domain.existing 
                ? 'Configuraremos tu dominio existente para que funcione con tu nuevo sitio.'
                : 'Incluiremos el registro de dominio en tu paquete de servicios.'
              }
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
        💡 Si no tienes dominio, podemos ayudarte a encontrar y registrar el perfecto para tu negocio
      </motion.div>
    </div>
  )
}