"use client"

import { useState } from "react"
import { Aspiration } from "@/app/start/page"

interface AspirationCardProps {
  onSelect: (aspiration: Aspiration) => void
}

export default function AspirationCard({ onSelect }: AspirationCardProps) {
  const [selectedAspiration, setSelectedAspiration] = useState<Aspiration | null>(null)

  const aspirations = [
    {
      id: "2-3_clientes" as Aspiration,
      icon: "🎯",
      title: "Solo 2-3 clientes más me cambiarían la vida",
      description: "Busco estabilidad y crecimiento sostenible",
      impact: "Impacto: +$7,500 MXN/mes"
    },
    {
      id: "5-10_clientes" as Aspiration,
      icon: "📈", 
      title: "5-10 clientes más me darían estabilidad",
      description: "Quiero consolidar mi negocio",
      impact: "Impacto: +$22,500 MXN/mes"
    },
    {
      id: "10-20_clientes" as Aspiration,
      icon: "🚀",
      title: "10-20 clientes más me harían crecer mucho",
      description: "Estoy listo para escalar seriamente", 
      impact: "Impacto: +$45,000 MXN/mes"
    },
    {
      id: "20_plus_clientes" as Aspiration,
      icon: "💰",
      title: "Más de 20 clientes - quiero escalar grande",
      description: "Busco dominar mi mercado",
      impact: "Impacto: +$75,000 MXN/mes"
    }
  ]

  const handleSelect = (aspiration: Aspiration) => {
    setSelectedAspiration(aspiration)
    // Pequeño delay para mostrar la selección
    setTimeout(() => {
      onSelect(aspiration)
    }, 300)
  }

  return (
    <div className="p-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-3">
          ¿Cuántos clientes más necesitas por mes?
        </h2>
        <p className="text-gray-400">
          Esto nos ayuda a calcular el ROI específico para tu situación
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {aspirations.map((aspiration) => (
          <button
            key={aspiration.id}
            onClick={() => handleSelect(aspiration.id)}
            className={`group p-6 rounded-xl border text-left transition-all duration-300 hover:scale-105 ${
              selectedAspiration === aspiration.id
                ? 'border-green-500 bg-green-500/10 shadow-lg shadow-green-500/20'
                : 'border-gray-700 bg-gray-900/50 hover:border-gray-600 hover:bg-gray-800/50'
            }`}
          >
            <div className="flex items-start space-x-4">
              <div className="text-3xl flex-shrink-0">
                {aspiration.icon}
              </div>
              <div>
                <h3 className="text-white font-semibold mb-2 group-hover:text-green-300 transition-colors">
                  {aspiration.title}
                </h3>
                <p className="text-gray-400 text-sm mb-2">
                  {aspiration.description}
                </p>
                <p className="text-green-400 text-sm font-medium">
                  {aspiration.impact}
                </p>
              </div>
            </div>
            
            {selectedAspiration === aspiration.id && (
              <div className="mt-4 flex items-center text-green-400 text-sm">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Seleccionado
              </div>
            )}
          </button>
        ))}
      </div>

      <div className="mt-8 text-center">
        <p className="text-gray-500 text-sm">
          💡 Perfecto, ahora calculemos tu potencial de crecimiento...
        </p>
      </div>
    </div>
  )
}