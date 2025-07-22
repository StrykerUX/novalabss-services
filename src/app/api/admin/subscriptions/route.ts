import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { PrismaClient } from '@prisma/client'
import Stripe from 'stripe'

const prisma = new PrismaClient()
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-04-30.basil',
})

export async function GET(request: NextRequest) {
  try {
    // Verificar autenticación admin
    const session = await getServerSession(authOptions)
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status') || 'all'
    const limit = parseInt(searchParams.get('limit') || '50')

    // Obtener suscripciones de Stripe
    let subscriptionsQuery: any = { limit }
    
    if (status !== 'all') {
      subscriptionsQuery.status = status
    }

    const subscriptions = await stripe.subscriptions.list(subscriptionsQuery)

    // Enriquecer datos con información de usuarios
    const enrichedSubscriptions = await Promise.all(
      subscriptions.data.map(async (subscription) => {
        try {
          // Obtener customer
          const customer = await stripe.customers.retrieve(subscription.customer as string)
          
          // Obtener producto
          const product = await stripe.products.retrieve(
            subscription.items.data[0].price.product as string
          )

          // Buscar usuario en nuestra base de datos
          let dbUser = null
          if (customer && !customer.deleted && customer.email) {
            dbUser = await prisma.user.findUnique({
              where: { email: customer.email },
              include: {
                projects: {
                  select: {
                    id: true,
                    name: true,
                    status: true
                  }
                }
              }
            })
          }

          // Mapear plan
          const planMapping = {
            'prod_SgkgdpKFJDM2ox': 'Plan Rocket',
            'prod_Sgkk0fGoUzKtOk': 'Plan Galaxy'
          } as const

          const planName = planMapping[product.id as keyof typeof planMapping] || product.name || 'Plan desconocido'

          const amount = subscription.items.data[0]?.price?.unit_amount || 0
          const currency = subscription.items.data[0]?.price?.currency || 'mxn'

          return {
            id: subscription.id,
            status: subscription.status,
            customer: {
              id: customer && !customer.deleted ? customer.id : null,
              email: customer && !customer.deleted ? customer.email : 'Email no disponible',
              name: customer && !customer.deleted ? customer.name : 'Nombre no disponible'
            },
            user: dbUser ? {
              id: dbUser.id,
              name: dbUser.name,
              email: dbUser.email,
              projects: dbUser.projects.length
            } : null,
            plan: {
              id: product.id,
              name: planName,
              amount: amount / 100, // Convertir de centavos
              currency: currency.toUpperCase(),
              interval: subscription.items.data[0]?.price?.recurring?.interval || 'month'
            },
            dates: {
              created: new Date(subscription.created * 1000).toISOString().split('T')[0],
              current_period_start: new Date(subscription.current_period_start * 1000).toISOString().split('T')[0],
              current_period_end: new Date(subscription.current_period_end * 1000).toISOString().split('T')[0],
              trial_end: subscription.trial_end ? new Date(subscription.trial_end * 1000).toISOString().split('T')[0] : null
            },
            billing: {
              collection_method: subscription.collection_method,
              cancel_at_period_end: subscription.cancel_at_period_end,
              canceled_at: subscription.canceled_at ? new Date(subscription.canceled_at * 1000).toISOString().split('T')[0] : null
            },
            metadata: subscription.metadata
          }
        } catch (error) {
          console.error(`Error processing subscription ${subscription.id}:`, error)
          return {
            id: subscription.id,
            status: subscription.status,
            customer: { id: null, email: 'Error', name: 'Error' },
            user: null,
            plan: { id: '', name: 'Error', amount: 0, currency: 'MXN', interval: 'month' },
            dates: {
              created: new Date(subscription.created * 1000).toISOString().split('T')[0],
              current_period_start: new Date(subscription.current_period_start * 1000).toISOString().split('T')[0],
              current_period_end: new Date(subscription.current_period_end * 1000).toISOString().split('T')[0],
              trial_end: null
            },
            billing: {
              collection_method: subscription.collection_method,
              cancel_at_period_end: subscription.cancel_at_period_end,
              canceled_at: null
            },
            metadata: subscription.metadata,
            error: 'Error al procesar suscripción'
          }
        }
      })
    )

    // Estadísticas de suscripciones
    const stats = {
      total: enrichedSubscriptions.length,
      active: enrichedSubscriptions.filter(s => s.status === 'active').length,
      trialing: enrichedSubscriptions.filter(s => s.status === 'trialing').length,
      past_due: enrichedSubscriptions.filter(s => s.status === 'past_due').length,
      canceled: enrichedSubscriptions.filter(s => s.status === 'canceled').length,
      incomplete: enrichedSubscriptions.filter(s => s.status === 'incomplete').length,
      totalRevenue: enrichedSubscriptions
        .filter(s => s.status === 'active')
        .reduce((sum, s) => sum + s.plan.amount, 0)
    }

    return NextResponse.json({
      subscriptions: enrichedSubscriptions,
      stats,
      hasMore: subscriptions.has_more
    })

  } catch (error) {
    console.error('Error fetching admin subscriptions:', error)
    return NextResponse.json(
      { 
        error: 'Error al obtener suscripciones',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    // Verificar autenticación admin
    const session = await getServerSession(authOptions)
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const { action, subscriptionId, ...params } = await request.json()

    if (!action || !subscriptionId) {
      return NextResponse.json(
        { error: 'Acción y ID de suscripción son requeridos' },
        { status: 400 }
      )
    }

    let result

    switch (action) {
      case 'cancel':
        result = await stripe.subscriptions.update(subscriptionId, {
          cancel_at_period_end: true
        })
        break

      case 'reactivate':
        result = await stripe.subscriptions.update(subscriptionId, {
          cancel_at_period_end: false
        })
        break

      case 'cancel_immediately':
        result = await stripe.subscriptions.cancel(subscriptionId)
        break

      case 'update_payment_method':
        if (!params.payment_method) {
          return NextResponse.json(
            { error: 'payment_method es requerido para esta acción' },
            { status: 400 }
          )
        }
        result = await stripe.subscriptions.update(subscriptionId, {
          default_payment_method: params.payment_method
        })
        break

      default:
        return NextResponse.json(
          { error: 'Acción no válida' },
          { status: 400 }
        )
    }

    return NextResponse.json({
      message: `Acción ${action} ejecutada exitosamente`,
      subscription: result
    })

  } catch (error) {
    console.error('Error managing subscription:', error)
    return NextResponse.json(
      { 
        error: 'Error al gestionar suscripción',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}