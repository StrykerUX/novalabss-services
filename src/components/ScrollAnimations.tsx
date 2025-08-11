"use client";

import { useEffect, useRef } from 'react';

interface ScrollAnimationsProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade';
}

export default function ScrollAnimations({ 
  children, 
  className = '', 
  delay = 0,
  direction = 'up'
}: ScrollAnimationsProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('animate-in');
            }, delay);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, [delay]);

  const getAnimationClasses = () => {
    switch (direction) {
      case 'up':
        return 'translate-y-8 opacity-0 animate-fade-in-up';
      case 'down':
        return '-translate-y-8 opacity-0 animate-fade-in-down';
      case 'left':
        return 'translate-x-8 opacity-0 animate-fade-in-left';
      case 'right':
        return '-translate-x-8 opacity-0 animate-fade-in-right';
      case 'fade':
        return 'opacity-0 animate-fade-in';
      default:
        return 'translate-y-8 opacity-0 animate-fade-in-up';
    }
  };

  return (
    <div 
      ref={elementRef}
      className={`transition-all duration-700 ease-out ${getAnimationClasses()} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}