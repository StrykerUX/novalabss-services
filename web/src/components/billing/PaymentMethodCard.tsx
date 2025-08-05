"use client"

import { useState } from 'react'
import { useSubscription } from '@/hooks/useSubscription'

export default function PaymentMethodCard() {
  const { subscription, loading, error } = useSubscription()
  const [isRedirecting, setIsRedirecting] = useState(false)

  const handleManagePayment = async () => {
    setIsRedirecting(true)
    
    try {
      const response = await fetch('/api/billing/customer-portal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          return_url: window.location.href
        })
      })

      if (!response.ok) {
        throw new Error('Error al acceder al portal de pagos')
      }

      const { url } = await response.json()
      window.location.href = url

    } catch (error) {
      console.error('Error:', error)
      alert('Error al acceder al portal de pagos. Por favor intenta de nuevo.')
      setIsRedirecting(false)
    }
  }

  if (loading) {
    return (
      <div className="bg-[#1A1A1A] rounded-[24px] p-6 border border-white/10">
        <div className="animate-pulse">
          <div className="h-6 bg-white/10 rounded mb-4 w-1/3"></div>
          <div className="h-4 bg-white/10 rounded mb-2 w-1/2"></div>
          <div className="h-10 bg-white/10 rounded w-full"></div>
        </div>
      </div>
    )
  }

  if (error || !subscription) {
    return (
      <div className="bg-[#1A1A1A] rounded-[24px] p-6 border border-white/10">
        <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-4">
          <span>💳</span>
          Método de Pago
        </h3>
        <div className="text-center py-6">
          <div className="text-4xl mb-3">💳</div>
          <p className="text-white/60 text-sm">
            No se encontró información de método de pago
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-[#1A1A1A] rounded-[24px] p-6 border border-white/10">
      {/* Header */}
      <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-6">
        <span>💳</span>
        Método de Pago
      </h3>

      {/* Payment Method Info */}
      <div className="bg-white/5 rounded-xl p-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Credit Card Icon */}
            <div className="w-12 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </div>
            
            <div>
              <p className="text-white font-medium">Método de pago configurado</p>
              <p className="text-white/60 text-sm">
                Gestiona tu información de pago de forma segura
              </p>
            </div>
          </div>

          <div className="text-right">
            <div className="text-green-400 text-sm font-medium">✅ Configurado</div>
          </div>
        </div>
      </div>

      {/* Customer Portal Button */}
      <button
        onClick={handleManagePayment}
        disabled={isRedirecting}
        className="w-full bg-[#0147FF] hover:bg-[#0147FF]/80 disabled:bg-[#0147FF]/50 text-white font-semibold py-3 px-6 rounded-xl transition-colors flex items-center justify-center gap-2"
      >
        {isRedirecting ? (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            Redirigiendo...
          </>
        ) : (
          <>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Gestionar Métodos de Pago
          </>
        )}
      </button>

      {/* Info */}
      <div className="mt-4 p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl">
        <div className="flex items-start gap-2">
          <svg className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <p className="text-blue-400 font-medium text-sm">Portal Seguro de Stripe</p>
            <p className="text-blue-400/70 text-xs mt-1">
              Te redirigiremos al portal seguro de Stripe donde podrás actualizar tu método de pago, 
              descargar facturas y gestionar tu suscripción de forma segura.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}