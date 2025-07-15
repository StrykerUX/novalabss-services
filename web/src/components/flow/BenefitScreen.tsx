"use client"

import { useEffect, useState } from "react"
import { Frustration, Aspiration } from "@/app/start/page"
import SmoothMagneticButton from "@/components/SmoothMagneticButton"

interface BenefitScreenProps {
  frustration: Frustration
  aspiration: Aspiration
  onContinue: () => void
}

export default function BenefitScreen({ frustration, aspiration, onContinue }: BenefitScreenProps) {
  const [timeLeft, setTimeLeft] = useState(10)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer)
          onContinue()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [onContinue])
  
  // Obtener beneficio personalizado
  const getBenefit = () => {
    const benefits = {
      "pocos_encuentran_2-3_clientes": "Aumenta 4x tu visibilidad",
      "pocos_encuentran_5-10_clientes": "Genera 8x más leads",
      "pocos_encuentran_10-20_clientes": "Domina tu mercado local",
      "pocos_encuentran_20_plus_clientes": "Vuélvete referente",
      "no_confianza_2-3_clientes": "Triplica tu conversión",
      "no_confianza_5-10_clientes": "Aumenta 5x tus ventas",
      "no_confianza_10-20_clientes": "Posiciónate como premium",
      "no_confianza_20_plus_clientes": "Atrae clientes de alta gama",
      "pierdo_competencia_2-3_clientes": "Supera a tu competencia",
      "pierdo_competencia_5-10_clientes": "Vuélvete la primera opción",
      "pierdo_competencia_10-20_clientes": "Lidera tu categoría",
      "pierdo_competencia_20_plus_clientes": "Redefine tu mercado",
      "no_tiempo_2-3_clientes": "Automatiza tu captación",
      "no_tiempo_5-10_clientes": "Libera 20+ horas semanales",
      "no_tiempo_10-20_clientes": "Escala sin más trabajo",
      "no_tiempo_20_plus_clientes": "Construye una máquina de ventas"
    }

    const key = `${frustration}_${aspiration}` as keyof typeof benefits
    return benefits[key]
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px]">
      
      {/* Título contextual */}
      <div className="text-center mb-8">
        <h2 className="text-xl font-medium text-gray-400 mb-4">
          Basado en tu situación...
        </h2>
      </div>

      {/* Beneficio protagonista */}
      <div className="text-center mb-12">
        <p className="text-white text-3xl font-bold mb-4">
          ✨ {getBenefit()}
        </p>
        <p className="text-gray-400 text-lg">
          Con la solución perfecta para tu negocio
        </p>
      </div>

      {/* Botón para continuar con timer */}
      <div className="text-center">
        <SmoothMagneticButton
          onClick={onContinue}
          className="px-8 py-4 font-space-grotesk font-semibold text-lg hover:shadow-2xl hover:shadow-blue-500/40 transition-shadow duration-300 shadow-xl shadow-blue-600/30 flex items-center justify-center"
          magneticStrength={0.2}
        >
          <span>Continuar</span>
          <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </SmoothMagneticButton>
      </div>

      {/* Timer auto-avance */}
      <div className="mt-8 text-center">
        <p className="text-gray-500 text-sm">
          💡 Preparando tu caso de éxito... <span className="text-blue-400">({timeLeft}s)</span>
        </p>
      </div>
    </div>
  )
}