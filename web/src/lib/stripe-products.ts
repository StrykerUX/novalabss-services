// Configuración de productos de Stripe para diferentes regiones
import { FEATURES } from '@/config/features'

export interface RegionConfig {
  productId: string
  priceId?: string
  price: number
  currency: 'usd' | 'mxn'
  // Nuevos campos para pricing promocional
  regularPrice?: number
  regularPriceId?: string
  promoActive?: boolean
}

export interface StripeProductConfig {
  mexico: RegionConfig
  latam: RegionConfig
  usa: RegionConfig
  canada: RegionConfig
  international: RegionConfig
  name: string
  description: string
}

export type RegionType = 'mexico' | 'latam' | 'usa' | 'international'

export const STRIPE_PRODUCTS: Record<'rocket' | 'galaxy', StripeProductConfig> = {
  rocket: {
    mexico: {
      productId: process.env.STRIPE_ROCKET_PRODUCT_ID || 'prod_SivqhJc31UvLUv',
      priceId: process.env.STRIPE_ROCKET_PROMO_PRICE_ID, // Price ID promocional desde env
      price: parseInt(process.env.ROCKET_PROMO_PRICE_MX || '119900'), // $1,199.00 MXN
      regularPrice: parseInt(process.env.ROCKET_REGULAR_PRICE_MX || '179900'), // $1,799.00 MXN
      regularPriceId: process.env.STRIPE_ROCKET_REGULAR_PRICE_ID, // Price ID regular desde env
      promoActive: process.env.ROCKET_PROMO_ACTIVE !== 'false',
      currency: 'mxn'
    },
    latam: {
      productId: process.env.STRIPE_ROCKET_PRODUCT_ID || 'prod_SivqhJc31UvLUv', // Producto LATAM en USD
      priceId: undefined,
      price: 5500, // $55.00 USD
      currency: 'usd'
    },
    usa: {
      productId: process.env.STRIPE_ROCKET_PRODUCT_ID || 'prod_SivqhJc31UvLUv', // Producto USA en USD
      priceId: undefined,
      price: 9900, // $99.00 USD
      currency: 'usd'
    },
    canada: {
      productId: process.env.STRIPE_ROCKET_PRODUCT_ID || 'prod_SivqhJc31UvLUv', // Producto Canadá en USD
      priceId: undefined,
      price: 9900, // $99.00 USD
      currency: 'usd'
    },
    international: {
      productId: process.env.STRIPE_ROCKET_PRODUCT_ID || 'prod_SivqhJc31UvLUv', // Producto Internacional en USD
      priceId: undefined,
      price: 9900, // $99.00 USD
      currency: 'usd'
    },
    name: 'Plan Rocket',
    description: 'Sitio web profesional optimizado para startups y emprendedores'
  },
  galaxy: {
    mexico: {
      productId: process.env.STRIPE_GALAXY_PRODUCT_ID || 'prod_Sivwz5FIJNAVkT',
      priceId: process.env.STRIPE_GALAXY_PROMO_PRICE_ID, // Price ID promocional desde env
      price: parseInt(process.env.GALAXY_PROMO_PRICE_MX || '224900'), // $2,249.00 MXN
      regularPrice: parseInt(process.env.GALAXY_REGULAR_PRICE_MX || '299900'), // $2,999.00 MXN
      regularPriceId: process.env.STRIPE_GALAXY_REGULAR_PRICE_ID, // Price ID regular desde env
      promoActive: process.env.GALAXY_PROMO_ACTIVE !== 'false',
      currency: 'mxn'
    },
    latam: {
      productId: process.env.STRIPE_GALAXY_PRODUCT_ID || 'prod_Sivwz5FIJNAVkT', // Producto LATAM en USD
      priceId: undefined,
      price: 9900, // $99.00 USD
      currency: 'usd'
    },
    usa: {
      productId: process.env.STRIPE_GALAXY_PRODUCT_ID || 'prod_Sivwz5FIJNAVkT', // Producto USA en USD
      priceId: undefined,
      price: 17700, // $177.00 USD
      currency: 'usd'
    },
    canada: {
      productId: process.env.STRIPE_GALAXY_PRODUCT_ID || 'prod_Sivwz5FIJNAVkT', // Producto Canadá en USD
      priceId: undefined,
      price: 17700, // $177.00 USD
      currency: 'usd'
    },
    international: {
      productId: process.env.STRIPE_GALAXY_PRODUCT_ID || 'prod_Sivwz5FIJNAVkT', // Producto Internacional en USD
      priceId: undefined,
      price: 17700, // $177.00 USD
      currency: 'usd'
    },
    name: 'Plan Galaxy',
    description: 'Solución completa con sitio web multipágina y marketing avanzado'
  }
}

