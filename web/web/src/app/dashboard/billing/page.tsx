"use client"

import DashboardLayout from "@/components/DashboardLayout"
import SmoothMagneticButton from "@/components/SmoothMagneticButton"
import { useState, useEffect } from "react"

interface UserBillingData {
  user: {
    id: string
    name: string
    email: string
    company: string | null
    phone: string | null
  }
  subscription: {
    id: string
    plan: string
    status: string
    amount: number
    currency: string
    interval: string
    startDate: string
    currentPeriodStart: string
    currentPeriodEnd: string
    lastPaymentDate: string | null
    lastPaymentAmount: number | null
    nextPaymentDate: string | null
    paymentFailureCount: number
    daysUntilNextPayment: number | null
    isActive: boolean
    isPastDue: boolean
    isCanceled: boolean
  } | null
  payments: Array<{
    id: string
    amount: number
    currency: string
    status: string
    description: string | null
    attemptedAt: string
    paidAt: string | null
    failedAt: string | null
    failureReason: string | null
    receiptUrl: string | null
    invoiceUrl: string | null
  }>
  projects: Array<{
    id: string
    name: string
    status: string
    plan: string
    progress: number
  }>
  summary: {
    totalProjects: number
    activeProjects: number
    completedProjects: number
    totalPaid: number
    failedPayments: number
  }
}

