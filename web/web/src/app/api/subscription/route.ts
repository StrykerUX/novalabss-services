import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-04-30.basil',
})

export async function GET(request: NextRequest) {
  try {
    // Verificar autenticación
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    // Buscar customer en Stripe por email
    const customers = await stripe.customers.list({
      email: session.user.email,
      limit: 1
    })

    if (customers.data.length === 0) {
      return NextResponse.json({
        subscription: null,
        plan: null,
        isActive: false,
        status: 'no_subscription',
        message: 'No se encontró suscripción activa'
      })
    }

    const customer = customers.data[0]

    // Obtener suscripciones activas del cliente
    const subscriptions = await stripe.subscriptions.list({
      customer: customer.id,
      status: 'active',
      limit: 1
    })

    if (subscriptions.data.length === 0) {
      // Verificar si hay suscripciones en otros estados
      const allSubscriptions = await stripe.subscriptions.list({
        customer: customer.id,
        limit: 3
      })

      return NextResponse.json({
        subscription: null,
        plan: null,
        isActive: false,
        status: allSubscriptions.data.length > 0 ? allSubscriptions.data[0].status : 'no_subscription',
        message: 'No hay suscripción activa',
        allSubscriptions: allSubscriptions.data.map(sub => ({
          id: sub.id,
          status: sub.status,
          created: sub.created
        }))
      })
    }

    const subscription = subscriptions.data[0]

    // Obtener información del producto
    const product = await stripe.products.retrieve(subscription.items.data[0].price.product as string)

    // Determinar el plan basado en el product ID
    const planMapping = {
      'prod_SgkgdpKFJDM2ox': 'rocket',
      'prod_Sgkk0fGoUzKtOk': 'galaxy'
    } as const

    const planType = planMapping[product.id as keyof typeof planMapping] || 'rocket'

    const planData = {
      rocket: {
        id: 'rocket' as const,
        name: 'Plan Rocket',
        productId: 'prod_SgkgdpKFJDM2ox',
        price: 99900,
        currency: 'mxn',
        interval: 'month',
        interval_count: 2,
        features: ['Landing page optimizada', 'Hosting incluido', 'SSL gratis', '2 revisiones'],
        description: 'Sitio web profesional optimizado',
        credits: 2
      },
      galaxy: {
        id: 'galaxy' as const,
        name: 'Plan Galaxy',
        productId: 'prod_Sgkk0fGoUzKtOk',
        price: 179900,
        currency: 'mxn',
        interval: 'month',
        interval_count: 2,
        features: ['Todo del Plan Rocket', 'Marketing personalizado', 'Analytics avanzado', '5 revisiones'],
        description: 'Plan completo con marketing personalizado',
        credits: 5
      }
    }

    const plan = planData[planType]

    // Calcular fechas y días
    const startDate = new Date(subscription.created * 1000)
    const currentPeriodEnd = new Date(subscription.current_period_end * 1000)
    const now = new Date()
    
    const daysElapsed = Math.floor((now.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))
    const daysRemaining = Math.max(0, Math.floor((currentPeriodEnd.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)))

    return NextResponse.json({
      subscription: {
        id: subscription.id,
        status: subscription.status,
        current_period_start: subscription.current_period_start,
        current_period_end: subscription.current_period_end,
        cancel_at_period_end: subscription.cancel_at_period_end,
        created: subscription.created,
        plan: {
          id: subscription.items.data[0].price.id,
          amount: subscription.items.data[0].price.unit_amount || 0,
          currency: subscription.items.data[0].price.currency,
          interval: subscription.items.data[0].price.recurring?.interval || 'month',
          interval_count: subscription.items.data[0].price.recurring?.interval_count || 1,
          product: product.id
        },
        customer: customer.id
      },
      plan,
      isActive: subscription.status === 'active',
      status: subscription.status,
      startDate,
      endDate: currentPeriodEnd,
      daysElapsed,
      daysRemaining,
      renewalDate: currentPeriodEnd,
      customer: {
        id: customer.id,
        email: customer.email!,
        name: customer.name || session.user.name,
        created: customer.created
      }
    })

  } catch (error) {
    console.error('Error fetching subscription:', error)
    return NextResponse.json(
      { 
        error: 'Error al obtener datos de suscripción',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}