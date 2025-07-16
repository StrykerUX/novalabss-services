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
      title: "2-3 clientes más",
      description: "Busco estabilidad y crecimiento sostenible"
    },
    {
      id: "5-10_clientes" as Aspiration,
      icon: "📈", 
      title: "5-10 clientes más",
      description: "Quiero consolidar mi negocio"
    },
    {
      id: "10-20_clientes" as Aspiration,
      icon: "🚀",
      title: "10-20 clientes más",
      description: "Estoy listo para escalar seriamente"
    },
    {
      id: "20_plus_clientes" as Aspiration,
      icon: "💰",
      title: "20+ clientes",
      description: "Quiero dominar mi mercado"
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
    <div>
      <div className="text-center mb-6 lg:mb-8">
        <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-3" style={{textWrap: "pretty"}}>
          ¿Cuántos clientes más necesitas al mes?
        </h2>
      </div>

      <div className="flex flex-col space-y-3 lg:space-y-4">
        {aspirations.map((aspiration) => (
          <button
            key={aspiration.id}
            onClick={() => handleSelect(aspiration.id)}
            className={`group w-full p-4 lg:p-5 rounded-[24px] border text-left transition-all duration-300 hover:scale-[1.02] ${
              selectedAspiration === aspiration.id
                ? 'border-blue-500 bg-blue-500/10 shadow-lg shadow-blue-500/20'
                : 'border-gray-700 bg-gray-900/50 hover:border-gray-600 hover:bg-gray-800/50'
            }`}
          >
            <div className="flex items-start space-x-3 lg:space-x-4">
              <div className="text-2xl lg:text-3xl flex-shrink-0">
                {aspiration.icon}
              </div>
              <div className="flex-1">
                <h3 className="text-white font-semibold mb-1 lg:mb-2 group-hover:text-blue-300 transition-colors text-sm lg:text-base" style={{textWrap: "pretty"}}>
                  {aspiration.title}
                </h3>
                <p className="text-gray-400 text-xs lg:text-sm" style={{textWrap: "pretty"}}>
                  {aspiration.description}
                </p>
              </div>
              {selectedAspiration === aspiration.id && (
                <div className="flex items-center text-blue-400 text-sm">
                  <svg className="w-4 h-4 lg:w-5 lg:h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}