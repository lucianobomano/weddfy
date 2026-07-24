import Image from 'next/image';
import { motion } from 'framer-motion';
import { CREAM } from './constants';

interface PageLandingProps {
  onOpen: () => void;
}

export default function PageLanding({ onOpen }: PageLandingProps) {
  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-10"
      style={{ background: CREAM }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.6 }}
    >
      {/* Wedding Card container using the exact aspect ratio of CAPA.svg (349x621) */}
      <motion.div
        className="relative w-[340px] h-[605px] xs:w-[350px] xs:h-[622px] rounded-[4px] overflow-hidden select-none bg-[#38221F]"
        style={{
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.35), 0 0 40px rgba(0, 0, 0, 0.15)',
        }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        {/* Render the full vector CAPA.svg (includes green bg, leaves, ribbon, and bow) */}
        <div className="absolute inset-0">
          <Image
            src="/images/capa.svg"
            alt="Convite Casamento"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Overlay the text "CONVITE" and the calligraphic names logo from LOGO.svg */}
        <div className="absolute inset-x-0 top-[60px] xs:top-[70px] flex flex-col items-center text-center z-10 px-6">
          <p
            className="text-[11px] tracking-[0.25em] text-[#F3EBDD] font-semibold mb-6 uppercase"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            CONVITE
          </p>
          <div className="relative w-[280px] h-[57px] select-text">
            <Image
              src="/images/logo.svg"
              alt="Auriscidia e Luciano"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      </motion.div>

      {/* Action Button below the card */}
      <motion.button
        onClick={onOpen}
        className="mt-8 px-9 py-2.5 text-[#F3EBDD] text-[10px] tracking-[0.2em] font-medium rounded-full shadow-md transition-all hover:bg-[#261614] hover:shadow-lg active:scale-[0.98]"
        style={{ background: '#38221F' }}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        Abrir convite
      </motion.button>

      {/* Footer */}
      <motion.div 
        className="mt-12 text-[9px] tracking-[0.15em] text-[#38221F]/50 uppercase font-semibold select-none"
        style={{ fontFamily: 'var(--font-inter)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        Desenvolvido por{' '}
        <a 
          href="https://www.instagram.com/bhao.agency/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="hover:text-[#38221F] transition-colors underline decoration-[#38221F]/20 hover:decoration-[#38221F]"
        >
          Bhao Agency
        </a>
      </motion.div>
    </motion.div>
  );
}
