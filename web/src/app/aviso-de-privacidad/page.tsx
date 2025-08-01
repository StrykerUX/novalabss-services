import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Aviso de Privacidad | NovaLabs',
  description: 'Aviso de privacidad de NovaLabs. Conoce cómo recopilamos, utilizamos y protegemos tu información personal.',
  robots: 'index, follow',
};

export default function AvisoDePrivacidad() {
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
              <span className="text-white/90">Aviso de Privacidad</span>
            </li>
          </ol>
        </nav>

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl lg:text-5xl font-black mb-6 bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
            Aviso de Privacidad
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
          
          {/* Introducción */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[#0147FF] mb-4">Introducción</h2>
            <p className="text-white/90 leading-relaxed mb-4">
              En <strong>NovaLabs</strong> ("nosotros", "nuestro" o "la empresa"), nos comprometemos a proteger 
              tu privacidad y manejar tu información personal de manera responsable. Este aviso de privacidad 
              explica cómo recopilamos, utilizamos, compartimos y protegemos tu información cuando utilizas 
              nuestros servicios de desarrollo web y marketing digital.
            </p>
          </section>

          {/* Responsable del tratamiento */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[#0147FF] mb-4">Responsable del tratamiento de datos</h2>
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <div className="space-y-3">
                <p className="text-white/90"><strong>Razón social:</strong> NovaLabs</p>
                <p className="text-white/90"><strong>Domicilio:</strong> Ciudad de México, México</p>
                <p className="text-white/90"><strong>Email:</strong> hola@novalabss.com</p>
                <p className="text-white/90"><strong>Teléfono:</strong> +52 55 1234 5678</p>
              </div>
            </div>
          </section>

          {/* Información que recopilamos */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[#0147FF] mb-6">¿Qué información recopilamos?</h2>
            
            <div className="space-y-8">
              {/* Información personal */}
              <div className="border border-white/10 rounded-2xl p-6 bg-white/5">
                <h3 className="text-xl font-semibold text-white mb-3">👤 Información Personal</h3>
                <p className="text-white/80 mb-3">
                  Información que nos proporcionas directamente:
                </p>
                <ul className="list-disc list-inside text-white/70 space-y-1">
                  <li>Nombre completo</li>
                  <li>Dirección de correo electrónico</li>
                  <li>Número de teléfono</li>
                  <li>Información de la empresa</li>
                  <li>Información del proyecto</li>
                  <li>Dirección postal (si aplica)</li>
                </ul>
              </div>

              {/* Información técnica */}
              <div className="border border-white/10 rounded-2xl p-6 bg-white/5">
                <h3 className="text-xl font-semibold text-white mb-3">💻 Información Técnica</h3>
                <p className="text-white/80 mb-3">
                  Información recopilada automáticamente:
                </p>
                <ul className="list-disc list-inside text-white/70 space-y-1">
                  <li>Dirección IP</li>
                  <li>Tipo de navegador y versión</li>
                  <li>Sistema operativo</li>
                  <li>Páginas visitadas y tiempo de permanencia</li>
                  <li>Ubicación geográfica aproximada</li>
                  <li>Cookies y tecnologías similares</li>
                </ul>
              </div>

              {/* Información de pagos */}
              <div className="border border-white/10 rounded-2xl p-6 bg-white/5">
                <h3 className="text-xl font-semibold text-white mb-3">💳 Información de Pagos</h3>
                <p className="text-white/80 mb-3">
                  Procesada de forma segura por terceros autorizados:
                </p>
                <ul className="list-disc list-inside text-white/70 space-y-1">
                  <li>Información de tarjetas de crédito/débito (procesada por Stripe)</li>
                  <li>Datos de facturación</li>
                  <li>Historial de transacciones</li>
                  <li>Estados de suscripción</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Finalidades del tratamiento */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[#0147FF] mb-4">¿Para qué utilizamos tu información?</h2>
            <p className="text-white/90 leading-relaxed mb-6">
              Utilizamos tu información personal para las siguientes finalidades:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border border-white/10 rounded-xl p-4 bg-white/3">
                <h4 className="font-semibold text-white mb-2">🎯 Servicios principales</h4>
                <p className="text-white/70 text-sm">Proveer servicios de desarrollo web y marketing digital</p>
              </div>
              <div className="border border-white/10 rounded-xl p-4 bg-white/3">
                <h4 className="font-semibold text-white mb-2">📞 Comunicación</h4>
                <p className="text-white/70 text-sm">Responder consultas y brindar soporte técnico</p>
              </div>
              <div className="border border-white/10 rounded-xl p-4 bg-white/3">
                <h4 className="font-semibold text-white mb-2">💰 Facturación</h4>
                <p className="text-white/70 text-sm">Procesar pagos y gestionar suscripciones</p>
              </div>
              <div className="border border-white/10 rounded-xl p-4 bg-white/3">
                <h4 className="font-semibold text-white mb-2">📊 Mejoras</h4>
                <p className="text-white/70 text-sm">Analizar uso del sitio y mejorar servicios</p>
              </div>
              <div className="border border-white/10 rounded-xl p-4 bg-white/3">
                <h4 className="font-semibold text-white mb-2">📧 Marketing</h4>
                <p className="text-white/70 text-sm">Enviar ofertas y contenido relevante (con tu consentimiento)</p>
              </div>
              <div className="border border-white/10 rounded-xl p-4 bg-white/3">
                <h4 className="font-semibold text-white mb-2">⚖️ Legal</h4>
                <p className="text-white/70 text-sm">Cumplir con obligaciones legales y fiscales</p>
              </div>
            </div>
          </section>

          {/* Compartir información */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[#0147FF] mb-4">¿Con quién compartimos tu información?</h2>
            <p className="text-white/90 leading-relaxed mb-6">
              Compartimos tu información únicamente en las siguientes circunstancias:
            </p>
            
            <div className="space-y-4">
              <div className="border-l-4 border-[#0147FF] pl-6 py-2">
                <h4 className="font-semibold text-white mb-2">🔧 Proveedores de servicios</h4>
                <p className="text-white/80 text-sm">
                  Stripe (pagos), Google Analytics (análisis), servicios de hosting y email.
                </p>
              </div>
              
              <div className="border-l-4 border-[#0147FF] pl-6 py-2">
                <h4 className="font-semibold text-white mb-2">⚖️ Requerimientos legales</h4>
                <p className="text-white/80 text-sm">
                  Cuando sea requerido por ley, orden judicial o autoridades competentes.
                </p>
              </div>
              
              <div className="border-l-4 border-[#0147FF] pl-6 py-2">
                <h4 className="font-semibold text-white mb-2">🤝 Con tu consentimiento</h4>
                <p className="text-white/80 text-sm">
                  En cualquier otra circunstancia con tu autorización explícita.
                </p>
              </div>
            </div>
          </section>

          {/* Seguridad */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[#0147FF] mb-4">¿Cómo protegemos tu información?</h2>
            <p className="text-white/90 leading-relaxed mb-6">
              Implementamos medidas de seguridad técnicas, físicas y administrativas para proteger tu información:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-white/10 rounded-xl p-6 bg-white/3">
                <h4 className="font-semibold text-white mb-3">🔒 Encriptación</h4>
                <p className="text-white/80 text-sm">
                  Todos los datos se transmiten usando encriptación SSL/TLS y se almacenan de forma segura.
                </p>
              </div>
              <div className="border border-white/10 rounded-xl p-6 bg-white/3">
                <h4 className="font-semibold text-white mb-3">🛡️ Acceso restringido</h4>
                <p className="text-white/80 text-sm">
                  Solo personal autorizado tiene acceso a tu información personal.
                </p>
              </div>
              <div className="border border-white/10 rounded-xl p-6 bg-white/3">
                <h4 className="font-semibold text-white mb-3">🔄 Respaldos seguros</h4>
                <p className="text-white/80 text-sm">
                  Realizamos respaldos regulares con medidas de seguridad apropiadas.
                </p>
              </div>
              <div className="border border-white/10 rounded-xl p-6 bg-white/3">
                <h4 className="font-semibold text-white mb-3">👥 Capacitación</h4>
                <p className="text-white/80 text-sm">
                  Nuestro equipo está capacitado en mejores prácticas de privacidad.
                </p>
              </div>
            </div>
          </section>

          {/* Derechos del titular */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[#0147FF] mb-4">Tus derechos</h2>
            <p className="text-white/90 leading-relaxed mb-6">
              Tienes derecho a ejercer los siguientes derechos sobre tu información personal:
            </p>
            
            <div className="space-y-4">
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <h4 className="font-semibold text-white mb-2">📄 Acceso</h4>
                <p className="text-white/80 text-sm">Conocer qué datos personales tenemos sobre ti</p>
              </div>
              
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <h4 className="font-semibold text-white mb-2">✏️ Rectificación</h4>
                <p className="text-white/80 text-sm">Solicitar la corrección de datos inexactos o incompletos</p>
              </div>
              
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <h4 className="font-semibold text-white mb-2">🗑️ Cancelación</h4>
                <p className="text-white/80 text-sm">Solicitar la eliminación de tus datos personales</p>
              </div>
              
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <h4 className="font-semibold text-white mb-2">🚫 Oposición</h4>
                <p className="text-white/80 text-sm">Oponerte al tratamiento de tus datos para fines específicos</p>
              </div>
            </div>
          </section>

          {/* Retención de datos */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[#0147FF] mb-4">¿Por cuánto tiempo conservamos tu información?</h2>
            <p className="text-white/90 leading-relaxed mb-6">
              Conservamos tu información personal durante los siguientes períodos:
            </p>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center p-4 bg-white/5 border border-white/10 rounded-xl">
                <span className="text-white/90">Datos de cuenta activa</span>
                <span className="text-[#0147FF] font-semibold">Mientras mantengas tu cuenta</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-white/5 border border-white/10 rounded-xl">
                <span className="text-white/90">Datos de proyectos</span>
                <span className="text-[#0147FF] font-semibold">5 años después del proyecto</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-white/5 border border-white/10 rounded-xl">
                <span className="text-white/90">Datos fiscales</span>
                <span className="text-[#0147FF] font-semibold">10 años (obligación legal)</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-white/5 border border-white/10 rounded-xl">
                <span className="text-white/90">Datos de marketing</span>
                <span className="text-[#0147FF] font-semibold">Hasta que retires tu consentimiento</span>
              </div>
            </div>
          </section>

          {/* Transferencias internacionales */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[#0147FF] mb-4">Transferencias internacionales</h2>
            <p className="text-white/90 leading-relaxed mb-4">
              Algunos de nuestros proveedores de servicios pueden estar ubicados fuera de México, 
              incluyendo Estados Unidos (Google, Stripe). Estas transferencias se realizan bajo 
              medidas de seguridad apropiadas y marcos legales adecuados.
            </p>
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4">
              <p className="text-yellow-200 text-sm">
                <strong>Nota:</strong> Estos proveedores cumplen con estándares internacionales 
                de protección de datos como GDPR y Privacy Shield.
              </p>
            </div>
          </section>

          {/* Cookies */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[#0147FF] mb-4">Uso de cookies</h2>
            <p className="text-white/90 leading-relaxed mb-4">
              Utilizamos cookies y tecnologías similares para mejorar tu experiencia. 
              Para más información detallada, consulta nuestra{' '}
              <a href="/politica-de-cookies" className="text-[#0147FF] hover:text-white transition-colors duration-300">
                Política de Cookies
              </a>.
            </p>
          </section>

          {/* Menores de edad */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[#0147FF] mb-4">Menores de edad</h2>
            <p className="text-white/90 leading-relaxed">
              Nuestros servicios están dirigidos a personas mayores de 18 años. No recopilamos 
              intencionalmente información personal de menores de edad. Si tienes conocimiento 
              de que un menor nos ha proporcionado información personal, por favor contáctanos 
              para que podamos eliminar dicha información.
            </p>
          </section>

          {/* Cambios al aviso */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[#0147FF] mb-4">Cambios a este aviso</h2>
            <p className="text-white/90 leading-relaxed mb-4">
              Nos reservamos el derecho de actualizar este aviso de privacidad en cualquier momento. 
              Los cambios importantes serán notificados por email o mediante un aviso prominente 
              en nuestro sitio web.
            </p>
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
              <p className="text-blue-200 text-sm">
                Te recomendamos revisar este aviso periódicamente para mantenerte informado 
                sobre cómo protegemos tu información.
              </p>
            </div>
          </section>

          {/* Contacto */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[#0147FF] mb-4">Contacto y ejercicio de derechos</h2>
            <p className="text-white/90 leading-relaxed mb-4">
              Para ejercer tus derechos, hacer preguntas sobre este aviso o presentar quejas:
            </p>
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <div className="space-y-3">
                <p className="text-white/90"><strong>Email:</strong> hola@novalabss.com</p>
                <p className="text-white/90"><strong>Asunto:</strong> "Ejercicio de Derechos ARCO" o "Privacidad"</p>
                <p className="text-white/90"><strong>Horario de atención:</strong> Lunes a Viernes, 10:00 AM - 8:00 PM (GMT-6)</p>
                <p className="text-white/90"><strong>Tiempo de respuesta:</strong> Máximo 20 días hábiles</p>
              </div>
            </div>
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