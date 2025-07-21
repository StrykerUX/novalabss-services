"use client"

import { useState, useEffect } from 'react'

interface AdminSubscription {
  id: string
  status: string
  customer: {
    id: string | null
    email: string
    name: string
  }
  user: {
    id: string
    name: string
    email: string
    projects: number
  } | null
  plan: {
    id: string
    name: string
    amount: number
    currency: string
    interval: string
  }
  dates: {
    created: string
    current_period_start: string
    current_period_end: string
    trial_end: string | null
  }
  billing: {
    collection_method: string
    cancel_at_period_end: boolean
    canceled_at: string | null
  }
  metadata: Record<string, string>
  error?: string
}

interface SubscriptionStats {
  total: number
  active: number
  trialing: number
  past_due: number
  canceled: number
  incomplete: number
  totalRevenue: number
}

interface AdminSubscriptionsData {
  subscriptions: AdminSubscription[]
  stats: SubscriptionStats
  hasMore: boolean
}

interface UseAdminSubscriptionsParams {
  status?: string
  limit?: number
}

interface UseAdminSubscriptionsReturn {
  data: AdminSubscriptionsData | null
  loading: boolean
  error: string | null
  refetch: () => Promise<void>
  manageSubscription: (subscriptionId: string, action: string, params?: any) => Promise<boolean>
  setFilters: (filters: UseAdminSubscriptionsParams) => void
}

export function useAdminSubscriptions(initialParams: UseAdminSubscriptionsParams = {}): UseAdminSubscriptionsReturn {
  const [data, setData] = useState<AdminSubscriptionsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filters, setFilters] = useState<UseAdminSubscriptionsParams>(initialParams)

  const buildQueryString = (params: UseAdminSubscriptionsParams) => {
    const searchParams = new URLSearchParams()
    
    if (params.status && params.status !== 'all') searchParams.append('status', params.status)
    if (params.limit) searchParams.append('limit', params.limit.toString())
    
    return searchParams.toString()
  }

  const fetchSubscriptions = async () => {
    try {
      setLoading(true)
      setError(null)

      const queryString = buildQueryString(filters)
      const url = `/api/admin/subscriptions${queryString ? `?${queryString}` : ''}`

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`)
      }

      const result = await response.json()
      setData(result)
    } catch (err) {
      console.error('Error fetching admin subscriptions:', err)
      setError(err instanceof Error ? err.message : 'Error desconocido')
    } finally {
      setLoading(false)
    }
  }

  const manageSubscription = async (
    subscriptionId: string, 
    action: string, 
    params: any = {}
  ): Promise<boolean> => {
    try {
      setError(null)

      const response = await fetch('/api/admin/subscriptions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action,
          subscriptionId,
          ...params
        })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || `Error ${response.status}`)
      }

      // Refetch subscriptions after successful action
      await fetchSubscriptions()
      return true
    } catch (err) {
      console.error('Error managing subscription:', err)
      setError(err instanceof Error ? err.message : 'Error al gestionar suscripción')
      return false
    }
  }

  const updateFilters = (newFilters: UseAdminSubscriptionsParams) => {
    setFilters(prev => ({ ...prev, ...newFilters }))
  }

  useEffect(() => {
    fetchSubscriptions()
  }, [filters])

  return {
    data,
    loading,
    error,
    refetch: fetchSubscriptions,
    manageSubscription,
    setFilters: updateFilters
  }
}