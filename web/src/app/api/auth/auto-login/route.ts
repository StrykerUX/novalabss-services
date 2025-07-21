import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { signIn } from 'next-auth/react'

export async function POST(request: NextRequest) {
  try {
    const { token, sessionId } = await request.json()
    
    console.log('🔐 Auto-login attempt:', { token: token?.substring(0, 20) + '...', sessionId })
    
    if (!token || !sessionId) {
      return NextResponse.json({ error: 'Token and sessionId required' }, { status: 400 })
    }
    
    // Verificar que el token es válido y corresponde a la sesión
    // TODO: Implementar validación de JWT
    
    // Por ahora, simplemente devolvemos datos del usuario
    const mockUser = {
      id: 'stripe_' + sessionId,
      email: 'usuario@stripe-checkout.com',
      name: 'Usuario desde Stripe',
      plan: 'rocket',
      subscriptionId: sessionId
    }
    
    console.log('✅ Auto-login successful for:', mockUser.email)
    
    return NextResponse.json({ 
      success: true, 
      user: mockUser,
      redirectTo: '/onboarding'
    })
    
  } catch (error) {
    console.error('❌ Auto-login error:', error)
    return NextResponse.json(
      { error: 'Auto-login failed' },
      { status: 500 }
    )
  }
}