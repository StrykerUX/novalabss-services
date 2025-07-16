"use client"

import SmoothMagneticButton from "@/components/SmoothMagneticButton"

export default function CancelPage() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="max-w-md mx-auto text-center">
        
        {/* Icono de cancelación */}
        <div className="w-20 h-20 bg-yellow-500/20 border border-yellow-500/50 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>

        {/* Título principal */}
        <h1 className="text-3xl lg:text-4xl font-bold text-white mb-4" style={{textWrap: "pretty"}}>
          Pago Cancelado
        </h1>

        {/* Descripción */}
        <p className="text-gray-300 text-lg mb-8" style={{textWrap: "pretty"}}>
          No te preocupes, tu pago no fue procesado. Puedes intentar nuevamente cuando estés listo.
        </p>

        {/* Información adicional */}
        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-[24px] p-6 mb-8">
          <h3 className="text-white font-semibold mb-3">💡 ¿Por qué cancelaste?</h3>
          <ul className="text-gray-300 text-sm space-y-2 text-left">
            <li>• ¿Necesitas más información sobre el plan?</li>
            <li>• ¿Tienes dudas sobre el proceso?</li>
            <li>• ¿Prefieres hablar con nuestro equipo?</li>
          </ul>
        </div>

        {/* Botones de acción */}
        <div className="space-y-4">
          <SmoothMagneticButton
            onClick={() => window.location.href = '/start'}
            className="w-full px-8 py-4 font-space-grotesk font-semibold text-lg hover:shadow-2xl hover:shadow-blue-500/40 transition-shadow duration-300"
            magneticStrength={0.2}
          >
            <span>Intentar nuevamente</span>
          </SmoothMagneticButton>

          <button
            onClick={() => window.location.href = '/'}
            className="w-full px-8 py-4 bg-gray-800 text-white rounded-[24px] font-semibold hover:bg-gray-700 transition-colors"
          >
            Volver al inicio
          </button>

          <button
            onClick={() => window.location.href = 'mailto:soporte@novalabs.mx?subject=Consulta sobre planes'}
            className="w-full px-8 py-4 border border-gray-600 text-gray-300 rounded-[24px] font-semibold hover:bg-gray-800 transition-colors"
          >
            Contactar soporte
          </button>
        </div>

        {/* Garantía */}
        <div className="mt-8 pt-6 border-t border-gray-800">
          <div className="flex items-center justify-center space-x-2 text-gray-500 text-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Pago 100% seguro con Stripe</span>
          </div>
        </div>

      </div>
    </div>
  )
}