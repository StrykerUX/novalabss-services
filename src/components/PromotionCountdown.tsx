"use client";

import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import SmoothMagneticButton from './SmoothMagneticButton';

export default function PromotionCountdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [prevTimeLeft, setPrevTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  
  const daysRef = useRef<HTMLDivElement>(null);
  const hoursRef = useRef<HTMLDivElement>(null);
  const minutesRef = useRef<HTMLDivElement>(null);
  const secondsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Set target date to 40 days from now
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 40);

    const updateTimer = () => {
      const now = new Date().getTime();
      const target = targetDate.getTime();
      const difference = target - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setPrevTimeLeft(timeLeft);
        setTimeLeft({ days, hours, minutes, seconds });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, []);

  // Animate number changes
  useEffect(() => {
    const animateFlip = (ref: React.RefObject<HTMLDivElement>, newValue: number, prevValue: number) => {
      if (ref.current && newValue !== prevValue) {
        gsap.fromTo(ref.current, 
          { rotationX: 0, scale: 1 },
          { 
            rotationX: 360, 
            scale: 1.1,
            duration: 0.6,
            ease: "back.out(1.7)",
            transformOrigin: "center center"
          }
        );
      }
    };

    animateFlip(daysRef, timeLeft.days, prevTimeLeft.days);
    animateFlip(hoursRef, timeLeft.hours, prevTimeLeft.hours);
    animateFlip(minutesRef, timeLeft.minutes, prevTimeLeft.minutes);
    animateFlip(secondsRef, timeLeft.seconds, prevTimeLeft.seconds);
  }, [timeLeft, prevTimeLeft]);

  return (
    <section className="py-20">
      <div className="w-full max-w-[1780px] mx-auto px-[5%]">
        {/* Main promotional card */}
        <div className="bg-[#1A1A1A] rounded-[40px] relative overflow-hidden border border-white/10 p-8 lg:p-16">
          
          {/* Blue radial decorative element */}
          <div className="absolute -top-96 -right-96 w-[960px] h-[960px] opacity-60 pointer-events-none">
            <div className="w-full h-full bg-gradient-radial from-[#0147FF]/30 via-[#0147FF]/10 to-transparent transform rotate-12">
              {/* Starburst pattern */}
              <div className="absolute inset-0 flex items-center justify-center">
                {Array.from({ length: 24 }, (_, i) => (
                  <div
                    key={i}
                    className="absolute w-5 h-50 bg-gradient-to-t from-[#0147FF]/40 to-transparent origin-bottom"
                    style={{
                      transform: `rotate(${i * 15}deg) translateY(-125px)`,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left side - Title and description */}
            <div className="space-y-8">
              <div>
                <h2 className="text-5xl lg:text-7xl font-black text-white leading-[100%] tracking-tight mb-6">
                  OFERTA
                  <br />
                  <span className="bg-gradient-to-r from-[#0147FF] to-[#0147FF80] bg-clip-text text-transparent">
                    ESPECIAL
                  </span>
                </h2>
                <p className="text-lg lg:text-xl text-white/90 leading-relaxed max-w-lg">
                  Asegura tu ventaja competitiva con NovaLabs y únete al futuro del marketing digital mexicano.
                </p>
              </div>

              {/* Promotion details */}
              <div className="space-y-4">
                <div className="inline-flex items-center bg-gradient-to-r from-[#0147FF]/20 to-[#0147FF]/10 border border-[#0147FF]/30 rounded-full px-6 py-3">
                  <span className="text-2xl lg:text-3xl font-black text-white mr-3">33% OFF</span>
                  <span className="text-white/80 text-sm">en tus primeros 2 pagos</span>
                </div>
                <p className="text-white/70 text-sm">
                  * Promoción válida para nuevos usuarios. Aplica solo a los primeros 2 pagos bimestrales.
                </p>
              </div>
            </div>

            {/* Right side - Countdown timer */}
            <div className="space-y-6">
              <div className="text-center lg:text-left">
                <p className="text-white/80 text-lg mb-6">
                  La promoción termina en:
                </p>
              </div>

              {/* Timer display */}
              <div className="grid grid-cols-4 gap-4 lg:gap-6">
                {/* Days */}
                <div className="text-center">
                  <div className="bg-[#2A2A2A] rounded-2xl p-4 lg:p-6 border border-white/10">
                    <div ref={daysRef} className="text-3xl lg:text-5xl font-black text-white leading-none">
                      {timeLeft.days.toString().padStart(2, '0')}
                    </div>
                  </div>
                  <p className="text-white/60 text-xs lg:text-sm mt-2 font-medium tracking-wider">
                    DÍAS
                  </p>
                </div>

                {/* Hours */}
                <div className="text-center">
                  <div className="bg-[#2A2A2A] rounded-2xl p-4 lg:p-6 border border-white/10">
                    <div ref={hoursRef} className="text-3xl lg:text-5xl font-black text-white leading-none">
                      {timeLeft.hours.toString().padStart(2, '0')}
                    </div>
                  </div>
                  <p className="text-white/60 text-xs lg:text-sm mt-2 font-medium tracking-wider">
                    HORAS
                  </p>
                </div>

                {/* Minutes */}
                <div className="text-center">
                  <div className="bg-[#2A2A2A] rounded-2xl p-4 lg:p-6 border border-white/10">
                    <div ref={minutesRef} className="text-3xl lg:text-5xl font-black text-white leading-none">
                      {timeLeft.minutes.toString().padStart(2, '0')}
                    </div>
                  </div>
                  <p className="text-white/60 text-xs lg:text-sm mt-2 font-medium tracking-wider">
                    MINUTOS
                  </p>
                </div>

                {/* Seconds */}
                <div className="text-center">
                  <div className="bg-[#2A2A2A] rounded-2xl p-4 lg:p-6 border border-white/10">
                    <div ref={secondsRef} className="text-3xl lg:text-5xl font-black text-white leading-none">
                      {timeLeft.seconds.toString().padStart(2, '0')}
                    </div>
                  </div>
                  <p className="text-white/60 text-xs lg:text-sm mt-2 font-medium tracking-wider">
                    SEGUNDOS
                  </p>
                </div>
              </div>

              {/* CTA Button */}
              <div className="pt-8">
                <SmoothMagneticButton 
                  className="w-full lg:w-auto text-white px-8 py-4 font-semibold text-lg hover:shadow-2xl hover:shadow-blue-500/40 transition-shadow duration-300 shadow-xl shadow-blue-600/30 flex items-center justify-center lg:justify-start space-x-3"
                  magneticStrength={0.18}
                >
                  <span>Reclamar mi descuento</span>
                  <svg 
                    className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </SmoothMagneticButton>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}