import React, { useState } from 'react';
import Image from 'next/image';
import { AnimatePresence } from 'framer-motion';
import { Clock, MapPin, Gift, Camera, BookOpen } from 'lucide-react';
import MobileMusicPlayer from './MobileMusicPlayer';
import Calendar from './Calendar';
import CountdownTimer from './CountdownTimer';
import LocationModal from './LocationModal';
import GalleryModal from './GalleryModal';
import GiftsModal from './GiftsModal';
import GuestGuideModal from './GuestGuideModal';
import TornPaperDivider from './TornPaperDivider';
import { GREEN, DARK, WHITE, LIGHT_GRAY } from './constants';

interface MobileContentProps {
  onBack: () => void;
  onOpenRSVP: () => void;
  onOpenGifts: () => void;
  initialGuestName?: string;
  isConfirmed?: boolean;
}

export default function MobileContent({ onBack, onOpenRSVP, onOpenGifts, initialGuestName = '', isConfirmed = false }: MobileContentProps) {
  const guestName = initialGuestName;
  const [activeModal, setActiveModal] = useState<'location' | 'gallery' | 'gifts' | 'guide' | null>(null);

  return (
    <div className="min-h-screen bg-[#FAFAF9]">
      {/* Back button */}
      <button
        onClick={onBack}
        className="fixed top-3 left-3 z-50 w-9 h-9 rounded-full flex items-center justify-center bg-[#FAFAF9]/90 backdrop-blur-sm shadow-md border border-[#e0e0e0] transition-colors hover:bg-[#FAFAF9]"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke={GREEN}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M19 12H5" />
          <path d="M12 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Hero Section with Couple Image & Bottom Fog Effect */}
      <div className="relative w-full h-[85vh] min-h-[580px] max-h-[820px] overflow-hidden select-none bg-[#FAFAF9]">
        <Image
          src="/images/hero-couple.jpg"
          alt="Osvaldo e Mirian"
          fill
          className="object-cover object-top"
          priority
          sizes="(max-width: 768px) 100vw, 500px"
        />

        {/* Soft subtle dark/vignette gradient at top for button contrast */}
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/30 via-black/10 to-transparent pointer-events-none" />

        {/* Fog / Foggy gradient overlay at the bottom transitioning seamlessly into the off-white site background */}
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#FAFAF9] via-[#FAFAF9]/80 to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#FAFAF9] to-transparent pointer-events-none" />
      </div>

      {/* New Second Section: Welcome, Quote, Invitation & Parents Blessing */}
      <div
        className="w-full bg-[#FAFAF9] pt-10 pb-12 px-6 flex flex-col items-center text-center relative overflow-hidden select-none"
      >
        {/* 1. Acima da linha, texto de destaque */}
        <div className="w-full flex flex-col items-center">
          <p
            className="text-[20px] sm:text-[14px] font-bold tracking-[0.15em] text-[#810100] uppercase mb-3"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            Bem-vindos<br />
            ao nosso para sempre
          </p>

          {/* Diamond Divider */}
          <div className="relative w-full max-w-[180px] h-3 flex items-center justify-center mb-5">
            <div className="w-full h-[0.5px] bg-[#810100]/30" />
            <div className="absolute w-2 h-2 rotate-45 bg-[#810100]/50" />
          </div>

          {/* 2. Abaixo: Citação bíblica */}
          <div className="max-w-[320px] px-2 mb-6">
            <p
              className="text-[16px] sm:text-[13px] leading-relaxed text-[#810100]/90 italic font-medium"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              “O amor é paciente, o amor é bondoso. Não inveja, não se vangloria, não se orgulha. Tudo sofre, tudo crê, tudo espera, tudo suporta.”
            </p>
            <p
              className="text-[14px] tracking-[0.18em] uppercase font-bold text-[#810100] mt-2"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              1 Coríntios 13:4-7
            </p>
          </div>
        </div>

        {/* 3. A seguir: Texto com a bênção dos pais e convite para o casamento dos filhos */}
        <div className="w-full flex flex-col items-center max-w-[320px]">
          <p
            className="text-[16px] sm:text-[11px] leading-relaxed tracking-[0.12em] text-[#810100]/85 font-semibold mb-4"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            Com a benção de Deus<br />
            <span className="font-bold text-[#810100]">Sadraque Andre Francisco da Silva</span> e <span className="font-bold text-[#810100]">Maria Zua</span><br />
            E <span className="font-bold text-[#810100]">Francisco Antônio Filipe Gumbe</span> e <span className="font-bold text-[#810100]">Ermelinda De Fátima Pahevela Gumbe</span><br />
            <br />
            CONVIDAM PARA O CASAMENTO DOS SEUS FILHOS.
          </p>

          {/* Nomes dos Noivos em destaque caligráfico */}
          <div className="flex flex-col items-center">
            <span
              className="text-[40px] sm:text-[38px] text-[#810100] font-normal leading-tight"
              style={{ fontFamily: 'var(--font-script)' }}
            >
              <br />
              Osvaldo da Silva
            </span>
            <span
              className="text-[16px] text-[#810100]/80 italic font-serif -my-1"
            >
              &amp;
            </span>
            <span
              className="text-[40px] sm:text-[38px] text-[#810100] font-normal leading-tight"
              style={{ fontFamily: 'var(--font-script)' }}
            >
              Mirian Gumbe
            </span>
          </div>
        </div>
      </div>

      {/* Redesigned Second Section */}
      <div
        className="w-full bg-[#FAFAF9] pt-8 pb-14 px-6 flex flex-col items-center text-center select-none"
      >
        {/* Middle Content: O grande dia & Calendar */}
        <div className="w-full flex flex-col items-center">
          <p
            className="text-xs uppercase tracking-[0.2em] text-[#810100] mb-1.5 font-bold"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            O grande dia
          </p>

          {/* Top Divider line */}
          <div className="w-full max-w-[325px] sm:max-w-[350px] h-[0.5px] bg-[#810100]/20 mb-3" />

          {/* Date Title */}
          <p
            className="text-[16px] sm:text-[18px] font-extrabold text-[#810100] tracking-[0.05em] uppercase my-1 text-center"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            SEXTA-FEIRA, 16 DE OUTUBRO DE 2026
          </p>

          {/* Bottom Divider line */}
          <div className="w-full max-w-[325px] sm:max-w-[350px] h-[0.5px] bg-[#810100]/20 mt-3 mb-5" />

          {/* Calendar Grid */}
          <Calendar variant="light" showTitle={false} />
        </div>

        {/* 3. Bottom Content: FALTAM & Countdown (Exact 70px spacing) */}
        <div className="w-full flex flex-col items-center mt-[70px]">
          {/* Divider line above Faltam */}
          <div className="w-full max-w-[325px] sm:max-w-[350px] h-[0.5px] bg-[#810100]/20 mb-5" />

          <p
            className="text-[11px] uppercase tracking-[0.3em] text-[#810100] mb-4 font-bold"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            FALTAM
          </p>

          <CountdownTimer variant="light" />
        </div>
      </div>

      {/* Torn Paper Transition: Countdown to Ceremony */}
      <TornPaperDivider
        topColor="#FAFAF9"
        bottomColor="#F3EBDD"
        variant={1}
      />

      {/* Redesigned Third Section */}
      <div
        className="w-full bg-[#F3EBDD] pt-12 pb-16 px-5 flex flex-col items-center text-center relative overflow-hidden select-none"
        style={{
          backgroundImage: "url('/images/bg03.svg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundColor: '#F3EBDD'
        }}
      >
        {/* 1. Cerimónia Religiosa */}
        <div className="w-full flex flex-col items-center">
          <h3
            className="text-[34px] text-[#810100] font-normal leading-tight mb-2.5"
            style={{ fontFamily: 'var(--font-script)' }}
          >
            Cerimónia Religiosa
          </h3>

          <div className="flex flex-col items-center gap-1.5 mb-3">
            <Clock className="w-5 h-5 text-[#810100] stroke-[1.5]" />
            <span className="text-[14px] font-bold text-[#810100]">17:00H</span>
          </div>

          <div className="flex flex-col items-center gap-1.5">
            <MapPin className="w-5 h-5 text-[#810100] stroke-[1.5]" />
            <span className="text-[15px] font-bold text-[#810100] leading-tight">
              São José de Cluny
            </span>
            <p className="text-[12px] text-[#810100]/80 font-medium max-w-[270px] mt-0.5 leading-snug">
              A cerimónia será realizada na São José de Cluny às 17H
            </p>
          </div>
        </div>

        {/* 2. Recepção */}
        <div className="w-full flex flex-col items-center mt-9">
          <h3
            className="text-[34px] text-[#810100] font-normal leading-tight mb-2.5"
            style={{ fontFamily: 'var(--font-script)' }}
          >
            Recepção dos Convidados
          </h3>

          <div className="flex flex-col items-center gap-1.5 mb-3">
            <Clock className="w-5 h-5 text-[#810100] stroke-[1.5]" />
            <span className="text-[14px] font-bold text-[#810100]">20:00H</span>
          </div>

          <div className="flex flex-col items-center gap-1.5">
            <MapPin className="w-5 h-5 text-[#810100] stroke-[1.5]" />
            <span className="text-[15px] font-bold text-[#810100] leading-tight">
              Salão de Festas Solar do Camama
            </span>
            <p className="text-[12px] text-[#810100]/80 font-medium max-w-[285px] mt-0.5 leading-snug">
              Após a cerimónia religiosa, os convidados serão recepcionados no Salão de Festas Solar do Camama às 20:00H
            </p>
          </div>
        </div>

        {/* 3. OBS: NÃO LEVAR CRIANÇAS Notice Badge */}
        <div className="mt-8 w-full max-w-[270px] py-2.5 rounded-full border border-[#810100]/30 bg-[#810100]/5 flex items-center justify-center shadow-xs">
          <span
            className="text-[11px] font-extrabold tracking-[0.1em] text-[#810100] uppercase"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            OBS: NÃO LEVAR CRIANÇAS.
          </span>
        </div>

        {/* 4 Functional Action Buttons - 1 column grid, same width & roundness */}
        <div className="w-full max-w-[270px] mt-4 flex flex-col gap-2.5 items-center">
          {/* 1. Localização */}
          <button
            onClick={() => setActiveModal('location')}
            className="w-full py-2.5 px-4 rounded-full bg-[#810100] text-[#FAFAF9] shadow-sm hover:bg-[#680100] active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <MapPin className="w-4 h-4 text-[#FAFAF9] flex-shrink-0" />
            <span className="text-[11.5px] font-bold tracking-wider uppercase" style={{ fontFamily: 'var(--font-inter)' }}>
              Localização
            </span>
          </button>

          {/* 2. Nossa Galeria */}
          <button
            onClick={() => setActiveModal('gallery')}
            className="w-full py-2.5 px-4 rounded-full bg-[#810100] text-[#FAFAF9] shadow-sm hover:bg-[#680100] active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <Camera className="w-4 h-4 text-[#FAFAF9] flex-shrink-0" />
            <span className="text-[11.5px] font-bold tracking-wider uppercase" style={{ fontFamily: 'var(--font-inter)' }}>
              Nossa Galeria
            </span>
          </button>

          {/* 3. Nos Presenteie */}
          <button
            onClick={() => setActiveModal('gifts')}
            className="w-full py-2.5 px-4 rounded-full bg-[#810100] text-[#FAFAF9] shadow-sm hover:bg-[#680100] active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <Gift className="w-4 h-4 text-[#FAFAF9] flex-shrink-0" />
            <span className="text-[11.5px] font-bold tracking-wider uppercase" style={{ fontFamily: 'var(--font-inter)' }}>
              Nos Presenteie
            </span>
          </button>

          {/* 4. Manual do Bom Convidado */}
          <button
            onClick={() => setActiveModal('guide')}
            className="w-full py-2.5 px-4 rounded-full bg-[#810100] text-[#FAFAF9] shadow-sm hover:bg-[#680100] active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <BookOpen className="w-4 h-4 text-[#FAFAF9] flex-shrink-0" />
            <span className="text-[11px] font-bold tracking-wider uppercase" style={{ fontFamily: 'var(--font-inter)' }}>
              Manual do Convidado
            </span>
          </button>
        </div>
      </div>

      {/* Torn Paper Transition: Reception/Buttons to Gifts/RSVP */}
      <TornPaperDivider
        topColor="#F3EBDD"
        bottomColor="#810100"
        variant={2}
        flipX
      />

      {/* Redesigned Fourth Section */}
      <div
        className="w-full h-[575px] bg-[#810100] py-[75px] px-6 flex flex-col justify-between items-center text-center select-none"
      >
        {/* Block 1: Sugestão de Presente */}
        <div className="w-full flex flex-col items-center">
          <Gift className="w-8 h-8 text-[#FAFAF9] stroke-[1.2] mb-1" />
          <h3
            className="text-[28px] text-[#FAFAF9] font-normal leading-tight my-1"
            style={{ fontFamily: 'var(--font-script)' }}
          >
            Sugestão de Presente
          </h3>
          <p
            className="text-[12px] leading-relaxed text-[#FAFAF9]/90 max-w-[280px] mt-1.5 mb-4 font-semibold"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            O melhor presente é a sua presença, mas se desejar nos brindar com uma lembrança, desejamos estas opções
          </p>
          <button
            onClick={onOpenGifts}
            className="px-6 py-2 bg-[#eedfc8] text-[#810100] text-[12px] font-bold rounded-full tracking-[0.05em] uppercase hover:bg-[#e0ceb3] transition-all inline-block"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            Ver sugestões
          </button>
        </div>

        {/* Divider with cross */}
        <div className="relative w-full max-w-[260px] h-6 flex items-center justify-center my-1.5">
          <div className="w-full h-[0.5px] bg-[#FAFAF9]/30" />
          <span className="absolute bg-[#810100] px-2.5 text-[11px] text-[#FAFAF9]/60 font-bold select-none">
            ×
          </span>
        </div>

        {/* Block 2: Confirmar presença */}
        <div className="w-full flex flex-col items-center">
          {/* Custom Calendar Heart icon */}
          <div className="relative w-9 h-9 flex items-center justify-center mb-1">
            <svg viewBox="0 0 24 24" fill="none" stroke="#FAFAF9" strokeWidth="1.5" className="w-7 h-7 text-[#FAFAF9]">
              <rect x="3" y="4" width="18" height="16" rx="1.5" />
              <line x1="16" y1="2" x2="16" y2="6" strokeWidth="1.5" />
              <line x1="8" y1="2" x2="8" y2="6" strokeWidth="1.5" />
              <line x1="3" y1="9" x2="21" y2="9" />
            </svg>
            <svg viewBox="0 0 24 24" fill="#FAFAF9" className="absolute w-3 h-3 text-[#FAFAF9] bottom-[6px] right-[11px]">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>
          <h3
            className="text-[28px] text-[#FAFAF9] font-normal leading-tight my-1"
            style={{ fontFamily: 'var(--font-script)' }}
          >
            Confirmar presença
          </h3>
          <p
            className="text-[12px] leading-relaxed text-[#FAFAF9]/90 max-w-[280px] mt-1.5 mb-4 font-semibold"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            Agradecemos que confirmes a sua presença antes do dia 10 de Outubro
          </p>
          <div className="flex flex-col items-center gap-2.5">
            <button
              onClick={onOpenRSVP}
              className={`w-[220px] py-2 text-[#810100] text-[12px] font-bold rounded-full tracking-[0.05em] uppercase transition-all cursor-pointer ${isConfirmed
                ? 'bg-[#eedfc8] hover:bg-[#e0ceb3] border border-[#FAFAF9]/30 shadow-sm'
                : 'bg-[#eedfc8] hover:bg-[#e0ceb3]'
                }`}
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              {isConfirmed ? 'Presença Confirmada ✓' : 'Confirmar Presença'}
            </button>
          </div>
        </div>
      </div>

      {/* Suggested Footer */}
      <footer
        className="w-full h-[135px] bg-[#810100] border-t border-[#FAFAF9]/15 flex flex-col items-center justify-center text-center select-none"
      >
        <p
          className="text-[10px] tracking-[0.25em] text-[#FAFAF9]/70 uppercase font-semibold leading-normal"
          style={{ fontFamily: 'var(--font-inter)' }}
        >
          OSVALDO & MIRIAN
        </p>
        <p
          className="text-[9px] tracking-[0.2em] text-[#FAFAF9]/40 uppercase mt-1 font-semibold"
          style={{ fontFamily: 'var(--font-inter)' }}
        >
          16 DE OUTUBRO DE 2026
        </p>
        <p
          className="text-[8px] tracking-[0.15em] text-[#FAFAF9]/40 uppercase mt-3 font-semibold"
          style={{ fontFamily: 'var(--font-inter)' }}
        >
          Desenvolvido por{' '}
          <a
            href="https://www.instagram.com/bhao.agency/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors underline decoration-white/20 hover:decoration-white"
          >
            Bhao Agency
          </a>
        </p>
      </footer>

      {/* Modals for Action Buttons */}
      <AnimatePresence>
        {activeModal === 'location' && (
          <LocationModal onClose={() => setActiveModal(null)} />
        )}
        {activeModal === 'gallery' && (
          <GalleryModal onClose={() => setActiveModal(null)} />
        )}
        {activeModal === 'gifts' && (
          <GiftsModal
            onClose={() => setActiveModal(null)}
            onOpenFullGifts={onOpenGifts}
          />
        )}
        {activeModal === 'guide' && (
          <GuestGuideModal onClose={() => setActiveModal(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
