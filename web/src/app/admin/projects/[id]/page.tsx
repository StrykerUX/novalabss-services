"use client"

import AdminLayout from "@/components/AdminLayout"
import SmoothMagneticButton from "@/components/SmoothMagneticButton"
import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { BRAND_STYLES, ROCKET_SECTIONS, GALAXY_PAGES, ROCKET_FEATURES, AVAILABLE_FEATURES } from "@/lib/onboarding-config"

interface ProjectData {
  project: {
    id: string
    name: string
    status: string
    progress: number
    currentPhase: string | null
    estimatedDelivery: string | null
    plan: string
    createdAt: string
    updatedAt: string
    user: {
      id: string
      name: string
      email: string
      phone: string | null
      company: string | null
      createdAt: string
    }
  }
  onboarding: {
    exists: boolean
    status: string
    submittedAt: string | null
    createdAt: string
    updatedAt: string
    completionPercentage: number
    sectionsCompleted: number
    totalSections: number
    data: {
      businessInfo: any
      objectives: any
      contentArchitecture: any
      brandDesign: any
      technicalSetup: any
      projectPlanning: any
      completedSteps: number[]
    } | null
  }
}

// Utility functions
const getStatusColor = (status: string) => {
  switch (status) {
    case 'EN_DESARROLLO':
      return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
    case 'EN_REVISION':
      return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
    case 'COMPLETADO':
      return 'bg-green-500/20 text-green-400 border-green-500/30'
    case 'EN_MANTENIMIENTO':
      return 'bg-red-500/20 text-red-400 border-red-500/30'
    default:
      return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
  }
}

const getOnboardingStatusColor = (status: string) => {
  switch (status) {
    case 'COMPLETED':
      return 'bg-green-500/20 text-green-400 border-green-500/30'
    case 'IN_PROGRESS':
      return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
    case 'PENDING':
      return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    default:
      return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
  }
}

