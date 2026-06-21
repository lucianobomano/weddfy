'use client';

import { useState, useRef, useMemo, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import {
  MapPin, Clock, Heart, Users, QrCode,
  CheckCircle, AlertCircle, Loader2, Send,
  ChevronDown, ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import CountdownTimer from '@/components/wedding/CountdownTimer';
import Calendar from '@/components/wedding/Calendar';
import MusicPlayer from '@/components/wedding/MusicPlayer';

/* ============================================================
   CONSTANTS
   ============================================================ */
const GREEN = '#6b7c5a';
const GREEN_DARK = '#5a6b4a';
const CREAM = '#f5f2ed';
const WHITE = '#ffffff';
const DARK = '#333333';
const GRAY = '#888888';
const LIGHT_GRAY = '#e0e0e0';

const timelineEvents = [
  { time: '16h50', title: 'Cerimónia Religiosa', location: 'Igreja de São Francisco' },
  { time: '18h30', title: 'Chegada ao Salão', location: 'Salão Os Olivos' },
  { time: '19h00', title: 'Recepção', location: 'Jantar & Dança' },
];

/* ============================================================
   SVG INVITATION — PAGE 1
   ============================================================ */
function InvitationSVG() {
  return (
    <svg viewBox="0 0 400 560" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto max-w-[340px] sm:max-w-[380px]">
      {/* Outer border frame */}
      <rect x="10" y="10" width="380" height="540" rx="2" stroke={GREEN} strokeWidth="1.5" fill="none" opacity="0.4" />
      <rect x="18" y="18" width="364" height="524" rx="1" stroke={GREEN} strokeWidth="0.5" fill="none" opacity="0.25" />

      {/* Top decorative flourish — two symmetric curves meeting at center */}
      <path d="M80 55 Q140 20, 200 55 Q260 20, 320 55" stroke={GREEN} strokeWidth="1.2" fill="none" opacity="0.6" />
      <path d="M100 65 Q150 40, 200 65 Q250 40, 300 65" stroke={GREEN} strokeWidth="0.8" fill="none" opacity="0.35" />

      {/* Small diamond ornament */}
      <path d="M200 38 L204 44 L200 50 L196 44 Z" fill={GREEN} opacity="0.5" />

      {/* Couple names */}
      <text x="200" y="110" textAnchor="middle" fontFamily="var(--font-script)" fontSize="42" fill={GREEN}>
        Luciano
      </text>
      <text x="200" y="140" textAnchor="middle" fontSize="18" fill={GREEN} opacity="0.6" fontStyle="italic">
        &amp;
      </text>
      <text x="200" y="180" textAnchor="middle" fontFamily="var(--font-script)" fontSize="42" fill={GREEN}>
        Auriscidia
      </text>

      {/* Divider line with ornament */}
      <line x1="120" y1="210" x2="280" y2="210" stroke={GREEN} strokeWidth="0.8" opacity="0.4" />
      <path d="M195 206 L200 200 L205 206 L200 212 Z" fill={GREEN} opacity="0.5" />

      {/* "Convidamos para celebrar" */}
      <text x="200" y="248" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" fill={GRAY} letterSpacing="3" fontWeight="400">
        CONVIDAMOS PARA CELEBRAR
      </text>

      {/* "O nosso casamento" */}
      <text x="200" y="280" textAnchor="middle" fontFamily="var(--font-playfair)" fontSize="22" fill={DARK} fontWeight="400">
        O Nosso Casamento
      </text>

      {/* Date block */}
      <text x="200" y="325" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10" fill={GREEN} letterSpacing="2" fontWeight="500">
        14 DE NOVEMBRO DE 2025
      </text>

      {/* Decorative divider */}
      <line x1="150" y1="348" x2="250" y2="348" stroke={GREEN} strokeWidth="0.5" opacity="0.3" />

      {/* Location */}
      <text x="200" y="380" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" fill={GRAY} letterSpacing="1.5" fontWeight="300">
        IGREJA DE SÃO FRANCISCO
      </text>
      <text x="200" y="400" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8" fill={GRAY} opacity="0.7" letterSpacing="1">
        LUANDA, ANGOLA
      </text>

      {/* Bottom flourish — mirror of top */}
      <path d="M100 480 Q150 510, 200 480 Q250 510, 300 480" stroke={GREEN} strokeWidth="1.2" fill="none" opacity="0.6" />
      <path d="M120 470 Q160 490, 200 470 Q240 490, 280 470" stroke={GREEN} strokeWidth="0.8" fill="none" opacity="0.35" />

      {/* Bottom diamond */}
      <path d="M200 500 L204 506 L200 512 L196 506 Z" fill={GREEN} opacity="0.5" />

      {/* Corner ornaments */}
      {/* Top-left */}
      <path d="M30 30 L55 30 M30 30 L30 55" stroke={GREEN} strokeWidth="1" opacity="0.3" />
      {/* Top-right */}
      <path d="M370 30 L345 30 M370 30 L370 55" stroke={GREEN} strokeWidth="1" opacity="0.3" />
      {/* Bottom-left */}
      <path d="M30 530 L55 530 M30 530 L30 505" stroke={GREEN} strokeWidth="1" opacity="0.3" />
      {/* Bottom-right */}
      <path d="M370 530 L345 530 M370 530 L370 505" stroke={GREEN} strokeWidth="1" opacity="0.3" />

      {/* Decorative leaf/floral motifs on sides */}
      {/* Left side leaf */}
      <path d="M45 200 Q35 250, 45 300 Q55 250, 45 200Z" fill={GREEN} opacity="0.1" />
      <line x1="45" y1="200" x2="45" y2="300" stroke={GREEN} strokeWidth="0.5" opacity="0.2" />

      {/* Right side leaf */}
      <path d="M355 200 Q365 250, 355 300 Q345 250, 355 200Z" fill={GREEN} opacity="0.1" />
      <line x1="355" y1="200" x2="355" y2="300" stroke={GREEN} strokeWidth="0.5" opacity="0.2" />
    </svg>
  );
}

/* ============================================================
   PAGE 1 — LANDING / INVITATION
   ============================================================ */
function PageLanding({ onOpen }: { onOpen: () => void }) {
  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-10"
      style={{ background: CREAM }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.6 }}
    >
      {/* Invitation SVG */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        <InvitationSVG />
      </motion.div>

      {/* Open button */}
      <motion.button
        onClick={onOpen}
        className="mt-8 flex items-center gap-2 px-8 py-2.5 text-white text-[11px] tracking-[0.2em] uppercase rounded-sm transition-all hover:shadow-lg group"
        style={{ background: GREEN }}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        <span>Abrir Convite</span>
        <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
      </motion.button>

      {/* Subtle scroll hint on mobile */}
      <motion.p
        className="mt-6 text-[10px] tracking-widest uppercase"
        style={{ color: '#bbb' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        Deslize para abrir
      </motion.p>
    </motion.div>
  );
}

/* ============================================================
   LEFT PANEL — HERO
   ============================================================ */
function LeftPanel() {
  return (
    <div className="flex flex-col h-full">
      <div className="px-4 sm:px-5 pt-6 pb-5 text-center text-white" style={{ background: GREEN }}>
        <svg className="mx-auto mb-3" width="28" height="18" viewBox="0 0 28 18" fill="none">
          <path d="M1 1L14 10L27 1" stroke="rgba(255,255,255,0.5)" strokeWidth="1"/>
          <path d="M1 17H27V1L14 10L1 1V17Z" stroke="rgba(255,255,255,0.5)" strokeWidth="1" fill="none"/>
        </svg>
        <h1 className="text-3xl sm:text-4xl leading-tight" style={{ fontFamily: 'var(--font-script)' }}>
          Luciano
        </h1>
        <div className="text-lg sm:text-xl my-1 opacity-80">&amp;</div>
        <h1 className="text-3xl sm:text-4xl leading-tight" style={{ fontFamily: 'var(--font-script)' }}>
          Auriscidia
        </h1>
        <p className="mt-3 text-[11px] sm:text-xs tracking-[0.25em] opacity-80">14.11.2025</p>
      </div>

      <div className="flex-1 bg-white px-3 sm:px-4 py-4 flex flex-col justify-center">
        <div className="relative aspect-[3/4] rounded-sm overflow-hidden">
          <Image src="/images/couple-portrait.png" alt="Luciano & Auriscidia" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 33vw" priority />
        </div>
        <p className="mt-3 text-center text-[11px] sm:text-xs text-[#999] italic">&ldquo;Juntos para sempre&rdquo;</p>
        <div className="mt-3"><MusicPlayer /></div>
      </div>

      <div className="px-4 sm:px-5 py-5 text-white" style={{ background: GREEN }}>
        <p className="text-center text-[10px] tracking-[0.3em] uppercase opacity-70 mb-3">O GRANDE DIA</p>
        <Calendar />
        <div className="mt-4 pt-3 border-t border-white/10">
          <p className="text-center text-[10px] tracking-[0.2em] uppercase opacity-70 mb-2">FALTAM</p>
          <CountdownTimer />
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   MIDDLE PANEL — EVENTS
   ============================================================ */
function MiddlePanel() {
  return (
    <div className="flex flex-col h-full">
      <div className="bg-white px-4 sm:px-5 py-6 flex-1">
        <div className="text-center mb-5">
          <p className="text-[10px] tracking-[0.3em] uppercase text-[#999] mb-1">NOSSO CASAMENTO</p>
          <h2 className="text-lg sm:text-xl tracking-wide" style={{ fontFamily: 'var(--font-playfair)', fontWeight: 400, color: DARK }}>
            Cerimónia Religiosa
          </h2>
        </div>

        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 text-sm text-[#888]">
            <Clock className="w-3.5 h-3.5" style={{ color: GREEN }} />
            <span>16h50</span>
          </div>
          <div className="flex items-center justify-center gap-1.5 mt-2 text-sm text-[#888]">
            <MapPin className="w-3.5 h-3.5" style={{ color: GREEN }} />
            <span className="text-xs sm:text-sm font-medium text-[#333]">IGREJA DE SÃO FRANCISCO</span>
          </div>
          <a href="#" className="inline-block mt-4 px-4 py-1.5 text-[10px] tracking-[0.15em] uppercase text-white rounded-sm transition-colors hover:opacity-90" style={{ background: GREEN }}>
            Ver localização
          </a>
        </div>

        <div className="space-y-0">
          {timelineEvents.map((event, i) => (
            <div key={i} className="flex gap-3">
              <div className="text-[11px] text-[#999] pt-0.5 w-12 text-right flex-shrink-0">{event.time}</div>
              <div className="flex flex-col items-center flex-shrink-0">
                <div className="w-2.5 h-2.5 rounded-full border-2 mt-0.5" style={{ borderColor: GREEN, background: i === 0 ? GREEN : WHITE }} />
                {i < timelineEvents.length - 1 && <div className="w-px flex-1" style={{ background: LIGHT_GRAY }} />}
              </div>
              <div className="pb-4">
                <p className="text-xs font-medium text-[#333]">{event.title}</p>
                <p className="text-[10px] mt-0.5 text-[#888]">{event.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="relative aspect-[16/9] overflow-hidden">
        <Image src="/images/couple-dancing.png" alt="Luciano & Auriscidia" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 33vw" />
      </div>

      <div className="px-4 sm:px-5 py-5 text-white" style={{ background: GREEN }}>
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[10px] tracking-[0.3em] uppercase opacity-70 mb-2">CÓDIGO DE VESTIR</p>
            <p className="text-base sm:text-lg font-light" style={{ fontFamily: 'var(--font-playfair)' }}>Elegante</p>
            <div className="flex items-center gap-1.5 mt-2 opacity-70">
              <Users className="w-3.5 h-3.5" />
              <span className="text-[10px]">Branco proibido</span>
            </div>
          </div>
          <div className="text-center">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white rounded-sm flex items-center justify-center">
              <QrCode className="w-10 h-10 sm:w-12 sm:h-12 text-[#333]" />
            </div>
            <p className="text-[8px] tracking-[0.2em] uppercase opacity-60 mt-1.5">PRESENTES</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   RIGHT PANEL — RSVP + INFO
   ============================================================ */
interface RSVPForm { name: string; email: string; companion: string; companionName: string; message: string; }

function RightPanel() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [form, setForm] = useState<RSVPForm>({ name: '', email: '', companion: '', companionName: '', message: '' });
  const handleChange = (f: keyof RSVPForm, v: string) => setForm((p) => ({ ...p, [f]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setIsSubmitting(true); setSubmitStatus('idle');
    try {
      const res = await fetch('/api/rsvp', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      const data = await res.json();
      if (!res.ok) { setSubmitStatus('error'); setErrorMessage(data.error || 'Erro ao enviar.'); return; }
      setSubmitStatus('success');
      setForm({ name: '', email: '', companion: '', companionName: '', message: '' });
    } catch { setSubmitStatus('error'); setErrorMessage('Erro de ligação.'); } finally { setIsSubmitting(false); }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="px-4 sm:px-5 py-6 text-white" style={{ background: GREEN }}>
        <p className="text-center text-[10px] tracking-[0.3em] uppercase opacity-70 mb-1">CONFIRMAÇÃO</p>
        <h2 className="text-center text-lg sm:text-xl tracking-wide" style={{ fontFamily: 'var(--font-playfair)', fontWeight: 400 }}>
          Confirmar Presença
        </h2>
        <div className="flex justify-center mt-4">
          <a href="#rsvp-form" className="inline-block px-6 py-2 text-[10px] tracking-[0.15em] uppercase rounded-sm transition-colors" style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)' }}>
            Confirmar
          </a>
        </div>
      </div>

      <div className="bg-white px-4 sm:px-5 py-6 flex-1 overflow-y-auto">
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Heart className="w-4 h-4" style={{ color: GREEN }} fill={GREEN} />
            <p className="text-[10px] tracking-[0.25em] uppercase text-[#999] font-medium">RECOMENDAÇÕES</p>
          </div>
          <div className="space-y-2.5">
            <RecItem icon={<Users className="w-3.5 h-3.5" style={{ color: GREEN }} />} title="Apenas Adultos" desc="Este evento é exclusivo para adultos. Agradecemos a compreensão." />
            <RecItem icon={<MapPin className="w-3.5 h-3.5" style={{ color: GREEN }} />} title="Estacionamento" desc="Estacionamento gratuito disponível no local do evento." />
            <RecItem icon={<Clock className="w-3.5 h-3.5" style={{ color: GREEN }} />} title="Pontualidade" desc="Por favor, chegue 15 minutos antes da cerimónia." />
          </div>
        </div>

        <div className="text-center py-3">
          <p className="text-sm sm:text-base leading-relaxed" style={{ fontFamily: 'var(--font-playfair)', fontWeight: 400, color: DARK }}>
            Esperamos contar com a sua presença neste dia tão especial
          </p>
          <div className="flex justify-center mt-3"><div className="w-8 h-px" style={{ background: GREEN }} /></div>
        </div>

        <form id="rsvp-form" onSubmit={handleSubmit} className="mt-5 space-y-3">
          <Input placeholder="Nome completo" required value={form.name} onChange={(e) => handleChange('name', e.target.value)} className="h-9 text-xs rounded-sm border-[#e0e0e0] focus-visible:ring-[#6b7c5a]/30 bg-white" />
          <Input type="email" placeholder="Email" required value={form.email} onChange={(e) => handleChange('email', e.target.value)} className="h-9 text-xs rounded-sm border-[#e0e0e0] focus-visible:ring-[#6b7c5a]/30 bg-white" />
          <Select value={form.companion} onValueChange={(v) => handleChange('companion', v)}>
            <SelectTrigger className="h-9 text-xs rounded-sm border-[#e0e0e0] focus:ring-[#6b7c5a]/30 bg-white">
              <SelectValue placeholder="Vai com acompanhante?" />
            </SelectTrigger>
            <SelectContent><SelectItem value="yes">Sim</SelectItem><SelectItem value="no">Não</SelectItem></SelectContent>
          </Select>
          {form.companion === 'yes' && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
              <Input placeholder="Nome do acompanhante" value={form.companionName} onChange={(e) => handleChange('companionName', e.target.value)} className="h-9 text-xs rounded-sm border-[#e0e0e0] focus-visible:ring-[#6b7c5a]/30 bg-white" />
            </motion.div>
          )}
          <Textarea placeholder="Mensagem para os noivos (opcional)" value={form.message} onChange={(e) => handleChange('message', e.target.value)} className="text-xs rounded-sm border-[#e0e0e0] focus-visible:ring-[#6b7c5a]/30 bg-white resize-none" rows={2} />
          <Button type="submit" disabled={isSubmitting} className="w-full h-9 text-[10px] tracking-[0.15em] uppercase rounded-sm hover:opacity-90" style={{ background: GREEN, color: WHITE, border: 'none' }}>
            {isSubmitting ? <Loader2 className="w-3 h-3 animate-spin mr-1.5" /> : <Send className="w-3 h-3 mr-1.5" />}
            {isSubmitting ? 'A enviar...' : 'Confirmar Presença'}
          </Button>
          {submitStatus === 'success' && (
            <motion.div className="flex items-center gap-2 p-2.5 rounded-sm text-[11px]" style={{ background: 'rgba(34,197,94,0.08)', color: '#16a34a', border: '1px solid rgba(34,197,94,0.15)' }} initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}>
              <CheckCircle className="w-3.5 h-3.5 flex-shrink-0" />
              <span>Obrigado! A sua confirmação foi registada.</span>
            </motion.div>
          )}
          {submitStatus === 'error' && (
            <motion.div className="flex items-center gap-2 p-2.5 rounded-sm text-[11px]" style={{ background: 'rgba(239,68,68,0.08)', color: '#dc2626', border: '1px solid rgba(239,68,68,0.15)' }} initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}>
              <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
              <span>{errorMessage}</span>
            </motion.div>
          )}
        </form>
      </div>

      <div className="relative aspect-[16/10] overflow-hidden flex-shrink-0">
        <Image src="/images/couple-sunlight.png" alt="Luciano & Auriscidia" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 33vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        <div className="absolute bottom-3 left-0 right-0 text-center">
          <p className="text-white text-[10px] tracking-[0.2em] uppercase opacity-80">Luciano & Auriscidia</p>
        </div>
      </div>
    </div>
  );
}

function RecItem({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="flex items-start gap-2.5">
      <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: `${GREEN}15`, border: `1px solid ${GREEN}30` }}>{icon}</div>
      <div><p className="text-xs font-medium text-[#333]">{title}</p><p className="text-[10px] mt-0.5 text-[#888]">{desc}</p></div>
    </div>
  );
}

/* ============================================================
   MOBILE — PAGE 2 CONTENT (vertical stack)
   ============================================================ */
function MobileContent({ onBack }: { onBack: () => void }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [form, setForm] = useState({ name: '', email: '', companion: '', companionName: '', message: '' });
  const h = (f: string, v: string) => setForm((p: Record<string, string>) => ({ ...p, [f]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setIsSubmitting(true); setSubmitStatus('idle');
    try {
      const res = await fetch('/api/rsvp', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      const data = await res.json();
      if (!res.ok) { setSubmitStatus('error'); setErrorMessage(data.error || 'Erro'); return; }
      setSubmitStatus('success'); setForm({ name: '', email: '', companion: '', companionName: '', message: '' });
    } catch { setSubmitStatus('error'); setErrorMessage('Erro de ligação.'); } finally { setIsSubmitting(false); }
  };

  return (
    <div className="min-h-screen">
      {/* Back button */}
      <button onClick={onBack} className="fixed top-3 left-3 z-50 w-9 h-9 rounded-full flex items-center justify-center bg-white shadow-md border border-[#e0e0e0] transition-colors hover:bg-gray-50">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6b7c5a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/></svg>
      </button>

      {/* Hero */}
      <div className="px-5 pt-8 pb-6 text-center text-white" style={{ background: GREEN }}>
        <svg className="mx-auto mb-3" width="32" height="20" viewBox="0 0 28 18" fill="none">
          <path d="M1 1L14 10L27 1" stroke="rgba(255,255,255,0.5)" strokeWidth="1"/>
          <path d="M1 17H27V1L14 10L1 1V17Z" stroke="rgba(255,255,255,0.5)" strokeWidth="1" fill="none"/>
        </svg>
        <h1 className="text-4xl sm:text-5xl" style={{ fontFamily: 'var(--font-script)' }}>Luciano</h1>
        <div className="text-xl my-1 opacity-80">&amp;</div>
        <h1 className="text-4xl sm:text-5xl" style={{ fontFamily: 'var(--font-script)' }}>Auriscidia</h1>
        <p className="mt-3 text-xs tracking-[0.25em] opacity-80">14.11.2025</p>
      </div>

      <div className="bg-white px-4 py-5">
        <div className="relative aspect-[3/4] rounded-sm overflow-hidden max-w-sm mx-auto">
          <Image src="/images/couple-portrait.png" alt="Luciano & Auriscidia" fill className="object-cover" sizes="100vw" priority />
        </div>
        <p className="mt-3 text-center text-xs text-[#999] italic">&ldquo;Juntos para sempre&rdquo;</p>
        <div className="mt-3 max-w-sm mx-auto"><MusicPlayer /></div>
      </div>

      <div className="px-5 py-6 text-white" style={{ background: GREEN }}>
        <p className="text-center text-[10px] tracking-[0.3em] uppercase opacity-70 mb-3">O GRANDE DIA</p>
        <Calendar />
        <div className="mt-4 pt-3 border-t border-white/10">
          <p className="text-center text-[10px] tracking-[0.2em] uppercase opacity-70 mb-2">FALTAM</p>
          <CountdownTimer />
        </div>
      </div>

      <div className="bg-white px-5 py-7">
        <p className="text-center text-[10px] tracking-[0.3em] uppercase text-[#999] mb-1">NOSSO CASAMENTO</p>
        <h2 className="text-center text-xl tracking-wide mb-5" style={{ fontFamily: 'var(--font-playfair)', fontWeight: 400 }}>Cerimónia Religiosa</h2>
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 text-sm text-[#888]"><Clock className="w-3.5 h-3.5" style={{ color: GREEN }} /> 16h50</div>
          <div className="flex items-center justify-center gap-1.5 mt-2 text-sm text-[#888]">
            <MapPin className="w-3.5 h-3.5" style={{ color: GREEN }} />
            <span className="text-sm font-medium text-[#333]">IGREJA DE SÃO FRANCISCO</span>
          </div>
          <a href="#" className="inline-block mt-4 px-5 py-1.5 text-[10px] tracking-[0.15em] uppercase text-white rounded-sm" style={{ background: GREEN }}>Ver localização</a>
        </div>
        <div className="space-y-0 max-w-xs mx-auto">
          {timelineEvents.map((ev, i) => (
            <div key={i} className="flex gap-3">
              <div className="text-[11px] text-[#999] pt-0.5 w-12 text-right flex-shrink-0">{ev.time}</div>
              <div className="flex flex-col items-center flex-shrink-0">
                <div className="w-2.5 h-2.5 rounded-full border-2 mt-0.5" style={{ borderColor: GREEN, background: i === 0 ? GREEN : WHITE }} />
                {i < timelineEvents.length - 1 && <div className="w-px flex-1 bg-[#e0e0e0]" />}
              </div>
              <div className="pb-4">
                <p className="text-xs font-medium text-[#333]">{ev.title}</p>
                <p className="text-[10px] mt-0.5 text-[#888]">{ev.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="relative aspect-[16/9] overflow-hidden">
        <Image src="/images/couple-dancing.png" alt="Luciano & Auriscidia" fill className="object-cover" sizes="100vw" />
      </div>

      <div className="px-5 py-5 text-white" style={{ background: GREEN }}>
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[10px] tracking-[0.3em] uppercase opacity-70 mb-2">CÓDIGO DE VESTIR</p>
            <p className="text-lg font-light" style={{ fontFamily: 'var(--font-playfair)' }}>Elegante</p>
            <div className="flex items-center gap-1.5 mt-2 opacity-70"><Users className="w-3.5 h-3.5" /><span className="text-[10px]">Branco proibido</span></div>
          </div>
          <div className="text-center">
            <div className="w-14 h-14 bg-white rounded-sm flex items-center justify-center"><QrCode className="w-10 h-10 text-[#333]" /></div>
            <p className="text-[8px] tracking-[0.2em] uppercase opacity-60 mt-1.5">PRESENTES</p>
          </div>
        </div>
      </div>

      <div className="bg-white px-5 py-6">
        <div className="flex items-center gap-2 mb-4"><Heart className="w-4 h-4" style={{ color: GREEN }} fill={GREEN} /><p className="text-[10px] tracking-[0.25em] uppercase text-[#999] font-medium">RECOMENDAÇÕES</p></div>
        <div className="space-y-3">
          <RecItem icon={<Users className="w-3.5 h-3.5" style={{ color: GREEN }} />} title="Apenas Adultos" desc="Este evento é exclusivo para adultos." />
          <RecItem icon={<MapPin className="w-3.5 h-3.5" style={{ color: GREEN }} />} title="Estacionamento" desc="Estacionamento gratuito no local." />
          <RecItem icon={<Clock className="w-3.5 h-3.5" style={{ color: GREEN }} />} title="Pontualidade" desc="Chegue 15 minutos antes da cerimónia." />
        </div>
      </div>

      <div className="px-5 py-6 text-white" style={{ background: GREEN }}>
        <p className="text-center text-[10px] tracking-[0.3em] uppercase opacity-70 mb-1">CONFIRMAÇÃO</p>
        <h2 className="text-center text-xl tracking-wide" style={{ fontFamily: 'var(--font-playfair)', fontWeight: 400 }}>Confirmar Presença</h2>
      </div>
      <div className="bg-white px-5 py-6">
        <p className="text-center text-sm leading-relaxed mb-5" style={{ fontFamily: 'var(--font-playfair)', fontWeight: 400, color: DARK }}>Esperamos contar com a sua presença neste dia tão especial</p>
        <form onSubmit={handleSubmit} className="space-y-3">
          <Input placeholder="Nome completo" required value={form.name} onChange={(e) => h('name', e.target.value)} className="h-9 text-xs rounded-sm border-[#e0e0e0] focus-visible:ring-[#6b7c5a]/30" />
          <Input type="email" placeholder="Email" required value={form.email} onChange={(e) => h('email', e.target.value)} className="h-9 text-xs rounded-sm border-[#e0e0e0] focus-visible:ring-[#6b7c5a]/30" />
          <Select value={form.companion} onValueChange={(v) => h('companion', v)}>
            <SelectTrigger className="h-9 text-xs rounded-sm border-[#e0e0e0] focus:ring-[#6b7c5a]/30"><SelectValue placeholder="Vai com acompanhante?" /></SelectTrigger>
            <SelectContent><SelectItem value="yes">Sim</SelectItem><SelectItem value="no">Não</SelectItem></SelectContent>
          </Select>
          {form.companion === 'yes' && <Input placeholder="Nome do acompanhante" value={form.companionName} onChange={(e) => h('companionName', e.target.value)} className="h-9 text-xs rounded-sm border-[#e0e0e0] focus-visible:ring-[#6b7c5a]/30" />}
          <Textarea placeholder="Mensagem para os noivos (opcional)" value={form.message} onChange={(e) => h('message', e.target.value)} className="text-xs rounded-sm border-[#e0e0e0] focus-visible:ring-[#6b7c5a]/30 resize-none" rows={2} />
          <Button type="submit" disabled={isSubmitting} className="w-full h-9 text-[10px] tracking-[0.15em] uppercase rounded-sm" style={{ background: GREEN, color: WHITE, border: 'none' }}>
            {isSubmitting ? <Loader2 className="w-3 h-3 animate-spin mr-1.5" /> : <Send className="w-3 h-3 mr-1.5" />}
            {isSubmitting ? 'A enviar...' : 'Confirmar Presença'}
          </Button>
          {submitStatus === 'success' && <div className="flex items-center gap-2 p-2.5 rounded-sm text-[11px]" style={{ background: 'rgba(34,197,94,0.08)', color: '#16a34a' }}><CheckCircle className="w-3.5 h-3.5" /><span>Obrigado! A sua confirmação foi registada.</span></div>}
          {submitStatus === 'error' && <div className="flex items-center gap-2 p-2.5 rounded-sm text-[11px]" style={{ background: 'rgba(239,68,68,0.08)', color: '#dc2626' }}><AlertCircle className="w-3.5 h-3.5" /><span>{errorMessage}</span></div>}
        </form>
      </div>

      <div className="relative aspect-[16/10] overflow-hidden">
        <Image src="/images/couple-sunlight.png" alt="Luciano & Auriscidia" fill className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        <div className="absolute bottom-3 left-0 right-0 text-center"><p className="text-white text-[10px] tracking-[0.2em] uppercase opacity-80">Luciano & Auriscidia</p></div>
      </div>

      <footer className="py-6 text-center" style={{ borderTop: `1px solid ${LIGHT_GRAY}` }}>
        <p className="text-[10px] tracking-[0.2em] uppercase text-[#bbb]">
          Feito com <Heart className="w-2.5 h-2.5 inline" style={{ color: GREEN }} fill={GREEN} /> para o dia mais especial
        </p>
      </footer>
    </div>
  );
}

/* ============================================================
   MAIN PAGE
   ============================================================ */
export default function Home() {
  const [page, setPage] = useState<'landing' | 'content'>('landing');

  return (
    <div className="min-h-screen" style={{ background: CREAM }}>
      <AnimatePresence mode="wait">
        {page === 'landing' ? (
          <PageLanding key="landing" onOpen={() => setPage('content')} />
        ) : (
          <motion.div key="content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
            {/* Desktop: 3-panel tri-fold */}
            <div className="hidden lg:block">
              <div className="flex justify-center items-start gap-4 p-6 min-h-screen">
                {/* Back button */}
                <button onClick={() => setPage('landing')} className="fixed top-4 left-4 z-50 w-9 h-9 rounded-full flex items-center justify-center bg-white shadow-md border border-[#e0e0e0] transition-colors hover:bg-gray-50" title="Voltar ao convite">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6b7c5a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/></svg>
                </button>
                <motion.div className="w-[320px] xl:w-[350px] flex-shrink-0 bg-white rounded-sm shadow-lg overflow-hidden h-[calc(100vh-3rem)]" initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, ease: 'easeOut' }}>
                  <LeftPanel />
                </motion.div>
                <motion.div className="w-[320px] xl:w-[350px] flex-shrink-0 bg-white rounded-sm shadow-lg overflow-hidden h-[calc(100vh-3rem)]" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.12, ease: 'easeOut' }}>
                  <MiddlePanel />
                </motion.div>
                <motion.div className="w-[320px] xl:w-[350px] flex-shrink-0 bg-white rounded-sm shadow-lg overflow-hidden h-[calc(100vh-3rem)]" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.24, ease: 'easeOut' }}>
                  <RightPanel />
                </motion.div>
              </div>
            </div>

            {/* Tablet: 3 smaller panels */}
            <div className="hidden md:block lg:hidden">
              <button onClick={() => setPage('landing')} className="fixed top-3 left-3 z-50 w-9 h-9 rounded-full flex items-center justify-center bg-white shadow-md border border-[#e0e0e0]">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6b7c5a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/></svg>
              </button>
              <div className="flex justify-center items-start gap-3 p-4">
                <div className="w-[280px] flex-shrink-0 bg-white rounded-sm shadow-md overflow-hidden min-h-[85vh]"><LeftPanel /></div>
                <div className="w-[280px] flex-shrink-0 bg-white rounded-sm shadow-md overflow-hidden min-h-[85vh]"><MiddlePanel /></div>
                <div className="w-[280px] flex-shrink-0 bg-white rounded-sm shadow-md overflow-hidden min-h-[85vh]"><RightPanel /></div>
              </div>
            </div>

            {/* Mobile */}
            <div className="md:hidden">
              <MobileContent onBack={() => setPage('landing')} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}