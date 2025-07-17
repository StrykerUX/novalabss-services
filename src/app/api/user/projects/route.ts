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

    // Buscar usuario en la base de datos
    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    })

    if (!user) {
      return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 })
    }

    // Obtener proyectos del usuario
    const projects = await prisma.project.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' }
    })

    // Formatear proyectos para respuesta
    const formattedProjects = projects.map(project => ({
      id: project.id,
      name: project.name,
      status: project.status,
      progress: project.progress,
      currentPhase: project.currentPhase,
      estimatedDelivery: project.estimatedDelivery,
      plan: project.plan,
      createdAt: project.createdAt.toISOString(),
      updatedAt: project.updatedAt.toISOString()
    }))

    return NextResponse.json({
      projects: formattedProjects,
      totalProjects: projects.length
    })

  } catch (error) {
    console.error('Error fetching user projects:', error)
    return NextResponse.json(
      { 
        error: 'Error al obtener proyectos',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}