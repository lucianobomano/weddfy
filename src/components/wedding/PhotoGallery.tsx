'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import Image from 'next/image';

const photos = [
  { src: '/images/gallery-1.jpg', alt: 'Momento romântico ao pôr do sol' },
  { src: '/images/gallery-2.jpg', alt: 'Buquê de flores brancas' },
  { src: '/images/gallery-3.jpg', alt: 'Decoração da mesa' },
  { src: '/images/gallery-4.jpg', alt: 'Arco floral do casamento' },
  { src: '/images/hero-bg.png', alt: 'Detalhes românticos' },
  { src: '/images/rings.png', alt: 'Alianças de casamento' },
  { src: '/images/venue.png', alt: 'Local da cerimónia' },
  { src: '/images/couple-silhouette.png', alt: 'Silhueta do casal' },
];

export default function PhotoGallery() {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  const openLightbox = (idx: number) => setSelectedIdx(idx);
  const closeLightbox = () => setSelectedIdx(null);
  const goPrev = () => setSelectedIdx((prev) => (prev !== null ? (prev - 1 + photos.length) % photos.length : null));
  const goNext = () => setSelectedIdx((prev) => (prev !== null ? (prev + 1) % photos.length : null));

  return (
    <section id="galeria" className="relative py-20 sm:py-28 md:py-36">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-xs tracking-[0.3em] uppercase" style={{ color: '#d4af37' }}>
            Memórias
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-light tracking-wide" style={{ color: '#2c2c2c' }}>
            Galeria
          </h2>
          <div className="mx-auto mt-6 w-16 h-px" style={{ backgroundColor: '#d4af37' }} />
        </motion.div>

        <div className="columns-2 md:columns-3 gap-3 sm:gap-4 space-y-3 sm:space-y-4">
          {photos.map((photo, index) => (
            <motion.div
              key={index}
              className="relative break-inside-avoid rounded-xl overflow-hidden cursor-pointer group"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              onClick={() => openLightbox(index)}
            >
              <div className="relative aspect-square">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedIdx !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            <button
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 transition-colors"
              onClick={closeLightbox}
            >
              <X className="w-5 h-5 text-white" />
            </button>
            <button
              className="absolute left-4 z-10 w-10 h-10 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 transition-colors"
              onClick={(e) => { e.stopPropagation(); goPrev(); }}
            >
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>
            <button
              className="absolute right-4 z-10 w-10 h-10 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 transition-colors"
              onClick={(e) => { e.stopPropagation(); goNext(); }}
            >
              <ChevronRight className="w-5 h-5 text-white" />
            </button>
            <motion.div
              className="relative w-[90vw] h-[80vh] max-w-4xl"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={photos[selectedIdx].src}
                alt={photos[selectedIdx].alt}
                fill
                className="object-contain"
                sizes="90vw"
              />
            </motion.div>
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
              {photos.map((_, idx) => (
                <button
                  key={idx}
                  className={`w-2 h-2 rounded-full transition-colors ${idx === selectedIdx ? 'bg-white' : 'bg-white/30'}`}
                  onClick={(e) => { e.stopPropagation(); setSelectedIdx(idx); }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
