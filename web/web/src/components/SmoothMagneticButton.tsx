"use client";

import { useRef, useEffect, ReactNode } from 'react';
import { gsap } from 'gsap';

interface SmoothMagneticButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  magneticStrength?: number;
}

export default function SmoothMagneticButton({ 
  children, 
  className = "",
  onClick,
  magneticStrength = 0.2
}: SmoothMagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

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
    };

    const handleMouseEnter = () => {
      gsap.to(button, {
        scale: 1.05,
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
      className={`group bg-gradient-to-r from-[#0147FF] to-[#0147FF38] rounded-full ${className}`}
    >
      {children}
    </button>
  );
}