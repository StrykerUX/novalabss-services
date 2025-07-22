"use client"

import DashboardLayout from "@/components/DashboardLayout"
import SmoothMagneticButton from "@/components/SmoothMagneticButton"
import { useUserProjects } from "@/hooks/useUserProjects"
import Link from "next/link"

export default function ProjectsPage() {
  const { projects, loading, error, refetch } = useUserProjects()

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

  const getStatusText = (status: string) => {
    switch (status) {
      case 'EN_DESARROLLO':
        return 'En Desarrollo'
      case 'EN_REVISION':
        return 'En Revisión'
      case 'COMPLETADO':
        return 'Completado'
      case 'EN_MANTENIMIENTO':
        return 'En Mantenimiento'
      default:
        return status
    }
  }

  if (loading) {
    return (
      <DashboardLayout 
        title="Mis Proyectos" 
        subtitle="Gestiona y da seguimiento a tus sitios web"
      >
        <div className="flex items-center justify-center min-h-[40vh]">
          <div className="text-white/60">Cargando proyectos...</div>
        </div>
      </DashboardLayout>
    )
  }

  if (error) {
    return (
      <DashboardLayout 
        title="Mis Proyectos" 
        subtitle="Gestiona y da seguimiento a tus sitios web"
      >
        <div className="flex flex-col items-center justify-center min-h-[40vh] text-center">
          <div className="text-red-400 mb-4">Error al cargar proyectos: {error}</div>
          <SmoothMagneticButton 
            onClick={() => refetch()}
            className="px-6 py-3 text-white font-semibold"
            magneticStrength={0.15}
          >
            Reintentar
          </SmoothMagneticButton>
        </div>
      </DashboardLayout>
    )
  }

  if (projects.length === 0) {
    return (
      <DashboardLayout 
        title="Mis Proyectos" 
        subtitle="Gestiona y da seguimiento a tus sitios web"
      >
        {/* Empty State */}
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
          <div className="w-24 h-24 bg-[#0147FF]/20 rounded-full flex items-center justify-center mb-6">
            <svg className="w-12 h-12 text-[#0147FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          
          <h2 className="text-2xl font-bold text-white mb-3 font-space-grotesk">
            No tienes proyectos aún
          </h2>
          
          <p className="text-white/60 mb-8 max-w-md leading-relaxed">
            Suscríbete a uno de nuestros planes para crear tu primer sitio web profesional. 
            Nuestro equipo lo tendrá listo en 72-96 horas.
          </p>
          
          <Link href="/#pricing">
            <SmoothMagneticButton 
              className="px-8 py-4 text-white font-semibold hover:shadow-xl transition-shadow duration-300"
              magneticStrength={0.15}
            >
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span>Crear Primer Proyecto</span>
              </div>
            </SmoothMagneticButton>
          </Link>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout 
      title="Mis Proyectos" 
      subtitle="Gestiona y da seguimiento a tus sitios web"
    >
      <div className="space-y-6">
        {/* Header con refresh */}
        <div className="flex justify-between items-center">
          <div className="text-white/60">
            {projects.length} proyecto{projects.length !== 1 ? 's' : ''} encontrado{projects.length !== 1 ? 's' : ''}
          </div>
          <SmoothMagneticButton 
            onClick={() => refetch()}
            className="px-4 py-2 text-sm text-white/80 hover:text-white border border-white/20 hover:border-white/40"
            magneticStrength={0.1}
          >
            Actualizar
          </SmoothMagneticButton>
        </div>

        {/* Lista de proyectos */}
        <div className="grid gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/[0.07] transition-colors duration-200"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2 font-space-grotesk">
                    {project.name}
                    <span className="ml-3 text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full border border-green-500/30">
                      ✅ Proyecto Real
                    </span>
                  </h3>
                  <div className="flex items-center space-x-4 text-sm text-white/60">
                    <span>Plan {project.plan}</span>
                    <span>•</span>
                    <span>Creado {new Date(project.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm border ${getStatusColor(project.status)}`}>
                  {getStatusText(project.status)}
                </div>
              </div>

              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-white/60">Progreso</span>
                  <span className="text-sm text-white/80">{project.progress}%</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div 
                    className="bg-[#0147FF] h-2 rounded-full transition-all duration-300"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>

              {project.currentPhase && (
                <div className="mb-4">
                  <span className="text-sm text-white/60">Fase actual:</span>
                  <p className="text-white/80 mt-1">{project.currentPhase}</p>
                </div>
              )}

              {project.estimatedDelivery && (
                <div className="mb-4">
                  <span className="text-sm text-white/60">Entrega estimada:</span>
                  <p className="text-white/80 mt-1">{project.estimatedDelivery}</p>
                </div>
              )}

              <div className="flex justify-between items-center pt-4 border-t border-white/10">
                <div className="text-xs text-white/40">
                  Actualizado {new Date(project.updatedAt).toLocaleDateString()}
                </div>
                <Link href={`/dashboard/projects/${project.id}`}>
                  <SmoothMagneticButton 
                    className="px-4 py-2 text-sm text-white font-medium hover:shadow-lg transition-shadow duration-300"
                    magneticStrength={0.1}
                  >
                    Ver Detalles
                  </SmoothMagneticButton>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}