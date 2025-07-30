import React from 'react'
import { motion } from 'framer-motion'
import { useOnboardingState } from '@/hooks/useOnboardingState'

const industries = [
  'Tecnología', 'Salud', 'Educación', 'Retail', 'Restaurantes', 'Servicios Profesionales',
  'Bienes Raíces', 'Turismo', 'Fitness', 'Belleza', 'Automoción', 'Construcción',
  'Finanzas', 'Arte y Diseño', 'Entretenimiento', 'Consultoría', 'E-commerce', 'Otro'
]

const businessSizes = [
  { value: 'freelancer', label: 'Freelancer' },
  { value: 'startup', label: 'Startup' },
  { value: 'pyme', label: 'PYME' },
  { value: 'empresa', label: 'Empresa' }
]

const objectives = [
  { value: 'sales', label: 'Vender Más' },
  { value: 'leads', label: 'Generar Leads' },
  { value: 'branding', label: 'Fortalecer Marca' },
  { value: 'portfolio', label: 'Mostrar Trabajo' }
]

export default function Step16Review() {
  const { 
    businessInfo, 
    objectives: objectivesData, 
    contentArchitecture, 
    brandDesign, 
    technicalSetup 
  } = useOnboardingState()

  const getProgressPercentage = () => {
    const sections = [
      { name: 'Información del Negocio', complete: businessInfo.name && businessInfo.industry && businessInfo.size && businessInfo.location },
      { name: 'Objetivos', complete: objectivesData.primaryGoal && objectivesData.targetAudience?.ageRange },
      { name: 'Contenido', complete: contentArchitecture.pages && contentArchitecture.features },
      { name: 'Diseño', complete: brandDesign.colors && brandDesign.style },
      { name: 'Dominio', complete: technicalSetup.domain?.name }
    ]
    
    const completedSections = sections.filter(section => section.complete).length
    return Math.round((completedSections / sections.length) * 100)
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
          ¡Revisemos tu proyecto!
        </h3>
        <p className="text-sm text-gray-400">
          Confirmemos todos los detalles antes de comenzar
        </p>
      </motion.div>

      {/* Progreso general */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="p-4 bg-gradient-to-br from-green-500/5 to-emerald-500/5 border border-green-500/20 rounded-xl"
      >
        <div className="flex items-center space-x-2 mb-3">
          <span>🎉</span>
          <span className="font-semibold text-white">Onboarding {getProgressPercentage()}% completo</span>
        </div>
        <div className="w-full bg-gray-800 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all duration-1000"
            style={{ width: `${getProgressPercentage()}%` }}
          />
        </div>
      </motion.div>

      {/* Resumen por secciones */}
      <div className="space-y-4">
        {/* Información del Negocio */}
        {businessInfo.name && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="p-4 bg-gray-900/50 border border-gray-700 rounded-xl"
          >
            <h4 className="font-medium text-white mb-3 flex items-center space-x-2">
              <span>🏢</span>
              <span>Información del Negocio</span>
            </h4>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <span className="text-gray-400">Empresa:</span>
                <span className="text-white ml-2">{businessInfo.name}</span>
              </div>
              <div>
                <span className="text-gray-400">Industria:</span>
                <span className="text-white ml-2">{businessInfo.industry}</span>
              </div>
              <div>
                <span className="text-gray-400">Tamaño:</span>
                <span className="text-white ml-2">
                  {businessSizes.find(s => s.value === businessInfo.size)?.label}
                </span>
              </div>
              <div>
                <span className="text-gray-400">Ubicación:</span>
                <span className="text-white ml-2">{businessInfo.location}</span>
              </div>
            </div>
          </motion.div>
        )}

        {/* Objetivos */}
        {objectivesData.primaryGoal && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="p-4 bg-gray-900/50 border border-gray-700 rounded-xl"
          >
            <h4 className="font-medium text-white mb-3 flex items-center space-x-2">
              <span>🎯</span>
              <span>Objetivos y Audiencia</span>
            </h4>
            <div className="space-y-2 text-sm">
              <div>
                <span className="text-gray-400">Objetivo principal:</span>
                <span className="text-white ml-2">
                  {objectives.find(o => o.value === objectivesData.primaryGoal)?.label}
                </span>
              </div>
              {objectivesData.targetAudience?.ageRange && (
                <div>
                  <span className="text-gray-400">Audiencia:</span>
                  <span className="text-white ml-2">
                    {objectivesData.targetAudience.ageRange} años
                    {objectivesData.targetAudience.location && ` - ${objectivesData.targetAudience.location}`}
                  </span>
                </div>
              )}
              {objectivesData.targetAudience?.interests && objectivesData.targetAudience.interests.length > 0 && (
                <div>
                  <span className="text-gray-400">Intereses:</span>
                  <span className="text-white ml-2">
                    {objectivesData.targetAudience.interests.slice(0, 3).join(', ')}
                    {objectivesData.targetAudience.interests.length > 3 && '...'}
                  </span>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Contenido */}
        {(contentArchitecture.pages || contentArchitecture.features) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="p-4 bg-gray-900/50 border border-gray-700 rounded-xl"
          >
            <h4 className="font-medium text-white mb-3 flex items-center space-x-2">
              <span>📄</span>
              <span>Contenido y Estructura</span>
            </h4>
            <div className="space-y-2 text-sm">
              {contentArchitecture.pages && contentArchitecture.pages.length > 0 && (
                <div>
                  <span className="text-gray-400">Páginas ({contentArchitecture.pages.length}):</span>
                  <span className="text-white ml-2">
                    {contentArchitecture.pages.slice(0, 3).join(', ')}
                    {contentArchitecture.pages.length > 3 && '...'}
                  </span>
                </div>
              )}
              {contentArchitecture.features && contentArchitecture.features.length > 0 && (
                <div>
                  <span className="text-gray-400">Funcionalidades ({contentArchitecture.features.length}):</span>
                  <span className="text-white ml-2">
                    {contentArchitecture.features.slice(0, 2).join(', ')}
                    {contentArchitecture.features.length > 2 && '...'}
                  </span>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Diseño */}
        {(brandDesign.colors || brandDesign.style) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="p-4 bg-gray-900/50 border border-gray-700 rounded-xl"
          >
            <h4 className="font-medium text-white mb-3 flex items-center space-x-2">
              <span>🎨</span>
              <span>Identidad Visual</span>
            </h4>
            <div className="space-y-2 text-sm">
              {brandDesign.colors && brandDesign.colors.length > 0 && (
                <div className="flex items-center space-x-2">
                  <span className="text-gray-400">Colores:</span>
                  <div className="flex space-x-1">
                    {brandDesign.colors.slice(0, 4).map((color, index) => (
                      <div
                        key={index}
                        className="w-4 h-4 rounded border border-gray-600"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
              )}
              {brandDesign.style && (
                <div>
                  <span className="text-gray-400">Estilo:</span>
                  <span className="text-white ml-2 capitalize">{brandDesign.style}</span>
                </div>
              )}
              {brandDesign.logoStatus && (
                <div>
                  <span className="text-gray-400">Logo:</span>
                  <span className="text-white ml-2">
                    {brandDesign.logoStatus === 'existing' && 'Existente'}
                    {brandDesign.logoStatus === 'needs-design' && 'Necesita diseño'}
                    {brandDesign.logoStatus === 'needs-update' && 'Necesita actualización'}
                  </span>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Dominio */}
        {technicalSetup.domain?.name && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="p-4 bg-gray-900/50 border border-gray-700 rounded-xl"
          >
            <h4 className="font-medium text-white mb-3 flex items-center space-x-2">
              <span>🌐</span>
              <span>Configuración Técnica</span>
            </h4>
            <div className="text-sm">
              <div className="flex items-center space-x-2">
                <span className="text-gray-400">Dominio:</span>
                <span className="text-white font-mono">{technicalSetup.domain.name}</span>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  technicalSetup.domain.existing 
                    ? 'bg-green-500/20 text-green-400' 
                    : 'bg-blue-500/20 text-blue-400'
                }`}>
                  {technicalSetup.domain.existing ? 'Existente' : 'Nuevo'}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Próximos pasos */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="p-6 bg-gradient-to-br from-blue-500/5 to-purple-500/5 border border-blue-500/20 rounded-xl"
      >
        <h4 className="font-medium text-white mb-4 flex items-center space-x-2">
          <span>🚀</span>
          <span>Próximos Pasos</span>
        </h4>
        <div className="space-y-3 text-sm">
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">1</div>
            <div>
              <div className="text-white font-medium">Análisis y Planificación</div>
              <div className="text-gray-400">Revisaremos tu información y crearemos una estrategia personalizada</div>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">2</div>
            <div>
              <div className="text-white font-medium">Diseño y Desarrollo</div>
              <div className="text-gray-400">Comenzaremos el diseño de tu sitio web según tus especificaciones</div>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">3</div>
            <div>
              <div className="text-white font-medium">Revisión y Ajustes</div>
              <div className="text-gray-400">Te mostraremos el progreso y haremos los ajustes necesarios</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Información de contacto */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="text-center text-xs text-gray-500 bg-gray-900/50 p-4 rounded-xl"
      >
        <p className="mb-2">
          🎉 ¡Felicidades! Has completado el onboarding. 
        </p>
        <p>
          Nuestro equipo revisará tu información y se pondrá en contacto contigo en las próximas 24 horas.
        </p>
      </motion.div>
    </div>
  )
}