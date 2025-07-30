"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const useGSAP = () => {
  const isClient = typeof window !== 'undefined';
  
  return {
    gsap: isClient ? gsap : null,
    ScrollTrigger: isClient ? ScrollTrigger : null,
  };
};

export const useScrollAnimation = (trigger: string, animation: gsap.TweenVars) => {
  const ref = useRef<HTMLElement>(null);
  
  useEffect(() => {
    if (typeof window === 'undefined' || !ref.current) return;
    
    const element = ref.current;
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    });
    
    tl.fromTo(element, 
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", ...animation }
    );
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [animation, trigger]);
  
  return ref;
};