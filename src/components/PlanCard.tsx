interface PlanCardProps {
  plan: 'rocket' | 'galaxy'
  showButton?: boolean
  onButtonClick?: () => void
}

export default function PlanCard({ plan, showButton = false, onButtonClick }: PlanCardProps) {
  const planDetails = {
    rocket: {
      name: 'PLAN ROCKET',
      description: 'El punto de partida inteligente para emprendedores ambiciosos',
      price: '$999',
      period: 'Pago bimestral',
      badge: 'Más popular',
      features: [
        '1 landing page profesional',
        'Entrega garantizada en 72 horas',
        'Optimización para Google',
        'Analytics de rendimiento',
        'Versión optimizada para móvil',
        'Formulario de contacto',
        'Soporte continuo',
        'Hosting seguro incluido'
      ],
      styles: 'bg-gradient-to-br from-[#0147FF]/10 to-[#0147FF]/5 border-2 border-[#0147FF]/30',
      buttonText: 'Comenzar Plan Rocket'
    },
    galaxy: {
      name: 'PLAN GALAXY',
      description: 'Cuando ser bueno ya no es suficiente, necesitas ser extraordinario',
      price: '$1,799',
      period: 'Pago bimestral',
      badge: null,
      features: [
        'Sitio completo de 3-5 páginas',
        'Entrega garantizada en 96 horas',
        'Optimización avanzada para Google',
        'Analytics de rendimiento avanzado',
        'Versión optimizada para móvil',
        'Múltiples formularios de contacto',
        'Soporte prioritario continuo',
        'Hosting seguro incluido'
      ],
      styles: 'bg-[#1A1A1A] border border-white/10',
      buttonText: 'Comenzar Plan Galaxy'
    }
  }

  const currentPlan = planDetails[plan]

  return (
    <div className={`${currentPlan.styles} rounded-[32px] p-8 lg:p-12 relative overflow-hidden`}>
      {/* Badge */}
      {currentPlan.badge && (
        <div className="absolute top-6 right-6 bg-[#0147FF] text-white px-4 py-2 rounded-full text-sm font-semibold">
          {currentPlan.badge}
        </div>
      )}
      
      <div className="relative z-10">
        <h3 className="text-white text-2xl lg:text-3xl font-bold mb-4 tracking-wide">
          {currentPlan.name}
        </h3>
        <p className="text-white/80 text-base mb-8 leading-relaxed">
          {currentPlan.description}
        </p>
        
        <div className="mb-8">
          <div className="flex items-baseline mb-2">
            <span className="text-4xl lg:text-5xl font-black text-white">{currentPlan.price}</span>
            <span className="text-white/60 ml-2 text-lg">MXN</span>
          </div>
          <p className="text-white/60 text-sm">{currentPlan.period}</p>
        </div>

        <ul className="space-y-4 mb-8">
          {currentPlan.features.map((feature, index) => (
            <li key={index} className="flex items-center text-white/90">
              <svg className="w-5 h-5 text-blue-400 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              {feature}
            </li>
          ))}
        </ul>

        <p className="text-white/40 text-xs mb-6">
          * Dominio (.com) incluido en el segundo pago de suscripción
        </p>

        {showButton && onButtonClick && (
          <button
            onClick={onButtonClick}
            className="w-full text-white px-8 py-4 font-semibold text-lg bg-gradient-to-r from-[#0147FF] to-[#0147FF38] rounded-full hover:shadow-2xl hover:shadow-blue-500/40 transition-shadow duration-300 shadow-xl shadow-blue-600/30 flex items-center justify-center space-x-3"
          >
            <span>{currentPlan.buttonText}</span>
            <svg 
              className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        )}
      </div>
    </div>
  )
}