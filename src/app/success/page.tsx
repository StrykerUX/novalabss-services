"use client"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { signIn } from "next-auth/react"
import SmoothMagneticButton from "@/components/SmoothMagneticButton"
import { useOnboardingState } from "@/hooks/useOnboardingState"

export default function SuccessPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const sessionId = searchParams.get('session_id')
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const [autoLoginToken, setAutoLoginToken] = useState<string | null>(null)
  const [showPasswordSetup, setShowPasswordSetup] = useState(false)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordLoading, setPasswordLoading] = useState(false)
  const [passwordError, setPasswordError] = useState('')
  const { resetOnboarding } = useOnboardingState()

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
          setShowPasswordSetup(true)
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

  // Limpiar error cuando las contraseñas coincidan
  useEffect(() => {
    if (passwordError === 'Las contraseñas no coinciden' && password && confirmPassword && password === confirmPassword) {
      setPasswordError('')
    }
  }, [password, confirmPassword, passwordError])

  const handlePasswordSetup = async (e: React.FormEvent) => {
    e.preventDefault()
    setPasswordError('')

    // Validaciones
    if (password.length < 8) {
      setPasswordError('La contraseña debe tener al menos 8 caracteres')
      return
    }

    if (password !== confirmPassword) {
      setPasswordError('Las contraseñas no coinciden')
      return
    }

    setPasswordLoading(true)

    try {
      const response = await fetch('/api/auth/setup-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          autoLoginToken,
          password,
          email: user.email
        })
      })

      const data = await response.json()

      if (data.success) {
        console.log('✅ Password establecida, iniciando sesión...')
        
        // Auto-login después de establecer password
        const signInResult = await signIn('credentials', {
          email: user.email,
          password: password,
          redirect: false
        })

        if (signInResult?.ok) {
          console.log('✅ Auto-login exitoso')
          // Reset onboarding y redirect
          resetOnboarding()
          router.push('/onboarding')
        } else {
          console.error('❌ Auto-login falló:', signInResult?.error)
          setPasswordError('Password establecida pero falló el login automático')
        }
      } else {
        setPasswordError(data.error || 'Error al establecer contraseña')
      }
    } catch (error) {
      console.error('❌ Error setting password:', error)
      setPasswordError('Error de conexión. Intenta de nuevo.')
    } finally {
      setPasswordLoading(false)
    }
  }

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
        {user && !showPasswordSetup && (
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

        {/* Setup de contraseña */}
        {showPasswordSetup && user && autoLoginToken && (
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-[24px] p-6 mb-6">
            <div className="text-center mb-4">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Establece tu contraseña
              </h3>
              <p className="text-gray-300 text-sm mb-1">
                Cuenta creada: <span className="text-blue-400 font-semibold">{user.email}</span>
              </p>
              <p className="text-gray-400 text-xs">
                Plan {user.plan === 'rocket' ? 'Rocket' : 'Galaxy'} activado
              </p>
            </div>

            <form onSubmit={handlePasswordSetup} className="space-y-4">
              {passwordError && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
                  <p className="text-red-400 text-sm">{passwordError}</p>
                </div>
              )}

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Nueva contraseña
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Mínimo 8 caracteres"
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                  required
                  minLength={8}
                />
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Confirmar contraseña
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Repite tu contraseña"
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={passwordLoading || !password || !confirmPassword}
                className="w-full px-6 py-3 bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-600 disabled:bg-gray-700 disabled:cursor-not-allowed transition-all flex items-center justify-center space-x-2"
              >
                {passwordLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Configurando...</span>
                  </>
                ) : (
                  <span>🔐 Establecer contraseña y continuar</span>
                )}
              </button>
            </form>

            <p className="text-gray-500 text-xs text-center mt-4">
              Úsala para acceder a tu cuenta
            </p>
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

        {/* CTA Principal - solo mostrar si no hay setup de password */}
        {!showPasswordSetup && (
          <div className="mb-8">
            <SmoothMagneticButton
              onClick={() => {
                resetOnboarding()
                router.push('/onboarding')
              }}
              className="w-full px-8 py-6 font-space-grotesk font-bold text-xl hover:shadow-2xl hover:shadow-blue-500/40 transition-shadow duration-300"
              magneticStrength={0.2}
            >
              <span>🚀 Comenzar mi sitio web</span>
            </SmoothMagneticButton>
            <p className="text-gray-400 text-sm mt-3">
              Te guiaremos paso a paso para crear tu sitio perfecto
            </p>
          </div>
        )}


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