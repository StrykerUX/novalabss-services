"use client";

import AdminLayout from "@/components/AdminLayout";
import SmoothMagneticButton from "@/components/SmoothMagneticButton";
import { useAdminUsers } from "@/hooks/useAdminUsers";
import { useState } from "react";

export default function AdminUsersPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [roleFilter, setRoleFilter] = useState("all");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newUser, setNewUser] = useState({ name: "", email: "", role: "USER" });

  const { data, loading, error, refetch, createUser, setFilters } = useAdminUsers({
    page: currentPage,
    limit: 10,
    search: searchTerm,
    status: statusFilter,
    role: roleFilter
  });

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1);
    setFilters({ page: 1, search: term, status: statusFilter, role: roleFilter });
  };

  const handleStatusFilter = (status: string) => {
    setStatusFilter(status);
    setCurrentPage(1);
    setFilters({ page: 1, search: searchTerm, status, role: roleFilter });
  };

  const handleRoleFilter = (role: string) => {
    setRoleFilter(role);
    setCurrentPage(1);
    setFilters({ page: 1, search: searchTerm, status: statusFilter, role });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setFilters({ page, search: searchTerm, status: statusFilter, role: roleFilter });
  };

  const handleCreateUser = async () => {
    if (!newUser.name || !newUser.email) {
      alert("Por favor llena todos los campos");
      return;
    }

    const success = await createUser(newUser);
    if (success) {
      setShowCreateModal(false);
      setNewUser({ name: "", email: "", role: "USER" });
    }
  };

  if (loading) {
    return (
      <AdminLayout 
        title="Gestión de Usuarios"
        subtitle="Cargando usuarios..."
      >
        <div className="flex items-center justify-center h-64">
          <div className="text-white">🔄 Cargando usuarios...</div>
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout 
        title="Gestión de Usuarios"
        subtitle="Error al cargar usuarios"
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
        title="Gestión de Usuarios"
        subtitle="Sin datos disponibles"
      >
        <div className="text-white/60">No hay datos disponibles</div>
      </AdminLayout>
    );
  }

  const { users, stats } = data;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Activo":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "Pendiente":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "Suspendido":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  return (
    <AdminLayout 
      title="Gestión de Usuarios"
      subtitle={`${stats.total} usuarios registrados`}
    >
      {/* Search and Filters */}
      <div className="bg-[#1A1A1A] rounded-[24px] p-6 border border-white/10 mb-6">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          {/* Search */}
          <div className="flex-1">
            <input
              type="text"
              placeholder="Buscar por nombre o email..."
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
            <option value="Activo">Activos</option>
            <option value="Pendiente">Pendientes</option>
            <option value="Suspendido">Suspendidos</option>
          </select>
          
          {/* Role Filter */}
          <select
            value={roleFilter}
            onChange={(e) => handleRoleFilter(e.target.value)}
            className="px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Todos los roles</option>
            <option value="USER">Usuarios</option>
            <option value="ADMIN">Administradores</option>
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
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-[#1A1A1A] rounded-[24px] p-6 border border-white/10">
          <h3 className="text-white/80 text-sm font-medium mb-2">Total Usuarios</h3>
          <p className="text-3xl font-bold text-white">{stats.total}</p>
        </div>
        <div className="bg-[#1A1A1A] rounded-[24px] p-6 border border-white/10">
          <h3 className="text-white/80 text-sm font-medium mb-2">Activos</h3>
          <p className="text-3xl font-bold text-green-400">{stats.active}</p>
        </div>
        <div className="bg-[#1A1A1A] rounded-[24px] p-6 border border-white/10">
          <h3 className="text-white/80 text-sm font-medium mb-2">Pendientes</h3>
          <p className="text-3xl font-bold text-yellow-400">{stats.pending}</p>
        </div>
        <div className="bg-[#1A1A1A] rounded-[24px] p-6 border border-white/10">
          <h3 className="text-white/80 text-sm font-medium mb-2">Suspendidos</h3>
          <p className="text-3xl font-bold text-red-400">{stats.suspended}</p>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-[#1A1A1A] rounded-[24px] p-6 border border-white/10">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-white font-bold text-lg">Lista de Usuarios</h3>
          <SmoothMagneticButton 
            onClick={() => setShowCreateModal(true)}
            className="px-4 py-2 text-sm text-white font-medium bg-red-600/20 border border-red-500/30 hover:bg-red-600/30 transition-colors"
          >
            Agregar Usuario
          </SmoothMagneticButton>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left text-white/80 font-medium py-3 px-4">Usuario</th>
                <th className="text-left text-white/80 font-medium py-3 px-4">Plan</th>
                <th className="text-left text-white/80 font-medium py-3 px-4">Estado</th>
                <th className="text-left text-white/80 font-medium py-3 px-4">Proyectos</th>
                <th className="text-left text-white/80 font-medium py-3 px-4">Registro</th>
                <th className="text-left text-white/80 font-medium py-3 px-4">Último Login</th>
                <th className="text-left text-white/80 font-medium py-3 px-4">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="py-4 px-4">
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
                        <p className="text-white/40 text-xs">
                          Suscripción: {user.subscriptionStatus || 'Sin suscripción'}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-400">
                      {user.plan}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(user.status)}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-white font-medium">{user.projects}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-white/60 text-sm">{user.joinDate}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-white/60 text-sm">{user.lastLogin}</span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <button className="p-1 text-white/60 hover:text-white transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                      </button>
                      <button className="p-1 text-white/60 hover:text-red-400 transition-colors">
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
              Página {stats.currentPage} de {stats.totalPages} - {stats.total} usuarios total
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
      </div>

      {/* Create User Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-[#1A1A1A] rounded-[24px] p-6 border border-white/10 w-full max-w-md">
            <h3 className="text-white font-bold text-lg mb-4">Crear Nuevo Usuario</h3>
            
            <div className="space-y-4">
              <div>
                <label className="text-white/80 text-sm block mb-2">Nombre completo</label>
                <input
                  type="text"
                  value={newUser.name}
                  onChange={(e) => setNewUser(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ej: Juan Pérez"
                />
              </div>
              
              <div>
                <label className="text-white/80 text-sm block mb-2">Email</label>
                <input
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ej: juan@empresa.com"
                />
              </div>
              
              <div>
                <label className="text-white/80 text-sm block mb-2">Rol</label>
                <select
                  value={newUser.role}
                  onChange={(e) => setNewUser(prev => ({ ...prev, role: e.target.value }))}
                  className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="USER">Usuario</option>
                  <option value="ADMIN">Administrador</option>
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
                onClick={handleCreateUser}
                className="flex-1 px-4 py-2 text-white bg-blue-600/20 border border-blue-500/30 hover:bg-blue-600/30"
              >
                Crear Usuario
              </SmoothMagneticButton>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}