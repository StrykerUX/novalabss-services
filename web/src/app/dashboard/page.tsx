"use client"

import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { useEffect } from "react"

export default function Dashboard() {
  const { data: session, status } = useSession()

  useEffect(() => {
    if (status === "loading") return // Esperar a que cargue
    
    if (!session) {
      redirect("/auth/signin")
    }
  }, [session, status])

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (!session) {
    return null // Evitar flash antes del redirect
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-[#1A1A1A] rounded-2xl p-8 border border-gray-800">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">
              ¡Bienvenido, {session.user?.name}!
            </h1>
            <p className="text-gray-400">
              Dashboard de NovaLabs - Tu cuenta está configurada
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-[#2A2A2A] rounded-lg p-6">
              <h3 className="text-white font-semibold mb-2">Proyectos Activos</h3>
              <p className="text-3xl font-bold text-blue-400">0</p>
              <p className="text-sm text-gray-400">En desarrollo</p>
            </div>
            
            <div className="bg-[#2A2A2A] rounded-lg p-6">
              <h3 className="text-white font-semibold mb-2">Plan Actual</h3>
              <p className="text-xl font-bold text-green-400">Gratuito</p>
              <p className="text-sm text-gray-400">Upgrade disponible</p>
            </div>
            
            <div className="bg-[#2A2A2A] rounded-lg p-6">
              <h3 className="text-white font-semibold mb-2">Créditos</h3>
              <p className="text-3xl font-bold text-purple-400">0</p>
              <p className="text-sm text-gray-400">Para modificaciones</p>
            </div>
          </div>

          {/* Action Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-blue-600/20 to-blue-800/20 rounded-lg p-6 border border-blue-500/20">
              <h3 className="text-xl font-bold text-white mb-3">
                ¡Comienza tu primer proyecto!
              </h3>
              <p className="text-gray-300 mb-4">
                Suscríbete a un plan y crea tu primer sitio web en 72 horas.
              </p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors">
                Ver Planes
              </button>
            </div>

            <div className="bg-gradient-to-br from-purple-600/20 to-purple-800/20 rounded-lg p-6 border border-purple-500/20">
              <h3 className="text-xl font-bold text-white mb-3">
                Configurar perfil
              </h3>
              <p className="text-gray-300 mb-4">
                Completa tu información para acelerar el proceso de onboarding.
              </p>
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors">
                Completar Perfil
              </button>
            </div>
          </div>

          {/* User Info */}
          <div className="mt-8 p-4 bg-[#2A2A2A] rounded-lg">
            <h4 className="text-white font-semibold mb-3">Información de la cuenta</h4>
            <div className="space-y-2 text-sm">
              <p className="text-gray-300">
                <span className="text-gray-400">Email:</span> {session.user?.email}
              </p>
              <p className="text-gray-300">
                <span className="text-gray-400">Nombre:</span> {session.user?.name}
              </p>
              <p className="text-gray-300">
                <span className="text-gray-400">ID de usuario:</span> {session.user?.id}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}