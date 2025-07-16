import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const sessionId = searchParams.get('sessionId')
    
    if (!sessionId) {
      return NextResponse.json({ error: 'Session ID required' }, { status: 400 })
    }
    
    console.log('🔍 Looking for auto-login token for session:', sessionId)
    
    // Buscar token en almacenamiento temporal
    const tokens = global.autoLoginTokens || new Map()
    const tokenData = tokens.get(sessionId)
    
    if (!tokenData) {
      console.log('❌ No token found for session:', sessionId)
      return NextResponse.json({ error: 'No token found' }, { status: 404 })
    }
    
    // Verificar que no ha expirado
    if (Date.now() > tokenData.expiresAt) {
      console.log('❌ Token expired for session:', sessionId)
      tokens.delete(sessionId)
      return NextResponse.json({ error: 'Token expired' }, { status: 401 })
    }
    
    console.log('✅ Auto-login token found for:', tokenData.email)
    
    // Decodificar token para obtener datos del usuario
    const userData = JSON.parse(Buffer.from(tokenData.token, 'base64').toString())
    
    return NextResponse.json({
      success: true,
      token: tokenData.token,
      user: {
        email: userData.email,
        name: userData.name,
        plan: userData.plan,
        source: userData.source,
        frustration: userData.frustration,
        aspiration: userData.aspiration,
        sessionId: userData.sessionId
      }
    })
    
  } catch (error) {
    console.error('❌ Error getting login token:', error)
    return NextResponse.json(
      { error: 'Failed to get login token' },
      { status: 500 }
    )
  }
}