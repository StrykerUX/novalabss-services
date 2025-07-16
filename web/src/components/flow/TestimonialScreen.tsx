"use client"

import { useEffect, useState } from "react"
import { Frustration, Aspiration } from "@/app/start/page"
import SmoothMagneticButton from "@/components/SmoothMagneticButton"

interface TestimonialScreenProps {
  frustration: Frustration
  aspiration: Aspiration
  onContinue: () => void
}

export default function TestimonialScreen({ frustration, aspiration, onContinue }: TestimonialScreenProps) {
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
  
  // Obtener testimonio personalizado
  const getTestimonial = () => {
    const testimonials = {
      "pocos_encuentran_2-3_clientes": "\"Pasé de invisible a 3 llamadas diarias\" - Ana",
      "pocos_encuentran_5-10_clientes": "\"Ahora me encuentran, no al revés\" - Carlos",
      "pocos_encuentran_10-20_clientes": "\"De luchar por clientes a rechazar proyectos\" - María",
      "pocos_encuentran_20_plus_clientes": "\"Ahora la competencia me copia\" - Luis",
      "no_confianza_2-3_clientes": "\"Mi sitio cierra ventas mientras duermo\" - Patricia",
      "no_confianza_5-10_clientes": "\"Los clientes confían desde el primer clic\" - Roberto",
      "no_confianza_10-20_clientes": "\"Ahora cobro 3x más por lo mismo\" - Elena",
      "no_confianza_20_plus_clientes": "\"Mi sitio me posicionó como experto #1\" - Fernando",
      "pierdo_competencia_2-3_clientes": "\"Ahora domino las búsquedas\" - Sandra",
      "pierdo_competencia_5-10_clientes": "\"Me eligen sobre cualquier competencia\" - Miguel",
      "pierdo_competencia_10-20_clientes": "\"De seguir a otros a que me sigan\" - Andrea",
      "pierdo_competencia_20_plus_clientes": "\"Ahora dicto las reglas\" - David",
      "no_tiempo_2-3_clientes": "\"Ahora vendo 24/7 sin esfuerzo\" - Carmen",
      "no_tiempo_5-10_clientes": "\"Mi sitio trabaja mientras atiendo clientes\" - Raúl",
      "no_tiempo_10-20_clientes": "\"Crecí 10x sin trabajar más horas\" - Sofía",
      "no_tiempo_20_plus_clientes": "\"Mi negocio funciona solo\" - Javier"
    }

    const key = `${frustration}_${aspiration}` as keyof typeof testimonials
    return testimonials[key]
  }

  return (
    <div className="flex flex-col items-center justify-center h-full">
      
      {/* Título contextual */}
      <div className="text-center mb-8 lg:mb-10">
        <h2 className="text-lg lg:text-xl font-medium text-gray-400 mb-4" style={{textWrap: "pretty"}}>
          Otros como tú obtuvieron:
        </h2>
      </div>

      {/* Testimonio protagonista */}
      <div className="text-center mb-8 lg:mb-10 flex-1 flex flex-col justify-center">
        <div className="bg-gray-900/50 rounded-[24px] p-8 lg:p-10 max-w-2xl border border-gray-800">
          <p className="text-white text-lg lg:text-2xl font-medium italic mb-4" style={{textWrap: "pretty"}}>
            {getTestimonial()}
          </p>
          <div className="flex items-center justify-center space-x-2">
            <div className="flex space-x-1">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-4 h-4 lg:w-5 lg:h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-gray-400 text-xs lg:text-sm">Resultado verificado</span>
          </div>
        </div>
      </div>

      {/* Botón para continuar con timer */}
      <div className="text-center mb-8 lg:mb-10">
        <SmoothMagneticButton
          onClick={onContinue}
          className="px-6 lg:px-8 py-3 lg:py-4 font-space-grotesk font-semibold text-base lg:text-lg hover:shadow-2xl hover:shadow-blue-500/40 transition-shadow duration-300 shadow-xl shadow-blue-600/30 flex items-center justify-center"
          magneticStrength={0.2}
        >
          <span>Ver mi plan personalizado</span>
          <svg className="w-4 h-4 lg:w-5 lg:h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </SmoothMagneticButton>
      </div>

      {/* Barra de progreso */}
      <div className="text-center mt-6 lg:mt-8">
        <p className="text-gray-500 text-xs lg:text-sm mb-3" style={{textWrap: "pretty"}}>
          🎯 Preparando tu propuesta final...
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