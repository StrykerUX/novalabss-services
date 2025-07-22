"use client";

import AdminLayout from "@/components/AdminLayout";
import SmoothMagneticButton from "@/components/SmoothMagneticButton";
import { useAdminSubscriptions } from "@/hooks/useAdminSubscriptions";
import { useState } from "react";

export default function AdminSubscriptionsPage() {
  const [statusFilter, setStatusFilter] = useState("all");
  const [showDetails, setShowDetails] = useState<string | null>(null);

  const { data, loading, error, refetch, manageSubscription, setFilters } = useAdminSubscriptions({
    status: statusFilter,
    limit: 50
  });

  const handleStatusFilter = (status: string) => {
    setStatusFilter(status);
    setFilters({ status, limit: 50 });
  };

  const handleManageSubscription = async (subscriptionId: string, action: string) => {
    const confirmed = confirm(`¿Estás seguro de que quieres ${action} esta suscripción?`);
    if (confirmed) {
      await manageSubscription(subscriptionId, action);
    }
  };

  if (loading) {
    return (
      <AdminLayout 
        title="Gestión de Suscripciones"
        subtitle="Cargando suscripciones..."
      >
        <div className="flex items-center justify-center h-64">
          <div className="text-white">🔄 Cargando suscripciones de Stripe...</div>
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout 
        title="Gestión de Suscripciones"
        subtitle="Error al cargar suscripciones"
      >
        <div className="bg-red-500/20 border border-red-500/30 rounded-[24px] p-6 mb-6">
          <p className="text-red-400 mb-4">❌ Error: {error}</p>
          <SmoothMagneticButton 
            onClick={refetch}
            className="px-4 py-2 text-white bg-red-600/20 border border-red-500/30 hover:bg-red-600/30"
          >
            🔄 Reintentar
          </SmoothMagneticButton>
        </div>
      </AdminLayout>
    );
  }

  if (!data) {
    return (
      <AdminLayout 
        title="Gestión de Suscripciones"
        subtitle="Sin datos disponibles"
      >
        <div className="text-white/60">No hay datos disponibles</div>
      </AdminLayout>
    );
  }

  const { subscriptions, stats } = data;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "trialing":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "past_due":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "canceled":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      case "incomplete":
        return "bg-orange-500/20 text-orange-400 border-orange-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  return (
    <AdminLayout 
      title="Gestión de Suscripciones"
      subtitle={`${stats.total} suscripciones en Stripe - $${stats.totalRevenue.toLocaleString()} MXN/mes`}
    >
      {/* Filters */}
      <div className="bg-[#1A1A1A] rounded-[24px] p-6 border border-white/10 mb-6">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex gap-4">
            <select
              value={statusFilter}
              onChange={(e) => handleStatusFilter(e.target.value)}
              className="px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Todos los estados</option>
              <option value="active">Activas</option>
              <option value="trialing">En prueba</option>
              <option value="past_due">Vencidas</option>
              <option value="canceled">Canceladas</option>
              <option value="incomplete">Incompletas</option>
            </select>
          </div>
          
          <SmoothMagneticButton 
            onClick={refetch}
            className="px-4 py-2 text-white bg-blue-600/20 border border-blue-500/30 hover:bg-blue-600/30"
          >
            🔄 Actualizar desde Stripe
          </SmoothMagneticButton>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        <div className="bg-[#1A1A1A] rounded-[24px] p-4 border border-white/10">
          <h3 className="text-white/80 text-xs font-medium mb-2">Total</h3>
          <p className="text-xl font-bold text-white">{stats.total}</p>
        </div>
        <div className="bg-[#1A1A1A] rounded-[24px] p-4 border border-white/10">
          <h3 className="text-white/80 text-xs font-medium mb-2">Activas</h3>
          <p className="text-xl font-bold text-green-400">{stats.active}</p>
        </div>
        <div className="bg-[#1A1A1A] rounded-[24px] p-4 border border-white/10">
          <h3 className="text-white/80 text-xs font-medium mb-2">Prueba</h3>
          <p className="text-xl font-bold text-blue-400">{stats.trialing}</p>
        </div>
        <div className="bg-[#1A1A1A] rounded-[24px] p-4 border border-white/10">
          <h3 className="text-white/80 text-xs font-medium mb-2">Vencidas</h3>
          <p className="text-xl font-bold text-yellow-400">{stats.past_due}</p>
        </div>
        <div className="bg-[#1A1A1A] rounded-[24px] p-4 border border-white/10">
          <h3 className="text-white/80 text-xs font-medium mb-2">Canceladas</h3>
          <p className="text-xl font-bold text-red-400">{stats.canceled}</p>
        </div>
        <div className="bg-[#1A1A1A] rounded-[24px] p-4 border border-white/10">
          <h3 className="text-white/80 text-xs font-medium mb-2">Ingresos/mes</h3>
          <p className="text-lg font-bold text-yellow-400">${stats.totalRevenue.toLocaleString()}</p>
        </div>
      </div>

      {/* Subscriptions List */}
      <div className="bg-[#1A1A1A] rounded-[24px] p-6 border border-white/10">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-white font-bold text-lg">Lista de Suscripciones</h3>
          <span className="text-white/60 text-sm">{subscriptions.length} suscripciones mostradas</span>
        </div>

        <div className="space-y-4">
          {subscriptions.map((subscription) => (
            <div key={subscription.id} className="bg-white/5 rounded-[16px] p-6 border border-white/10">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                {/* Customer Info */}
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold text-sm">
                        {subscription.customer.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </span>
                    </div>
                    <div>
                      <p className="text-white font-medium">{subscription.customer.name}</p>
                      <p className="text-white/60 text-sm">{subscription.customer.email}</p>
                      {subscription.user && (
                        <p className="text-white/40 text-xs">
                          Usuario registrado: {subscription.user.projects} proyectos
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Subscription Details */}
                <div className="flex-1">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-white/60">Plan:</span>
                      <p className="text-white font-medium">{subscription.plan.name}</p>
                    </div>
                    <div>
                      <span className="text-white/60">Precio:</span>
                      <p className="text-white font-medium">
                        ${subscription.plan.amount.toLocaleString()} {subscription.plan.currency}/{subscription.plan.interval}
                      </p>
                    </div>
                    <div>
                      <span className="text-white/60">Período actual:</span>
                      <p className="text-white text-xs">
                        {subscription.dates.current_period_start} → {subscription.dates.current_period_end}
                      </p>
                    </div>
                    <div>
                      <span className="text-white/60">Creada:</span>
                      <p className="text-white text-xs">{subscription.dates.created}</p>
                    </div>
                  </div>
                </div>

                {/* Status and Actions */}
                <div className="flex flex-col items-end space-y-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(subscription.status)}`}>
                    {subscription.status}
                  </span>
                  
                  {subscription.billing.cancel_at_period_end && (
                    <span className="text-orange-400 text-xs">⚠️ Se cancela al finalizar período</span>
                  )}

                  <div className="flex space-x-2">
                    <button
                      onClick={() => setShowDetails(showDetails === subscription.id ? null : subscription.id)}
                      className="p-1 text-white/60 hover:text-white transition-colors"
                      title="Ver detalles"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </button>
                    
                    {subscription.status === 'active' && (
                      <button
                        onClick={() => handleManageSubscription(subscription.id, subscription.billing.cancel_at_period_end ? 'reactivate' : 'cancel')}
                        className="p-1 text-white/60 hover:text-yellow-400 transition-colors"
                        title={subscription.billing.cancel_at_period_end ? "Reactivar" : "Cancelar al finalizar período"}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Expanded Details */}
              {showDetails === subscription.id && (
                <div className="mt-4 pt-4 border-t border-white/10">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <h4 className="text-white font-medium mb-2">Información de Facturación</h4>
                      <div className="space-y-1 text-white/60">
                        <p>Método: {subscription.billing.collection_method}</p>
                        {subscription.billing.canceled_at && (
                          <p>Cancelada: {subscription.billing.canceled_at}</p>
                        )}
                        {subscription.dates.trial_end && (
                          <p>Fin de prueba: {subscription.dates.trial_end}</p>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-white font-medium mb-2">ID de Stripe</h4>
                      <p className="text-white/60 text-xs font-mono">{subscription.id}</p>
                      <p className="text-white/60 text-xs font-mono">{subscription.customer.id}</p>
                    </div>
                    
                    <div>
                      <h4 className="text-white font-medium mb-2">Metadata</h4>
                      <div className="text-white/60 text-xs">
                        {Object.keys(subscription.metadata).length > 0 ? (
                          Object.entries(subscription.metadata).map(([key, value]) => (
                            <p key={key}>{key}: {value}</p>
                          ))
                        ) : (
                          <p>Sin metadata</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {subscriptions.length === 0 && (
          <div className="text-center py-12">
            <p className="text-white/60">No se encontraron suscripciones con los filtros aplicados</p>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}