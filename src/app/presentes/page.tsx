'use client';

import React, { Suspense, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  Plane, 
  Utensils, 
  Compass, 
  Music, 
  ChefHat, 
  Flame, 
  Check, 
  Copy, 
  Heart, 
  Gift,
  Coffee,
  Home,
  Bed,
  BookOpen
} from 'lucide-react';

interface GiftItem {
  id: string;
  title: string;
  category: string;
  price: string;
  progress: number;
  icon: React.ReactNode;
}

function PresentesContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const guestName = searchParams.get('nome') ?? '';
  
  const [selectedGift, setSelectedGift] = useState<GiftItem | null>(null);
  const [copiedIBAN, setCopiedIBAN] = useState(false);

  const gifts: GiftItem[] = [
    {
      id: '1',
      title: 'Cota para Passagens Aéreas',
      category: 'Lua de Mel',
      price: '150.000 AOA',
      progress: 0,
      icon: <Plane className="w-6 h-6 text-[#6b7c5a]" />
    },
    {
      id: '2',
      title: 'Jantar Romântico na Ilha de Luanda',
      category: 'Lua de Mel',
      price: '80.000 AOA',
      progress: 0,
      icon: <Utensils className="w-6 h-6 text-[#6b7c5a]" />
    },
    {
      id: '3',
      title: 'Passeio de Barco na Baía de Luanda',
      category: 'Lua de Mel',
      price: '50.000 AOA',
      progress: 0,
      icon: <Compass className="w-6 h-6 text-[#6b7c5a]" />
    },
    {
      id: '4',
      title: 'Micro-ondas Digital',
      category: 'Cozinha',
      price: '95.000 AOA',
      progress: 0,
      icon: <ChefHat className="w-6 h-6 text-[#6b7c5a]" />
    },
    {
      id: '5',
      title: 'Fritadeira sem Óleo (Airfryer)',
      category: 'Cozinha',
      price: '110.000 AOA',
      progress: 0,
      icon: <Flame className="w-6 h-6 text-[#6b7c5a]" />
    },
    {
      id: '6',
      title: 'Máquina de Café Delta Q',
      category: 'Cozinha',
      price: '85.000 AOA',
      progress: 0,
      icon: <Coffee className="w-6 h-6 text-[#6b7c5a]" />
    },
    {
      id: '7',
      title: 'Aparelho de Jantar (30 peças)',
      category: 'Cozinha',
      price: '75.000 AOA',
      progress: 0,
      icon: <Utensils className="w-6 h-6 text-[#6b7c5a]" />
    },
    {
      id: '8',
      title: 'Liquidificador de Alta Potência',
      category: 'Cozinha',
      price: '45.000 AOA',
      progress: 0,
      icon: <ChefHat className="w-6 h-6 text-[#6b7c5a]" />
    },
    {
      id: '9',
      title: 'Aspirador de Pó Vertical',
      category: 'Casa & Conforto',
      price: '70.000 AOA',
      progress: 0,
      icon: <Home className="w-6 h-6 text-[#6b7c5a]" />
    },
    {
      id: '10',
      title: 'Jogo de Lençóis 400 Fios',
      category: 'Casa & Conforto',
      price: '55.000 AOA',
      progress: 0,
      icon: <Bed className="w-6 h-6 text-[#6b7c5a]" />
    },
    {
      id: '11',
      title: 'Faqueiro de Aço Inox (24 peças)',
      category: 'Cozinha',
      price: '35.000 AOA',
      progress: 0,
      icon: <Utensils className="w-6 h-6 text-[#6b7c5a]" />
    },
    {
      id: '12',
      title: 'Soundbar Bluetooth',
      category: 'Sala de Estar',
      price: '120.000 AOA',
      progress: 0,
      icon: <Music className="w-6 h-6 text-[#6b7c5a]" />
    },
    {
      id: '13',
      title: 'Livros (Negócio, Design Gráfico e Arquitectura)',
      category: 'Livros',
      price: '7.250 AOA',
      progress: 0,
      icon: <BookOpen className="w-6 h-6 text-[#6b7c5a]" />
    }
  ];

  const handleBack = () => {
    if (guestName) {
      router.push(`/?nome=${encodeURIComponent(guestName)}`);
    } else {
      router.push('/');
    }
  };

  const handleCopyIBAN = () => {
    navigator.clipboard.writeText('AO06 0040 0000 1234 5678 1019 2');
    setCopiedIBAN(true);
    setTimeout(() => setCopiedIBAN(false), 2000);
  };

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 bg-[#f5f2ed] select-none">
      {/* Back button */}
      <button
        onClick={handleBack}
        className="fixed top-4 left-4 z-50 w-10 h-10 rounded-full flex items-center justify-center bg-white shadow-md border border-[#e0e0e0] transition-all hover:scale-105 active:scale-95"
      >
        <ArrowLeft className="w-5 h-5 text-[#6b7c5a]" />
      </button>

      <div className="max-w-4xl mx-auto text-center mt-6">
        {/* Title */}
        <div className="flex justify-center mb-2">
          <Heart className="w-8 h-8 fill-[#6B7C5A] text-[#6B7C5A]" />
        </div>
        <h1 
          className="text-4xl sm:text-5xl text-[#363e2d] mb-4"
          style={{ fontFamily: 'var(--font-script)' }}
        >
          Sugestões de Presentes
        </h1>
        <p className="text-xs sm:text-sm text-[#363e2d]/70 max-w-xl mx-auto leading-relaxed font-semibold px-4">
          A vossa presença no nosso casamento é o maior presente que poderíamos receber. 
          No entanto, para quem desejar mimar-nos nesta nova etapa em Luanda, 
          deixamos algumas sugestões simbólicas de presentes e cotas para a nossa lua de mel.
        </p>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 px-2">
          {gifts.map((gift) => (
            <div 
              key={gift.id} 
              className="bg-white p-6 shadow-sm border border-[#6b7c5a]/15 rounded-sm flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className="text-[9px] uppercase tracking-[0.2em] bg-[#6b7c5a]/10 text-[#6b7c5a] px-2 py-0.5 font-bold rounded-sm">
                    {gift.category}
                  </span>
                  <div className="p-2 bg-[#f5f2ed] rounded-full">
                    {gift.icon}
                  </div>
                </div>
                
                <h3 
                  className="text-lg text-left text-[#363e2d] font-normal"
                  style={{ fontFamily: 'var(--font-playfair)' }}
                >
                  {gift.title}
                </h3>
                
                <div className="mt-4">
                  <div className="flex justify-between text-[11px] text-[#363e2d]/65 font-bold mb-1.5">
                    <span>Financiado: {gift.progress}%</span>
                    <span>Valor Sugerido: {gift.price}</span>
                  </div>
                  {/* Progress Bar */}
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-[#6b7c5a] rounded-full transition-all duration-500"
                      style={{ width: `${gift.progress}%` }}
                    />
                  </div>
                </div>
              </div>

              <button
                onClick={() => setSelectedGift(gift)}
                className="w-full mt-6 py-2.5 bg-[#6b7c5a] hover:bg-[#586749] text-white text-[10px] tracking-[0.15em] uppercase font-bold rounded-sm shadow-sm transition-colors"
              >
                Oferecer Presente / Contribuir
              </button>
            </div>
          ))}
        </div>

        {/* General Bank Details Section */}
        <div className="bg-[#6b7c5a] text-white p-8 mt-12 rounded-sm shadow-md text-left mx-2 relative overflow-hidden">
          <div className="absolute right-[-20px] bottom-[-20px] opacity-10">
            <Gift className="w-48 h-48" />
          </div>
          <h3 
            className="text-xl sm:text-2xl mb-4 font-normal"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            Contribuição por Transferência Bancária
          </h3>
          <p className="text-xs text-white/80 leading-relaxed max-w-2xl mb-6 font-semibold">
            Caso prefira fazer uma contribuição livre para a nossa nova etapa de vida, 
            disponibilizamos abaixo os dados bancários angolanos (BAI). Agradecemos o envio do 
            comprovativo para o nosso contacto ou anexo no RSVP.
          </p>

          <div className="space-y-3 max-w-md bg-white/10 p-5 rounded-sm border border-white/15 backdrop-blur-sm">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-white/60">Banco:</span>
              <span className="font-bold">BAI (Banco Angolano de Investimentos)</span>
            </div>
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-white/60">Titular:</span>
              <span className="font-bold">Luciano Manuel & Auriscidia Santos</span>
            </div>
            <div className="flex justify-between items-center text-xs font-semibold gap-4">
              <span className="text-white/60">IBAN:</span>
              <div className="flex items-center gap-2 select-all font-mono text-[11px] bg-black/10 px-2 py-1 rounded-sm">
                <span>AO06 0040 0000 1234 5678 1019 2</span>
              </div>
            </div>
            <div className="pt-2 flex justify-end">
              <button
                onClick={handleCopyIBAN}
                className="flex items-center gap-1.5 px-4 py-2 bg-white text-[#6b7c5a] hover:bg-gray-100 text-[10px] uppercase font-bold tracking-[0.1em] rounded-sm transition-colors shadow-sm"
              >
                {copiedIBAN ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedIBAN ? 'IBAN Copiado!' : 'Copiar IBAN'}
              </button>
            </div>
          </div>
        </div>

        {/* Envelope Info */}
        <p className="text-[10px] text-[#363e2d]/60 font-semibold tracking-[0.05em] uppercase mt-8">
          * Para presentes em envelope físico, haverá uma caixa própria na entrada da receção.
        </p>

        {/* Footer */}
        <footer className="mt-12 pb-10 text-[9px] tracking-[0.15em] text-[#363e2d]/50 uppercase font-semibold select-none">
          Desenvolvido por{' '}
          <a 
            href="https://www.instagram.com/bhao.agency/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-[#363e2d] transition-colors underline decoration-[#363e2d]/20 hover:decoration-[#363e2d]"
          >
            Bhao Agency
          </a>
        </footer>
      </div>

      {/* Contribution Modal */}
      {selectedGift && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 animate-fade-in">
          <div className="bg-white w-full max-w-md p-6 shadow-2xl border border-[#6b7c5a]/25 rounded-sm relative">
            <button 
              onClick={() => setSelectedGift(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 font-bold text-lg p-1"
            >
              ×
            </button>

            <div className="text-center mb-6">
              <div className="w-12 h-12 rounded-full bg-[#6b7c5a]/10 flex items-center justify-center mx-auto mb-3">
                <Gift className="w-6 h-6 text-[#6b7c5a]" />
              </div>
              <h3 
                className="text-xl text-[#363e2d] font-normal"
                style={{ fontFamily: 'var(--font-playfair)' }}
              >
                Contribuir para:
              </h3>
              <p className="text-base text-[#6b7c5a] font-bold mt-1">
                {selectedGift.title}
              </p>
              <p className="text-[11px] text-gray-500 font-semibold uppercase tracking-wider mt-0.5">
                Valor Sugerido: {selectedGift.price}
              </p>
            </div>

            <p className="text-xs text-gray-600 leading-relaxed mb-6 font-semibold">
              Para efetuar a sua contribuição, por favor faça uma transferência bancária (IBAN) 
              ou depósito para a conta abaixo. Se desejar, envie o comprovativo aos noivos.
            </p>

            <div className="bg-[#f5f2ed] p-4 border border-[#6b7c5a]/15 space-y-2.5 rounded-sm text-left">
              <div className="flex justify-between text-[11px] font-semibold text-gray-700">
                <span>Banco:</span>
                <span className="font-bold">Banco Angolano de Investimentos (BAI)</span>
              </div>
              <div className="flex justify-between text-[11px] font-semibold text-gray-700">
                <span>Titular:</span>
                <span className="font-bold">Luciano Manuel & Auriscidia Santos</span>
              </div>
              <div className="flex flex-col gap-1 text-[11px] font-semibold text-gray-700 pt-1.5 border-t border-[#6b7c5a]/10">
                <span>IBAN (Angola):</span>
                <div className="flex items-center justify-between gap-2 bg-white border border-[#6b7c5a]/20 p-2 rounded-sm select-all font-mono text-[10.5px]">
                  <span>AO06 0040 0000 1234 5678 1019 2</span>
                  <button
                    onClick={handleCopyIBAN}
                    className="p-1 text-[#6b7c5a] hover:bg-[#6b7c5a]/10 rounded-full transition-colors flex-shrink-0"
                    title="Copiar IBAN"
                  >
                    {copiedIBAN ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2 mt-6">
              <button
                onClick={handleCopyIBAN}
                className="w-full py-2.5 bg-[#6b7c5a] hover:bg-[#586749] text-white text-[10px] tracking-[0.15em] uppercase font-bold rounded-sm shadow-sm transition-colors"
              >
                {copiedIBAN ? 'IBAN Copiado!' : 'Copiar IBAN da Conta'}
              </button>
              <button
                onClick={() => setSelectedGift(null)}
                className="w-full py-2.5 border border-gray-200 text-gray-500 hover:bg-gray-50 text-[10px] tracking-[0.15em] uppercase font-bold rounded-sm transition-colors"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function PresentesPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#f5f2ed] flex items-center justify-center text-xs text-[#363e2d]/60 font-semibold tracking-widest uppercase">Carregando...</div>}>
      <PresentesContent />
    </Suspense>
  );
}
