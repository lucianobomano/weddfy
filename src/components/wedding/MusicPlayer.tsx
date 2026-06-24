'use client';

import { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Music2 } from 'lucide-react';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    audioRef.current = new Audio('/audio/song.mp3');
    
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
    <div className="flex items-center gap-3">
      <button
        onClick={() => setIsPlaying(!isPlaying)}
        className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
        style={{
          background: isPlaying ? '#6b7c5a' : 'transparent',
          border: '1px solid #e0e0e0',
        }}
      >
        {isPlaying ? (
          <Pause className="w-3 h-3 text-white" />
        ) : (
          <Play className="w-3 h-3 text-[#888]" />
        )}
      </button>
      <SkipBack className="w-3 h-3 text-[#999] cursor-pointer" onClick={() => {
        if (audioRef.current) audioRef.current.currentTime = 0;
      }} />
      <div 
        ref={sliderRef}
        onClick={handleSliderClick}
        className="flex-1 h-[6px] bg-[#e0e0e0] rounded-full cursor-pointer relative flex items-center"
      >
        <div
          className="h-full rounded-full bg-[#6b7c5a]"
          style={{ width: `${progress}%` }}
        />
      </div>
      <SkipForward className="w-3 h-3 text-[#999] cursor-pointer" onClick={() => {
        if (audioRef.current) audioRef.current.currentTime = audioRef.current.duration || 0;
      }} />
      <Music2 className="w-3 h-3 text-[#bbb]" />
    </div>
  );
}