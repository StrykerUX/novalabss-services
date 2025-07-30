import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Función para validar seguridad en checkout
async function validateCheckoutSecurity(request: NextRequest): Promise<NextResponse | null> {
  try {
    const body = await request.clone().json()
    const { plan, region } = body
    
    // Obtener IP del usuario
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || 
               request.headers.get('x-real-ip') || 
               request.ip || 
               '127.0.0.1'
    
    // Países para validación rápida
    const TIER_1_COUNTRIES = ['US', 'CA', 'GB', 'DE', 'FR', 'AU', 'JP', 'NL', 'SE', 'NO', 'CH', 'AT', 'DK', 'IE', 'BE', 'LU', 'FI', 'IS', 'SG', 'KR', 'NZ']
    
    // Detectar país por IP (versión rápida)
    let ipCountry: string | null = null
    try {
      const geoResponse = await fetch(`https://ipapi.co/${ip}/country_code/`, {
        signal: AbortSignal.timeout(2000) // 2 segundos máximo
      })
      if (geoResponse.ok) {
        ipCountry = await geoResponse.text()
      }
    } catch (error) {
      console.warn('Error detecting IP country in middleware:', error)
    }
    
    // Flags de actividad sospechosa
    const suspiciousFlags = []
    
    // Usuario dice LATAM pero IP es claramente Tier 1
    if (region === 'latam' && ipCountry && TIER_1_COUNTRIES.includes(ipCountry)) {
      suspiciousFlags.push('region_ip_mismatch')
    }
    
    // Log actividad sospechosa
    if (suspiciousFlags.length > 0) {
      console.log('Suspicious checkout activity detected:', {
        ip,
        ipCountry,
        region,
        plan,
        flags: suspiciousFlags,
        userAgent: request.headers.get('user-agent')
      })
    }
    
  } catch (error) {
    console.error('Error in checkout security validation:', error)
  }
  
  return null // Continuar sin bloquear por ahora
}

export default withAuth(
  async function middleware(req) {
    const { pathname } = req.nextUrl
    const token = req.nextauth.token

    // Validación de seguridad para checkout
    if (pathname === "/api/create-checkout-session") {
      const securityResponse = await validateCheckoutSecurity(req)
      if (securityResponse) return securityResponse
    }

    // Rutas admin requieren rol ADMIN
    if (pathname.startsWith("/admin")) {
      if (!token || token.role !== "ADMIN") {
        return NextResponse.redirect(new URL("/dashboard", req.url))
      }
    }

    // Usuarios admin no deberían acceder al dashboard normal
    if (pathname.startsWith("/dashboard") && token?.role === "ADMIN") {
      return NextResponse.redirect(new URL("/admin", req.url))
    }
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl
        
        // API routes de checkout no requieren auth pero sí validación
        if (pathname === "/api/create-checkout-session") {
          return true // Permitir pero validar en middleware
        }
        
        // Rutas admin requieren autenticación y rol ADMIN
        if (pathname.startsWith("/admin")) {
          return !!token && token.role === "ADMIN"
        }
        
        // Rutas dashboard requieren autenticación
        if (pathname.startsWith("/dashboard")) {
          return !!token
        }
        
        return true
      },
    },
  }
)

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admin/:path*",
    "/api/create-checkout-session"
  ]
}