'use client';

const DAYS = ['SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB', 'DOM'];

interface CalendarDay {
  day: number;
  isCurrentMonth: boolean;
  isWeddingDay?: boolean;
}

const JULY_2026_GRID: CalendarDay[] = [
  { day: 28, isCurrentMonth: false },
  { day: 29, isCurrentMonth: false },
  { day: 30, isCurrentMonth: false },
  { day: 1, isCurrentMonth: true },
  { day: 2, isCurrentMonth: true },
  { day: 3, isCurrentMonth: true },
  { day: 4, isCurrentMonth: true },
  { day: 5, isCurrentMonth: true },
  { day: 6, isCurrentMonth: true },
  { day: 7, isCurrentMonth: true },
  { day: 8, isCurrentMonth: true },
  { day: 9, isCurrentMonth: true },
  { day: 10, isCurrentMonth: true },
  { day: 11, isCurrentMonth: true },
  { day: 12, isCurrentMonth: true },
  { day: 13, isCurrentMonth: true },
  { day: 14, isCurrentMonth: true },
  { day: 15, isCurrentMonth: true },
  { day: 16, isCurrentMonth: true },
  { day: 17, isCurrentMonth: true },
  { day: 18, isCurrentMonth: true },
  { day: 19, isCurrentMonth: true },
  { day: 20, isCurrentMonth: true },
  { day: 21, isCurrentMonth: true },
  { day: 22, isCurrentMonth: true },
  { day: 23, isCurrentMonth: true },
  { day: 24, isCurrentMonth: true },
  { day: 25, isCurrentMonth: true },
  { day: 26, isCurrentMonth: true, isWeddingDay: true },
  { day: 27, isCurrentMonth: true },
  { day: 28, isCurrentMonth: true },
  { day: 29, isCurrentMonth: true },
  { day: 30, isCurrentMonth: true },
  { day: 31, isCurrentMonth: true },
  { day: 1, isCurrentMonth: false },
  { day: 2, isCurrentMonth: false },
  { day: 3, isCurrentMonth: false },
  { day: 4, isCurrentMonth: false },
  { day: 5, isCurrentMonth: false },
  { day: 6, isCurrentMonth: false },
  { day: 7, isCurrentMonth: false },
  { day: 8, isCurrentMonth: false },
];

interface CalendarProps {
  variant?: 'light' | 'dark';
  showTitle?: boolean;
}

export default function Calendar({ variant = 'dark', showTitle = true }: CalendarProps) {
  const isLight = variant === 'light';

  return (
    <div className="w-full max-w-[280px] mx-auto select-none">
      {showTitle && (
        <div 
          className={`text-center text-xs tracking-[0.2em] uppercase mb-3 ${
            isLight ? 'text-[#363e2d] font-bold' : 'text-white/80'
          }`}
        >
          Julho 2026
        </div>
      )}
      
      <div className={isLight ? 'bg-transparent' : 'bg-white/10 rounded-sm overflow-hidden p-2'}>
        <div className="grid grid-cols-7 gap-y-1">
          {/* Weekday headers */}
          {DAYS.map((day, i) => (
            <div 
              key={i} 
              className={`text-center text-[9px] py-1 tracking-wider font-bold ${
                isLight ? 'text-[#363e2d]' : 'text-white/50'
              }`}
            >
              {day}
            </div>
          ))}

          {/* Calendar grid days */}
          {JULY_2026_GRID.map((item, i) => {
            const { day, isCurrentMonth, isWeddingDay } = item;

            if (isWeddingDay) {
              return (
                <div key={i} className="flex items-center justify-center py-1">
                  <div className="relative w-8 h-8 flex items-center justify-center">
                    {/* Leafy Green Heart SVG */}
                    <svg viewBox="0 0 24 24" fill="#6b7c5a" className="absolute w-7 h-7 text-[#6b7c5a] opacity-80">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                    </svg>
                    <span className="relative z-10 text-white font-bold text-[11px] leading-none">
                      {day}
                    </span>
                  </div>
                </div>
              );
            }

            // Normal days
            let textColor = '';
            if (isLight) {
              textColor = isCurrentMonth ? 'text-[#363e2d] font-medium' : 'text-[#363e2d]/30';
            } else {
              textColor = isCurrentMonth ? 'text-white/80' : 'text-white/30';
            }

            return (
              <div 
                key={i} 
                className={`text-center text-xs flex items-center justify-center py-2 font-semibold ${textColor}`}
              >
                {day}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}