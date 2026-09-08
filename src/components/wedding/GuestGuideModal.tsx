'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  X, 
  BookOpen, 
  Clock, 
  Sparkles, 
  Baby, 
  Camera, 
  CheckCircle, 
  HeartHandshake, 
  Heart
} from 'lucide-react';

interface GuestGuideModalProps {
  onClose: () => void;
}

interface GuideItem {
  icon: React.ReactNode;
  title: string;
  badge: string;
  description: string;
}

const GUIDE_ITEMS: GuideItem[] = [
  {
    icon: <Clock className="w-5 h-5 text-[#810100]" />,
    title: 'Pontualidade é Amor',
    badge: '17:00H',
    description: 'A cerimónia religiosa na São José de Cluny terá início pontualmente às 17H. Chegue com 15 a 20 minutos de antecedência para encontrar o seu lugar com tranquilidade.',
  },
  {
    icon: <Sparkles className="w-5 h-5 text-[#810100]" />,
    title: 'O Branco é Exclusivo da Noiva',
    badge: 'Vestuário',
    description: 'Pedimos gentilmente que evite vestidos brancos, off-white ou marfim. Esta cor é reservada com todo carinho exclusivamente para a noiva.',
  },
  {
    icon: <Baby className="w-5 h-5 text-[#810100]" />,
    title: 'Evento Sem Crianças',
    badge: 'Adults Only',
    description: 'OBS: NÃO LEVAR CRIANÇAS. O nosso casamento foi planeado como uma celebração exclusiva para adultos. Desfrute da noite para relaxar, brindar e dançar connosco!',
  },
  {
    icon: <Camera className="w-5 h-5 text-[#810100]" />,
    title: 'Cerimónia Conectada',
    badge: 'Fotografia',
    description: 'Pode registar fotos a partir do seu lugar, mas pedimos a gentileza de não invadir o corredor central para não obstruir a equipa oficial de fotografia e filmagem.',
  },
  {
    icon: <CheckCircle className="w-5 h-5 text-[#810100]" />,
    title: 'Confirmação de Presença',
    badge: 'Até 10 Outubro',
    description: 'A sua confirmação é essencial para a organização do buffet e dos lugares no Salão de Festas Solar do Camama. Confirme com antecedência através do botão RSVP.',
  },
  {
    icon: <HeartHandshake className="w-5 h-5 text-[#810100]" />,
    title: 'Celebre Connosco até o Fim',
    badge: 'Alegria',
    description: 'A pista de dança e a festa foram preparadas para si. Brinde, cante, sorria e aproveite ao máximo cada instante desta noite inesquecível!',
  },
];

export default function GuestGuideModal({ onClose }: GuestGuideModalProps) {
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
              <BookOpen className="w-4 h-4 text-[#810100]" />
            </div>
            <div>
              <h3 
                className="text-[22px] text-[#810100] leading-tight"
                style={{ fontFamily: 'var(--font-script)' }}
              >
                Manual do Bom Convidado
              </h3>
              <p className="text-[10px] text-[#810100]/70 uppercase tracking-wider font-bold">
                Orientações para o nosso dia
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
        <div className="overflow-y-auto p-4 sm:p-5 space-y-3">
          <p className="text-[11.5px] text-[#810100]/80 text-center font-medium leading-relaxed pb-1">
            Preparamos este pequeno guia com muito carinho para que juntos possamos viver momentos de pura harmonia e alegria:
          </p>

          <div className="space-y-2.5">
            {GUIDE_ITEMS.map((item, index) => (
              <div
                key={index}
                className="bg-[#FAFAF9] p-3.5 rounded-xl border border-[#810100]/15 shadow-xs flex items-start gap-3 hover:border-[#810100]/30 transition-colors"
              >
                <div className="w-8 h-8 rounded-lg bg-[#810100]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  {item.icon}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h4 className="text-[13px] font-bold text-[#810100] leading-tight">
                      {item.title}
                    </h4>
                    <span className="text-[9px] font-bold uppercase tracking-wider bg-[#810100]/10 text-[#810100] px-2 py-0.5 rounded-full flex-shrink-0">
                      {item.badge}
                    </span>
                  </div>
                  <p className="text-[11.5px] text-[#810100]/75 font-medium leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center pt-4 border-t border-[#810100]/10 flex items-center justify-center gap-1.5 text-[11px] text-[#810100]/70 font-bold uppercase tracking-wider">
            <Heart className="w-3.5 h-3.5 fill-[#810100] text-[#810100]" />
            <span>Agradecemos de coração o vosso carinho e respeito!</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
