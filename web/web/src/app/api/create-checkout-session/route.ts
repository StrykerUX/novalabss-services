import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { STRIPE_PRODUCTS, getProductConfig, RegionType } from '@/lib/stripe-products'

// Debug environment variables
console.log('🔧 Environment check:')
console.log('STRIPE_SECRET_KEY exists:', !!process.env.STRIPE_SECRET_KEY)
console.log('STRIPE_SECRET_KEY starts with sk_:', process.env.STRIPE_SECRET_KEY?.startsWith('sk_'))
console.log('NEXTAUTH_URL:', process.env.NEXTAUTH_URL)

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not defined in environment variables')
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-04-30.basil',
})

export async function POST(request: NextRequest) {
  console.log('🚀 API Called - Starting checkout session creation')
  
  try {
    console.log('📋 Step 1: Parsing request body...')
    const { plan, region, metadata } = await request.json()
    console.log('📋 Request data:', { plan, region, metadata })
    
    // Validar plan
    if (!STRIPE_PRODUCTS[plan as keyof typeof STRIPE_PRODUCTS]) {
      console.error('❌ Plan inválido:', plan)
      return NextResponse.json({ error: 'Plan inválido' }, { status: 400 })
    }

    // Determinar región (default a international si no se especifica)
    const userRegion = (region as RegionType) || 'international'
    
    // Validar que la región sea válida
    const validRegions: RegionType[] = ['mexico', 'latam', 'usa', 'international']
    if (!validRegions.includes(userRegion)) {
      console.error('❌ Región inválida:', userRegion)
      return NextResponse.json({ error: 'Región inválida' }, { status: 400 })
    }

    const regionConfig = getProductConfig(plan as 'rocket' | 'galaxy', userRegion)

    console.log('📋 Step 2: Plan configurado:', {
      plan,
      region: userRegion,
      productId: regionConfig.productId,
      price: regionConfig.price,
      currency: regionConfig.currency
    })

    console.log('📋 Step 3: Probando conexión a Stripe...')
    
    // Probar conexión básica a Stripe
    try {
      const testAccount = await stripe.accounts.retrieve()
      console.log('✅ Stripe conexión exitosa, account ID:', testAccount.id)
    } catch (stripeTestError) {
      console.error('❌ Error de conexión a Stripe:', stripeTestError)
      return NextResponse.json({ 
        error: 'Error de conexión a Stripe', 
        details: stripeTestError instanceof Error ? stripeTestError.message : 'Unknown stripe error' 
      }, { status: 500 })
    }

    console.log('📋 Step 4: Listando precios del producto...')
    
    // Buscar o crear precio bimestral para este producto
    let priceId: string

    try {
      // Buscar precio existente
      const prices = await stripe.prices.list({
        product: regionConfig.productId,
        active: true,
        type: 'recurring',
        limit: 10
      })

      console.log('📋 Precios encontrados:', prices.data.length)
      console.log('📋 Precios detalles:', prices.data.map(p => ({
        id: p.id,
        amount: p.unit_amount,
        interval: p.recurring?.interval,
        interval_count: p.recurring?.interval_count
      })))

      const bimonthlyPrice = prices.data.find(price => 
        price.recurring?.interval === 'month' && 
        price.recurring?.interval_count === 2 &&
        price.unit_amount === regionConfig.price &&
        price.currency === regionConfig.currency
      )

      if (bimonthlyPrice) {
        priceId = bimonthlyPrice.id
        console.log('✅ Usando precio existente:', priceId)
      } else {
        // Crear nuevo precio bimestral
        console.log('🔨 Creando nuevo precio bimestral...')
        const newPrice = await stripe.prices.create({
          currency: regionConfig.currency,
          unit_amount: regionConfig.price,
          recurring: {
            interval: 'month',
            interval_count: 2,
          },
          product: regionConfig.productId,
        })
        priceId = newPrice.id
        console.log('✅ Precio bimestral creado:', priceId)
      }
    } catch (priceError) {
      console.error('❌ Error manejando precios:', priceError)
      return NextResponse.json({ 
        error: 'Error configurando precio', 
        details: priceError instanceof Error ? priceError.message : 'Unknown price error' 
      }, { status: 500 })
    }
    
    console.log('📋 Step 5: Creando sesión de checkout...')
    
    // Crear sesión de Stripe Checkout
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      metadata: {
        plan,
        region: userRegion,
        selectedRegion: metadata?.selectedRegion || userRegion,
        detectedRegion: metadata?.detectedRegion || '',
        ipCountry: metadata?.ipCountry || '',
        source: metadata?.source || 'unknown',
        flow: metadata?.flow || 'direct',
        timestamp: new Date().toISOString()
      },
      success_url: `${process.env.NEXTAUTH_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXTAUTH_URL}/cancel`,
      // customer_creation solo funciona en payment mode, no en subscription mode
      billing_address_collection: 'required',
      allow_promotion_codes: true,
    })
    
    console.log('✅ Sesión de Stripe creada exitosamente:', {
      sessionId: session.id,
      url: session.url,
      plan,
      priceId
    })
    
    return NextResponse.json({ 
      url: session.url,
      sessionId: session.id 
    })
    
  } catch (error) {
    console.error('❌ Error general en API:', error)
    console.error('❌ Error stack:', error instanceof Error ? error.stack : 'No stack trace')
    return NextResponse.json(
      { 
        error: 'Error interno del servidor', 
        details: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined
      },
      { status: 500 }
    )
  }
}