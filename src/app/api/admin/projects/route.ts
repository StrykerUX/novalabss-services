import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { PrismaClient, ProjectStatus } from '@prisma/client'

const prisma = new PrismaClient()

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
    const userId = searchParams.get('userId') || ''

    const skip = (page - 1) * limit

    // Construir filtros
    const where: any = {}
    
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { user: { 
          OR: [
            { name: { contains: search, mode: 'insensitive' } },
            { email: { contains: search, mode: 'insensitive' } }
          ]
        }}
      ]
    }

    if (status !== 'all') {
      where.status = status as ProjectStatus
    }

    if (userId) {
      where.userId = userId
    }

    // Obtener proyectos con paginación
    const [projects, totalProjects] = await Promise.all([
      prisma.project.findMany({
        where,
        skip,
        take: limit,
        orderBy: { updatedAt: 'desc' },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              role: true,
              createdAt: true
            }
          }
        }
      }),
      prisma.project.count({ where })
    ])

    // Estadísticas de la página actual
    const pageStats = {
      total: totalProjects,
      en_desarrollo: projects.filter(p => p.status === 'EN_DESARROLLO').length,
      en_revision: projects.filter(p => p.status === 'EN_REVISION').length,
      completado: projects.filter(p => p.status === 'COMPLETADO').length,
      en_actualizacion: projects.filter(p => p.status === 'EN_ACTUALIZACION').length,
      en_mantenimiento: projects.filter(p => p.status === 'EN_MANTENIMIENTO').length,
      currentPage: page,
      totalPages: Math.ceil(totalProjects / limit),
      hasNext: page < Math.ceil(totalProjects / limit),
      hasPrev: page > 1
    }

    // Formatear proyectos para respuesta
    const formattedProjects = projects.map(project => ({
      id: project.id,
      name: project.name,
      status: project.status,
      progress: project.progress,
      currentPhase: project.currentPhase,
      estimatedDelivery: project.estimatedDelivery,
      plan: project.plan,
      user: {
        id: project.user.id,
        name: project.user.name || 'Sin nombre',
        email: project.user.email,
        role: project.user.role
      },
      dates: {
        created: project.createdAt.toISOString().split('T')[0],
        updated: project.updatedAt.toISOString().split('T')[0]
      },
      createdAt: project.createdAt,
      updatedAt: project.updatedAt
    }))

    return NextResponse.json({
      projects: formattedProjects,
      stats: pageStats
    })

  } catch (error) {
    console.error('Error fetching admin projects:', error)
    return NextResponse.json(
      { 
        error: 'Error al obtener proyectos',
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

    const { name, userId, plan = 'Rocket', status = 'EN_DESARROLLO' } = await request.json()

    if (!name || !userId) {
      return NextResponse.json(
        { error: 'Nombre del proyecto y ID de usuario son requeridos' },
        { status: 400 }
      )
    }

    // Verificar que el usuario existe
    const user = await prisma.user.findUnique({
      where: { id: userId }
    })

    if (!user) {
      return NextResponse.json(
        { error: 'Usuario no encontrado' },
        { status: 404 }
      )
    }

    // Crear proyecto
    const newProject = await prisma.project.create({
      data: {
        name,
        userId,
        plan,
        status: status as ProjectStatus,
        progress: 0,
        currentPhase: 'Configuración inicial'
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true
          }
        }
      }
    })

    return NextResponse.json({
      message: 'Proyecto creado exitosamente',
      project: {
        id: newProject.id,
        name: newProject.name,
        status: newProject.status,
        progress: newProject.progress,
        plan: newProject.plan,
        user: newProject.user,
        createdAt: newProject.createdAt
      }
    })

  } catch (error) {
    console.error('Error creating project:', error)
    return NextResponse.json(
      { 
        error: 'Error al crear proyecto',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    // Verificar autenticación admin
    const session = await getServerSession(authOptions)
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const { id, name, status, progress, currentPhase, estimatedDelivery, plan } = await request.json()

    if (!id) {
      return NextResponse.json(
        { error: 'ID del proyecto es requerido' },
        { status: 400 }
      )
    }

    // Verificar que el proyecto existe
    const existingProject = await prisma.project.findUnique({
      where: { id }
    })

    if (!existingProject) {
      return NextResponse.json(
        { error: 'Proyecto no encontrado' },
        { status: 404 }
      )
    }

    // Actualizar proyecto
    const updatedProject = await prisma.project.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(status && { status: status as ProjectStatus }),
        ...(progress !== undefined && { progress }),
        ...(currentPhase && { currentPhase }),
        ...(estimatedDelivery && { estimatedDelivery }),
        ...(plan && { plan })
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true
          }
        }
      }
    })

    return NextResponse.json({
      message: 'Proyecto actualizado exitosamente',
      project: updatedProject
    })

  } catch (error) {
    console.error('Error updating project:', error)
    return NextResponse.json(
      { 
        error: 'Error al actualizar proyecto',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    // Verificar autenticación admin
    const session = await getServerSession(authOptions)
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const { id } = await request.json()

    if (!id) {
      return NextResponse.json(
        { error: 'ID del proyecto es requerido' },
        { status: 400 }
      )
    }

    // Verificar que el proyecto existe
    const existingProject = await prisma.project.findUnique({
      where: { id }
    })

    if (!existingProject) {
      return NextResponse.json(
        { error: 'Proyecto no encontrado' },
        { status: 404 }
      )
    }

    // Eliminar proyecto
    await prisma.project.delete({
      where: { id }
    })

    return NextResponse.json({
      message: 'Proyecto eliminado exitosamente'
    })

  } catch (error) {
    console.error('Error deleting project:', error)
    return NextResponse.json(
      { 
        error: 'Error al eliminar proyecto',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}