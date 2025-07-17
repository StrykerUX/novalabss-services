import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { headers } from 'next/headers'
import { PrismaClient } from '@prisma/client'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-04-30.basil',
})

const prisma = new PrismaClient()
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
        
        // Aquí puedes actualizar tu base de datos
        // - Crear usuario si no existe
        // - Activar suscripción
        // - Enviar email de bienvenida
        // - Actualizar estado de pago
        
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

    if (!session.customer_details?.email) {
      console.error('No customer email found in session')
      return
    }

    // 1. Buscar o crear usuario
    let user = await prisma.user.findUnique({
      where: { email: session.customer_details.email }
    })

    if (!user) {
      user = await prisma.user.create({
        data: {
          email: session.customer_details.email,
          name: session.customer_details.name || session.customer_details.email.split('@')[0],
          role: 'USER'
        }
      })
      console.log('✅ Created new user:', user.id)
    }

    // 2. Determinar plan
    const planName = session.metadata?.plan === 'galaxy' ? 'Plan Galaxy' : 'Plan Rocket'
    const planType = session.metadata?.plan === 'galaxy' ? 'Galaxy' : 'Rocket'

    // 3. Verificar si ya existe un proyecto para este usuario y plan
    const existingProject = await prisma.project.findFirst({
      where: {
        userId: user.id,
        plan: planType
      }
    })

    if (!existingProject) {
      // 4. Crear proyecto inicial del sitio web
      const projectName = `${planName} - ${user.name || user.email.split('@')[0]}`
      
      const newProject = await prisma.project.create({
        data: {
          name: projectName,
          userId: user.id,
          status: 'EN_DESARROLLO',
          progress: 0,
          currentPhase: 'Configuración inicial - Pago confirmado',
          estimatedDelivery: planType === 'Galaxy' ? '5 días' : '3 días',
          plan: planType
        }
      })

      console.log('🚀 Created new project:', newProject.id, 'for user:', user.email)
    } else {
      console.log('📝 Project already exists for user:', user.email)
    }

    // 5. Generar token de auto-login
    const autoLoginToken = generateAutoLoginToken({
      sessionId: session.id,
      email: session.customer_details.email,
      name: session.customer_details.name || '',
      plan: session.metadata?.plan || 'rocket',
      source: session.metadata?.source || 'unknown',
      frustration: session.metadata?.frustration || '',
      aspiration: session.metadata?.aspiration || '',
    })

    console.log('✅ Auto-login token generated for:', session.customer_details.email)
    
    // 6. Almacenar token temporalmente
    global.autoLoginTokens = global.autoLoginTokens || new Map()
    global.autoLoginTokens.set(session.id, {
      token: autoLoginToken,
      email: session.customer_details.email,
      plan: session.metadata?.plan,
      timestamp: Date.now(),
      expiresAt: Date.now() + (60 * 60 * 1000) // 1 hora
    })

  } catch (error) {
    console.error('Error processing successful payment:', error)
    throw error
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
    
    // Obtener customer
    const customer = await stripe.customers.retrieve(subscription.customer as string)
    
    if (customer.deleted || !customer.email) {
      console.log('Customer deleted or missing email')
      return
    }

    // Buscar o crear usuario
    let user = await prisma.user.findUnique({
      where: { email: customer.email }
    })

    if (!user) {
      user = await prisma.user.create({
        data: {
          email: customer.email,
          name: customer.name || customer.email.split('@')[0],
          role: 'USER'
        }
      })
      console.log('✅ Created user from subscription:', user.id)
    }

    // Solo crear proyecto si la suscripción está activa o en trial
    if (subscription.status === 'active' || subscription.status === 'trialing') {
      // Obtener producto para determinar el plan
      const product = await stripe.products.retrieve(
        subscription.items.data[0].price.product as string
      )

      // Mapear producto a plan
      const planMapping = {
        'prod_SgkgdpKFJDM2ox': { name: 'Plan Rocket', type: 'Rocket' },
        'prod_Sgkk0fGoUzKtOk': { name: 'Plan Galaxy', type: 'Galaxy' }
      } as const

      const planData = planMapping[product.id as keyof typeof planMapping] || { name: 'Plan Rocket', type: 'Rocket' }

      // Verificar si ya existe proyecto
      const existingProject = await prisma.project.findFirst({
        where: {
          userId: user.id,
          plan: planData.type
        }
      })

      if (!existingProject) {
        const projectName = `${planData.name} - ${user.name || user.email.split('@')[0]}`
        
        const newProject = await prisma.project.create({
          data: {
            name: projectName,
            userId: user.id,
            status: 'EN_DESARROLLO',
            progress: 0,
            currentPhase: 'Configuración inicial - Suscripción activada',
            estimatedDelivery: planData.type === 'Galaxy' ? '5 días' : '3 días',
            plan: planData.type
          }
        })

        console.log('🚀 Created project from subscription:', newProject.id, 'for user:', user.email)
      } else {
        // Actualizar proyecto existente si estaba pausado
        if (existingProject.status === 'EN_MANTENIMIENTO') {
          await prisma.project.update({
            where: { id: existingProject.id },
            data: {
              status: 'EN_DESARROLLO',
              currentPhase: 'Suscripción reactivada'
            }
          })
          console.log('🔄 Reactivated project:', existingProject.id)
        }
      }
    }
    
  } catch (error) {
    console.error('Error processing new subscription:', error)
    throw error
  }
}

async function handleCancelledSubscription(subscription: Stripe.Subscription) {
  try {
    console.log('Processing cancelled subscription:', subscription.id)
    
    // Obtener customer
    const customer = await stripe.customers.retrieve(subscription.customer as string)
    
    if (customer.deleted || !customer.email) {
      return
    }

    // Buscar usuario
    const user = await prisma.user.findUnique({
      where: { email: customer.email }
    })

    if (!user) {
      return
    }

    // Pausar todos los proyectos activos del usuario
    const updatedProjects = await prisma.project.updateMany({
      where: { 
        userId: user.id,
        status: {
          in: ['EN_DESARROLLO', 'EN_REVISION', 'EN_ACTUALIZACION']
        }
      },
      data: { 
        status: 'EN_MANTENIMIENTO',
        currentPhase: 'Suscripción cancelada - Proyecto pausado'
      }
    })

    console.log(`⏸️ Paused ${updatedProjects.count} projects for cancelled subscription`)
    
  } catch (error) {
    console.error('Error processing cancelled subscription:', error)
    throw error
  }
}

async function handleFailedPayment(invoice: Stripe.Invoice) {
  try {
    console.log('Processing failed payment:', invoice.id)
    
    if (!invoice.customer) {
      return
    }

    // Obtener customer
    const customer = await stripe.customers.retrieve(invoice.customer as string)
    
    if (customer.deleted || !customer.email) {
      return
    }

    // Buscar usuario
    const user = await prisma.user.findUnique({
      where: { email: customer.email }
    })

    if (!user) {
      return
    }

    // Marcar proyectos como con problemas de pago
    const updatedProjects = await prisma.project.updateMany({
      where: { 
        userId: user.id,
        status: {
          in: ['EN_DESARROLLO', 'EN_REVISION', 'EN_ACTUALIZACION']
        }
      },
      data: { 
        currentPhase: 'Problema de pago - Contacte soporte'
      }
    })

    console.log(`⚠️ Updated ${updatedProjects.count} projects for failed payment`)
    
  } catch (error) {
    console.error('Error processing failed payment:', error)
    throw error
  }
}