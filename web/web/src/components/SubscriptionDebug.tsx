"use client"

import { useSubscription } from "@/hooks/useSubscription"

export default function SubscriptionDebug() {
  const subscriptionData = useSubscription()

  if (process.env.NODE_ENV !== 'development') return null

  return (
    <div className="fixed bottom-4 left-4 bg-black/90 text-white p-4 rounded-lg text-xs max-w-md z-50 border border-white/20">
      <h4 className="font-bold mb-2">💳 Subscription Debug</h4>
      
      <div className="space-y-2">
        <div>
          <strong>Loading:</strong> {subscriptionData.loading ? '🔄 Sí' : '✅ No'}
        </div>
        <div>
          <strong>Error:</strong> {subscriptionData.error || '✅ Ninguno'}
        </div>
        <div>
          <strong>¿Activa?:</strong> {subscriptionData.isActive ? '✅ Sí' : '❌ No'}
        </div>
        <div>
          <strong>Estado:</strong> {subscriptionData.status}
        </div>
        <div>
          <strong>Plan:</strong> {subscriptionData.plan?.name || 'N/A'}
        </div>
        <div>
          <strong>Créditos:</strong> {subscriptionData.plan?.credits || 'N/A'}
        </div>
        <div>
          <strong>Días transcurridos:</strong> {subscriptionData.daysElapsed}
        </div>
        <div>
          <strong>Días restantes:</strong> {subscriptionData.daysRemaining}
        </div>
        
        <details className="mt-3">
          <summary className="cursor-pointer font-semibold">Ver datos completos</summary>
          <div className="mt-2 text-[10px] bg-white/10 p-2 rounded overflow-auto max-h-32">
            <pre>{JSON.stringify({
              subscription: subscriptionData.subscription,
              plan: subscriptionData.plan,
              startDate: subscriptionData.startDate,
              endDate: subscriptionData.endDate,
            }, null, 2)}</pre>
          </div>
        </details>
        
        <button 
          onClick={() => subscriptionData.refetch()}
          className="mt-2 px-2 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700"
        >
          🔄 Refetch
        </button>
      </div>
    </div>
  )
}