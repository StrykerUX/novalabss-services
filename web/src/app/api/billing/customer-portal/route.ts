import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-04-30.basil',
})

export async function POST(request: NextRequest) {
  try {
    console.log('🚀 Starting customer portal API call')
    
    // Verificar autenticación
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      console.log('❌ No session or email found')
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }
    
    console.log('✅ Session found for email:', session.user.email)

    const { return_url } = await request.json()
    console.log('🔍 Return URL:', return_url)

    // Buscar customer en Stripe por email
    console.log('🔍 Searching for customer in Stripe...')
    const customers = await stripe.customers.list({
      email: session.user.email,
      limit: 1
    })
    console.log('✅ Customer search completed, found:', customers.data.length, 'customers')

    if (customers.data.length === 0) {
      console.log('❌ No customer found')
      return NextResponse.json(
        { error: 'No se encontró información de facturación' }, 
        { status: 404 }
      )
    }

    const customer = customers.data[0]
    console.log('✅ Customer found:', customer.id)

    // Crear sesión del Customer Portal
    console.log('🔍 Creating customer portal session...')
    const finalReturnUrl = return_url || `${process.env.NEXTAUTH_URL}/dashboard/billing`
    console.log('🔍 Final return URL:', finalReturnUrl)
    
    const portalSession = await stripe.billingPortal.sessions.create({
      customer: customer.id,
      return_url: finalReturnUrl,
    })
    
    console.log('✅ Portal session created successfully:', portalSession.id)
    console.log('✅ Portal URL:', portalSession.url)

    return NextResponse.json({
      url: portalSession.url
    })

  } catch (error) {
    console.error('❌ ERROR in customer portal API:', error)
    console.error('❌ ERROR name:', error instanceof Error ? error.name : 'Unknown')
    console.error('❌ ERROR message:', error instanceof Error ? error.message : 'No message')
    console.error('❌ ERROR stack:', error instanceof Error ? error.stack : 'No stack trace')
    
    return NextResponse.json(
      { 
        error: 'Error al acceder al portal de facturación',
        details: error instanceof Error ? error.message : 'Unknown error',
        errorName: error instanceof Error ? error.name : 'Unknown'
      },
      { status: 500 }
    )
  }
}