"use client"

import DashboardLayout from "@/components/DashboardLayout"
import SubscriptionInfoCard from "@/components/billing/SubscriptionInfoCard"
import PaymentMethodCard from "@/components/billing/PaymentMethodCard"
import BillingHistoryCard from "@/components/billing/BillingHistoryCard"

export default function BillingPage() {
  return (
    <DashboardLayout 
      title="Facturación" 
      subtitle="Gestiona tu suscripción y métodos de pago"
    >
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Top Row - Subscription Info */}
        <div>
          <SubscriptionInfoCard />
        </div>

        {/* Middle Row - Payment & Billing History */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <PaymentMethodCard />
          <div className="lg:col-span-1">
            <BillingHistoryCard />
          </div>
        </div>

        {/* Additional Info Section */}
        <div className="bg-[#1A1A1A] rounded-[24px] p-6 border border-white/10">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <span>💡</span>
            ¿Necesitas ayuda?
          </h3>
          
          <div>
            <h4 className="text-white font-semibold mb-2">Soporte</h4>
            <p className="text-white/60 text-sm mb-3">
              ¿Tienes problemas con tu facturación? Nuestro equipo está aquí para ayudarte.
            </p>
            <button 
              onClick={() => window.location.href = '/dashboard/support'}
              className="text-[#0147FF] text-sm font-medium hover:text-[#0147FF]/80 transition-colors"
            >
              Contactar soporte →
            </button>
          </div>
        </div>

        {/* Security Notice */}
        <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <div className="text-green-400 text-xl">🔒</div>
            <div>
              <h4 className="text-green-400 font-semibold text-sm mb-1">
                Pagos seguros con Stripe
              </h4>
              <p className="text-green-400/80 text-xs">
                Todos tus pagos están protegidos por Stripe, uno de los procesadores de pagos más seguros del mundo. 
                Tu información financiera está encriptada y nunca es almacenada en nuestros servidores.
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}