export default function ProjectDetailPage() {
  const { id } = useParams()
  const [projectData, setProjectData] = useState<ProjectData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<'overview' | 'onboarding'>('overview')

  useEffect(() => {
    if (id) {
      fetchProjectData()
    }
  }, [id])

  const fetchProjectData = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/admin/onboarding/${id}`)
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`)
      }

      const data = await response.json()
      setProjectData(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido')
    } finally {
      setLoading(false)
    }
  }

  const handleExport = async (format: 'json' | 'csv' | 'txt') => {
    try {
      const response = await fetch(`/api/admin/onboarding/export/${id}?format=${format}`)
      
      if (!response.ok) {
        throw new Error('Error al exportar datos')
      }

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = response.headers.get('content-disposition')?.split('filename=')[1]?.replace(/"/g, '') || `onboarding-export.${format}`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (err) {
      alert('Error al exportar: ' + (err instanceof Error ? err.message : 'Error desconocido'))
    }
  }

  if (loading) {
    return (
      <AdminLayout 
        title="Detalles del Proyecto"
        subtitle="Cargando información..."
      >
        <div className="flex items-center justify-center h-64">
          <div className="text-white">🔄 Cargando detalles del proyecto...</div>
        </div>
      </AdminLayout>
    )
  }

  if (error) {
    return (
      <AdminLayout 
        title="Detalles del Proyecto"
        subtitle="Error al cargar información"
      >
        <div className="bg-red-500/20 border border-red-500/30 rounded-[24px] p-6">
          <p className="text-red-400 mb-4">❌ Error: {error}</p>
          <SmoothMagneticButton 
            onClick={fetchProjectData}
            className="px-4 py-2 text-white bg-red-600/20 border border-red-500/30 hover:bg-red-600/30"
          >
            🔄 Reintentar
          </SmoothMagneticButton>
        </div>
      </AdminLayout>
    )
  }

  if (!projectData) {
    return (
      <AdminLayout 
        title="Detalles del Proyecto"
        subtitle="Proyecto no encontrado"
      >
        <div className="text-center py-12">
          <p className="text-white/60 mb-4">No se encontró el proyecto solicitado</p>
          <Link href="/admin/projects">
            <SmoothMagneticButton className="px-6 py-3 text-white bg-blue-600/20 border border-blue-500/30">
              ← Volver a Proyectos
            </SmoothMagneticButton>
          </Link>
        </div>
      </AdminLayout>
    )
  }

  const { project, onboarding } = projectData

  return (
    <AdminLayout 
      title={project.name}
      subtitle={`${project.plan} - ${project.user.name}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <Link href="/admin/projects">
          <SmoothMagneticButton className="px-4 py-2 text-white/80 bg-white/10 border border-white/20 hover:bg-white/20">
            ← Volver a Proyectos
          </SmoothMagneticButton>
        </Link>
        
        <div className="flex space-x-3">
          <SmoothMagneticButton 
            onClick={fetchProjectData}
            className="px-4 py-2 text-white bg-blue-600/20 border border-blue-500/30 hover:bg-blue-600/30"
          >
            🔄 Actualizar
          </SmoothMagneticButton>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-[#1A1A1A] rounded-[24px] p-1 mb-6 border border-white/10">
        <div className="flex space-x-1">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex-1 px-4 py-2 rounded-[20px] text-sm font-medium transition-colors ${
              activeTab === 'overview' 
                ? 'bg-[#0147FF] text-white' 
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            📊 Resumen del Proyecto
          </button>
          <button
            onClick={() => setActiveTab('onboarding')}
            className={`flex-1 px-4 py-2 rounded-[20px] text-sm font-medium transition-colors ${
              activeTab === 'onboarding' 
                ? 'bg-[#0147FF] text-white' 
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            📝 Respuestas de Onboarding
            {onboarding.exists && (
              <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${getOnboardingStatusColor(onboarding.status)}`}>
                {onboarding.completionPercentage}%
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Project Status */}
          <div className="bg-[#1A1A1A] rounded-[24px] p-6 border border-white/10">
            <h3 className="text-white font-bold text-lg mb-4">Estado del Proyecto</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="text-center">
                <div className={`px-3 py-1 rounded-full text-sm font-medium border inline-block ${getStatusColor(project.status)}`}>
                  {project.status.replace('_', ' ')}
                </div>
                <p className="text-white/60 text-xs mt-1">Estado</p>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{project.progress}%</div>
                <p className="text-white/60 text-xs">Progreso</p>
              </div>
              
              <div className="text-center">
                <div className="text-lg font-semibold text-purple-400">{project.plan}</div>
                <p className="text-white/60 text-xs">Plan</p>
              </div>
              
              <div className="text-center">
                <div className="text-lg font-semibold text-white">
                  {project.estimatedDelivery || 'N/A'}
                </div>
                <p className="text-white/60 text-xs">Entrega</p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-white/60">Progreso del proyecto</span>
                <span className="text-sm text-white/80">{project.progress}%</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${project.progress}%` }}
                />
              </div>
            </div>

            {project.currentPhase && (
              <div className="bg-white/5 rounded-lg p-4">
                <span className="text-sm text-white/60">Fase actual:</span>
                <p className="text-white font-medium">{project.currentPhase}</p>
              </div>
            )}
          </div>

          {/* Client Information */}
          <div className="bg-[#1A1A1A] rounded-[24px] p-6 border border-white/10">
            <h3 className="text-white font-bold text-lg mb-4">Información del Cliente</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h4 className="text-white/80 font-semibold mb-3">Datos de Contacto</h4>
                <div className="space-y-2">
                  <div>
                    <span className="text-white/60 text-sm">Nombre:</span>
                    <p className="text-white font-medium">{project.user.name}</p>
                  </div>
                  <div>
                    <span className="text-white/60 text-sm">Email:</span>
                    <p className="text-white font-medium">{project.user.email}</p>
                  </div>
                  {project.user.phone && (
                    <div>
                      <span className="text-white/60 text-sm">Teléfono:</span>
                      <p className="text-white font-medium">{project.user.phone}</p>
                    </div>
                  )}
                  {project.user.company && (
                    <div>
                      <span className="text-white/60 text-sm">Empresa:</span>
                      <p className="text-white font-medium">{project.user.company}</p>
                    </div>
                  )}
                </div>
              </div>
              
              <div>
                <h4 className="text-white/80 font-semibold mb-3">Región y Pricing</h4>
                <div className="space-y-2">
                  {onboarding.data?.businessInfo?.businessRegion && (
                    <div>
                      <span className="text-white/60 text-sm">Región del negocio:</span>
                      <p className="text-white font-medium">
                        {onboarding.data.businessInfo.businessRegion === 'latam' ? '🌎 Latinoamérica' : '🌍 Internacional'}
                      </p>
                    </div>
                  )}
                  {onboarding.data?.businessInfo?.businessCountry && (
                    <div>
                      <span className="text-white/60 text-sm">País:</span>
                      <p className="text-white font-medium">{onboarding.data.businessInfo.businessCountry}</p>
                    </div>
                  )}
                  <div>
                    <span className="text-white/60 text-sm">Tier de pricing:</span>
                    <p className={`font-medium ${onboarding.data?.businessInfo?.businessRegion === 'latam' ? 'text-green-400' : 'text-blue-400'}`}>
                      {onboarding.data?.businessInfo?.businessRegion === 'latam' ? '💰 LATAM' : '💎 Internacional'}
                    </p>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-white/80 font-semibold mb-3">Información del Proyecto</h4>
                <div className="space-y-2">
                  <div>
                    <span className="text-white/60 text-sm">Creado:</span>
                    <p className="text-white font-medium">
                      {new Date(project.createdAt).toLocaleDateString('es-ES', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                  <div>
                    <span className="text-white/60 text-sm">Última actualización:</span>
                    <p className="text-white font-medium">
                      {new Date(project.updatedAt).toLocaleDateString('es-ES', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                  <div>
                    <span className="text-white/60 text-sm">Cliente desde:</span>
                    <p className="text-white font-medium">
                      {new Date(project.user.createdAt).toLocaleDateString('es-ES', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'onboarding' && (
        <OnboardingTab 
          onboarding={onboarding} 
          projectId={project.id}
          onExport={handleExport}
        />
      )}
    </AdminLayout>
  )
}

// Componente separado para la tab de onboarding
function OnboardingTab({ 
  onboarding, 
  projectId, 
  onExport 
}: { 
  onboarding: any; 
  projectId: string; 
  onExport: (format: 'json' | 'csv' | 'txt') => void 
}) {
  if (!onboarding.exists) {
    return (
      <div className="bg-[#1A1A1A] rounded-[24px] p-8 border border-white/10 text-center">
        <div className="w-24 h-24 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-12 h-12 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 18.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-white mb-3">Sin Respuestas de Onboarding</h3>
        <p className="text-white/60">
          Este cliente aún no ha completado el proceso de onboarding. 
          Las respuestas aparecerán aquí una vez que complete el formulario.
        </p>
      </div>
    )
  }

  const data = onboarding.data

  return (
    <div className="space-y-6">
      {/* Onboarding Status */}
      <div className="bg-[#1A1A1A] rounded-[24px] p-6 border border-white/10">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white font-bold text-lg">Estado del Onboarding</h3>
          
          <div className="flex items-center space-x-3">
            <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getOnboardingStatusColor(onboarding.status)}`}>
              {onboarding.status === 'COMPLETED' ? 'Completado' : 
               onboarding.status === 'IN_PROGRESS' ? 'En Progreso' : 'Pendiente'}
            </span>
            
            {/* Export Buttons */}
            <div className="flex space-x-2">
              <SmoothMagneticButton 
                onClick={() => onExport('json')}
                className="px-3 py-1 text-xs text-white bg-green-600/20 border border-green-500/30 hover:bg-green-600/30"
              >
                📄 JSON
              </SmoothMagneticButton>
              <SmoothMagneticButton 
                onClick={() => onExport('csv')}
                className="px-3 py-1 text-xs text-white bg-blue-600/20 border border-blue-500/30 hover:bg-blue-600/30"
              >
                📊 CSV
              </SmoothMagneticButton>
              <SmoothMagneticButton 
                onClick={() => onExport('txt')}
                className="px-3 py-1 text-xs text-white bg-purple-600/20 border border-purple-500/30 hover:bg-purple-600/30"
              >
                📝 TXT
              </SmoothMagneticButton>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-white">{onboarding.completionPercentage}%</div>
            <p className="text-white/60 text-sm">Completitud</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">{onboarding.sectionsCompleted}/{onboarding.totalSections}</div>
            <p className="text-white/60 text-sm">Secciones</p>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-white">
              {onboarding.submittedAt ? new Date(onboarding.submittedAt).toLocaleDateString('es-ES') : 'N/A'}
            </div>
            <p className="text-white/60 text-sm">Enviado</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-4">
          <div className="w-full bg-white/10 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${onboarding.completionPercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Onboarding Sections */}
      <div className="grid gap-6">
        {/* Sistema Optimizado - Secciones Detalladas */}
        {data.optimizedFields && (
          <>
            {/* Business Info (Detallado) */}
            {data.optimizedFields.businessDetails && (
              <OnboardingSection 
                title="🏢 Información del Negocio (Sistema Optimizado)"
                data={data.optimizedFields.businessDetails}
                fields={[
                  { key: 'name', label: 'Nombre del negocio' },
                  { key: 'industry', label: 'Industria' },
                  { key: 'customIndustry', label: 'Industria personalizada' },
                  { key: 'size', label: 'Tamaño de empresa' },
                  { key: 'region', label: 'Región del negocio' },
                  { key: 'country', label: 'País del negocio' }
                ]}
              />
            )}

            {/* Goals (Detallado con respuestas completas) */}
            {data.optimizedFields.goalDetails && (
              <OnboardingSection 
                title="🎯 Objetivos y Audiencia (Sistema Optimizado)"
                data={data.optimizedFields.goalDetails}
                fields={[
                  { key: 'primaryGoal', label: 'Objetivo principal' },
                  { key: 'targetAudience.ageRanges', label: 'Rangos de edad', isArray: true },
                  { key: 'targetAudience.location', label: 'Ubicación objetivo' },
                  { key: 'targetAudience.description', label: 'Descripción completa de audiencia', isLongText: true }
                ]}
              />
            )}

            {/* Website (Configuración por plan) */}
            {data.optimizedFields.websiteDetails && (
              <OptimizedWebsiteSection 
                title="📄 Estructura del Sitio Web (Sistema Optimizado)"
                data={data.optimizedFields.websiteDetails}
              />
            )}

            {/* Branding (Respuestas completas sin resumir) */}
            {data.optimizedFields.brandingDetails && (
              <OptimizedBrandingSection 
                title="🎨 Identidad Visual (Sistema Optimizado)"
                data={data.optimizedFields.brandingDetails}
              />
            )}

            {/* Technical (Configuración detallada) */}
            {data.optimizedFields.technicalDetails && (
              <OnboardingSection 
                title="🌐 Configuración Técnica (Sistema Optimizado)"
                data={data.optimizedFields.technicalDetails}
                fields={[
                  { key: 'domain.hasDomain', label: 'Tiene dominio', isBoolean: true },
                  { key: 'domain.domainName', label: 'Nombre del dominio' },
                  { key: 'domain.needsHelp', label: 'Necesita ayuda con dominio', isBoolean: true },
                  { key: 'hasContent', label: 'Tiene contenido existente', isBoolean: true },
                  { key: 'needsCopywriting', label: 'Necesita copywriting', isBoolean: true }
                ]}
              />
            )}
          </>
        )}

        {/* Secciones del sistema anterior (como fallback) */}
        {!data.optimizedFields && (
          <>
            {/* Business Info */}
            {data.businessInfo && (
              <OnboardingSection 
                title="🏢 Información del Negocio"
                data={data.businessInfo}
                fields={[
                  { key: 'name', label: 'Nombre del negocio' },
                  { key: 'industry', label: 'Industria' },
                  { key: 'customIndustry', label: 'Industria personalizada' },
                  { key: 'businessRegion', label: 'Región del negocio' },
                  { key: 'businessCountry', label: 'País del negocio' },
                  { key: 'size', label: 'Tamaño' },
                  { key: 'location', label: 'Ubicación' },
                  { key: 'yearsOperating', label: 'Años operando' }
                ]}
              />
            )}

            {/* Objectives */}
            {data.objectives && (
              <OnboardingSection 
                title="🎯 Objetivos y Audiencia"
                data={data.objectives}
                fields={[
                  { key: 'primaryGoal', label: 'Meta principal' },
                  { key: 'competitors', label: 'Competidores', isArray: true },
                  { key: 'targetAudience.ageRange', label: 'Rango de edad objetivo' },
                  { key: 'targetAudience.location', label: 'Ubicación objetivo' },
                  { key: 'targetAudience.interests', label: 'Intereses objetivo', isArray: true }
                ]}
              />
            )}

            {/* Content Architecture */}
            {data.contentArchitecture && (
              <OnboardingSection 
                title="📄 Arquitectura de Contenido"
                data={data.contentArchitecture}
                fields={[
                  { key: 'pages', label: 'Páginas necesarias', isArray: true },
                  { key: 'features', label: 'Funcionalidades', isArray: true },
                  { key: 'existingContent', label: 'Contenido existente', isBoolean: true },
                  { key: 'needsCopywriting', label: 'Necesita copywriting', isBoolean: true }
                ]}
              />
            )}

            {/* Brand Design */}
            {data.brandDesign && (
              <OnboardingSection 
                title="🎨 Diseño y Marca"
                data={data.brandDesign}
                fields={[
                  { key: 'colors', label: 'Colores preferidos', isArray: true },
                  { key: 'style', label: 'Estilo' },
                  { key: 'references', label: 'Referencias', isArray: true },
                  { key: 'logoStatus', label: 'Estado del logo' }
                ]}
              />
            )}

            {/* Technical Setup */}
            {data.technicalSetup && (
              <OnboardingSection 
                title="⚙️ Configuración Técnica"
                data={data.technicalSetup}
                fields={[
                  { key: 'domain.existing', label: 'Dominio existente', isBoolean: true },
                  { key: 'domain.name', label: 'Nombre del dominio' },
                  { key: 'domain.needsRegistration', label: 'Necesita registro', isBoolean: true },
                  { key: 'integrations', label: 'Integraciones', isArray: true },
                  { key: 'ssl', label: 'SSL requerido', isBoolean: true },
                  { key: 'corporateEmail', label: 'Email corporativo', isBoolean: true }
                ]}
              />
            )}

            {/* Project Planning */}
            {data.projectPlanning && (
              <OnboardingSection 
                title="📅 Planificación del Proyecto"
                data={data.projectPlanning}
                fields={[
                  { key: 'timeline', label: 'Timeline (semanas)' },
                  { key: 'deliverables', label: 'Entregables', isArray: true },
                  { key: 'communicationChannel', label: 'Canal de comunicación' },
                  { key: 'priority', label: 'Prioridad' }
                ]}
              />
            )}
          </>
        )}
      </div>
    </div>
  )
}

// Componente para mostrar cada sección de onboarding
function OnboardingSection({ 
  title, 
  data, 
  fields 
}: { 
  title: string; 
  data: any; 
  fields: Array<{ key: string; label: string; isArray?: boolean; isBoolean?: boolean; isLongText?: boolean }> 
}) {
  const getValue = (obj: any, path: string) => {
    return path.split('.').reduce((current, key) => current?.[key], obj)
  }

  return (
    <div className="bg-[#1A1A1A] rounded-[24px] p-6 border border-white/10">
      <h4 className="text-white font-bold text-lg mb-4">{title}</h4>
      
      <div className="space-y-4">
        {fields.map((field) => {
          const value = getValue(data, field.key)
          
          if (value === undefined || value === null || value === '') return null

          return (
            <div key={field.key} className={`space-y-2 ${field.isLongText ? 'col-span-full' : ''}`}>
              <span className="text-white/60 text-sm font-medium">{field.label}:</span>
              {field.isLongText ? (
                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <p className="text-white leading-relaxed whitespace-pre-wrap">{value}</p>
                </div>
              ) : (
                <p className="text-white font-medium">
                  {field.isBoolean ? (value ? 'Sí' : 'No') :
                   field.isArray ? (Array.isArray(value) ? value.join(', ') : value) :
                   value}
                </p>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

// Componente especializado para mostrar website del sistema optimizado
function OptimizedWebsiteSection({ 
  title, 
  data 
}: { 
  title: string; 
  data: any;
}) {
  const getAllPages = () => [...ROCKET_SECTIONS, ...GALAXY_PAGES]
  const getAllFeatures = () => AVAILABLE_FEATURES

  return (
    <div className="bg-[#1A1A1A] rounded-[24px] p-6 border border-white/10">
      <h4 className="text-white font-bold text-lg mb-4">{title}</h4>
      
      <div className="space-y-6">
        {/* Plan seleccionado */}
        {data.plan && (
          <div className="space-y-2">
            <span className="text-white/60 text-sm font-medium">Plan seleccionado:</span>
            <p className="text-white font-medium capitalize">{data.plan}</p>
          </div>
        )}

        {/* Páginas/Secciones */}
        {data.pages && data.pages.length > 0 && (
          <div className="space-y-2">
            <span className="text-white/60 text-sm font-medium">Páginas/Secciones seleccionadas:</span>
            <div className="flex flex-wrap gap-2">
              {data.pages.map((pageId: string, index: number) => {
                const pageConfig = getAllPages().find(p => p.id === pageId)
                const displayText = pageConfig 
                  ? `${pageConfig.name} [${pageConfig.description}]`
                  : pageId
                
                return (
                  <span key={index} className="px-3 py-1 bg-green-500/20 text-green-400 border border-green-500/30 rounded-lg text-sm">
                    {displayText}
                  </span>
                )
              })}
            </div>
          </div>
        )}

        {/* Funcionalidades */}
        {data.features && data.features.length > 0 && (
          <div className="space-y-2">
            <span className="text-white/60 text-sm font-medium">Funcionalidades seleccionadas:</span>
            <div className="flex flex-wrap gap-2">
              {data.features.map((featureId: string, index: number) => {
                const featureConfig = getAllFeatures().find(f => f.id === featureId)
                const displayText = featureConfig 
                  ? `${featureConfig.name} [${featureConfig.description}]`
                  : featureId
                
                return (
                  <span key={index} className="px-3 py-1 bg-purple-500/20 text-purple-400 border border-purple-500/30 rounded-lg text-sm">
                    {displayText}
                  </span>
                )
              })}
            </div>
          </div>
        )}

        {/* Otras configuraciones */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.hasContent !== undefined && (
            <div className="space-y-2">
              <span className="text-white/60 text-sm font-medium">Tiene contenido existente:</span>
              <p className="text-white font-medium">{data.hasContent ? 'Sí' : 'No'}</p>
            </div>
          )}
          
          {data.needsCopywriting !== undefined && (
            <div className="space-y-2">
              <span className="text-white/60 text-sm font-medium">Necesita copywriting:</span>
              <p className="text-white font-medium">{data.needsCopywriting ? 'Sí' : 'No'}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// Componente especializado para mostrar branding del sistema optimizado
function OptimizedBrandingSection({ 
  title, 
  data 
}: { 
  title: string; 
  data: any;
}) {
  return (
    <div className="bg-[#1A1A1A] rounded-[24px] p-6 border border-white/10">
      <h4 className="text-white font-bold text-lg mb-4">{title}</h4>
      
      <div className="space-y-6">
        {/* Estilos de marca */}
        {data.brandStyles && data.brandStyles.length > 0 && (
          <div className="space-y-2">
            <span className="text-white/60 text-sm font-medium">Estilos de marca seleccionados:</span>
            <div className="flex flex-wrap gap-2">
              {data.brandStyles.map((styleId: string, index: number) => {
                const styleConfig = BRAND_STYLES.find(s => s.id === styleId)
                const displayText = styleConfig 
                  ? `${styleConfig.name} [${styleConfig.description}]`
                  : styleId
                
                return (
                  <span key={index} className="px-3 py-1 bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-lg text-sm">
                    {displayText}
                  </span>
                )
              })}
            </div>
          </div>
        )}

        {/* Redes sociales */}
        {data.socialMedia && (
          <div className="space-y-3">
            <span className="text-white/60 text-sm font-medium">Redes sociales:</span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {data.socialMedia.currentWebsite && (
                <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                  <span className="text-white/60 text-xs">Sitio web actual:</span>
                  <p className="text-white font-medium">{data.socialMedia.currentWebsite}</p>
                </div>
              )}
              {data.socialMedia.facebook && (
                <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                  <span className="text-white/60 text-xs">Facebook:</span>
                  <p className="text-white font-medium">{data.socialMedia.facebook}</p>
                </div>
              )}
              {data.socialMedia.additional?.platform && data.socialMedia.additional?.url && (
                <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                  <span className="text-white/60 text-xs">{data.socialMedia.additional.platform}:</span>
                  <p className="text-white font-medium">{data.socialMedia.additional.url}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Personalidad de marca */}
        {data.brandPersonality && (
          <div className="space-y-3">
            <span className="text-white/60 text-sm font-medium">Personalidad de marca:</span>
            
            {data.brandPersonality.feeling && (
              <div className="space-y-2">
                <span className="text-white/60 text-xs">¿Cómo quiere que se sientan los clientes?</span>
                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <p className="text-white leading-relaxed whitespace-pre-wrap">{data.brandPersonality.feeling}</p>
                </div>
              </div>
            )}
            
            {data.brandPersonality.word && (
              <div className="space-y-2">
                <span className="text-white/60 text-xs">Palabra que describe el negocio:</span>
                <div className="inline-block px-3 py-1 bg-green-500/20 text-green-400 border border-green-500/30 rounded-lg text-sm font-medium">
                  {data.brandPersonality.word}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Colores de marca */}
        {data.brandColors && data.brandColors.length > 0 && (
          <div className="space-y-2">
            <span className="text-white/60 text-sm font-medium">Colores de marca:</span>
            <div className="flex flex-wrap gap-2">
              {data.brandColors.map((color: string, index: number) => (
                <div key={index} className="flex items-center space-x-2 bg-white/5 rounded-lg p-2 border border-white/10">
                  <div 
                    className="w-6 h-6 rounded border-2 border-white/20"
                    style={{ backgroundColor: color }}
                  />
                  <span className="text-white text-sm font-mono">{color}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Assets */}
        {(data.assets?.logo || data.assets?.brandGuide || data.assets?.images) && (
          <div className="space-y-2">
            <span className="text-white/60 text-sm font-medium">Assets cargados:</span>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {data.assets.logo && (
                <div className="bg-white/5 rounded-lg p-3 border border-white/10 text-center">
                  <span className="text-white/60 text-xs">Logo</span>
                  <p className="text-green-400 text-sm">✓ Cargado</p>
                </div>
              )}
              {data.assets.brandGuide && (
                <div className="bg-white/5 rounded-lg p-3 border border-white/10 text-center">
                  <span className="text-white/60 text-xs">Guía de marca</span>
                  <p className="text-green-400 text-sm">✓ Cargado</p>
                </div>
              )}
              {data.assets.images && (
                <div className="bg-white/5 rounded-lg p-3 border border-white/10 text-center">
                  <span className="text-white/60 text-xs">Imágenes</span>
                  <p className="text-green-400 text-sm">✓ Cargado</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Análisis de IA */}
        {data.aiAnalysis && (
          <div className="space-y-2">
            <span className="text-white/60 text-sm font-medium">Análisis de IA:</span>
            <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
              <pre className="text-purple-300 text-sm whitespace-pre-wrap overflow-x-auto">
                {JSON.stringify(data.aiAnalysis, null, 2)}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}