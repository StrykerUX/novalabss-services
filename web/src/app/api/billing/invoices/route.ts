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

    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '10')
    const starting_after = searchParams.get('starting_after') || undefined

    // Buscar customer en Stripe por email
    const customers = await stripe.customers.list({
      email: session.user.email,
      limit: 1
    })

    if (customers.data.length === 0) {
      return NextResponse.json({
        invoices: [],
        has_more: false,
        message: 'No se encontró información de facturación'
      })
    }

    const customer = customers.data[0]

    // Obtener facturas del cliente
    const invoices = await stripe.invoices.list({
      customer: customer.id,
      limit: Math.min(limit, 100), // Máximo 100 por Stripe
      starting_after,
      expand: ['data.subscription', 'data.payment_intent']
    })

    // Formatear datos de facturas
    const formattedInvoices = invoices.data.map(invoice => ({
      id: invoice.id,
      number: invoice.number,
      status: invoice.status,
      amount_paid: invoice.amount_paid,
      amount_due: invoice.amount_due,
      currency: invoice.currency,
      created: invoice.created,
      period_start: invoice.period_start,
      period_end: invoice.period_end,
      hosted_invoice_url: invoice.hosted_invoice_url,
      invoice_pdf: invoice.invoice_pdf,
      paid: invoice.paid,
      attempt_count: invoice.attempt_count,
      billing_reason: invoice.billing_reason,
      description: invoice.description,
      subscription_id: invoice.subscription,
      lines: invoice.lines.data.map(line => ({
        id: line.id,
        amount: line.amount,
        currency: line.currency,
        description: line.description,
        period: {
          start: line.period.start,
          end: line.period.end
        },
        price: line.price ? {
          id: line.price.id,
          unit_amount: line.price.unit_amount,
          currency: line.price.currency,
          recurring: line.price.recurring
        } : null
      }))
    }))

    return NextResponse.json({
      invoices: formattedInvoices,
      has_more: invoices.has_more,
      total_count: invoices.data.length
    })

  } catch (error) {
    console.error('Error fetching invoices:', error)
    return NextResponse.json(
      { 
        error: 'Error al obtener historial de facturas',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}