// Configuración de regiones para UI
export const REGIONS = [
  { 
    id: 'mexico' as RegionType, 
    label: '🇲🇽 México', 
    prices: { rocket: 1199, galaxy: 2249 }, // Precios promocionales actualizados
    currency: 'MXN',
    currencySymbol: '$'
  },
  { 
    id: 'latam' as RegionType, 
    label: '🌎 Resto de Latinoamérica', 
    prices: { rocket: 55, galaxy: 99 }, 
    currency: 'USD',
    currencySymbol: '$'
  },
  { 
    id: 'usa' as RegionType, 
    label: '🇺🇸 Estados Unidos', 
    prices: { rocket: 99, galaxy: 177 }, 
    currency: 'USD',
    currencySymbol: '$'
  },
  { 
    id: 'international' as RegionType, 
    label: '🌍 Internacional', 
    prices: { rocket: 99, galaxy: 177 }, 
    currency: 'USD',
    currencySymbol: '$'
  }
]

// Helper para obtener configuración de producto
export function getProductConfig(
  plan: 'rocket' | 'galaxy',
  region: RegionType
): RegionConfig {
  return STRIPE_PRODUCTS[plan][region]
}

// Helper para obtener precio por región (en unidades, no centavos)
export function getRegionPrice(
  plan: 'rocket' | 'galaxy',
  region: RegionType
): number {
  const config = STRIPE_PRODUCTS[plan][region]
  return config.price / 100 // Convertir de centavos
}

// Helper para obtener información de región para UI
export function getRegionInfo(regionId: RegionType) {
  return REGIONS.find(r => r.id === regionId)
}

// Helper para validar precio
export function validatePrice(
  plan: 'rocket' | 'galaxy',
  region: RegionType,
  attemptedPrice: number
): { valid: boolean; expectedPrice: number } {
  const expectedPrice = getRegionPrice(plan, region)
  const isValid = Math.abs(attemptedPrice - expectedPrice) < 0.01 // Tolerancia de 1 centavo
  
  return {
    valid: isValid,
    expectedPrice
  }
}

// Mapeo de países a regiones
export const COUNTRY_TO_REGION_MAP: Record<string, RegionType> = {
  'MX': 'mexico',
  'US': 'usa',
  // Resto de LATAM (incluyendo Canadá que antes era separado)
  'AR': 'latam', 'BO': 'latam', 'BR': 'latam', 'CL': 'latam', 
  'CO': 'latam', 'CR': 'latam', 'CU': 'latam', 'DO': 'latam', 
  'EC': 'latam', 'SV': 'latam', 'GT': 'latam', 'HN': 'latam', 
  'NI': 'latam', 'PA': 'latam', 'PY': 'latam', 'PE': 'latam', 
  'UY': 'latam', 'VE': 'latam', 'CA': 'latam'
}

// Helper para auto-detectar región por IP
export function detectRegionFromCountry(countryCode?: string): RegionType {
  // Si no hay pricing internacional habilitado, siempre retornar México
  if (!FEATURES.INTERNATIONAL_PRICING) {
    return 'mexico'
  }
  
  // Lógica original para cuando esté habilitado
  if (!countryCode) return 'international'
  return COUNTRY_TO_REGION_MAP[countryCode] || 'international'
}

// Helper para obtener precio promocional
export function getPromoPrice(
  plan: 'rocket' | 'galaxy',
  region: RegionType
): number {
  const config = STRIPE_PRODUCTS[plan][region]
  return config.price / 100 // Convertir de centavos
}

// Helper para obtener precio regular
export function getRegularPrice(
  plan: 'rocket' | 'galaxy',
  region: RegionType
): number {
  const config = STRIPE_PRODUCTS[plan][region]
  return (config.regularPrice || config.price) / 100 // Convertir de centavos
}

// Helper para verificar si la promoción está activa
export function isPromoActive(
  plan: 'rocket' | 'galaxy',
  region: RegionType
): boolean {
  const config = STRIPE_PRODUCTS[plan][region]
  return config.promoActive !== false // Por defecto activa
}

// Helper para obtener el precio actual (promocional si está activa, regular si no)
export function getCurrentPrice(
  plan: 'rocket' | 'galaxy',
  region: RegionType
): number {
  return isPromoActive(plan, region) 
    ? getPromoPrice(plan, region)
    : getRegularPrice(plan, region)
}

// Productos para crear en Stripe Dashboard si no existen
export const STRIPE_PRODUCT_CREATION_GUIDE = {
  rocket: {
    name: 'Plan Rocket',
    description: 'Sitio web profesional optimizado',
    metadata: {
      category: 'website',
      tier: 'basic',
      features: 'landing_page,seo,mobile_optimized,contact_form,analytics'
    }
  },
  galaxy: {
    name: 'Plan Galaxy',
    description: 'Sitio web completo con marketing',
    metadata: {
      category: 'website',
      tier: 'premium',
      features: 'multi_page,advanced_seo,mobile_optimized,multiple_forms,advanced_analytics,priority_support'
    }
  }
}