import React, { useState, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { GREEN, CREAM, WHITE, DARK } from './constants';

export interface RSVPForm {
  name: string;
  email: string;
  companion: string;
  companionName: string;
  gift: string;
  message: string;
}

interface RSVPPageProps {
  onBack: () => void;
  initialGuestName?: string;
}

export default function RSVPPage({ onBack, initialGuestName = '' }: RSVPPageProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [form, setForm] = useState<RSVPForm>({
    name: initialGuestName,
    email: '',
    companion: '',
    companionName: '',
    gift: '',
    message: '',
  });

  useEffect(() => {
    if (!initialGuestName) return;

    const checkGuest = async () => {
      try {
        const res = await fetch(`/api/rsvp/check?name=${encodeURIComponent(initialGuestName)}`);
        if (!res.ok) return;
        const data = await res.json();
        if (data.found) {
          setForm(p => ({
            ...p,
            companion: data.companion,
            companionName: data.companionName,
          }));
        }
      } catch (error) {
        console.error('Erro ao verificar convidado:', error);
      }
    };

    checkGuest();
  }, [initialGuestName]);

  const h = useCallback((f: keyof RSVPForm, v: string) => {
    setForm((p) => ({ ...p, [f]: v }));
  }, []);

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
        setErrorMessage(data.error || 'Erro ao enviar.');
        return;
      }
      setSubmitStatus('success');
      setForm({ name: '', email: '', companion: '', companionName: '', gift: '', message: '' });
    } catch {
      setSubmitStatus('error');
      setErrorMessage('Erro de ligação.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center px-4 py-8 select-none"
      style={{ background: CREAM }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Back button */}
      <button
        onClick={onBack}
        className="fixed top-4 left-4 z-50 w-9 h-9 rounded-full flex items-center justify-center bg-white shadow-md border border-[#e0e0e0] transition-colors hover:bg-gray-50 animate-fade-in"
        title="Voltar"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke={GREEN}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M19 12H5" />
          <path d="M12 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Main RSVP Card */}
      <motion.div
        className="w-full max-w-[350px] min-h-[720px] bg-[#6B7C5A] flex flex-col justify-between py-9 px-5 relative overflow-hidden shadow-lg border-[6px] border-white/25"
        style={{
          backgroundImage: "url('/images/bg02.svg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        {/* Top Header */}
        <div className="w-full text-center text-white pt-2 select-none">
          <p className="text-[10px] tracking-[0.25em] uppercase opacity-80 mb-1 font-bold">
            CONFIRMAÇÃO
          </p>
          <h2 
            className="text-[19px] tracking-[0.1em] font-extrabold uppercase"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            CONFIRMAR PRESENÇA
          </h2>
        </div>

        {/* White Form Card Container */}
        <div className="w-full bg-white px-5 py-6 my-5 shadow-md flex flex-col select-none">
          <p
            className="text-center text-[11px] leading-relaxed mb-5 font-bold text-[#363e2d]"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            Preencha o formulário abaixo para confirmar a sua presença no nosso casamento
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Nome Completo */}
            <div>
              <label className="text-[11px] font-semibold text-[#363e2d] mb-1.5 block">
                Nome completo
              </label>
              <Input
                placeholder="Maria Eduarda"
                required
                value={form.name}
                onChange={(e) => h('name', e.target.value)}
                className="h-9 text-xs rounded-none border-[#363e2d]/30 focus-visible:ring-[#6b7c5a]/30 bg-white text-[#363e2d] placeholder:text-[#363e2d]/40"
              />
            </div>

            {/* Email */}
            <div>
              <label className="text-[11px] font-semibold text-[#363e2d] mb-1.5 block">
                E-mail
              </label>
              <Input
                type="email"
                placeholder="mariaeduarda@email.com"
                required
                value={form.email}
                onChange={(e) => h('email', e.target.value)}
                className="h-9 text-xs rounded-none border-[#363e2d]/30 focus-visible:ring-[#6b7c5a]/30 bg-white text-[#363e2d] placeholder:text-[#363e2d]/40"
              />
            </div>

            {/* Acompanhante Dropdown */}
            <div>
              <label className="text-[11px] font-semibold text-[#363e2d] mb-1.5 block">
                Acompanhante
              </label>
              <Select value={form.companion} onValueChange={(v) => h('companion', v)}>
                <SelectTrigger className="h-9 text-xs rounded-none border-[#363e2d]/30 focus:ring-[#6b7c5a]/30 bg-white text-[#363e2d]">
                  <SelectValue placeholder="Vai com acompanhante" />
                </SelectTrigger>
                <SelectContent className="rounded-none">
                  <SelectItem value="yes">Sim</SelectItem>
                  <SelectItem value="no">Não</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Optional Companion Name */}
            {form.companion === 'yes' && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="pt-1">
                <label className="text-[11px] font-semibold text-[#363e2d] mb-1.5 block">
                  Nome do acompanhante
                </label>
                <Input
                  placeholder="Nome do acompanhante"
                  value={form.companionName}
                  onChange={(e) => h('companionName', e.target.value)}
                  className="h-9 text-xs rounded-none border-[#363e2d]/30 focus-visible:ring-[#6b7c5a]/30 bg-white text-[#363e2d] placeholder:text-[#363e2d]/40"
                />
              </motion.div>
            )}

            {/* Gift/Present Selection */}
            <div>
              <label className="text-[11px] font-semibold text-[#363e2d] mb-1.5 block">
                Sugestão de Presente
              </label>
              <Select value={form.gift} onValueChange={(v) => h('gift', v)}>
                <SelectTrigger className="h-9 text-xs rounded-none border-[#363e2d]/30 focus:ring-[#6b7c5a]/30 bg-white text-[#363e2d]">
                  <SelectValue placeholder="Selecione uma opção" />
                </SelectTrigger>
                <SelectContent className="rounded-none">
                  <SelectItem value="Pix/Transferência">Contribuição Financeira (Pix/IBAN)</SelectItem>
                  <SelectItem value="Presente Físico">Presente Físico</SelectItem>
                  <SelectItem value="Presença">Apenas presença (O melhor presente)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Message */}
            <div>
              <label className="text-[11px] font-semibold text-[#363e2d] mb-1.5 block">
                Mensagem para os noivos
              </label>
              <Textarea
                placeholder="Deixe uma mensagem especial (opcional)"
                value={form.message}
                onChange={(e) => h('message', e.target.value)}
                className="text-xs rounded-none border-[#363e2d]/30 focus-visible:ring-[#6b7c5a]/30 bg-white text-[#363e2d] placeholder:text-[#363e2d]/40 resize-none h-[72px]"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-[42px] bg-[#363e2d] hover:bg-[#2d3224] text-white text-[11px] font-bold tracking-[0.1em] uppercase rounded-none mt-2.5 flex items-center justify-center gap-1.5 transition-colors border-none"
            >
              {isSubmitting && <Loader2 className="w-3.5 h-3.5 animate-spin mr-1" />}
              {isSubmitting ? 'Confirmando...' : 'CONFIRMAR PRESENÇA'}
            </button>

            {/* Feedback Messages */}
            {submitStatus === 'success' && (
              <motion.div
                className="flex items-center gap-2 p-2.5 text-[10px] mt-2 font-bold"
                style={{
                  background: 'rgba(34,197,94,0.08)',
                  color: '#16a34a',
                  border: '1px solid rgba(34,197,94,0.15)',
                }}
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <span>Confirmação enviada com sucesso!</span>
              </motion.div>
            )}
            {submitStatus === 'error' && (
              <motion.div
                className="flex items-center gap-2 p-2.5 text-[10px] mt-2 font-bold"
                style={{
                  background: 'rgba(239,68,68,0.08)',
                  color: '#dc2626',
                  border: '1px solid rgba(239,68,68,0.15)',
                }}
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <span>{errorMessage}</span>
              </motion.div>
            )}
          </form>
        </div>

        {/* Card Footer */}
        <div className="w-full text-center text-white pb-2 select-none">
          <p 
            className="text-[13px] tracking-[0.1em] font-extrabold uppercase"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            AURISCIDIA & LUCIANO
          </p>
          <p 
            className="text-[9px] tracking-wider font-bold mt-1.5 opacity-80"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            26.07.2026
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
