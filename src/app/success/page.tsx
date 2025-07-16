"use client"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import SmoothMagneticButton from "@/components/SmoothMagneticButton"

export default function SuccessPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const sessionId = searchParams.get('session_id')
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const [autoLoginToken, setAutoLoginToken] = useState<string | null>(null)

  useEffect(() => {
    async function handleAutoLogin() {
      if (!sessionId) {
        console.log('❌ No session ID found')
        setLoading(false)
        return
      }

      try {
        console.log('🔍 Attempting auto-login for session:', sessionId)
        
        // Intentar obtener token de auto-login
        const response = await fetch(`/api/auth/get-login-token?sessionId=${sessionId}`)
        
        if (!response.ok) {
          console.log('❌ No auto-login token available')
          setLoading(false)
          return
        }
        
        const data = await response.json()
        
        if (data.success) {
          console.log('✅ Auto-login token obtained:', data.user.email)
          setUser(data.user)
          setAutoLoginToken(data.token)
          
          // TODO: Aquí podríamos hacer el login automático con NextAuth
          // await signIn('credentials', {
          //   email: data.user.email,
          //   autoLoginToken: data.token,
          //   redirect: false
          // })
          
        } else {
          console.log('❌ Auto-login failed:', data.error)
        }
        
      } catch (error) {
        console.error('❌ Auto-login error:', error)
      } finally {
        setLoading(false)
      }
    }

    // Pequeño delay para que el webhook procese primero
    const timer = setTimeout(handleAutoLogin, 3000)
    return () => clearTimeout(timer)
  }, [sessionId])

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Configurando tu cuenta...</p>
          <p className="text-gray-400 text-sm mt-2">Esto puede tomar unos segundos</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="max-w-md mx-auto text-center">
        
        {/* Checkmark animado */}
        <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        {/* Título principal */}
        <h1 className="text-3xl lg:text-4xl font-bold text-white mb-4" style={{textWrap: "pretty"}}>
          {user ? `¡Bienvenido, ${user.name || user.email}! 🎉` : '¡Pago Exitoso! 🎉'}
        </h1>

        {/* Descripción personalizada */}
        <p className="text-gray-300 text-lg mb-6" style={{textWrap: "pretty"}}>
          {user ? 
            `Tu ${user.plan === 'rocket' ? 'Plan Rocket' : 'Plan Galaxy'} está activo. ¡Comencemos a crear tu sitio web perfecto!` 
            : 'Tu suscripción ha sido activada correctamente. En breve recibirás un email con los siguientes pasos.'
          }
        </p>

        {/* Información del usuario */}
        {user && (
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-[24px] p-4 mb-6">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              <span className="text-green-400 font-semibold">Cuenta configurada automáticamente</span>
            </div>
            <p className="text-gray-300 text-sm">
              Plan: <span className="text-blue-400 font-semibold">{user.plan === 'rocket' ? 'Rocket' : 'Galaxy'}</span>
            </p>
            {user.source === 'warm-lead' && (
              <p className="text-gray-300 text-sm">
                Experiencia personalizada basada en tus respuestas 🎯
              </p>
            )}
          </div>
        )}

        {/* Información del session - solo si no hay user */}
        {!user && sessionId && (
          <div className="bg-gray-900/50 rounded-[24px] p-4 mb-6 border border-gray-800">
            <p className="text-gray-400 text-sm">
              ID de sesión: <span className="text-blue-400 font-mono">{sessionId.slice(0, 20)}...</span>
            </p>
          </div>
        )}

        {/* CTA Principal */}
        <div className="mb-8">
          <SmoothMagneticButton
            onClick={() => router.push('/onboarding')}
            className="w-full px-8 py-6 font-space-grotesk font-bold text-xl hover:shadow-2xl hover:shadow-blue-500/40 transition-shadow duration-300"
            magneticStrength={0.2}
          >
            <span>🚀 Comenzar mi sitio web</span>
          </SmoothMagneticButton>
          <p className="text-gray-400 text-sm mt-3">
            Te guiaremos paso a paso para crear tu sitio perfecto
          </p>
        </div>

        {/* Botones secundarios */}
        <div className="space-y-3">
          <button
            onClick={() => window.location.href = '/dashboard'}
            className="w-full px-6 py-3 bg-gray-800 text-white rounded-[24px] font-semibold hover:bg-gray-700 transition-colors"
          >
            Ir a mi dashboard
          </button>
          
          <button
            onClick={() => window.location.href = '/'}
            className="w-full px-6 py-3 border border-gray-600 text-gray-300 rounded-[24px] font-semibold hover:bg-gray-800 transition-colors"
          >
            Volver al inicio
          </button>
        </div>

        {/* Soporte */}
        <div className="mt-8 pt-6 border-t border-gray-800">
          <p className="text-gray-500 text-sm">
            ¿Tienes dudas? Contáctanos en{" "}
            <a href="mailto:soporte@novalabs.mx" className="text-blue-400 hover:underline">
              soporte@novalabs.mx
            </a>
          </p>
        </div>

      </div>
    </div>
  )
}