"use client"

import { useState, useEffect } from "react"
import { useParams, useSearchParams } from "next/navigation"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function CheckoutPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const { data: session } = useSession()
  const router = useRouter()
  const [flowData, setFlowData] = useState<any>(null)
  
  const plan = params.plan as string
  const source = searchParams.get('source')

  useEffect(() => {
    // Cargar datos del flujo si vienen del warm lead
    if (source === 'warm-lead') {
      const saved = localStorage.getItem('flowData')
      if (saved) {
        setFlowData(JSON.parse(saved))
      }
    }
  }, [source])

  const planDetails = {
    rocket: {
      name: "Plan Rocket",
      price: "$999 MXN",
      features: [
        "1 landing page profesional",
        "Entrega garantizada en 72h",
        "2 créditos para cambios",
        "SEO básico incluido",
        "Hosting con dominio temporal",
        "Analytics básico"
      ]
    },
    galaxy: {
      name: "Plan Galaxy", 
      price: "$1,799 MXN",
      features: [
        "Sitio web 3-5 páginas",
        "Entrega garantizada en 96h", 
        "2 créditos para cambios",
        "SEO avanzado incluido",
        "Hosting con dominio temporal",
        "Analytics avanzado"
      ]
    }
  }

  const currentPlan = planDetails[plan as keyof typeof planDetails]

  const handleProceedToStripe = async () => {
    try {
      console.log('🚀 Iniciando checkout desde página de checkout para plan:', plan)
      
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          plan: plan,
          metadata: {
            source: source || 'checkout-page',
            flow: 'fallback',
            ...flowData
          }
        })
      })
      
      console.log('📡 Response status:', response.status)
      console.log('📡 Response ok:', response.ok)
      
      if (!response.ok) {
        const errorData = await response.json()
        console.error('❌ API Error:', errorData)
        throw new Error(`HTTP error! status: ${response.status} - ${errorData.error}`)
      }
      
      const data = await response.json()
      console.log('📋 Response data:', data)
      
      if (!data.url) {
        throw new Error('No URL received from API')
      }
      
      console.log('✅ Redirecting to:', data.url)
      window.location.href = data.url
      
    } catch (error) {
      console.error('❌ Error creating checkout session:', error)
      alert('Error al procesar el pago. Por favor intenta nuevamente.')
    }
  }

  if (!currentPlan) {
    return <div>Plan no encontrado</div>
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">
              Finalizar Compra
            </h1>
            <p className="text-gray-400">
              Estás a un paso de transformar tu presencia digital
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Plan Details */}
            <div className="bg-[#1A1A1A] rounded-2xl p-6 border border-gray-800">
              <h2 className="text-xl font-semibold text-white mb-4">
                {currentPlan.name}
              </h2>
              
              <div className="text-3xl font-bold text-blue-400 mb-6">
                {currentPlan.price}
                <span className="text-lg text-gray-400 font-normal"> bimestral</span>
              </div>

              <ul className="space-y-3 mb-6">
                {currentPlan.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-gray-300">
                    <svg className="w-5 h-5 text-green-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Flow Data Display */}
              {flowData && (
                <div className="bg-blue-900/20 border border-blue-500/20 rounded-lg p-4">
                  <h3 className="text-white font-semibold mb-2">
                    💡 Personalizado para ti
                  </h3>
                  <p className="text-sm text-gray-300">
                    Este plan fue recomendado específicamente para tu situación
                  </p>
                </div>
              )}
            </div>

            {/* Checkout Form */}
            <div className="bg-[#1A1A1A] rounded-2xl p-6 border border-gray-800">
              <h3 className="text-xl font-semibold text-white mb-6">
                Información de Pago
              </h3>

              {/* Placeholder para Stripe */}
              <div className="bg-gray-900/50 rounded-lg p-8 text-center">
                <div className="text-gray-400 mb-4">
                  🔒 Checkout Seguro con Stripe
                </div>
                <p className="text-sm text-gray-500 mb-6">
                  Aquí se integrará el formulario de pago de Stripe
                </p>
                
                <button 
                  onClick={handleProceedToStripe}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg transition-colors"
                >
                  Proceder al Pago
                </button>
              </div>

              {/* Security */}
              <div className="mt-6 text-center">
                <p className="text-xs text-gray-500">
                  🛡️ Pago 100% seguro | SSL | Garantía de devolución
                </p>
              </div>
            </div>
          </div>

          {/* Source Info */}
          {source && (
            <div className="mt-8 text-center">
              <p className="text-gray-500 text-sm">
                Fuente: {source === 'warm-lead' ? 'Flujo personalizado' : 
                         source === 'pricing' ? 'Página de precios' : 
                         source === 'skip' ? 'Acceso directo' : source}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}