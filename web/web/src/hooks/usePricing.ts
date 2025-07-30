import { useState, useEffect } from 'react'
import { PricingTier, RegionValidation } from '@/types/onboarding'

interface PricingResponse {
  success: boolean
  pricingTier: PricingTier
  validation: RegionValidation
  metadata?: {
    ipCountry?: string
    detectedRegion?: string
    timestamp: string
  }
  error?: string
}

interface UsePricingOptions {
  userRegion?: 'latam' | 'international'
  autoDetect?: boolean
}

export function usePricing(options: UsePricingOptions = {}) {
  const [pricingTier, setPricingTier] = useState<PricingTier | null>(null)
  const [validation, setValidation] = useState<RegionValidation | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (options.autoDetect !== false) {
      detectPricing()
    }
  }, [options.userRegion, options.autoDetect])

  const detectPricing = async () => {
    try {
      setLoading(true)
      setError(null)

      const params = new URLSearchParams()
      if (options.userRegion) {
        params.append('region', options.userRegion)
      }

      const response = await fetch(`/api/pricing/detect?${params.toString()}`)
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`)
      }

      const data: PricingResponse = await response.json()
      
      setPricingTier(data.pricingTier)
      setValidation(data.validation)
      
      if (!data.success) {
        setError(data.error || 'Error detecting pricing')
      }

    } catch (err) {
      console.error('Error detecting pricing:', err)
      setError(err instanceof Error ? err.message : 'Error desconocido')
      
      // Fallback a pricing internacional
      setPricingTier({
        id: 'international',
        multiplier: 2.63,
        currency: 'USD',
        region: 'international',
        prices: {
          rocket: 129,
          galaxy: 249
        }
      })
    } finally {
      setLoading(false)
    }
  }

  const validatePricing = async (
    selectedPlan: 'rocket' | 'galaxy',
    priceAttempted: number
  ): Promise<{ valid: boolean; error?: string }> => {
    try {
      if (!pricingTier || !validation) {
        throw new Error('Pricing tier not initialized')
      }

      const response = await fetch('/api/pricing/validate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userRegion: pricingTier.id,
          selectedPlan,
          priceAttempted
        })
      })

      const data = await response.json()

      if (!response.ok) {
        return {
          valid: false,
          error: data.error || `Error ${response.status}`
        }
      }

      return {
        valid: data.valid,
        error: data.valid ? undefined : data.error
      }

    } catch (err) {
      console.error('Error validating pricing:', err)
      return {
        valid: false,
        error: err instanceof Error ? err.message : 'Error de validación'
      }
    }
  }

  const getPrice = (plan: 'rocket' | 'galaxy'): number => {
    if (!pricingTier) {
      // Fallback prices
      return plan === 'rocket' ? 129 : 249
    }
    
    return pricingTier.prices[plan]
  }

  const isSuspicious = (): boolean => {
    return validation ? validation.suspiciousFlags.length > 0 : false
  }

  const refreshPricing = () => {
    detectPricing()
  }

  return {
    pricingTier,
    validation,
    loading,
    error,
    getPrice,
    validatePricing,
    isSuspicious,
    refreshPricing,
    detectPricing
  }
}

// Hook específico para componentes que necesitan precios
export function usePricingDisplay(userRegion?: 'latam' | 'international') {
  const { pricingTier, loading, error, getPrice } = usePricing({ 
    userRegion, 
    autoDetect: true 
  })

  return {
    rocketPrice: getPrice('rocket'),
    galaxyPrice: getPrice('galaxy'),
    currency: pricingTier?.currency || 'USD',
    region: pricingTier?.region || 'international',
    loading,
    error
  }
}