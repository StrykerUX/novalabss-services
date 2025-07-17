"use client";

import AdminLayout from "@/components/AdminLayout";
import SmoothMagneticButton from "@/components/SmoothMagneticButton";
import { useAdminProjects } from "@/hooks/useAdminProjects";
import { useAdminUsers } from "@/hooks/useAdminUsers";
import { useState } from "react";

export default function AdminProjectsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState<string | null>(null);
  const [newProject, setNewProject] = useState({ name: "", userId: "", plan: "Rocket", status: "EN_DESARROLLO" });

  const { data, loading, error, refetch, createProject, updateProject, deleteProject, setFilters } = useAdminProjects({
    page: currentPage,
    limit: 10,
    search: searchTerm,
    status: statusFilter
  });

  // Para obtener lista de usuarios al crear proyecto
  const { data: usersData } = useAdminUsers({ limit: 100 });

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1);
    setFilters({ page: 1, search: term, status: statusFilter });
  };

  const handleStatusFilter = (status: string) => {
    setStatusFilter(status);
    setCurrentPage(1);
    setFilters({ page: 1, search: searchTerm, status });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setFilters({ page, search: searchTerm, status: statusFilter });
  };

  const handleCreateProject = async () => {
    if (!newProject.name || !newProject.userId) {
      alert("Por favor llena todos los campos requeridos");
      return;
    }

    const success = await createProject(newProject);
    if (success) {
      setShowCreateModal(false);
      setNewProject({ name: "", userId: "", plan: "Rocket", status: "EN_DESARROLLO" });
    }
  };

  const handleUpdateProject = async (id: string, updates: any) => {
    const success = await updateProject(id, updates);
    if (success) {
      setShowEditModal(null);
    }
  };

  const handleDeleteProject = async (id: string) => {
    const confirmed = confirm("¿Estás seguro de que quieres eliminar este proyecto?");
    if (confirmed) {
      await deleteProject(id);
    }
  };

  if (loading) {
    return (
      <AdminLayout 
        title="Gestión de Proyectos"
        subtitle="Cargando proyectos..."
      >
        <div className="flex items-center justify-center h-64">
          <div className="text-white">🔄 Cargando proyectos...</div>
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout 
        title="Gestión de Proyectos"
        subtitle="Error al cargar proyectos"
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
        title="Gestión de Proyectos"
        subtitle="Sin datos disponibles"
      >
        <div className="text-white/60">No hay datos disponibles</div>
      </AdminLayout>
    );
  }

  const { projects, stats } = data;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "EN_DESARROLLO":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "EN_REVISION":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "COMPLETADO":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "EN_ACTUALIZACION":
        return "bg-purple-500/20 text-purple-400 border-purple-500/30";
      case "EN_MANTENIMIENTO":
        return "bg-orange-500/20 text-orange-400 border-orange-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  return (
    <AdminLayout 
      title="Gestión de Proyectos"
      subtitle={`${stats.total} proyectos registrados`}
    >
      {/* Search and Filters */}
      <div className="bg-[#1A1A1A] rounded-[24px] p-6 border border-white/10 mb-6">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          {/* Search */}
          <div className="flex-1">
            <input
              type="text"
              placeholder="Buscar por nombre de proyecto o cliente..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => handleStatusFilter(e.target.value)}
            className="px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Todos los estados</option>
            <option value="EN_DESARROLLO">En Desarrollo</option>
            <option value="EN_REVISION">En Revisión</option>
            <option value="COMPLETADO">Completado</option>
            <option value="EN_ACTUALIZACION">En Actualización</option>
            <option value="EN_MANTENIMIENTO">En Mantenimiento</option>
          </select>
          
          {/* Refresh Button */}
          <SmoothMagneticButton 
            onClick={refetch}
            className="px-4 py-2 text-white bg-blue-600/20 border border-blue-500/30 hover:bg-blue-600/30"
          >
            🔄
          </SmoothMagneticButton>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        <div className="bg-[#1A1A1A] rounded-[24px] p-4 border border-white/10">
          <h3 className="text-white/80 text-xs font-medium mb-2">Total</h3>
          <p className="text-xl font-bold text-white">{stats.total}</p>
        </div>
        <div className="bg-[#1A1A1A] rounded-[24px] p-4 border border-white/10">
          <h3 className="text-white/80 text-xs font-medium mb-2">Desarrollo</h3>
          <p className="text-xl font-bold text-blue-400">{stats.en_desarrollo}</p>
        </div>
        <div className="bg-[#1A1A1A] rounded-[24px] p-4 border border-white/10">
          <h3 className="text-white/80 text-xs font-medium mb-2">Revisión</h3>
          <p className="text-xl font-bold text-yellow-400">{stats.en_revision}</p>
        </div>
        <div className="bg-[#1A1A1A] rounded-[24px] p-4 border border-white/10">
          <h3 className="text-white/80 text-xs font-medium mb-2">Completados</h3>
          <p className="text-xl font-bold text-green-400">{stats.completado}</p>
        </div>
        <div className="bg-[#1A1A1A] rounded-[24px] p-4 border border-white/10">
          <h3 className="text-white/80 text-xs font-medium mb-2">Actualización</h3>
          <p className="text-xl font-bold text-purple-400">{stats.en_actualizacion}</p>
        </div>
        <div className="bg-[#1A1A1A] rounded-[24px] p-4 border border-white/10">
          <h3 className="text-white/80 text-xs font-medium mb-2">Mantenimiento</h3>
          <p className="text-xl font-bold text-orange-400">{stats.en_mantenimiento}</p>
        </div>
      </div>

      {/* Projects Table */}
      <div className="bg-[#1A1A1A] rounded-[24px] p-6 border border-white/10">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-white font-bold text-lg">Lista de Proyectos</h3>
          <SmoothMagneticButton 
            onClick={() => setShowCreateModal(true)}
            className="px-4 py-2 text-sm text-white font-medium bg-red-600/20 border border-red-500/30 hover:bg-red-600/30 transition-colors"
          >
            Crear Proyecto
          </SmoothMagneticButton>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left text-white/80 font-medium py-3 px-4">Proyecto</th>
                <th className="text-left text-white/80 font-medium py-3 px-4">Cliente</th>
                <th className="text-left text-white/80 font-medium py-3 px-4">Estado</th>
                <th className="text-left text-white/80 font-medium py-3 px-4">Progreso</th>
                <th className="text-left text-white/80 font-medium py-3 px-4">Plan</th>
                <th className="text-left text-white/80 font-medium py-3 px-4">Actualizado</th>
                <th className="text-left text-white/80 font-medium py-3 px-4">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="py-4 px-4">
                    <div>
                      <p className="text-white font-medium">{project.name}</p>
                      <p className="text-white/60 text-sm">
                        {project.currentPhase || 'Sin fase definida'}
                      </p>
                      {project.estimatedDelivery && (
                        <p className="text-white/40 text-xs">
                          Entrega: {project.estimatedDelivery}
                        </p>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div>
                      <p className="text-white font-medium">{project.user.name}</p>
                      <p className="text-white/60 text-sm">{project.user.email}</p>
                      {project.user.role === 'ADMIN' && (
                        <span className="text-red-400 text-xs">👑 Admin</span>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(project.status)}`}>
                      {project.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-3">
                      <div className="flex-1">
                        <div className="w-full bg-white/10 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${project.progress}%` }}
                          ></div>
                        </div>
                      </div>
                      <span className="text-white text-sm font-medium">{project.progress}%</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-purple-500/20 text-purple-400">
                      {project.plan}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-white/60 text-sm">{project.dates.updated}</span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => setShowEditModal(project.id)}
                        className="p-1 text-white/60 hover:text-white transition-colors"
                        title="Editar proyecto"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                      </button>
                      <button 
                        onClick={() => handleDeleteProject(project.id)}
                        className="p-1 text-white/60 hover:text-red-400 transition-colors"
                        title="Eliminar proyecto"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        {stats.totalPages > 1 && (
          <div className="flex justify-between items-center mt-6">
            <div className="text-white/60 text-sm">
              Página {stats.currentPage} de {stats.totalPages} - {stats.total} proyectos total
            </div>
            <div className="flex space-x-2">
              {stats.hasPrev && (
                <SmoothMagneticButton 
                  onClick={() => handlePageChange(currentPage - 1)}
                  className="px-3 py-1 text-white bg-white/10 border border-white/20 hover:bg-white/20"
                >
                  ← Anterior
                </SmoothMagneticButton>
              )}
              
              {stats.hasNext && (
                <SmoothMagneticButton 
                  onClick={() => handlePageChange(currentPage + 1)}
                  className="px-3 py-1 text-white bg-white/10 border border-white/20 hover:bg-white/20"
                >
                  Siguiente →
                </SmoothMagneticButton>
              )}
            </div>
          </div>
        )}

        {projects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-white/60">No se encontraron proyectos con los filtros aplicados</p>
          </div>
        )}
      </div>

      {/* Create Project Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-[#1A1A1A] rounded-[24px] p-6 border border-white/10 w-full max-w-md">
            <h3 className="text-white font-bold text-lg mb-4">Crear Nuevo Proyecto</h3>
            
            <div className="space-y-4">
              <div>
                <label className="text-white/80 text-sm block mb-2">Nombre del proyecto</label>
                <input
                  type="text"
                  value={newProject.name}
                  onChange={(e) => setNewProject(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ej: Landing Page - Empresa ABC"
                />
              </div>
              
              <div>
                <label className="text-white/80 text-sm block mb-2">Usuario/Cliente</label>
                <select
                  value={newProject.userId}
                  onChange={(e) => setNewProject(prev => ({ ...prev, userId: e.target.value }))}
                  className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Selecciona un usuario</option>
                  {usersData?.users.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.name} ({user.email})
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="text-white/80 text-sm block mb-2">Plan</label>
                <select
                  value={newProject.plan}
                  onChange={(e) => setNewProject(prev => ({ ...prev, plan: e.target.value }))}
                  className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Rocket">Plan Rocket</option>
                  <option value="Galaxy">Plan Galaxy</option>
                </select>
              </div>
              
              <div>
                <label className="text-white/80 text-sm block mb-2">Estado inicial</label>
                <select
                  value={newProject.status}
                  onChange={(e) => setNewProject(prev => ({ ...prev, status: e.target.value }))}
                  className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="EN_DESARROLLO">En Desarrollo</option>
                  <option value="EN_REVISION">En Revisión</option>
                  <option value="EN_ACTUALIZACION">En Actualización</option>
                  <option value="EN_MANTENIMIENTO">En Mantenimiento</option>
                  <option value="COMPLETADO">Completado</option>
                </select>
              </div>
            </div>
            
            <div className="flex space-x-3 mt-6">
              <SmoothMagneticButton 
                onClick={() => setShowCreateModal(false)}
                className="flex-1 px-4 py-2 text-white bg-white/10 border border-white/20 hover:bg-white/20"
              >
                Cancelar
              </SmoothMagneticButton>
              <SmoothMagneticButton 
                onClick={handleCreateProject}
                className="flex-1 px-4 py-2 text-white bg-blue-600/20 border border-blue-500/30 hover:bg-blue-600/30"
              >
                Crear Proyecto
              </SmoothMagneticButton>
            </div>
          </div>
        </div>
      )}

      {/* Edit Project Modal */}
      {showEditModal && (
        <EditProjectModal 
          project={projects.find(p => p.id === showEditModal)!}
          onClose={() => setShowEditModal(null)}
          onUpdate={handleUpdateProject}
        />
      )}
    </AdminLayout>
  );
}

