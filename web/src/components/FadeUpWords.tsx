"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface FadeUpWordsProps {
  text: string;
  className?: string;
  staggerDelay?: number;
}

export default function FadeUpWords({ 
  text, 
  className = "",
  staggerDelay = 0.1
}: FadeUpWordsProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !containerRef.current) return;

    const words = containerRef.current.children;
    
    // Set initial visibility
    gsap.set(words, { opacity: 1 });
    
    gsap.fromTo(words, 
      { 
        y: 30,
        rotationX: 90,
        scale: 0.8
      },
      {
        y: 0,
        rotationX: 0,
        scale: 1,
        duration: 0.8,
        ease: "back.out(1.7)",
        stagger: staggerDelay,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [staggerDelay]);

  const words = text.split(' ');

  return (
    <div ref={containerRef} className={className}>
      {words.map((word, index) => (
        <span
          key={index}
          className="inline-block mr-2"
          style={{ perspective: '1000px' }}
        >
          {word}
        </span>
      ))}
    </div>
  );
}