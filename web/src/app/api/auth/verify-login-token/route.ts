import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { token, email } = await request.json()

    if (!token || !email) {
      return NextResponse.json(
        { success: false, error: 'Token y email son requeridos' },
        { status: 400 }
      )
    }

    console.log('🔍 Verifying login token for:', email)

    // Verificación real del token en la base de datos
    const { PrismaClient } = await import('@prisma/client')
    const prisma = new PrismaClient()
    
    try {
      const user = await prisma.user.findFirst({
        where: {
          email,
          autoLoginToken: token,
          autoLoginTokenExpiry: {
            gt: new Date()
          }
        }
      })

      if (!user) {
        return NextResponse.json(
          { success: false, error: 'Token inválido o expirado' },
          { status: 401 }
        )
      }

      return NextResponse.json({
        success: true,
        userId: user.id,
        email: user.email
      })
    } finally {
      await prisma.$disconnect()
    }

    return NextResponse.json(
      { success: false, error: 'Token inválido' },
      { status: 401 }
    )

  } catch (error) {
    console.error('❌ Error verifying login token:', error)
    return NextResponse.json(
      { success: false, error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}