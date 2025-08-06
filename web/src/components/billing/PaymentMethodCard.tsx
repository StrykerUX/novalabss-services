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
          <span>⚙️</span>
          Gestión de suscripción
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
        <span>⚙️</span>
        Gestión de suscripción
      </h3>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* Payment Methods Card */}
        <div className="bg-white/5 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-blue-400">💳</span>
            <h4 className="text-white font-medium text-sm">Métodos de pago</h4>
          </div>
          <p className="text-white/60 text-xs">
            Modifica tus tarjetas y métodos de pago
          </p>
        </div>

        {/* Invoices Card */}
        <div className="bg-white/5 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-green-400">📄</span>
            <h4 className="text-white font-medium text-sm">Todas tus facturas</h4>
          </div>
          <p className="text-white/60 text-xs">
            Descarga el historial completo de pagos
          </p>
        </div>

        {/* Security Card */}
        <div className="bg-white/5 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-purple-400">🔒</span>
            <h4 className="text-white font-medium text-sm">Portal seguro</h4>
          </div>
          <p className="text-white/60 text-xs">
            Stripe protege toda tu información
          </p>
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
            Acceder al Portal de Stripe
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
              Accede al portal seguro de Stripe para modificar métodos de pago, ver todas tus facturas 
              y gestionar tu suscripción con total seguridad.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}