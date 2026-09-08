'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Gift, 
  Copy, 
  Check, 
  Plane, 
  Utensils, 
  ChefHat, 
  Flame, 
  Coffee, 
  Home, 
  Bed, 
  Music, 
  BookOpen,
  ArrowRight
} from 'lucide-react';

interface GiftsModalProps {
  onClose: () => void;
  onOpenFullGifts?: () => void;
}

interface GiftOption {
  id: string;
  title: string;
  category: string;
  price: string;
  icon: React.ReactNode;
}

const GIFT_OPTIONS: GiftOption[] = [
  {
    id: '1',
    title: 'Cota para Passagens Aéreas',
    category: 'Lua de Mel',
    price: '150.000 AOA',
    icon: <Plane className="w-5 h-5 text-[#810100]" />,
  },
  {
    id: '2',
    title: 'Jantar Romântico na Ilha de Luanda',
    category: 'Lua de Mel',
    price: '80.000 AOA',
    icon: <Utensils className="w-5 h-5 text-[#810100]" />,
  },
  {
    id: '3',
    title: 'Fritadeira sem Óleo (Airfryer)',
    category: 'Cozinha',
    price: '110.000 AOA',
    icon: <Flame className="w-5 h-5 text-[#810100]" />,
  },
  {
    id: '4',
    title: 'Máquina de Café Delta Q',
    category: 'Cozinha',
    price: '85.000 AOA',
    icon: <Coffee className="w-5 h-5 text-[#810100]" />,
  },
  {
    id: '5',
    title: 'Aspirador de Pó Vertical',
    category: 'Casa',
    price: '70.000 AOA',
    icon: <Home className="w-5 h-5 text-[#810100]" />,
  },
  {
    id: '6',
    title: 'Jogo de Lençóis 400 Fios',
    category: 'Conforto',
    price: '55.000 AOA',
    icon: <Bed className="w-5 h-5 text-[#810100]" />,
  },
  {
    id: '7',
    title: 'Soundbar Bluetooth',
    category: 'Sala',
    price: '120.000 AOA',
    icon: <Music className="w-5 h-5 text-[#810100]" />,
  },
  {
    id: '8',
    title: 'Livros de Negócio e Design',
    category: 'Livros',
    price: '7.250 AOA',
    icon: <BookOpen className="w-5 h-5 text-[#810100]" />,
  },
];

