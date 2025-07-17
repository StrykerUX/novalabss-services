"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import DashboardSidebar from "./DashboardSidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
}

export default function DashboardLayout({ 
  children, 
  title = "Dashboard",
  subtitle 
}: DashboardLayoutProps) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (status === "loading") return;
    
    if (!session) {
      redirect("/auth/signin");
      return;
    }

    // Si el usuario es ADMIN, redirigir al dashboard admin
    if (session.user.role === "ADMIN") {
      router.push("/admin");
      return;
    }
  }, [session, status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0147FF]"></div>
          <p className="text-white/60 text-sm">Cargando dashboard...</p>
        </div>
      </div>
    );
  }

  if (!session || session.user.role === "ADMIN") {
    return null;
  }

  return (
    <div className="h-screen bg-black flex overflow-hidden">
      {/* Sidebar - Solo para usuarios USER */}
      <DashboardSidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Mobile Menu Button - Floating */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="md:hidden fixed top-4 left-4 z-40 bg-[#1A1A1A] text-white hover:text-[#0147FF] transition-colors p-3 rounded-full border border-white/10"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Page Content */}
        <main className="flex-1 overflow-auto w-full">
          <div className="p-6 w-full">
            {/* Page Title dentro del contenido */}
            {(title || subtitle) && (
              <div className="mb-8">
                <h1 className="text-2xl md:text-3xl font-bold text-white font-space-grotesk">
                  {title}
                </h1>
                {subtitle && (
                  <p className="text-white/60 text-sm mt-2">{subtitle}</p>
                )}
              </div>
            )}
            
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}