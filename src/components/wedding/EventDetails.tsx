'use client';

import { motion } from 'framer-motion';
import { Heart, MapPin, Calendar, Clock } from 'lucide-react';

const ceremonyEvents = [
  {
    icon: Church,
    title: 'Cerimónia',
    date: '12 de Setembro de 2026',
    time: '16h00',
    location: 'Igreja de São José',
    address: 'Rua da Sé, 123 — Centro Histórico, Luanda',
    description: 'A cerimónia religiosa será realizada na bela Igreja de São José, no coração do centro histórico. Pedimos que cheguem com 30 minutos de antecedência.',
  },
  {
    icon: PartyPopper,
    title: 'Recepção',
    date: '12 de Setembro de 2026',
    time: '18h30',
    location: 'Salão Esmeralda — Hotel Diplomático',
    address: 'Av. 4 de Fevereiro, Luanda',
    description: 'Após a cerimónia, convidamos todos para a recepção no Salão Esmeralda. Haverá jantar, música ao vivo e muita diversão para celebrar este momento especial.',
  },
];

function Church(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M18 12V2H6v10" /><path d="M2 22h20" /><path d="M22 12v10H2V12l10-8 10 8z" />
    </svg>
  );
}

function PartyPopper(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M5.8 11.3L2 22l10.7-3.79" /><path d="M4 3h.01" /><path d="M22 8h.01" /><path d="M15 2h.01" />
      <path d="M22 20h.01" /><path d="m22 2-2.24.75a2.9 2.9 0 0 0-1.96 3.12v0c.1.86-.57 1.63-1.45 1.63h-.38c-.86 0-1.6.6-1.76 1.44L14 10" />
      <path d="M22 13 17 7" /><path d="m2 2 7.58 11.27" /><path d="M11 8.6 8 7.4" />
    </svg>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

export default function EventDetails() {
  return (
    <section id="eventos" className="relative py-20 sm:py-28 md:py-36">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeUp}
          custom={0}
        >
          <span className="text-xs tracking-[0.3em] uppercase" style={{ color: '#d4af37' }}>
            Detalhes do Evento
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-light tracking-wide" style={{ color: '#2c2c2c' }}>
            Cerimónia & Recepção
          </h2>
          <div className="mx-auto mt-6 w-16 h-px" style={{ backgroundColor: '#d4af37' }} />
        </motion.div>

        <div className="space-y-8 md:space-y-12">
          {ceremonyEvents.map((event, index) => (
            <motion.div
              key={event.title}
              className="relative rounded-xl overflow-hidden"
              style={{
                background: 'rgba(255,255,255,0.7)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(212,175,55,0.15)',
              }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              variants={fadeUp}
              custom={index + 1}
            >
              <div className="p-6 sm:p-8 md:p-10">
                <div className="flex flex-col md:flex-row gap-6 md:gap-10">
                  <div className="flex-shrink-0 flex items-start gap-4">
                    <div
                      className="w-14 h-14 rounded-full flex items-center justify-center"
                      style={{ background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.2)' }}
                    >
                      <event.icon className="w-6 h-6" style={{ color: '#d4af37' }} />
                    </div>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-light tracking-wide" style={{ color: '#2c2c2c' }}>
                        {event.title}
                      </h3>
                    </div>
                  </div>

                  <div className="flex-1 space-y-4">
                    <div className="flex flex-wrap gap-4 sm:gap-6 text-sm" style={{ color: '#6b6b6b' }}>
                      <span className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" style={{ color: '#d4af37' }} />
                        {event.date}
                      </span>
                      <span className="flex items-center gap-2">
                        <Clock className="w-4 h-4" style={{ color: '#d4af37' }} />
                        {event.time}
                      </span>
                    </div>
                    <div className="flex items-start gap-2 text-sm sm:text-base" style={{ color: '#4a4a4a' }}>
                      <MapPin className="w-4 h-4 mt-1 flex-shrink-0" style={{ color: '#d4af37' }} />
                      <div>
                        <p className="font-medium">{event.location}</p>
                        <p className="text-sm mt-0.5" style={{ color: '#8a8a8a' }}>{event.address}</p>
                      </div>
                    </div>
                    <p className="text-sm sm:text-base leading-relaxed" style={{ color: '#5a5a5a' }}>
                      {event.description}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-12 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={3}
        >
          <div
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm"
            style={{
              background: 'rgba(212,175,55,0.08)',
              border: '1px solid rgba(212,175,55,0.2)',
              color: '#b8962e',
            }}
          >
            <Heart className="w-4 h-4" />
            <span>Dress Code: Traje Social — Branco Proibido</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
