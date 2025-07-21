"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import SmoothMagneticButton from "./SmoothMagneticButton";

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdminSidebar({ isOpen, onClose }: AdminSidebarProps) {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const navigationItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      href: '/admin',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z" />
        </svg>
      )
    },
    {
      id: 'users',
      label: 'Usuarios',
      href: '/admin/users',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
        </svg>
      )
    },
    {
      id: 'projects',
      label: 'Proyectos',
      href: '/admin/projects',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      )
    },
    {
      id: 'billing',
      label: 'Facturación',
      href: '/admin/billing',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      )
    },
    {
      id: 'analytics',
      label: 'Analytics',
      href: '/admin/analytics',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    },
    {
      id: 'settings',
      label: 'Configuración',
      href: '/admin/settings',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    }
  ];

  const handleSignOut = () => {
    signOut({ callbackUrl: "/" });
  };

  const isActiveItem = (href: string) => {
    if (href === '/admin') {
      return pathname === '/admin';
    }
    return pathname.startsWith(href);
  };

  const getUserInitials = (name: string | null | undefined) => {
    if (!name) return 'AD';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-screen w-[280px] bg-[#1A1A1A] border-r border-red-500/20 z-50 flex flex-col
        transform transition-transform duration-300 ease-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0 md:relative md:z-auto
      `}>
        
        {/* Header */}
        <div className="p-6 border-b border-red-500/20">
          {/* Logo */}
          <Link href="/admin" className="flex items-center mb-6 group">
            <svg className="w-8 h-8 mr-3 transition-transform duration-300 group-hover:scale-110" viewBox="0 0 432 432" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="237.073" y="326.634" width="105.366" height="42.1463" rx="21.0731" transform="rotate(90 237.073 326.634)" fill="#EF4444"/>
              <rect x="105.366" y="237.073" width="105.366" height="42.1463" rx="21.0732" transform="rotate(180 105.366 237.073)" fill="#EF4444"/>
              <rect x="279.329" y="122.869" width="105.366" height="42.1463" rx="21.0732" transform="rotate(-45 279.329 122.869)" fill="#EF4444"/>
              <rect x="326.634" y="194.927" width="105.366" height="42.1463" rx="21.0732" fill="#EF4444"/>
              <rect x="148.946" y="305.405" width="63.2195" height="31.6097" rx="15.8049" transform="rotate(135 148.946 305.405)" fill="#EF4444"/>
              <path d="M137.77 137.769C129.54 129.54 116.034 129.46 109.22 138.896C94.2908 159.572 85.5921 184.276 84.4272 210.054C82.9432 242.895 93.7946 275.104 114.849 300.352C135.904 325.599 165.639 342.06 198.212 346.5C230.786 350.94 263.842 343.038 290.885 324.346C317.929 305.655 337.005 277.525 344.364 245.485C351.724 213.445 346.835 179.811 330.659 151.191C314.483 122.572 288.188 101.037 256.943 90.8176C232.417 82.7961 206.232 82.2017 181.614 88.8599C170.379 91.8984 165.68 104.561 170.47 115.169C175.259 125.776 187.756 130.215 199.187 128.031C213.963 125.207 229.329 126.129 243.841 130.876C265.088 137.825 282.968 152.469 293.968 171.93C304.968 191.391 308.292 214.262 303.288 236.05C298.283 257.837 285.312 276.965 266.922 289.675C248.532 302.386 226.054 307.759 203.904 304.74C181.755 301.721 161.534 290.527 147.217 273.359C132.9 256.191 125.521 234.289 126.531 211.957C127.22 196.704 131.788 182.003 139.652 169.18C145.736 159.258 146 145.999 137.77 137.769Z" fill="#EF4444"/>
              <path d="M216 184.39C216.749 184.39 217.493 184.416 218.23 184.467C222.885 184.791 223.902 191.218 223.902 195.884C223.902 202.232 229.048 207.379 235.396 207.379C240.25 207.379 247.022 208.205 247.472 213.039C247.563 214.013 247.609 215.001 247.609 215.999C247.609 233.457 233.457 247.609 216 247.609C198.542 247.609 184.39 233.457 184.39 215.999C184.39 198.541 198.542 184.39 216 184.39Z" fill="#EF4444"/>
            </svg>
            <span className="font-space-grotesk text-xl font-bold text-white">
              Nova<span className="text-red-500">Admin</span>
            </span>
          </Link>

          {/* User Info */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold text-sm">
                {getUserInitials(session?.user?.name)}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-medium text-sm truncate">
                {session?.user?.name || 'Admin'}
              </p>
              <p className="text-white/60 text-xs truncate">
                {session?.user?.email}
              </p>
            </div>
          </div>

          {/* Admin Badge */}
          <div className="mt-3 px-3 py-1 rounded-full text-xs font-medium inline-block bg-red-500/20 text-red-300">
            ADMINISTRADOR
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <div className="space-y-2">
            {navigationItems.map((item) => {
              const isActive = isActiveItem(item.href);
              
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={onClose}
                  className={`
                    group flex items-center px-3 py-3 rounded-[12px] text-sm font-medium transition-all duration-300 relative
                    ${isActive 
                      ? 'bg-red-500/20 text-red-400 border border-red-500/30' 
                      : 'text-white/80 hover:text-white hover:bg-white/5'
                    }
                  `}
                  onMouseEnter={() => setHoveredItem(item.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  {/* Active Indicator */}
                  {isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-red-500 rounded-full"></div>
                  )}
                  
                  {/* Icon */}
                  <div className={`mr-3 transition-transform duration-300 ${
                    hoveredItem === item.id ? 'scale-110' : ''
                  }`}>
                    {item.icon}
                  </div>
                  
                  {/* Label */}
                  <span className="flex-1">{item.label}</span>
                  
                  {/* Hover Effect */}
                  {hoveredItem === item.id && !isActive && (
                    <div className="absolute right-3 w-1 h-1 bg-white/40 rounded-full animate-pulse"></div>
                  )}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-red-500/20">
          {/* Quick Stats */}
          <div className="mb-4 p-3 bg-red-500/10 rounded-[12px] border border-red-500/20">
            <div className="flex items-center justify-between text-xs">
              <span className="text-white/70">Usuarios activos</span>
              <span className="text-red-400 font-semibold">0</span>
            </div>
          </div>

          {/* Logout Button */}
          <SmoothMagneticButton
            onClick={handleSignOut}
            className="w-full px-4 py-3 text-white text-sm font-medium hover:shadow-lg transition-shadow duration-300 bg-red-600/20 border border-red-500/30"
            magneticStrength={0.1}
          >
            <div className="flex items-center justify-center space-x-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span>Cerrar Sesión</span>
            </div>
          </SmoothMagneticButton>
        </div>

        {/* Mobile Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 md:hidden text-white/60 hover:text-white transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </>
  );
}