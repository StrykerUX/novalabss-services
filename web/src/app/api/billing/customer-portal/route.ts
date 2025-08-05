import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-04-30.basil',
})

export async function POST(request: NextRequest) {
  try {
    // Verificar autenticación
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const { return_url } = await request.json()

    // Buscar customer en Stripe por email
    const customers = await stripe.customers.list({
      email: session.user.email,
      limit: 1
    })

    if (customers.data.length === 0) {
      return NextResponse.json(
        { error: 'No se encontró información de facturación' }, 
        { status: 404 }
      )
    }

    const customer = customers.data[0]

    // Crear sesión del Customer Portal
    const portalSession = await stripe.billingPortal.sessions.create({
      customer: customer.id,
      return_url: return_url || `${process.env.NEXTAUTH_URL}/dashboard/billing`,
    })

    return NextResponse.json({
      url: portalSession.url
    })

  } catch (error) {
    console.error('Error creating customer portal session:', error)
    return NextResponse.json(
      { 
        error: 'Error al acceder al portal de facturación',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}