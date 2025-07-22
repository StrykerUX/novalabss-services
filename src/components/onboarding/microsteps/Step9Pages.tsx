import React from 'react'
import { motion } from 'framer-motion'
import { useOnboardingState } from '@/hooks/useOnboardingState'

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

const optionalPages = [
  { 
    name: 'Blog', 
    icon: '📝', 
    desc: 'Artículos y contenido actualizado',
    essential: false,
    color: 'from-indigo-500 to-purple-500'
  },
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
    name: 'Tienda', 
    icon: '🛍️', 
    desc: 'Catálogo de productos para venta',
    essential: false,
    color: 'from-emerald-500 to-teal-500'
  },
  { 
    name: 'Reservas', 
    icon: '📅', 
    desc: 'Sistema de citas o reservaciones',
    essential: false,
    color: 'from-slate-500 to-gray-500'
  }
]

export default function Step9Pages() {
  const { contentArchitecture, updateContentArchitecture } = useOnboardingState()

  const togglePage = (pageName: string) => {
    const currentPages = contentArchitecture.pages || []
    const newPages = currentPages.includes(pageName)
      ? currentPages.filter(p => p !== pageName)
      : [...currentPages, pageName]
    
    updateContentArchitecture({ pages: newPages })
  }

  const allPages = [...essentialPages, ...optionalPages]
  const selectedPages = contentArchitecture.pages || []

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
          ¿Qué páginas necesitas?
        </h3>
        <p className="text-sm text-gray-400">
          Selecciona las páginas para tu sitio web
        </p>
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
          <span>Páginas esenciales</span>
          <span className="text-xs text-gray-500">(recomendadas)</span>
        </h4>
        
        <div className="grid grid-cols-2 gap-3">
          {essentialPages.map((page, index) => {
            const isSelected = selectedPages.includes(page.name)
            
            return (
              <motion.button
                key={page.name}
                onClick={() => togglePage(page.name)}
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
                  <div className={`absolute inset-0 bg-gradient-to-br ${page.color} opacity-5`} />
                )}
                
                <div className="relative z-10 flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${page.color} flex items-center justify-center text-lg shadow-sm`}>
                    {page.icon}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-sm">{page.name}</div>
                    <div className="text-xs opacity-70">{page.desc}</div>
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
          <span>Páginas adicionales</span>
          <span className="text-xs text-gray-500">(opcionales)</span>
        </h4>
        
        <div className="grid grid-cols-2 gap-3">
          {optionalPages.map((page, index) => {
            const isSelected = selectedPages.includes(page.name)
            
            return (
              <motion.button
                key={page.name}
                onClick={() => togglePage(page.name)}
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
                  <div className={`absolute inset-0 bg-gradient-to-br ${page.color} opacity-5`} />
                )}
                
                <div className="relative z-10 flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${page.color} flex items-center justify-center text-lg shadow-sm`}>
                    {page.icon}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-sm">{page.name}</div>
                    <div className="text-xs opacity-70">{page.desc}</div>
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

      {/* Resumen de páginas seleccionadas */}
      {selectedPages.length > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          className="p-4 bg-gradient-to-br from-blue-500/5 to-purple-500/5 border border-blue-500/20 rounded-xl"
        >
          <div className="flex items-center space-x-2 mb-3">
            <span>📋</span>
            <span className="font-semibold text-white">
              {selectedPages.length} página{selectedPages.length !== 1 ? 's' : ''} seleccionada{selectedPages.length !== 1 ? 's' : ''}:
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {selectedPages.map((pageName, index) => {
              const pageData = allPages.find(p => p.name === pageName)
              return (
                <div
                  key={index}
                  className="flex items-center space-x-2 bg-gray-800/50 px-3 py-1 rounded-full text-sm"
                >
                  <span>{pageData?.icon}</span>
                  <span className="text-gray-300">{pageName}</span>
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
        💡 Puedes agregar más páginas después. Empezamos con las más importantes
      </motion.div>
    </div>
  )
}