"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AdminSidebar from "./AdminSidebar";

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

export default function AdminLayout({ children, title, subtitle }: AdminLayoutProps) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (status === "loading") return;
    
    if (!session) {
      router.push("/auth/signin");
      return;
    }

    if (session.user.role !== "ADMIN") {
      router.push("/dashboard");
      return;
    }
  }, [session, status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
        <div className="text-white">Cargando...</div>
      </div>
    );
  }

  if (!session || session.user.role !== "ADMIN") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
        <div className="text-white">Acceso denegado</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar único que maneja responsive internamente */}
        <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Mobile Header */}
          <div className="md:hidden bg-[#1A1A1A] border-b border-red-500/20 p-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-white font-bold text-lg">{title}</h1>
                {subtitle && <p className="text-white/60 text-sm">{subtitle}</p>}
              </div>
              <button
                onClick={() => setSidebarOpen(true)}
                className="p-2 text-white/60 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>

          {/* Desktop Header */}
          <div className="hidden md:block bg-[#1A1A1A] border-b border-red-500/20 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-white font-space-grotesk">{title}</h1>
                {subtitle && <p className="text-white/60 text-sm mt-1">{subtitle}</p>}
              </div>
              <div className="flex items-center space-x-4">
                {/* Quick Actions */}
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-white/60 text-sm">Sistema operativo</span>
                </div>
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-auto">
            <div className="p-6">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}