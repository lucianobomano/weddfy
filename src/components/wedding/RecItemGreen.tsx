import React from 'react';

interface RecItemGreenProps {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

export default function RecItemGreen({ icon, title, desc }: RecItemGreenProps) {
  return (
    <div className="flex items-start gap-2.5">
      <div
        className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
        style={{
          background: 'rgba(255,255,255,0.15)',
          border: '1px solid rgba(255,255,255,0.25)',
        }}
      >
        {icon}
      </div>
      <div>
        <p className="text-xs font-medium text-white/90">{title}</p>
        <p className="text-[10px] mt-0.5 text-white/60">{desc}</p>
      </div>
    </div>
  );
}
