export default function Navigation() {
  return (
    <nav className="w-full py-4">
      <div className="w-full max-w-[1780px] mx-auto px-[5%]">
        <div className="flex justify-between items-center">
          <div className="font-space-grotesk text-2xl font-bold text-white">
            NovaLabs
          </div>
          
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
              <button className="px-4 py-2 text-white/80 hover:text-white transition-colors">
                Iniciar Sesión
              </button>
              <button className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors font-medium">
                Comenzar
              </button>
            </div>
          </div>
          
          <div className="md:hidden">
            <button className="text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}