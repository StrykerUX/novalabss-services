'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useOptimizedOnboarding } from '@/hooks/useOptimizedOnboarding'
import { 
  getPagesByPlan, 
  getFeaturesByPlan, 
  getPlanRestrictions, 
  validateSelection 
} from '@/lib/onboarding-config'

export default function Step3Website() {
  const { 
    website, 
    updateWebsite, 
    markStepCompleted, 
    nextStep 
  } = useOptimizedOnboarding()

  // Detectar plan del usuario (desde URL params o localStorage)
  const [userPlan, setUserPlan] = useState<'rocket' | 'galaxy'>('rocket')
  const [selectedPages, setSelectedPages] = useState<string[]>(website.pages || [])
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>(website.features || [])
  const [validationError, setValidationError] = useState('')

  useEffect(() => {
    // Detectar plan del usuario desde el checkout
    const urlParams = new URLSearchParams(window.location.search)
    const planFromUrl = urlParams.get('plan') as 'rocket' | 'galaxy'
    const savedPlan = localStorage.getItem('selectedPlan') as 'rocket' | 'galaxy'
    
    const detectedPlan = planFromUrl || savedPlan || 'rocket'
    setUserPlan(detectedPlan)
    
    // Asegurar que hay páginas requeridas seleccionadas
    const availablePages = getPagesByPlan(detectedPlan)
    const requiredPages = availablePages.filter(p => p.required).map(p => p.id)
    
    if (selectedPages.length === 0) {
      setSelectedPages(requiredPages)
    }
  }, [])

  const availablePages = getPagesByPlan(userPlan)
  const availableFeatures = getFeaturesByPlan(userPlan)
  const restrictions = getPlanRestrictions(userPlan)

  const handlePageToggle = (pageId: string) => {
    const page = availablePages.find(p => p.id === pageId)
    if (page?.required) return // No permitir deseleccionar páginas requeridas

    setSelectedPages(prev => {
      const isSelected = prev.includes(pageId)
      
      if (isSelected) {
        // Remover página
        return prev.filter(id => id !== pageId)
      } else {
        // Agregar página - verificar límites
        const maxLimit = userPlan === 'rocket' ? restrictions.maxSections : restrictions.maxPages
        if (prev.length >= maxLimit) {
          setValidationError(`Máximo ${maxLimit} ${userPlan === 'rocket' ? 'secciones' : 'páginas'} permitidas en tu plan`)
          return prev
        }
        return [...prev, pageId]
      }
    })
    setValidationError('')
  }

  const handleFeatureToggle = (featureId: string) => {
    setSelectedFeatures(prev => {
      const newFeatures = prev.includes(featureId)
        ? prev.filter(id => id !== featureId)
        : [...prev, featureId]
      
      // Validar límite
      if (newFeatures.length > restrictions.maxFeatures) {
        setValidationError(`Máximo ${restrictions.maxFeatures} funcionalidades permitidas en tu plan`)
        return prev
      }
      
      setValidationError('')
      return newFeatures
    })
  }

  const handleContinue = () => {
    const validation = validateSelection(userPlan, selectedPages, selectedFeatures)
    
    if (!validation.valid) {
      setValidationError(validation.errors[0])
      return
    }

    // Guardar datos
    updateWebsite({
      plan: userPlan,
      pages: selectedPages,
      features: selectedFeatures
    })

    markStepCompleted(3)
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
          📄
        </motion.div>
        
        <h2 className="text-2xl lg:text-3xl font-bold text-white mb-2">
          Estructura de tu Sitio Web
        </h2>
        
        <p className="text-gray-400 text-lg">
          Selecciona las páginas y funcionalidades para tu{' '}
          <span className={`font-semibold ${userPlan === 'rocket' ? 'text-orange-400' : 'text-purple-400'}`}>
            Plan {userPlan.charAt(0).toUpperCase() + userPlan.slice(1)}
          </span>
        </p>
      </div>

      {/* Plan Info */}
      <motion.div 
        className={`mb-8 p-4 rounded-xl border ${
          userPlan === 'rocket' 
            ? 'bg-orange-500/10 border-orange-500/30' 
            : 'bg-purple-500/10 border-purple-500/30'
        }`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-white font-semibold">
              {restrictions.description}
            </h3>
            <p className="text-gray-300 text-sm">
              {userPlan === 'rocket' 
                ? `${restrictions.minSections}-${restrictions.maxSections} secciones` 
                : `${restrictions.minPages}-${restrictions.maxPages} páginas`
              } • Máximo {restrictions.maxFeatures} funcionalidades
            </p>
          </div>
          <div className={`px-3 py-1 rounded-lg text-sm font-medium ${
            userPlan === 'rocket' 
              ? 'bg-orange-500 text-white' 
              : 'bg-purple-500 text-white'
          }`}>
            {userPlan.toUpperCase()}
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Páginas */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span>📑</span>
            {userPlan === 'rocket' ? 'Secciones de tu sitio' : 'Páginas de tu sitio'}
            <span className="text-sm text-gray-400">
              ({selectedPages.length}/{userPlan === 'rocket' ? restrictions.maxSections : restrictions.maxPages})
            </span>
          </h3>
          
          <div className="space-y-3">
            {availablePages.map((page, index) => {
              const isSelected = selectedPages.includes(page.id)
              const maxLimit = userPlan === 'rocket' ? restrictions.maxSections : restrictions.maxPages
              const isDisabled = !isSelected && selectedPages.length >= maxLimit && !page.required
              
              return (
                <motion.div
                  key={page.id}
                  className={`p-4 rounded-xl border transition-all ${
                    isSelected
                      ? 'bg-blue-500/20 border-blue-500/50'
                      : isDisabled 
                        ? 'bg-gray-800/30 border-gray-700/30 opacity-50 cursor-not-allowed'
                        : 'bg-gray-800/50 border-gray-700/50 hover:border-gray-600 cursor-pointer'
                  } ${page.required ? 'opacity-75' : ''}`}
                  onClick={() => !isDisabled && handlePageToggle(page.id)}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  whileHover={{ scale: (page.required || isDisabled) ? 1 : 1.02 }}
                >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-white font-medium">{page.name}</h4>
                      {page.required && (
                        <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded">
                          Requerida
                        </span>
                      )}
                    </div>
                    <p className="text-gray-400 text-sm">{page.description}</p>
                  </div>
                  
                  <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                    selectedPages.includes(page.id)
                      ? 'bg-blue-500 border-blue-500'
                      : 'border-gray-600'
                  }`}>
                    {selectedPages.includes(page.id) && (
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                </div>
              </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Funcionalidades */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span>⚡</span>
            Funcionalidades
            <span className="text-sm text-gray-400">
              ({selectedFeatures.length}/{restrictions.maxFeatures})
            </span>
          </h3>
          
          <div className="space-y-3">
            {availableFeatures.map((feature, index) => (
              <motion.div
                key={feature.id}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  selectedFeatures.includes(feature.id)
                    ? 'bg-green-500/20 border-green-500/50'
                    : 'bg-gray-800/50 border-gray-700/50 hover:border-gray-600'
                } ${selectedFeatures.length >= restrictions.maxFeatures && !selectedFeatures.includes(feature.id) ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={() => handleFeatureToggle(feature.id)}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                whileHover={{ 
                  scale: (selectedFeatures.length >= restrictions.maxFeatures && !selectedFeatures.includes(feature.id)) ? 1 : 1.02 
                }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-white font-medium">{feature.name}</h4>
                      <span className={`text-xs px-2 py-0.5 rounded ${
                        feature.type === 'static' 
                          ? 'bg-gray-500/20 text-gray-400' 
                          : feature.type === 'dynamic'
                            ? 'bg-blue-500/20 text-blue-400'
                            : 'bg-purple-500/20 text-purple-400'
                      }`}>
                        {feature.type}
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm">{feature.description}</p>
                  </div>
                  
                  <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                    selectedFeatures.includes(feature.id)
                      ? 'bg-green-500 border-green-500'
                      : 'border-gray-600'
                  }`}>
                    {selectedFeatures.includes(feature.id) && (
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Sección de prioridad eliminada */}

      {/* Validation Messages */}
      {validationError && (
        <motion.div
          className="mt-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <p className="text-red-400 text-sm">{validationError}</p>
        </motion.div>
      )}

      {/* Progress Message */}
      {((userPlan === 'rocket' && selectedPages.length < restrictions.minSections) ||
        (userPlan === 'galaxy' && selectedPages.length < restrictions.minPages)) && (
        <motion.div
          className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-xl"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <p className="text-yellow-400 text-sm">
            📋 Necesitas seleccionar al menos{' '}
            {userPlan === 'rocket' 
              ? `${restrictions.minSections} secciones` 
              : `${restrictions.minPages} páginas`
            } para continuar ({selectedPages.length}/{userPlan === 'rocket' ? restrictions.minSections : restrictions.minPages})
          </p>
        </motion.div>
      )}

      {/* Continue Button */}
      <motion.div
        className="mt-8 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <button
          onClick={handleContinue}
          disabled={
            selectedPages.length === 0 || 
            selectedFeatures.length === 0 || 
            (userPlan === 'rocket' && selectedPages.length < restrictions.minSections) ||
            (userPlan === 'galaxy' && selectedPages.length < restrictions.minPages)
          }
          className="px-8 py-4 bg-blue-500 text-white rounded-xl font-semibold text-lg hover:bg-blue-600 disabled:bg-gray-700 disabled:cursor-not-allowed transition-all"
        >
          Continuar a Identidad Visual 🎨
        </button>
      </motion.div>
    </div>
  )
}