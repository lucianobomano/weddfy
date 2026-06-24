'use client';

import { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { CREAM } from '@/components/wedding/constants';
import PageLanding from '@/components/wedding/PageLanding';
import LeftPanel from '@/components/wedding/LeftPanel';
import MiddlePanel from '@/components/wedding/MiddlePanel';
import RightPanel from '@/components/wedding/RightPanel';
import RSVPPage from '@/components/wedding/RSVPPage';
import GiftsPage from '@/components/wedding/GiftsPage';
import MobileContent from '@/components/wedding/MobileContent';
import BackButton from '@/components/wedding/BackButton';

function HomeContent() {
  const searchParams = useSearchParams();
  const guestName = searchParams.get('nome') ?? '';

  const [page, setPage] = useState<'landing' | 'content' | 'rsvp' | 'gifts'>('landing');

  return (
    <div className="min-h-screen" style={{ background: CREAM }}>
      <AnimatePresence mode="wait">
        {page === 'landing' && (
          <PageLanding key="landing" onOpen={() => setPage('content')} />
        )}

        {page === 'content' && (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Desktop */}
            <div className="hidden lg:block">
              <div className="flex flex-col items-center justify-center min-h-screen py-4">
                <div className="flex justify-center items-start gap-4 p-6 w-full">
                  <BackButton onClick={() => setPage('landing')} className="top-4 left-4" />
                  <motion.div
                    className="w-[320px] xl:w-[350px] flex-shrink-0 bg-white rounded-sm shadow-lg overflow-hidden h-[calc(100vh-6rem)]"
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7, ease: 'easeOut' }}
                  >
                    <LeftPanel />
                  </motion.div>
                  <motion.div
                    className="w-[320px] xl:w-[350px] flex-shrink-0 bg-white rounded-sm shadow-lg overflow-hidden h-[calc(100vh-6rem)]"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.12, ease: 'easeOut' }}
                  >
                    <MiddlePanel />
                  </motion.div>
                  <motion.div
                    className="w-[320px] xl:w-[350px] flex-shrink-0 bg-white rounded-sm shadow-lg overflow-hidden h-[calc(100vh-6rem)]"
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7, delay: 0.24, ease: 'easeOut' }}
                  >
                    <RightPanel onOpenRSVP={() => setPage('rsvp')} onOpenGifts={() => setPage('gifts')} />
                  </motion.div>
                </div>
                <footer className="mt-2 text-[9px] tracking-[0.15em] text-[#363e2d]/50 uppercase font-semibold select-none">
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
            </div>

            {/* Tablet */}
            <div className="hidden md:block lg:hidden">
              <div className="flex flex-col items-center justify-center min-h-screen py-4">
                <BackButton onClick={() => setPage('landing')} className="top-3 left-3" />
                <div className="flex justify-center items-start gap-3 p-4 w-full">
                  <div className="w-[280px] flex-shrink-0 bg-white rounded-sm shadow-md overflow-hidden min-h-[75vh]">
                    <LeftPanel />
                  </div>
                  <div className="w-[280px] flex-shrink-0 bg-white rounded-sm shadow-md overflow-hidden min-h-[75vh]">
                    <MiddlePanel />
                  </div>
                  <div className="w-[280px] flex-shrink-0 bg-white rounded-sm shadow-md overflow-hidden min-h-[75vh]">
                    <RightPanel onOpenRSVP={() => setPage('rsvp')} onOpenGifts={() => setPage('gifts')} />
                  </div>
                </div>
                <footer className="mt-2 text-[9px] tracking-[0.15em] text-[#363e2d]/50 uppercase font-semibold select-none">
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
            </div>

            {/* Mobile */}
            <div className="md:hidden">
              <MobileContent
                onBack={() => setPage('landing')}
                onOpenRSVP={() => setPage('rsvp')}
                onOpenGifts={() => setPage('gifts')}
                initialGuestName={guestName}
              />
            </div>
          </motion.div>
        )}

        {page === 'rsvp' && (
          <RSVPPage 
            key="rsvp" 
            onBack={() => setPage('content')} 
            initialGuestName={guestName}
          />
        )}

        {page === 'gifts' && (
          <GiftsPage 
            key="gifts" 
            onBack={() => setPage('content')} 
            initialGuestName={guestName}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={null}>
      <HomeContent />
    </Suspense>
  );
}