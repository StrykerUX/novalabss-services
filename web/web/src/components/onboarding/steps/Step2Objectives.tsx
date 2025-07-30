import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useOnboardingState } from '@/hooks/useOnboardingState'
import { Objectives } from '@/types/onboarding'

const primaryGoals = [
  {
    value: 'sales',
    label: 'Aumentar Ventas',
    description: 'Generar más ingresos a través del sitio web',
    icon: '💰',
    color: 'from-green-500 to-emerald-600'
  },
  {
    value: 'leads',
    label: 'Generar Leads',
    description: 'Captar clientes potenciales y contactos',
    icon: '🎯',
    color: 'from-blue-500 to-cyan-600'
  },
  {
    value: 'branding',
    label: 'Fortalecer Marca',
    description: 'Mejorar presencia y reconocimiento de marca',
    icon: '🚀',
    color: 'from-purple-500 to-pink-600'
  },
  {
    value: 'portfolio',
    label: 'Mostrar Portfolio',
    description: 'Exhibir trabajos, productos o servicios',
    icon: '🎨',
    color: 'from-orange-500 to-red-600'
  }
]

const ageRanges = [
  '18-24', '25-34', '35-44', '45-54', '55-64', '65+'
]

const interests = [
  'Tecnología', 'Salud', 'Fitness', 'Belleza', 'Educación', 'Viajes',
  'Comida', 'Moda', 'Deportes', 'Música', 'Arte', 'Negocios',
  'Familia', 'Hogar', 'Automóviles', 'Finanzas'
]

