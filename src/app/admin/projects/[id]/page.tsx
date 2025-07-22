"use client"

import AdminLayout from "@/components/AdminLayout"
import SmoothMagneticButton from "@/components/SmoothMagneticButton"
import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"

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
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
        {/* Business Info */}
        {data.businessInfo && (
          <OnboardingSection 
            title="🏢 Información del Negocio"
            data={data.businessInfo}
            fields={[
              { key: 'name', label: 'Nombre del negocio' },
              { key: 'industry', label: 'Industria' },
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
  fields: Array<{ key: string; label: string; isArray?: boolean; isBoolean?: boolean }> 
}) {
  const getValue = (obj: any, path: string) => {
    return path.split('.').reduce((current, key) => current?.[key], obj)
  }

  return (
    <div className="bg-[#1A1A1A] rounded-[24px] p-6 border border-white/10">
      <h4 className="text-white font-bold text-lg mb-4">{title}</h4>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {fields.map((field) => {
          const value = getValue(data, field.key)
          
          if (value === undefined || value === null || value === '') return null

          return (
            <div key={field.key} className="space-y-1">
              <span className="text-white/60 text-sm">{field.label}:</span>
              <p className="text-white font-medium">
                {field.isBoolean ? (value ? 'Sí' : 'No') :
                 field.isArray ? (Array.isArray(value) ? value.join(', ') : value) :
                 value}
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}