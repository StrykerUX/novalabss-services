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

    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const search = searchParams.get('search') || ''
    const status = searchParams.get('status') || 'all'
    const role = searchParams.get('role') || 'all'

    const skip = (page - 1) * limit

    // Construir filtros
    const where: any = {}
    
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } }
      ]
    }

    if (role !== 'all') {
      where.role = role
    }

    // Obtener usuarios con paginación
    const [users, totalUsers] = await Promise.all([
      prisma.user.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          projects: {
            select: {
              id: true,
              name: true,
              status: true,
              plan: true
            }
          },
          sessions: {
            orderBy: { expires: 'desc' },
            take: 1,
            select: {
              expires: true
            }
          }
        }
      }),
      prisma.user.count({ where })
    ])

    // Enriquecer datos con información de Stripe
    const enrichedUsers = await Promise.all(users.map(async (user) => {
      let subscriptionData = null
      let plan = 'Sin plan'
      let subscriptionStatus = 'no_subscription'

      try {
        // Buscar customer en Stripe
        const customers = await stripe.customers.list({
          email: user.email,
          limit: 1
        })

        if (customers.data.length > 0) {
          const customer = customers.data[0]
          
          // Buscar suscripciones
          const subscriptions = await stripe.subscriptions.list({
            customer: customer.id,
            limit: 1
          })

          if (subscriptions.data.length > 0) {
            const subscription = subscriptions.data[0]
            subscriptionStatus = subscription.status
            
            // Obtener información del producto
            const product = await stripe.products.retrieve(
              subscription.items.data[0].price.product as string
            )
            
            plan = product.name || 'Plan desconocido'
            subscriptionData = {
              id: subscription.id,
              status: subscription.status,
              current_period_end: subscription.current_period_end,
              plan: product.name
            }
          }
        }
      } catch (error) {
        console.error(`Error fetching Stripe data for user ${user.email}:`, error)
      }

      // Determinar estado del usuario
      let userStatus = 'Pendiente'
      if (subscriptionStatus === 'active') {
        userStatus = 'Activo'
      } else if (subscriptionStatus === 'canceled' || subscriptionStatus === 'incomplete') {
        userStatus = 'Suspendido'
      } else if (user.projects.length > 0) {
        userStatus = 'Activo'
      }

      return {
        id: user.id,
        name: user.name || 'Sin nombre',
        email: user.email,
        role: user.role,
        plan,
        status: userStatus,
        subscriptionStatus,
        joinDate: user.createdAt.toISOString().split('T')[0],
        lastLogin: user.sessions[0]?.expires 
          ? new Date(user.sessions[0].expires).toISOString().split('T')[0]
          : 'Nunca',
        projects: user.projects.length,
        projectsList: user.projects,
        subscription: subscriptionData,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      }
    }))

    // Estadísticas de la página actual
    const pageStats = {
      total: totalUsers,
      active: enrichedUsers.filter(u => u.status === 'Activo').length,
      pending: enrichedUsers.filter(u => u.status === 'Pendiente').length,
      suspended: enrichedUsers.filter(u => u.status === 'Suspendido').length,
      currentPage: page,
      totalPages: Math.ceil(totalUsers / limit),
      hasNext: page < Math.ceil(totalUsers / limit),
      hasPrev: page > 1
    }

    return NextResponse.json({
      users: enrichedUsers,
      stats: pageStats
    })

  } catch (error) {
    console.error('Error fetching admin users:', error)
    return NextResponse.json(
      { 
        error: 'Error al obtener usuarios',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    // Verificar autenticación admin
    const session = await getServerSession(authOptions)
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const { name, email, role = 'USER' } = await request.json()

    if (!name || !email) {
      return NextResponse.json(
        { error: 'Nombre y email son requeridos' },
        { status: 400 }
      )
    }

    // Verificar si el usuario ya existe
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'Ya existe un usuario con ese email' },
        { status: 400 }
      )
    }

    // Crear usuario
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        role
      }
    })

    return NextResponse.json({
      message: 'Usuario creado exitosamente',
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        createdAt: newUser.createdAt
      }
    })

  } catch (error) {
    console.error('Error creating user:', error)
    return NextResponse.json(
      { 
        error: 'Error al crear usuario',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}