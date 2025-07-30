"use client"

import { useSession } from "next-auth/react"
import Link from "next/link"
import { useState, useEffect } from "react"
import SmoothMagneticButton from "./SmoothMagneticButton"

export default function Navigation() {
  const { data: session, status } = useSession()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('inicio')
  const [scrollOpacity, setScrollOpacity] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const newOpacity = Math.min(scrollTop / 100, 1)
      setScrollOpacity(newOpacity)
      setIsScrolled(scrollTop > 50)
      
      // Detectar sección activa
      const sections = ['inicio', 'planes', 'contacto']
      
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])


  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault()
    const targetElement = document.getElementById(targetId)
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
    // Close mobile menu if open
    setIsMenuOpen(false)
  }

  return (
    <nav className={`w-full sticky top-0 z-50 ${isScrolled ? 'py-0' : 'py-4'} transition-all duration-300`}>
      <div className="w-full max-w-[1780px] mx-auto px-[5%]">
        <div 
          className={`transition-all duration-500 ease-out ${isScrolled ? 'py-4 pl-6 pr-4 max-h-[80px] shadow-xl shadow-black/40' : ''}`}
          style={{
            backgroundColor: `rgba(26, 26, 26, ${scrollOpacity * 0.95})`,
            backdropFilter: `blur(${scrollOpacity * 20}px)`,
            borderRadius: isScrolled ? '0 0 48px 48px' : '0px'
          }}
        >
          <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center font-space-grotesk text-2xl font-bold text-white">
            <svg className="w-8 h-8 mr-3" viewBox="0 0 432 432" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="237.073" y="326.634" width="105.366" height="42.1463" rx="21.0731" transform="rotate(90 237.073 326.634)" fill="white"/>
              <rect x="105.366" y="237.073" width="105.366" height="42.1463" rx="21.0732" transform="rotate(180 105.366 237.073)" fill="white"/>
              <rect x="279.329" y="122.869" width="105.366" height="42.1463" rx="21.0732" transform="rotate(-45 279.329 122.869)" fill="white"/>
              <rect x="326.634" y="194.927" width="105.366" height="42.1463" rx="21.0732" fill="white"/>
              <rect x="148.946" y="305.405" width="63.2195" height="31.6097" rx="15.8049" transform="rotate(135 148.946 305.405)" fill="white"/>
              <path d="M137.77 137.769C129.54 129.54 116.034 129.46 109.22 138.896C94.2908 159.572 85.5921 184.276 84.4272 210.054C82.9432 242.895 93.7946 275.104 114.849 300.352C135.904 325.599 165.639 342.06 198.212 346.5C230.786 350.94 263.842 343.038 290.885 324.346C317.929 305.655 337.005 277.525 344.364 245.485C351.724 213.445 346.835 179.811 330.659 151.191C314.483 122.572 288.188 101.037 256.943 90.8176C232.417 82.7961 206.232 82.2017 181.614 88.8599C170.379 91.8984 165.68 104.561 170.47 115.169C175.259 125.776 187.756 130.215 199.187 128.031C213.963 125.207 229.329 126.129 243.841 130.876C265.088 137.825 282.968 152.469 293.968 171.93C304.968 191.391 308.292 214.262 303.288 236.05C298.283 257.837 285.312 276.965 266.922 289.675C248.532 302.386 226.054 307.759 203.904 304.74C181.755 301.721 161.534 290.527 147.217 273.359C132.9 256.191 125.521 234.289 126.531 211.957C127.22 196.704 131.788 182.003 139.652 169.18C145.736 159.258 146 145.999 137.77 137.769Z" fill="white"/>
              <path d="M216 184.39C216.749 184.39 217.493 184.416 218.23 184.467C222.885 184.791 223.902 191.218 223.902 195.884C223.902 202.232 229.048 207.379 235.396 207.379C240.25 207.379 247.022 208.205 247.472 213.039C247.563 214.013 247.609 215.001 247.609 215.999C247.609 233.457 233.457 247.609 216 247.609C198.542 247.609 184.39 233.457 184.39 215.999C184.39 198.541 198.542 184.39 216 184.39Z" fill="white"/>
            </svg>
            NovaLabs
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex items-center space-x-6">
              <a 
                href="#inicio" 
                onClick={(e) => handleSmoothScroll(e, 'inicio')}
                className={`text-white/80 hover:text-white transition-all duration-300 relative group ${
                  activeSection === 'inicio' ? 'text-blue-400' : ''
                }`}
              >
                Inicio
                <div className={`absolute -bottom-1 left-0 h-0.5 bg-blue-400 rounded-full transition-all duration-300 ${
                  activeSection === 'inicio' ? 'w-full' : 'w-0 group-hover:w-full'
                }`}></div>
              </a>
              <a 
                href="#planes" 
                onClick={(e) => handleSmoothScroll(e, 'planes')}
                className={`text-white/80 hover:text-white transition-all duration-300 relative group ${
                  activeSection === 'planes' ? 'text-blue-400' : ''
                }`}
              >
                Planes
                <div className={`absolute -bottom-1 left-0 h-0.5 bg-blue-400 rounded-full transition-all duration-300 ${
                  activeSection === 'planes' ? 'w-full' : 'w-0 group-hover:w-full'
                }`}></div>
              </a>
              <a 
                href="#contacto" 
                onClick={(e) => handleSmoothScroll(e, 'contacto')}
                className={`text-white/80 hover:text-white transition-all duration-300 relative group ${
                  activeSection === 'contacto' ? 'text-blue-400' : ''
                }`}
              >
                Contacto
                <div className={`absolute -bottom-1 left-0 h-0.5 bg-blue-400 rounded-full transition-all duration-300 ${
                  activeSection === 'contacto' ? 'w-full' : 'w-0 group-hover:w-full'
                }`}></div>
              </a>
            </div>
            
            {/* Divisor visual */}
            <div className="hidden md:block w-px h-6 bg-white/20"></div>
            
            <div className="flex items-center space-x-4">
              {status === "loading" ? (
                <div className="animate-pulse bg-gray-700 h-8 w-24 rounded"></div>
              ) : session ? (
                <>
                  <span className="text-white/80 text-sm">
                    Hola, {session.user?.name?.split(' ')[0]}
                  </span>
                  <SmoothMagneticButton 
                    className="text-white px-4 py-2 font-space-grotesk font-semibold text-sm hover:shadow-lg hover:shadow-blue-500/40 transition-shadow duration-300 shadow-md shadow-blue-600/30"
                    magneticStrength={0.15}
                  >
                    <Link href="/dashboard">
                      Dashboard
                    </Link>
                  </SmoothMagneticButton>
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
          <div className="md:hidden mt-4 bg-[#1A1A1A] rounded-2xl p-6 border border-white/10 overflow-hidden">
            <div className="space-y-4">
              <a 
                href="#inicio" 
                onClick={(e) => handleSmoothScroll(e, 'inicio')}
                className={`block text-white/80 hover:text-white transition-all duration-300 py-2 transform hover:translate-x-2 relative ${
                  activeSection === 'inicio' ? 'text-blue-400 translate-x-2' : ''
                }`}
              >
                Inicio
                {activeSection === 'inicio' && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-blue-400 rounded-full"></div>
                )}
              </a>
              <a 
                href="#planes" 
                onClick={(e) => handleSmoothScroll(e, 'planes')}
                className={`block text-white/80 hover:text-white transition-all duration-300 py-2 transform hover:translate-x-2 relative ${
                  activeSection === 'planes' ? 'text-blue-400 translate-x-2' : ''
                }`}
              >
                Planes
                {activeSection === 'planes' && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-blue-400 rounded-full"></div>
                )}
              </a>
              <a 
                href="#contacto" 
                onClick={(e) => handleSmoothScroll(e, 'contacto')}
                className={`block text-white/80 hover:text-white transition-all duration-300 py-2 transform hover:translate-x-2 relative ${
                  activeSection === 'contacto' ? 'text-blue-400 translate-x-2' : ''
                }`}
              >
                Contacto
                {activeSection === 'contacto' && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-blue-400 rounded-full"></div>
                )}
              </a>
              
              <div className="border-t border-white/10 pt-4 mt-4">
                {status === "loading" ? (
                  <div className="animate-pulse bg-gray-700 h-8 w-24 rounded"></div>
                ) : session ? (
                  <>
                    <span className="block text-white/80 text-sm mb-3">
                      Hola, {session.user?.name?.split(' ')[0]}
                    </span>
                    <SmoothMagneticButton 
                      className="w-full text-white px-4 py-2 font-space-grotesk font-semibold text-sm hover:shadow-lg hover:shadow-blue-500/40 transition-shadow duration-300 shadow-md shadow-blue-600/30"
                      magneticStrength={0.15}
                    >
                      <Link 
                        href="/dashboard"
                        className="block w-full text-left"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Dashboard
                      </Link>
                    </SmoothMagneticButton>
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
      </div>
    </nav>
  );
}