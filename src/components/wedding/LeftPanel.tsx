import Image from 'next/image';
import MusicPlayer from './MusicPlayer';
import Calendar from './Calendar';
import CountdownTimer from './CountdownTimer';
import { GREEN } from './constants';

export default function LeftPanel() {
  return (
    <div className="flex flex-col h-full">
      <div className="px-4 sm:px-5 pt-6 pb-5 text-center text-white" style={{ background: GREEN }}>
        <svg className="mx-auto mb-3" width="28" height="18" viewBox="0 0 28 18" fill="none">
          <path d="M1 1L14 10L27 1" stroke="rgba(255,255,255,0.5)" strokeWidth="1" />
          <path d="M1 17H27V1L14 10L1 1V17Z" stroke="rgba(255,255,255,0.5)" strokeWidth="1" fill="none" />
        </svg>
        <h1 className="text-3xl sm:text-4xl leading-tight" style={{ fontFamily: 'var(--font-script)' }}>
          Luciano
        </h1>
        <div className="text-lg sm:text-xl my-1 opacity-80">&amp;</div>
        <h1 className="text-3xl sm:text-4xl leading-tight" style={{ fontFamily: 'var(--font-script)' }}>
          Auriscidia
        </h1>
        <p className="mt-3 text-[11px] sm:text-xs tracking-[0.25em] opacity-80">14.11.2025</p>
      </div>
      <div className="flex-1 bg-white px-3 sm:px-4 py-4 flex flex-col justify-center">
        <div className="relative aspect-[3/4] rounded-sm overflow-hidden">
          <Image
            src="/images/couple-portrait.png"
            alt="Luciano & Auriscidia"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 33vw"
            priority
          />
        </div>
        <p className="mt-3 text-center text-[11px] sm:text-xs text-[#999] italic">&ldquo;Juntos para sempre&rdquo;</p>
        <div className="mt-3">
          <MusicPlayer />
        </div>
      </div>
      <div className="px-4 sm:px-5 py-5 text-white" style={{ background: GREEN }}>
        <p className="text-center text-[10px] tracking-[0.3em] uppercase opacity-70 mb-3">O GRANDE DIA</p>
        <Calendar />
        <div className="mt-4 pt-3 border-t border-white/10">
          <p className="text-center text-[10px] tracking-[0.2em] uppercase opacity-70 mb-2">FALTAM</p>
          <CountdownTimer />
        </div>
      </div>
    </div>
  );
}
