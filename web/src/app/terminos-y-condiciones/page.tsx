import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Términos y Condiciones | NovaLabss',
  description: 'Términos y condiciones de servicio de NovaLabss. Conoce las condiciones que rigen nuestros servicios de desarrollo web profesional.',
  robots: 'index, follow',
};

export default function TerminosYCondiciones() {
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
              <span className="text-white/90">Términos y Condiciones</span>
            </li>
          </ol>
        </nav>

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl lg:text-5xl font-black mb-6 bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
            Términos y Condiciones
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
            <h2 className="text-2xl font-bold text-[#0147FF] mb-4">Información General</h2>
            <p className="text-white/90 leading-relaxed mb-4">
              <strong>NovaLabss</strong> es una empresa mexicana dedicada al desarrollo de sitios web profesionales. 
              Al contratar nuestros servicios, aceptas estos términos y condiciones en su totalidad.
            </p>
            <p className="text-white/90 leading-relaxed">
              Estos términos constituyen un acuerdo legal entre tú (el "Cliente") y NovaLabss (la "Empresa") 
              y rigen el uso de nuestros servicios de desarrollo web.
            </p>
          </section>

          {/* Servicios ofrecidos */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[#0147FF] mb-6">Servicios Ofrecidos</h2>
            
            <div className="space-y-8">
              {/* Plan Rocket */}
              <div className="border border-[#0147FF]/30 rounded-2xl p-6 bg-[#0147FF]/10">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                  🚀 Plan Rocket - $1,799 MXN bimestrales
                </h3>
                <ul className="text-white/80 space-y-2">
                  <li className="flex items-center"><span className="text-green-400 mr-2">✓</span> 1 landing page profesional</li>
                  <li className="flex items-center"><span className="text-green-400 mr-2">✓</span> Entrega garantizada en 3 días laborales</li>
                  <li className="flex items-center"><span className="text-green-400 mr-2">✓</span> Optimización para Google (SEO)</li>
                  <li className="flex items-center"><span className="text-green-400 mr-2">✓</span> Analytics de rendimiento</li>
                  <li className="flex items-center"><span className="text-green-400 mr-2">✓</span> Versión optimizada para móvil</li>
                  <li className="flex items-center"><span className="text-green-400 mr-2">✓</span> Formulario de contacto</li>
                  <li className="flex items-center"><span className="text-green-400 mr-2">✓</span> Soporte continuo</li>
                  <li className="flex items-center"><span className="text-green-400 mr-2">✓</span> Hosting seguro incluido</li>
                </ul>
              </div>

              {/* Plan Galaxy */}
              <div className="border border-white/20 rounded-2xl p-6 bg-white/5">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                  🌌 Plan Galaxy - $2,999 MXN bimestrales
                </h3>
                <ul className="text-white/80 space-y-2">
                  <li className="flex items-center"><span className="text-green-400 mr-2">✓</span> Sitio completo de 3-5 páginas</li>
                  <li className="flex items-center"><span className="text-green-400 mr-2">✓</span> Entrega garantizada en 5 días laborales</li>
                  <li className="flex items-center"><span className="text-green-400 mr-2">✓</span> Optimización avanzada para Google (SEO)</li>
                  <li className="flex items-center"><span className="text-green-400 mr-2">✓</span> Analytics de rendimiento avanzado</li>
                  <li className="flex items-center"><span className="text-green-400 mr-2">✓</span> Versión optimizada para móvil</li>
                  <li className="flex items-center"><span className="text-green-400 mr-2">✓</span> Múltiples formularios de contacto</li>
                  <li className="flex items-center"><span className="text-green-400 mr-2">✓</span> Soporte prioritario continuo</li>
                  <li className="flex items-center"><span className="text-green-400 mr-2">✓</span> Hosting seguro incluido</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Tiempos de entrega */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[#0147FF] mb-4">Tiempos de Entrega y Garantías</h2>
            <p className="text-white/90 leading-relaxed mb-4">
              Los tiempos de entrega son <strong>días laborales</strong> (lunes a viernes, 
              excluyendo fines de semana y días festivos mexicanos).
            </p>
            
            <div className="border border-white/10 rounded-xl p-4 bg-white/3 max-w-md">
              <h4 className="font-semibold text-white mb-2">🏆 Garantía de calidad</h4>
              <p className="text-white/70 text-sm">Sitio web funcional, optimizado y según estándares profesionales</p>
            </div>
          </section>

          {/* Política sin reembolsos */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[#0147FF] mb-4">Pagos y Facturación</h2>
            
            <div className="bg-red-500/10 border border-red-400/30 rounded-2xl p-6 mb-6">
              <h3 className="text-lg font-bold text-red-200 mb-3 flex items-center">
                ⚠️ POLÍTICA SIN REEMBOLSOS
              </h3>
              <p className="text-white/80 mb-3">
                Al tratarse de servicios digitales personalizados, <strong>no se realizan devoluciones 
                de dinero</strong>. Esta política es estándar en la industria de desarrollo web.
              </p>
              <p className="text-white/70 text-sm">
                Una vez iniciado el proyecto, los pagos no son reembolsables. Nos comprometemos 
                a trabajar contigo hasta lograr un resultado satisfactorio.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border border-white/10 rounded-xl p-4 bg-white/3">
                <h4 className="font-semibold text-white mb-2">💳 Facturación bimestral</h4>
                <p className="text-white/70 text-sm">Los pagos se procesan cada 2 meses automáticamente</p>
              </div>
              <div className="border border-white/10 rounded-xl p-4 bg-white/3">
                <h4 className="font-semibold text-white mb-2">🔥 Promoción especial</h4>
                <p className="text-white/70 text-sm">33% de descuento en tu primer año para nuevos clientes</p>
              </div>
              <div className="border border-white/10 rounded-xl p-4 bg-white/3">
                <h4 className="font-semibold text-white mb-2">🔒 Pagos seguros</h4>
                <p className="text-white/70 text-sm">Procesados a través de Stripe con encriptación SSL</p>
              </div>
              <div className="border border-white/10 rounded-xl p-4 bg-white/3">
                <h4 className="font-semibold text-white mb-2">💰 Sin costos ocultos</h4>
                <p className="text-white/70 text-sm">El precio mostrado es el precio final</p>
              </div>
            </div>
          </section>

          {/* Política de revisiones detallada */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[#0147FF] mb-4">Política de Revisiones y Modificaciones</h2>
            
            <div className="bg-blue-500/10 border border-blue-400/30 rounded-2xl p-6 mb-6">
              <h3 className="text-lg font-bold text-blue-200 mb-4 flex items-center">
                📋 Proceso de Revisión Estructurado
              </h3>
              
              <div className="space-y-6">
                {/* Fase 1 */}
                <div className="border-l-4 border-blue-400 pl-6">
                  <h4 className="font-semibold text-white mb-2">Fase 1: Entrega Inicial</h4>
                  <ul className="text-white/80 text-sm space-y-1">
                    <li>• Se entregan las primeras <strong>2 secciones desarrolladas</strong> del proyecto</li>
                    <li>• El cliente tiene <strong>2 días hábiles</strong> para revisar y proporcionar feedback</li>
                    <li>• Derecho a <strong>un rechazo completo</strong> si el enfoque no cumple expectativas</li>
                    <li>• En caso de rechazo, se inicia un <strong>nuevo diseño sin costo adicional</strong></li>
                  </ul>
                </div>

                {/* Fase 2 */}
                <div className="border-l-4 border-green-400 pl-6">
                  <h4 className="font-semibold text-white mb-2">Fase 2: Desarrollo y Refinamiento</h4>
                  <ul className="text-white/80 text-sm space-y-1">
                    <li>• Una vez aceptado el enfoque, se procede con el desarrollo completo</li>
                    <li>• Se incluyen <strong>hasta 3 rondas de cambios menores</strong> sin costo</li>
                    <li>• Cambios menores: ajustes de texto, colores, imágenes, espaciados</li>
                    <li>• Cada ronda de cambios debe solicitarse en un <strong>máximo de 48 horas</strong></li>
                  </ul>
                </div>

                {/* Fase 3 */}
                <div className="border-l-4 border-yellow-400 pl-6">
                  <h4 className="font-semibold text-white mb-2">Cambios Adicionales</h4>
                  <ul className="text-white/80 text-sm space-y-1">
                    <li>• Modificaciones posteriores a las 3 rondas incluidas tendrán <strong>costo adicional</strong> <span className="text-xs text-white/60">($199 MXN)</span></li>
                    <li>• Se proporcionará cotización antes de proceder con el trabajo</li>
                    <li>• Cambios mayores (estructura, funcionalidades) se cotizan por separado</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Responsabilidades del cliente */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[#0147FF] mb-4">Responsabilidades del Cliente</h2>
            <p className="text-white/90 leading-relaxed mb-4">
              Para garantizar la entrega en tiempo y forma, debes proporcionar oportunamente:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border border-white/10 rounded-xl p-4 bg-white/3">
                <h4 className="font-semibold text-white mb-2">📝 Contenido</h4>
                <p className="text-white/70 text-sm">Textos, imágenes, videos y material del sitio</p>
              </div>
              <div className="border border-white/10 rounded-xl p-4 bg-white/3">
                <h4 className="font-semibold text-white mb-2">🎨 Identidad visual</h4>
                <p className="text-white/70 text-sm">Logo, colores, tipografías y elementos de marca</p>
              </div>
              <div className="border border-white/10 rounded-xl p-4 bg-white/3">
                <h4 className="font-semibold text-white mb-2">💬 Feedback oportuno</h4>
                <p className="text-white/70 text-sm">Revisiones y aprobaciones en tiempo</p>
              </div>
            </div>
          </section>

          {/* Responsabilidades de NovaLabs */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[#0147FF] mb-4">Responsabilidades de NovaLabss</h2>
            <p className="text-white/90 leading-relaxed mb-4">
              Nos comprometemos a:
            </p>
            
            <div className="space-y-3">
              <div className="border-l-4 border-[#0147FF] pl-6 py-2">
                <h4 className="font-semibold text-white mb-1">🚀 Entrega profesional</h4>
                <p className="text-white/80 text-sm">
                  Sitios web funcionales, optimizados y según estándares profesionales
                </p>
              </div>
              
              <div className="border-l-4 border-[#0147FF] pl-6 py-2">
                <h4 className="font-semibold text-white mb-1">⏰ Cumplimiento de tiempos</h4>
                <p className="text-white/80 text-sm">
                  Respetar los plazos de entrega prometidos
                </p>
              </div>
              
              <div className="border-l-4 border-[#0147FF] pl-6 py-2">
                <h4 className="font-semibold text-white mb-1">🛠️ Soporte continuo</h4>
                <p className="text-white/80 text-sm">
                  Mantenimiento, actualizaciones de seguridad y soporte técnico
                </p>
              </div>

              <div className="border-l-4 border-[#0147FF] pl-6 py-2">
                <h4 className="font-semibold text-white mb-1">🔄 Proceso de revisión y cambios</h4>
                <div className="text-white/80 text-sm space-y-2">
                  <p><strong>Entrega inicial:</strong> Se presentan 2 secciones del proyecto para revisión</p>
                  <p><strong>Derecho de rechazo:</strong> Una oportunidad de solicitar diseño completamente nuevo sin costo</p>
                  <p><strong>Tras aceptación:</strong> Hasta 3 cambios menores incluidos sin costo adicional</p>
                  <p><strong>Modificaciones posteriores:</strong> Cambios adicionales tendrán costo extra según cotización</p>
                </div>
              </div>
            </div>
          </section>

          {/* Propiedad intelectual */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[#0147FF] mb-4">Propiedad Intelectual</h2>
            
            <div className="space-y-4">
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <h4 className="font-semibold text-white mb-2">📄 Tu contenido es tuyo</h4>
                <p className="text-white/80 text-sm">Mantienes todos los derechos sobre tu contenido, imágenes, textos y marca</p>
              </div>
              
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <h4 className="font-semibold text-white mb-2">🎨 Diseño del sitio</h4>
                <p className="text-white/80 text-sm">Una vez completado el proyecto, obtienes los derechos de uso del diseño</p>
              </div>
              
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <h4 className="font-semibold text-white mb-2">⚙️ Código y desarrollo</h4>
                <p className="text-white/80 text-sm">NovaLabss retiene derechos sobre el código base, metodología y herramientas propietarias</p>
              </div>
              
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <h4 className="font-semibold text-white mb-2">🔑 Licencias incluidas</h4>
                <p className="text-white/80 text-sm">Incluimos todas las licencias necesarias para herramientas y plugins utilizados</p>
              </div>
            </div>
          </section>

          {/* Cancelación */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[#0147FF] mb-4">Cancelación y Terminación</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-white/5 border border-white/10 rounded-xl">
                <span className="text-white/90 font-medium">Cancelación de suscripción</span>
                <span className="text-[#0147FF] font-semibold">30 días de anticipación vía email</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-white/5 border border-white/10 rounded-xl">
                <span className="text-white/90 font-medium">Reembolsos</span>
                <span className="text-red-400 font-semibold">No aplican (servicio digital)</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-white/5 border border-white/10 rounded-xl">
                <span className="text-white/90 font-medium">Servicios completados</span>
                <span className="text-green-400 font-semibold">Mantienes propiedad y acceso</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-white/5 border border-white/10 rounded-xl">
                <span className="text-white/90 font-medium">Respaldos</span>
                <span className="text-[#0147FF] font-semibold">60 días después de cancelación</span>
              </div>
            </div>
          </section>

          {/* Limitaciones */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[#0147FF] mb-4">Limitaciones de Responsabilidad</h2>
            <p className="text-white/90 leading-relaxed mb-4">
              NovaLabss no será responsable por:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border border-red-400/30 rounded-xl p-4 bg-red-500/10">
                <h4 className="font-semibold text-red-200 mb-2">⚠️ Limitaciones</h4>
                <ul className="text-white/70 text-sm space-y-1">
                  <li>• Pérdidas de ingresos del cliente</li>
                  <li>• Contenido proporcionado por el cliente</li>
                  <li>• Interrupciones de servicios externos</li>
                  <li>• Daños indirectos o consecuenciales</li>
                </ul>
              </div>
              <div className="border border-white/10 rounded-xl p-4 bg-white/3">
                <h4 className="font-semibold text-white mb-2">📋 Responsabilidad máxima</h4>
                <p className="text-white/70 text-sm">
                  Limitada al monto total pagado por el servicio contratado
                </p>
              </div>
            </div>
          </section>

          {/* Soporte */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[#0147FF] mb-4">Soporte y Mantenimiento</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border border-white/10 rounded-xl p-4 bg-white/3">
                <h4 className="font-semibold text-white mb-2">🔧 Soporte incluido</h4>
                <p className="text-white/70 text-sm">Actualizaciones de seguridad, mantenimiento técnico y corrección de errores</p>
              </div>
              <div className="border border-white/10 rounded-xl p-4 bg-white/3">
                <h4 className="font-semibold text-white mb-2">⏰ Horario de soporte</h4>
                <p className="text-white/70 text-sm">Lunes a Viernes, 10:00 AM - 8:00 PM (GMT-6)</p>
              </div>
              <div className="border border-white/10 rounded-xl p-4 bg-white/3">
                <h4 className="font-semibold text-white mb-2">📧 Tiempo de respuesta</h4>
                <p className="text-white/70 text-sm">48 horas garantizadas para consultas por email</p>
              </div>
              <div className="border border-white/10 rounded-xl p-4 bg-white/3">
                <h4 className="font-semibold text-white mb-2">⭐ Soporte prioritario</h4>
                <p className="text-white/70 text-sm">Los clientes del Plan Galaxy tienen atención prioritaria</p>
              </div>
            </div>
          </section>


          {/* Privacidad */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[#0147FF] mb-4">Privacidad y Protección de Datos</h2>
            <p className="text-white/90 leading-relaxed mb-4">
              Cumplimos con la <strong>Ley Federal de Protección de Datos Personales en Posesión de los Particulares (México)</strong>. 
              Para más información, consulta nuestro{' '}
              <a href="/aviso-de-privacidad" className="text-[#0147FF] hover:text-white transition-colors duration-300">
                Aviso de Privacidad
              </a>.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border border-white/10 rounded-xl p-4 bg-white/3">
                <h4 className="font-semibold text-white mb-2">🔒 Información privada</h4>
                <p className="text-white/70 text-sm">No compartimos datos con terceros sin autorización</p>
              </div>
              <div className="border border-white/10 rounded-xl p-4 bg-white/3">
                <h4 className="font-semibold text-white mb-2">🍪 Cookies</h4>
                <p className="text-white/70 text-sm">Para mejorar la experiencia del usuario</p>
              </div>
              <div className="border border-white/10 rounded-xl p-4 bg-white/3">
                <h4 className="font-semibold text-white mb-2">🛡️ Almacenamiento seguro</h4>
                <p className="text-white/70 text-sm">Datos encriptados y protegidos</p>
              </div>
              <div className="border border-white/10 rounded-xl p-4 bg-white/3">
                <h4 className="font-semibold text-white mb-2">✏️ Derecho de rectificación</h4>
                <p className="text-white/70 text-sm">Puedes solicitar corrección o eliminación de datos</p>
              </div>
            </div>
          </section>

          {/* Modificaciones */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[#0147FF] mb-4">Modificaciones a estos Términos</h2>
            
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-6">
              <p className="text-yellow-200 mb-3">
                NovaLabs se reserva el derecho de modificar estos términos y condiciones.
              </p>
              <ul className="text-white/80 text-sm space-y-2">
                <li><strong>Notificación:</strong> Te avisaremos por email con 30 días de anticipación</li>
                <li><strong>Aceptación:</strong> El uso continuo del servicio constituye aceptación de los nuevos términos</li>
                <li><strong>Versión vigente:</strong> Siempre disponible en nuestro sitio web</li>
              </ul>
            </div>
          </section>

          {/* Contacto */}
          <section className="mb-12">
            <div className="bg-[#0147FF]/10 border border-[#0147FF]/30 rounded-2xl p-8 text-center">
              <h2 className="text-2xl font-bold text-white mb-4">
                ¿Tienes preguntas sobre estos términos?
              </h2>
              <p className="text-white/80 mb-6">
                Nuestro equipo está aquí para aclarar cualquier duda
              </p>
              <div className="space-y-2">
                <p className="text-white font-semibold">📧 novalabss.app@gmail.com</p>
                <p className="text-white/60 text-sm">Asunto: "Consulta Términos y Condiciones"</p>
                <p className="text-white/60 text-sm">Respuesta garantizada en 48 horas</p>
                <p className="text-white/60 text-sm">Lunes a Viernes, 10:00 AM - 8:00 PM (GMT-6)</p>
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

        {/* Footer note */}
        <div className="mt-8 text-center py-6 border-t border-white/10">
          <p className="text-white/60 text-sm mb-2">
            Al contratar nuestros servicios, confirmas que has leído, entendido y aceptado estos términos y condiciones.
          </p>
          <p className="text-white/40 text-xs">
            NovaLabs - El futuro del marketing digital mexicano
          </p>
        </div>
      </div>
    </div>
  );
}