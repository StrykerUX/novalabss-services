import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const sessionId = searchParams.get('sessionId')
    
    if (!sessionId) {
      return NextResponse.json({ success: false, error: 'Session ID required' }, { status: 400 })
    }
    
    console.log('🔍 Looking for auto-login token for session:', sessionId)
    
    // Primero buscar en memoria (fallback rápido)
    const tokens = global.autoLoginTokens || new Map()
    const tokenData = tokens.get(sessionId)
    
    if (tokenData && Date.now() <= tokenData.expiresAt) {
      console.log('✅ Auto-login token found in memory for:', tokenData.email)
      
      // También buscar en BD para obtener datos actualizados del usuario
      try {
        const user = await prisma.user.findFirst({
          where: {
            email: tokenData.email,
            autoLoginToken: tokenData.token,
            autoLoginTokenExpiry: {
              gt: new Date()
            }
          }
        })
        
        if (user) {
          return NextResponse.json({
            success: true,
            token: tokenData.token,
            user: {
              email: user.email,
              name: user.name || user.email?.split('@')[0] || 'Usuario',
              plan: tokenData.plan || 'rocket'
            }
          })
        }
      } catch (dbError) {
        console.warn('Warning: DB lookup failed, using memory fallback:', dbError)
        // Continuar con datos de memoria si falla BD
        return NextResponse.json({
          success: true,
          token: tokenData.token,
          user: {
            email: tokenData.email,
            name: tokenData.email?.split('@')[0] || 'Usuario',
            plan: tokenData.plan || 'rocket'
          }
        })
      }
    }
    
    // Si no está en memoria o expiró, buscar en BD
    console.log('🔍 Token not found in memory, searching in database...')
    
    try {
      const user = await prisma.user.findFirst({
        where: {
          autoLoginToken: {
            not: null
          },
          autoLoginTokenExpiry: {
            gt: new Date()
          }
        },
        orderBy: {
          autoLoginTokenExpiry: 'desc'
        }
      })
      
      if (!user || !user.autoLoginToken) {
        console.log('❌ No valid token found in database for session:', sessionId)
        return NextResponse.json({ success: false, error: 'No token found' }, { status: 404 })
      }
      
      console.log('✅ Auto-login token found in database for:', user.email)
      
      return NextResponse.json({
        success: true,
        token: user.autoLoginToken,
        user: {
          email: user.email,
          name: user.name || user.email?.split('@')[0] || 'Usuario',
          plan: 'rocket' // Default plan, podríamos obtener esto de otra tabla si es necesario
        }
      })
      
    } catch (dbError) {
      console.error('❌ Database error:', dbError)
      return NextResponse.json({ success: false, error: 'Database error' }, { status: 500 })
    }
    
  } catch (error) {
    console.error('❌ Error getting login token:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to get login token' },
      { status: 500 }
    )
  }
}