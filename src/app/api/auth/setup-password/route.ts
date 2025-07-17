import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'

export async function POST(request: NextRequest) {
  try {
    const { autoLoginToken, password, email } = await request.json()

    // Validaciones
    if (!autoLoginToken || !password || !email) {
      return NextResponse.json(
        { success: false, error: 'Faltan datos requeridos' },
        { status: 400 }
      )
    }

    if (password.length < 8) {
      return NextResponse.json(
        { success: false, error: 'La contraseña debe tener al menos 8 caracteres' },
        { status: 400 }
      )
    }

    console.log('🔐 Setting up password for:', email)

    // Verificar que el autoLoginToken sea válido y obtener el user ID
    const tokenResponse = await fetch(`${process.env.NEXTAUTH_URL}/api/auth/verify-login-token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: autoLoginToken, email })
    })

    if (!tokenResponse.ok) {
      return NextResponse.json(
        { success: false, error: 'Token de autenticación inválido o expirado' },
        { status: 401 }
      )
    }

    const tokenData = await tokenResponse.json()
    if (!tokenData.success) {
      return NextResponse.json(
        { success: false, error: 'Token de autenticación inválido' },
        { status: 401 }
      )
    }

    // Hash de la contraseña
    const hashedPassword = await bcrypt.hash(password, 12)

    // Crear o actualizar usuario en la base de datos
    const { PrismaClient } = await import('@prisma/client')
    const prisma = new PrismaClient()
    
    try {
      // Usar upsert para crear si no existe o actualizar si existe
      await prisma.user.upsert({
        where: { email },
        update: {
          password: hashedPassword,
          emailVerified: new Date(),
          autoLoginToken: null // Limpiar el token usado
        },
        create: {
          email,
          password: hashedPassword,
          emailVerified: new Date(),
          autoLoginToken: null,
          name: email.split('@')[0], // Usar parte del email como nombre inicial
          role: 'USER'
        }
      })
      
      console.log('✅ User created/updated in database for:', email)
    } finally {
      await prisma.$disconnect()
    }

    return NextResponse.json({
      success: true,
      message: 'Contraseña establecida correctamente'
    })

  } catch (error) {
    console.error('❌ Error setting up password:', error)
    return NextResponse.json(
      { success: false, error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}