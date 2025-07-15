"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import AnimatedInput from "@/components/AnimatedInput"
import SmoothMagneticButton from "@/components/SmoothMagneticButton"

export default function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    password: "",
    confirmPassword: ""
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    if (formData.password !== formData.confirmPassword) {
      setError("Las contraseñas no coinciden")
      setLoading(false)
      return
    }

    try {
      // Por ahora, simulamos el registro exitoso
      // Después implementaremos la API de registro real
      console.log("Registrando usuario:", formData)
      
      // Redirigir al login después del registro
      router.push("/auth/signin?message=Registro exitoso, ahora puedes iniciar sesión")
    } catch (error) {
      setError("Error al crear la cuenta")
    }

    setLoading(false)
  }

  const handleGoogleSignUp = () => {
    signIn("google", { callbackUrl: "/dashboard" })
  }

  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }))
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        <div className="bg-[#1A1A1A] rounded-2xl p-8 border border-gray-800">
          {/* Logo */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-white mb-2">NovaLabs</h1>
            <p className="text-gray-400">Crea tu cuenta y comienza</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 mb-6">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          {/* Google Sign Up */}
          <button
            onClick={handleGoogleSignUp}
            className="w-full mb-6 bg-white hover:bg-gray-100 text-black py-4 px-6 rounded-lg transition-colors flex items-center justify-center gap-3 font-space-grotesk font-semibold text-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continuar con Google
          </button>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-[#1A1A1A] text-gray-400">O regístrate con email</span>
            </div>
          </div>

          {/* Registration Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <AnimatedInput
              type="text"
              placeholder="Nombre completo"
              value={formData.name}
              onChange={handleInputChange("name")}
              required
            />

            <AnimatedInput
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange("email")}
              required
            />

            <AnimatedInput
              type="tel"
              placeholder="Teléfono (opcional)"
              value={formData.phone}
              onChange={handleInputChange("phone")}
            />

            <AnimatedInput
              type="text"
              placeholder="Empresa (opcional)"
              value={formData.company}
              onChange={handleInputChange("company")}
            />

            <AnimatedInput
              type="password"
              placeholder="Contraseña"
              value={formData.password}
              onChange={handleInputChange("password")}
              required
            />

            <AnimatedInput
              type="password"
              placeholder="Confirmar contraseña"
              value={formData.confirmPassword}
              onChange={handleInputChange("confirmPassword")}
              required
            />

            <SmoothMagneticButton
              type="submit"
              disabled={loading}
              className="w-full px-8 py-4 font-space-grotesk font-semibold text-lg hover:shadow-2xl hover:shadow-blue-500/40 transition-shadow duration-300 shadow-xl shadow-blue-600/30 flex items-center justify-center"
              magneticStrength={0.2}
            >
              {loading ? "Creando cuenta..." : "Crear Cuenta"}
            </SmoothMagneticButton>
          </form>

          {/* Terms */}
          <p className="text-xs text-gray-500 mt-4 text-center">
            Al registrarte, aceptas nuestros{" "}
            <Link href="/terms" className="text-blue-400 hover:text-blue-300">
              Términos de Servicio
            </Link>{" "}
            y{" "}
            <Link href="/privacy" className="text-blue-400 hover:text-blue-300">
              Política de Privacidad
            </Link>
          </p>

          {/* Sign In Link */}
          <p className="text-center text-gray-400 mt-6">
            ¿Ya tienes cuenta?{" "}
            <Link href="/auth/signin" className="text-blue-400 hover:text-blue-300 transition-colors">
              Iniciar sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}