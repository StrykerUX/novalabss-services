"use client"

import { useState } from "react"
import { Frustration } from "@/app/start/page"

interface FrustrationCardProps {
  onSelect: (frustration: Frustration) => void
}

export default function FrustrationCard({ onSelect }: FrustrationCardProps) {
  const [selectedFrustration, setSelectedFrustration] = useState<Frustration | null>(null)

  const frustrations = [
    {
      id: "pocos_encuentran" as Frustration,
      icon: "🔍",
      title: "Pocos me encuentran",
      description: "Mi negocio es invisible en internet"
    },
    {
      id: "no_confianza" as Frustration,
      icon: "😔", 
      title: "No genero confianza",
      description: "Mi sitio se ve amateur o desactualizado"
    },
    {
      id: "pierdo_competencia" as Frustration,
      icon: "⚡",
      title: "Pierdo vs competencia", 
      description: "Otros negocios se ven más profesionales"
    },
    {
      id: "no_tiempo" as Frustration,
      icon: "⏰",
      title: "No tengo tiempo",
      description: "Necesito enfocarme en vender, no en tecnología"
    }
  ]

  const handleSelect = (frustration: Frustration) => {
    setSelectedFrustration(frustration)
    // Pequeño delay para mostrar la selección
    setTimeout(() => {
      onSelect(frustration)
    }, 300)
  }

  return (
    <div className="p-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-3">
          ¿Cuál es tu mayor problema con tu presencia digital?
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {frustrations.map((frustration) => (
          <button
            key={frustration.id}
            onClick={() => handleSelect(frustration.id)}
            className={`group p-6 rounded-xl border text-left transition-all duration-300 hover:scale-105 ${
              selectedFrustration === frustration.id
                ? 'border-blue-500 bg-blue-500/10 shadow-lg shadow-blue-500/20'
                : 'border-gray-700 bg-gray-900/50 hover:border-gray-600 hover:bg-gray-800/50'
            }`}
          >
            <div className="flex items-start space-x-4">
              <div className="text-3xl flex-shrink-0">
                {frustration.icon}
              </div>
              <div>
                <h3 className="text-white font-semibold mb-2 group-hover:text-blue-300 transition-colors">
                  {frustration.title}
                </h3>
                <p className="text-gray-400 text-sm">
                  {frustration.description}
                </p>
              </div>
            </div>
            
            {selectedFrustration === frustration.id && (
              <div className="mt-4 flex items-center text-blue-400 text-sm">
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
          💡 Siguiente paso...
        </p>
      </div>
    </div>
  )
}