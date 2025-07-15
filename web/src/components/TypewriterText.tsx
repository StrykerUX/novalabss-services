"use client";

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

interface TypewriterTextProps {
  text: string;
  className?: string;
  speed?: number;
  delay?: number;
}

export default function TypewriterText({ 
  text, 
  className = "",
  speed = 50,
  delay = 0
}: TypewriterTextProps) {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const cursorRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, speed, mounted]);

  useEffect(() => {
    if (!mounted || !cursorRef.current) return;
    
    gsap.to(cursorRef.current, {
      opacity: 0,
      duration: 0.5,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut"
    });
  }, [mounted]);

  useEffect(() => {
    if (!mounted) return;
    
    const timer = setTimeout(() => {
      setCurrentIndex(0);
      setDisplayText('');
    }, delay);

    return () => clearTimeout(timer);
  }, [delay, mounted]);

  return (
    <span className={className}>
      {displayText}
      {mounted && <span ref={cursorRef} className="text-[#0147FF]">|</span>}
    </span>
  );
}