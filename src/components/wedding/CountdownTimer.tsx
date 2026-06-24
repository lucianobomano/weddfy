'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

const WEDDING_DATE = new Date('2026-07-26T16:50:00');

function calcTimeLeft() {
  const now = new Date().getTime();
  const distance = WEDDING_DATE.getTime() - now;
  if (distance <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
    hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((distance % (1000 * 60)) / 1000),
  };
}

interface CountdownTimerProps {
  variant?: 'light' | 'dark';
}

export default function CountdownTimer({ variant = 'dark' }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState(calcTimeLeft);
  const pad = useCallback((n: number) => String(n).padStart(2, '0'), []);

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calcTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  const isLight = variant === 'light';
  const textColorClass = isLight ? 'text-[#363e2d]' : 'text-white';

  return (
    <div className={`flex justify-center gap-3 sm:gap-4 ${textColorClass} select-none`}>
      <TimeBlock value={pad(timeLeft.days)} label="DIAS" isLight={isLight} />
      <Separator isLight={isLight} />
      <TimeBlock value={pad(timeLeft.hours)} label="HORAS" isLight={isLight} />
      <Separator isLight={isLight} />
      <TimeBlock value={pad(timeLeft.minutes)} label="MIN" isLight={isLight} />
      <Separator isLight={isLight} />
      <TimeBlock value={pad(timeLeft.seconds)} label="SEG" isLight={isLight} />
    </div>
  );
}

function TimeBlock({ value, label, isLight }: { value: string; label: string; isLight: boolean }) {
  return (
    <div className="text-center min-w-[2.2rem] sm:min-w-[2.8rem]">
      <div 
        className={`font-semibold tracking-wider ${
          isLight ? 'text-3xl sm:text-4xl' : 'text-lg sm:text-2xl font-light'
        }`}
      >
        {value}
      </div>
      <div 
        className={`text-[8px] sm:text-[9px] tracking-[0.15em] mt-1.5 font-bold ${
          isLight ? 'text-[#363e2d]/60' : 'text-white/70'
        }`}
      >
        {label}
      </div>
    </div>
  );
}

function Separator({ isLight }: { isLight: boolean }) {
  return (
    <div 
      className={`text-2xl sm:text-3xl font-light pb-4 flex items-center justify-center ${
        isLight ? 'text-[#363e2d]/50 translate-y-[-4px]' : 'text-white/50'
      }`}
    >
      :
    </div>
  );
}