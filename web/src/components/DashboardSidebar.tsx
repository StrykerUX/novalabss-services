"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { gsap } from "gsap";
import SmoothMagneticButton from "./SmoothMagneticButton";

interface DashboardSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DashboardSidebar({ isOpen, onClose }: DashboardSidebarProps) {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const navigationItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      href: '/dashboard',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z" />
        </svg>
      )
    },
    {
      id: 'projects',
      label: 'Mis Proyectos',
      href: '/dashboard/projects',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      )
    },
    {
      id: 'profile',
      label: 'Perfil',
      href: '/dashboard/profile',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      )
    },
    {
      id: 'billing',
      label: 'Facturación',
      href: '/dashboard/billing',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      )
    },
    {
      id: 'support',
      label: 'Soporte',
      href: '/dashboard/support',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.18l-.07.98-.07.98M12 21.82l.07-.98.07-.98M2.18 12l.98-.07.98-.07M21.82 12l-.98.07-.98.07M8.45 8.45l.98-.07.98-.07M15.55 15.55l-.98.07-.98.07M15.55 8.45l-.98-.07-.98-.07M8.45 15.55l.98.07.98.07" />
        </svg>
      )
    }
  ];

  const handleSignOut = () => {
    signOut({ callbackUrl: "/" });
  };

  const isActiveItem = (href: string) => {
    if (href === '/dashboard') {
      return pathname === '/dashboard';
    }
    return pathname.startsWith(href);
  };

  const getUserInitials = (name: string | null | undefined) => {
    if (!name) return 'NU';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const getPlanBadgeColor = () => {
    // Por ahora retornamos 'Gratuito', más adelante se conectará con la data real
    return {
      text: 'Gratuito',
      bgColor: 'bg-gray-600/20',
      textColor: 'text-gray-300'
    };
  };

  const planInfo = getPlanBadgeColor();

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
        fixed top-0 left-0 h-screen w-[280px] bg-[#1A1A1A] border-r border-white/10 z-50 flex flex-col
        transform transition-transform duration-300 ease-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0 md:relative md:z-auto
      `}>
        
        {/* Header */}
        <div className="p-6 border-b border-white/10">
          {/* Logo */}
          <Link href="/" className="flex items-center mb-6 group">
            <svg className="w-8 h-8 mr-3 transition-transform duration-300 group-hover:scale-110" viewBox="0 0 432 432" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="237.073" y="326.634" width="105.366" height="42.1463" rx="21.0731" transform="rotate(90 237.073 326.634)" fill="#0147FF"/>
              <rect x="105.366" y="237.073" width="105.366" height="42.1463" rx="21.0732" transform="rotate(180 105.366 237.073)" fill="#0147FF"/>
              <rect x="279.329" y="122.869" width="105.366" height="42.1463" rx="21.0732" transform="rotate(-45 279.329 122.869)" fill="#0147FF"/>
              <rect x="326.634" y="194.927" width="105.366" height="42.1463" rx="21.0732" fill="#0147FF"/>
              <rect x="148.946" y="305.405" width="63.2195" height="31.6097" rx="15.8049" transform="rotate(135 148.946 305.405)" fill="#0147FF"/>
              <path d="M137.77 137.769C129.54 129.54 116.034 129.46 109.22 138.896C94.2908 159.572 85.5921 184.276 84.4272 210.054C82.9432 242.895 93.7946 275.104 114.849 300.352C135.904 325.599 165.639 342.06 198.212 346.5C230.786 350.94 263.842 343.038 290.885 324.346C317.929 305.655 337.005 277.525 344.364 245.485C351.724 213.445 346.835 179.811 330.659 151.191C314.483 122.572 288.188 101.037 256.943 90.8176C232.417 82.7961 206.232 82.2017 181.614 88.8599C170.379 91.8984 165.68 104.561 170.47 115.169C175.259 125.776 187.756 130.215 199.187 128.031C213.963 125.207 229.329 126.129 243.841 130.876C265.088 137.825 282.968 152.469 293.968 171.93C304.968 191.391 308.292 214.262 303.288 236.05C298.283 257.837 285.312 276.965 266.922 289.675C248.532 302.386 226.054 307.759 203.904 304.74C181.755 301.721 161.534 290.527 147.217 273.359C132.9 256.191 125.521 234.289 126.531 211.957C127.22 196.704 131.788 182.003 139.652 169.18C145.736 159.258 146 145.999 137.77 137.769Z" fill="#0147FF"/>
              <path d="M216 184.39C216.749 184.39 217.493 184.416 218.23 184.467C222.885 184.791 223.902 191.218 223.902 195.884C223.902 202.232 229.048 207.379 235.396 207.379C240.25 207.379 247.022 208.205 247.472 213.039C247.563 214.013 247.609 215.001 247.609 215.999C247.609 233.457 233.457 247.609 216 247.609C198.542 247.609 184.39 233.457 184.39 215.999C184.39 198.541 198.542 184.39 216 184.39Z" fill="#0147FF"/>
            </svg>
            <span className="font-space-grotesk text-xl font-bold text-white">NovaLabs</span>
          </Link>

          {/* User Info */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#0147FF] to-[#0147FF80] rounded-full flex items-center justify-center">
              <span className="text-white font-semibold text-sm">
                {getUserInitials(session?.user?.name)}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-medium text-sm truncate">
                {session?.user?.name || 'Usuario'}
              </p>
              <p className="text-white/60 text-xs truncate">
                {session?.user?.email}
              </p>
            </div>
          </div>

          {/* Plan Badge */}
          <div className={`mt-3 px-3 py-1 rounded-full text-xs font-medium inline-block ${planInfo.bgColor} ${planInfo.textColor}`}>
            {planInfo.text}
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
                      ? 'bg-[#0147FF]/20 text-[#0147FF] border border-[#0147FF]/30' 
                      : 'text-white/80 hover:text-white hover:bg-white/5'
                    }
                  `}
                  onMouseEnter={() => setHoveredItem(item.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  {/* Active Indicator */}
                  {isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-[#0147FF] rounded-full"></div>
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
        <div className="p-4 border-t border-white/10">
          {/* Credits/Storage Info */}
          <div className="mb-4 p-3 bg-white/5 rounded-[12px] border border-white/10">
            <div className="flex items-center justify-between text-xs">
              <span className="text-white/70">Créditos disponibles</span>
              <span className="text-[#0147FF] font-semibold">0</span>
            </div>
            <div className="mt-1 w-full bg-white/10 rounded-full h-1">
              <div className="bg-[#0147FF] h-1 rounded-full w-0"></div>
            </div>
          </div>

          {/* Logout Button */}
          <SmoothMagneticButton
            onClick={handleSignOut}
            className="w-full px-4 py-3 text-white text-sm font-medium hover:shadow-lg transition-shadow duration-300"
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