"use client"

import AdminLayout from "@/components/AdminLayout"
import SmoothMagneticButton from "@/components/SmoothMagneticButton"
import { useState, useEffect } from "react"
import Link from "next/link"

interface BillingData {
  users: Array<{
    id: string
    name: string
    email: string
    company: string | null
    phone: string | null
    createdAt: string
    projectsCount: number
    projects: Array<{
      id: string
      name: string
      status: string
      plan: string
    }>
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
    } | null
    recentPayments: Array<{
      id: string
      amount: number
      currency: string
      status: string
      description: string | null
      paidAt: string | null
      failureReason: string | null
    }>
  }>
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasNext: boolean
    hasPrev: boolean
  }
  stats: {
    total: number
    active: number
    past_due: number
    unpaid: number
    canceled: number
    incomplete: number
    trialing: number
  }
  revenue: {
    monthly: number
    currency: string
  }
}

export default function AdminBillingPage() {
  const [data, setData] = useState<BillingData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  useEffect(() => {
    fetchBillingData()
  }, [currentPage, searchTerm, statusFilter])

  const fetchBillingData = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '10',
        search: searchTerm,
        status: statusFilter
      })

      const response = await fetch(`/api/admin/billing?${params}`)
      
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

  const handleSearch = (term: string) => {
    setSearchTerm(term)
    setCurrentPage(1)
  }

  const handleStatusFilter = (status: string) => {
    setStatusFilter(status)
    setCurrentPage(1)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
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
      month: 'short',
      day: 'numeric'
    })
  }

  if (loading) {
    return (
      <AdminLayout 
        title="Facturación y Suscripciones"
        subtitle="Cargando información de facturación..."
      >
        <div className="flex items-center justify-center h-64">
          <div className="text-white">🔄 Cargando datos de facturación...</div>
        </div>
      </AdminLayout>
    )
  }

  if (error) {
    return (
      <AdminLayout 
        title="Facturación y Suscripciones"
        subtitle="Error al cargar información"
      >
        <div className="bg-red-500/20 border border-red-500/30 rounded-[24px] p-6">
          <p className="text-red-400 mb-4">❌ Error: {error}</p>
          <SmoothMagneticButton 
            onClick={fetchBillingData}
            className="px-4 py-2 text-white bg-red-600/20 border border-red-500/30 hover:bg-red-600/30"
          >
            🔄 Reintentar
          </SmoothMagneticButton>
        </div>
      </AdminLayout>
    )
  }

  if (!data) {
    return (
      <AdminLayout 
        title="Facturación y Suscripciones"
        subtitle="Sin datos disponibles"
      >
        <div className="text-white/60">No hay datos disponibles</div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout 
      title="Facturación y Suscripciones"
      subtitle={`${data.stats.total} usuarios • ${formatCurrency(data.revenue.monthly)} ingresos este mes`}
    >
      {/* Search and Filters */}
      <div className="bg-[#1A1A1A] rounded-[24px] p-6 border border-white/10 mb-6">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          {/* Search */}
          <div className="flex-1">
            <input
              type="text"
              placeholder="Buscar por nombre, email o empresa..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => handleStatusFilter(e.target.value)}
            className="px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Todos los estados</option>
            <option value="ACTIVE">Activo</option>
            <option value="PAST_DUE">Atrasado</option>
            <option value="UNPAID">Sin Pago</option>
            <option value="CANCELED">Cancelado</option>
            <option value="INCOMPLETE">Incompleto</option>
            <option value="TRIALING">Prueba</option>
          </select>
          
          {/* Refresh Button */}
          <SmoothMagneticButton 
            onClick={fetchBillingData}
            className="px-4 py-2 text-white bg-blue-600/20 border border-blue-500/30 hover:bg-blue-600/30"
          >
            🔄
          </SmoothMagneticButton>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-8">
        <div className="bg-[#1A1A1A] rounded-[24px] p-4 border border-white/10">
          <h3 className="text-white/80 text-xs font-medium mb-2">Total</h3>
          <p className="text-xl font-bold text-white">{data.stats.total}</p>
        </div>
        <div className="bg-[#1A1A1A] rounded-[24px] p-4 border border-white/10">
          <h3 className="text-white/80 text-xs font-medium mb-2">Activos</h3>
          <p className="text-xl font-bold text-green-400">{data.stats.active}</p>
        </div>
        <div className="bg-[#1A1A1A] rounded-[24px] p-4 border border-white/10">
          <h3 className="text-white/80 text-xs font-medium mb-2">Atrasados</h3>
          <p className="text-xl font-bold text-yellow-400">{data.stats.past_due}</p>
        </div>
        <div className="bg-[#1A1A1A] rounded-[24px] p-4 border border-white/10">
          <h3 className="text-white/80 text-xs font-medium mb-2">Sin Pago</h3>
          <p className="text-xl font-bold text-red-400">{data.stats.unpaid}</p>
        </div>
        <div className="bg-[#1A1A1A] rounded-[24px] p-4 border border-white/10">
          <h3 className="text-white/80 text-xs font-medium mb-2">Cancelados</h3>
          <p className="text-xl font-bold text-gray-400">{data.stats.canceled}</p>
        </div>
        <div className="bg-[#1A1A1A] rounded-[24px] p-4 border border-white/10">
          <h3 className="text-white/80 text-xs font-medium mb-2">Incompletos</h3>
          <p className="text-xl font-bold text-orange-400">{data.stats.incomplete}</p>
        </div>
        <div className="bg-[#1A1A1A] rounded-[24px] p-4 border border-white/10">
          <h3 className="text-white/80 text-xs font-medium mb-2">Ingresos Mes</h3>
          <p className="text-lg font-bold text-purple-400">{formatCurrency(data.revenue.monthly)}</p>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-[#1A1A1A] rounded-[24px] p-6 border border-white/10">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-white font-bold text-lg">Usuarios y Facturación</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left text-white/80 font-medium py-3 px-4">Usuario</th>
                <th className="text-left text-white/80 font-medium py-3 px-4">Suscripción</th>
                <th className="text-left text-white/80 font-medium py-3 px-4">Estado</th>
                <th className="text-left text-white/80 font-medium py-3 px-4">Último Pago</th>
                <th className="text-left text-white/80 font-medium py-3 px-4">Próximo Pago</th>
                <th className="text-left text-white/80 font-medium py-3 px-4">Proyectos</th>
                <th className="text-left text-white/80 font-medium py-3 px-4">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {data.users.map((user) => (
                <tr key={user.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="py-4 px-4">
                    <div>
                      <p className="text-white font-medium">{user.name}</p>
                      <p className="text-white/60 text-sm">{user.email}</p>
                      {user.company && (
                        <p className="text-white/40 text-xs">{user.company}</p>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    {user.subscription ? (
                      <div>
                        <p className="text-white font-medium">{user.subscription.plan}</p>
                        <p className="text-white/60 text-sm">
                          {formatCurrency(user.subscription.amount)} / {user.subscription.interval}
                        </p>
                      </div>
                    ) : (
                      <span className="text-white/40">Sin suscripción</span>
                    )}
                  </td>
                  <td className="py-4 px-4">
                    {user.subscription ? (
                      <div className="space-y-1">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(user.subscription.status)}`}>
                          {user.subscription.status === 'ACTIVE' ? 'Activo' :
                           user.subscription.status === 'PAST_DUE' ? 'Atrasado' :
                           user.subscription.status === 'UNPAID' ? 'Sin Pago' :
                           user.subscription.status === 'CANCELED' ? 'Cancelado' :
                           user.subscription.status === 'INCOMPLETE' ? 'Incompleto' :
                           user.subscription.status === 'TRIALING' ? 'Prueba' :
                           user.subscription.status}
                        </span>
                        {user.subscription.paymentFailureCount > 0 && (
                          <p className="text-red-400 text-xs">
                            {user.subscription.paymentFailureCount} fallos
                          </p>
                        )}
                      </div>
                    ) : (
                      <span className="text-white/40">N/A</span>
                    )}
                  </td>
                  <td className="py-4 px-4">
                    {user.subscription?.lastPaymentDate ? (
                      <div>
                        <p className="text-white text-sm">{formatDate(user.subscription.lastPaymentDate)}</p>
                        {user.subscription.lastPaymentAmount && (
                          <p className="text-white/60 text-xs">
                            {formatCurrency(user.subscription.lastPaymentAmount)}
                          </p>
                        )}
                      </div>
                    ) : (
                      <span className="text-white/40">N/A</span>
                    )}
                  </td>
                  <td className="py-4 px-4">
                    {user.subscription?.nextPaymentDate ? (
                      <div>
                        <p className="text-white text-sm">{formatDate(user.subscription.nextPaymentDate)}</p>
                        {user.subscription.daysUntilNextPayment !== null && (
                          <p className={`text-xs ${
                            user.subscription.daysUntilNextPayment < 0 ? 'text-red-400' :
                            user.subscription.daysUntilNextPayment <= 3 ? 'text-yellow-400' :
                            'text-white/60'
                          }`}>
                            {user.subscription.daysUntilNextPayment < 0 ? 
                              `${Math.abs(user.subscription.daysUntilNextPayment)} días atrasado` :
                              `en ${user.subscription.daysUntilNextPayment} días`
                            }
                          </p>
                        )}
                      </div>
                    ) : (
                      <span className="text-white/40">N/A</span>
                    )}
                  </td>
                  <td className="py-4 px-4">
                    <div>
                      <p className="text-white font-medium">{user.projectsCount}</p>
                      <p className="text-white/60 text-xs">proyectos</p>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <button 
                        className="p-1 text-white/60 hover:text-blue-400 transition-colors"
                        title="Ver detalles"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        {data.pagination.totalPages > 1 && (
          <div className="flex justify-between items-center mt-6">
            <div className="text-white/60 text-sm">
              Página {data.pagination.page} de {data.pagination.totalPages} - {data.pagination.total} usuarios
            </div>
            <div className="flex space-x-2">
              {data.pagination.hasPrev && (
                <SmoothMagneticButton 
                  onClick={() => handlePageChange(currentPage - 1)}
                  className="px-3 py-1 text-white bg-white/10 border border-white/20 hover:bg-white/20"
                >
                  ← Anterior
                </SmoothMagneticButton>
              )}
              
              {data.pagination.hasNext && (
                <SmoothMagneticButton 
                  onClick={() => handlePageChange(currentPage + 1)}
                  className="px-3 py-1 text-white bg-white/10 border border-white/20 hover:bg-white/20"
                >
                  Siguiente →
                </SmoothMagneticButton>
              )}
            </div>
          </div>
        )}

        {data.users.length === 0 && (
          <div className="text-center py-12">
            <p className="text-white/60">No se encontraron usuarios con los filtros aplicados</p>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}