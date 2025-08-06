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
    let customers
    try {
      customers = await stripe.customers.list({
        email: session.user.email,
        limit: 1
      })
      console.log('✅ Customer search completed, found:', customers.data.length, 'customers')
    } catch (customerError) {
      console.error('❌ ERROR searching customers:', customerError)
      throw customerError
    }

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
    let subscriptions
    try {
      subscriptions = await stripe.subscriptions.list({
        customer: customer.id,
        status: 'active',
        limit: 1
      })
      console.log('✅ Active subscriptions found:', subscriptions.data.length)
    } catch (subscriptionError) {
      console.error('❌ ERROR searching subscriptions:', subscriptionError)
      throw subscriptionError
    }

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
    console.log('🔍 Subscription items:', subscription.items.data.length)
    console.log('🔍 First item price ID:', subscription.items.data[0]?.price?.id)

    // Verificar que existe la información del precio
    if (!subscription.items.data[0]?.price) {
      throw new Error('No price information found in subscription')
    }

    const subscriptionPrice = subscription.items.data[0].price
    console.log('🔍 Price product ID:', subscriptionPrice.product)

    // Obtener información del producto
    console.log('🔍 Retrieving product information...')
    let product
    try {
      product = await stripe.products.retrieve(subscriptionPrice.product as string)
      console.log('✅ Product retrieved:', product.id)
    } catch (productError) {
      console.error('❌ ERROR retrieving product:', productError)
      throw productError
    }

    // Determinar el plan basado en el product ID
    const planMapping = {
      'prod_SgkgdpKFJDM2ox': 'rocket',
      'prod_Sgkk0fGoUzKtOk': 'galaxy'
    } as const

    const planType = planMapping[product.id as keyof typeof planMapping] || 'rocket'
    console.log('✅ Plan type determined:', planType)

    // Obtener precio real de la suscripción (con descuentos aplicados)
    const actualPrice = subscriptionPrice.unit_amount || 0
    console.log('✅ Actual price:', actualPrice)
    
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
    console.log('✅ Plan data prepared:', plan.name)

    // Calcular fechas y días con validación
    console.log('🔍 Raw timestamps - created:', subscription.created, 'current_period_end:', subscription.current_period_end)
    
    // Validar timestamps antes de crear objetos Date
    const createdTimestamp = subscription.created
    const currentPeriodEndTimestamp = subscription.current_period_end
    
    if (!createdTimestamp) {
      throw new Error(`Invalid created timestamp: ${createdTimestamp}`)
    }
    
    const startDate = new Date(createdTimestamp * 1000)
    
    // Manejar el caso donde current_period_end es undefined
    let currentPeriodEnd: Date
    let daysRemaining = 0
    let renewalDate: Date | null = null
    
    if (currentPeriodEndTimestamp) {
      currentPeriodEnd = new Date(currentPeriodEndTimestamp * 1000)
      
      // Validar que la fecha se creó correctamente
      if (isNaN(currentPeriodEnd.getTime())) {
        console.log('⚠️ Invalid current_period_end, using fallback')
        currentPeriodEnd = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 días desde ahora
      }
      
      renewalDate = currentPeriodEnd
      const now = new Date()
      daysRemaining = Math.max(0, Math.floor((currentPeriodEnd.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)))
    } else {
      console.log('⚠️ current_period_end is undefined, using fallback')
      // Fallback: crear una fecha futura estimada (30 días desde la creación)
      currentPeriodEnd = new Date(startDate.getTime() + 30 * 24 * 60 * 60 * 1000)
      // No establecer renewalDate si no tenemos datos reales
      renewalDate = null
      daysRemaining = 0
    }
    
    // Validar que startDate se creó correctamente
    if (isNaN(startDate.getTime())) {
      throw new Error(`Invalid startDate: ${startDate}`)
    }
    
    const now = new Date()
    const daysElapsed = Math.floor((now.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))

    console.log('✅ Dates calculated - renewal:', renewalDate ? renewalDate.toISOString() : 'No disponible')

    // Obtener información de descuentos
    const discount = subscription.discount
    const hasDiscount = discount && discount.coupon
    console.log('✅ Discount info:', hasDiscount ? 'Yes' : 'No')

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

    console.log('✅ About to return response')

    return NextResponse.json({
      subscription: {
        id: subscription.id,
        status: subscription.status,
        current_period_start: subscription.current_period_start,
        current_period_end: subscription.current_period_end,
        cancel_at_period_end: subscription.cancel_at_period_end,
        created: subscription.created,
        plan: {
          id: subscriptionPrice.id,
          amount: subscriptionPrice.unit_amount || 0,
          currency: subscriptionPrice.currency,
          interval: subscriptionPrice.recurring?.interval || 'month',
          interval_count: subscriptionPrice.recurring?.interval_count || 1,
          product: product.id
        },
        customer: customer.id
      },
      plan,
      isActive: subscription.status === 'active',
      status: subscription.status,
      startDate,
      endDate: renewalDate,
      daysElapsed,
      daysRemaining,
      renewalDate,
      discount: discountInfo,
      hasDiscount,
      customer: {
        id: customer.id,
        email: customer.email!,
        name: customer.name || session.user.name,
        created: customer.created
      }
    })

  } catch (error) {
    console.error('❌ ERROR in subscription API:', error)
    console.error('❌ ERROR name:', error instanceof Error ? error.name : 'Unknown')
    console.error('❌ ERROR message:', error instanceof Error ? error.message : 'No message')
    console.error('❌ ERROR stack:', error instanceof Error ? error.stack : 'No stack trace')
    
    return NextResponse.json(
      { 
        error: 'Error al obtener datos de suscripción',
        details: error instanceof Error ? error.message : 'Unknown error',
        errorName: error instanceof Error ? error.name : 'Unknown',
        stack: error instanceof Error ? error.stack : null
      },
      { status: 500 }
    )
  }
}