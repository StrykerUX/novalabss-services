'use client';

import { useState, useEffect } from 'react';

interface FloatingActionsProps {
  title: string;
  url: string;
}

export default function FloatingActions({ title, url }: FloatingActionsProps) {
  const [progress, setProgress] = useState(0);
  const [showShareButtons, setShowShareButtons] = useState(false);
  const [showCopiedMessage, setShowCopiedMessage] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = Math.round((scrollTop / docHeight) * 100);
      setProgress(Math.min(scrollPercent, 100));
    };

    window.addEventListener('scroll', updateScrollProgress);
    return () => window.removeEventListener('scroll', updateScrollProgress);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleTwitterShare = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(`${title} ${url}`)}`;
    window.open(twitterUrl, '_blank', 'noopener,noreferrer');
  };

  const handleFacebookShare = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    window.open(facebookUrl, '_blank', 'noopener,noreferrer');
  };

  const handleInstagramShare = () => {
    // Instagram no permite compartir enlaces directamente, pero podemos copiar al portapapeles
    navigator.clipboard.writeText(`${title} ${url}`);
    alert('Enlace copiado. Puedes pegarlo en Instagram Stories o posts.');
  };

  const handleWhatsAppShare = () => {
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setShowCopiedMessage(true);
      setTimeout(() => {
        setShowCopiedMessage(false);
      }, 2000); // Hide message after 2 seconds
    } catch (error) {
      console.error('Error copying link:', error);
    }
  };

  const handleToggleMobileMenu = () => {
    if (showMobileMenu) {
      // Si el menú está abierto, iniciamos la animación de salida
      setIsAnimatingOut(true);
      setTimeout(() => {
        setShowMobileMenu(false);
        setIsAnimatingOut(false);
      }, 300); // Duración de la animación de salida
    } else {
      // Si el menú está cerrado, lo abrimos directamente
      setShowMobileMenu(true);
    }
  };

  const circumference = 2 * Math.PI * 18; // radio de 18px
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <>
      {/* Desktop version */}
      <div className="hidden md:flex fixed bottom-8 right-8 z-50 flex-col items-end space-y-4">
        {/* Share buttons (aparecen cuando showShareButtons es true) */}
        {showShareButtons && (
          <div className="flex flex-col space-y-3 animate-in slide-in-from-bottom-2 duration-300">
            {/* Instagram */}
            <button
              onClick={handleInstagramShare}
              className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full flex items-center justify-center hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 hover:scale-110"
              title="Compartir en Instagram"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </button>

            {/* Twitter/X */}
            <button
              onClick={handleTwitterShare}
              className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center hover:shadow-lg hover:shadow-gray-500/30 transition-all duration-300 hover:scale-110"
              title="Compartir en X (Twitter)"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </button>

            {/* Facebook */}
            <button
              onClick={handleFacebookShare}
              className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 hover:scale-110"
              title="Compartir en Facebook"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </button>

            {/* WhatsApp */}
            <button
              onClick={handleWhatsAppShare}
              className="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center hover:shadow-lg hover:shadow-green-500/30 transition-all duration-300 hover:scale-110"
              title="Compartir en WhatsApp"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488z"/>
              </svg>
            </button>

            {/* Copiar enlace */}
            <div className="relative flex items-center">
              <button
                onClick={handleCopyLink}
                className="w-12 h-12 bg-gray-700 text-white rounded-full flex items-center justify-center hover:shadow-lg hover:shadow-gray-500/30 transition-all duration-300 hover:scale-110"
                title="Copiar enlace"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                </svg>
              </button>
              
              {/* Copied message */}
              {showCopiedMessage && (
                <div className="absolute right-full mr-3 bg-white/10 border border-white text-white text-sm px-3 py-1 rounded-lg whitespace-nowrap animate-in fade-in-0 slide-in-from-right-2 duration-200">
                  ¡Copiado!
                </div>
              )}
            </div>
          </div>
        )}

        {/* Toggle share button */}
        <button
          onClick={() => setShowShareButtons(!showShareButtons)}
          className={`w-14 h-14 text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 ${
            showShareButtons 
              ? 'bg-blue-600 hover:shadow-lg hover:shadow-blue-500/30' 
              : 'bg-[#1A1A1A] border border-white/10 hover:bg-white/5 hover:border-white/20'
          }`}
          title="Compartir"
        >
          <svg 
            className={`w-6 h-6 transition-transform duration-300 ${showShareButtons ? 'rotate-45' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"/>
          </svg>
        </button>

        {/* Scroll to top button */}
        <button
          onClick={scrollToTop}
          className="w-14 h-14 bg-[#1A1A1A] border border-white/10 text-white rounded-full flex items-center justify-center hover:bg-white/5 hover:border-white/20 transition-all duration-300 hover:scale-110"
          title="Ir arriba"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 11l5-5m0 0l5 5m-5-5v12"/>
          </svg>
        </button>

        {/* Circular progress indicator */}
        <div className="relative w-16 h-16">
          <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 40 40">
            {/* Background circle */}
            <circle
              cx="20"
              cy="20"
              r="18"
              fill="none"
              stroke="rgba(255, 255, 255, 0.1)"
              strokeWidth="2"
            />
            {/* Progress circle */}
            <circle
              cx="20"
              cy="20"
              r="18"
              fill="none"
              stroke="#60A5FA"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              className="transition-all duration-300 ease-out"
            />
          </svg>
          {/* Percentage text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white text-xs font-medium">
              {progress}%
            </span>
          </div>
        </div>
      </div>

      {/* Mobile version */}
      <div className="md:hidden fixed bottom-6 right-6 z-50">
        {/* Mobile menu (con animaciones fade-in up y fade-out left-to-right) */}
        {(showMobileMenu || isAnimatingOut) && (
          <div className={`absolute bottom-20 right-0 bg-[#1A1A1A]/95 backdrop-blur-md border border-white/10 rounded-2xl p-4 w-[200px] ${
            isAnimatingOut 
              ? 'animate-out fade-out-0 slide-out-to-right-6 duration-300 ease-in' 
              : 'animate-in fade-in-0 slide-in-from-bottom-6 duration-500 ease-out'
          }`}>
            <div className="grid grid-cols-3 gap-3 mb-3">
              {/* Instagram */}
              <button
                onClick={handleInstagramShare}
                className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full flex items-center justify-center hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 hover:scale-110"
                title="Compartir en Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </button>

              {/* Twitter/X */}
              <button
                onClick={handleTwitterShare}
                className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center hover:shadow-lg hover:shadow-gray-500/30 transition-all duration-300 hover:scale-110"
                title="Compartir en X (Twitter)"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </button>

              {/* Facebook */}
              <button
                onClick={handleFacebookShare}
                className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 hover:scale-110"
                title="Compartir en Facebook"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </button>

              {/* WhatsApp */}
              <button
                onClick={handleWhatsAppShare}
                className="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center hover:shadow-lg hover:shadow-green-500/30 transition-all duration-300 hover:scale-110"
                title="Compartir en WhatsApp"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488z"/>
                </svg>
              </button>

              {/* Copiar enlace */}
              <div className="relative">
                <button
                  onClick={handleCopyLink}
                  className="w-12 h-12 bg-gray-700 text-white rounded-full flex items-center justify-center hover:shadow-lg hover:shadow-gray-500/30 transition-all duration-300 hover:scale-110"
                  title="Copiar enlace"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                  </svg>
                </button>
                
                {/* Copied message for mobile */}
                {showCopiedMessage && (
                  <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-white/10 border border-white text-white text-sm px-3 py-1 rounded-lg whitespace-nowrap animate-in fade-in-0 slide-in-from-bottom-2 duration-200">
                    ¡Copiado!
                  </div>
                )}
              </div>

              {/* Scroll to top button */}
              <button
                onClick={scrollToTop}
                className="w-12 h-12 bg-[#1A1A1A] border border-white/10 text-white rounded-full flex items-center justify-center hover:bg-white/5 hover:border-white/20 transition-all duration-300 hover:scale-110"
                title="Ir arriba"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 11l5-5m0 0l5 5m-5-5v12"/>
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Main toggle button with progress indicator for mobile */}
        <div className="relative">
          <button
            onClick={handleToggleMobileMenu}
            className="relative w-16 h-16"
            title="Herramientas"
          >
            {/* Progress circle background */}
            <svg className="absolute inset-0 w-16 h-16 transform -rotate-90" viewBox="0 0 40 40">
              <circle
                cx="20"
                cy="20"
                r="18"
                fill="none"
                stroke="rgba(255, 255, 255, 0.1)"
                strokeWidth="2"
              />
              <circle
                cx="20"
                cy="20"
                r="18"
                fill="none"
                stroke="#60A5FA"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                className="transition-all duration-300 ease-out"
              />
            </svg>
            
            {/* Button content */}
            <div className={`absolute inset-1 rounded-full flex items-center justify-center transition-all duration-300 ${
              showMobileMenu 
                ? 'bg-blue-600 shadow-lg shadow-blue-500/30' 
                : 'bg-[#1A1A1A] border border-white/10'
            }`}>
              <svg 
                className={`w-6 h-6 text-white transition-transform duration-300 ${showMobileMenu ? 'rotate-45' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"/>
              </svg>
            </div>
          </button>
        </div>
      </div>
    </>
  );
}