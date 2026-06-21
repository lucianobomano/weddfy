'use client';

import { useState, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import {
  MapPin, Clock, Heart, Users, Baby, QrCode,
  CheckCircle, AlertCircle, Loader2, Send,
  ChevronDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import CountdownTimer from '@/components/wedding/CountdownTimer';
import Calendar from '@/components/wedding/Calendar';
import MusicPlayer from '@/components/wedding/MusicPlayer';

/* ============================================================
   CONSTANTS
   ============================================================ */
const GREEN = '#6b7c5a';
const CREAM = '#f5f2ed';
const WHITE = '#ffffff';
const DARK = '#333333';
const GRAY = '#888888';
const LIGHT_GRAY = '#e0e0e0';

const timelineEvents = [
  { time: '4:50 pm', title: 'Ceremonia Religiosa', location: 'Iglesia San Francisco' },
  { time: '6:30 pm', title: 'Llegada al Salón', location: 'Salón Los Olivos' },
  { time: '7:00 pm', title: 'Recepción', location: 'Cena & Baile' },
];

/* ============================================================
   LEFT PANEL — HERO
   ============================================================ */
function LeftPanel() {
  return (
    <div className="flex flex-col h-full">
      {/* Green header with names */}
      <div className="px-4 sm:px-5 pt-6 pb-5 text-center text-white" style={{ background: GREEN }}>
        {/* Envelope decoration */}
        <div className="flex justify-center mb-3">
          <svg width="28" height="18" viewBox="0 0 28 18" fill="none">
            <path d="M1 1L14 10L27 1" stroke="rgba(255,255,255,0.5)" strokeWidth="1"/>
            <path d="M1 17H27V1L14 10L1 1V17Z" stroke="rgba(255,255,255,0.5)" strokeWidth="1" fill="none"/>
          </svg>
        </div>
        <h1
          className="text-3xl sm:text-4xl leading-tight"
          style={{ fontFamily: 'var(--font-script)' }}
        >
          Fernanda
        </h1>
        <div className="text-lg sm:text-xl my-1 opacity-80">&amp;</div>
        <h1
          className="text-3xl sm:text-4xl leading-tight"
          style={{ fontFamily: 'var(--font-script)' }}
        >
          Gustavo
        </h1>
        <p className="mt-3 text-[11px] sm:text-xs tracking-[0.25em] opacity-80">
          14.11.2025
        </p>
      </div>

      {/* Couple photo */}
      <div className="flex-1 bg-white px-3 sm:px-4 py-4 flex flex-col justify-center">
        <div className="relative aspect-[3/4] rounded-sm overflow-hidden">
          <Image
            src="/images/couple-portrait.png"
            alt="Fernanda & Gustavo"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 33vw"
            priority
          />
        </div>
        <p className="mt-3 text-center text-[11px] sm:text-xs text-[#999] italic">
          &ldquo;Juntos para siempre&rdquo;
        </p>
        <div className="mt-3">
          <MusicPlayer />
        </div>
      </div>

      {/* Green footer with calendar + countdown */}
      <div className="px-4 sm:px-5 py-5 text-white" style={{ background: GREEN }}>
        <p className="text-center text-[10px] tracking-[0.3em] uppercase opacity-70 mb-3">
          EL GRAN DÍA
        </p>
        <Calendar />
        <div className="mt-4 pt-3 border-t border-white/10">
          <p className="text-center text-[10px] tracking-[0.2em] uppercase opacity-70 mb-2">
            FALTAN
          </p>
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
      {/* Ceremony details */}
      <div className="bg-white px-4 sm:px-5 py-6 flex-1">
        <div className="text-center mb-5">
          <p className="text-[10px] tracking-[0.3em] uppercase text-[#999] mb-1">NUESTRA BODA</p>
          <h2
            className="text-lg sm:text-xl tracking-wide"
            style={{ fontFamily: 'var(--font-playfair)', fontWeight: 400, color: DARK }}
          >
            Ceremonia Religiosa
          </h2>
        </div>

        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 text-sm" style={{ color: GRAY }}>
            <Clock className="w-3.5 h-3.5" style={{ color: GREEN }} />
            <span>4:50 pm</span>
          </div>
          <div className="flex items-center justify-center gap-1.5 mt-2 text-sm" style={{ color: GRAY }}>
            <MapPin className="w-3.5 h-3.5" style={{ color: GREEN }} />
            <span className="text-xs sm:text-sm font-medium" style={{ color: DARK }}>IGLESIA SAN FRANCISCO</span>
          </div>
          <a
            href="#"
            className="inline-block mt-4 px-4 py-1.5 text-[10px] tracking-[0.15em] uppercase text-white rounded-sm transition-colors hover:opacity-90"
            style={{ background: GREEN }}
          >
            Ver ubicación
          </a>
        </div>

        {/* Timeline */}
        <div className="space-y-0">
          {timelineEvents.map((event, i) => (
            <div key={i} className="flex gap-3">
              {/* Time */}
              <div className="text-[11px] text-[#999] pt-0.5 w-14 text-right flex-shrink-0">
                {event.time}
              </div>
              {/* Line + dot */}
              <div className="flex flex-col items-center flex-shrink-0">
                <div className="w-2.5 h-2.5 rounded-full border-2 mt-0.5" style={{ borderColor: GREEN, background: i === 0 ? GREEN : WHITE }} />
                {i < timelineEvents.length - 1 && (
                  <div className="w-px flex-1" style={{ background: LIGHT_GRAY }} />
                )}
              </div>
              {/* Content */}
              <div className="pb-4">
                <p className="text-xs font-medium" style={{ color: DARK }}>{event.title}</p>
                <p className="text-[10px] mt-0.5" style={{ color: GRAY }}>{event.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dancing photo */}
      <div className="relative aspect-[16/9] overflow-hidden">
        <Image
          src="/images/couple-dancing.png"
          alt="Fernanda & Gustavo bailando"
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 33vw"
        />
      </div>

      {/* Dress code + QR */}
      <div className="px-4 sm:px-5 py-5 text-white" style={{ background: GREEN }}>
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[10px] tracking-[0.3em] uppercase opacity-70 mb-2">
              CÓDIGO DE VESTIMENTA
            </p>
            <p className="text-base sm:text-lg font-light" style={{ fontFamily: 'var(--font-playfair)' }}>
              Elegante
            </p>
            <div className="flex items-center gap-1.5 mt-2 opacity-70">
              <Users className="w-3.5 h-3.5" />
              <span className="text-[10px]">Blanco prohibido</span>
            </div>
          </div>
          <div className="text-center">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white rounded-sm flex items-center justify-center">
              <QrCode className="w-10 h-10 sm:w-12 sm:h-12 text-[#333]" />
            </div>
            <p className="text-[8px] tracking-[0.2em] uppercase opacity-60 mt-1.5">
              LUGAR DE REGALO
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   RIGHT PANEL — RSVP + INFO
   ============================================================ */
interface RSVPForm {
  name: string;
  email: string;
  companion: string;
  companionName: string;
  message: string;
}

function RightPanel() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [form, setForm] = useState<RSVPForm>({
    name: '', email: '', companion: '', companionName: '', message: '',
  });

  const handleChange = (field: keyof RSVPForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    try {
      const res = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setSubmitStatus('error');
        setErrorMessage(data.error || 'Error al enviar.');
        return;
      }
      setSubmitStatus('success');
      setForm({ name: '', email: '', companion: '', companionName: '', message: '' });
    } catch {
      setSubmitStatus('error');
      setErrorMessage('Error de conexión.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* RSVP header */}
      <div className="px-4 sm:px-5 py-6 text-white" style={{ background: GREEN }}>
        <p className="text-center text-[10px] tracking-[0.3em] uppercase opacity-70 mb-1">
          CONFIRMACIÓN
        </p>
        <h2
          className="text-center text-lg sm:text-xl tracking-wide"
          style={{ fontFamily: 'var(--font-playfair)', fontWeight: 400 }}
        >
          Confirmar Asistencia
        </h2>
        <div className="flex justify-center mt-4">
          <a
            href="#rsvp-form"
            className="inline-block px-6 py-2 text-[10px] tracking-[0.15em] uppercase rounded-sm transition-colors"
            style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)' }}
          >
            Confirmar
          </a>
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-white px-4 sm:px-5 py-6 flex-1">
        {/* Recomendaciones */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Heart className="w-4 h-4" style={{ color: GREEN }} fill={GREEN} />
            <p className="text-[10px] tracking-[0.25em] uppercase text-[#999] font-medium">
              RECOMENDACIONES
            </p>
          </div>
          <div className="space-y-2.5">
            <div className="flex items-start gap-2.5">
              <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: `${GREEN}15`, border: `1px solid ${GREEN}30` }}>
                <Users className="w-3 h-3" style={{ color: GREEN }} />
              </div>
              <div>
                <p className="text-xs font-medium" style={{ color: DARK }}>Adultos Solamente</p>
                <p className="text-[10px] mt-0.5" style={{ color: GRAY }}>
                  Este evento es exclusivo para adultos. Agradecemos su comprensión.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: `${GREEN}15`, border: `1px solid ${GREEN}30` }}>
                <MapPin className="w-3 h-3" style={{ color: GREEN }} />
              </div>
              <div>
                <p className="text-xs font-medium" style={{ color: DARK }}>Estacionamiento</p>
                <p className="text-[10px] mt-0.5" style={{ color: GRAY }}>
                  Contamos con estacionamiento gratuito en el lugar del evento.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: `${GREEN}15`, border: `1px solid ${GREEN}30` }}>
                <Clock className="w-3 h-3" style={{ color: GREEN }} />
              </div>
              <div>
                <p className="text-xs font-medium" style={{ color: DARK }}>Puntualidad</p>
                <p className="text-[10px] mt-0.5" style={{ color: GRAY }}>
                  Por favor llegar 15 minutos antes de la ceremonia.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Esperamos contar con su presencia */}
        <div className="text-center py-3">
          <p
            className="text-sm sm:text-base leading-relaxed"
            style={{ fontFamily: 'var(--font-playfair)', fontWeight: 400, color: DARK }}
          >
            Esperamos contar con su presencia en este día tan especial
          </p>
          <div className="flex justify-center mt-3">
            <div className="w-8 h-px" style={{ background: GREEN }} />
          </div>
        </div>

        {/* RSVP Form */}
        <form id="rsvp-form" onSubmit={handleSubmit} className="mt-5 space-y-3">
          <div>
            <Input
              placeholder="Nombre completo"
              required
              value={form.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className="h-9 text-xs rounded-sm border-[#e0e0e0] focus-visible:ring-[#6b7c5a]/30 bg-white"
            />
          </div>
          <div>
            <Input
              type="email"
              placeholder="Email"
              required
              value={form.email}
              onChange={(e) => handleChange('email', e.target.value)}
              className="h-9 text-xs rounded-sm border-[#e0e0e0] focus-visible:ring-[#6b7c5a]/30 bg-white"
            />
          </div>
          <div>
            <Select value={form.companion} onValueChange={(v) => handleChange('companion', v)}>
              <SelectTrigger className="h-9 text-xs rounded-sm border-[#e0e0e0] focus:ring-[#6b7c5a]/30 bg-white">
                <SelectValue placeholder="¿Viene con acompañante?" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="yes">Sí</SelectItem>
                <SelectItem value="no">No</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {form.companion === 'yes' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
            >
              <Input
                placeholder="Nombre del acompañante"
                value={form.companionName}
                onChange={(e) => handleChange('companionName', e.target.value)}
                className="h-9 text-xs rounded-sm border-[#e0e0e0] focus-visible:ring-[#6b7c5a]/30 bg-white"
              />
            </motion.div>
          )}
          <div>
            <Textarea
              placeholder="Mensaje para los novios (opcional)"
              value={form.message}
              onChange={(e) => handleChange('message', e.target.value)}
              className="text-xs rounded-sm border-[#e0e0e0] focus-visible:ring-[#6b7c5a]/30 bg-white resize-none"
              rows={2}
            />
          </div>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-9 text-[10px] tracking-[0.15em] uppercase rounded-sm transition-colors hover:opacity-90"
            style={{ background: GREEN, color: WHITE, border: 'none' }}
          >
            {isSubmitting ? (
              <Loader2 className="w-3 h-3 animate-spin mr-1.5" />
            ) : (
              <Send className="w-3 h-3 mr-1.5" />
            )}
            {isSubmitting ? 'Enviando...' : 'Confirmar Asistencia'}
          </Button>

          {submitStatus === 'success' && (
            <motion.div
              className="flex items-center gap-2 p-2.5 rounded-sm text-[11px]"
              style={{ background: 'rgba(34,197,94,0.08)', color: '#16a34a', border: '1px solid rgba(34,197,94,0.15)' }}
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <CheckCircle className="w-3.5 h-3.5 flex-shrink-0" />
              <span>¡Gracias! Tu confirmación ha sido registrada.</span>
            </motion.div>
          )}
          {submitStatus === 'error' && (
            <motion.div
              className="flex items-center gap-2 p-2.5 rounded-sm text-[11px]"
              style={{ background: 'rgba(239,68,68,0.08)', color: '#dc2626', border: '1px solid rgba(239,68,68,0.15)' }}
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
              <span>{errorMessage}</span>
            </motion.div>
          )}
        </form>
      </div>

      {/* Bottom photo */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src="/images/couple-sunlight.png"
          alt="Fernanda & Gustavo"
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        <div className="absolute bottom-3 left-0 right-0 text-center">
          <p className="text-white text-[10px] tracking-[0.2em] uppercase opacity-80">
            Fernanda & Gustavo
          </p>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   MOBILE SCROLL VERSION
   ============================================================ */
function MobileVersion() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [form, setForm] = useState({ name: '', email: '', companion: '', companionName: '', message: '' });

  const handleChange = (field: string, value: string) => setForm((p: Record<string,string>) => ({ ...p, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    try {
      const res = await fetch('/api/rsvp', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      const data = await res.json();
      if (!res.ok) { setSubmitStatus('error'); setErrorMessage(data.error || 'Error'); return; }
      setSubmitStatus('success');
      setForm({ name: '', email: '', companion: '', companionName: '', message: '' });
    } catch { setSubmitStatus('error'); setErrorMessage('Error de conexión.'); }
    finally { setIsSubmitting(false); }
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="px-5 pt-8 pb-6 text-center text-white" style={{ background: GREEN }}>
        <svg className="mx-auto mb-3" width="32" height="20" viewBox="0 0 28 18" fill="none">
          <path d="M1 1L14 10L27 1" stroke="rgba(255,255,255,0.5)" strokeWidth="1"/>
          <path d="M1 17H27V1L14 10L1 1V17Z" stroke="rgba(255,255,255,0.5)" strokeWidth="1" fill="none"/>
        </svg>
        <h1 className="text-4xl sm:text-5xl" style={{ fontFamily: 'var(--font-script)' }}>Fernanda</h1>
        <div className="text-xl my-1 opacity-80">&amp;</div>
        <h1 className="text-4xl sm:text-5xl" style={{ fontFamily: 'var(--font-script)' }}>Gustavo</h1>
        <p className="mt-3 text-xs tracking-[0.25em] opacity-80">14.11.2025</p>
      </div>

      {/* Photo */}
      <div className="bg-white px-4 py-5">
        <div className="relative aspect-[3/4] rounded-sm overflow-hidden max-w-sm mx-auto">
          <Image src="/images/couple-portrait.png" alt="Fernanda & Gustavo" fill className="object-cover" sizes="100vw" priority />
        </div>
        <p className="mt-3 text-center text-xs text-[#999] italic">&ldquo;Juntos para siempre&rdquo;</p>
        <div className="mt-3 max-w-sm mx-auto"><MusicPlayer /></div>
      </div>

      {/* Calendar + Countdown */}
      <div className="px-5 py-6 text-white" style={{ background: GREEN }}>
        <p className="text-center text-[10px] tracking-[0.3em] uppercase opacity-70 mb-3">EL GRAN DÍA</p>
        <Calendar />
        <div className="mt-4 pt-3 border-t border-white/10">
          <p className="text-center text-[10px] tracking-[0.2em] uppercase opacity-70 mb-2">FALTAN</p>
          <CountdownTimer />
        </div>
      </div>

      {/* Ceremony */}
      <div className="bg-white px-5 py-7">
        <p className="text-center text-[10px] tracking-[0.3em] uppercase text-[#999] mb-1">NUESTRA BODA</p>
        <h2 className="text-center text-xl tracking-wide mb-5" style={{ fontFamily: 'var(--font-playfair)', fontWeight: 400 }}>
          Ceremonia Religiosa
        </h2>
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 text-sm text-[#888]">
            <Clock className="w-3.5 h-3.5" style={{ color: GREEN }} /> 4:50 pm
          </div>
          <div className="flex items-center justify-center gap-1.5 mt-2 text-sm text-[#888]">
            <MapPin className="w-3.5 h-3.5" style={{ color: GREEN }} />
            <span className="text-sm font-medium text-[#333]">IGLESIA SAN FRANCISCO</span>
          </div>
          <a href="#" className="inline-block mt-4 px-5 py-1.5 text-[10px] tracking-[0.15em] uppercase text-white rounded-sm" style={{ background: GREEN }}>
            Ver ubicación
          </a>
        </div>
        <div className="space-y-0 max-w-xs mx-auto">
          {timelineEvents.map((ev, i) => (
            <div key={i} className="flex gap-3">
              <div className="text-[11px] text-[#999] pt-0.5 w-14 text-right flex-shrink-0">{ev.time}</div>
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

      {/* Dancing photo */}
      <div className="relative aspect-[16/9] overflow-hidden">
        <Image src="/images/couple-dancing.png" alt="Bailando" fill className="object-cover" sizes="100vw" />
      </div>

      {/* Dress code + QR */}
      <div className="px-5 py-5 text-white" style={{ background: GREEN }}>
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[10px] tracking-[0.3em] uppercase opacity-70 mb-2">CÓDIGO DE VESTIMENTA</p>
            <p className="text-lg font-light" style={{ fontFamily: 'var(--font-playfair)' }}>Elegante</p>
            <div className="flex items-center gap-1.5 mt-2 opacity-70">
              <Users className="w-3.5 h-3.5" />
              <span className="text-[10px]">Blanco prohibido</span>
            </div>
          </div>
          <div className="text-center">
            <div className="w-14 h-14 bg-white rounded-sm flex items-center justify-center">
              <QrCode className="w-10 h-10 text-[#333]" />
            </div>
            <p className="text-[8px] tracking-[0.2em] uppercase opacity-60 mt-1.5">LUGAR DE REGALO</p>
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-white px-5 py-6">
        <div className="flex items-center gap-2 mb-4">
          <Heart className="w-4 h-4" style={{ color: GREEN }} fill={GREEN} />
          <p className="text-[10px] tracking-[0.25em] uppercase text-[#999] font-medium">RECOMENDACIONES</p>
        </div>
        <div className="space-y-3">
          <RecItem icon={<Users className="w-3.5 h-3.5" style={{ color: GREEN }} />} title="Adultos Solamente" desc="Este evento es exclusivo para adultos." />
          <RecItem icon={<MapPin className="w-3.5 h-3.5" style={{ color: GREEN }} />} title="Estacionamiento" desc="Estacionamiento gratuito en el lugar." />
          <RecItem icon={<Clock className="w-3.5 h-3.5" style={{ color: GREEN }} />} title="Puntualidad" desc="Llegar 15 minutos antes de la ceremonia." />
        </div>
      </div>

      {/* RSVP */}
      <div className="px-5 py-6 text-white" style={{ background: GREEN }}>
        <p className="text-center text-[10px] tracking-[0.3em] uppercase opacity-70 mb-1">CONFIRMACIÓN</p>
        <h2 className="text-center text-xl tracking-wide" style={{ fontFamily: 'var(--font-playfair)', fontWeight: 400 }}>
          Confirmar Asistencia
        </h2>
      </div>
      <div className="bg-white px-5 py-6">
        <p className="text-center text-sm leading-relaxed mb-5" style={{ fontFamily: 'var(--font-playfair)', fontWeight: 400, color: DARK }}>
          Esperamos contar con su presencia en este día tan especial
        </p>
        <form onSubmit={handleSubmit} className="space-y-3">
          <Input placeholder="Nombre completo" required value={form.name} onChange={(e) => handleChange('name', e.target.value)} className="h-9 text-xs rounded-sm border-[#e0e0e0] focus-visible:ring-[#6b7c5a]/30" />
          <Input type="email" placeholder="Email" required value={form.email} onChange={(e) => handleChange('email', e.target.value)} className="h-9 text-xs rounded-sm border-[#e0e0e0] focus-visible:ring-[#6b7c5a]/30" />
          <Select value={form.companion} onValueChange={(v) => handleChange('companion', v)}>
            <SelectTrigger className="h-9 text-xs rounded-sm border-[#e0e0e0] focus:ring-[#6b7c5a]/30">
              <SelectValue placeholder="¿Viene con acompañante?" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="yes">Sí</SelectItem>
              <SelectItem value="no">No</SelectItem>
            </SelectContent>
          </Select>
          {form.companion === 'yes' && (
            <Input placeholder="Nombre del acompañante" value={form.companionName} onChange={(e) => handleChange('companionName', e.target.value)} className="h-9 text-xs rounded-sm border-[#e0e0e0] focus-visible:ring-[#6b7c5a]/30" />
          )}
          <Textarea placeholder="Mensaje para los novios (opcional)" value={form.message} onChange={(e) => handleChange('message', e.target.value)} className="text-xs rounded-sm border-[#e0e0e0] focus-visible:ring-[#6b7c5a]/30 resize-none" rows={2} />
          <Button type="submit" disabled={isSubmitting} className="w-full h-9 text-[10px] tracking-[0.15em] uppercase rounded-sm" style={{ background: GREEN, color: WHITE, border: 'none' }}>
            {isSubmitting ? <Loader2 className="w-3 h-3 animate-spin mr-1.5" /> : <Send className="w-3 h-3 mr-1.5" />}
            {isSubmitting ? 'Enviando...' : 'Confirmar Asistencia'}
          </Button>
          {submitStatus === 'success' && (
            <div className="flex items-center gap-2 p-2.5 rounded-sm text-[11px]" style={{ background: 'rgba(34,197,94,0.08)', color: '#16a34a' }}>
              <CheckCircle className="w-3.5 h-3.5" />
              <span>¡Gracias! Tu confirmación ha sido registrada.</span>
            </div>
          )}
          {submitStatus === 'error' && (
            <div className="flex items-center gap-2 p-2.5 rounded-sm text-[11px]" style={{ background: 'rgba(239,68,68,0.08)', color: '#dc2626' }}>
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{errorMessage}</span>
            </div>
          )}
        </form>
      </div>

      {/* Bottom photo */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image src="/images/couple-sunlight.png" alt="Fernanda & Gustavo" fill className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        <div className="absolute bottom-3 left-0 right-0 text-center">
          <p className="text-white text-[10px] tracking-[0.2em] uppercase opacity-80">Fernanda & Gustavo</p>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-6 text-center" style={{ borderTop: `1px solid ${LIGHT_GRAY}` }}>
        <p className="text-[10px] tracking-[0.2em] uppercase text-[#bbb]">
          Hecho con <Heart className="w-2.5 h-2.5 inline" style={{ color: GREEN }} fill={GREEN} /> para el día más especial
        </p>
      </footer>
    </div>
  );
}

function RecItem({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="flex items-start gap-2.5">
      <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: `${GREEN}15`, border: `1px solid ${GREEN}30` }}>
        {icon}
      </div>
      <div>
        <p className="text-xs font-medium text-[#333]">{title}</p>
        <p className="text-[10px] mt-0.5 text-[#888]">{desc}</p>
      </div>
    </div>
  );
}

/* ============================================================
   MAIN PAGE
   ============================================================ */
export default function Home() {
  return (
    <div className="min-h-screen" style={{ background: CREAM }}>
      {/* Desktop: 3-panel tri-fold */}
      <div className="hidden lg:block">
        <div className="flex justify-center items-start gap-4 p-6 min-h-screen">
          <motion.div
            className="w-[320px] xl:w-[350px] flex-shrink-0 bg-white rounded-sm shadow-lg overflow-hidden h-[calc(100vh-3rem)]"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <LeftPanel />
          </motion.div>

          <motion.div
            className="w-[320px] xl:w-[350px] flex-shrink-0 bg-white rounded-sm shadow-lg overflow-hidden h-[calc(100vh-3rem)]"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: 'easeOut' }}
          >
            <MiddlePanel />
          </motion.div>

          <motion.div
            className="w-[320px] xl:w-[350px] flex-shrink-0 bg-white rounded-sm shadow-lg overflow-hidden h-[calc(100vh-3rem)]"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
          >
            <RightPanel />
          </motion.div>
        </div>
      </div>

      {/* Tablet: 3-panel scrollable */}
      <div className="hidden md:block lg:hidden">
        <div className="flex justify-center items-start gap-3 p-4">
          <div className="w-[280px] flex-shrink-0 bg-white rounded-sm shadow-md overflow-hidden min-h-[85vh]">
            <LeftPanel />
          </div>
          <div className="w-[280px] flex-shrink-0 bg-white rounded-sm shadow-md overflow-hidden min-h-[85vh]">
            <MiddlePanel />
          </div>
          <div className="w-[280px] flex-shrink-0 bg-white rounded-sm shadow-md overflow-hidden min-h-[85vh]">
            <RightPanel />
          </div>
        </div>
      </div>

      {/* Mobile: vertical stack */}
      <div className="md:hidden">
        <MobileVersion />
      </div>
    </div>
  );
}