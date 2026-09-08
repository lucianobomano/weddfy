import Image from 'next/image';
import { MapPin, Clock, Heart, Sparkles } from 'lucide-react';
import { GREEN, DARK, WHITE, LIGHT_GRAY, timelineEvents } from './constants';

export default function MiddlePanel() {
  return (
    <div className="flex flex-col h-full">
      <div className="bg-[#FAFAF9] px-4 sm:px-5 py-6 flex-1">
        <div className="text-center mb-4">
          <p className="text-[10px] tracking-[0.3em] uppercase text-[#999] mb-1">NOSSO CASAMENTO</p>
          <h2 className="text-lg sm:text-xl tracking-wide" style={{ fontFamily: 'var(--font-playfair)', fontWeight: 400, color: DARK }}>
            Cerimónia Religiosa & Recepção
          </h2>
        </div>
        <div className="text-center mb-5 flex flex-col items-center">
          <div className="flex flex-col items-center gap-1 mb-3">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#810100]">
              <Clock className="w-3.5 h-3.5" style={{ color: GREEN }} />
              <span>17h00</span>
            </div>
            <div className="flex items-center justify-center gap-1.5 text-xs text-[#333]">
              <MapPin className="w-3.5 h-3.5" style={{ color: GREEN }} />
              <span className="font-semibold">São José de Cluny</span>
            </div>
          </div>

          <div className="flex flex-col items-center gap-1 mb-3">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#810100]">
              <Clock className="w-3.5 h-3.5" style={{ color: GREEN }} />
              <span>20h00</span>
            </div>
            <div className="flex items-center justify-center gap-1.5 text-xs text-[#333]">
              <MapPin className="w-3.5 h-3.5" style={{ color: GREEN }} />
              <span className="font-semibold">Salão de Festas Solar do Camama</span>
            </div>
          </div>

          <div className="px-3 py-1 bg-[#810100]/10 border border-[#810100]/20 rounded-full mb-3">
            <span className="text-[10px] font-bold text-[#810100] tracking-wider uppercase">
              OBS: NÃO LEVAR CRIANÇAS.
            </span>
          </div>

          <a
            href="https://maps.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-4 py-1.5 text-[10px] tracking-[0.15em] uppercase text-[#FAFAF9] rounded-sm transition-colors hover:opacity-90 font-bold"
            style={{ background: GREEN }}
          >
            Ver localização
          </a>
        </div>
        <div className="space-y-0 pr-1">
          {timelineEvents.map((event, i) => (
            <div key={i} className="flex gap-3">
              <div className="text-[11px] font-bold text-[#810100] pt-0.5 w-12 text-right flex-shrink-0">{event.time}</div>
              <div className="flex flex-col items-center flex-shrink-0">
                <div
                  className="w-2.5 h-2.5 rounded-full border-2 mt-0.5"
                  style={{ borderColor: GREEN, background: i === 0 ? GREEN : WHITE }}
                />
                {i < timelineEvents.length - 1 && <div className="w-px flex-1 min-h-[20px]" style={{ background: LIGHT_GRAY }} />}
              </div>
              <div className="pb-3">
                <p className="text-xs font-semibold text-[#810100]">{event.title}</p>
                {event.location && <p className="text-[10px] mt-0.5 text-[#888]">{event.location}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="relative aspect-[16/9] overflow-hidden">
        <Image
          src="/images/hero-couple.jpg"
          alt="Osvaldo & Mirian"
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 33vw"
        />
      </div>
      {/* Dress Code — white section, centered */}
      <div className="px-4 sm:px-5 py-6 bg-[#FAFAF9] flex flex-col items-center justify-center text-center">
        <p className="text-[10px] tracking-[0.3em] uppercase text-[#999] mb-2">CÓDIGO DE VESTIMENTA</p>
        <p className="text-xl sm:text-2xl font-light" style={{ fontFamily: 'var(--font-playfair)', color: DARK }}>
          Elegante
        </p>
        <div className="w-8 h-px my-4" style={{ background: GREEN, opacity: 0.4 }} />

        <div className="w-full space-y-3">
          <div className="flex items-center gap-2.5 justify-center">
            <Sparkles className="w-3.5 h-3.5 flex-shrink-0" style={{ color: GREEN }} />
            <p className="text-xs text-[#555]">Mulheres: Traje longo ou cocktail elegante</p>
          </div>
          <div className="flex items-center gap-2.5 justify-center">
            <Sparkles className="w-3.5 h-3.5 flex-shrink-0" style={{ color: GREEN }} />
            <p className="text-xs text-[#555]">Homens: Terno completo ou camisa e gravata</p>
          </div>
          <div className="flex items-center gap-2.5 justify-center">
            <Heart className="w-3.5 h-3.5 flex-shrink-0" style={{ color: GREEN }} />
            <p className="text-xs text-[#555]">Branco proibido</p>
          </div>
          <div className="flex items-center gap-2.5 justify-center">
            <Clock className="w-3.5 h-3.5 flex-shrink-0" style={{ color: GREEN }} />
            <p className="text-xs text-[#555]">Sapatos confortáveis para a pista de dança</p>
          </div>
        </div>
      </div>
    </div>
  );
}
