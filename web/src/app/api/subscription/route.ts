import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-04-30.basil',
})

export async function GET(request: NextRequest) {
  try {
    console.log('🚀 Starting subscription API call')
    
    // Verificar autenticación
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      console.log('❌ No session or email found')
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }
    
    console.log('✅ Session found for email:', session.user.email)

    // Buscar customer en Stripe por email
    console.log('🔍 Searching for customer in Stripe...')
    const customers = await stripe.customers.list({
      email: session.user.email,
      limit: 1
    })
    console.log('✅ Customer search completed, found:', customers.data.length, 'customers')

    if (customers.data.length === 0) {
      console.log('❌ No customer found')
      return NextResponse.json({
        subscription: null,
        plan: null,
        isActive: false,
        status: 'no_subscription',
        message: 'No se encontró suscripción activa'
      })
    }

    const customer = customers.data[0]
    console.log('✅ Customer found:', customer.id)

    // Obtener suscripciones activas del cliente
    console.log('🔍 Searching for active subscriptions...')
    const subscriptions = await stripe.subscriptions.list({
      customer: customer.id,
      status: 'active',
      limit: 1
    })
    console.log('✅ Active subscriptions found:', subscriptions.data.length)

    if (subscriptions.data.length === 0) {
      console.log('❌ No active subscriptions found')
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
    console.log('✅ Active subscription found:', subscription.id)

    // Obtener información del producto
    console.log('🔍 Retrieving product information...')
    const product = await stripe.products.retrieve(subscription.items.data[0].price.product as string)
    console.log('✅ Product retrieved:', product.id)

    // Determinar el plan basado en el product ID
    const planMapping = {
      'prod_SgkgdpKFJDM2ox': 'rocket',
      'prod_Sgkk0fGoUzKtOk': 'galaxy'
    } as const

    const planType = planMapping[product.id as keyof typeof planMapping] || 'rocket'

    // Obtener precio real de la suscripción (con descuentos aplicados)
    const subscriptionPrice = subscription.items.data[0].price
    const actualPrice = subscriptionPrice.unit_amount || 0
    
    const planData = {
      rocket: {
        id: 'rocket' as const,
        name: 'Plan Rocket',
        productId: 'prod_SgkgdpKFJDM2ox',
        price: actualPrice, // Precio real de Stripe
        originalPrice: 99900, // Precio original sin descuento
        currency: subscriptionPrice.currency,
        interval: subscriptionPrice.recurring?.interval || 'month',
        interval_count: subscriptionPrice.recurring?.interval_count || 2,
        features: ['Landing page optimizada', 'Hosting incluido', 'SSL gratis', '2 revisiones'],
        description: 'Sitio web profesional optimizado',
        credits: 2
      },
      galaxy: {
        id: 'galaxy' as const,
        name: 'Plan Galaxy',
        productId: 'prod_Sgkk0fGoUzKtOk',
        price: actualPrice, // Precio real de Stripe
        originalPrice: 179900, // Precio original sin descuento
        currency: subscriptionPrice.currency,
        interval: subscriptionPrice.recurring?.interval || 'month',
        interval_count: subscriptionPrice.recurring?.interval_count || 2,
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

    // Obtener información de descuentos
    const discount = subscription.discount
    const hasDiscount = discount && discount.coupon
    const discountInfo = hasDiscount ? {
      coupon: {
        id: discount.coupon.id,
        name: discount.coupon.name,
        percent_off: discount.coupon.percent_off,
        amount_off: discount.coupon.amount_off,
        duration: discount.coupon.duration,
        duration_in_months: discount.coupon.duration_in_months,
        valid_until: discount.end ? new Date(discount.end * 1000) : null
      }
    } : null

    // Debug logging
    console.log('🔍 DEBUG - Subscription data:', {
      subscriptionId: subscription.id,
      priceId: subscription.items.data[0].price.id,
      unitAmount: subscription.items.data[0].price.unit_amount,
      currency: subscription.items.data[0].price.currency,
      currentPeriodEnd: subscription.current_period_end,
      currentPeriodEndDate: currentPeriodEnd,
      actualPrice,
      planType,
      hasDiscount,
      discount: discount ? {
        couponId: discount.coupon?.id,
        percentOff: discount.coupon?.percent_off,
        amountOff: discount.coupon?.amount_off
      } : null
    })

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
      discount: discountInfo,
      hasDiscount,
      // Debug info
      debug: {
        rawPrice: subscription.items.data[0].price.unit_amount,
        computedPrice: actualPrice,
        currentPeriodEndTimestamp: subscription.current_period_end,
        currentPeriodEndFormatted: currentPeriodEnd.toISOString()
      },
      customer: {
        id: customer.id,
        email: customer.email!,
        name: customer.name || session.user.name,
        created: customer.created
      }
    })

  } catch (error) {
    console.error('❌ ERROR in subscription API:', error)
    console.error('❌ ERROR stack:', error instanceof Error ? error.stack : 'No stack trace')
    return NextResponse.json(
      { 
        error: 'Error al obtener datos de suscripción',
        details: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : null
      },
      { status: 500 }
    )
  }
}