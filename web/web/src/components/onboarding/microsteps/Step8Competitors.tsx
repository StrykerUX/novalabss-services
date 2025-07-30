import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useOnboardingState } from '@/hooks/useOnboardingState'

export default function Step8Competitors() {
  const { objectives, updateObjectives, businessInfo } = useOnboardingState()
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [manualCompetitor, setManualCompetitor] = useState('')

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
    }, 2000)
  }

  const addManualCompetitor = () => {
    if (manualCompetitor.trim()) {
      const currentCompetitors = objectives.competitors || []
      const newCompetitors = [...currentCompetitors, manualCompetitor.trim()]
      updateObjectives({ competitors: newCompetitors })
      setManualCompetitor('')
    }
  }

  const removeCompetitor = (index: number) => {
    const currentCompetitors = objectives.competitors || []
    const newCompetitors = currentCompetitors.filter((_, i) => i !== index)
    updateObjectives({ competitors: newCompetitors })
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
          ¿Conoces a tus competidores?
        </h3>
        <p className="text-sm text-gray-400">
          Esto nos ayuda a diferenciarte en el mercado
        </p>
      </motion.div>

      {/* Análisis automático */}
      {!objectives.competitors?.length && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center py-8"
        >
          <div className="mb-6">
            <div className="text-5xl mb-3">🔍</div>
            <h4 className="text-white font-medium mb-2">Análisis automático</h4>
            <p className="text-sm text-gray-400 mb-4">
              Nuestra IA puede analizar tu industria <br />
              <span className="text-blue-400">{businessInfo.industry}</span> para encontrar competidores
            </p>
          </div>
          
          <button
            onClick={analyzeCompetitors}
            disabled={isAnalyzing || !businessInfo.industry}
            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-medium hover:from-purple-600 hover:to-pink-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 mx-auto"
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
        </motion.div>
      )}

      {/* Competidores encontrados */}
      {objectives.competitors?.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-3"
        >
          <h4 className="text-sm font-medium text-gray-300 flex items-center space-x-2">
            <span>🎯</span>
            <span>Competidores identificados</span>
          </h4>
          
          <div className="space-y-2">
            {objectives.competitors.map((competitor, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg border border-gray-700"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white text-xs">
                    🌐
                  </div>
                  <span className="text-gray-300">{competitor}</span>
                </div>
                <button
                  onClick={() => removeCompetitor(index)}
                  className="text-gray-500 hover:text-red-400 transition-colors"
                >
                  ✕
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Agregar competidor manual */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="space-y-3"
      >
        <h4 className="text-sm font-medium text-gray-300 flex items-center space-x-2">
          <span>✍️</span>
          <span>Agregar competidor</span>
        </h4>
        
        <div className="flex space-x-2">
          <input
            type="text"
            value={manualCompetitor}
            onChange={(e) => setManualCompetitor(e.target.value)}
            placeholder="Ej: competidor.com"
            className="flex-1 px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
            onKeyPress={(e) => e.key === 'Enter' && addManualCompetitor()}
          />
          <button
            onClick={addManualCompetitor}
            disabled={!manualCompetitor.trim()}
            className="px-4 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 disabled:bg-gray-700 disabled:cursor-not-allowed transition-all"
          >
            ✓
          </button>
        </div>
      </motion.div>

      {/* Información sobre el paso opcional */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="text-center text-xs text-gray-500 bg-gray-900/50 p-3 rounded-xl"
      >
        💡 Este paso es opcional, pero nos ayuda a crear un sitio que te destaque de la competencia
      </motion.div>

      {/* Opción de saltar */}
      {!objectives.competitors?.length && !isAnalyzing && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="text-center"
        >
          <p className="text-sm text-gray-400 mb-3">
            ¿No tienes competidores claros?
          </p>
          <button
            onClick={() => updateObjectives({ competitors: [] })}
            className="text-blue-400 hover:text-blue-300 text-sm underline"
          >
            Continuar sin competidores
          </button>
        </motion.div>
      )}
    </div>
  )
}