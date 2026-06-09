'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const WEDDING_DATE = new Date('2026-09-12T16:00:00');

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

function TimeBlock({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <motion.div
        className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-lg flex items-center justify-center overflow-hidden"
        style={{
          background: 'rgba(212, 175, 55, 0.08)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(212, 175, 55, 0.2)',
        }}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <span className="font-light text-3xl sm:text-4xl md:text-5xl tabular-nums" style={{ color: '#d4af37' }}>
          {String(value).padStart(2, '0')}
        </span>
      </motion.div>
      <span className="mt-2 text-xs sm:text-sm tracking-[0.25em] uppercase" style={{ color: 'rgba(212, 175, 55, 0.7)' }}>
        {label}
      </span>
    </div>
  );
}

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState(calcTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calcTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex gap-3 sm:gap-5 md:gap-8">
      <TimeBlock value={timeLeft.days} label="Dias" />
      <TimeBlock value={timeLeft.hours} label="Horas" />
      <TimeBlock value={timeLeft.minutes} label="Min" />
      <TimeBlock value={timeLeft.seconds} label="Seg" />
    </div>
  );
}
