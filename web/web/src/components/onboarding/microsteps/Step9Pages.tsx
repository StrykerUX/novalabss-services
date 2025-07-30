import React from 'react'
import { motion } from 'framer-motion'
import { useOnboardingState } from '@/hooks/useOnboardingState'
import { useUserProjects } from '@/hooks/useUserProjects'
import { useSubscription } from '@/hooks/useSubscription'

const essentialPages = [
  { 
    name: 'Inicio', 
    icon: '🏠', 
    desc: 'Página principal con información clave',
    essential: true,
    color: 'from-blue-500 to-cyan-500'
  },
  { 
    name: 'Sobre Nosotros', 
    icon: '👥', 
    desc: 'Historia, misión y equipo',
    essential: true,
    color: 'from-purple-500 to-pink-500'
  },
  { 
    name: 'Servicios', 
    icon: '⚙️', 
    desc: 'Productos o servicios que ofreces',
    essential: true,
    color: 'from-green-500 to-emerald-500'
  },
  { 
    name: 'Contacto', 
    icon: '📞', 
    desc: 'Información de contacto y formulario',
    essential: true,
    color: 'from-orange-500 to-red-500'
  }
]

const essentialSections = [
  { 
    name: 'Hero', 
    icon: '🎯', 
    desc: 'Sección principal con llamada a la acción',
    essential: true,
    color: 'from-blue-500 to-cyan-500'
  },
  { 
    name: 'Sobre Nosotros', 
    icon: '👥', 
    desc: 'Información sobre la empresa',
    essential: true,
    color: 'from-purple-500 to-pink-500'
  },
  { 
    name: 'Servicios', 
    icon: '⚙️', 
    desc: 'Productos o servicios principales',
    essential: true,
    color: 'from-green-500 to-emerald-500'
  },
  { 
    name: 'Contacto', 
    icon: '📞', 
    desc: 'Formulario de contacto',
    essential: true,
    color: 'from-orange-500 to-red-500'
  }
]

const optionalPages = [
  { 
    name: 'Portafolio', 
    icon: '🎨', 
    desc: 'Galería de trabajos realizados',
    essential: false,
    color: 'from-pink-500 to-rose-500'
  },
  { 
    name: 'Testimonios', 
    icon: '⭐', 
    desc: 'Reseñas de clientes satisfechos',
    essential: false,
    color: 'from-yellow-500 to-orange-500'
  },
  { 
    name: 'FAQ', 
    icon: '❓', 
    desc: 'Preguntas frecuentes',
    essential: false,
    color: 'from-teal-500 to-green-500'
  },
  { 
    name: 'Catálogo', 
    icon: '🛍️', 
    desc: 'Catálogo de productos para venta',
    essential: false,
    color: 'from-emerald-500 to-teal-500'
  },
  { 
    name: 'Servicios Premium', 
    icon: '✨', 
    desc: 'Servicios exclusivos y especializados',
    essential: false,
    color: 'from-violet-500 to-purple-500'
  },
  { 
    name: 'Centro de Ayuda', 
    icon: '🆘', 
    desc: 'Soporte y documentación',
    essential: false,
    color: 'from-slate-500 to-gray-500'
  }
]

const optionalSections = [
  { 
    name: 'Portafolio', 
    icon: '🎨', 
    desc: 'Galería de trabajos',
    essential: false,
    color: 'from-pink-500 to-rose-500'
  },
  { 
    name: 'Testimonios', 
    icon: '⭐', 
    desc: 'Reseñas de clientes',
    essential: false,
    color: 'from-yellow-500 to-orange-500'
  },
  { 
    name: 'FAQ', 
    icon: '❓', 
    desc: 'Preguntas frecuentes',
    essential: false,
    color: 'from-teal-500 to-green-500'
  },
  { 
    name: 'Catálogo', 
    icon: '🛍️', 
    desc: 'Productos principales',
    essential: false,
    color: 'from-emerald-500 to-teal-500'
  }
]

