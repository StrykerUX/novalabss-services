"use client";

import AdminLayout from "@/components/AdminLayout";
import SmoothMagneticButton from "@/components/SmoothMagneticButton";

export default function AdminUsersPage() {
  // Datos simulados - después se conectará con la API real
  const users = [
    { 
      id: 1, 
      name: "Juan Pérez", 
      email: "juan@empresa.com", 
      role: "USER",
      plan: "Rocket", 
      status: "Activo", 
      joinDate: "2024-01-15",
      lastLogin: "2024-01-16",
      projects: 1
    },
    { 
      id: 2, 
      name: "María González", 
      email: "maria@startup.com", 
      role: "USER",
      plan: "Rocket", 
      status: "Activo", 
      joinDate: "2024-01-14",
      lastLogin: "2024-01-16",
      projects: 2
    },
    { 
      id: 3, 
      name: "Carlos Ruiz", 
      email: "carlos@negocio.com", 
      role: "USER",
      plan: "Rocket", 
      status: "Pendiente", 
      joinDate: "2024-01-13",
      lastLogin: "2024-01-15",
      projects: 0
    },
    { 
      id: 4, 
      name: "Ana Torres", 
      email: "ana@empresa.com", 
      role: "USER",
      plan: "Rocket", 
      status: "Suspendido", 
      joinDate: "2024-01-12",
      lastLogin: "2024-01-13",
      projects: 1
    },
  ];

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
      subtitle="Administra todos los usuarios de la plataforma"
    >
      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-[#1A1A1A] rounded-[24px] p-6 border border-white/10">
          <h3 className="text-white/80 text-sm font-medium mb-2">Total Usuarios</h3>
          <p className="text-3xl font-bold text-white">{users.length}</p>
        </div>
        <div className="bg-[#1A1A1A] rounded-[24px] p-6 border border-white/10">
          <h3 className="text-white/80 text-sm font-medium mb-2">Activos</h3>
          <p className="text-3xl font-bold text-green-400">{users.filter(u => u.status === 'Activo').length}</p>
        </div>
        <div className="bg-[#1A1A1A] rounded-[24px] p-6 border border-white/10">
          <h3 className="text-white/80 text-sm font-medium mb-2">Pendientes</h3>
          <p className="text-3xl font-bold text-yellow-400">{users.filter(u => u.status === 'Pendiente').length}</p>
        </div>
        <div className="bg-[#1A1A1A] rounded-[24px] p-6 border border-white/10">
          <h3 className="text-white/80 text-sm font-medium mb-2">Suspendidos</h3>
          <p className="text-3xl font-bold text-red-400">{users.filter(u => u.status === 'Suspendido').length}</p>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-[#1A1A1A] rounded-[24px] p-6 border border-white/10">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-white font-bold text-lg">Lista de Usuarios</h3>
          <SmoothMagneticButton className="px-4 py-2 text-sm text-white font-medium bg-red-600/20 border border-red-500/30 hover:bg-red-600/30 transition-colors">
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
      </div>
    </AdminLayout>
  );
}