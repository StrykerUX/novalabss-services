import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { PrismaClient } from '@prisma/client'
import Stripe from 'stripe'

const prisma = new PrismaClient()
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-04-30.basil',
})

export async function GET(request: NextRequest) {
  try {
    // Verificar autenticación admin
    const session = await getServerSession(authOptions)
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    // Estadísticas de usuarios
    const totalUsers = await prisma.user.count()
    const usersThisMonth = await prisma.user.count({
      where: {
        createdAt: {
          gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
        }
      }
    })

    // Estadísticas de proyectos
    const totalProjects = await prisma.project.count()
    const activeProjects = await prisma.project.count({
      where: {
        status: {
          in: ['EN_DESARROLLO', 'EN_REVISION', 'EN_ACTUALIZACION']
        }
      }
    })

    // Obtener suscripciones de Stripe
    const subscriptions = await stripe.subscriptions.list({
      status: 'active',
      limit: 100
    })

    const activeSubscriptions = subscriptions.data.length

    // Calcular ingresos mensuales
    let monthlyRevenue = 0
    for (const subscription of subscriptions.data) {
      const amount = subscription.items.data[0]?.price?.unit_amount || 0
      monthlyRevenue += amount / 100 // Convertir de centavos a pesos
    }

    // Contar suscripciones pendientes/problemáticas
    const problemSubscriptions = await stripe.subscriptions.list({
      status: 'incomplete',
      limit: 100
    })

    const pendingPayments = problemSubscriptions.data.length

    // Obtener usuarios recientes (últimos 5)
    const recentUsers = await prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
      take: 5,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        projects: {
          select: {
            id: true,
            name: true,
            status: true
          }
        }
      }
    })

    // Obtener proyectos recientes
    const recentProjects = await prisma.project.findMany({
      orderBy: { updatedAt: 'desc' },
      take: 5,
      include: {
        user: {
          select: {
            name: true,
            email: true
          }
        }
      }
    })

    // Crecimiento mensual de usuarios
    const lastMonth = new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1)
    const usersLastMonth = await prisma.user.count({
      where: {
        createdAt: {
          gte: lastMonth,
          lt: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
        }
      }
    })

    const userGrowthPercentage = usersLastMonth > 0 
      ? Math.round(((usersThisMonth - usersLastMonth) / usersLastMonth) * 100)
      : 0

    return NextResponse.json({
      stats: {
        totalUsers,
        activeProjects,
        monthlyRevenue: Math.round(monthlyRevenue),
        pendingPayments,
        activeSubscriptions,
        userGrowthPercentage
      },
      recentUsers: recentUsers.map(user => ({
        id: user.id,
        name: user.name || 'Sin nombre',
        email: user.email,
        role: user.role,
        joinDate: user.createdAt.toISOString().split('T')[0],
        projects: user.projects.length,
        status: user.projects.length > 0 ? 'Activo' : 'Pendiente'
      })),
      recentProjects: recentProjects.map(project => ({
        id: project.id,
        name: project.name,
        client: project.user.name || project.user.email,
        status: project.status,
        progress: project.progress,
        updatedAt: project.updatedAt.toISOString().split('T')[0]
      }))
    })

  } catch (error) {
    console.error('Error fetching admin stats:', error)
    return NextResponse.json(
      { 
        error: 'Error al obtener estadísticas',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}