import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  try {
    // Verificar autenticación de admin
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    // Verificar que es admin
    const admin = await prisma.user.findUnique({
      where: { email: session.user.email }
    })

    if (!admin || admin.role !== 'ADMIN') {
      return NextResponse.json({ error: 'No autorizado - Se requiere rol de administrador' }, { status: 403 })
    }

    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const search = searchParams.get('search') || ''
    const status = searchParams.get('status') || 'all'

    const skip = (page - 1) * limit

    // Construir filtros
    const whereClause: any = {
      role: 'USER' // Solo usuarios, no admins
    }

    if (search) {
      whereClause.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { company: { contains: search, mode: 'insensitive' } }
      ]
    }

    // Filtro por estado de suscripción
    if (status !== 'all') {
      whereClause.subscription = {
        status: status
      }
    }

    // Obtener usuarios con sus datos de facturación
    const users = await prisma.user.findMany({
      where: whereClause,
      include: {
        subscription: true,
        payments: {
          orderBy: { createdAt: 'desc' },
          take: 3 // Últimos 3 pagos
        },
        projects: {
          select: {
            id: true,
            name: true,
            status: true,
            plan: true
          }
        }
      },
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' }
    })

    // Contar total
    const total = await prisma.user.count({
      where: whereClause
    })

    // Estadísticas generales
    const stats = await prisma.subscription.groupBy({
      by: ['status'],
      _count: true
    })

    const statsFormatted = {
      total: total,
      active: stats.find(s => s.status === 'ACTIVE')?._count || 0,
      past_due: stats.find(s => s.status === 'PAST_DUE')?._count || 0,
      unpaid: stats.find(s => s.status === 'UNPAID')?._count || 0,
      canceled: stats.find(s => s.status === 'CANCELED')?._count || 0,
      incomplete: stats.find(s => s.status === 'INCOMPLETE')?._count || 0,
      trialing: stats.find(s => s.status === 'TRIALING')?._count || 0
    }

    // Calcular ingresos mensuales
    const now = new Date()
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
    const monthlyRevenue = await prisma.payment.aggregate({
      where: {
        status: 'SUCCEEDED',
        paidAt: {
          gte: firstDayOfMonth
        }
      },
      _sum: {
        amount: true
      }
    })

    // Formatear datos de usuarios
    const usersFormatted = users.map(user => ({
      id: user.id,
      name: user.name,
      email: user.email,
      company: user.company,
      phone: user.phone,
      createdAt: user.createdAt,
      projectsCount: user.projects.length,
      projects: user.projects,
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
          null
      } : null,
      recentPayments: user.payments.map(payment => ({
        id: payment.id,
        amount: payment.amount,
        currency: payment.currency,
        status: payment.status,
        description: payment.description,
        paidAt: payment.paidAt,
        failureReason: payment.failureReason
      }))
    }))

    return NextResponse.json({
      users: usersFormatted,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasNext: page * limit < total,
        hasPrev: page > 1
      },
      stats: statsFormatted,
      revenue: {
        monthly: monthlyRevenue._sum.amount || 0,
        currency: 'USD'
      }
    })

  } catch (error) {
    console.error('Error fetching billing data:', error)
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