export default function Step9Pages() {
  const { contentArchitecture, updateContentArchitecture } = useOnboardingState()
  const { projects } = useUserProjects()
  const subscriptionData = useSubscription()

  // Determinar el plan del usuario
  const getUserPlan = () => {
    if (projects && projects.length > 0) {
      return projects[0].plan // Usar plan del proyecto más reciente
    }
    return subscriptionData.plan?.name?.includes('Galaxy') ? 'Galaxy' : 'Rocket'
  }

  const userPlan = getUserPlan()
  const isGalaxyPlan = userPlan === 'Galaxy'

  const togglePage = (pageName: string) => {
    const currentPages = contentArchitecture.pages || []
    const currentSections = contentArchitecture.sections || []
    
    if (isGalaxyPlan) {
      // Para Galaxy, manejamos páginas
      const newPages = currentPages.includes(pageName)
        ? currentPages.filter(p => p !== pageName)
        : [...currentPages, pageName]
      
      updateContentArchitecture({ pages: newPages })
    } else {
      // Para Rocket, manejamos secciones
      const newSections = currentSections.includes(pageName)
        ? currentSections.filter(s => s !== pageName)
        : [...currentSections, pageName]
      
      updateContentArchitecture({ sections: newSections })
    }
  }

  const essentialItems = isGalaxyPlan ? essentialPages : essentialSections
  const optionalItems = isGalaxyPlan ? optionalPages : optionalSections
  const allItems = [...essentialItems, ...optionalItems]
  const selectedItems = isGalaxyPlan ? (contentArchitecture.pages || []) : (contentArchitecture.sections || [])

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
          {isGalaxyPlan ? '¿Qué páginas necesitas?' : '¿Qué secciones necesitas?'}
        </h3>
        <p className="text-sm text-gray-400">
          {isGalaxyPlan 
            ? 'Selecciona las páginas para tu sitio web' 
            : 'Selecciona las secciones para tu página web'
          }
        </p>
        <div className="mt-2 text-xs text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full inline-block">
          Plan {userPlan} - {isGalaxyPlan ? 'Sitio multipágina' : 'Página única'}
        </div>
      </motion.div>

      {/* Páginas esenciales */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-3"
      >
        <h4 className="text-sm font-medium text-gray-300 flex items-center space-x-2">
          <span>⭐</span>
          <span>{isGalaxyPlan ? 'Páginas esenciales' : 'Secciones esenciales'}</span>
          <span className="text-xs text-gray-500">(recomendadas)</span>
        </h4>
        
        <div className="grid grid-cols-2 gap-3">
          {essentialItems.map((item, index) => {
            const isSelected = selectedItems.includes(item.name)
            
            return (
              <motion.button
                key={item.name}
                onClick={() => togglePage(item.name)}
                className={`p-4 rounded-xl border-2 transition-all text-left relative overflow-hidden ${
                  isSelected
                    ? 'border-blue-500 bg-blue-500/10 text-white'
                    : 'border-gray-700 hover:border-gray-600 text-gray-300'
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.05 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Gradient background cuando está seleccionado */}
                {isSelected && (
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-5`} />
                )}
                
                <div className="relative z-10 flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${item.color} flex items-center justify-center text-lg shadow-sm`}>
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-sm">{item.name}</div>
                    <div className="text-xs opacity-70">{item.desc}</div>
                  </div>
                  {isSelected && (
                    <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs">
                      ✓
                    </div>
                  )}
                </div>
              </motion.button>
            )
          })}
        </div>
      </motion.div>

      {/* Páginas opcionales */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="space-y-3"
      >
        <h4 className="text-sm font-medium text-gray-300 flex items-center space-x-2">
          <span>✨</span>
          <span>{isGalaxyPlan ? 'Páginas adicionales' : 'Secciones adicionales'}</span>
          <span className="text-xs text-gray-500">(opcionales)</span>
        </h4>
        
        <div className="grid grid-cols-2 gap-3">
          {optionalItems.map((item, index) => {
            const isSelected = selectedItems.includes(item.name)
            
            return (
              <motion.button
                key={item.name}
                onClick={() => togglePage(item.name)}
                className={`p-4 rounded-xl border-2 transition-all text-left relative overflow-hidden ${
                  isSelected
                    ? 'border-blue-500 bg-blue-500/10 text-white'
                    : 'border-gray-700 hover:border-gray-600 text-gray-300'
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.05 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Gradient background cuando está seleccionado */}
                {isSelected && (
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-5`} />
                )}
                
                <div className="relative z-10 flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${item.color} flex items-center justify-center text-lg shadow-sm`}>
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-sm">{item.name}</div>
                    <div className="text-xs opacity-70">{item.desc}</div>
                  </div>
                  {isSelected && (
                    <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs">
                      ✓
                    </div>
                  )}
                </div>
              </motion.button>
            )
          })}
        </div>
      </motion.div>

      {/* Resumen de páginas/secciones seleccionadas */}
      {selectedItems.length > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          className="p-4 bg-gradient-to-br from-blue-500/5 to-purple-500/5 border border-blue-500/20 rounded-xl"
        >
          <div className="flex items-center space-x-2 mb-3">
            <span>📋</span>
            <span className="font-semibold text-white">
              {selectedItems.length} {isGalaxyPlan ? 'página' : 'sección'}{selectedItems.length !== 1 ? 's' : ''} seleccionada{selectedItems.length !== 1 ? 's' : ''}:
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {selectedItems.map((itemName, index) => {
              const itemData = allItems.find(p => p.name === itemName)
              return (
                <div
                  key={index}
                  className="flex items-center space-x-2 bg-gray-800/50 px-3 py-1 rounded-full text-sm"
                >
                  <span>{itemData?.icon}</span>
                  <span className="text-gray-300">{itemName}</span>
                </div>
              )
            })}
          </div>
        </motion.div>
      )}

      {/* Sugerencia */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="text-center text-xs text-gray-500 bg-gray-900/50 p-3 rounded-xl"
      >
        💡 Puedes agregar más {isGalaxyPlan ? 'páginas' : 'secciones'} después. Empezamos con las más importantes
      </motion.div>
    </div>
  )
}