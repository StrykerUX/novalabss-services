import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    const { onboardingData } = await request.json()

    if (!onboardingData) {
      return NextResponse.json(
        { error: 'Onboarding data is required' },
        { status: 400 }
      )
    }

    console.log(`💾 Saving optimized onboarding for user: ${session.user.email}`)

    // Buscar usuario
    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    })

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Buscar proyecto activo del usuario
    let project = await prisma.project.findFirst({
      where: { 
        userId: user.id,
        status: { in: ['EN_DESARROLLO', 'EN_REVISION'] }
      }
    })

    // Si no hay proyecto activo, crear uno nuevo
    if (!project) {
      const businessName = onboardingData.business?.name || 'Proyecto NovaLabs'
      const plan = onboardingData.website?.plan || 'rocket'
      
      project = await prisma.project.create({
        data: {
          name: `${businessName} - ${plan.charAt(0).toUpperCase() + plan.slice(1)}`,
          userId: user.id,
          status: 'EN_DESARROLLO',
          progress: Math.round((onboardingData.completedSteps?.length || 0) / 6 * 100),
          plan: plan.charAt(0).toUpperCase() + plan.slice(1),
          currentPhase: 'Onboarding completado'
        }
      })
      
      console.log(`📁 Created new project: ${project.id}`)
    }

    // Preparar datos organizados por categorías (para compatibilidad con el modelo actual)
    const organizeddData = {
      businessInfo: JSON.stringify({
        name: onboardingData.business?.name,
        industry: onboardingData.business?.industry,
        customIndustry: onboardingData.business?.customIndustry,
        size: onboardingData.business?.size,
        businessRegion: onboardingData.business?.location?.region,
        businessCountry: onboardingData.business?.location?.country
      }),
      
      objectives: JSON.stringify({
        primaryGoal: onboardingData.goals?.primaryGoal,
        targetAudience: onboardingData.goals?.targetAudience,
        specificGoals: {}
      }),
      
      contentArchitecture: JSON.stringify({
        pages: onboardingData.website?.pages || [],
        features: onboardingData.website?.features || [],
        priority: onboardingData.website?.priority,
        plan: onboardingData.website?.plan,
        existingContent: onboardingData.technical?.hasContent,
        needsCopywriting: onboardingData.technical?.needsCopywriting
      }),
      
      brandDesign: JSON.stringify({
        brandStyles: onboardingData.branding?.brandStyles,
        brandStyle: onboardingData.branding?.brandStyle,
        brandColors: onboardingData.branding?.brandColors,
        socialMedia: onboardingData.branding?.socialMedia,
        brandPersonality: onboardingData.branding?.brandPersonality,
        assets: {
          logo: onboardingData.branding?.logo,
          brandGuide: onboardingData.branding?.brandGuide,
          images: onboardingData.branding?.images
        },
        aiAnalysis: onboardingData.branding?.aiAnalysis
      }),
      
      technicalSetup: JSON.stringify({
        domain: onboardingData.technical?.domain,
        hasContent: onboardingData.technical?.hasContent,
        needsCopywriting: onboardingData.technical?.needsCopywriting
      }),
      
      projectPlanning: JSON.stringify({
        timeline: onboardingData.website?.plan === 'rocket' ? 3 : 5, // días estimados
        priority: 'high',
        deliverables: onboardingData.website?.features || []
      })
    }

    // Guardar o actualizar onboarding response
    const onboardingResponse = await prisma.onboardingResponse.upsert({
      where: { 
        userId: user.id 
      },
      update: {
        ...organizeddData,
        completedSteps: JSON.stringify(onboardingData.completedSteps || []),
        completionStatus: onboardingData.completedSteps?.length === 6 ? 'COMPLETED' : 'IN_PROGRESS',
        submittedAt: onboardingData.completedSteps?.length === 6 ? new Date() : null,
        projectId: project.id
      },
      create: {
        userId: user.id,
        projectId: project.id,
        ...organizeddData,
        completedSteps: JSON.stringify(onboardingData.completedSteps || []),
        completionStatus: onboardingData.completedSteps?.length === 6 ? 'COMPLETED' : 'IN_PROGRESS',
        submittedAt: onboardingData.completedSteps?.length === 6 ? new Date() : null
      }
    })

    // Actualizar progreso del proyecto
    const progressPercentage = Math.round((onboardingData.completedSteps?.length || 0) / 6 * 100)
    await prisma.project.update({
      where: { id: project.id },
      data: {
        progress: progressPercentage,
        currentPhase: progressPercentage === 100 
          ? 'Listo para inicio de desarrollo' 
          : `Onboarding ${progressPercentage}% completado`
      }
    })

    console.log(`✅ Optimized onboarding saved successfully`)
    console.log(`📊 Progress: ${progressPercentage}%`)
    console.log(`📋 Completed steps: ${onboardingData.completedSteps?.length || 0}/6`)

    return NextResponse.json({
      success: true,
      message: 'Onboarding saved successfully',
      data: {
        projectId: project.id,
        onboardingId: onboardingResponse.id,
        progress: progressPercentage,
        isCompleted: progressPercentage === 100,
        completedSteps: onboardingData.completedSteps?.length || 0
      }
    })

  } catch (error) {
    console.error('❌ Error saving optimized onboarding:', error)
    
    return NextResponse.json(
      { 
        error: 'Failed to save onboarding data',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}

// GET endpoint para recuperar datos del onboarding optimizado
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        onboardingResponse: true,
        projects: {
          where: {
            status: { in: ['EN_DESARROLLO', 'EN_REVISION'] }
          },
          orderBy: { createdAt: 'desc' },
          take: 1
        }
      }
    })

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Si no hay onboarding response, retornar estado inicial
    if (!user.onboardingResponse) {
      return NextResponse.json({
        success: true,
        data: null,
        message: 'No onboarding data found'
      })
    }

    // Convertir datos guardados de vuelta al formato optimizado
    const onboardingResponse = user.onboardingResponse
    const businessInfo = onboardingResponse.businessInfo ? JSON.parse(onboardingResponse.businessInfo) : {}
    const objectives = onboardingResponse.objectives ? JSON.parse(onboardingResponse.objectives) : {}
    const contentArchitecture = onboardingResponse.contentArchitecture ? JSON.parse(onboardingResponse.contentArchitecture) : {}
    const brandDesign = onboardingResponse.brandDesign ? JSON.parse(onboardingResponse.brandDesign) : {}
    const technicalSetup = onboardingResponse.technicalSetup ? JSON.parse(onboardingResponse.technicalSetup) : {}
    const completedSteps = onboardingResponse.completedSteps ? JSON.parse(onboardingResponse.completedSteps) : []

    const optimizedData = {
      step: completedSteps.length < 6 ? (completedSteps.length + 1) : 6,
      business: {
        name: businessInfo.name,
        industry: businessInfo.industry,
        customIndustry: businessInfo.customIndustry,
        size: businessInfo.size,
      },
      goals: {
        primaryGoal: objectives.primaryGoal,
        targetAudience: objectives.targetAudience
      },
      website: {
        plan: contentArchitecture.plan,
        pages: contentArchitecture.pages || [],
        features: contentArchitecture.features || [],
        priority: contentArchitecture.priority
      },
      branding: {
        brandStyle: brandDesign.brandStyle,
        brandColors: brandDesign.brandColors,
        socialMedia: brandDesign.socialMedia || {},
        logo: brandDesign.assets?.logo,
        brandGuide: brandDesign.assets?.brandGuide,
        images: brandDesign.assets?.images,
        aiAnalysis: brandDesign.aiAnalysis
      },
      technical: {
        domain: technicalSetup.domain || {},
        hasContent: technicalSetup.hasContent,
        needsCopywriting: technicalSetup.needsCopywriting
      },
      completedSteps,
      lastUpdated: onboardingResponse.updatedAt.toISOString(),
      estimatedTimeRemaining: Math.max(0, 10 - (completedSteps.length * 1.5))
    }

    return NextResponse.json({
      success: true,
      data: optimizedData,
      metadata: {
        projectId: user.projects[0]?.id,
        completionStatus: onboardingResponse.completionStatus,
        submittedAt: onboardingResponse.submittedAt
      }
    })

  } catch (error) {
    console.error('❌ Error retrieving optimized onboarding:', error)
    
    return NextResponse.json(
      { 
        error: 'Failed to retrieve onboarding data',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}