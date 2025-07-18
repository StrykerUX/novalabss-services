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
    const { searchParams } = new URL(request.url)
    const format = searchParams.get('format') || 'json' // json, csv, txt

    // Buscar el proyecto con datos completos
    const project = await prisma.project.findUnique({
      where: { id: projectId },
      include: {
        user: true,
        onboardingResponse: true
      }
    })

    if (!project) {
      return NextResponse.json({ error: 'Proyecto no encontrado' }, { status: 404 })
    }

    if (!project.onboardingResponse) {
      return NextResponse.json({ error: 'No hay respuestas de onboarding para este proyecto' }, { status: 404 })
    }

    const onboarding = project.onboardingResponse

    // Parsear datos JSON
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

    // Estructura completa para exportar
    const exportData = {
      proyecto: {
        nombre: project.name,
        plan: project.plan,
        estado: project.status,
        progreso: project.progress,
        faseActual: project.currentPhase,
        fechaCreacion: project.createdAt,
        fechaActualizacion: project.updatedAt
      },
      cliente: {
        nombre: project.user.name,
        email: project.user.email,
        telefono: project.user.phone,
        empresa: project.user.company,
        fechaRegistro: project.user.createdAt
      },
      onboarding: {
        estado: onboarding.completionStatus,
        fechaEnvio: onboarding.submittedAt,
        fechaCreacion: onboarding.createdAt,
        fechaActualizacion: onboarding.updatedAt
      },
      respuestas: onboardingData
    }

    // Generar respuesta según formato
    if (format === 'csv') {
      const csv = generateCSV(exportData)
      const filename = `onboarding-${project.name.replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.csv`
      
      return new NextResponse(csv, {
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': `attachment; filename="${filename}"`
        }
      })
    }

    if (format === 'txt') {
      const txt = generateTXT(exportData)
      const filename = `onboarding-${project.name.replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.txt`
      
      return new NextResponse(txt, {
        headers: {
          'Content-Type': 'text/plain',
          'Content-Disposition': `attachment; filename="${filename}"`
        }
      })
    }

    // Por defecto: JSON
    const filename = `onboarding-${project.name.replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.json`
    
    return new NextResponse(JSON.stringify(exportData, null, 2), {
      headers: {
        'Content-Type': 'application/json',
        'Content-Disposition': `attachment; filename="${filename}"`
      }
    })

  } catch (error) {
    console.error('Error exporting onboarding data:', error)
    return NextResponse.json(
      { 
        error: 'Error al exportar datos de onboarding',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}

function generateCSV(data: any): string {
  const lines = []
  
  // Header
  lines.push('Categoría,Campo,Valor')
  
  // Proyecto
  lines.push(`Proyecto,Nombre,"${data.proyecto.nombre}"`)
  lines.push(`Proyecto,Plan,"${data.proyecto.plan}"`)
  lines.push(`Proyecto,Estado,"${data.proyecto.estado}"`)
  lines.push(`Proyecto,Progreso,"${data.proyecto.progreso}%"`)
  
  // Cliente
  lines.push(`Cliente,Nombre,"${data.cliente.nombre}"`)
  lines.push(`Cliente,Email,"${data.cliente.email}"`)
  lines.push(`Cliente,Teléfono,"${data.cliente.telefono || 'N/A'}"`)
  lines.push(`Cliente,Empresa,"${data.cliente.empresa || 'N/A'}"`)
  
  // Respuestas de onboarding
  if (data.respuestas.businessInfo) {
    const bi = data.respuestas.businessInfo
    lines.push(`Negocio,Nombre,"${bi.name || 'N/A'}"`)
    lines.push(`Negocio,Industria,"${bi.industry || 'N/A'}"`)
    lines.push(`Negocio,Ubicación,"${bi.location || 'N/A'}"`)
    lines.push(`Negocio,Años operando,"${bi.yearsOperating || 'N/A'}"`)
  }
  
  if (data.respuestas.objectives) {
    const obj = data.respuestas.objectives
    lines.push(`Objetivos,Meta principal,"${obj.primaryGoal || 'N/A'}"`)
    lines.push(`Objetivos,Competidores,"${obj.competitors?.join(', ') || 'N/A'}"`)
  }
  
  if (data.respuestas.brandDesign) {
    const bd = data.respuestas.brandDesign
    lines.push(`Diseño,Colores,"${bd.colors?.join(', ') || 'N/A'}"`)
    lines.push(`Diseño,Estilo,"${bd.style || 'N/A'}"`)
    lines.push(`Diseño,Referencias,"${bd.references?.join(', ') || 'N/A'}"`)
  }
  
  return lines.join('\n')
}

function generateTXT(data: any): string {
  const lines = []
  
  lines.push('='.repeat(60))
  lines.push(`RESPUESTAS DE ONBOARDING - ${data.proyecto.nombre.toUpperCase()}`)
  lines.push('='.repeat(60))
  lines.push('')
  
  lines.push('📊 INFORMACIÓN DEL PROYECTO')
  lines.push('-'.repeat(30))
  lines.push(`Nombre: ${data.proyecto.nombre}`)
  lines.push(`Plan: ${data.proyecto.plan}`)
  lines.push(`Estado: ${data.proyecto.estado}`)
  lines.push(`Progreso: ${data.proyecto.progreso}%`)
  lines.push(`Fase actual: ${data.proyecto.faseActual || 'N/A'}`)
  lines.push('')
  
  lines.push('👤 INFORMACIÓN DEL CLIENTE')
  lines.push('-'.repeat(30))
  lines.push(`Nombre: ${data.cliente.nombre}`)
  lines.push(`Email: ${data.cliente.email}`)
  lines.push(`Teléfono: ${data.cliente.telefono || 'N/A'}`)
  lines.push(`Empresa: ${data.cliente.empresa || 'N/A'}`)
  lines.push('')
  
  if (data.respuestas.businessInfo) {
    const bi = data.respuestas.businessInfo
    lines.push('🏢 INFORMACIÓN DEL NEGOCIO')
    lines.push('-'.repeat(30))
    lines.push(`Nombre del negocio: ${bi.name || 'N/A'}`)
    lines.push(`Industria: ${bi.industry || 'N/A'}`)
    lines.push(`Ubicación: ${bi.location || 'N/A'}`)
    lines.push(`Años operando: ${bi.yearsOperating || 'N/A'}`)
    lines.push(`Tamaño: ${bi.size || 'N/A'}`)
    lines.push('')
  }
  
  if (data.respuestas.objectives) {
    const obj = data.respuestas.objectives
    lines.push('🎯 OBJETIVOS Y AUDIENCIA')
    lines.push('-'.repeat(30))
    lines.push(`Meta principal: ${obj.primaryGoal || 'N/A'}`)
    if (obj.targetAudience) {
      lines.push(`Audiencia objetivo:`)
      lines.push(`  - Rango de edad: ${obj.targetAudience.ageRange || 'N/A'}`)
      lines.push(`  - Ubicación: ${obj.targetAudience.location || 'N/A'}`)
      lines.push(`  - Intereses: ${obj.targetAudience.interests?.join(', ') || 'N/A'}`)
    }
    lines.push(`Competidores: ${obj.competitors?.join(', ') || 'N/A'}`)
    lines.push('')
  }
  
  if (data.respuestas.contentArchitecture) {
    const ca = data.respuestas.contentArchitecture
    lines.push('📄 ARQUITECTURA DE CONTENIDO')
    lines.push('-'.repeat(30))
    lines.push(`Páginas necesarias: ${ca.pages?.join(', ') || 'N/A'}`)
    lines.push(`Funcionalidades: ${ca.features?.join(', ') || 'N/A'}`)
    lines.push(`Contenido existente: ${ca.existingContent ? 'Sí' : 'No'}`)
    lines.push(`Necesita copywriting: ${ca.needsCopywriting ? 'Sí' : 'No'}`)
    lines.push('')
  }
  
  if (data.respuestas.brandDesign) {
    const bd = data.respuestas.brandDesign
    lines.push('🎨 DISEÑO Y MARCA')
    lines.push('-'.repeat(30))
    lines.push(`Colores preferidos: ${bd.colors?.join(', ') || 'N/A'}`)
    lines.push(`Estilo: ${bd.style || 'N/A'}`)
    lines.push(`Referencias: ${bd.references?.join(', ') || 'N/A'}`)
    lines.push(`Estado del logo: ${bd.logoStatus || 'N/A'}`)
    lines.push('')
  }
  
  if (data.respuestas.technicalSetup) {
    const ts = data.respuestas.technicalSetup
    lines.push('⚙️ CONFIGURACIÓN TÉCNICA')
    lines.push('-'.repeat(30))
    if (ts.domain) {
      lines.push(`Dominio existente: ${ts.domain.existing ? 'Sí' : 'No'}`)
      lines.push(`Nombre del dominio: ${ts.domain.name || 'N/A'}`)
      lines.push(`Necesita registro: ${ts.domain.needsRegistration ? 'Sí' : 'No'}`)
    }
    lines.push(`Integraciones: ${ts.integrations?.join(', ') || 'N/A'}`)
    lines.push(`SSL requerido: ${ts.ssl ? 'Sí' : 'No'}`)
    lines.push(`Email corporativo: ${ts.corporateEmail ? 'Sí' : 'No'}`)
    lines.push('')
  }
  
  lines.push('='.repeat(60))
  lines.push(`Generado el: ${new Date().toLocaleString('es-ES')}`)
  lines.push('='.repeat(60))
  
  return lines.join('\n')
}