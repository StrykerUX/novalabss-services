import React from 'react'
import { motion } from 'framer-motion'
import { useOnboardingState } from '@/hooks/useOnboardingState'

const colorPalettes = [
  {
    name: 'Azul Profesional',
    colors: ['#1E40AF', '#3B82F6', '#60A5FA', '#93C5FD'],
    desc: 'Confianza y profesionalismo',
    mood: 'Corporativo, confiable, estable'
  },
  {
    name: 'Verde Naturaleza',
    colors: ['#059669', '#10B981', '#34D399', '#6EE7B7'],
    desc: 'Crecimiento y frescura',
    mood: 'Eco-friendly, salud, crecimiento'
  },
  {
    name: 'Púrpura Creativo',
    colors: ['#7C3AED', '#8B5CF6', '#A78BFA', '#C4B5FD'],
    desc: 'Innovación y creatividad',
    mood: 'Creativo, innovador, premium'
  },
  {
    name: 'Naranja Energético',
    colors: ['#EA580C', '#F97316', '#FB923C', '#FED7AA'],
    desc: 'Energía y entusiasmo',
    mood: 'Dinámico, juvenil, optimista'
  },
  {
    name: 'Rosa Moderno',
    colors: ['#BE185D', '#EC4899', '#F472B6', '#F9A8D4'],
    desc: 'Moderno y distintivo',
    mood: 'Trendy, femenino, suave'
  },
  {
    name: 'Gris Elegante',
    colors: ['#374151', '#6B7280', '#9CA3AF', '#D1D5DB'],
    desc: 'Sofisticado y neutro',
    mood: 'Elegante, minimalista, sofisticado'
  },
  {
    name: 'Rojo Audaz',
    colors: ['#DC2626', '#EF4444', '#F87171', '#FCA5A5'],
    desc: 'Pasión y determinación',
    mood: 'Audaz, apasionado, llamativo'
  },
  {
    name: 'Cian Fresco',
    colors: ['#0891B2', '#06B6D4', '#67E8F9', '#A5F3FC'],
    desc: 'Fresco y tecnológico',
    mood: 'Moderno, tecnológico, limpio'
  },
  {
    name: 'Dorado Lujo',
    colors: ['#A16207', '#D97706', '#F59E0B', '#FDE68A'],
    desc: 'Lujo y exclusividad',
    mood: 'Premium, elegante, exclusivo'
  },
  {
    name: 'Turquesa Tropical',
    colors: ['#0F766E', '#14B8A6', '#5EEAD4', '#A7F3D0'],
    desc: 'Tropical y relajante',
    mood: 'Fresco, tropical, relajante'
  },
  {
    name: 'Morado Misterioso',
    colors: ['#581C87', '#7C2D12', '#A855F7', '#DDD6FE'],
    desc: 'Misterioso y sofisticado',
    mood: 'Misterioso, premium, sofisticado'
  },
  {
    name: 'Azul Marino',
    colors: ['#1E293B', '#334155', '#64748B', '#CBD5E1'],
    desc: 'Clásico y confiable',
    mood: 'Clásico, confiable, profesional'
  },
  {
    name: 'Coral Vibrante',
    colors: ['#DC2626', '#F97316', '#FBBF24', '#FEF3C7'],
    desc: 'Vibrante y cálido',
    mood: 'Vibrante, cálido, energético'
  },
  {
    name: 'Lavanda Suave',
    colors: ['#6366F1', '#8B5CF6', '#C084FC', '#E9D5FF'],
    desc: 'Suave y relajante',
    mood: 'Suave, relajante, zen'
  },
  {
    name: 'Verde Bosque',
    colors: ['#166534', '#15803D', '#22C55E', '#BBF7D0'],
    desc: 'Natural y orgánico',
    mood: 'Natural, orgánico, sustentable'
  },
  {
    name: 'Sunset Gradient',
    colors: ['#DC2626', '#EA580C', '#F59E0B', '#FEF3C7'],
    desc: 'Cálido como un atardecer',
    mood: 'Cálido, acogedor, inspirador'
  }
]

