'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useOptimizedOnboarding } from '@/hooks/useOptimizedOnboarding'
import { useRouter } from 'next/navigation'

export default function Step6Confirmation() {
  const router = useRouter()
  const { 
    business,
    goals, 
    website,
    branding,
    technical,
    markStepCompleted,
    saveToDatabase,
    getCompletionPercentage
  } = useOptimizedOnboarding()

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const handleConfirm = async () => {
    setIsSubmitting(true)
    setSubmitError('')

    try {
      // Marcar el último paso como completado
      markStepCompleted(6)
      
      // Guardar en base de datos
      await saveToDatabase()
      
      // Redireccionar al dashboard
      router.push('/dashboard?onboarding=completed')
      
    } catch (error) {
      console.error('Error submitting onboarding:', error)
      setSubmitError('Error al guardar la información. Intenta de nuevo.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const getSummaryIcon = (category: string) => {
    const icons = {
      business: '🏢',
      goals: '🎯', 
      website: '📄',
      branding: '🎨',
      technical: '🌐'
    }
    return icons[category as keyof typeof icons] || '📋'
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
          ✅
        </motion.div>
        
        <h2 className="text-2xl lg:text-3xl font-bold text-white mb-2">
          ¡Perfecto! Revisa tu información
        </h2>
        
        <p className="text-gray-400 text-lg">
          Confirma que todo esté correcto antes de continuar
        </p>
      </div>

      {/* Progress celebración */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-xl p-6 border border-green-500/30 mb-8 text-center"
      >
        <h3 className="text-white font-semibold text-xl mb-2">
          🎉 ¡Onboarding {getCompletionPercentage()}% Completado!
        </h3>
        <p className="text-gray-300">
          Tu información está lista para crear un sitio web increíble
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Información del Negocio */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50"
        >
          <h3 className="text-white font-semibold text-lg mb-4 flex items-center gap-2">
            {getSummaryIcon('business')} Información del Negocio
          </h3>
          
          <div className="space-y-3 text-sm">
            <div>
              <span className="text-gray-400">Nombre:</span>
              <span className="text-white ml-2 font-medium">{business.name}</span>
            </div>
            <div>
              <span className="text-gray-400">Industria:</span>
              <span className="text-white ml-2">{business.industry}</span>
              {business.customIndustry && (
                <span className="text-blue-400 ml-1">({business.customIndustry})</span>
              )}
            </div>
            <div>
              <span className="text-gray-400">Tamaño:</span>
              <span className="text-white ml-2 capitalize">{business.size}</span>
            </div>
            <div>
              <span className="text-gray-400">Ubicación:</span>
              <span className="text-white ml-2">
                {business.location?.city ? `${business.location.city}, ` : ''}{business.location?.country}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Objetivos y Audiencia */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50"
        >
          <h3 className="text-white font-semibold text-lg mb-4 flex items-center gap-2">
            {getSummaryIcon('goals')} Objetivos y Audiencia
          </h3>
          
          <div className="space-y-3 text-sm">
            <div>
              <span className="text-gray-400">Objetivo principal:</span>
              <span className="text-white ml-2 capitalize">{goals.primaryGoal}</span>
            </div>
            <div>
              <span className="text-gray-400">Audiencia:</span>
              <span className="text-white ml-2">
                {goals.targetAudience?.ageRanges?.join(', ')}
              </span>
            </div>
            <div>
              <span className="text-gray-400">Alcance:</span>
              <span className="text-white ml-2 capitalize">{goals.targetAudience?.location}</span>
            </div>
            {goals.targetAudience?.description && (
              <div>
                <span className="text-gray-400">Descripción:</span>
                <p className="text-white mt-1 text-xs leading-relaxed">
                  {goals.targetAudience.description}
                </p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Estructura del Sitio */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50"
        >
          <h3 className="text-white font-semibold text-lg mb-4 flex items-center gap-2">
            {getSummaryIcon('website')} Estructura del Sitio
          </h3>
          
          <div className="space-y-3 text-sm">
            <div>
              <span className="text-gray-400">Plan:</span>
              <span className={`ml-2 font-medium capitalize ${
                website.plan === 'rocket' ? 'text-orange-400' : 'text-purple-400'
              }`}>
                {website.plan}
              </span>
            </div>
            <div>
              <span className="text-gray-400">Páginas:</span>
              <div className="mt-1">
                {website.pages?.map((page, index) => (
                  <span key={page} className="inline-block bg-blue-500/20 text-blue-400 text-xs px-2 py-1 rounded mr-1 mb-1">
                    {page}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <span className="text-gray-400">Funcionalidades:</span>
              <div className="mt-1">
                {website.features?.map((feature, index) => (
                  <span key={feature} className="inline-block bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded mr-1 mb-1">
                    {feature}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <span className="text-gray-400">Prioridad:</span>
              <span className="text-white ml-2">{website.priority}</span>
            </div>
          </div>
        </motion.div>

        {/* Identidad Visual */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50"
        >
          <h3 className="text-white font-semibold text-lg mb-4 flex items-center gap-2">
            {getSummaryIcon('branding')} Identidad Visual
          </h3>
          
          <div className="space-y-3 text-sm">
            <div>
              <span className="text-gray-400">Estilo:</span>
              <span className="text-white ml-2 capitalize">{branding.brandStyle}</span>
            </div>
            
            {branding.logo && branding.logo.length > 0 && (
              <div>
                <span className="text-gray-400">Logo:</span>
                <span className="text-green-400 ml-2">{branding.logo.length} archivo(s) subido(s)</span>
              </div>
            )}
            
            {branding.brandGuide && branding.brandGuide.length > 0 && (
              <div>
                <span className="text-gray-400">Manual de marca:</span>
                <span className="text-green-400 ml-2">{branding.brandGuide.length} archivo(s) subido(s)</span>
              </div>
            )}
            
            {branding.images && branding.images.length > 0 && (
              <div>
                <span className="text-gray-400">Imágenes:</span>
                <span className="text-green-400 ml-2">{branding.images.length} archivo(s) subido(s)</span>
              </div>
            )}

            {branding.aiAnalysis && (
              <div>
                <span className="text-gray-400">Análisis IA:</span>
                <span className="text-purple-400 ml-2">✓ Completado</span>
              </div>
            )}

            {Object.values(branding.socialMedia || {}).some(url => url) && (
              <div>
                <span className="text-gray-400">Redes sociales:</span>
                <div className="mt-1">
                  {Object.entries(branding.socialMedia || {}).map(([platform, url]) => (
                    url && (
                      <span key={platform} className="inline-block bg-blue-500/20 text-blue-400 text-xs px-2 py-1 rounded mr-1 mb-1 capitalize">
                        {platform}
                      </span>
                    )
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Configuración Técnica */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50 lg:col-span-2"
        >
          <h3 className="text-white font-semibold text-lg mb-4 flex items-center gap-2">
            {getSummaryIcon('technical')} Configuración Técnica
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div>
              <span className="text-gray-400">Dominio:</span>
              <div className="mt-1">
                {technical.domain?.hasDomain ? (
                  <div className="text-green-400">
                    ✓ Usar dominio existente
                    {technical.domain.domainName && (
                      <div className="text-white mt-1">{technical.domain.domainName}</div>
                    )}
                  </div>
                ) : (
                  <div className="text-blue-400">
                    🆘 Ayuda para registrar dominio
                  </div>
                )}
              </div>
            </div>
            
            <div>
              <span className="text-gray-400">Contenido:</span>
              <div className="mt-1">
                {technical.hasContent ? (
                  <div className="text-green-400">
                    ✓ Cliente proporcionará contenido
                  </div>
                ) : (
                  <div className="text-purple-400">
                    ✍️ Incluir redacción profesional
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Próximos pasos */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="mt-8 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl p-6 border border-blue-500/30"
      >
        <h3 className="text-white font-semibold text-lg mb-4 flex items-center gap-2">
          <span>🚀</span>
          Próximos pasos
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="flex items-start gap-3">
            <span className="bg-blue-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">1</span>
            <div>
              <h4 className="text-white font-medium">Revisión del proyecto</h4>
              <p className="text-gray-400">Nuestro equipo revisará tu información</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <span className="bg-purple-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">2</span>
            <div>
              <h4 className="text-white font-medium">Contacto inicial</h4>
              <p className="text-gray-400">Te contactaremos en 24h para coordinar</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <span className="bg-green-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">3</span>
            <div>
              <h4 className="text-white font-medium">Inicio desarrollo</h4>
              <p className="text-gray-400">Comenzamos a crear tu sitio web</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Error */}
      {submitError && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl"
        >
          <p className="text-red-400 text-sm">{submitError}</p>
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
          onClick={handleConfirm}
          disabled={isSubmitting}
          className="px-12 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold text-lg hover:from-blue-600 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-3 mx-auto"
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Guardando información...
            </>
          ) : (
            <>
              <span>🎉</span>
              Confirmar y Continuar
            </>
          )}
        </button>
        
        <p className="text-gray-500 text-sm mt-3">
          Al confirmar, tu información se guardará y podrás acceder a tu dashboard
        </p>
      </motion.div>
    </div>
  )
}