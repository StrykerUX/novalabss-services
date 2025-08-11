"use client";

import { useState, useEffect } from 'react';

export default function ReadingProgressBar() {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = scrollTop / docHeight;
      
      setProgress(scrollPercent);
      setIsVisible(scrollTop > 300); // Show after scrolling 300px
    };

    window.addEventListener('scroll', updateProgress);
    updateProgress(); // Initial call

    return () => {
      window.removeEventListener('scroll', updateProgress);
    };
  }, []);

  return (
    <>
      {/* Fixed Progress Bar at Top */}
      <div 
        className={`
          fixed top-0 left-0 right-0 h-1 bg-blue-600 transform-gpu z-50 transition-transform duration-300 origin-left
          ${isVisible ? 'scale-y-100' : 'scale-y-0'}
        `}
        style={{ transform: `scaleX(${progress})` }}
      />
      
      {/* Floating Back to Top Button */}
      {isVisible && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 w-12 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 z-40 flex items-center justify-center group"
          aria-label="Volver al inicio"
        >
          <svg 
            className="w-5 h-5 transform group-hover:-translate-y-1 transition-transform duration-300" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      )}

      {/* Reading Progress Circle (Alternative Design) */}
      {isVisible && (
        <div className="fixed bottom-24 right-8 w-16 h-16 z-30">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
            {/* Background circle */}
            <path
              className="text-white/10"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            {/* Progress circle */}
            <path
              className="text-blue-500"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeDasharray={`${progress * 100}, 100`}
              strokeLinecap="round"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white text-xs font-semibold">
              {Math.round(progress * 100)}%
            </span>
          </div>
        </div>
      )}
    </>
  );
}