"use client";

import { useRef, useEffect, ReactNode } from 'react';
import { gsap } from 'gsap';

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  magneticStrength?: number;
}

export default function MagneticButton({ 
  children, 
  className = "", 
  onClick,
  magneticStrength = 0.3 
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const rippleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      gsap.to(button, {
        x: x * magneticStrength,
        y: y * magneticStrength,
        duration: 0.3,
        ease: "power2.out"
      });
    };

    const handleMouseLeave = () => {
      gsap.to(button, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "elastic.out(1, 0.3)"
      });
    };

    const handleClick = (e: MouseEvent) => {
      if (rippleRef.current) {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        gsap.set(rippleRef.current, {
          x: x,
          y: y,
          scale: 0,
          opacity: 1
        });
        
        gsap.to(rippleRef.current, {
          scale: 4,
          opacity: 0,
          duration: 0.6,
          ease: "power2.out"
        });
      }
      
      if (onClick) onClick();
    };

    button.addEventListener('mousemove', handleMouseMove);
    button.addEventListener('mouseleave', handleMouseLeave);
    button.addEventListener('click', handleClick);

    return () => {
      button.removeEventListener('mousemove', handleMouseMove);
      button.removeEventListener('mouseleave', handleMouseLeave);
      button.removeEventListener('click', handleClick);
    };
  }, [magneticStrength, onClick]);

  return (
    <button
      ref={buttonRef}
      className={`relative overflow-hidden ${className}`}
    >
      {children}
      <div
        ref={rippleRef}
        className="absolute w-4 h-4 bg-white/20 rounded-full pointer-events-none"
        style={{ transform: 'translate(-50%, -50%)' }}
      />
    </button>
  );
}