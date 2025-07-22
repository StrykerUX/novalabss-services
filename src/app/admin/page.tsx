"use client";

import AdminLayout from "@/components/AdminLayout";
import SmoothMagneticButton from "@/components/SmoothMagneticButton";
import Link from "next/link";
import { useAdminStats } from "@/hooks/useAdminStats";

export default function AdminDashboard() {
  const { data, loading, error, refetch } = useAdminStats();

  if (loading) {
    return (
      <AdminLayout 
        title="Dashboard Administrativo"
        subtitle="Cargando datos..."
      >
        <div className="flex items-center justify-center h-64">
          <div className="text-white">🔄 Cargando estadísticas...</div>
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout 
        title="Dashboard Administrativo"
        subtitle="Error al cargar datos"
      >
        <div className="bg-red-500/20 border border-red-500/30 rounded-[24px] p-6 mb-6">
          <p className="text-red-400 mb-4">❌ Error: {error}</p>
          <SmoothMagneticButton 
            onClick={refetch}
            className="px-4 py-2 text-white bg-red-600/20 border border-red-500/30 hover:bg-red-600/30"
          >
            🔄 Reintentar
          </SmoothMagneticButton>
        </div>
      </AdminLayout>
    );
  }

  if (!data) {
    return (
      <AdminLayout 
        title="Dashboard Administrativo"
        subtitle="Sin datos disponibles"
      >
        <div className="text-white/60">No hay datos disponibles</div>
      </AdminLayout>
    );
  }

  const { stats, recentUsers, recentProjects } = data;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "EN_DESARROLLO":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "EN_REVISION":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "COMPLETADO":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  return (
    <AdminLayout 
      title="Dashboard Administrativo"
      subtitle="Visión general de la plataforma NovaLabs - Datos en tiempo real"
    >
      {/* Refresh Button */}
      <div className="flex justify-end mb-6">
        <SmoothMagneticButton 
          onClick={refetch}
          className="px-4 py-2 text-white bg-blue-600/20 border border-blue-500/30 hover:bg-blue-600/30 transition-colors"
        >
          🔄 Actualizar Datos
        </SmoothMagneticButton>
      </div>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-[#1A1A1A] rounded-[24px] p-6 border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
            </div>
            <span className="text-blue-400 text-sm font-medium">+{stats.userGrowthPercentage}%</span>
          </div>
          <h3 className="text-white font-semibold text-lg">Usuarios Totales</h3>
          <p className="text-3xl font-bold text-white mt-2">{stats.totalUsers}</p>
        </div>

        <div className="bg-[#1A1A1A] rounded-[24px] p-6 border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <span className="text-green-400 text-sm font-medium">Activos</span>
          </div>
          <h3 className="text-white font-semibold text-lg">Proyectos Activos</h3>
          <p className="text-3xl font-bold text-white mt-2">{stats.activeProjects}</p>
        </div>

        <div className="bg-[#1A1A1A] rounded-[24px] p-6 border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <span className="text-yellow-400 text-sm font-medium">{stats.activeSubscriptions} subs</span>
          </div>
          <h3 className="text-white font-semibold text-lg">Ingresos Mensuales</h3>
          <p className="text-3xl font-bold text-white mt-2">${stats.monthlyRevenue.toLocaleString()} MXN</p>
        </div>

        <div className="bg-[#1A1A1A] rounded-[24px] p-6 border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="text-red-400 text-sm font-medium">Crítico</span>
          </div>
          <h3 className="text-white font-semibold text-lg">Pagos Pendientes</h3>
          <p className="text-3xl font-bold text-white mt-2">{stats.pendingPayments}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Users */}
        <div className="bg-[#1A1A1A] rounded-[24px] p-6 border border-white/10">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-white font-bold text-lg">Usuarios Recientes</h3>
            <Link href="/admin/users">
              <SmoothMagneticButton className="px-4 py-2 text-sm text-red-400 hover:text-red-300 transition-colors">
                Ver todos →
              </SmoothMagneticButton>
            </Link>
          </div>
          
          <div className="space-y-4">
            {recentUsers.map((user) => (
              <div key={user.id} className="flex items-center justify-between p-4 bg-white/5 rounded-[12px] border border-white/10">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <p className="text-white font-medium">{user.name}</p>
                    <p className="text-white/60 text-sm">{user.email}</p>
                    {user.role === 'ADMIN' && (
                      <span className="text-red-400 text-xs">👑 Admin</span>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    user.status === 'Activo' ? 'bg-green-500/20 text-green-400' : 
                    user.status === 'Suspendido' ? 'bg-red-500/20 text-red-400' :
                    'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {user.status}
                  </span>
                  <p className="text-white/60 text-xs mt-1">{user.joinDate}</p>
                  <p className="text-white/40 text-xs">{user.projects} proyectos</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Projects */}
        <div className="bg-[#1A1A1A] rounded-[24px] p-6 border border-white/10">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-white font-bold text-lg">Proyectos Recientes</h3>
            <Link href="/admin/projects">
              <SmoothMagneticButton className="px-4 py-2 text-sm text-red-400 hover:text-red-300 transition-colors">
                Ver todos →
              </SmoothMagneticButton>
            </Link>
          </div>
          
          <div className="space-y-4">
            {recentProjects.map((project) => (
              <div key={project.id} className="p-4 bg-white/5 rounded-[12px] border border-white/10">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-white font-medium">{project.name}</h4>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(project.status)}`}>
                    {project.status.replace('_', ' ')}
                  </span>
                </div>
                <p className="text-white/60 text-sm mb-3">Cliente: {project.client}</p>
                <p className="text-white/40 text-xs mb-3">Actualizado: {project.updatedAt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex-1 mr-4">
                    <div className="flex justify-between text-sm text-white/80 mb-1">
                      <span>Progreso</span>
                      <span>{project.progress}%</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-red-500 to-red-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}