export default function GiftsModal({ onClose, onOpenFullGifts }: GiftsModalProps) {
  const [selectedGift, setSelectedGift] = useState<GiftOption | null>(null);
  const [copiedIBAN, setCopiedIBAN] = useState(false);

  const handleCopyIBAN = () => {
    navigator.clipboard.writeText('AO06 0040 0000 0459 2024 1013 8');
    setCopiedIBAN(true);
    setTimeout(() => setCopiedIBAN(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/65 backdrop-blur-sm p-3 sm:p-4 select-none">
      <motion.div
        initial={{ scale: 0.94, opacity: 0, y: 15 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.94, opacity: 0, y: 15 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="bg-[#FAFAF9] border-[5px] border-[#810100]/20 rounded-2xl shadow-2xl max-w-lg w-full max-h-[92vh] flex flex-col relative overflow-hidden"
      >
        {/* Header */}
        <div className="p-4 sm:p-5 pb-3 border-b border-[#810100]/10 flex items-center justify-between bg-[#FAFAF9]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#810100]/10 flex items-center justify-center">
              <Gift className="w-4 h-4 text-[#810100]" />
            </div>
            <div>
              <h3 
                className="text-[22px] text-[#810100] leading-tight"
                style={{ fontFamily: 'var(--font-script)' }}
              >
                Nos Presenteie
              </h3>
              <p className="text-[10px] text-[#810100]/70 uppercase tracking-wider font-bold">
                Lista & Sugestões de Presente
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#810100] hover:bg-[#810100]/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-4 sm:p-5 space-y-4">
          <p className="text-[11.5px] text-[#810100]/80 text-center font-medium leading-relaxed">
            O melhor presente é a sua presença! Se desejar presentear-nos com uma lembrança ou cota para a nossa vida a dois, deixamos algumas opções:
          </p>

          {/* Bank Transfer Box */}
          <div className="bg-[#810100] text-[#FAFAF9] p-4 sm:p-5 rounded-xl shadow-sm relative overflow-hidden space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-wider font-bold text-[#FAFAF9]/80">
                Transferência Direta (BAI)
              </span>
              <span className="text-[10px] uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded-full font-bold">
                Angola
              </span>
            </div>

            <div className="space-y-1 text-xs">
              <div className="flex justify-between">
                <span className="text-[#FAFAF9]/70">Titular:</span>
                <span className="font-bold">Osvaldo da Silva & Mirian Gumbe</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#FAFAF9]/70">Express:</span>
                <span className="font-bold">+244 931 931 304</span>
              </div>
            </div>

            <div className="pt-2 border-t border-white/15 flex items-center justify-between gap-2">
              <div className="bg-black/15 px-2.5 py-1 rounded-md text-[11px] font-mono tracking-tight text-white/95 truncate">
                AO06 0040 0000 0459 2024 1013 8
              </div>
              <button
                onClick={handleCopyIBAN}
                className="flex-shrink-0 flex items-center gap-1 py-1.5 px-3 bg-[#FAFAF9] text-[#810100] text-[10.5px] font-bold uppercase rounded-lg shadow-xs hover:bg-white transition-colors"
              >
                {copiedIBAN ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedIBAN ? 'Copiado!' : 'Copiar'}</span>
              </button>
            </div>
          </div>

          {/* Gift Items Grid */}
          <div className="space-y-2">
            <div className="flex items-center justify-between px-1">
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#810100]">
                Sugestões em Destaque
              </h4>
              {onOpenFullGifts && (
                <button
                  onClick={() => {
                    onClose();
                    onOpenFullGifts();
                  }}
                  className="inline-flex items-center gap-1 text-[10.5px] font-bold text-[#810100] hover:underline"
                >
                  <span>Ver todas</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {GIFT_OPTIONS.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#FAFAF9] p-3 rounded-xl border border-[#810100]/15 shadow-xs flex items-center justify-between gap-2 hover:border-[#810100]/30 transition-colors"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-[#810100]/10 flex items-center justify-center flex-shrink-0">
                      {item.icon}
                    </div>
                    <div className="min-w-0">
                      <p className="text-[12px] font-bold text-[#810100] truncate leading-tight">
                        {item.title}
                      </p>
                      <span className="text-[10px] text-[#810100]/60 font-semibold uppercase">
                        {item.price}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedGift(item)}
                    className="py-1 px-2.5 bg-[#810100] text-[#FAFAF9] text-[10px] font-bold uppercase rounded-md shadow-xs hover:bg-[#680100] transition-colors flex-shrink-0"
                  >
                    Oferecer
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Envelope Note */}
          <p className="text-[10.5px] text-center text-[#810100]/70 font-semibold italic pt-1">
            * Para presentes em envelope físico, haverá uma urna própria na recepção do Solar do Camama.
          </p>
        </div>

        {/* Contribution Modal */}
        <AnimatePresence>
          {selectedGift && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
            >
              <div className="bg-[#FAFAF9] w-full max-w-sm p-5 rounded-xl border border-[#810100]/25 shadow-2xl space-y-3 text-center">
                <div className="w-10 h-10 rounded-full bg-[#810100]/10 flex items-center justify-center mx-auto text-[#810100]">
                  <Gift className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-[14px] font-bold text-[#810100]">
                    {selectedGift.title}
                  </h4>
                  <p className="text-[11px] text-[#810100]/70 font-semibold uppercase">
                    Valor Sugerido: {selectedGift.price}
                  </p>
                </div>
                <p className="text-[11px] text-[#810100]/80 leading-normal">
                  Para presentear, faça a transferência para o IBAN abaixo e envie-nos o comprovativo:
                </p>
                <div className="bg-white/80 p-2.5 rounded-lg border border-[#810100]/20 font-mono text-[10.5px] text-[#810100] font-bold select-all">
                  AO06 0040 0000 0459 2024 1013 8
                </div>
                <div className="flex gap-2 pt-1">
                  <button
                    onClick={handleCopyIBAN}
                    className="flex-1 py-2 bg-[#810100] text-[#FAFAF9] text-[10.5px] font-bold uppercase rounded-lg shadow-xs hover:bg-[#680100]"
                  >
                    {copiedIBAN ? 'IBAN Copiado!' : 'Copiar IBAN'}
                  </button>
                  <button
                    onClick={() => setSelectedGift(null)}
                    className="py-2 px-3 border border-[#810100]/25 text-[#810100] text-[10.5px] font-bold uppercase rounded-lg hover:bg-[#810100]/10"
                  >
                    Fechar
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
