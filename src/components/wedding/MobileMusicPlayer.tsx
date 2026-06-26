'use client';

import { useState, useEffect, useRef } from 'react';

export default function MobileMusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    audioRef.current = new Audio('/audio/o-melhor-lugar.mp3');
    
    const audio = audioRef.current;
    
    const handleTimeUpdate = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };
    
    const handleEnded = () => {
      setIsPlaying(false);
      setProgress(0);
    };
    
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);
    
    return () => {
      audio.pause();
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.play().catch((err) => {
        console.log('Playback prevented by browser auto-play policy:', err);
        setIsPlaying(false);
      });
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  const handleSliderClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!sliderRef.current || !audioRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const percentage = Math.min(100, Math.max(0, (clickX / width) * 100));
    setProgress(percentage);
    
    if (audioRef.current.duration) {
      audioRef.current.currentTime = (percentage / 100) * audioRef.current.duration;
    }
  };

  return (
    <div className="w-full flex flex-col items-center px-4">
      {/* Track progress slider */}
      <div 
        ref={sliderRef}
        onClick={handleSliderClick}
        className="w-full h-[5px] bg-white/30 rounded-full cursor-pointer relative mb-6 flex items-center"
      >
        {/* Active progress */}
        <div 
          className="h-full bg-white rounded-full"
          style={{ width: `${progress}%` }}
        />
        {/* Handle circle */}
        <div 
          className="absolute w-3.5 h-3.5 bg-white rounded-full shadow-md -translate-y-1/2 top-1/2"
          style={{ left: `calc(${progress}% - 7px)` }}
        />
      </div>

      {/* Control Buttons Container */}
      <div className="flex items-center justify-between w-full max-w-[280px]">
        {/* Shuffle */}
        <button className="text-white/80 hover:text-white transition-colors active:scale-90">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 3h5v5M4 20L21 3M21 16v5h-5M15 15l6 6M4 4l5 5"/>
          </svg>
        </button>

        {/* Skip Back */}
        <button 
          onClick={() => {
            if (audioRef.current) audioRef.current.currentTime = 0;
          }}
          className="text-white/95 hover:text-white transition-colors active:scale-90"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="19,20 9,12 19,4" />
            <rect x="5" y="4" width="2" height="16" />
          </svg>
        </button>

        {/* Play/Pause Circle */}
        <button 
          onClick={() => setIsPlaying(!isPlaying)}
          className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-transform"
        >
          {isPlaying ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#6b7c5a">
              <rect x="6" y="4" width="4" height="16" />
              <rect x="14" y="4" width="4" height="16" />
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#6b7c5a" className="translate-x-[2px]">
              <polygon points="5,3 19,12 5,21" />
            </svg>
          )}
        </button>

        {/* Skip Forward */}
        <button 
          onClick={() => {
            if (audioRef.current && audioRef.current.duration) {
              audioRef.current.currentTime = audioRef.current.duration;
            }
          }}
          className="text-white/95 hover:text-white transition-colors active:scale-90"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="5,4 15,12 5,20" />
            <rect x="17" y="4" width="2" height="16" />
          </svg>
        </button>

        {/* Repeat */}
        <button className="text-white/80 hover:text-white transition-colors active:scale-90">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="17 1 21 5 17 9"/>
            <path d="M3 11V9a4 4 0 0 1 4-4h14"/>
            <polyline points="7 23 3 19 7 15"/>
            <path d="M21 13v2a4 4 0 0 1-4 4H3"/>
          </svg>
        </button>
      </div>
    </div>
  );
}
