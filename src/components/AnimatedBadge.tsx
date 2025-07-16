"use client";

import { useRef, useEffect, ReactNode } from 'react';
import { gsap } from 'gsap';

interface AnimatedBadgeProps {
  children: ReactNode;
  className?: string;
  pulseDelay?: number;
}

export default function AnimatedBadge({ 
  children, 
  className = "",
  pulseDelay = 0
}: AnimatedBadgeProps) {
  const badgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const badge = badgeRef.current;
    if (!badge) return;

    const handleMouseEnter = () => {
      gsap.to(badge, {
        scale: 1.15,
        duration: 0.3,
        ease: "back.out(1.7)"
      });
    };

    const handleMouseLeave = () => {
      gsap.to(badge, {
        scale: 1,
        duration: 0.4,
        ease: "elastic.out(1, 0.3)"
      });
    };

    badge.addEventListener('mouseenter', handleMouseEnter);
    badge.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      badge.removeEventListener('mouseenter', handleMouseEnter);
      badge.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={badgeRef}
      className={`inline-block ${className}`}
    >
      {children}
    </div>
  );
}