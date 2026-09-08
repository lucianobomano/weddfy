'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Navigation, ExternalLink } from 'lucide-react';

interface LocationModalProps {
  onClose: () => void;
}

export default function LocationModal({ onClose }: LocationModalProps) {
  const googleMapsUrl = 'https://www.google.com/maps/search/?api=1&query=Solar+do+Camama+Luanda';
  const wazeUrl = 'https://waze.com/ul?q=Solar%20do%20Camama%20Luanda';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="fixed inset-0 z-[100] w-full h-full bg-[#FAFAF9] flex flex-col overflow-hidden select-none"
    >
      {/* Top App Bar */}
      <header className="w-full h-16 bg-[#FAFAF9]/95 backdrop-blur-md border-b border-[#810100]/10 px-4 flex items-center justify-between z-20 shadow-xs">
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full flex items-center justify-center bg-[#FAFAF9] border border-[#810100]/20 text-[#810100] hover:bg-[#810100]/10 active:scale-95 transition-all shadow-xs"
            aria-label="Voltar"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 
              className="text-xl text-[#810100] leading-none"
              style={{ fontFamily: 'var(--font-script)' }}
            >
              Localização
            </h2>
            <p className="text-[10px] uppercase tracking-wider font-bold text-[#810100]/60 mt-0.5">
              Salão de Festas Solar do Camama
            </p>
          </div>
        </div>

        <span className="text-[11px] font-bold text-[#810100] bg-[#810100]/10 px-3 py-1 rounded-full">
          20:00H
        </span>
      </header>

      {/* Fullscreen Map Area */}
      <div className="flex-1 relative w-full h-full overflow-hidden bg-[#e9e6df]">
        <iframe
          title="Mapa Salão de Festas Solar do Camama"
          src="/map.html"
          className="w-full h-full border-0 block"
          loading="eager"
        />

        {/* Floating Bottom Card - Minimalist & Direct */}
        <div className="absolute inset-x-0 bottom-6 px-4 z-20 pointer-events-none flex justify-center">
          <div className="w-full max-w-md bg-[#FAFAF9]/95 backdrop-blur-md p-4 rounded-2xl border border-[#810100]/20 shadow-xl pointer-events-auto space-y-3">
            <div>
              <h3 className="text-[15px] font-bold text-[#810100] leading-snug">
                Salão de Festas Solar do Camama
              </h3>
              <p className="text-[11px] font-medium text-[#810100]/70 mt-0.5">
                Camama, Luanda • Recepção às 20:00H
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-2.5 px-3 bg-[#810100] text-[#FAFAF9] text-[11px] font-bold uppercase tracking-wider rounded-xl shadow-xs hover:bg-[#680100] active:scale-[0.98] transition-all text-center"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Google Maps</span>
              </a>

              <a
                href={wazeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-2.5 px-3 bg-[#FAFAF9] border border-[#810100]/30 text-[#810100] text-[11px] font-bold uppercase tracking-wider rounded-xl shadow-xs hover:bg-[#810100]/5 active:scale-[0.98] transition-all text-center"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Waze</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
