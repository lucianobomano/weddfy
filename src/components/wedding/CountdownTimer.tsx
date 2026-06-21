'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

const WEDDING_DATE = new Date('2025-11-14T16:50:00');

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

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState(calcTimeLeft);
  const pad = useCallback((n: number) => String(n).padStart(2, '0'), []);

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calcTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex justify-center gap-1 sm:gap-2 text-white">
      <TimeBlock value={pad(timeLeft.days)} label="DIAS" />
      <Separator />
      <TimeBlock value={pad(timeLeft.hours)} label="HORAS" />
      <Separator />
      <TimeBlock value={pad(timeLeft.minutes)} label="MIN" />
      <Separator />
      <TimeBlock value={pad(timeLeft.seconds)} label="SEG" />
    </div>
  );
}

function TimeBlock({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center min-w-[2rem] sm:min-w-[2.5rem]">
      <div className="text-lg sm:text-2xl font-light tracking-wider">{value}</div>
      <div className="text-[7px] sm:text-[8px] tracking-[0.15em] mt-0.5 opacity-70">{label}</div>
    </div>
  );
}

function Separator() {
  return <div className="text-lg sm:text-2xl font-light opacity-50 pb-3">:</div>;
}