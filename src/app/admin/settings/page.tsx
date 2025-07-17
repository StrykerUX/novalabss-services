"use client";

import AdminLayout from "@/components/AdminLayout";
import { useSession } from "next-auth/react";
import SmoothMagneticButton from "@/components/SmoothMagneticButton";
import { useState } from "react";

export default function AdminSettingsPage() {
  const { data: session } = useSession();
  const [newAdminEmail, setNewAdminEmail] = useState("");
  const [newAdminName, setNewAdminName] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  // Debug: mostrar información de la sesión
  console.log("Admin Settings - Session:", session);
  console.log("Admin Settings - Role:", session?.user?.role);

  // Lista actual de administradores autorizados
  const authorizedAdmins = [
    "abraham.stryker117@gmail.com",
    "admin@novalabs.com"
  ];

  const handleCreateAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const response = await fetch('/api/admin/create-admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: newAdminEmail,
          name: newAdminName
        })
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', text: 'Administrador creado exitosamente' });
        setNewAdminEmail("");
        setNewAdminName("");
      } else {
        setMessage({ type: 'error', text: data.error || 'Error al crear administrador' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Error de conexión' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout 
      title="Configuración"
      subtitle="Gestiona la configuración de la plataforma"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Administradores Autorizados */}
        <div className="bg-[#1A1A1A] rounded-[24px] p-6 border border-white/10">
          <h3 className="text-white font-bold text-lg mb-4">Administradores Autorizados</h3>
          <p className="text-white/60 text-sm mb-6">
            Solo estos emails pueden acceder como administradores
          </p>
          
          <div className="space-y-3">
            {authorizedAdmins.map((email, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-[12px] border border-white/10">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="text-white font-medium">{email}</span>
                </div>
                <span className="text-green-400 text-xs font-semibold bg-green-400/20 px-2 py-1 rounded-full">
                  Autorizado
                </span>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-[12px]">
            <div className="flex items-start space-x-3">
              <svg className="w-5 h-5 text-blue-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p className="text-blue-200 text-sm font-medium">Credenciales de acceso</p>
                <p className="text-blue-300/80 text-xs mt-1">
                  Contraseña temporal: <code className="bg-blue-900/50 px-2 py-0.5 rounded">NovaLabs2024!</code>
                </p>
                <p className="text-blue-300/60 text-xs mt-1">
                  Cambiar después del primer uso por seguridad
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Crear Nuevo Administrador */}
        <div className="bg-[#1A1A1A] rounded-[24px] p-6 border border-white/10">
          <h3 className="text-white font-bold text-lg mb-4">Agregar Administrador</h3>
          <p className="text-white/60 text-sm mb-6">
            Para agregar un nuevo admin, contacta al desarrollador para incluir el email en la lista autorizada.
          </p>

          {/* Instrucciones */}
          <div className="space-y-4">
            <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-[12px]">
              <h4 className="text-yellow-200 font-medium text-sm mb-2">📋 Proceso para agregar admin:</h4>
              <ol className="text-yellow-300/80 text-xs space-y-1 list-decimal list-inside">
                <li>Envía el email del nuevo admin al desarrollador</li>
                <li>El desarrollador agregará el email al código</li>
                <li>La persona podrá loguearse con la contraseña temporal</li>
                <li>El usuario admin se creará automáticamente</li>
              </ol>
            </div>

            <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-[12px]">
              <div className="flex items-start space-x-3">
                <svg className="w-5 h-5 text-red-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <div>
                  <p className="text-red-200 text-sm font-medium">Importante</p>
                  <p className="text-red-300/80 text-xs mt-1">
                    Solo emails pre-autorizados pueden ser administradores. Esto es por seguridad.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Información de contacto */}
          <div className="mt-6 p-4 bg-white/5 rounded-[12px] border border-white/10">
            <h4 className="text-white font-medium text-sm mb-2">👨‍💻 Contacto del desarrollador:</h4>
            <p className="text-white/60 text-xs">
              Para solicitar agregar un nuevo administrador, contacta al equipo de desarrollo.
            </p>
          </div>
        </div>
      </div>

      {/* Configuraciones adicionales */}
      <div className="mt-6 bg-[#1A1A1A] rounded-[24px] p-6 border border-white/10">
        <h3 className="text-white font-bold text-lg mb-4">Configuraciones de Seguridad</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-white/5 rounded-[12px] border border-white/10">
            <h4 className="text-white font-medium text-sm mb-2">Autenticación</h4>
            <p className="text-green-400 text-xs">✓ Protección por roles activa</p>
          </div>
          
          <div className="p-4 bg-white/5 rounded-[12px] border border-white/10">
            <h4 className="text-white font-medium text-sm mb-2">Rutas Admin</h4>
            <p className="text-green-400 text-xs">✓ Middleware de protección activo</p>
          </div>
          
          <div className="p-4 bg-white/5 rounded-[12px] border border-white/10">
            <h4 className="text-white font-medium text-sm mb-2">Base de Datos</h4>
            <p className="text-green-400 text-xs">✓ Roles implementados</p>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}