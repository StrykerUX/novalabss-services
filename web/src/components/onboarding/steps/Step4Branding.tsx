'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useOptimizedOnboarding } from '@/hooks/useOptimizedOnboarding'
import { BRANDING_QUESTIONS } from '@/lib/onboarding-config'
import FileUploadZone from '../FileUploadZone'

const BRAND_STYLES = [
  { value: 'modern', label: 'Moderno', emoji: '🚀', description: 'Limpio, minimalista y contemporáneo' },
  { value: 'classic', label: 'Clásico', emoji: '🏛️', description: 'Elegante, tradicional y confiable' },
  { value: 'minimal', label: 'Minimalista', emoji: '⚪', description: 'Simple, espacios blancos, esencial' },
  { value: 'bold', label: 'Audaz', emoji: '⚡', description: 'Llamativo, vibrante y energético' },
  { value: 'elegant', label: 'Elegante', emoji: '💎', description: 'Sofisticado, refinado y premium' },
  { value: 'creative', label: 'Creativo', emoji: '🎨', description: 'Artístico, único y expresivo' }
]

export default function Step4Branding() {
  const { 
    branding, 
    business,
    goals,
    updateBranding, 
    uploadFiles,
    analyzeWithAI,
    markStepCompleted, 
    nextStep 
  } = useOptimizedOnboarding()

  const [formData, setFormData] = useState({
    brandStyle: branding.brandStyle || '',
    socialMedia: branding.socialMedia || {},
    brandingQuestions: {
      personality: '',
      emotion: '',
      differentiation: ''
    }
  })

  const [aiState, setAiState] = useState<{
    isAnalyzing: boolean
    hasAnalysis: boolean
    analysis: any
    error: string
  }>({
    isAnalyzing: false,
    hasAnalysis: !!branding.aiAnalysis,
    analysis: branding.aiAnalysis || null,
    error: ''
  })

  const [uploadedFiles, setUploadedFiles] = useState({
    logo: branding.logo || [],
    brandGuide: branding.brandGuide || [],
    images: branding.images || []
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleStyleSelect = (style: string) => {
    setFormData(prev => ({ ...prev, brandStyle: style }))
    if (errors.brandStyle) {
      setErrors(prev => ({ ...prev, brandStyle: '' }))
    }
  }

  const handleSocialMediaChange = (platform: string, url: string) => {
    setFormData(prev => ({
      ...prev,
      socialMedia: {
        ...prev.socialMedia,
        [platform]: url
      }
    }))
  }

  const handleQuestionChange = (questionId: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      brandingQuestions: {
        ...prev.brandingQuestions,
        [questionId]: value
      }
    }))
  }

  const handleFileUpload = useCallback(async (files: File[], type: 'logo' | 'brandGuide' | 'images') => {
    try {
      const urls = await uploadFiles(files, type)
      setUploadedFiles(prev => ({
        ...prev,
        [type]: [...(prev[type] || []), ...urls]
      }))
      return urls
    } catch (error) {
      console.error('Upload error:', error)
      throw error
    }
  }, [uploadFiles])

  const handleAIAnalysis = async () => {
    if (!formData.brandingQuestions.personality || !formData.brandingQuestions.emotion) {
      setErrors(prev => ({ ...prev, aiQuestions: 'Completa las preguntas para el análisis de IA' }))
      return
    }

    setAiState(prev => ({ ...prev, isAnalyzing: true, error: '' }))

    try {
      const analysis = await analyzeWithAI(formData.brandingQuestions)
      
      setAiState({
        isAnalyzing: false,
        hasAnalysis: true,
        analysis: analysis.analysis || analysis,
        error: ''
      })

      // Actualizar colores recomendados si los hay
      if (analysis.analysis?.recommendedColors) {
        const colors = analysis.analysis.recommendedColors.map((c: any) => 
          typeof c === 'string' ? c : c.color
        ).filter((c: string) => c && c.startsWith('#'))
        
        if (colors.length > 0) {
          updateBranding({ brandColors: colors })
        }
      }

    } catch (error) {
      console.error('AI Analysis error:', error)
      setAiState(prev => ({
        ...prev,
        isAnalyzing: false,
        error: 'Error en el análisis. Intenta de nuevo.'
      }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.brandStyle) {
      newErrors.brandStyle = 'Selecciona un estilo de marca'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleContinue = () => {
    if (!validateForm()) return

    // Guardar todos los datos
    updateBranding({
      brandStyle: formData.brandStyle as any,
      socialMedia: formData.socialMedia,
      logo: uploadedFiles.logo,
      brandGuide: uploadedFiles.brandGuide,
      images: uploadedFiles.images,
      aiAnalysis: aiState.analysis
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
        
        {/* Estilo de Marca */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-xl font-semibold text-white mb-4">
            ¿Qué estilo representa mejor tu marca? *
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {BRAND_STYLES.map((style, index) => (
              <motion.button
                key={style.value}
                onClick={() => handleStyleSelect(style.value)}
                className={`p-6 rounded-xl border text-center transition-all ${
                  formData.brandStyle === style.value
                    ? 'bg-blue-500/20 border-blue-500/50 text-white'
                    : 'bg-gray-800/50 border-gray-700/50 text-gray-300 hover:border-gray-600'
                }`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="text-3xl mb-2">{style.emoji}</div>
                <h4 className="font-semibold mb-1">{style.label}</h4>
                <p className="text-xs opacity-75">{style.description}</p>
              </motion.button>
            ))}
          </div>
          
          {errors.brandStyle && (
            <p className="text-red-400 text-sm mt-2">{errors.brandStyle}</p>
          )}
        </motion.div>

        {/* Redes Sociales */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h3 className="text-xl font-semibold text-white mb-4">
            Redes sociales (opcional)
          </h3>
          <p className="text-gray-400 text-sm mb-4">
            Ayúdanos a entender tu estilo actual
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { key: 'website', label: 'Sitio web actual', placeholder: 'https://tuempresa.com' },
              { key: 'instagram', label: 'Instagram', placeholder: 'https://instagram.com/tuempresa' },
              { key: 'facebook', label: 'Facebook', placeholder: 'https://facebook.com/tuempresa' },
              { key: 'linkedin', label: 'LinkedIn', placeholder: 'https://linkedin.com/company/tuempresa' }
            ].map((social, index) => (
              <motion.div
                key={social.key}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
              >
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  {social.label}
                </label>
                <input
                  type="url"
                  value={formData.socialMedia[social.key as keyof typeof formData.socialMedia] || ''}
                  onChange={(e) => handleSocialMediaChange(social.key, e.target.value)}
                  placeholder={social.placeholder}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Upload de Archivos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <FileUploadZone
            type="logo"
            acceptedTypes={['.png', '.svg', '.pdf', '.jpg', '.jpeg']}
            maxFiles={3}
            maxSizePerFile={5}
            onFilesUpload={(files) => handleFileUpload(files, 'logo')}
          />
          
          <FileUploadZone
            type="brandGuide"
            acceptedTypes={['.pdf', '.doc', '.docx']}
            maxFiles={2}
            maxSizePerFile={10}
            onFilesUpload={(files) => handleFileUpload(files, 'brandGuide')}
          />
          
          <FileUploadZone
            type="images"
            acceptedTypes={['.png', '.jpg', '.jpeg', '.webp']}
            maxFiles={5}
            maxSizePerFile={3}
            onFilesUpload={(files) => handleFileUpload(files, 'images')}
          />
        </motion.div>

        {/* Preguntas para IA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-6"
        >
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span>🤖</span>
            Análisis Inteligente de Marca
          </h3>
          
          <p className="text-gray-300 text-sm mb-6">
            Responde estas preguntas y nuestra IA te dará recomendaciones personalizadas de colores y estilo
          </p>
          
          <div className="space-y-4">
            {BRANDING_QUESTIONS.map((question, index) => (
              <motion.div
                key={question.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 + index * 0.1 }}
              >
                <label className="block text-white font-medium mb-2">
                  {question.question}
                </label>
                
                {question.type === 'select' ? (
                  <select
                    value={formData.brandingQuestions[question.id as keyof typeof formData.brandingQuestions]}
                    onChange={(e) => handleQuestionChange(question.id, e.target.value)}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                  >
                    <option value="">Selecciona una opción</option>
                    {question.options?.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                ) : (
                  <textarea
                    value={formData.brandingQuestions[question.id as keyof typeof formData.brandingQuestions]}
                    onChange={(e) => handleQuestionChange(question.id, e.target.value)}
                    placeholder={question.placeholder}
                    rows={3}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all resize-none"
                  />
                )}
              </motion.div>
            ))}
          </div>

          {/* Botón de análisis */}
          <div className="mt-6">
            <button
              onClick={handleAIAnalysis}
              disabled={aiState.isAnalyzing || (!formData.brandingQuestions.personality || !formData.brandingQuestions.emotion)}
              className="w-full px-6 py-3 bg-purple-500 text-white rounded-xl font-semibold hover:bg-purple-600 disabled:bg-gray-700 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
            >
              {aiState.isAnalyzing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Analizando tu marca...
                </>
              ) : (
                <>
                  <span>🧠</span>
                  Analizar con IA
                </>
              )}
            </button>
          </div>

          {errors.aiQuestions && (
            <p className="text-red-400 text-sm mt-2">{errors.aiQuestions}</p>
          )}

          {aiState.error && (
            <p className="text-red-400 text-sm mt-2">{aiState.error}</p>
          )}
        </motion.div>

        {/* Resultados de IA */}
        <AnimatePresence>
          {aiState.hasAnalysis && aiState.analysis && (
            <motion.div
              initial={{ opacity: 0, y: 20, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: -20, height: 0 }}
              className="bg-green-500/10 border border-green-500/30 rounded-xl p-6"
            >
              <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                <span>✨</span>
                Recomendaciones de IA
              </h4>
              
              <div className="space-y-4">
                {aiState.analysis.brandPersonality && (
                  <div>
                    <h5 className="text-green-400 font-medium mb-1">Personalidad de Marca:</h5>
                    <p className="text-gray-300 text-sm">{aiState.analysis.brandPersonality}</p>
                  </div>
                )}
                
                {aiState.analysis.recommendedColors && (
                  <div>
                    <h5 className="text-green-400 font-medium mb-2">Colores Recomendados:</h5>
                    <div className="flex flex-wrap gap-2">
                      {aiState.analysis.recommendedColors.map((colorItem: any, index: number) => (
                        <div key={index} className="flex items-center gap-2">
                          <div 
                            className="w-6 h-6 rounded border border-gray-600"
                            style={{ backgroundColor: typeof colorItem === 'string' ? colorItem : colorItem.color }}
                          ></div>
                          <span className="text-gray-300 text-sm">
                            {typeof colorItem === 'string' ? colorItem : colorItem.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {aiState.analysis.styleDirection && (
                  <div>
                    <h5 className="text-green-400 font-medium mb-1">Estilo Recomendado:</h5>
                    <p className="text-gray-300 text-sm">{aiState.analysis.styleDirection}</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Continue Button */}
        <motion.div
          className="pt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <button
            onClick={handleContinue}
            disabled={!formData.brandStyle}
            className="w-full px-6 py-4 bg-blue-500 text-white rounded-xl font-semibold text-lg hover:bg-blue-600 disabled:bg-gray-700 disabled:cursor-not-allowed transition-all"
          >
            Continuar a Configuración 🌐
          </button>
        </motion.div>
      </div>
    </div>
  )
}