// Component for editing projects
function EditProjectModal({ project, onClose, onUpdate }: { 
  project: any; 
  onClose: () => void; 
  onUpdate: (id: string, updates: any) => void 
}) {
  const [editData, setEditData] = useState({
    name: project.name,
    status: project.status,
    progress: project.progress,
    currentPhase: project.currentPhase || '',
    estimatedDelivery: project.estimatedDelivery || '',
    plan: project.plan
  });

  const handleUpdate = () => {
    onUpdate(project.id, editData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-[#1A1A1A] rounded-[24px] p-6 border border-white/10 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <h3 className="text-white font-bold text-lg mb-4">Editar Proyecto</h3>
        
        <div className="space-y-4">
          <div>
            <label className="text-white/80 text-sm block mb-2">Nombre del proyecto</label>
            <input
              type="text"
              value={editData.name}
              onChange={(e) => setEditData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="text-white/80 text-sm block mb-2">Estado</label>
            <select
              value={editData.status}
              onChange={(e) => setEditData(prev => ({ ...prev, status: e.target.value }))}
              className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="EN_DESARROLLO">En Desarrollo</option>
              <option value="EN_REVISION">En Revisión</option>
              <option value="EN_ACTUALIZACION">En Actualización</option>
              <option value="EN_MANTENIMIENTO">En Mantenimiento</option>
              <option value="COMPLETADO">Completado</option>
            </select>
          </div>
          
          <div>
            <label className="text-white/80 text-sm block mb-2">Progreso (%)</label>
            <input
              type="number"
              min="0"
              max="100"
              value={editData.progress}
              onChange={(e) => setEditData(prev => ({ ...prev, progress: parseInt(e.target.value) || 0 }))}
              className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="text-white/80 text-sm block mb-2">Fase actual</label>
            <input
              type="text"
              value={editData.currentPhase}
              onChange={(e) => setEditData(prev => ({ ...prev, currentPhase: e.target.value }))}
              className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ej: Desarrollo de contenido"
            />
          </div>
          
          <div>
            <label className="text-white/80 text-sm block mb-2">Entrega estimada</label>
            <input
              type="text"
              value={editData.estimatedDelivery}
              onChange={(e) => setEditData(prev => ({ ...prev, estimatedDelivery: e.target.value }))}
              className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ej: 2 días restantes"
            />
          </div>
          
          <div>
            <label className="text-white/80 text-sm block mb-2">Plan</label>
            <select
              value={editData.plan}
              onChange={(e) => setEditData(prev => ({ ...prev, plan: e.target.value }))}
              className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Rocket">Plan Rocket</option>
              <option value="Galaxy">Plan Galaxy</option>
            </select>
          </div>
        </div>
        
        <div className="flex space-x-3 mt-6">
          <SmoothMagneticButton 
            onClick={onClose}
            className="flex-1 px-4 py-2 text-white bg-white/10 border border-white/20 hover:bg-white/20"
          >
            Cancelar
          </SmoothMagneticButton>
          <SmoothMagneticButton 
            onClick={handleUpdate}
            className="flex-1 px-4 py-2 text-white bg-blue-600/20 border border-blue-500/30 hover:bg-blue-600/30"
          >
            Actualizar
          </SmoothMagneticButton>
        </div>
      </div>
    </div>
  );
}