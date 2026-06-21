'use client';

import { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Music2 } from 'lucide-react';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setProgress((prev) => (prev >= 100 ? 0 : prev + 0.5));
      }, 100);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying]);

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
      <SkipBack className="w-3 h-3 text-[#999] cursor-pointer" />
      <div className="flex-1 h-0.5 bg-[#e0e0e0] rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-100"
          style={{ width: `${progress}%`, background: '#6b7c5a' }}
        />
      </div>
      <SkipForward className="w-3 h-3 text-[#999] cursor-pointer" />
      <Music2 className="w-3 h-3 text-[#bbb]" />
    </div>
  );
}