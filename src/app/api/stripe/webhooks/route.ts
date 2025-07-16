import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { headers } from 'next/headers'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-04-30.basil',
})

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const headersList = await headers()
    const signature = headersList.get('stripe-signature')

    if (!signature) {
      console.error('Missing Stripe signature')
      return NextResponse.json({ error: 'Missing signature' }, { status: 400 })
    }

    let event: Stripe.Event

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
    } catch (err) {
      console.error('Webhook signature verification failed:', err)
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
    }

    console.log('✅ Webhook received:', event.type)

    // Manejar diferentes tipos de eventos
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object as Stripe.Checkout.Session
        console.log('💰 Payment succeeded:', {
          sessionId: session.id,
          customerId: session.customer,
          amount: session.amount_total,
          currency: session.currency,
          metadata: session.metadata
        })
        
        await handleSuccessfulPayment(session)
        break

      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object as Stripe.PaymentIntent
        console.log('💳 Payment intent succeeded:', paymentIntent.id)
        break

      case 'customer.subscription.created':
        const subscription = event.data.object as Stripe.Subscription
        console.log('🎯 New subscription:', subscription.id)
        await handleNewSubscription(subscription)
        break

      case 'customer.subscription.updated':
        const updatedSubscription = event.data.object as Stripe.Subscription
        console.log('🔄 Subscription updated:', updatedSubscription.id)
        break

      case 'customer.subscription.deleted':
        const deletedSubscription = event.data.object as Stripe.Subscription
        console.log('❌ Subscription cancelled:', deletedSubscription.id)
        await handleCancelledSubscription(deletedSubscription)
        break

      case 'invoice.payment_succeeded':
        const invoice = event.data.object as Stripe.Invoice
        console.log('📄 Invoice paid:', invoice.id)
        break

      case 'invoice.payment_failed':
        const failedInvoice = event.data.object as Stripe.Invoice
        console.log('⚠️ Invoice payment failed:', failedInvoice.id)
        await handleFailedPayment(failedInvoice)
        break

      default:
        console.log(`🤷‍♂️ Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })

  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    )
  }
}

async function handleSuccessfulPayment(session: Stripe.Checkout.Session) {
  try {
    console.log('Processing successful payment:', {
      sessionId: session.id,
      plan: session.metadata?.plan,
      source: session.metadata?.source,
      frustration: session.metadata?.frustration,
      aspiration: session.metadata?.aspiration,
      customerEmail: session.customer_details?.email,
      customerName: session.customer_details?.name,
    })

    // Generar token de auto-login
    const autoLoginToken = generateAutoLoginToken({
      sessionId: session.id,
      email: session.customer_details?.email || '',
      name: session.customer_details?.name || '',
      plan: session.metadata?.plan || 'rocket',
      source: session.metadata?.source || 'unknown',
      frustration: session.metadata?.frustration || '',
      aspiration: session.metadata?.aspiration || '',
    })

    console.log('✅ Auto-login token generated for:', session.customer_details?.email)
    
    // TODO: Aquí irían las operaciones de base de datos:
    // 1. Buscar o crear usuario
    // 2. Crear registro de suscripción
    // 3. Activar servicios del plan
    // 4. Enviar email de confirmación con token
    // 5. Crear proyecto inicial del sitio web

    // Por ahora, solo almacenamos el token temporalmente
    // En producción, esto se guardaría en Redis o base de datos
    global.autoLoginTokens = global.autoLoginTokens || new Map()
    global.autoLoginTokens.set(session.id, {
      token: autoLoginToken,
      email: session.customer_details?.email,
      plan: session.metadata?.plan,
      timestamp: Date.now(),
      expiresAt: Date.now() + (60 * 60 * 1000) // 1 hora
    })

    console.log('🎯 Auto-login token stored for session:', session.id)

  } catch (error) {
    console.error('Error processing successful payment:', error)
  }
}

function generateAutoLoginToken(userData: any) {
  // Por ahora, generamos un token simple
  // En producción, usaríamos JWT con firma
  const tokenData = {
    sessionId: userData.sessionId,
    email: userData.email,
    name: userData.name,
    plan: userData.plan,
    source: userData.source,
    frustration: userData.frustration,
    aspiration: userData.aspiration,
    timestamp: Date.now()
  }
  
  // Token simple codificado en base64
  return Buffer.from(JSON.stringify(tokenData)).toString('base64')
}

async function handleNewSubscription(subscription: Stripe.Subscription) {
  try {
    console.log('Processing new subscription:', subscription.id)
    
    // TODO: Actualizar estado de suscripción en BD
    // - Activar servicios del plan
    // - Configurar próximas fechas de facturación
    // - Notificar al equipo de desarrollo
    
  } catch (error) {
    console.error('Error processing new subscription:', error)
  }
}

async function handleCancelledSubscription(subscription: Stripe.Subscription) {
  try {
    console.log('Processing cancelled subscription:', subscription.id)
    
    // TODO: Desactivar servicios
    // - Pausar desarrollo del sitio
    // - Enviar email de cancelación
    // - Actualizar estado en BD
    
  } catch (error) {
    console.error('Error processing cancelled subscription:', error)
  }
}

async function handleFailedPayment(invoice: Stripe.Invoice) {
  try {
    console.log('Processing failed payment:', invoice.id)
    
    // TODO: Manejar fallo de pago
    // - Notificar al cliente
    // - Intentar cobro alternativo
    // - Suspender servicios si es necesario
    
  } catch (error) {
    console.error('Error processing failed payment:', error)
  }
}