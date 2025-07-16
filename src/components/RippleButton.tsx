"use client";

import { useRef, useEffect, ReactNode } from 'react';
import { gsap } from 'gsap';

interface RippleButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function RippleButton({ 
  children, 
  className = "",
  onClick
}: RippleButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const rippleContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const button = buttonRef.current;
    const rippleContainer = rippleContainerRef.current;
    if (!button || !rippleContainer) return;

    const handleMouseEnter = (e: MouseEvent) => {
      // Create multiple ripple waves
      for (let i = 0; i < 3; i++) {
        const ripple = document.createElement('div');
        ripple.className = 'absolute rounded-full bg-white/20 pointer-events-none';
        
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        ripple.style.width = '4px';
        ripple.style.height = '4px';
        ripple.style.transform = 'translate(-50%, -50%)';
        
        rippleContainer.appendChild(ripple);
        
        // Animate ripple expansion
        gsap.to(ripple, {
          width: '400px',
          height: '400px',
          opacity: 0,
          duration: 1.2 + (i * 0.3),
          ease: "power2.out",
          delay: i * 0.1,
          onComplete: () => {
            if (ripple.parentNode) {
              ripple.parentNode.removeChild(ripple);
            }
          }
        });
      }

      // Button scale effect
      gsap.to(button, {
        scale: 1.05,
        duration: 0.3,
        ease: "power2.out"
      });
    };

    const handleMouseLeave = () => {
      gsap.to(button, {
        scale: 1,
        duration: 0.4,
        ease: "power2.out"
      });
    };

    button.addEventListener('mouseenter', handleMouseEnter);
    button.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      button.removeEventListener('mouseenter', handleMouseEnter);
      button.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <button
      ref={buttonRef}
      onClick={onClick}
      className={`relative overflow-hidden ${className}`}
    >
      <div ref={rippleContainerRef} className="absolute inset-0 pointer-events-none" />
      {children}
    </button>
  );
}