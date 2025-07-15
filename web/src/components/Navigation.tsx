"use client"

import { useSession, signOut } from "next-auth/react"
import Link from "next/link"
import { useState } from "react"

export default function Navigation() {
  const { data: session, status } = useSession()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleSignOut = () => {
    signOut({ callbackUrl: "/" })
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <nav className="w-full py-4">
      <div className="w-full max-w-[1780px] mx-auto px-[5%]">
        <div className="flex justify-between items-center">
          <Link href="/" className="font-space-grotesk text-2xl font-bold text-white">
            NovaLabs
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex items-center space-x-6">
              <a href="#inicio" className="text-white/80 hover:text-white transition-colors">
                Inicio
              </a>
              <a href="#servicios" className="text-white/80 hover:text-white transition-colors">
                Servicios
              </a>
              <a href="#planes" className="text-white/80 hover:text-white transition-colors">
                Planes
              </a>
              <a href="#contacto" className="text-white/80 hover:text-white transition-colors">
                Contacto
              </a>
            </div>
            
            <div className="flex items-center space-x-4">
              {status === "loading" ? (
                <div className="animate-pulse bg-gray-700 h-8 w-24 rounded"></div>
              ) : session ? (
                <>
                  <span className="text-white/80 text-sm">
                    Hola, {session.user?.name?.split(' ')[0]}
                  </span>
                  <Link 
                    href="/dashboard"
                    className="px-4 py-2 text-white/80 hover:text-white transition-colors"
                  >
                    Dashboard
                  </Link>
                  <button 
                    onClick={handleSignOut}
                    className="px-4 py-2 text-white/80 hover:text-white transition-colors"
                  >
                    Cerrar Sesión
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    href="/auth/signin"
                    className="px-4 py-2 text-white/80 hover:text-white transition-colors"
                  >
                    Iniciar Sesión
                  </Link>
                  <Link 
                    href="/auth/signup"
                    className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors font-medium"
                  >
                    Comenzar
                  </Link>
                </>
              )}
            </div>
          </div>
          
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-white">
              {isMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 bg-[#1A1A1A] rounded-2xl p-6 border border-white/10">
            <div className="space-y-4">
              <a 
                href="#inicio" 
                className="block text-white/80 hover:text-white transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Inicio
              </a>
              <a 
                href="#servicios" 
                className="block text-white/80 hover:text-white transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Servicios
              </a>
              <a 
                href="#planes" 
                className="block text-white/80 hover:text-white transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Planes
              </a>
              <a 
                href="#contacto" 
                className="block text-white/80 hover:text-white transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Contacto
              </a>
              
              <div className="border-t border-white/10 pt-4 mt-4">
                {status === "loading" ? (
                  <div className="animate-pulse bg-gray-700 h-8 w-24 rounded"></div>
                ) : session ? (
                  <>
                    <span className="block text-white/80 text-sm mb-3">
                      Hola, {session.user?.name?.split(' ')[0]}
                    </span>
                    <Link 
                      href="/dashboard"
                      className="block px-4 py-2 text-white/80 hover:text-white transition-colors mb-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <button 
                      onClick={() => {
                        handleSignOut();
                        setIsMenuOpen(false);
                      }}
                      className="block px-4 py-2 text-white/80 hover:text-white transition-colors"
                    >
                      Cerrar Sesión
                    </button>
                  </>
                ) : (
                  <>
                    <Link 
                      href="/auth/signin"
                      className="block px-4 py-2 text-white/80 hover:text-white transition-colors mb-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Iniciar Sesión
                    </Link>
                    <Link 
                      href="/auth/signup"
                      className="block px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors font-medium text-center"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Comenzar
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}