export default function Step12Colors() {
  const { brandDesign, updateBrandDesign } = useOnboardingState()

  const handleColorSelect = (paletteName: string, colors: string[]) => {
    updateBrandDesign({ colors })
  }

  const getSelectedPalette = () => {
    if (!brandDesign.colors) return null
    return colorPalettes.find(palette => 
      JSON.stringify(palette.colors) === JSON.stringify(brandDesign.colors)
    )
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
          ¿Qué colores te gustan?
        </h3>
        <p className="text-sm text-gray-400">
          Selecciona la paleta que mejor represente tu marca
        </p>
      </motion.div>

      {/* Paletas de colores */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 gap-4"
      >
        {colorPalettes.map((palette, index) => {
          const isSelected = getSelectedPalette()?.name === palette.name
          
          return (
            <motion.button
              key={palette.name}
              onClick={() => handleColorSelect(palette.name, palette.colors)}
              className={`p-4 rounded-xl border-2 transition-all text-left relative overflow-hidden ${
                isSelected
                  ? 'border-blue-500 bg-blue-500/10'
                  : 'border-gray-700 hover:border-gray-600'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.05 }}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <div className="flex items-center space-x-4">
                {/* Paleta de colores */}
                <div className="flex space-x-1">
                  {palette.colors.map((color, colorIndex) => (
                    <div
                      key={colorIndex}
                      className="w-10 h-10 rounded-lg shadow-sm border border-gray-600"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
                
                {/* Información de la paleta */}
                <div className="flex-1">
                  <h4 className="font-semibold text-white mb-1">{palette.name}</h4>
                  <p className="text-sm text-gray-400 mb-1">{palette.desc}</p>
                  <p className="text-xs text-gray-500">{palette.mood}</p>
                </div>
                
                {/* Checkmark cuando está seleccionado */}
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

      {/* Preview de la paleta seleccionada */}
      {getSelectedPalette() && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="p-6 bg-gradient-to-br from-blue-500/5 to-purple-500/5 border border-blue-500/20 rounded-xl"
        >
          <div className="flex items-center space-x-2 mb-4">
            <span>🎨</span>
            <span className="font-semibold text-white">Paleta seleccionada:</span>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="flex space-x-2">
                {getSelectedPalette()!.colors.map((color, index) => (
                  <div
                    key={index}
                    className="w-8 h-8 rounded-lg shadow-sm border border-gray-600"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
              <div>
                <div className="font-medium text-white">{getSelectedPalette()!.name}</div>
                <div className="text-sm text-gray-400">{getSelectedPalette()!.desc}</div>
              </div>
            </div>
            
            {/* Mockup simple con previsualización en tiempo real */}
            <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
              <div className="text-xs text-gray-400 mb-3">Vista previa del sitio:</div>
              <div className="space-y-3">
                {/* Header simulado */}
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-8 h-8 rounded-full"
                    style={{ backgroundColor: getSelectedPalette()!.colors[0] }}
                  />
                  <div className="flex-1">
                    <div 
                      className="h-2 rounded w-20"
                      style={{ backgroundColor: getSelectedPalette()!.colors[1] }}
                    />
                  </div>
                  <div 
                    className="h-6 w-16 rounded text-xs flex items-center justify-center text-white font-medium"
                    style={{ backgroundColor: getSelectedPalette()!.colors[0] }}
                  >
                    Botón
                  </div>
                </div>
                
                {/* Contenido simulado */}
                <div className="space-y-2">
                  <div 
                    className="h-4 rounded w-full"
                    style={{ backgroundColor: getSelectedPalette()!.colors[1] }}
                  />
                  <div 
                    className="h-2 rounded w-3/4"
                    style={{ backgroundColor: getSelectedPalette()!.colors[2] }}
                  />
                  <div 
                    className="h-2 rounded w-1/2"
                    style={{ backgroundColor: getSelectedPalette()!.colors[3] }}
                  />
                </div>
                
                {/* Elementos de acción */}
                <div className="flex space-x-2">
                  <div 
                    className="h-6 w-12 rounded text-xs flex items-center justify-center text-white font-medium"
                    style={{ backgroundColor: getSelectedPalette()!.colors[1] }}
                  >
                    CTA
                  </div>
                  <div 
                    className="h-6 w-12 rounded text-xs flex items-center justify-center text-white font-medium"
                    style={{ backgroundColor: getSelectedPalette()!.colors[2] }}
                  >
                    Link
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Información adicional */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="text-center text-xs text-gray-500 bg-gray-900/50 p-3 rounded-xl"
      >
        💡 Los colores se pueden ajustar más tarde según tu marca y preferencias específicas
      </motion.div>
    </div>
  )
}