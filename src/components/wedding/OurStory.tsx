'use client';

import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import Image from 'next/image';

const storyTimeline = [
  {
    year: '2020',
    title: 'O Primeiro Encontro',
    description: 'Foi num café tranquilo da cidade que os nossos caminhos se cruzaram pela primeira vez. Uma conversa simples que rapidamente se transformou em horas a perder a noção do tempo, descobrindo afinidades e partilhando sonhos que nem sabíamos ter em comum.',
    image: '/images/gallery-1.jpg',
  },
  {
    year: '2021',
    title: 'A Primeira Viagem',
    description: 'Juntos decidimos explorar o mundo, e a nossa primeira grande viagem foi para as praias deslumbrantes do Benguela. Os pores do sol partilhados, as risadas ecoando na brisa marítima e a certeza crescente de que algo extraordinário estava a nascer entre nós.',
    image: '/images/gallery-2.jpg',
  },
  {
    year: '2023',
    title: 'O Nosso Lar',
    description: 'Com coragem e amor, decidimos construir o nosso primeiro lar juntos. Cada cômodo foi pensado com carinho, cada detalhe uma extensão da nossa história. Transformámos quatro paredes num refúgio onde o amor floresce em cada canto.',
    image: '/images/gallery-3.jpg',
  },
  {
    year: '2025',
    title: 'O Pedido',
    description: 'Numa noite estrelada, rodeados de velas e das nossas flores favoritas, veio a pergunta que mudaria as nossas vidas para sempre. Com lágrimas de felicidade e um sorriso que não cabia no rosto, disse sim com todo o amor do mundo.',
    image: '/images/gallery-4.jpg',
  },
  {
    year: '2026',
    title: 'O Grande Dia',
    description: 'Depois de anos a construir uma história de amor, chega o momento de celebrar esta união perante as pessoas mais importantes das nossas vidas. É o início de um novo capítulo, escrito a dois, com muito amor.',
    image: '/images/rings.png',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

export default function OurStory() {
  return (
    <section id="historia" className="relative py-20 sm:py-28 md:py-36">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <motion.div
          className="text-center mb-16 sm:mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeUp}
          custom={0}
        >
          <span className="text-xs tracking-[0.3em] uppercase" style={{ color: '#d4af37' }}>
            A Nossa História
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-light tracking-wide" style={{ color: '#2c2c2c' }}>
            Uma História de Amor
          </h2>
          <div className="mx-auto mt-6 w-16 h-px" style={{ backgroundColor: '#d4af37' }} />
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div
            className="absolute left-1/2 top-0 bottom-0 w-px hidden md:block"
            style={{ backgroundColor: 'rgba(212,175,55,0.2)', transform: 'translateX(-50%)' }}
          />

          <div className="space-y-12 md:space-y-16">
            {storyTimeline.map((item, index) => (
              <motion.div
                key={item.year}
                className={`relative md:flex items-center gap-8 md:gap-12 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-50px' }}
                variants={fadeUp}
                custom={index + 1}
              >
                {/* Image */}
                <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:order-1' : 'md:order-2'}`}>
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden group">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 40vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    <div
                      className="absolute bottom-4 left-4 px-3 py-1 rounded-full text-sm font-light"
                      style={{
                        background: 'rgba(212,175,55,0.9)',
                        color: '#fff',
                      }}
                    >
                      {item.year}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className={`w-full md:w-5/12 mt-6 md:mt-0 ${index % 2 === 0 ? 'md:order-2' : 'md:order-1'}`}>
                  <h3 className="text-xl sm:text-2xl font-light tracking-wide" style={{ color: '#2c2c2c' }}>
                    {item.title}
                  </h3>
                  <div className="mt-3 w-10 h-px" style={{ backgroundColor: 'rgba(212,175,55,0.4)' }} />
                  <p className="mt-4 text-sm sm:text-base leading-relaxed" style={{ color: '#5a5a5a' }}>
                    {item.description}
                  </p>
                </div>

                {/* Timeline dot */}
                <div
                  className="hidden md:flex absolute left-1/2 top-1/2 w-4 h-4 rounded-full items-center justify-center"
                  style={{
                    background: '#faf6ee',
                    border: '2px solid #d4af37',
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  <Heart className="w-2 h-2" style={{ color: '#d4af37' }} fill="#d4af37" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
