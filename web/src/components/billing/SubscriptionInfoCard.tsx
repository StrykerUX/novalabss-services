"use client"

import { useSubscription } from '@/hooks/useSubscription'

export default function SubscriptionInfoCard() {
  const { subscription, plan, isActive, status, renewalDate, daysRemaining, discount, hasDiscount, loading, error } = useSubscription()

  // Debug logging
  console.log('🔍 DEBUG - SubscriptionInfoCard data:', {
    plan,
    renewalDate,
    renewalDateType: typeof renewalDate,
    daysRemaining,
    hasDiscount,
    loading,
    error
  })

  if (loading) {
    return (
      <div className="bg-[#1A1A1A] rounded-[24px] p-6 border border-white/10">
        <div className="animate-pulse">
          <div className="h-6 bg-white/10 rounded mb-4 w-1/3"></div>
          <div className="h-4 bg-white/10 rounded mb-2 w-1/2"></div>
          <div className="h-4 bg-white/10 rounded mb-2 w-2/3"></div>
          <div className="h-8 bg-white/10 rounded w-1/4"></div>
        </div>
      </div>
    )
  }

  if (error || !subscription || !plan) {
    return (
      <div className="bg-[#1A1A1A] rounded-[24px] p-6 border border-white/10">
        <div className="text-center py-8">
          <div className="text-4xl mb-4">🚀</div>
          <h3 className="text-white font-semibold mb-2">No hay suscripción activa</h3>
          <p className="text-white/60 text-sm mb-4">
            {error || 'No se encontró una suscripción activa para tu cuenta.'}
          </p>
          <button 
            onClick={() => window.location.href = '/'}
            className="px-6 py-2 bg-[#0147FF] text-white rounded-xl font-medium hover:bg-[#0147FF]/80 transition-colors"
          >
            Ver Planes
          </button>
        </div>
      </div>
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'past_due': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
      case 'canceled': return 'bg-red-500/20 text-red-400 border-red-500/30'
      case 'trialing': return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return '✅ Activa'
      case 'past_due': return '⚠️ Pago Pendiente'
      case 'canceled': return '❌ Cancelada'
      case 'trialing': return '🎯 Período de Prueba'
      default: return status
    }
  }

  const getPlanColor = (planId: string) => {
    return planId === 'rocket' 
      ? 'bg-gradient-to-r from-[#0147FF]/20 to-[#0147FF]/10 border-[#0147FF]/30' 
      : 'bg-gradient-to-r from-purple-500/20 to-purple-500/10 border-purple-500/30'
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN'
    }).format(price / 100)
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('es-MX', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date)
  }

  return (
    <div className="bg-[#1A1A1A] rounded-[24px] p-6 border border-white/10">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <span>🧾</span>
          Información de Suscripción
        </h3>
        <div className={`px-3 py-1 rounded-full border text-sm font-medium ${getStatusColor(status)}`}>
          {getStatusText(status)}
        </div>
      </div>

      {/* Plan Card */}
      <div className={`rounded-xl p-6 border mb-6 ${getPlanColor(plan.id)}`}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h4 className="text-white font-bold text-lg">
              {plan.id === 'rocket' ? '🚀 PLAN ROCKET' : '🌌 PLAN GALAXY'}
            </h4>
            <p className="text-white/70 text-sm">{plan.description}</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-white">
              {formatPrice(plan.price)}
            </div>
            {hasDiscount && plan.originalPrice && plan.originalPrice > plan.price && (
              <div className="text-red-400 text-sm line-through">
                {formatPrice(plan.originalPrice)}
              </div>
            )}
            <div className="text-white/60 text-sm">
              {plan.interval === 'month' ? 'bimestral' : plan.interval}
            </div>
            {hasDiscount && discount?.coupon && (
              <div className="text-green-400 text-xs mt-1">
                {discount.coupon.percent_off && `${discount.coupon.percent_off}% descuento`}
                {discount.coupon.amount_off && `$${(discount.coupon.amount_off / 100).toFixed(2)} descuento`}
              </div>
            )}
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {plan.features.filter(feature => !feature.includes('revisiones')).slice(0, 4).map((feature, index) => (
            <div key={index} className="flex items-center text-white/80 text-sm">
              <svg className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              {feature}
            </div>
          ))}
        </div>
      </div>

      {/* Discount Information */}
      {hasDiscount && discount?.coupon && (
        <div className="mt-6 p-4 bg-green-500/10 border border-green-500/30 rounded-xl">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-green-400">🎉</span>
            <h5 className="text-green-400 font-medium">Descuento Activo</h5>
          </div>
          <div className="space-y-1 text-sm">
            {discount.coupon.name && (
              <p className="text-green-400">
                <span className="font-medium">Promoción:</span> {discount.coupon.name}
              </p>
            )}
            <p className="text-green-400/80">
              <span className="font-medium">Descuento:</span> {' '}
              {discount.coupon.percent_off && `${discount.coupon.percent_off}% de descuento`}
              {discount.coupon.amount_off && `$${(discount.coupon.amount_off / 100).toFixed(2)} MXN de descuento`}
            </p>
            {discount.coupon.valid_until && (
              <p className="text-green-400/70 text-xs">
                Válido hasta: {formatDate(discount.coupon.valid_until)}
              </p>
            )}
            {discount.coupon.duration && (
              <p className="text-green-400/70 text-xs">
                Duración: {discount.coupon.duration === 'forever' ? 'Permanente' : 
                         discount.coupon.duration === 'once' ? 'Una vez' : 
                         `${discount.coupon.duration_in_months} meses`}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Warning for canceled subscriptions */}
      {subscription.cancel_at_period_end && (
        <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-xl">
          <div className="flex items-center gap-2">
            <span className="text-yellow-400">⚠️</span>
            <div>
              <p className="text-yellow-400 font-medium text-sm">
                Suscripción programada para cancelación
              </p>
              <p className="text-yellow-400/70 text-xs">
                Tu plan permanecerá activo hasta {renewalDate ? formatDate(renewalDate) : 'la fecha de renovación'}.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}