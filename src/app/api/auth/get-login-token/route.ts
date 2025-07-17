import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const sessionId = searchParams.get('sessionId')
    
    if (!sessionId) {
      return NextResponse.json({ success: false, error: 'Session ID required' }, { status: 400 })
    }
    
    console.log('🔍 Looking for auto-login token for session:', sessionId)
    
    // Buscar token en almacenamiento temporal
    const tokens = global.autoLoginTokens || new Map()
    const tokenData = tokens.get(sessionId)
    
    if (!tokenData) {
      console.log('❌ No token found for session:', sessionId)
      return NextResponse.json({ success: false, error: 'No token found' }, { status: 404 })
    }
    
    // Verificar que no ha expirado
    if (Date.now() > tokenData.expiresAt) {
      console.log('❌ Token expired for session:', sessionId)
      tokens.delete(sessionId)
      return NextResponse.json({ success: false, error: 'Token expired' }, { status: 401 })
    }
    
    console.log('✅ Auto-login token found for:', tokenData.email)
    
    return NextResponse.json({
      success: true,
      token: tokenData.token,
      user: {
        email: tokenData.email,
        name: tokenData.email?.split('@')[0] || 'Usuario',
        plan: tokenData.plan || 'rocket'
      }
    })
    
  } catch (error) {
    console.error('❌ Error getting login token:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to get login token' },
      { status: 500 }
    )
  }
}