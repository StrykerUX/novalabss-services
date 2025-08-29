import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Política de Cookies | NovaLabs',
  description: 'Información sobre el uso de cookies en NovaLabs. Conoce qué cookies utilizamos y cómo puedes gestionarlas.',
  robots: 'index, follow',
};

export default function PoliticaDeCookies() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header spacing */}
      <div className="pt-24"></div>
      
      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Breadcrumbs */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm">
            <li>
              <a 
                href="/" 
                className="text-white/60 hover:text-[#0147FF] transition-colors duration-300 flex items-center"
              >
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
                Inicio
              </a>
            </li>
            <li>
              <svg className="w-4 h-4 text-white/40" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </li>
            <li>
              <span className="text-white/90">Política de Cookies</span>
            </li>
          </ol>
        </nav>

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl lg:text-5xl font-black mb-6 bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
            Política de Cookies
          </h1>
          <p className="text-white/80 text-lg">
            Última actualización: {new Date().toLocaleDateString('es-MX', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-invert prose-lg max-w-none">
          
          {/* ¿Qué son las cookies? */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[#0147FF] mb-4">¿Qué son las cookies?</h2>
            <p className="text-white/90 leading-relaxed mb-4">
              Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo cuando visitas nuestro sitio web. 
              Estas cookies nos ayudan a mejorar tu experiencia de navegación, recordar tus preferencias y analizar cómo 
              interactúas con nuestros servicios.
            </p>
          </section>

          {/* Tipos de cookies que utilizamos */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[#0147FF] mb-6">Tipos de cookies que utilizamos</h2>
            
            <div className="space-y-8">
              {/* Cookies esenciales */}
              <div className="border border-white/10 rounded-2xl p-6 bg-white/5">
                <h3 className="text-xl font-semibold text-white mb-3">🔒 Cookies Esenciales</h3>
                <p className="text-white/80 mb-3">
                  Son necesarias para el funcionamiento básico del sitio web. Sin estas cookies, 
                  algunas funciones no estarían disponibles.
                </p>
                <ul className="list-disc list-inside text-white/70 space-y-1">
                  <li>Autenticación de usuario</li>
                  <li>Seguridad de la sesión</li>
                  <li>Carrito de compras</li>
                  <li>Preferencias de idioma</li>
                </ul>
              </div>

              {/* Cookies de rendimiento */}
              <div className="border border-white/10 rounded-2xl p-6 bg-white/5">
                <h3 className="text-xl font-semibold text-white mb-3">📊 Cookies de Rendimiento</h3>
                <p className="text-white/80 mb-3">
                  Nos ayudan a entender cómo los visitantes interactúan con nuestro sitio web, 
                  recopilando información de forma anónima.
                </p>
                <ul className="list-disc list-inside text-white/70 space-y-1">
                  <li>Google Analytics</li>
                  <li>Métricas de velocidad de carga</li>
                  <li>Páginas más visitadas</li>
                  <li>Tiempo de permanencia</li>
                </ul>
              </div>

              {/* Cookies de funcionalidad */}
              <div className="border border-white/10 rounded-2xl p-6 bg-white/5">
                <h3 className="text-xl font-semibold text-white mb-3">⚙️ Cookies de Funcionalidad</h3>
                <p className="text-white/80 mb-3">
                  Permiten que el sitio web recuerde las elecciones que haces y proporcionen 
                  funciones mejoradas y más personales.
                </p>
                <ul className="list-disc list-inside text-white/70 space-y-1">
                  <li>Preferencias de usuario</li>
                  <li>Configuración de tema</li>
                  <li>Formularios autocompletados</li>
                  <li>Historial de navegación</li>
                </ul>
              </div>

              {/* Cookies de marketing */}
              <div className="border border-white/10 rounded-2xl p-6 bg-white/5">
                <h3 className="text-xl font-semibold text-white mb-3">🎯 Cookies de Marketing</h3>
                <p className="text-white/80 mb-3">
                  Se utilizan para mostrar anuncios que son relevantes para ti y para medir 
                  la efectividad de nuestras campañas publicitarias.
                </p>
                <ul className="list-disc list-inside text-white/70 space-y-1">
                  <li>Facebook Pixel</li>
                  <li>Google Ads</li>
                  <li>Remarketing</li>
                  <li>Análisis de conversiones</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Cookies de terceros */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[#0147FF] mb-4">Cookies de terceros</h2>
            <p className="text-white/90 leading-relaxed mb-6">
              Utilizamos servicios de terceros que pueden establecer sus propias cookies:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border border-white/10 rounded-xl p-4 bg-white/3">
                <h4 className="font-semibold text-white mb-2">Google Analytics</h4>
                <p className="text-white/70 text-sm">Análisis de tráfico web</p>
              </div>
              <div className="border border-white/10 rounded-xl p-4 bg-white/3">
                <h4 className="font-semibold text-white mb-2">Stripe</h4>
                <p className="text-white/70 text-sm">Procesamiento de pagos</p>
              </div>
              <div className="border border-white/10 rounded-xl p-4 bg-white/3">
                <h4 className="font-semibold text-white mb-2">Next.js</h4>
                <p className="text-white/70 text-sm">Optimización del sitio</p>
              </div>
              <div className="border border-white/10 rounded-xl p-4 bg-white/3">
                <h4 className="font-semibold text-white mb-2">Vercel</h4>
                <p className="text-white/70 text-sm">Hosting y analytics</p>
              </div>
            </div>
          </section>

          {/* Gestión de cookies */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[#0147FF] mb-4">¿Cómo gestionar las cookies?</h2>
            <p className="text-white/90 leading-relaxed mb-6">
              Tienes el control total sobre las cookies. Puedes gestionarlas de las siguientes maneras:
            </p>
            
            <div className="space-y-4">
              <div className="border-l-4 border-[#0147FF] pl-6 py-2">
                <h4 className="font-semibold text-white mb-2">Configuración del navegador</h4>
                <p className="text-white/80 text-sm">
                  Puedes configurar tu navegador para rechazar cookies o alertarte cuando se envíen cookies.
                </p>
              </div>
              
              <div className="border-l-4 border-[#0147FF] pl-6 py-2">
                <h4 className="font-semibold text-white mb-2">Eliminar cookies existentes</h4>
                <p className="text-white/80 text-sm">
                  Puedes eliminar las cookies que ya están almacenadas en tu dispositivo a través de la configuración de tu navegador.
                </p>
              </div>
              
              <div className="border-l-4 border-[#0147FF] pl-6 py-2">
                <h4 className="font-semibold text-white mb-2">Opt-out de cookies de terceros</h4>
                <p className="text-white/80 text-sm">
                  Puedes optar por no recibir cookies de terceros visitando sus páginas de opt-out específicas.
                </p>
              </div>
            </div>
          </section>

          {/* Duración de las cookies */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[#0147FF] mb-4">Duración de las cookies</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-white/10 rounded-xl p-6 bg-white/3">
                <h4 className="font-semibold text-white mb-3">🕐 Cookies de sesión</h4>
                <p className="text-white/80 text-sm">
                  Se eliminan automáticamente cuando cierras tu navegador.
                </p>
              </div>
              <div className="border border-white/10 rounded-xl p-6 bg-white/3">
                <h4 className="font-semibold text-white mb-3">📅 Cookies persistentes</h4>
                <p className="text-white/80 text-sm">
                  Permanecen en tu dispositivo durante un tiempo determinado (generalmente entre 30 días y 2 años).
                </p>
              </div>
            </div>
          </section>

          {/* Contacto */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[#0147FF] mb-4">Contacto</h2>
            <p className="text-white/90 leading-relaxed mb-4">
              Si tienes preguntas sobre nuestra política de cookies, puedes contactarnos:
            </p>
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <div className="space-y-2">
                <p className="text-white/90"><strong>Email:</strong> novalabss.app@gmail.com</p>
                <p className="text-white/90"><strong>Horario:</strong> Lunes a Viernes, 10:00 AM - 8:00 PM (GMT-6)</p>
                <p className="text-white/90"><strong>Ubicación:</strong> Ciudad de México, México</p>
              </div>
            </div>
          </section>

          {/* Cambios en la política */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[#0147FF] mb-4">Cambios en esta política</h2>
            <p className="text-white/90 leading-relaxed">
              Nos reservamos el derecho de actualizar esta política de cookies en cualquier momento. 
              Cualquier cambio será publicado en esta página con la fecha de la última actualización. 
              Te recomendamos revisar esta política periódicamente para estar informado sobre cómo utilizamos las cookies.
            </p>
          </section>

        </div>

        {/* Back button */}
        <div className="mt-16 pt-8 border-t border-white/10">
          <a 
            href="/" 
            className="inline-flex items-center space-x-2 text-[#0147FF] hover:text-white transition-colors duration-300"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Volver al inicio</span>
          </a>
        </div>
      </div>
    </div>
  );
}