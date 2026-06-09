'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { ChevronDown, Music, VolumeX, Heart, MapPin, Phone, Mail } from 'lucide-react';
import CountdownTimer from '@/components/wedding/CountdownTimer';
import OurStory from '@/components/wedding/OurStory';
import EventDetails from '@/components/wedding/EventDetails';
import PhotoGallery from '@/components/wedding/PhotoGallery';
import RSVPForm from '@/components/wedding/RSVPForm';
import GiftSection from '@/components/wedding/GiftSection';

function FloatingPetals() {
  const petals = useMemo(() => {
    const seed = (n: number) => ((n * 9301 + 49297) % 233280) / 233280;
    return Array.from({ length: 12 }, (_, i) => ({
      width: seed(i * 7 + 1) * 8 + 4,
      height: seed(i * 7 + 2) * 8 + 4,
      left: seed(i * 7 + 3) * 100,
      xOffset: seed(i * 7 + 4) * 100 - 50,
      duration: seed(i * 7 + 5) * 10 + 10,
      delay: seed(i * 7 + 6) * 8,
    }));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {petals.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full opacity-20"
          style={{
            width: p.width,
            height: p.height,
            background: '#d4af37',
            left: `${p.left}%`,
            top: '-5%',
          }}
          animate={{
            y: ['0vh', '105vh'],
            x: [0, p.xOffset],
            rotate: [0, 360],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  );
}

function NavigationDots() {
  const sections = [
    { id: 'inicio', label: 'Início' },
    { id: 'historia', label: 'História' },
    { id: 'eventos', label: 'Eventos' },
    { id: 'galeria', label: 'Galeria' },
    { id: 'rsvp', label: 'RSVP' },
    { id: 'presentes', label: 'Presentes' },
  ];

  const [activeSection, setActiveSection] = useState('inicio');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="fixed right-3 sm:right-5 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-3">
      {sections.map((section) => (
        <a
          key={section.id}
          href={`#${section.id}`}
          className="group flex items-center gap-2"
          aria-label={section.label}
        >
          <span className="text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap" style={{ color: '#d4af37' }}>
            {section.label}
          </span>
          <div
            className="w-2.5 h-2.5 rounded-full transition-all duration-300"
            style={{
              background: activeSection === section.id ? '#d4af37' : 'rgba(212,175,55,0.2)',
              transform: activeSection === section.id ? 'scale(1.3)' : 'scale(1)',
              boxShadow: activeSection === section.id ? '0 0 10px rgba(212,175,55,0.4)' : 'none',
            }}
          />
        </a>
      ))}
    </div>
  );
}

export default function Home() {
  const [musicPlaying, setMusicPlaying] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.8], [1, 1.1]);

  const scrollToContent = () => {
    const el = document.getElementById('historia');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen" style={{ background: '#faf6ee' }}>
      <NavigationDots />

      {/* ==================== HERO SECTION ==================== */}
      <section id="inicio" ref={heroRef} className="relative h-screen overflow-hidden">
        <motion.div className="absolute inset-0" style={{ scale: heroScale }}>
          <Image
            src="/images/hero-bg.png"
            alt="Wedding background"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60" />
        </motion.div>

        <FloatingPetals />

        <motion.div
          className="relative z-10 h-full flex flex-col items-center justify-center px-4"
          style={{ opacity: heroOpacity }}
        >
          {/* Music toggle */}
          <motion.button
            className="absolute top-6 right-6 w-10 h-10 rounded-full flex items-center justify-center transition-colors"
            style={{
              background: 'rgba(255,255,255,0.1)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.2)',
            }}
            onClick={() => setMusicPlaying(!musicPlaying)}
            whileHover={{ scale: 1.1 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            {musicPlaying ? (
              <Music className="w-4 h-4 text-white" />
            ) : (
              <VolumeX className="w-4 h-4 text-white/70" />
            )}
          </motion.button>

          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <p
              className="text-xs sm:text-sm tracking-[0.4em] uppercase font-light"
              style={{ color: 'rgba(212,175,55,0.9)' }}
            >
              Convidamos você para celebrar
            </p>

            <div className="mt-6 sm:mt-8">
              <motion.h1
                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extralight tracking-wider text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.6 }}
              >
                Ana & Miguel
              </motion.h1>
            </div>

            <motion.div
              className="mt-6 sm:mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <div className="flex items-center justify-center gap-3 sm:gap-4">
                <div className="w-12 sm:w-20 h-px" style={{ background: 'rgba(212,175,55,0.5)' }} />
                <span className="text-sm sm:text-base tracking-[0.3em] text-white/80 font-light">12.09.2026</span>
                <div className="w-12 sm:w-20 h-px" style={{ background: 'rgba(212,175,55,0.5)' }} />
              </div>
              <p className="mt-2 text-sm sm:text-base text-white/70 font-light">Luanda, Angola</p>
            </motion.div>

            <motion.div
              className="mt-10 sm:mt-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.3 }}
            >
              <CountdownTimer />
            </motion.div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-8 sm:bottom-10 flex flex-col items-center gap-2 cursor-pointer"
            onClick={scrollToContent}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
          >
            <span className="text-xs tracking-[0.2em] text-white/50 uppercase">Scroll</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ChevronDown className="w-5 h-5 text-white/50" />
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* ==================== CONTENT SECTIONS ==================== */}
      <main>
        <OurStory />
        <EventDetails />
        <PhotoGallery />
        <RSVPForm />
        <GiftSection />
      </main>

      {/* ==================== FOOTER ==================== */}
      <footer className="relative py-16 sm:py-20" style={{ borderTop: '1px solid rgba(212,175,55,0.1)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Heart className="w-8 h-8 mx-auto mb-4" style={{ color: '#d4af37' }} fill="#d4af37" />
            <p className="text-2xl sm:text-3xl font-extralight tracking-wider" style={{ color: '#2c2c2c' }}>
              Ana & Miguel
            </p>
            <p className="mt-2 text-sm" style={{ color: '#8a8a8a' }}>12 de Setembro de 2026</p>

            <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm" style={{ color: '#6b6b6b' }}>
              <span className="flex items-center gap-2">
                <Phone className="w-4 h-4" style={{ color: '#d4af37' }} />
                +244 923 456 789
              </span>
              <span className="flex items-center gap-2">
                <Mail className="w-4 h-4" style={{ color: '#d4af37' }} />
                anaemiguel2026@gmail.com
              </span>
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4" style={{ color: '#d4af37' }} />
                Luanda, Angola
              </span>
            </div>

            <div className="mt-8 w-16 h-px mx-auto" style={{ backgroundColor: 'rgba(212,175,55,0.2)' }} />
            <p className="mt-6 text-xs" style={{ color: '#aaa' }}>
              Feito com <Heart className="w-3 h-3 inline" style={{ color: '#d4af37' }} fill="#d4af37" /> para o dia mais especial
            </p>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}
