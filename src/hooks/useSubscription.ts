"use client"

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { SubscriptionData } from '@/types/stripe'

export function useSubscription() {
  const { data: session, status } = useSession()
  const [subscriptionData, setSubscriptionData] = useState<SubscriptionData>({
    subscription: null,
    plan: null,
    isActive: false,
    status: 'loading',
    startDate: null,
    endDate: null,
    daysElapsed: 0,
    daysRemaining: 0,
    renewalDate: null,
    loading: true,
    error: null
  })

  useEffect(() => {
    // Solo fetch si el usuario está autenticado
    if (status === 'loading') return
    if (status === 'unauthenticated') {
      setSubscriptionData(prev => ({
        ...prev,
        loading: false,
        error: 'Usuario no autenticado'
      }))
      return
    }

    fetchSubscriptionData()
  }, [session, status])

  const fetchSubscriptionData = async () => {
    try {
      setSubscriptionData(prev => ({ ...prev, loading: true, error: null }))

      const response = await fetch('/api/subscription', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()

      if (data.error) {
        throw new Error(data.error)
      }

      // Convertir fechas de string a Date objects
      const processedData: SubscriptionData = {
        subscription: data.subscription,
        plan: data.plan,
        isActive: data.isActive,
        status: data.status,
        startDate: data.startDate ? new Date(data.startDate) : null,
        endDate: data.endDate ? new Date(data.endDate) : null,
        daysElapsed: data.daysElapsed || 0,
        daysRemaining: data.daysRemaining || 0,
        renewalDate: data.renewalDate ? new Date(data.renewalDate) : null,
        loading: false,
        error: null
      }

      setSubscriptionData(processedData)

    } catch (error) {
      console.error('Error fetching subscription data:', error)
      setSubscriptionData(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Error desconocido'
      }))
    }
  }

  const refetch = () => {
    fetchSubscriptionData()
  }

  return {
    ...subscriptionData,
    refetch
  }
}

// Hook más específico para obtener solo el plan
export function usePlan() {
  const subscription = useSubscription()
  
  return {
    plan: subscription.plan,
    loading: subscription.loading,
    error: subscription.error,
    isActive: subscription.isActive
  }
}

// Hook para obtener información de fechas y tiempo
export function useSubscriptionDates() {
  const subscription = useSubscription()
  
  return {
    startDate: subscription.startDate,
    endDate: subscription.endDate,
    renewalDate: subscription.renewalDate,
    daysElapsed: subscription.daysElapsed,
    daysRemaining: subscription.daysRemaining,
    loading: subscription.loading,
    error: subscription.error
  }
}