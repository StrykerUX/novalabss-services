import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ projectId: string }> }
) {
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

    const { projectId } = await params

    // Buscar el proyecto con datos del usuario y onboarding
    const project = await prisma.project.findUnique({
      where: { id: projectId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            company: true,
            createdAt: true
          }
        },
        onboardingResponse: true
      }
    })

    if (!project) {
      return NextResponse.json({ error: 'Proyecto no encontrado' }, { status: 404 })
    }

    // Si no hay respuesta de onboarding
    if (!project.onboardingResponse) {
      return NextResponse.json({
        project: {
          id: project.id,
          name: project.name,
          status: project.status,
          progress: project.progress,
          plan: project.plan,
          user: project.user
        },
        onboarding: {
          exists: false,
          status: 'PENDING',
          data: null
        }
      })
    }

    const onboarding = project.onboardingResponse

    // Parsear datos JSON de forma segura
    const parseJsonSafely = (jsonString: string | null) => {
      if (!jsonString) return null
      try {
        return JSON.parse(jsonString)
      } catch {
        return null
      }
    }

    const onboardingData = {
      businessInfo: parseJsonSafely(onboarding.businessInfo),
      objectives: parseJsonSafely(onboarding.objectives),
      contentArchitecture: parseJsonSafely(onboarding.contentArchitecture),
      brandDesign: parseJsonSafely(onboarding.brandDesign),
      technicalSetup: parseJsonSafely(onboarding.technicalSetup),
      projectPlanning: parseJsonSafely(onboarding.projectPlanning),
      completedSteps: parseJsonSafely(onboarding.completedSteps) || []
    }

    // Enriquecer con datos específicos del sistema optimizado
    const enrichedData = {
      ...onboardingData,
      // Campos específicos del sistema optimizado para mostrar datos completos
      optimizedFields: {
        // Step 1: Business (datos completos)
        businessDetails: {
          name: onboardingData.businessInfo?.name,
          industry: onboardingData.businessInfo?.industry,
          customIndustry: onboardingData.businessInfo?.customIndustry,
          size: onboardingData.businessInfo?.size,
          region: onboardingData.businessInfo?.businessRegion,
          country: onboardingData.businessInfo?.businessCountry
        },
        
        // Step 2: Goals (respuestas detalladas completas)
        goalDetails: {
          primaryGoal: onboardingData.objectives?.primaryGoal,
          targetAudience: {
            ageRanges: onboardingData.objectives?.targetAudience?.ageRanges || [],
            location: onboardingData.objectives?.targetAudience?.location,
            description: onboardingData.objectives?.targetAudience?.description || null // Descripción completa
          }
        },
        
        // Step 3: Website (configuración detallada por plan)
        websiteDetails: {
          plan: onboardingData.contentArchitecture?.plan,
          pages: onboardingData.contentArchitecture?.pages || [],
          features: onboardingData.contentArchitecture?.features || [],
          priority: onboardingData.contentArchitecture?.priority,
          hasContent: onboardingData.contentArchitecture?.existingContent,
          needsCopywriting: onboardingData.contentArchitecture?.needsCopywriting
        },
        
        // Step 4: Branding (datos completos sin resumir)
        brandingDetails: {
          brandStyles: onboardingData.brandDesign?.brandStyles || onboardingData.brandDesign?.brandStyle || [],
          brandColors: onboardingData.brandDesign?.brandColors || [],
          socialMedia: {
            currentWebsite: onboardingData.brandDesign?.socialMedia?.currentWebsite,
            facebook: onboardingData.brandDesign?.socialMedia?.facebook,
            additional: onboardingData.brandDesign?.socialMedia?.additional || {}
          },
          brandPersonality: {
            feeling: onboardingData.brandDesign?.brandPersonality?.feeling || null, // Respuesta completa
            word: onboardingData.brandDesign?.brandPersonality?.word || null
          },
          assets: onboardingData.brandDesign?.assets || {},
          aiAnalysis: onboardingData.brandDesign?.aiAnalysis || null
        },
        
        // Step 5: Technical (configuración detallada)
        technicalDetails: {
          domain: {
            hasDomain: onboardingData.technicalSetup?.domain?.hasDomain,
            domainName: onboardingData.technicalSetup?.domain?.domainName,
            needsHelp: onboardingData.technicalSetup?.domain?.needsHelp
          },
          hasContent: onboardingData.technicalSetup?.hasContent,
          needsCopywriting: onboardingData.technicalSetup?.needsCopywriting
        }
      }
    }

    // Estadísticas de completitud
    const totalSections = 6
    const completedSections = Object.values(onboardingData).filter(section => section !== null && section !== undefined).length - 1 // -1 para completedSteps
    const completionPercentage = Math.round((completedSections / totalSections) * 100)

    return NextResponse.json({
      project: {
        id: project.id,
        name: project.name,
        status: project.status,
        progress: project.progress,
        currentPhase: project.currentPhase,
        estimatedDelivery: project.estimatedDelivery,
        plan: project.plan,
        createdAt: project.createdAt,
        updatedAt: project.updatedAt,
        user: project.user
      },
      onboarding: {
        exists: true,
        status: onboarding.completionStatus,
        submittedAt: onboarding.submittedAt,
        createdAt: onboarding.createdAt,
        updatedAt: onboarding.updatedAt,
        completionPercentage,
        sectionsCompleted: completedSections,
        totalSections,
        data: enrichedData
      }
    })

  } catch (error) {
    console.error('Error fetching project onboarding:', error)
    return NextResponse.json(
      { 
        error: 'Error al obtener datos del proyecto',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}