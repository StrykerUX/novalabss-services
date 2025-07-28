import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { RegionType, detectRegionFromCountry, getRegionInfo, REGIONS } from '@/lib/stripe-products'
import { FEATURES } from '@/config/features'

interface RegionValidation {
  userSelection?: RegionType
  ipCountry?: string
  detectedRegion: RegionType
  suspiciousFlags: string[]
  timestamp: string
}

interface PricingResponse {
  success: boolean
  detectedRegion: RegionType
  regionInfo: typeof REGIONS[0] | null
  validation: RegionValidation
  metadata: {
    ipCountry?: string
    detectedRegion: RegionType
    timestamp: string
  }
  error?: string
}

async function getCountryFromIP(ip: string): Promise<{ country: string; region?: string } | null> {
  try {
    // Usar ipapi.co como servicio gratuito
    const response = await fetch(`https://ipapi.co/${ip}/json/`, {
      signal: AbortSignal.timeout(5000) // 5 segundos timeout
    })
    
    if (!response.ok) {
      console.warn('IP detection service error:', response.status)
      return null
    }
    
    const data = await response.json()
    
    return {
      country: data.country_code || 'UNKNOWN',
      region: data.region || undefined
    }
  } catch (error) {
    console.error('Error detecting IP location:', error)
    return null
  }
}

function validateRegionSelection(
  userSelection?: RegionType,
  ipCountry?: string,
  detectedRegion?: RegionType
): RegionValidation {
  const suspiciousFlags: string[] = []
  
  // Flag 1: Usuario selecciona México pero IP no es MX
  if (userSelection === 'mexico' && ipCountry && ipCountry !== 'MX') {
    suspiciousFlags.push('mexico_selection_non_mx_ip')
  }
  
  // Flag 2: Usuario selecciona región cara desde IP barata
  if (userSelection && detectedRegion && 
      (userSelection === 'usa' || userSelection === 'canada' || userSelection === 'international') &&
      (detectedRegion === 'mexico' || detectedRegion === 'latam')) {
    suspiciousFlags.push('expensive_region_from_cheap_ip')
  }
  
  // Flag 3: Usuario selecciona región barata desde IP cara
  if (userSelection && detectedRegion &&
      (userSelection === 'mexico' || userSelection === 'latam') &&
      (detectedRegion === 'usa' || detectedRegion === 'canada' || detectedRegion === 'international')) {
    suspiciousFlags.push('cheap_region_from_expensive_ip')
  }
  
  return {
    userSelection,
    ipCountry,
    detectedRegion: detectedRegion || 'international',
    suspiciousFlags,
    timestamp: new Date().toISOString()
  }
}

export async function GET(request: NextRequest) {
  try {
    // Si no hay pricing internacional, retornar México directamente
    if (!FEATURES.INTERNATIONAL_PRICING) {
      const mexicoInfo = getRegionInfo('mexico')
      return NextResponse.json({
        success: true,
        detectedRegion: 'mexico',
        regionInfo: mexicoInfo,
        validation: {
          detectedRegion: 'mexico',
          suspiciousFlags: [],
          timestamp: new Date().toISOString()
        },
        metadata: {
          ipCountry: 'MX',
          featureEnabled: false
        }
      })
    }

    // Lógica original para cuando esté habilitado
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || 
               request.headers.get('x-real-ip') || 
               request.ip ||
               '127.0.0.1'
    
    const acceptLanguage = request.headers.get('accept-language')
    const userAgent = request.headers.get('user-agent')
    
    const { searchParams } = new URL(request.url)
    const userSelection = searchParams.get('region') as RegionType | null
    
    const geoData = await getCountryFromIP(ip)
    const ipCountry = geoData?.country
    
    const detectedRegion = detectRegionFromCountry(ipCountry)
    const regionInfo = getRegionInfo(detectedRegion)
    const validation = validateRegionSelection(userSelection || undefined, ipCountry, detectedRegion)
    
    // Log para analytics (solo si hay flags sospechosos)
    if (validation.suspiciousFlags.length > 0) {
      console.log('Suspicious pricing activity detected:', {
        ip,
        userSelection,
        ipCountry,
        detectedRegion,
        flags: validation.suspiciousFlags,
        userAgent,
        acceptLanguage
      })
    }
    
    const response: PricingResponse = {
      success: true,
      detectedRegion,
      regionInfo,
      validation,
      metadata: {
        ipCountry,
        detectedRegion,
        timestamp: new Date().toISOString()
      }
    }
    
    return NextResponse.json(response)
    
  } catch (error) {
    console.error('Error in pricing detection:', error)
    
    // En caso de error, devolver fallback internacional
    const fallbackRegion = 'international'
    const fallbackInfo = getRegionInfo(fallbackRegion)
    
    const errorResponse: PricingResponse = {
      success: false,
      error: 'Error detecting region',
      detectedRegion: fallbackRegion,
      regionInfo: fallbackInfo,
      validation: {
        detectedRegion: fallbackRegion,
        suspiciousFlags: ['detection_error'],
        timestamp: new Date().toISOString()
      },
      metadata: {
        detectedRegion: fallbackRegion,
        timestamp: new Date().toISOString()
      }
    }
    
    return NextResponse.json(errorResponse, { status: 200 }) // 200 para no romper el flujo
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }
    
    const body = await request.json()
    const { userSelection, ipValidation } = body
    
    // Obtener IP del usuario
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || 
               request.headers.get('x-real-ip') || 
               '127.0.0.1'
    
    // Validar la selección del usuario
    const geoData = await getCountryFromIP(ip)
    const detectedRegion = detectRegionFromCountry(geoData?.country)
    const validation = validateRegionSelection(userSelection, geoData?.country, detectedRegion)
    
    const regionInfo = getRegionInfo(userSelection || detectedRegion)
    
    const response: PricingResponse = {
      success: true,
      detectedRegion,
      regionInfo,
      validation
    }
    
    return NextResponse.json(response)
    
  } catch (error) {
    console.error('Error validating region selection:', error)
    return NextResponse.json(
      { error: 'Error procesando selección de región' },
      { status: 500 }
    )
  }
}