"use client";

import { useRef, useEffect, ReactNode } from 'react';
import { gsap } from 'gsap';

interface LiquidMagneticButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  magneticStrength?: number;
}

export default function LiquidMagneticButton({ 
  children, 
  className = "",
  onClick,
  magneticStrength = 0.3
}: LiquidMagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const liquidRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const button = buttonRef.current;
    const liquid = liquidRef.current;
    if (!button || !liquid) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = button.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const deltaX = (e.clientX - centerX) * magneticStrength;
      const deltaY = (e.clientY - centerY) * magneticStrength;

      // Smooth magnetic movement
      gsap.to(button, {
        x: deltaX,
        y: deltaY,
        duration: 0.6,
        ease: "power2.out"
      });

      // Very subtle liquid deformation
      const normalizedX = deltaX / 100;
      const normalizedY = deltaY / 100;
      
      gsap.to(liquid, {
        borderRadius: `${50 + normalizedX * 3}% ${50 - normalizedX * 2}% ${50 + normalizedY * 2}% ${50 - normalizedY * 3}%`,
        duration: 0.3,
        ease: "power2.out"
      });
    };

    const handleMouseEnter = () => {
      gsap.to(button, {
        scale: 1.05,
        duration: 0.4,
        ease: "power2.out"
      });

      gsap.to(liquid, {
        borderRadius: "48% 52% 51% 49%",
        duration: 0.4,
        ease: "power2.out"
      });
    };

    const handleMouseLeave = () => {
      gsap.to(button, {
        x: 0,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: "elastic.out(1, 0.3)"
      });

      gsap.to(liquid, {
        borderRadius: "50% 50% 50% 50%",
        duration: 0.6,
        ease: "power2.out"
      });
    };

    button.addEventListener('mousemove', handleMouseMove);
    button.addEventListener('mouseenter', handleMouseEnter);
    button.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      button.removeEventListener('mousemove', handleMouseMove);
      button.removeEventListener('mouseenter', handleMouseEnter);
      button.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [magneticStrength]);

  return (
    <button
      ref={buttonRef}
      onClick={onClick}
      className={`relative ${className}`}
    >
      <div 
        ref={liquidRef}
        className="absolute inset-0 bg-gradient-to-r from-[#0147FF] to-[#0147FF38] rounded-full transition-all duration-300"
        style={{ borderRadius: '50% 50% 50% 50%' }}
      />
      <div className="relative z-10 flex items-center space-x-3">
        {children}
      </div>
    </button>
  );
}