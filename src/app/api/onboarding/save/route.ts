import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
  try {
    // Verificar autenticación
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const body = await request.json()
    const { 
      businessInfo, 
      objectives, 
      contentArchitecture, 
      brandDesign, 
      technicalSetup, 
      projectPlanning,
      completedSteps,
      isComplete = false
    } = body

    // Buscar usuario
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { projects: true }
    })

    if (!user) {
      return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 })
    }

    // Buscar el proyecto más reciente del usuario (debería ser el actual)
    const project = user.projects?.[0]
    if (!project) {
      return NextResponse.json({ error: 'No se encontró proyecto asociado' }, { status: 404 })
    }

    // Preparar datos para guardar (solo los que no son undefined/null)
    const dataToSave: any = {}
    
    if (businessInfo) dataToSave.businessInfo = JSON.stringify(businessInfo)
    if (objectives) dataToSave.objectives = JSON.stringify(objectives)
    if (contentArchitecture) dataToSave.contentArchitecture = JSON.stringify(contentArchitecture)
    if (brandDesign) dataToSave.brandDesign = JSON.stringify(brandDesign)
    if (technicalSetup) dataToSave.technicalSetup = JSON.stringify(technicalSetup)
    if (projectPlanning) dataToSave.projectPlanning = JSON.stringify(projectPlanning)
    if (completedSteps) dataToSave.completedSteps = JSON.stringify(completedSteps)

    // Determinar estado
    const completionStatus = isComplete ? 'COMPLETED' : 
                           Object.keys(dataToSave).length > 0 ? 'IN_PROGRESS' : 'PENDING'

    if (isComplete) {
      dataToSave.submittedAt = new Date()
    }
    
    dataToSave.completionStatus = completionStatus

    // Crear o actualizar respuesta de onboarding
    const onboardingResponse = await prisma.onboardingResponse.upsert({
      where: { 
        userId: user.id 
      },
      update: {
        ...dataToSave,
        updatedAt: new Date()
      },
      create: {
        userId: user.id,
        projectId: project.id,
        ...dataToSave
      }
    })

    console.log('✅ Onboarding response saved:', {
      userId: user.id,
      projectId: project.id,
      status: completionStatus,
      sections: Object.keys(dataToSave).filter(k => k !== 'completionStatus' && k !== 'submittedAt')
    })

    return NextResponse.json({
      success: true,
      onboardingId: onboardingResponse.id,
      status: completionStatus,
      message: isComplete ? 'Onboarding completado exitosamente' : 'Progreso guardado'
    })

  } catch (error) {
    console.error('Error saving onboarding response:', error)
    return NextResponse.json(
      { 
        error: 'Error al guardar respuestas de onboarding',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}

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
        onboardingResponse: true,
        projects: true
      }
    })

    if (!user) {
      return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 })
    }

    const onboarding = user.onboardingResponse

    if (!onboarding) {
      return NextResponse.json({
        exists: false,
        status: 'PENDING',
        data: null
      })
    }

    // Parsear datos JSON
    const responseData = {
      businessInfo: onboarding.businessInfo ? JSON.parse(onboarding.businessInfo) : null,
      objectives: onboarding.objectives ? JSON.parse(onboarding.objectives) : null,
      contentArchitecture: onboarding.contentArchitecture ? JSON.parse(onboarding.contentArchitecture) : null,
      brandDesign: onboarding.brandDesign ? JSON.parse(onboarding.brandDesign) : null,
      technicalSetup: onboarding.technicalSetup ? JSON.parse(onboarding.technicalSetup) : null,
      projectPlanning: onboarding.projectPlanning ? JSON.parse(onboarding.projectPlanning) : null,
      completedSteps: onboarding.completedSteps ? JSON.parse(onboarding.completedSteps) : []
    }

    return NextResponse.json({
      exists: true,
      status: onboarding.completionStatus,
      submittedAt: onboarding.submittedAt,
      data: responseData,
      updatedAt: onboarding.updatedAt
    })

  } catch (error) {
    console.error('Error fetching onboarding response:', error)
    return NextResponse.json(
      { 
        error: 'Error al obtener respuestas de onboarding',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}