"use client"

import DashboardLayout from "@/components/DashboardLayout"

export default function ProfilePage() {
  return (
    <DashboardLayout 
      title="Configuración de Perfil" 
      subtitle="Administra tu información personal y preferencias"
    >
      <div className="max-w-4xl">
        <div className="bg-[#1A1A1A] rounded-[24px] p-8 border border-white/10">
          <h2 className="text-xl font-bold text-white mb-6 font-space-grotesk">
            Página en desarrollo
          </h2>
          <p className="text-white/60">
            Esta sección estará disponible próximamente para configurar tu perfil personal.
          </p>
        </div>
      </div>
    </DashboardLayout>
  )
}