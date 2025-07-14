"use client";

import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { useState, useEffect } from 'react';

export default function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <section className="min-h-screen">
      <div className="w-full max-w-[1780px] mx-auto px-[5%] mt-6">
        <div className="bg-[#1A1A1A] rounded-[32px] relative overflow-hidden h-[85vh] flex flex-col justify-start">
          
          {/* Infinity shape as background */}
          <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
            <div className="relative">
              <div className="w-96 h-48 bg-gradient-to-r from-blue-600/30 to-transparent rounded-full transform rotate-45"></div>
              <div className="absolute top-0 left-0 w-96 h-48 bg-gradient-to-l from-blue-600/30 to-transparent rounded-full transform -rotate-45"></div>
            </div>
          </div>

          {/* Rocket animation - center right large */}
          {mounted && (
            <div className="absolute top-[60%] right-0 transform -translate-y-1/2 pointer-events-none">
              <DotLottieReact
                src="/animations/rocket-v1.lottie"
                loop
                autoplay
                className="w-80 h-80 lg:w-[510px] lg:h-[510px] scale-95 opacity-40"
              />
            </div>
          )}
          
          {/* Main content */}
          <div className="flex flex-col justify-between p-8 lg:p-12 h-full relative z-10">
            {/* Title, subtitle and badges at top */}
            <div className="max-w-4xl xl:max-w-5xl space-y-12">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-white leading-[100%] tracking-tight">
                MIENTRAS TU COMPETENCIA LUCHA CON TECNOLOGÍA,
                <br />
                <span className="text-blue-400">TÚ YA ESTÁS VENDIENDO</span>
              </h1>
              
              <p className="text-base lg:text-2xl text-white/90 leading-relaxed font-medium max-w-3xl">
                Tu ventaja competitiva: tecnología profesional sin complicaciones ni dolores de cabeza
              </p>
              
              <div className="flex flex-wrap gap-3">
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-sm font-medium text-white">
                  Plan desde $999 MXN/bimestre
                </div>
                <div className="bg-blue-600/20 backdrop-blur-sm border border-blue-400/30 rounded-full px-4 py-2 text-sm font-medium text-blue-200">
                  Tecnología enterprise
                </div>
                <div className="bg-green-600/20 backdrop-blur-sm border border-green-400/30 rounded-full px-4 py-2 text-sm font-medium text-green-200">
                  Solo queda vender
                </div>
              </div>
            </div>
            
            {/* Button at bottom */}
            <div className="max-w-4xl mb-8">
              <button className="group bg-gradient-to-r from-[#0147FF] to-[#0147FF38] text-white px-8 py-4 rounded-full font-space-grotesk font-semibold text-lg hover:from-[#0147FF] hover:to-[#0147FF50] hover:shadow-2xl hover:shadow-blue-500/40 transition-all duration-300 flex items-center space-x-3 shadow-xl shadow-blue-600/30 relative overflow-hidden before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-gradient-to-r before:from-white/20 before:via-white/10 before:to-transparent before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700">
                <span className="relative z-10">Quiero mi sitio web</span>
                <svg 
                  className="w-5 h-5 transition-transform group-hover:translate-x-1 relative z-10" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}