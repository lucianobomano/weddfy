import Image from 'next/image';
import { useSearchParams, useRouter } from 'next/navigation';
import { Heart, Users, MapPin, Clock } from 'lucide-react';
import { GREEN } from './constants';
import RecItemGreen from './RecItemGreen';

interface RightPanelProps {
  onOpenRSVP: () => void;
}

export default function RightPanel({ onOpenRSVP }: RightPanelProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const guestName = searchParams.get('nome') ?? '';

  const handleOpenGifts = () => {
    const query = guestName ? `?nome=${encodeURIComponent(guestName)}` : '';
    router.push(`/presentes${query}`);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Green header */}
      <div className="px-4 sm:px-5 py-6 text-white" style={{ background: GREEN }}>
        <p className="text-center text-[10px] tracking-[0.3em] uppercase opacity-70 mb-1">CONFIRMAÇÃO</p>
        <h2 className="text-center text-lg sm:text-xl tracking-wide" style={{ fontFamily: 'var(--font-playfair)', fontWeight: 400 }}>
          Confirmar Presença
        </h2>
      </div>

      {/* GREEN body — recommendations + message */}
      <div className="flex-1 px-4 sm:px-5 py-6 text-white overflow-y-auto" style={{ background: GREEN }}>
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Heart className="w-4 h-4" fill="rgba(255,255,255,0.8)" style={{ color: 'rgba(255,255,255,0.8)' }} />
            <p className="text-[10px] tracking-[0.25em] uppercase text-white/60 font-medium">RECOMENDAÇÕES</p>
          </div>
          <div className="space-y-2.5">
            <RecItemGreen
              icon={<Users className="w-3.5 h-3.5 text-white/70" />}
              title="Apenas Adultos"
              desc="Este evento é exclusivo para adults. Agradecemos a compreensão."
            />
            <RecItemGreen
              icon={<MapPin className="w-3.5 h-3.5 text-white/70" />}
              title="Estacionamento"
              desc="Estacionamento gratuito disponível no local do evento."
            />
            <RecItemGreen
              icon={<Clock className="w-3.5 h-3.5 text-white/70" />}
              title="Pontualidade"
              desc="Por favor, chegue 15 minutos antes da cerimónia."
            />
          </div>
        </div>

        <div className="text-center py-3">
          <p className="text-sm sm:text-base leading-relaxed text-white/90" style={{ fontFamily: 'var(--font-playfair)', fontWeight: 400 }}>
            Esperamos contar com a sua presença neste dia tão especial
          </p>
          <div className="flex justify-center mt-3">
            <div className="w-8 h-px bg-white/30" />
          </div>
        </div>

        <button
          onClick={onOpenRSVP}
          className="w-full mt-6 py-2.5 text-[10px] tracking-[0.15em] uppercase rounded-sm transition-all hover:opacity-90"
          style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)' }}
        >
          Confirmar Presença
        </button>

        <button
          onClick={handleOpenGifts}
          className="w-full mt-2.5 py-2.5 text-[10px] tracking-[0.15em] uppercase rounded-sm transition-all hover:bg-white hover:text-[#6b7c5a]"
          style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.5)', color: '#ffffff' }}
        >
          Ver sugestões
        </button>
      </div>

      {/* Bottom photo */}
      <div className="relative aspect-[16/10] overflow-hidden flex-shrink-0">
        <Image
          src="/images/couple-sunlight.png"
          alt="Luciano & Auriscidia"
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        <div className="absolute bottom-3 left-0 right-0 text-center">
          <p className="text-white text-[10px] tracking-[0.2em] uppercase opacity-80">Luciano & Auriscidia</p>
        </div>
      </div>
    </div>
  );
}
