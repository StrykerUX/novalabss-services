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
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let startTime = Date.now()
    const totalDuration = 5000 // 5 segundos total
    
    const updateProgress = () => {
      const elapsed = Date.now() - startTime
      let currentProgress = 0
      
      if (elapsed <= 1500) {
        // Primeros 1.5s: 0% a 50% (rápido)
        currentProgress = (elapsed / 1500) * 50
      } else if (elapsed <= totalDuration) {
        // Siguientes 3.5s: 50% a 100% (lento)
        const remainingTime = elapsed - 1500
        const remainingProgress = (remainingTime / 3500) * 50
        currentProgress = 50 + remainingProgress
      } else {
        currentProgress = 100
      }
      
      setProgress(Math.min(currentProgress, 100))
      
      if (elapsed >= totalDuration) {
        setTimeout(() => onContinue(), 0)
      } else {
        requestAnimationFrame(updateProgress)
      }
    }
    
    const animationFrame = requestAnimationFrame(updateProgress)
    
    return () => cancelAnimationFrame(animationFrame)
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
    <div className="flex flex-col items-center justify-center h-full">
      
      {/* Título contextual */}
      <div className="text-center mb-8 lg:mb-10">
        <h2 className="text-lg lg:text-xl font-medium text-gray-400 mb-4">
          Basado en tu situación...
        </h2>
      </div>

      {/* Beneficio protagonista */}
      <div className="text-center mb-8 lg:mb-10 flex-1 flex flex-col justify-center">
        <p className="text-white text-2xl lg:text-3xl font-bold mb-4">
          ✨ {getBenefit()}
        </p>
        <p className="text-gray-400 text-base lg:text-lg">
          Con la solución perfecta para tu negocio
        </p>
      </div>

      {/* Botón para continuar con timer */}
      <div className="text-center mb-8 lg:mb-10">
        <SmoothMagneticButton
          onClick={onContinue}
          className="px-6 lg:px-8 py-3 lg:py-4 font-space-grotesk font-semibold text-base lg:text-lg hover:shadow-2xl hover:shadow-blue-500/40 transition-shadow duration-300 shadow-xl shadow-blue-600/30 flex items-center justify-center"
          magneticStrength={0.2}
        >
          <span>Continuar</span>
          <svg className="w-4 h-4 lg:w-5 lg:h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </SmoothMagneticButton>
      </div>

      {/* Barra de progreso */}
      <div className="text-center mt-6 lg:mt-8">
        <p className="text-gray-500 text-xs lg:text-sm mb-3">
          💡 Preparando tu caso de éxito...
        </p>
        <div className="w-full max-w-xs mx-auto bg-gray-800 rounded-full h-1.5 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full transition-all duration-100 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  )
}