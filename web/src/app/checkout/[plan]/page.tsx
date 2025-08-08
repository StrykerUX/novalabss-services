"use client"

import { useState, useEffect, Suspense } from "react"
import { useParams, useSearchParams } from "next/navigation"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { getCurrentPrice, getRegularPrice, isPromoActive } from '@/lib/stripe-products'

// Helper function to format prices with commas
const formatPrice = (price: string | number): string => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

function CheckoutPageContent() {
  const params = useParams()
  const searchParams = useSearchParams()
  const { data: session } = useSession()
  const router = useRouter()
  const [flowData, setFlowData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  
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

  // Obtener precios dinámicos
  const getplanPricing = (planName: 'rocket' | 'galaxy') => {
    const currentPrice = getCurrentPrice(planName, 'mexico')
    const regularPrice = getRegularPrice(planName, 'mexico')
    const hasPromo = isPromoActive(planName, 'mexico')
    
    return {
      current: currentPrice,
      regular: regularPrice,
      hasPromo: hasPromo
    }
  }

  const planDetails = {
    rocket: {
      name: "Plan Rocket",
      pricing: getplanPricing('rocket'),
      features: [
        "1 landing page profesional",
        "Entrega en 3 días",
        "Optimización para Google",
        "Analytics de rendimiento",
        "Versión optimizada para móvil",
        "Formulario de contacto",
        "Soporte continuo",
        "Hosting seguro incluido",
        "Dominio personalizado (desde 2º pago)"
      ]
    },
    galaxy: {
      name: "Plan Galaxy", 
      pricing: getplanPricing('galaxy'),
      features: [
        "Sitio completo de 3-5 páginas",
        "Entrega en 5 días",
        "Optimización avanzada para Google",
        "Analytics de rendimiento avanzado",
        "Versión optimizada para móvil",
        "Múltiples formularios de contacto",
        "Soporte prioritario continuo",
        "Hosting seguro incluido",
        "Dominio personalizado (desde 2º pago)"
      ]
    }
  }

  const currentPlan = planDetails[plan as keyof typeof planDetails]

  const handleProceedToStripe = async () => {
    setIsLoading(true)
    try {
      console.log('🚀 Iniciando checkout desde página de checkout para plan:', plan)
      
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          plan: plan,
          region: 'mexico', // Siempre México por ahora
          metadata: {
            source: source || 'checkout-page',
            flow: 'fallback',
            selectedRegion: 'mexico',
            detectedRegion: 'mexico',
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
    } finally {
      setIsLoading(false)
    }
  }

  if (!currentPlan) {
    return <div>Plan no encontrado</div>
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-center space-x-4 mb-6">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                  ✓
                </div>
                <span className="ml-2 text-white text-sm">Plan seleccionado</span>
              </div>
              <div className="w-12 h-0.5 bg-blue-600"></div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                  2
                </div>
                <span className="ml-2 text-white text-sm font-semibold">Revisar detalles</span>
              </div>
              <div className="w-12 h-0.5 bg-gray-600"></div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center text-gray-400 text-sm">
                  3
                </div>
                <span className="ml-2 text-gray-400 text-sm">Pago seguro</span>
              </div>
            </div>
          </div>


          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Plan Details */}
            <div className="bg-[#1A1A1A] rounded-2xl p-6 border border-gray-800 relative overflow-hidden">
              {/* Popular badge para Rocket */}
              {plan === 'rocket' && (
                <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  Más popular
                </div>
              )}
              
              <div className="flex items-center mb-4">
                <h2 className="text-xl font-semibold text-white">
                  {currentPlan.name}
                </h2>
                <span className="ml-2 text-2xl">{plan === 'rocket' ? '🚀' : '🌌'}</span>
              </div>
              
              {/* Pricing Section */}
              <div className="mb-6">
                {currentPlan.pricing.hasPromo && (
                  <div className="inline-flex items-center bg-gradient-to-r from-green-500/20 to-green-400/10 border border-green-400/30 rounded-full px-3 py-1 mb-3">
                    <span className="text-green-400 text-xs font-semibold">🔥 PRECIO ESPECIAL - PRIMER AÑO</span>
                  </div>
                )}
                
                <div className="flex items-baseline space-x-3 mb-2">
                  <div className="text-3xl font-bold text-blue-400">
                    ${formatPrice(currentPlan.pricing.current)} MXN
                  </div>
                  
                  {currentPlan.pricing.hasPromo && currentPlan.pricing.regular !== currentPlan.pricing.current && (
                    <div className="text-xl font-bold text-gray-500 line-through">
                      ${formatPrice(currentPlan.pricing.regular)} MXN
                    </div>
                  )}
                </div>
                
                <p className="text-gray-400 text-sm">
                  Bimestral {currentPlan.pricing.hasPromo ? `• Después: $${formatPrice(currentPlan.pricing.regular)} MXN` : ''}
                </p>
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

              {/* Value Proposition */}
              <div className="bg-gradient-to-r from-green-900/20 to-green-800/20 border border-green-500/20 rounded-lg p-4 mb-4">
                <h3 className="text-green-400 font-semibold mb-2 flex items-center">
                  💰 Ahorro garantizado
                </h3>
                <p className="text-sm text-gray-300">
                  {plan === 'rocket' 
                    ? 'Ahorras $3,600 MXN en tu primer año vs precio regular'
                    : 'Ahorras $4,500 MXN en tu primer año vs precio regular'
                  }
                </p>
              </div>


              {/* Flow Data Display */}
              {flowData && (
                <div className="bg-purple-900/20 border border-purple-500/20 rounded-lg p-4 mb-4">
                  <h3 className="text-purple-400 font-semibold mb-2">
                    💡 Personalizado para ti
                  </h3>
                  <p className="text-sm text-gray-300">
                    Este plan fue recomendado específicamente para tu situación
                  </p>
                </div>
              )}
              
              {/* Domain Info */}
              <div className="bg-green-900/20 border border-green-500/20 rounded-lg p-4">
                <h3 className="text-green-400 font-semibold mb-2 flex items-center">
                  🌐 Dominio incluido
                </h3>
                <p className="text-sm text-gray-300">
                  Tu dominio personalizado se agrega de forma gratuita en el segundo pago
                </p>
              </div>
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
                  🛡️ Pago 100% seguro | SSL | Soporte continuo
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

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-lg">Cargando...</div>
      </div>
    }>
      <CheckoutPageContent />
    </Suspense>
  )
}