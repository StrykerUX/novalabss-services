import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { plan, metadata } = await request.json()
    
    // Por ahora, simulamos la creación de sesión de Stripe
    // En producción, aquí iría la lógica real de Stripe
    
    const planPrices = {
      rocket: { price: 999, name: 'Plan Rocket' },
      galaxy: { price: 1799, name: 'Plan Galaxy' }
    }
    
    const selectedPlan = planPrices[plan as keyof typeof planPrices]
    
    if (!selectedPlan) {
      return NextResponse.json({ error: 'Plan inválido' }, { status: 400 })
    }
    
    // Simular creación de sesión
    const sessionId = `cs_test_${Date.now()}`
    
    console.log('Creando sesión de checkout:', {
      plan,
      price: selectedPlan.price,
      metadata
    })
    
    // Por ahora, redirigimos a una página de placeholder
    // En producción, esto sería la URL real de Stripe Checkout
    const checkoutUrl = `${process.env.NEXTAUTH_URL}/checkout/${plan}?session_id=${sessionId}&source=${metadata.source}`
    
    return NextResponse.json({ 
      url: checkoutUrl,
      sessionId 
    })
    
  } catch (error) {
    console.error('Error creating checkout session:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}