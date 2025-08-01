import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { STRIPE_PRODUCTS, getProductConfig, RegionType, isPromoActive, getPromoPrice, getRegularPrice } from '@/lib/stripe-products'
import { FEATURES } from '@/config/features'

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

    // Determinar región según feature flag
    let userRegion: RegionType
    
    if (!FEATURES.INTERNATIONAL_PRICING) {
      // Solo México disponible
      userRegion = 'mexico'
      console.log('🇲🇽 International pricing disabled, using Mexico region')
    } else {
      // Lógica original para múltiples regiones
      userRegion = (region as RegionType) || 'international'
      const validRegions: RegionType[] = ['mexico', 'latam', 'usa', 'international']
      if (!validRegions.includes(userRegion)) {
        console.error('❌ Región inválida:', userRegion)
        return NextResponse.json({ error: 'Región inválida' }, { status: 400 })
      }
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
    
    // Determinar si usar pricing promocional
    const usePromoPrice = isPromoActive(plan as 'rocket' | 'galaxy', userRegion)
    const currentPrice = usePromoPrice ? regionConfig.price : (regionConfig.regularPrice || regionConfig.price)
    
    console.log('🎯 Precio determinado:', {
      usePromoPrice,
      currentPrice,
      promoPrice: regionConfig.price,
      regularPrice: regionConfig.regularPrice
    })

    // DEBUG: Verificar variables de entorno
    console.log('🔍 DEBUG Environment Variables:', {
      STRIPE_ROCKET_PRODUCT_ID: process.env.STRIPE_ROCKET_PRODUCT_ID,
      STRIPE_ROCKET_PROMO_PRICE_ID: process.env.STRIPE_ROCKET_PROMO_PRICE_ID,
      STRIPE_ROCKET_REGULAR_PRICE_ID: process.env.STRIPE_ROCKET_REGULAR_PRICE_ID,
      STRIPE_GALAXY_PROMO_PRICE_ID: process.env.STRIPE_GALAXY_PROMO_PRICE_ID,
      STRIPE_GALAXY_REGULAR_PRICE_ID: process.env.STRIPE_GALAXY_REGULAR_PRICE_ID,
      ROCKET_PROMO_ACTIVE: process.env.ROCKET_PROMO_ACTIVE,
      plan,
      userRegion
    })

    console.log('🔍 DEBUG regionConfig:', regionConfig)

    // Usar Price IDs configurados directamente
    const promoPriceId = regionConfig.priceId
    const regularPriceId = regionConfig.regularPriceId

    console.log('📋 Price IDs configurados:', {
      promoPriceId,
      regularPriceId,
      usePromoPrice
    })

    if (!promoPriceId) {
      console.error('❌ No se encontró Price ID promocional para:', { plan, region: userRegion })
      return NextResponse.json({ 
        error: 'Price ID promocional no configurado', 
        details: `No priceId found for ${plan} in ${userRegion}` 
      }, { status: 500 })
    }
    
    console.log('📋 Step 5: Creando sesión de checkout...')
    
    // Determinar qué precio usar para la sesión inicial
    const initialPriceId = usePromoPrice && promoPriceId ? promoPriceId : (regularPriceId || promoPriceId)
    
    if (!initialPriceId) {
      throw new Error('No se pudo determinar el precio inicial')
    }

    // Preparar metadata completo
    const sessionMetadata = {
      plan,
      region: userRegion,
      selectedRegion: metadata?.selectedRegion || userRegion,
      detectedRegion: metadata?.detectedRegion || '',
      ipCountry: metadata?.ipCountry || '',
      source: metadata?.source || 'unknown',
      flow: metadata?.flow || 'direct',
      timestamp: new Date().toISOString(),
      usePromoPrice: usePromoPrice.toString(),
      promoPriceId: promoPriceId || '',
      regularPriceId: regularPriceId || '',
      hasScheduledChange: (usePromoPrice && regularPriceId ? 'true' : 'false')
    }
    
    // Crear sesión de Stripe Checkout
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: initialPriceId,
          quantity: 1,
        },
      ],
      metadata: sessionMetadata,
      success_url: `${process.env.NEXTAUTH_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXTAUTH_URL}/cancel`,
      billing_address_collection: 'required',
      allow_promotion_codes: true,
    })
    
    console.log('✅ Sesión de Stripe creada exitosamente:', {
      sessionId: session.id,
      url: session.url,
      plan,
      initialPriceId,
      usePromoPrice,
      hasScheduledChange: usePromoPrice && regularPriceId
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