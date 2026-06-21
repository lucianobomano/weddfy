'use client';

import { useMemo } from 'react';

const DAYS = ['SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB', 'DOM'];

// November 2025 starts on Saturday (index 5)
const NOVEMBER_2025 = [
  [null, null, null, null, null, 1, 2],
  [3, 4, 5, 6, 7, 8, 9],
  [10, 11, 12, 13, 14, 15, 16],
  [17, 18, 19, 20, 21, 22, 23],
  [24, 25, 26, 27, 28, 29, 30],
];

export default function Calendar() {
  return (
    <div className="w-full max-w-[200px] mx-auto">
      <div className="text-center text-xs tracking-[0.2em] uppercase text-white/80 mb-2">Novembro 2025</div>
      <div className="bg-white/10 rounded-sm overflow-hidden">
        <div className="grid grid-cols-7 gap-0">
          {DAYS.map((day, i) => (
            <div key={i} className="text-center text-[8px] text-white/50 py-1 tracking-wider font-medium">
              {day}
            </div>
          ))}
          {NOVEMBER_2025.flat().map((day, i) => (
            <div
              key={i}
              className={`text-center text-xs py-1.5 ${
                day === 14
                  ? 'bg-white text-[#6b7c5a] font-semibold rounded-sm mx-0.5'
                  : day
                    ? 'text-white/70'
                    : ''
              }`}
            >
              {day || ''}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}