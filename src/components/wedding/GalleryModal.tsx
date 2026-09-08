'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Camera, Heart, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';

interface GalleryModalProps {
  onClose: () => void;
}

interface PhotoItem {
  src: string;
  alt: string;
  caption?: string;
}

const GALLERY_PHOTOS: PhotoItem[] = [
  {
    src: '/images/hero-couple.jpg',
    alt: 'Osvaldo & Mirian',
    caption: 'O início do nosso para sempre',
  },
  {
    src: '/images/couple-portrait.png',
    alt: 'Retrato do Casal',
    caption: 'Olhares que dizem tudo',
  },
  {
    src: '/images/couple-dancing.png',
    alt: 'A dançar juntos',
    caption: 'Ao ritmo do nosso coração',
  },
  {
    src: '/images/couple-sunlight.png',
    alt: 'Luz e harmonia',
    caption: 'Iluminados pelo mesmo amor',
  },
  {
    src: '/images/couple-silhouette.png',
    alt: 'Silhueta Romântica',
    caption: 'Promessa para toda a vida',
  },
  {
    src: '/images/gallery-1.jpg',
    alt: 'Momentos Especiais 1',
    caption: 'Sorrisos partilhados',
  },
  {
    src: '/images/gallery-2.jpg',
    alt: 'Momentos Especiais 2',
    caption: 'Cumplicidade infinita',
  },
  {
    src: '/images/gallery-3.jpg',
    alt: 'Momentos Especiais 3',
    caption: 'Cada detalhe uma memória',
  },
  {
    src: '/images/gallery-4.jpg',
    alt: 'Momentos Especiais 4',
    caption: 'Rumo ao altar',
  },
];

export default function GalleryModal({ onClose }: GalleryModalProps) {
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activePhotoIndex === null) return;
    setActivePhotoIndex((prev) => (prev! > 0 ? prev! - 1 : GALLERY_PHOTOS.length - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activePhotoIndex === null) return;
    setActivePhotoIndex((prev) => (prev! < GALLERY_PHOTOS.length - 1 ? prev! + 1 : 0));
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-3 sm:p-4 select-none">
      <motion.div
        initial={{ scale: 0.94, opacity: 0, y: 15 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.94, opacity: 0, y: 15 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="bg-[#FAFAF9] border-[5px] border-[#810100]/20 rounded-2xl shadow-2xl max-w-xl w-full max-h-[92vh] flex flex-col relative overflow-hidden"
      >
        {/* Header */}
        <div className="p-4 sm:p-5 pb-3 border-b border-[#810100]/10 flex items-center justify-between bg-[#FAFAF9]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#810100]/10 flex items-center justify-center">
              <Camera className="w-4 h-4 text-[#810100]" />
            </div>
            <div>
              <h3 
                className="text-[22px] text-[#810100] leading-tight"
                style={{ fontFamily: 'var(--font-script)' }}
              >
                Nossa Galeria
              </h3>
              <p className="text-[10px] text-[#810100]/70 uppercase tracking-wider font-bold">
                Momentos do Casal
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

        {/* Scrollable Photos Grid */}
        <div className="overflow-y-auto p-4 sm:p-5">
          <p className="text-[11.5px] text-[#810100]/80 text-center mb-4 font-semibold italic">
            &ldquo;O amor não se vê com os olhos, mas com o coração.&rdquo;
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {GALLERY_PHOTOS.map((photo, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActivePhotoIndex(index)}
                className="relative aspect-square rounded-xl overflow-hidden cursor-pointer group border border-[#810100]/15 shadow-xs bg-[#810100]/5"
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors flex items-center justify-center">
                  <ZoomIn className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-md" />
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-5 pt-3 border-t border-[#810100]/10 flex items-center justify-center gap-1.5 text-[11px] text-[#810100]/70 font-bold uppercase tracking-wider">
            <Heart className="w-3 h-3 fill-[#810100] text-[#810100]" />
            <span>Osvaldo da Silva & Mirian Gumbe</span>
          </div>
        </div>

        {/* Fullscreen Lightbox */}
        <AnimatePresence>
          {activePhotoIndex !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActivePhotoIndex(null)}
              className="absolute inset-0 z-50 bg-black/90 flex flex-col items-center justify-between p-4"
            >
              {/* Lightbox Header */}
              <div className="w-full flex items-center justify-between text-white/80 px-2 pt-2">
                <span className="text-xs font-semibold">
                  {activePhotoIndex + 1} de {GALLERY_PHOTOS.length}
                </span>
                <button
                  onClick={() => setActivePhotoIndex(null)}
                  className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Main Image */}
              <div 
                className="relative w-full max-w-md h-[60vh] my-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={GALLERY_PHOTOS[activePhotoIndex].src}
                  alt={GALLERY_PHOTOS[activePhotoIndex].alt}
                  fill
                  className="object-contain"
                  sizes="100vw"
                  priority
                />
              </div>

              {/* Caption & Controls */}
              <div 
                className="w-full max-w-md flex items-center justify-between gap-3 text-white pb-2"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={handlePrev}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <p className="text-center text-xs font-medium text-white/90 truncate px-2">
                  {GALLERY_PHOTOS[activePhotoIndex].caption}
                </p>

                <button
                  onClick={handleNext}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
