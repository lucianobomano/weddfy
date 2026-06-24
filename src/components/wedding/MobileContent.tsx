import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Heart, Clock, MapPin, Sparkles, Users, Gift } from 'lucide-react';
import MobileMusicPlayer from './MobileMusicPlayer';
import Calendar from './Calendar';
import CountdownTimer from './CountdownTimer';
import RecItemGreen from './RecItemGreen';
import { GREEN, DARK, WHITE, LIGHT_GRAY, timelineEvents } from './constants';

interface MobileContentProps {
  onBack: () => void;
  onOpenRSVP: () => void;
  initialGuestName?: string;
}

export default function MobileContent({ onBack, onOpenRSVP, initialGuestName = '' }: MobileContentProps) {
  const guestName = initialGuestName;
  const router = useRouter();

  const handleOpenGifts = () => {
    const query = guestName ? `?nome=${encodeURIComponent(guestName)}` : '';
    router.push(`/presentes${query}`);
  };

  return (
    <div className="min-h-screen bg-[#f5f2ed]">
      {/* Back button */}
      <button
        onClick={onBack}
        className="fixed top-3 left-3 z-50 w-9 h-9 rounded-full flex items-center justify-center bg-white shadow-md border border-[#e0e0e0] transition-colors hover:bg-gray-50"
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

      {/* Re-designed First Section */}
      <div 
        className="mx-3 mt-3 h-[910px] flex flex-col items-center justify-between py-12 px-5 relative overflow-hidden select-none bg-[#6b7c5a]"
        style={{
          backgroundImage: "url('/images/bg01.svg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        {/* Top Content: names logo, divider, date */}
        <div className="w-full flex flex-col items-center pt-2">
          <div className="relative w-[280px] h-[58px]">
            <Image
              src="/images/logo.svg"
              alt="Auriscidia e Luciano"
              fill
              className="object-contain"
              priority
            />
          </div>
          
          {/* Divider line with diamond */}
          <div className="relative w-full max-w-[160px] h-4 flex items-center justify-center my-3.5">
            <div className="w-full h-[0.5px] bg-[#e1e5de]/40" />
            <div className="absolute w-2 h-2 rotate-45 bg-[#e1e5de]" />
          </div>

          {/* Date */}
          <p className="text-[11px] font-bold text-white tracking-[0.1em] uppercase">
            26.06.2026
          </p>
        </div>

        {/* Middle Content: Photo */}
        <div className="w-full max-w-[305px] h-[450px] bg-white border-[6px] border-[#e1e5de]/40 rounded-sm shadow-inner relative overflow-hidden">
          <Image
            src="/images/couple_photo_bw.png"
            alt="Auriscidia e Luciano"
            fill
            className="object-cover"
            sizes="(max-width: 380px) 100vw, 305px"
            priority
          />
        </div>

        {/* Bottom Content: song text and custom MobileMusicPlayer */}
        <div className="w-full flex flex-col items-center pb-2">
          <p 
            className="text-sm font-bold text-white tracking-wider mb-4"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            Oiça a nossa canção
          </p>
          <MobileMusicPlayer />
        </div>
      </div>

      {/* New Second Section: Poem & Guest Input */}
      <div 
        className="w-full h-[730px] bg-[#E1E5DE] py-[70px] px-6 flex flex-col justify-between items-center text-center relative overflow-hidden select-none"
        style={{
          backgroundImage: "url('/images/bg04.svg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        {/* Diamond Divider */}
        <div className="relative w-full max-w-[200px] h-4 flex items-center justify-center mt-1">
          <div className="w-full h-[0.5px] bg-[#363e2d]/30" />
          <div className="absolute w-2 h-2 rotate-45 bg-[#363e2d]/50" />
        </div>

        {/* Poem Part 1 */}
        <p 
          className="text-[12px] leading-relaxed text-[#363e2d] max-w-[290px] font-bold"
          style={{ fontFamily: 'var(--font-inter)' }}
        >
          Há encontros que parecem acontecer por acaso, mas que, na verdade, foram cuidadosamente escritos e construídos por uma série de escolhas.
        </p>

        {/* Poem Part 2 */}
        <p 
          className="text-[11.5px] leading-relaxed text-[#363e2d]/90 max-w-[285px] font-medium"
          style={{ fontFamily: 'var(--font-inter)' }}
        >
          Com o coração cheio de alegria, nós, <strong className="font-extrabold whitespace-nowrap text-[#363e2d]">Luciano Bom-Ano</strong> e <strong className="font-extrabold text-[#363e2d]">Auriscidia Lopes</strong>, convidamos
        </p>

        {/* Guest Name Display */}
        <div className="w-full max-w-[260px] mx-auto flex flex-col items-center">
          <span className={`w-full text-center border-b border-[#6b7c5a]/40 pb-1 text-[24px] font-semibold ${guestName ? 'text-[#6b7c5a]' : 'text-[#6b7c5a]/40 italic font-normal'}`}>
            {guestName || 'Maria Eduarda & João Silva'}
          </span>
        </div>

        {/* Poem Part 3 */}
        <div className="flex flex-col gap-3.5 my-1">
          <p 
            className="text-[11.5px] leading-relaxed text-[#363e2d] max-w-[290px] font-bold"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            a testemunhar e celebrar connosco o início de um novo capítulo das nossas vidas.
          </p>
          <p 
            className="text-[10.5px] leading-relaxed text-[#363e2d]/80 max-w-[300px] font-medium"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            Será uma honra contar com a sua presença neste dia tão especial, em que, diante de Deus, das nossas famílias e dos nossos amigos, uniremos as nossas histórias, os nossos sonhos e os nossos caminhos durante o tempo em que as estrelas estiverem sobre nós.
          </p>
          <p 
            className="text-[11.5px] leading-relaxed text-[#363e2d] max-w-[290px] font-bold"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            Venha celebrar connosco o amor, a união e a promessa de uma vida inteira a dois.
          </p>
        </div>

        {/* Calligraphic Names */}
        <div className="flex flex-col items-center mb-1">
          <span 
            className="text-[26px] text-[#363e2d] font-normal leading-none"
            style={{ fontFamily: 'var(--font-script)' }}
          >
            Auriscidia Lopes
          </span>
          <span 
            className="text-[13px] text-[#363e2d]/75 italic font-serif my-0.5"
          >
            e
          </span>
          <span 
            className="text-[26px] text-[#363e2d] font-normal leading-none"
            style={{ fontFamily: 'var(--font-script)' }}
          >
            Luciano Bom-Ano
          </span>
        </div>
      </div>

      {/* Redesigned Second Section */}
      <div 
        className="w-full h-[730px] bg-[#F5F2ED] py-[75px] px-6 flex flex-col justify-between items-center text-center select-none"
      >
        {/* 1. Top Text */}
        <p 
          className="text-[13px] leading-relaxed text-[#363e2d] max-w-[290px] font-medium"
          style={{ fontFamily: 'var(--font-inter)' }}
        >
          Com a benção de Deus, nossos pais, temos a honra de convidá-lo ao nosso enlace matrimonial
        </p>

        {/* 2. Middle Content: O grande dia & Calendar */}
        <div className="w-full flex flex-col items-center">
          <p 
            className="text-xs uppercase tracking-[0.2em] text-[#363e2d] mb-1.5 font-bold"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            O grande dia
          </p>
          
          {/* Top Divider line */}
          <div className="w-full max-w-[280px] h-[0.5px] bg-[#363e2d]/20 mb-3" />

          {/* Date Title */}
          <p 
            className="text-[18px] sm:text-[20px] font-extrabold text-[#363e2d] tracking-[0.05em] uppercase my-1"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            DOMINGO 26 DE JULHO 2026
          </p>

          {/* Bottom Divider line */}
          <div className="w-full max-w-[280px] h-[0.5px] bg-[#363e2d]/20 mt-3 mb-5" />

          {/* Calendar Grid */}
          <Calendar variant="light" showTitle={false} />
        </div>

        {/* 3. Bottom Content: FALTAM & Countdown */}
        <div className="w-full flex flex-col items-center">
          {/* Divider line above Faltam */}
          <div className="w-full max-w-[280px] h-[0.5px] bg-[#363e2d]/20 mb-5" />

          <p 
            className="text-[11px] uppercase tracking-[0.3em] text-[#363e2d] mb-4 font-bold"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            FALTAM
          </p>
          
          <CountdownTimer variant="light" />
        </div>
      </div>

      {/* Redesigned Third Section */}
      <div 
        className="w-full h-[1253px] bg-[#E1E5DE] py-[85px] px-5 flex flex-col items-center text-center relative overflow-hidden select-none"
        style={{
          backgroundImage: "url('/images/bg03.svg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        {/* 1. Cerimónia Civil */}
        <div className="w-full flex flex-col items-center">
          <h3 
            className="text-[32px] text-[#363e2d] font-normal leading-tight mb-2.5"
            style={{ fontFamily: 'var(--font-script)' }}
          >
            Cerimónia Civil
          </h3>
          
          <div className="flex flex-col items-center gap-1.5 mb-4">
            <Clock className="w-5 h-5 text-[#363e2d] stroke-[1.5]" />
            <span className="text-[13px] font-bold text-[#363e2d]">14:30 pm</span>
          </div>

          <div className="flex flex-col items-center gap-1.5">
            <MapPin className="w-5 h-5 text-[#363e2d] stroke-[1.5]" />
            <span className="text-[14px] font-bold text-[#363e2d] leading-tight">
              Salão de festas Detalhe Precioso
            </span>
            <div className="flex flex-col text-[11px] text-[#363e2d]/70 leading-normal font-semibold mt-0.5">
              <span>Via Expressa sentido</span>
              <span>kilamba-zango na rua principal do</span>
              <span>kixuxi shopping</span>
            </div>
          </div>
        </div>

        {/* 2. Copo D'água */}
        <div className="w-full flex flex-col items-center mt-9">
          <h3 
            className="text-[32px] text-[#363e2d] font-normal leading-tight mb-2.5"
            style={{ fontFamily: 'var(--font-script)' }}
          >
            Copo D'água
          </h3>
          
          <div className="flex flex-col items-center gap-1.5">
            <span className="text-[13px] font-bold text-[#363e2d] mb-1">16:30 pm</span>
            <div className="flex flex-col text-[11px] text-[#363e2d]/70 leading-normal font-semibold">
              <span>Via Expressa sentido</span>
              <span>kilamba-zango na rua principal do</span>
              <span>kixuxi shopping</span>
            </div>
          </div>
        </div>

        {/* 3. Itinerário */}
        <div className="w-full flex flex-col items-center mt-10">
          <h3 
            className="text-[32px] text-[#363e2d] font-normal leading-tight mb-5"
            style={{ fontFamily: 'var(--font-script)' }}
          >
            Itinerário
          </h3>

          {/* Timeline */}
          <div className="relative w-full max-w-[320px] flex flex-col items-center mt-1">
            {/* Center Vertical Line */}
            <div className="absolute top-2 bottom-6 w-[0.5px] bg-[#363e2d]/30 left-1/2 -translate-x-1/2" />

            {/* Timeline Row 1: Cerimónia Civil (14:30 pm) */}
            <div className="w-full h-[78px] flex items-center justify-center">
              {/* Left: Icon */}
              <div className="w-[125px] flex justify-end pr-5">
                <div className="relative w-[34px] h-[34px]">
                  <Image src="/images/icons/cerimonia_civil.svg" alt="Cerimónia Civil" fill className="object-contain opacity-90" />
                </div>
              </div>
              {/* Center: Dot */}
              <div className="w-6 flex justify-center z-10">
                <div className="w-2.5 h-2.5 rounded-full bg-[#c3c8bc] border border-[#363e2d]" />
              </div>
              {/* Right: Text */}
              <div className="w-[125px] flex flex-col text-left pl-5 justify-center">
                <span className="text-[11px] font-bold text-[#363e2d]">14:30 pm</span>
                <span className="text-[11px] text-[#363e2d]/85 font-semibold mt-0.5 leading-tight">Cerimónia Civil</span>
              </div>
            </div>

            {/* Timeline Row 2: Primeira Dança (16:30 pm) */}
            <div className="w-full h-[78px] flex items-center justify-center">
              {/* Left: Text */}
              <div className="w-[125px] flex flex-col text-right pr-5 justify-center">
                <span className="text-[11px] font-bold text-[#363e2d]">16:30 pm</span>
                <span className="text-[11px] text-[#363e2d]/85 font-semibold mt-0.5 leading-tight">Primeira Dança</span>
                <span className="text-[9px] text-[#363e2d]/70 font-semibold mt-0.5 leading-none">Vale e brindes</span>
              </div>
              {/* Center: Dot */}
              <div className="w-6 flex justify-center z-10">
                <div className="w-2.5 h-2.5 rounded-full bg-[#c3c8bc] border border-[#363e2d]" />
              </div>
              {/* Right: Icon */}
              <div className="w-[125px] flex justify-start pl-5">
                <div className="relative w-[34px] h-[34px]">
                  <Image src="/images/icons/primeira_dança.svg" alt="Primeira Dança" fill className="object-contain opacity-90" />
                </div>
              </div>
            </div>

            {/* Timeline Row 3: Corte do bolo (17:00 pm) */}
            <div className="w-full h-[78px] flex items-center justify-center">
              {/* Left: Icon */}
              <div className="w-[125px] flex justify-end pr-5">
                <div className="relative w-[34px] h-[34px]">
                  <Image src="/images/icons/corte_de_bolo.svg" alt="Corte do Bolo" fill className="object-contain opacity-90" />
                </div>
              </div>
              {/* Center: Dot */}
              <div className="w-6 flex justify-center z-10">
                <div className="w-2.5 h-2.5 rounded-full bg-[#c3c8bc] border border-[#363e2d]" />
              </div>
              {/* Right: Text */}
              <div className="w-[125px] flex flex-col text-left pl-5 justify-center">
                <span className="text-[11px] font-bold text-[#363e2d]">17:00 pm</span>
                <span className="text-[11px] text-[#363e2d]/85 font-semibold mt-0.5 leading-tight">Corte do bolo</span>
              </div>
            </div>

            {/* Timeline Row 4: Jantar (18:30 pm) */}
            <div className="w-full h-[78px] flex items-center justify-center">
              {/* Left: Text */}
              <div className="w-[125px] flex flex-col text-right pr-5 justify-center">
                <span className="text-[11px] font-bold text-[#363e2d]">18:30 pm</span>
                <span className="text-[11px] text-[#363e2d]/85 font-semibold mt-0.5 leading-tight">Jantar</span>
              </div>
              {/* Center: Dot */}
              <div className="w-6 flex justify-center z-10">
                <div className="w-2.5 h-2.5 rounded-full bg-[#c3c8bc] border border-[#363e2d]" />
              </div>
              {/* Right: Icon */}
              <div className="w-[125px] flex justify-start pl-5">
                <div className="relative w-[34px] h-[34px]">
                  <Image src="/images/icons/jantar.svg" alt="Jantar" fill className="object-contain opacity-90" />
                </div>
              </div>
            </div>

            {/* Timeline Row 5: Festa (20:00 pm) */}
            <div className="w-full h-[78px] flex items-center justify-center">
              {/* Left: Icon */}
              <div className="w-[125px] flex justify-end pr-5">
                <div className="relative w-[34px] h-[34px]">
                  <Image src="/images/icons/festa.svg" alt="Festa" fill className="object-contain opacity-90" />
                </div>
              </div>
              {/* Center: Dot */}
              <div className="w-6 flex justify-center z-10">
                <div className="w-2.5 h-2.5 rounded-full bg-[#c3c8bc] border border-[#363e2d]" />
              </div>
              {/* Right: Text */}
              <div className="w-[125px] flex flex-col text-left pl-5 justify-center">
                <span className="text-[11px] font-bold text-[#363e2d]">20:00 pm</span>
                <span className="text-[11px] text-[#363e2d]/85 font-semibold mt-0.5 leading-tight">Festa</span>
              </div>
            </div>

            {/* Timeline Row 6: Fim (23:00 pm) */}
            <div className="w-full h-[78px] flex items-center justify-center">
              {/* Left: Text */}
              <div className="w-[125px] flex flex-col text-right pr-5 justify-center">
                <span className="text-[11px] font-bold text-[#363e2d]">23:00 pm</span>
                <span className="text-[11px] text-[#363e2d]/85 font-semibold mt-0.5 leading-tight">Fim</span>
              </div>
              {/* Center: Dot */}
              <div className="w-6 flex justify-center z-10">
                <div className="w-2.5 h-2.5 rounded-full bg-[#c3c8bc] border border-[#363e2d]" />
              </div>
              {/* Right: Icon */}
              <div className="w-[125px] flex justify-start pl-5">
                <div className="relative w-[34px] h-[34px]">
                  <Image src="/images/icons/fim.svg" alt="Fim" fill className="object-contain opacity-90" />
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Redesigned Fourth Section */}
      <div 
        className="w-full h-[575px] bg-[#6B7C5A] py-[75px] px-6 flex flex-col justify-between items-center text-center select-none"
      >
        {/* Block 1: Sugestão de Presente */}
        <div className="w-full flex flex-col items-center">
          <Gift className="w-8 h-8 text-[#f5f2ed] stroke-[1.2] mb-1" />
          <h3 
            className="text-[28px] text-[#f5f2ed] font-normal leading-tight my-1"
            style={{ fontFamily: 'var(--font-script)' }}
          >
            Sugestão de Presente
          </h3>
          <p 
            className="text-[12px] leading-relaxed text-[#f5f2ed]/90 max-w-[280px] mt-1.5 mb-4 font-semibold"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            O melhor presente é a sua presença, mas se desejar nos brindar com uma lembrança, desejamos estas opções
          </p>
          <button 
            onClick={handleOpenGifts}
            className="px-6 py-2 bg-[#2d3224] text-white text-[12px] font-bold rounded-full tracking-[0.05em] uppercase hover:bg-[#1f2219] transition-all"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            Ver sugestões
          </button>
        </div>

        {/* Divider with cross */}
        <div className="relative w-full max-w-[260px] h-6 flex items-center justify-center my-1.5">
          <div className="w-full h-[0.5px] bg-[#f5f2ed]/30" />
          <span className="absolute bg-[#6b7c5a] px-2.5 text-[11px] text-[#f5f2ed]/60 font-bold select-none">
            ×
          </span>
        </div>

        {/* Block 2: Confirmar presença */}
        <div className="w-full flex flex-col items-center">
          {/* Custom Calendar Heart icon */}
          <div className="relative w-9 h-9 flex items-center justify-center mb-1">
            <svg viewBox="0 0 24 24" fill="none" stroke="#f5f2ed" strokeWidth="1.5" className="w-7 h-7 text-[#f5f2ed]">
              <rect x="3" y="4" width="18" height="16" rx="1.5" />
              <line x1="16" y1="2" x2="16" y2="6" strokeWidth="1.5" />
              <line x1="8" y1="2" x2="8" y2="6" strokeWidth="1.5" />
              <line x1="3" y1="9" x2="21" y2="9" />
            </svg>
            <svg viewBox="0 0 24 24" fill="#f5f2ed" className="absolute w-3 h-3 text-[#f5f2ed] bottom-[6px] right-[11px]">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </div>
          <h3 
            className="text-[28px] text-[#f5f2ed] font-normal leading-tight my-1"
            style={{ fontFamily: 'var(--font-script)' }}
          >
            Confirmar presença
          </h3>
          <p 
            className="text-[12px] leading-relaxed text-[#f5f2ed]/90 max-w-[280px] mt-1.5 mb-4 font-semibold"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            Agradecemos que confirmes a sua presença antes do dia 10 de Julho
          </p>
          <div className="flex flex-col items-center gap-2.5">
            <button 
              onClick={onOpenRSVP}
              className="w-[220px] py-2 bg-[#2d3224] text-white text-[12px] font-bold rounded-full tracking-[0.05em] uppercase hover:bg-[#1f2219] transition-all"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              Confirmar Presença
            </button>
          </div>
        </div>
      </div>

      {/* Redesigned Fifth Section */}
      <div 
        className="w-full h-[385px] bg-[#C4CBBD] py-[78px] px-6 flex flex-col justify-between items-center text-center select-none"
      >
        <p 
          className="text-xs uppercase tracking-[0.25em] text-[#363e2d] mb-1.5 font-bold"
          style={{ fontFamily: 'var(--font-inter)' }}
        >
          Código de Vestimenta
        </p>
        <h3 
          className="text-[34px] text-[#363e2d] font-normal leading-tight my-0.5"
          style={{ fontFamily: 'var(--font-script)' }}
        >
          Elegante
        </h3>
        <div className="w-[60px] h-[0.5px] bg-[#363e2d]/30 my-2" />
        
        <div 
          className="flex flex-col gap-2.5 text-[11.5px] text-[#363e2d] font-semibold tracking-[0.02em] leading-normal"
          style={{ fontFamily: 'var(--font-inter)' }}
        >
          <span>Mulheres: Traje longo ou cocktail elegante</span>
          <span>Homens: Terno completo ou camisa e gravata</span>
          <div className="flex flex-col mt-1 text-[12px] uppercase font-extrabold text-[#363e2d] tracking-[0.05em]">
            <span>Proíbido usar branco como</span>
            <span className="mt-0.5">cor predominante</span>
          </div>
          <span className="mt-1.5 text-[#363e2d]/85 font-semibold">
            Sapatos confortáveis para a pista de dança
          </span>
        </div>
      </div>

      {/* Redesigned Sixth Section */}
      <div 
        className="w-full h-[1120px] bg-[#F5F2ED] py-[75px] px-6 flex flex-col justify-between items-center text-center select-none"
      >
        {/* Top Header */}
        <div className="w-full flex flex-col items-center">
          <div className="flex justify-center mb-1">
            <Heart className="w-[28px] h-[28px] fill-[#6B7C5A] text-[#6B7C5A]" />
          </div>
          <h3 
            className="text-[32px] text-[#363e2d] font-normal leading-tight mb-2.5"
            style={{ fontFamily: 'var(--font-script)' }}
          >
            Recomendações
          </h3>
          <p 
            className="text-[11.5px] text-[#363e2d]/70 max-w-[270px] leading-relaxed mb-1 font-semibold"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            Seguir com as indicações do protocolo da festa. <br/>
            Ser pontual
          </p>
        </div>

        {/* Rows */}
        <div className="w-full flex flex-col items-center gap-6">
          <div className="flex flex-col items-center">
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#363e2d] font-bold">SEM CRIANÇAS</span>
            <p className="text-[11.5px] text-[#363e2d]/70 mt-1 max-w-[250px] leading-normal font-semibold">
              Este é um evento para adultos e esperamos que as crianças fiquem em casa
            </p>
          </div>

          <div className="flex flex-col items-center">
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#363e2d] font-bold">ESTACIONAMENTO</span>
            <p className="text-[11.5px] text-[#363e2d]/70 mt-1 max-w-[250px] leading-normal font-semibold">
              Estacionamento gratuito no local
            </p>
          </div>

          <div className="flex flex-col items-center">
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#363e2d] font-bold">PONTUALIDADE</span>
            <p className="text-[11.5px] text-[#363e2d]/70 mt-1 max-w-[250px] leading-normal font-semibold">
              Chegue 15 minutos antes da cerimónia
            </p>
          </div>
        </div>

        {/* Bottom Text */}
        <div className="flex flex-col items-center">
          <span 
            className="text-[10px] uppercase tracking-[0.25em] text-[#363e2d]/60 font-bold mb-1"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            CONTAMOS COM A SUA PRESENÇA
          </span>
          <span 
            className="text-[28px] text-[#363e2d]"
            style={{ fontFamily: 'var(--font-script)' }}
          >
            Muito Obrigado
          </span>
        </div>

        {/* Photo frame */}
        <div className="w-full max-w-[305px] h-[450px] bg-white border-[6px] border-[#c4cbbd] rounded-sm shadow-inner relative overflow-hidden mt-1.5 mx-auto">
          <Image
            src="/images/couple_photo_bw.png"
            alt="Auriscidia e Luciano"
            fill
            className="object-cover"
            sizes="(max-width: 380px) 100vw, 305px"
          />
        </div>
      </div>

      {/* Suggested Footer */}
      <footer 
        className="w-full h-[125px] bg-[#505D44] flex flex-col items-center justify-center text-center select-none"
      >
        <p 
          className="text-[10px] tracking-[0.25em] text-[#E1E5DE]/70 uppercase font-semibold leading-normal"
          style={{ fontFamily: 'var(--font-inter)' }}
        >
          AURISCIDIA & LUCIANO
        </p>
        <p 
          className="text-[9px] tracking-[0.2em] text-[#E1E5DE]/40 uppercase mt-1 font-semibold"
          style={{ fontFamily: 'var(--font-inter)' }}
        >
          14 DE NOVEMBRO DE 2025
        </p>
        <p 
          className="text-[8px] tracking-[0.15em] text-[#E1E5DE]/40 uppercase mt-3 font-semibold"
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
    </div>
  );
}
