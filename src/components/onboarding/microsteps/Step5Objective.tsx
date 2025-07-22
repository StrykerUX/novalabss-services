import React from 'react'
import { motion } from 'framer-motion'
import { useOnboardingState } from '@/hooks/useOnboardingState'

const objectives = [
  {
    value: 'sales',
    title: 'Vender Más',
    desc: 'Convertir visitantes en clientes',
    icon: '💰',
    color: 'from-green-500 to-emerald-500',
    examples: ['E-commerce', 'Productos', 'Servicios']
  },
  {
    value: 'leads',
    title: 'Generar Leads',
    desc: 'Captar clientes potenciales',
    icon: '🎯',
    color: 'from-blue-500 to-cyan-500',
    examples: ['Formularios', 'Cotizaciones', 'Consultas']
  },
  {
    value: 'branding',
    title: 'Fortalecer Marca',
    desc: 'Mejorar presencia y credibilidad',
    icon: '🚀',
    color: 'from-purple-500 to-pink-500',
    examples: ['Portafolio', 'Historia', 'Testimonios']
  },
  {
    value: 'portfolio',
    title: 'Mostrar Trabajo',
    desc: 'Exhibir proyectos y habilidades',
    icon: '🎨',
    color: 'from-orange-500 to-red-500',
    examples: ['Galería', 'Casos de éxito', 'Proyectos']
  }
]

export default function Step5Objective() {
  const { objectives: objectivesData, updateObjectives } = useOnboardingState()

  const handleSelect = (value: string) => {
    updateObjectives({ primaryGoal: value as any })
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
          ¿Cuál es tu objetivo principal?
        </h3>
        <p className="text-sm text-gray-400">
          Esto nos ayuda a enfocar el diseño y contenido
        </p>
      </motion.div>

      {/* Objetivos Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 gap-4"
      >
        {objectives.map((objective, index) => (
          <motion.button
            key={objective.value}
            onClick={() => handleSelect(objective.value)}
            className={`p-6 rounded-xl border-2 transition-all text-left relative overflow-hidden group ${
              objectivesData.primaryGoal === objective.value
                ? 'border-blue-500 bg-blue-500/10'
                : 'border-gray-700 hover:border-gray-600'
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Gradient background cuando está seleccionado */}
            {objectivesData.primaryGoal === objective.value && (
              <div className={`absolute inset-0 bg-gradient-to-br ${objective.color} opacity-5`} />
            )}
            
            <div className="relative z-10 flex items-center space-x-4">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${objective.color} flex items-center justify-center text-xl shadow-lg`}>
                {objective.icon}
              </div>
              
              <div className="flex-1">
                <h4 className="font-semibold text-white mb-1">{objective.title}</h4>
                <p className="text-sm text-gray-400 mb-2">{objective.desc}</p>
                <div className="flex flex-wrap gap-1">
                  {objective.examples.map((example, idx) => (
                    <span
                      key={idx}
                      className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded-full"
                    >
                      {example}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Checkmark cuando está seleccionado */}
              {objectivesData.primaryGoal === objective.value && (
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm">
                  ✓
                </div>
              )}
            </div>
          </motion.button>
        ))}
      </motion.div>

      {/* Información adicional basada en selección */}
      {objectivesData.primaryGoal && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="p-4 bg-gradient-to-br from-blue-500/5 to-purple-500/5 border border-blue-500/20 rounded-xl"
        >
          <div className="flex items-center space-x-2 mb-2">
            <span>{objectives.find(o => o.value === objectivesData.primaryGoal)?.icon}</span>
            <span className="font-semibold text-white">
              {objectives.find(o => o.value === objectivesData.primaryGoal)?.title}
            </span>
          </div>
          <p className="text-sm text-gray-400">
            {objectivesData.primaryGoal === 'sales' && "Enfocaremos el sitio en conversiones, botones de compra claros y proceso de venta optimizado."}
            {objectivesData.primaryGoal === 'leads' && "Crearemos formularios estratégicos y llamadas a la acción para capturar información de contacto."}
            {objectivesData.primaryGoal === 'branding' && "Diseñaremos un sitio que refleje tu identidad y construya confianza con tu audiencia."}
            {objectivesData.primaryGoal === 'portfolio' && "Crearemos una galería atractiva para mostrar tu trabajo y habilidades de manera impactante."}
          </p>
        </motion.div>
      )}
    </div>
  )
}