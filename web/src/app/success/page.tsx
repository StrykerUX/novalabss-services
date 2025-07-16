"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import SmoothMagneticButton from "@/components/SmoothMagneticButton"

export default function SuccessPage() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simular carga de confirmación
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Procesando tu pago...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="max-w-md mx-auto text-center">
        
        {/* Checkmark animado */}
        <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        {/* Título principal */}
        <h1 className="text-3xl lg:text-4xl font-bold text-white mb-4" style={{textWrap: "pretty"}}>
          ¡Pago Exitoso! 🎉
        </h1>

        {/* Descripción */}
        <p className="text-gray-300 text-lg mb-6" style={{textWrap: "pretty"}}>
          Tu suscripción ha sido activada correctamente. En breve recibirás un email con los siguientes pasos.
        </p>

        {/* Información del session */}
        {sessionId && (
          <div className="bg-gray-900/50 rounded-[24px] p-4 mb-6 border border-gray-800">
            <p className="text-gray-400 text-sm">
              ID de sesión: <span className="text-blue-400 font-mono">{sessionId.slice(0, 20)}...</span>
            </p>
          </div>
        )}

        {/* Próximos pasos */}
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-[24px] p-6 mb-8">
          <h3 className="text-white font-semibold mb-3">📋 Próximos pasos:</h3>
          <ul className="text-gray-300 text-sm space-y-2 text-left">
            <li>• Revisarás tu email para confirmación</li>
            <li>• Nuestro equipo te contactará en 24h</li>
            <li>• Comenzaremos el desarrollo de tu sitio</li>
            <li>• Recibirás actualizaciones del progreso</li>
          </ul>
        </div>

        {/* Botones de acción */}
        <div className="space-y-4">
          <SmoothMagneticButton
            onClick={() => window.location.href = '/'}
            className="w-full px-8 py-4 font-space-grotesk font-semibold text-lg hover:shadow-2xl hover:shadow-blue-500/40 transition-shadow duration-300"
            magneticStrength={0.2}
          >
            <span>Volver al inicio</span>
          </SmoothMagneticButton>

          <button
            onClick={() => window.location.href = '/dashboard'}
            className="w-full px-8 py-4 bg-gray-800 text-white rounded-[24px] font-semibold hover:bg-gray-700 transition-colors"
          >
            Ir a mi dashboard
          </button>
        </div>

        {/* Soporte */}
        <div className="mt-8 pt-6 border-t border-gray-800">
          <p className="text-gray-500 text-sm">
            ¿Tienes dudas? Contáctanos en{" "}
            <a href="mailto:soporte@novalabs.mx" className="text-blue-400 hover:underline">
              soporte@novalabs.mx
            </a>
          </p>
        </div>

      </div>
    </div>
  )
}