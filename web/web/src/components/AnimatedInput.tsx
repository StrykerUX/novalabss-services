"use client";

import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';

interface AnimatedInputProps {
  type: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  required?: boolean;
  rows?: number;
}

export default function AnimatedInput({
  type,
  name,
  placeholder,
  value,
  onChange,
  required = false,
  rows
}: AnimatedInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLLabelElement>(null);

  const hasValue = value.length > 0;
  const shouldFloat = isFocused || hasValue;

  useEffect(() => {
    if (labelRef.current) {
      gsap.to(labelRef.current, {
        y: shouldFloat ? -20 : 0,
        scale: shouldFloat ? 0.85 : 1,
        color: shouldFloat ? '#0147FF' : 'rgba(255, 255, 255, 0.5)',
        duration: 0.3,
        ease: "power2.out"
      });
    }
  }, [shouldFloat]);

  const handleFocus = () => {
    setIsFocused(true);
    if (lineRef.current) {
      gsap.to(lineRef.current, {
        scaleX: 1,
        duration: 0.3,
        ease: "power2.out"
      });
    }
  };

  const handleBlur = () => {
    setIsFocused(false);
    if (lineRef.current) {
      gsap.to(lineRef.current, {
        scaleX: 0,
        duration: 0.3,
        ease: "power2.out"
      });
    }
    
    // Validation feedback
    if (required && value.length > 0) {
      const valid = type === 'email' ? 
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) : 
        value.length >= 2;
      
      setIsValid(valid);
      
      if (inputRef.current) {
        gsap.to(inputRef.current, {
          x: valid ? 0 : [-5, 5, -5, 5, 0],
          duration: valid ? 0 : 0.5,
          ease: "power2.out"
        });
      }
    }
  };

  const Component = rows ? 'textarea' : 'input';

  return (
    <div className="relative">
      <label
        ref={labelRef}
        className="absolute left-0 top-3 text-white/50 pointer-events-none origin-left transition-colors duration-300"
      >
        {placeholder}
      </label>
      
      <Component
        ref={inputRef as any}
        type={!rows ? type : undefined}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        rows={rows}
        className={`w-full bg-transparent border-0 pt-6 pb-3 px-0 text-white placeholder-transparent focus:outline-none focus:ring-0 transition-colors duration-300 resize-none`}
        required={required}
      />
      
      {/* Base line - always visible */}
      <div className={`absolute bottom-0 left-0 h-px w-full transition-colors duration-300 ${
        isValid === false ? 'bg-red-400' : 
        isValid === true ? 'bg-green-400' : 
        'bg-white/20'
      }`} />
      
      {/* Animated line - shows on focus */}
      <div
        ref={lineRef}
        className="absolute bottom-0 left-0 h-px w-full bg-[#0147FF] origin-left scale-x-0"
      />
      
      {isValid === false && (
        <div className="absolute -bottom-6 left-0 text-red-400 text-xs">
          {type === 'email' ? 'Email inválido' : 'Campo requerido'}
        </div>
      )}
      
      {isValid === true && (
        <div className="absolute -bottom-6 left-0 text-green-400 text-xs">
          ✓ Correcto
        </div>
      )}
    </div>
  );
}