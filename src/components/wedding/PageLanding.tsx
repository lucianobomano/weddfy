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
      {/* Wedding Card container using exact aspect ratio of modelo.png (2426 x 4500) */}
      <motion.div
        onClick={onOpen}
        className="relative w-[340px] h-[630px] xs:w-[350px] xs:h-[650px] rounded-[6px] overflow-hidden select-none bg-white cursor-pointer group"
        style={{
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 35px rgba(0, 0, 0, 0.08)',
        }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        {/* Layer 1: Top floral arrangement */}
        <div className="absolute top-0 inset-x-0 h-[190px] xs:h-[205px] z-0 pointer-events-none">
          <Image
            src="/images/novas/bg flower.png"
            alt="Flores superiores"
            fill
            className="object-cover object-top"
            priority
          />
        </div>

        {/* Layer 2: Bottom floral arrangement (rotated/flipped) */}
        <div className="absolute bottom-0 inset-x-0 h-[180px] xs:h-[195px] z-0 pointer-events-none rotate-180">
          <Image
            src="/images/novas/bg flower.png"
            alt="Flores inferiores"
            fill
            className="object-cover object-top"
            priority
          />
        </div>

        {/* Layer 3: Envelope flap overlay with shadow */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          <Image
            src="/images/novas/convite.png"
            alt="Envelope convite"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Layer 4: Text Content and Wax Seal precisely positioned over the flap */}
        <div className="absolute inset-0 z-20 pointer-events-none">
          {/* Top Title: Convite (center ~ 29.3%) */}
          <div className="absolute top-[28%] -translate-y-1/2 inset-x-0 text-center">
            <h1 
              className="text-[42px] xs:text-[46px] text-[#810100] font-normal leading-none tracking-wide"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              Convite
            </h1>
          </div>

          {/* Curved text "TOQUE PARA ABRIR" right above the wax seal (center ~ 45%) */}
          <div className="absolute top-[45.2%] -translate-y-1/2 inset-x-0 flex justify-center">
            <div className="relative w-[180px] h-[34px] flex items-center justify-center">
              <svg viewBox="0 0 200 60" className="w-full h-full overflow-visible">
                <path id="curve" d="M 20 48 Q 100 12 180 48" fill="transparent" />
                <text className="text-[11px] xs:text-[11.5px] font-bold fill-[#810100] tracking-[0.26em] uppercase" style={{ fontFamily: 'var(--font-inter)' }}>
                  <textPath href="#curve" startOffset="50%" textAnchor="middle">
                    TOQUE PARA ABRIR
                  </textPath>
                </text>
              </svg>
            </div>
          </div>

          {/* Wax Seal (Lacre) positioned exactly over the tip of the triangle (center ~ 58.3%) */}
          <div className="absolute top-[58.3%] -translate-y-1/2 inset-x-0 flex justify-center">
            <motion.div 
              className="relative w-[140px] h-[140px] xs:w-[150px] xs:h-[150px] drop-shadow-2xl cursor-pointer pointer-events-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
            >
              <Image
                src="/images/novas/lacre.png"
                alt="Lacre de cera personalizado OM"
                fill
                className="object-contain"
                priority
              />
            </motion.div>
          </div>

          {/* Bottom: Names (center ~ 76.3%) */}
          <div className="absolute top-[76.3%] -translate-y-1/2 inset-x-0 text-center">
            <p 
              className="text-[20px] xs:text-[22px] text-[#810100] font-normal tracking-wide leading-tight"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              Osvaldo da Silva
            </p>
            <p 
              className="text-[15px] xs:text-[16px] text-[#810100] my-0.5 font-normal italic"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              &amp;
            </p>
            <p 
              className="text-[20px] xs:text-[22px] text-[#810100] font-normal tracking-wide leading-tight"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              Mirian Gumbe
            </p>
          </div>
        </div>
      </motion.div>

      {/* Action Button below the card */}
      <motion.button
        onClick={onOpen}
        className="mt-7 px-9 py-2.5 text-[#FAFAF9] text-[10px] tracking-[0.2em] font-medium rounded-full shadow-md transition-all hover:bg-[#5a0000] hover:shadow-lg active:scale-[0.98]"
        style={{ background: '#810100' }}
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
        className="mt-12 text-[9px] tracking-[0.15em] text-[#810100]/50 uppercase font-semibold select-none"
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
          className="hover:text-[#810100] transition-colors underline decoration-[#810100]/20 hover:decoration-[#810100]"
        >
          Bhao Agency
        </a>
      </motion.div>
    </motion.div>
  );
}