export default function UserBillingPage() {
  const [data, setData] = useState<UserBillingData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchBillingData()
  }, [])

  const fetchBillingData = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/user/billing')
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`)
      }

      const billingData = await response.json()
      setData(billingData)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido')
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'PAST_DUE':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
      case 'UNPAID':
        return 'bg-red-500/20 text-red-400 border-red-500/30'
      case 'CANCELED':
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
      case 'INCOMPLETE':
        return 'bg-orange-500/20 text-orange-400 border-orange-500/30'
      case 'TRIALING':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'SUCCEEDED':
        return 'bg-green-500/20 text-green-400'
      case 'FAILED':
        return 'bg-red-500/20 text-red-400'
      case 'PENDING':
        return 'bg-yellow-500/20 text-yellow-400'
      case 'PROCESSING':
        return 'bg-blue-500/20 text-blue-400'
      default:
        return 'bg-gray-500/20 text-gray-400'
    }
  }

  const formatCurrency = (amount: number, currency: string = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(amount / 100) // Convertir de centavos
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'N/A'
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const formatDateTime = (dateString: string | null) => {
    if (!dateString) return 'N/A'
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (loading) {
    return (
      <DashboardLayout>
        <div className="max-w-7xl mx-auto p-6">
          <div className="flex items-center justify-center h-64">
            <div className="text-white">🔄 Cargando información de facturación...</div>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="max-w-7xl mx-auto p-6">
          <div className="bg-red-500/20 border border-red-500/30 rounded-[24px] p-6">
            <p className="text-red-400 mb-4">❌ Error: {error}</p>
            <SmoothMagneticButton 
              onClick={fetchBillingData}
              className="px-4 py-2 text-white bg-red-600/20 border border-red-500/30 hover:bg-red-600/30"
            >
              🔄 Reintentar
            </SmoothMagneticButton>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  if (!data) {
    return (
      <DashboardLayout>
        <div className="max-w-7xl mx-auto p-6">
          <div className="text-white/60">No hay datos disponibles</div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Facturación</h1>
            <p className="text-white/60">Gestiona tu suscripción y revisa tu historial de pagos</p>
          </div>
          <SmoothMagneticButton 
            onClick={fetchBillingData}
            className="px-4 py-2 text-white bg-blue-600/20 border border-blue-500/30 hover:bg-blue-600/30"
          >
            🔄 Actualizar
          </SmoothMagneticButton>
        </div>

        {/* Subscription Status */}
        <div className="bg-[#1A1A1A] rounded-[24px] p-8 border border-white/10">
          <h2 className="text-xl font-bold text-white mb-6">Estado de Suscripción</h2>
          
          {data.subscription ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="space-y-3">
                <h3 className="text-white/80 font-semibold">Plan Actual</h3>
                <div>
                  <p className="text-2xl font-bold text-white">{data.subscription.plan}</p>
                  <p className="text-white/60">
                    {formatCurrency(data.subscription.amount)} / {data.subscription.interval}
                  </p>
                </div>
              </div>
              
              <div className="space-y-3">
                <h3 className="text-white/80 font-semibold">Estado</h3>
                <div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(data.subscription.status)}`}>
                    {data.subscription.status === 'ACTIVE' ? 'Activo' :
                     data.subscription.status === 'PAST_DUE' ? 'Pago Atrasado' :
                     data.subscription.status === 'UNPAID' ? 'Sin Pago' :
                     data.subscription.status === 'CANCELED' ? 'Cancelado' :
                     data.subscription.status === 'INCOMPLETE' ? 'Incompleto' :
                     data.subscription.status === 'TRIALING' ? 'Período de Prueba' :
                     data.subscription.status}
                  </span>
                  {data.subscription.paymentFailureCount > 0 && (
                    <p className="text-red-400 text-sm mt-1">
                      {data.subscription.paymentFailureCount} intentos de pago fallidos
                    </p>
                  )}
                </div>
              </div>
              
              <div className="space-y-3">
                <h3 className="text-white/80 font-semibold">Último Pago</h3>
                <div>
                  {data.subscription.lastPaymentDate ? (
                    <>
                      <p className="text-white font-medium">{formatDate(data.subscription.lastPaymentDate)}</p>
                      {data.subscription.lastPaymentAmount && (
                        <p className="text-white/60 text-sm">
                          {formatCurrency(data.subscription.lastPaymentAmount)}
                        </p>
                      )}
                    </>
                  ) : (
                    <p className="text-white/40">Sin pagos registrados</p>
                  )}
                </div>
              </div>
              
              <div className="space-y-3">
                <h3 className="text-white/80 font-semibold">Próximo Pago</h3>
                <div>
                  {data.subscription.nextPaymentDate ? (
                    <>
                      <p className="text-white font-medium">{formatDate(data.subscription.nextPaymentDate)}</p>
                      {data.subscription.daysUntilNextPayment !== null && (
                        <p className={`text-sm ${
                          data.subscription.daysUntilNextPayment < 0 ? 'text-red-400' :
                          data.subscription.daysUntilNextPayment <= 3 ? 'text-yellow-400' :
                          'text-white/60'
                        }`}>
                          {data.subscription.daysUntilNextPayment < 0 ? 
                            `${Math.abs(data.subscription.daysUntilNextPayment)} días de retraso` :
                            `en ${data.subscription.daysUntilNextPayment} días`
                          }
                        </p>
                      )}
                    </>
                  ) : (
                    <p className="text-white/40">No programado</p>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-12 h-12 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Sin Suscripción Activa</h3>
              <p className="text-white/60 mb-6">
                Actualmente no tienes una suscripción activa. Contacta con nuestro equipo para activar tu plan.
              </p>
              <SmoothMagneticButton className="px-6 py-3 text-white bg-blue-600/20 border border-blue-500/30 hover:bg-blue-600/30">
                Contactar Soporte
              </SmoothMagneticButton>
            </div>
          )}
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="bg-[#1A1A1A] rounded-[24px] p-4 border border-white/10">
            <h3 className="text-white/80 text-sm font-medium mb-2">Total Proyectos</h3>
            <p className="text-2xl font-bold text-white">{data.summary.totalProjects}</p>
          </div>
          <div className="bg-[#1A1A1A] rounded-[24px] p-4 border border-white/10">
            <h3 className="text-white/80 text-sm font-medium mb-2">Proyectos Activos</h3>
            <p className="text-2xl font-bold text-blue-400">{data.summary.activeProjects}</p>
          </div>
          <div className="bg-[#1A1A1A] rounded-[24px] p-4 border border-white/10">
            <h3 className="text-white/80 text-sm font-medium mb-2">Completados</h3>
            <p className="text-2xl font-bold text-green-400">{data.summary.completedProjects}</p>
          </div>
          <div className="bg-[#1A1A1A] rounded-[24px] p-4 border border-white/10">
            <h3 className="text-white/80 text-sm font-medium mb-2">Total Pagado</h3>
            <p className="text-lg font-bold text-purple-400">{formatCurrency(data.summary.totalPaid)}</p>
          </div>
          <div className="bg-[#1A1A1A] rounded-[24px] p-4 border border-white/10">
            <h3 className="text-white/80 text-sm font-medium mb-2">Pagos Fallidos</h3>
            <p className="text-2xl font-bold text-red-400">{data.summary.failedPayments}</p>
          </div>
        </div>

        {/* Payment History */}
        <div className="bg-[#1A1A1A] rounded-[24px] p-6 border border-white/10">
          <h2 className="text-xl font-bold text-white mb-6">Historial de Pagos</h2>
          
          {data.payments.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left text-white/80 font-medium py-3 px-4">Fecha</th>
                    <th className="text-left text-white/80 font-medium py-3 px-4">Descripción</th>
                    <th className="text-left text-white/80 font-medium py-3 px-4">Monto</th>
                    <th className="text-left text-white/80 font-medium py-3 px-4">Estado</th>
                    <th className="text-left text-white/80 font-medium py-3 px-4">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {data.payments.map((payment) => (
                    <tr key={payment.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="py-4 px-4">
                        <div>
                          <p className="text-white text-sm">
                            {payment.paidAt ? formatDateTime(payment.paidAt) : formatDateTime(payment.attemptedAt)}
                          </p>
                          {payment.failedAt && (
                            <p className="text-red-400 text-xs">
                              Falló: {formatDateTime(payment.failedAt)}
                            </p>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div>
                          <p className="text-white">{payment.description || 'Pago de suscripción'}</p>
                          {payment.failureReason && (
                            <p className="text-red-400 text-xs mt-1">{payment.failureReason}</p>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <p className="text-white font-medium">
                          {formatCurrency(payment.amount, payment.currency)}
                        </p>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPaymentStatusColor(payment.status)}`}>
                          {payment.status === 'SUCCEEDED' ? 'Exitoso' :
                           payment.status === 'FAILED' ? 'Fallido' :
                           payment.status === 'PENDING' ? 'Pendiente' :
                           payment.status === 'PROCESSING' ? 'Procesando' :
                           payment.status}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-2">
                          {payment.receiptUrl && (
                            <a 
                              href={payment.receiptUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1 text-white/60 hover:text-blue-400 transition-colors"
                              title="Ver recibo"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                            </a>
                          )}
                          {payment.invoiceUrl && (
                            <a 
                              href={payment.invoiceUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1 text-white/60 hover:text-green-400 transition-colors"
                              title="Ver factura"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                              </svg>
                            </a>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Sin Historial de Pagos</h3>
              <p className="text-white/60">No tienes pagos registrados aún.</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}