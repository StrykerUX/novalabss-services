import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  try {
    // Verificar autenticación
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    // Buscar usuario
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        subscription: true,
        payments: {
          orderBy: { createdAt: 'desc' },
          take: 10 // Últimos 10 pagos
        },
        projects: {
          select: {
            id: true,
            name: true,
            status: true,
            plan: true,
            progress: true
          }
        }
      }
    })

    if (!user) {
      return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 })
    }

    // Formatear respuesta
    const response = {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        company: user.company,
        phone: user.phone
      },
      subscription: user.subscription ? {
        id: user.subscription.id,
        plan: user.subscription.plan,
        status: user.subscription.status,
        amount: user.subscription.amount,
        currency: user.subscription.currency,
        interval: user.subscription.interval,
        startDate: user.subscription.startDate,
        currentPeriodStart: user.subscription.currentPeriodStart,
        currentPeriodEnd: user.subscription.currentPeriodEnd,
        lastPaymentDate: user.subscription.lastPaymentDate,
        lastPaymentAmount: user.subscription.lastPaymentAmount,
        nextPaymentDate: user.subscription.nextPaymentDate,
        paymentFailureCount: user.subscription.paymentFailureCount,
        // Calcular días hasta próximo pago
        daysUntilNextPayment: user.subscription.nextPaymentDate ? 
          Math.ceil((new Date(user.subscription.nextPaymentDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)) : 
          null,
        // Información adicional
        isActive: user.subscription.status === 'ACTIVE',
        isPastDue: user.subscription.status === 'PAST_DUE',
        isCanceled: user.subscription.status === 'CANCELED'
      } : null,
      payments: user.payments.map(payment => ({
        id: payment.id,
        amount: payment.amount,
        currency: payment.currency,
        status: payment.status,
        description: payment.description,
        attemptedAt: payment.attemptedAt,
        paidAt: payment.paidAt,
        failedAt: payment.failedAt,
        failureReason: payment.failureReason,
        receiptUrl: payment.receiptUrl,
        invoiceUrl: payment.invoiceUrl
      })),
      projects: user.projects,
      summary: {
        totalProjects: user.projects.length,
        activeProjects: user.projects.filter(p => p.status !== 'COMPLETADO').length,
        completedProjects: user.projects.filter(p => p.status === 'COMPLETADO').length,
        totalPaid: user.payments
          .filter(p => p.status === 'SUCCEEDED')
          .reduce((sum, p) => sum + p.amount, 0),
        failedPayments: user.payments.filter(p => p.status === 'FAILED').length
      }
    }

    return NextResponse.json(response)

  } catch (error) {
    console.error('Error fetching user billing data:', error)
    return NextResponse.json(
      { 
        error: 'Error al obtener datos de facturación',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}