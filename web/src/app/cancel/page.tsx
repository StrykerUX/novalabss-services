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
            onClick={() => window.location.href = 'mailto:novalabss.app@gmail.com?subject=Consulta sobre planes'}
            className="w-full px-8 py-4 border border-gray-600 text-gray-300 rounded-[24px] font-semibold hover:bg-gray-800 transition-colors"
          >
            📧 Contactar por email
          </button>

          <button
            onClick={() => window.open('https://wa.me/525518366895?text=Hola, necesito ayuda con los planes de NovaLabs', '_blank')}
            className="w-full px-8 py-4 bg-green-600 hover:bg-green-700 text-white rounded-[24px] font-semibold transition-colors flex items-center justify-center space-x-2"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.69"/>
            </svg>
            <span>💬 WhatsApp</span>
          </button>
        </div>

        {/* Información de contacto */}
        <div className="mt-6 p-4 bg-gray-900/50 rounded-[16px] border border-gray-800">
          <h4 className="text-white font-semibold mb-2 text-sm">📞 Horario de atención</h4>
          <p className="text-gray-400 text-xs">Lunes a Viernes, 10:00 AM - 8:00 PM (GMT-6)</p>
          <p className="text-gray-400 text-xs">Respuesta garantizada en 24 horas</p>
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