"use client"

import { useState, useEffect } from 'react'
import { StripeInvoice, InvoicesResponse } from '@/types/stripe'

export default function BillingHistoryCard() {
  const [invoices, setInvoices] = useState<StripeInvoice[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [hasMore, setHasMore] = useState(false)

  useEffect(() => {
    fetchInvoices()
  }, [])

  const fetchInvoices = async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch('/api/billing/invoices?limit=10')
      
      if (!response.ok) {
        throw new Error('Error al cargar facturas')
      }

      const data: InvoicesResponse = await response.json()
      
      if (data.error) {
        throw new Error(data.error)
      }

      setInvoices(data.invoices || [])
      setHasMore(data.has_more || false)

    } catch (error) {
      console.error('Error fetching invoices:', error)
      setError(error instanceof Error ? error.message : 'Error desconocido')
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'open': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
      case 'uncollectible': return 'bg-red-500/20 text-red-400 border-red-500/30'
      case 'void': return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
      case 'draft': return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  const getStatusText = (status: string, paid: boolean) => {
    if (paid) return '✅ Pagada'
    
    switch (status) {
      case 'paid': return '✅ Pagada'
      case 'open': return '⏳ Pendiente'
      case 'uncollectible': return '❌ No cobrable'
      case 'void': return '🚫 Anulada'
      case 'draft': return '📝 Borrador'
      default: return status
    }
  }

  const formatPrice = (amount: number, currency: string) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: currency.toUpperCase()
    }).format(amount / 100)
  }

  const formatDate = (timestamp: number) => {
    return new Intl.DateTimeFormat('es-MX', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(new Date(timestamp * 1000))
  }

  const handleDownloadPDF = (invoice: StripeInvoice) => {
    if (invoice.invoice_pdf) {
      window.open(invoice.invoice_pdf, '_blank')
    } else if (invoice.hosted_invoice_url) {
      window.open(invoice.hosted_invoice_url, '_blank')
    }
  }

  if (loading) {
    return (
      <div className="bg-[#1A1A1A] rounded-[24px] p-6 border border-white/10">
        <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-6">
          <span>📊</span>
          Historial de Facturación
        </h3>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse bg-white/5 rounded-xl p-4">
              <div className="flex justify-between items-center">
                <div className="flex-1">
                  <div className="h-4 bg-white/10 rounded mb-2 w-1/3"></div>
                  <div className="h-3 bg-white/10 rounded w-1/4"></div>
                </div>
                <div className="h-6 bg-white/10 rounded w-20"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-[#1A1A1A] rounded-[24px] p-6 border border-white/10">
        <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-6">
          <span>📊</span>
          Historial de Facturación
        </h3>
        <div className="text-center py-8">
          <div className="text-4xl mb-4">⚠️</div>
          <p className="text-white/60 text-sm">{error}</p>
          <button 
            onClick={fetchInvoices}
            className="mt-4 px-4 py-2 bg-[#0147FF] text-white rounded-xl text-sm hover:bg-[#0147FF]/80 transition-colors"
          >
            Reintentar
          </button>
        </div>
      </div>
    )
  }

  if (invoices.length === 0) {
    return (
      <div className="bg-[#1A1A1A] rounded-[24px] p-6 border border-white/10">
        <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-6">
          <span>📊</span>
          Historial de Facturación
        </h3>
        <div className="text-center py-8">
          <div className="text-4xl mb-4">📋</div>
          <p className="text-white/60 text-sm">
            No se encontraron facturas en tu cuenta
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-[#1A1A1A] rounded-[24px] p-6 border border-white/10">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <span>📊</span>
          Historial de Facturación
        </h3>
        <div className="text-white/60 text-sm">
          {invoices.length} factura{invoices.length !== 1 ? 's' : ''}
        </div>
      </div>

      {/* Invoices List */}
      <div className="space-y-4">
        {invoices.map((invoice) => (
          <div 
            key={invoice.id} 
            className="bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h4 className="text-white font-semibold">
                    {invoice.number || `Factura ${invoice.id.slice(-8)}`}
                  </h4>
                  <div className={`px-2 py-1 rounded-full border text-xs font-medium ${getStatusColor(invoice.status)}`}>
                    {getStatusText(invoice.status, invoice.paid)}
                  </div>
                </div>
                
                <div className="flex items-center gap-4 text-sm text-white/60">
                  <span>{formatDate(invoice.created)}</span>
                  {invoice.period_start && invoice.period_end && (
                    <span>
                      Período: {formatDate(invoice.period_start)} - {formatDate(invoice.period_end)}
                    </span>
                  )}
                </div>

                {invoice.description && (
                  <p className="text-white/60 text-xs mt-1">
                    {invoice.description}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="text-white font-bold">
                    {formatPrice(invoice.amount_paid || invoice.amount_due, invoice.currency)}
                  </div>
                  {invoice.amount_due > 0 && !invoice.paid && (
                    <div className="text-red-400 text-xs">
                      Debe: {formatPrice(invoice.amount_due, invoice.currency)}
                    </div>
                  )}
                </div>

                {/* Download Button */}
                {(invoice.invoice_pdf || invoice.hosted_invoice_url) && (
                  <button
                    onClick={() => handleDownloadPDF(invoice)}
                    className="p-2 bg-[#0147FF]/20 hover:bg-[#0147FF]/30 text-[#0147FF] rounded-lg transition-colors"
                    title="Descargar factura"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </button>
                )}
              </div>
            </div>

            {/* Invoice Lines */}
            {invoice.lines && invoice.lines.length > 0 && (
              <div className="mt-3 pt-3 border-t border-white/10">
                {invoice.lines.map((line) => (
                  <div key={line.id} className="flex justify-between items-center text-sm">
                    <span className="text-white/70">
                      {line.description || 'Suscripción'}
                    </span>
                    <span className="text-white/60">
                      {formatPrice(line.amount, line.currency)}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Load More */}
      {hasMore && (
        <div className="mt-6 text-center">
          <button 
            onClick={() => {/* TODO: Implement pagination */}}
            className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-colors"
          >
            Cargar más facturas
          </button>
        </div>
      )}

      {/* Footer Info */}
      <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl">
        <div className="flex items-start gap-2">
          <svg className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <p className="text-blue-400 font-medium text-sm">
              Todas las facturas están disponibles
            </p>
            <p className="text-blue-400/70 text-xs mt-1">
              Puedes descargar tus facturas en PDF haciendo clic en el botón de descarga. 
              También puedes acceder a todas desde el portal de Stripe.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}