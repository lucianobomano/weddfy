'use client';

const DAYS = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB'];

interface CalendarDay {
  day: number;
  isCurrentMonth: boolean;
  isWeddingDay?: boolean;
}

// October 2026 — week starts on Sunday (DOM=0, SEG=1, TER=2, QUA=3, QUI=4, SEX=5, SAB=6)
// Oct 1 = Thursday (QUI = col 4)
// Leading days from September (30 days): Sun 27, Mon 28, Tue 29, Wed 30
// Oct 16 = Friday (SEX = col 5)
// Oct 31 = Saturday (SAB = col 6) — exactly 35 days (5 full weeks)
const OCTOBER_2026_GRID: CalendarDay[] = [
  // Week 1 — leading days from September
  { day: 27, isCurrentMonth: false },
  { day: 28, isCurrentMonth: false },
  { day: 29, isCurrentMonth: false },
  { day: 30, isCurrentMonth: false },
  { day: 1,  isCurrentMonth: true },
  { day: 2,  isCurrentMonth: true },
  { day: 3,  isCurrentMonth: true },
  // Week 2
  { day: 4,  isCurrentMonth: true },
  { day: 5,  isCurrentMonth: true },
  { day: 6,  isCurrentMonth: true },
  { day: 7,  isCurrentMonth: true },
  { day: 8,  isCurrentMonth: true },
  { day: 9,  isCurrentMonth: true },
  { day: 10, isCurrentMonth: true },
  // Week 3
  { day: 11, isCurrentMonth: true },
  { day: 12, isCurrentMonth: true },
  { day: 13, isCurrentMonth: true },
  { day: 14, isCurrentMonth: true },
  { day: 15, isCurrentMonth: true },
  { day: 16, isCurrentMonth: true, isWeddingDay: true }, // Sexta-feira 16
  { day: 17, isCurrentMonth: true },
  // Week 4
  { day: 18, isCurrentMonth: true },
  { day: 19, isCurrentMonth: true },
  { day: 20, isCurrentMonth: true },
  { day: 21, isCurrentMonth: true },
  { day: 22, isCurrentMonth: true },
  { day: 23, isCurrentMonth: true },
  { day: 24, isCurrentMonth: true },
  // Week 5
  { day: 25, isCurrentMonth: true },
  { day: 26, isCurrentMonth: true },
  { day: 27, isCurrentMonth: true },
  { day: 28, isCurrentMonth: true },
  { day: 29, isCurrentMonth: true },
  { day: 30, isCurrentMonth: true },
  { day: 31, isCurrentMonth: true },
];


interface CalendarProps {
  variant?: 'light' | 'dark';
  showTitle?: boolean;
}

export default function Calendar({ variant = 'dark', showTitle = true }: CalendarProps) {
  const isLight = variant === 'light';

  return (
    <div className="w-full max-w-[325px] sm:max-w-[350px] mx-auto select-none">
      {showTitle && (
        <div 
          className={`text-center text-xs tracking-[0.2em] uppercase mb-3 ${
            isLight ? 'text-[#810100] font-bold' : 'text-white/80'
          }`}
        >
          Outubro 2026
        </div>
      )}
      
      <div className={isLight ? 'bg-transparent' : 'bg-white/10 rounded-sm overflow-hidden p-2.5'}>
        <div className="grid grid-cols-7 gap-y-1.5 sm:gap-y-2">
          {/* Weekday headers */}
          {DAYS.map((day, i) => (
            <div 
              key={i} 
              className={`text-center text-[10.5px] sm:text-[11.5px] py-1 tracking-wider font-bold ${
                isLight ? 'text-[#810100]' : 'text-white/50'
              }`}
            >
              {day}
            </div>
          ))}

          {/* Calendar grid days */}
          {OCTOBER_2026_GRID.map((item, i) => {
            const { day, isCurrentMonth, isWeddingDay } = item;

            if (isWeddingDay) {
              return (
                <div key={i} className="flex items-center justify-center py-0.5">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#810100] text-[#FAFAF9] font-bold text-[13px] sm:text-[14px] flex items-center justify-center shadow-md">
                    {day}
                  </div>
                </div>
              );
            }

            // Normal days
            let textColor = '';
            if (isLight) {
              textColor = isCurrentMonth ? 'text-[#810100] font-semibold' : 'text-[#810100]/25';
            } else {
              textColor = isCurrentMonth ? 'text-white/80' : 'text-white/30';
            }

            return (
              <div 
                key={i} 
                className={`text-center text-[13px] sm:text-[14px] flex items-center justify-center py-2 font-medium ${textColor}`}
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