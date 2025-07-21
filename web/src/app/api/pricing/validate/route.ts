import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const LATAM_COUNTRIES = [
  'AR', 'BO', 'CL', 'CO', 'CR', 'CU', 'DO', 'EC', 'SV', 
  'GT', 'HN', 'MX', 'NI', 'PA', 'PY', 'PE', 'UY', 'VE'
]

const TIER_1_COUNTRIES = [
  'US', 'CA', 'GB', 'DE', 'FR', 'AU', 'JP', 'NL', 'SE', 'NO', 
  'CH', 'AT', 'DK', 'IE', 'BE', 'LU', 'FI', 'IS', 'SG', 'KR', 'NZ'
]

async function getCountryFromIP(ip: string): Promise<string | null> {
  try {
    const response = await fetch(`https://ipapi.co/${ip}/json/`, {
      timeout: 5000
    })
    
    if (!response.ok) return null
    
    const data = await response.json()
    return data.country_code || null
  } catch (error) {
    console.error('Error detecting IP location:', error)
    return null
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const body = await request.json()
    const { 
      userRegion, // 'latam' | 'international'
      selectedPlan, // 'rocket' | 'galaxy'
      priceAttempted // precio que el usuario está intentando pagar
    } = body

    // Obtener IP del usuario
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || 
               request.headers.get('x-real-ip') || 
               '127.0.0.1'

    // Detectar país por IP
    const ipCountry = await getCountryFromIP(ip)
    
    // Definir precios esperados
    const expectedPrices = {
      latam: {
        rocket: 49,
        galaxy: 99
      },
      international: {
        rocket: 129,
        galaxy: 249
      }
    }

    const expectedPrice = expectedPrices[userRegion][selectedPlan]
    
    // Validar precio
    const priceDifference = Math.abs(priceAttempted - expectedPrice)
    const isValidPrice = priceDifference < 0.01 // Tolerancia de 1 centavo
    
    // Detectar actividad sospechosa
    const suspiciousFlags = []
    
    if (!isValidPrice) {
      suspiciousFlags.push('price_mismatch')
    }
    
    // Usuario dice LATAM pero IP es Tier 1
    if (userRegion === 'latam' && ipCountry && TIER_1_COUNTRIES.includes(ipCountry)) {
      suspiciousFlags.push('region_ip_mismatch')
    }
    
    // Precio muy bajo para país Tier 1
    if (ipCountry && TIER_1_COUNTRIES.includes(ipCountry) && priceAttempted < 100) {
      suspiciousFlags.push('low_price_tier1_country')
    }

    // Log de la validación
    const validationLog = {
      userId: session.user.email,
      userRegion,
      selectedPlan,
      priceAttempted,
      expectedPrice,
      ipCountry,
      suspiciousFlags,
      isValid: isValidPrice && suspiciousFlags.length === 0,
      timestamp: new Date().toISOString(),
      ip,
      userAgent: request.headers.get('user-agent')
    }

    // Guardar log en base de datos (opcional - puedes crear una tabla pricing_validations)
    console.log('Pricing validation:', validationLog)

    // Si hay flags sospechosos pero el precio es correcto, permitir pero log
    if (suspiciousFlags.length > 0) {
      console.warn('Suspicious pricing activity:', validationLog)
      
      // Podrías enviar una alerta por email aquí
      // await sendSuspiciousActivityAlert(validationLog)
    }

    // Respuesta
    if (!isValidPrice) {
      return NextResponse.json({
        valid: false,
        error: 'Precio no válido',
        expectedPrice,
        suspiciousFlags
      }, { status: 400 })
    }

    return NextResponse.json({
      valid: true,
      expectedPrice,
      suspiciousFlags,
      message: suspiciousFlags.length > 0 ? 'Validado con flags de advertencia' : 'Validación exitosa'
    })

  } catch (error) {
    console.error('Error validating pricing:', error)
    return NextResponse.json(
      { 
        valid: false,
        error: 'Error interno de validación',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}