export default function Step2Objectives() {
  const { objectives, updateObjectives, businessInfo } = useOnboardingState()
  const [showCompetitorAnalysis, setShowCompetitorAnalysis] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const handleGoalSelect = (goal: string) => {
    updateObjectives({ primaryGoal: goal as any })
  }

  const handleAudienceUpdate = (field: string, value: any) => {
    updateObjectives({
      targetAudience: {
        ...objectives.targetAudience,
        [field]: value
      }
    })
  }

  const handleInterestToggle = (interest: string) => {
    const currentInterests = objectives.targetAudience?.interests || []
    const newInterests = currentInterests.includes(interest)
      ? currentInterests.filter(i => i !== interest)
      : [...currentInterests, interest]
    
    handleAudienceUpdate('interests', newInterests)
  }

  const handleGoalMetrics = (metric: string, value: number) => {
    updateObjectives({
      specificGoals: {
        ...objectives.specificGoals,
        [metric]: value
      }
    })
  }

  const analyzeCompetitors = async () => {
    setIsAnalyzing(true)
    // Simular análisis de IA
    setTimeout(() => {
      const mockCompetitors = [
        'competitor1.com',
        'competitor2.com',
        'competitor3.com'
      ]
      updateObjectives({ competitors: mockCompetitors })
      setIsAnalyzing(false)
      setShowCompetitorAnalysis(true)
    }, 2000)
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Objetivo Principal */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="space-y-4"
      >
        <h3 className="text-lg font-semibold text-white mb-4">
          ¿Cuál es tu objetivo principal con el sitio web?
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {primaryGoals.map((goal) => (
            <motion.button
              key={goal.value}
              onClick={() => handleGoalSelect(goal.value)}
              className={`p-6 rounded-xl border-2 transition-all text-left relative overflow-hidden ${
                objectives.primaryGoal === goal.value
                  ? 'border-blue-500 bg-blue-500/10'
                  : 'border-gray-700 hover:border-gray-600'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-start space-x-4">
                <div className={`text-3xl p-3 rounded-lg bg-gradient-to-br ${goal.color} bg-opacity-20`}>
                  {goal.icon}
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-2">{goal.label}</h4>
                  <p className="text-sm text-gray-400">{goal.description}</p>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Audiencia Objetivo */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-4"
      >
        <h3 className="text-lg font-semibold text-white mb-4">
          Define tu audiencia objetivo
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Rango de Edad */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-300">
              Rango de edad principal
            </label>
            <div className="grid grid-cols-2 gap-2">
              {ageRanges.map((range) => (
                <button
                  key={range}
                  onClick={() => handleAudienceUpdate('ageRange', range)}
                  className={`p-3 rounded-lg border transition-all ${
                    objectives.targetAudience?.ageRange === range
                      ? 'border-blue-500 bg-blue-500/10 text-white'
                      : 'border-gray-700 hover:border-gray-600 text-gray-300'
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>

          {/* Ubicación */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-300">
              Ubicación principal de tu audiencia
            </label>
            <input
              type="text"
              value={objectives.targetAudience?.location || ''}
              onChange={(e) => handleAudienceUpdate('location', e.target.value)}
              placeholder="Ej: México, CDMX, Nacional, Internacional"
              className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
            />
          </div>
        </div>
      </motion.div>

      {/* Intereses */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="space-y-4"
      >
        <h3 className="text-lg font-semibold text-white mb-4">
          Intereses de tu audiencia (selecciona hasta 5)
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {interests.map((interest) => {
            const isSelected = objectives.targetAudience?.interests?.includes(interest)
            const canSelect = (objectives.targetAudience?.interests?.length || 0) < 5
            
            return (
              <button
                key={interest}
                onClick={() => handleInterestToggle(interest)}
                disabled={!isSelected && !canSelect}
                className={`p-3 rounded-lg border transition-all text-sm ${
                  isSelected
                    ? 'border-blue-500 bg-blue-500/10 text-white'
                    : canSelect
                    ? 'border-gray-700 hover:border-gray-600 text-gray-300'
                    : 'border-gray-800 text-gray-500 cursor-not-allowed'
                }`}
              >
                {interest}
              </button>
            )
          })}
        </div>
      </motion.div>

      {/* Análisis de Competidores */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="space-y-4"
      >
        <h3 className="text-lg font-semibold text-white mb-4">
          Análisis de competidores
        </h3>
        
        {!showCompetitorAnalysis ? (
          <div className="text-center py-8">
            <div className="mb-4">
              <div className="text-4xl mb-2">🔍</div>
              <p className="text-gray-400 mb-4">
                Nuestra IA analizará tu industria para encontrar competidores relevantes
              </p>
            </div>
            <button
              onClick={analyzeCompetitors}
              disabled={isAnalyzing || !businessInfo.industry}
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 mx-auto"
            >
              {isAnalyzing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Analizando...</span>
                </>
              ) : (
                <>
                  <span>✨</span>
                  <span>Analizar competidores</span>
                </>
              )}
            </button>
          </div>
        ) : (
          <div className="bg-gray-800/50 rounded-lg p-6">
            <h4 className="font-semibold text-white mb-4">Competidores encontrados:</h4>
            <div className="space-y-3">
              {objectives.competitors?.map((competitor, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-900/50 rounded-lg">
                  <span className="text-gray-300">{competitor}</span>
                  <button className="text-blue-400 hover:text-blue-300 text-sm">
                    Ver análisis
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </motion.div>

      {/* Metas Específicas */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="space-y-4"
      >
        <h3 className="text-lg font-semibold text-white mb-4">
          Metas específicas (opcional)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">
              Visitantes mensuales deseados
            </label>
            <input
              type="number"
              value={objectives.specificGoals?.monthlyVisitors || ''}
              onChange={(e) => handleGoalMetrics('monthlyVisitors', parseInt(e.target.value))}
              placeholder="Ej: 1000"
              className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">
              Leads mensuales deseados
            </label>
            <input
              type="number"
              value={objectives.specificGoals?.monthlyLeads || ''}
              onChange={(e) => handleGoalMetrics('monthlyLeads', parseInt(e.target.value))}
              placeholder="Ej: 50"
              className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">
              Tasa de conversión objetivo (%)
            </label>
            <input
              type="number"
              value={objectives.specificGoals?.conversionRate || ''}
              onChange={(e) => handleGoalMetrics('conversionRate', parseFloat(e.target.value))}
              placeholder="Ej: 3.5"
              step="0.1"
              className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
            />
          </div>
        </div>
      </motion.div>

      {/* Resumen */}
      {objectives.primaryGoal && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 p-6 bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-xl"
        >
          <h3 className="text-lg font-semibold text-white mb-3">Resumen de objetivos:</h3>
          <div className="space-y-2 text-gray-300">
            <p>
              <span className="text-blue-400">Objetivo principal:</span> {
                primaryGoals.find(g => g.value === objectives.primaryGoal)?.label
              }
            </p>
            {objectives.targetAudience?.ageRange && (
              <p>
                <span className="text-blue-400">Audiencia:</span> {objectives.targetAudience.ageRange} años
                {objectives.targetAudience.location && ` en ${objectives.targetAudience.location}`}
              </p>
            )}
            {objectives.targetAudience?.interests && objectives.targetAudience.interests.length > 0 && (
              <p>
                <span className="text-blue-400">Intereses:</span> {objectives.targetAudience.interests.join(', ')}
              </p>
            )}
            {objectives.competitors && objectives.competitors.length > 0 && (
              <p>
                <span className="text-blue-400">Competidores identificados:</span> {objectives.competitors.length}
              </p>
            )}
          </div>
        </motion.div>
      )}
    </div>
  )
}