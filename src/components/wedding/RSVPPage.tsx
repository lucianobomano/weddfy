import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertCircle, Loader2, Gift, Plane, Utensils, Compass, ChefHat, Flame, Coffee, Home, Bed, BookOpen, Music, Copy, Check } from 'lucide-react';
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
  onConfirmSuccess?: () => void;
}

export default function RSVPPage({ onBack, initialGuestName = '', onConfirmSuccess }: RSVPPageProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [showGiftDropdown, setShowGiftDropdown] = useState(false);
  const [showGiftsModal, setShowGiftsModal] = useState(false);
  const [copiedIBAN, setCopiedIBAN] = useState(false);

  const handleCopyIBAN = useCallback(() => {
    navigator.clipboard.writeText('AO06004000000459202410138');
    setCopiedIBAN(true);
    setTimeout(() => setCopiedIBAN(false), 2000);
  }, []);

  const [isConfirmedState, setIsConfirmedState] = useState(false);
  const [confirmedData, setConfirmedData] = useState<{
    name: string;
    companion: string;
    companionName: string;
    gift: string;
  } | null>(null);

  const [form, setForm] = useState<RSVPForm>({
    name: initialGuestName,
    email: '',
    companion: '',
    companionName: '',
    gift: '',
    message: '',
  });

  const giftSuggestions = [
    {
      id: '1',
      title: 'Cota para Passagens Aéreas',
      category: 'Lua de Mel',
      price: '150.000 AOA',
      icon: <Plane className="w-5 h-5 text-[#810100]" />
    },
    {
      id: '2',
      title: 'Jantar Romântico na Ilha de Luanda',
      category: 'Lua de Mel',
      price: '80.000 AOA',
      icon: <Utensils className="w-5 h-5 text-[#810100]" />
    },
    {
      id: '3',
      title: 'Passeio de Barco na Baía de Luanda',
      category: 'Lua de Mel',
      price: '50.000 AOA',
      icon: <Compass className="w-5 h-5 text-[#810100]" />
    },
    {
      id: '4',
      title: 'Micro-ondas Digital',
      category: 'Cozinha',
      price: '95.000 AOA',
      icon: <ChefHat className="w-5 h-5 text-[#810100]" />
    },
    {
      id: '5',
      title: 'Fritadeira sem Óleo (Airfryer)',
      category: 'Cozinha',
      price: '110.000 AOA',
      icon: <Flame className="w-5 h-5 text-[#810100]" />
    },
    {
      id: '6',
      title: 'Máquina de Café Delta Q',
      category: 'Cozinha',
      price: '85.000 AOA',
      icon: <Coffee className="w-5 h-5 text-[#810100]" />
    },
    {
      id: '7',
      title: 'Aparelho de Jantar (30 peças)',
      category: 'Cozinha',
      price: '75.000 AOA',
      icon: <Utensils className="w-5 h-5 text-[#810100]" />
    },
    {
      id: '8',
      title: 'Liquidificador de Alta Potência',
      category: 'Cozinha',
      price: '45.000 AOA',
      icon: <ChefHat className="w-5 h-5 text-[#810100]" />
    },
    {
      id: '9',
      title: 'Aspirador de Pó Vertical',
      category: 'Casa & Conforto',
      price: '70.000 AOA',
      icon: <Home className="w-5 h-5 text-[#810100]" />
    },
    {
      id: '10',
      title: 'Jogo de Lençóis 400 Fios',
      category: 'Casa & Conforto',
      price: '55.000 AOA',
      icon: <Bed className="w-5 h-5 text-[#810100]" />
    },
    {
      id: '11',
      title: 'Faqueiro de Aço Inox (24 peças)',
      category: 'Cozinha',
      price: '35.000 AOA',
      icon: <Utensils className="w-5 h-5 text-[#810100]" />
    },
    {
      id: '12',
      title: 'Soundbar Bluetooth',
      category: 'Sala de Estar',
      price: '120.000 AOA',
      icon: <Music className="w-5 h-5 text-[#810100]" />
    },
    {
      id: '13',
      title: 'Livros (Negócio, Design Gráfico e Arquitectura)',
      category: 'Livros',
      price: '7.250 AOA',
      icon: <BookOpen className="w-5 h-5 text-[#810100]" />
    }
  ];

  useEffect(() => {
    // Check saved status in localStorage
    if (typeof window !== 'undefined') {
      const savedConfirmed = localStorage.getItem('wedding_rsvp_confirmed');
      const savedData = localStorage.getItem('wedding_rsvp_data');
      if (savedConfirmed === 'true' && savedData) {
        try {
          const parsed = JSON.parse(savedData);
          setConfirmedData(parsed);
          setForm(prev => ({
            ...prev,
            name: parsed.name || prev.name,
            companion: parsed.companion || '',
            companionName: parsed.companionName || '',
            gift: parsed.gift || '',
          }));
          setIsConfirmedState(true);
        } catch (e) {
          console.error('Error parsing stored RSVP data:', e);
        }
      }
    }

    if (!initialGuestName) return;

    const checkGuest = async () => {
      try {
        const res = await fetch(`/api/rsvp/check?name=${encodeURIComponent(initialGuestName)}`);
        if (!res.ok) return;
        const data = await res.json();
        if (data.found) {
          setForm(p => ({
            ...p,
            name: data.name || p.name,
            email: data.email || '',
            companion: data.companion,
            companionName: data.companionName || '',
          }));
          if (data.confirmed) {
            const conf = {
              name: data.name || initialGuestName,
              companion: data.companion || 'no',
              companionName: data.companionName || '',
              gift: data.gift || 'Apenas presença',
            };
            setConfirmedData(conf);
            setIsConfirmedState(true);
          }
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
      const submissionForm = { ...form };
      if (!submissionForm.email) {
        const normalized = form.name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim().toLowerCase().replace(/\s+/g, '-');
        submissionForm.email = `${normalized || 'guest'}-${Math.random().toString(36).substring(2, 9)}@confirmado.com`;
      }

      const res = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submissionForm),
      });
      const data = await res.json();
      if (!res.ok) {
        setSubmitStatus('error');
        setErrorMessage(data.error || 'Erro ao enviar.');
        return;
      }

      const confInfo = {
        name: form.name.trim(),
        companion: form.companion || 'no',
        companionName: form.companionName.trim(),
        gift: form.gift || (showGiftDropdown ? 'A definir' : 'Apenas presença'),
      };

      if (typeof window !== 'undefined') {
        localStorage.setItem('wedding_rsvp_confirmed', 'true');
        localStorage.setItem('wedding_rsvp_guest_name', form.name.trim());
        localStorage.setItem('wedding_rsvp_data', JSON.stringify(confInfo));
      }

      setConfirmedData(confInfo);
      setIsConfirmedState(true);
      setSubmitStatus('success');
      if (onConfirmSuccess) onConfirmSuccess();
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
        className="fixed top-4 left-4 z-50 w-9 h-9 rounded-full flex items-center justify-center bg-[#FAFAF9] shadow-md border border-[#e0e0e0] transition-colors hover:bg-gray-50 animate-fade-in"
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
        className="w-full max-w-[350px] min-h-[720px] bg-[#810100] flex flex-col justify-between py-9 px-5 relative overflow-hidden shadow-lg border-[6px] border-[#FAFAF9]/25"
        style={{
          backgroundColor: '#810100',
        }}
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        {/* Top Header */}
        <div className="w-full text-center text-[#FAFAF9] pt-2 select-none">
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

        {/* Form Card or Confirmed Card */}
        {isConfirmedState && confirmedData ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35 }}
            className="w-full bg-[#FAFAF9] px-5 py-7 my-5 shadow-md flex flex-col items-center select-none text-center"
          >
            <div className="w-14 h-14 rounded-full bg-[#810100]/10 flex items-center justify-center mb-3 border border-[#810100]/25 shadow-inner">
              <CheckCircle className="w-8 h-8 text-[#810100]" />
            </div>

            <span className="text-[10px] tracking-[0.25em] font-bold text-[#810100]/70 uppercase mb-1">
              Confirmação Registada
            </span>
            <h3
              className="text-[17px] font-extrabold text-[#810100] uppercase tracking-wide leading-tight mb-2"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              PRESENÇA CONFIRMADA!
            </h3>

            <p
              className="text-[11.5px] leading-relaxed text-[#810100]/80 font-medium mb-4 max-w-[270px]"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              Muito obrigado, <strong className="text-[#810100] font-bold">{confirmedData.name}</strong>! O seu lugar está reservado com muito carinho.
            </p>

            {/* Summary Ticket */}
            <div className="w-full bg-[#810100]/5 border border-[#810100]/15 p-3.5 space-y-2.5 text-left mb-5 text-[11px] text-[#810100]">
              <div className="flex justify-between items-center border-b border-[#810100]/10 pb-1.5">
                <span className="text-[10px] uppercase font-bold text-[#810100]/70">Convidado</span>
                <span className="font-bold truncate max-w-[150px]">{confirmedData.name}</span>
              </div>
              <div className="flex justify-between items-center border-b border-[#810100]/10 pb-1.5">
                <span className="text-[10px] uppercase font-bold text-[#810100]/70">Acompanhante</span>
                <span className="font-semibold truncate max-w-[150px]">
                  {confirmedData.companion === 'yes'
                    ? (confirmedData.companionName ? `Sim (${confirmedData.companionName})` : 'Sim (1 pessoa)')
                    : 'Apenas você'}
                </span>
              </div>
              <div className="flex justify-between items-center border-b border-[#810100]/10 pb-1.5">
                <span className="text-[10px] uppercase font-bold text-[#810100]/70">Presente</span>
                <span className="font-semibold truncate max-w-[150px]">{confirmedData.gift || 'Apenas presença'}</span>
              </div>
              <div className="flex justify-between items-center pt-0.5">
                <span className="text-[10px] uppercase font-bold text-[#810100]/70">Data</span>
                <span className="font-bold">16 de Outubro de 2026</span>
              </div>
            </div>

            <button
              type="button"
              onClick={onBack}
              className="w-full h-[42px] bg-[#810100] hover:bg-[#5a0000] text-[#FAFAF9] text-[11px] font-bold tracking-[0.1em] uppercase transition-colors shadow-sm cursor-pointer flex items-center justify-center gap-1.5"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              VOLTAR AO CONVITE
            </button>

            <button
              type="button"
              onClick={() => setIsConfirmedState(false)}
              className="mt-3.5 text-[10px] font-semibold text-[#810100]/70 hover:text-[#810100] underline tracking-wider cursor-pointer"
            >
              Alterar dados da confirmação
            </button>
          </motion.div>
        ) : (
          <div className="w-full bg-[#FAFAF9] px-5 py-6 my-5 shadow-md flex flex-col select-none">
            <p
              className="text-center text-[11px] leading-relaxed mb-5 font-bold text-[#810100]"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              Preencha o formulário abaixo para confirmar a sua presença no nosso casamento
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Nome Completo */}
              <div>
                <label className="text-[11px] font-semibold text-[#810100] mb-1.5 block">
                  Nome completo
                </label>
                <Input
                  placeholder="Maria Eduarda"
                  required
                  value={form.name}
                  onChange={(e) => h('name', e.target.value)}
                  className="h-9 text-xs rounded-none border-[#810100]/30 focus-visible:ring-[#810100]/30 bg-[#FAFAF9] text-[#810100] placeholder:text-[#810100]/40"
                />
              </div>


              {/* Acompanhante Dropdown */}
              <div>
                <label className="text-[11px] font-semibold text-[#810100] mb-1.5 block">
                  Acompanhante
                </label>
                <Select value={form.companion} onValueChange={(v) => h('companion', v)}>
                  <SelectTrigger className="h-9 text-xs rounded-none border-[#810100]/30 focus:ring-[#810100]/30 bg-[#FAFAF9] text-[#810100]">
                    <SelectValue placeholder="Vai com acompanhante" />
                  </SelectTrigger>
                  <SelectContent className="rounded-none bg-[#FAFAF9]">
                    <SelectItem value="yes">Sim</SelectItem>
                    <SelectItem value="no">Não</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Optional Companion Name */}
              {form.companion === 'yes' && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="pt-1">
                  <label className="text-[11px] font-semibold text-[#810100] mb-1.5 block">
                    Nome do acompanhante
                  </label>
                  <Input
                    placeholder="Nome do acompanhante"
                    value={form.companionName}
                    onChange={(e) => h('companionName', e.target.value)}
                    className="h-9 text-xs rounded-none border-[#810100]/30 focus-visible:ring-[#810100]/30 bg-[#FAFAF9] text-[#810100] placeholder:text-[#810100]/40"
                  />
                </motion.div>
              )}

              {/* Deseja nos presentear? Radio Buttons */}
              <div>
                <label className="text-[11px] font-semibold text-[#810100] mb-1.5 block">
                  Gostaria de escolher uma sugestão de presente?
                </label>
                <div className="flex gap-6 mt-1 mb-2">
                  <label className="flex items-center gap-2 text-xs text-[#810100] cursor-pointer font-medium">
                    <input
                      type="radio"
                      name="wantsGift"
                      value="yes"
                      checked={showGiftDropdown === true}
                      onChange={() => {
                        setShowGiftDropdown(true);
                        h('gift', '');
                      }}
                      className="w-3.5 h-3.5 accent-[#810100]"
                    />
                    Sim
                  </label>
                  <label className="flex items-center gap-2 text-xs text-[#810100] cursor-pointer font-medium">
                    <input
                      type="radio"
                      name="wantsGift"
                      value="no"
                      checked={showGiftDropdown === false}
                      onChange={() => {
                        setShowGiftDropdown(false);
                        h('gift', 'Presença');
                      }}
                      className="w-3.5 h-3.5 accent-[#810100]"
                    />
                    Não
                  </label>
                </div>
              </div>

              {/* Gift/Present Selection (Hidden by default) */}
              {showGiftDropdown && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }} 
                  animate={{ opacity: 1, height: 'auto' }} 
                  className="space-y-3"
                >
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-semibold text-[#810100] block">
                      Sugestão de Presente
                    </label>
                    <div className="flex gap-2 items-center">
                      <div className="flex-1">
                        <Input
                          type="text"
                          placeholder="Clique para selecionar uma sugestão..."
                          readOnly
                          value={form.gift}
                          onClick={() => setShowGiftsModal(true)}
                          className="h-9 text-xs rounded-none border-[#810100]/30 focus-visible:ring-[#810100]/30 bg-[#FAFAF9] text-[#810100] placeholder:text-[#810100]/40 cursor-pointer"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => setShowGiftsModal(true)}
                        className="h-9 px-3 bg-[#810100] hover:bg-[#810100] text-[#FAFAF9] flex items-center justify-center transition-colors shadow-sm flex-shrink-0"
                        title="Ver todas as sugestões"
                      >
                        <Gift className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Coordenadas Bancárias */}
                  <div className="bg-[#FAFAF9] p-3 border border-[#810100]/15 space-y-2 rounded-none text-left">
                    <div className="flex justify-between text-[10px] font-semibold text-[#810100]">
                      <span>Banco:</span>
                      <span className="font-bold">Banco Angolano de Investimentos (BAI)</span>
                    </div>
                    <div className="flex justify-between text-[10px] font-semibold text-[#810100]">
                      <span>Titular:</span>
                      <span className="font-bold">Osvaldo da Silva & Mirian Gumbe</span>
                    </div>
                    <div className="flex justify-between text-[10px] font-semibold text-[#810100]">
                      <span>Express:</span>
                      <span className="font-bold">+244931931304</span>
                    </div>
                    <div className="flex flex-col gap-1 text-[10px] font-semibold text-[#810100] pt-1.5 border-t border-[#810100]/10">
                      <span>IBAN (Angola):</span>
                      <div className="flex items-center justify-between gap-2 bg-[#FAFAF9] border border-[#810100]/20 p-2 rounded-none select-all font-mono text-[9px]">
                        <span>AO06 0040 0000 0459 2024 1013 8</span>
                        <button
                          type="button"
                          onClick={handleCopyIBAN}
                          className="p-1 text-[#810100] hover:bg-[#810100]/10 rounded-full transition-colors flex-shrink-0"
                          title="Copiar IBAN"
                        >
                          {copiedIBAN ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Message */}
              <div>
                <label className="text-[11px] font-semibold text-[#810100] mb-1.5 block">
                  Mensagem para os noivos
                </label>
                <Textarea
                  placeholder="Deixe uma mensagem especial (opcional)"
                  value={form.message}
                  onChange={(e) => h('message', e.target.value)}
                  className="text-xs rounded-none border-[#810100]/30 focus-visible:ring-[#810100]/30 bg-[#FAFAF9] text-[#810100] placeholder:text-[#810100]/40 resize-none h-[72px]"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-[42px] bg-[#810100] hover:bg-[#5a0000] text-[#FAFAF9] text-[11px] font-bold tracking-[0.1em] uppercase rounded-none mt-2.5 flex items-center justify-center gap-1.5 transition-colors border-none cursor-pointer"
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
        )}

        {/* Card Footer */}
        <div className="w-full text-center text-[#FAFAF9] pb-2 select-none">
          <p 
            className="text-[13px] tracking-[0.1em] font-extrabold uppercase"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            OSVALDO & MIRIAN
          </p>
          <p 
            className="text-[9px] tracking-wider font-bold mt-1.5 opacity-80"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            16.10.2026
          </p>
        </div>
      </motion.div>

      {/* Modal with Gift Suggestions */}
      <AnimatePresence>
        {showGiftsModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#FAFAF9] border-[6px] border-[#FAFAF9]/20 shadow-xl max-w-sm w-full max-h-[85vh] flex flex-col p-5 relative overflow-hidden"
            >
              <h3 className="text-sm font-bold uppercase text-[#810100] tracking-wider mb-2.5 text-center">
                Sugestões de Presentes
              </h3>
              <p className="text-[11px] text-[#810100]/70 text-center mb-4">
                Selecione uma das opções abaixo para preencher o formulário:
              </p>
              
              <div className="overflow-y-auto flex-1 pr-1 space-y-2 max-h-[50vh]">
                {/* Generic options */}
                <div
                  onClick={() => {
                    h('gift', 'Contribuição Financeira (Pix/IBAN)');
                    setShowGiftsModal(false);
                  }}
                  className="p-2.5 bg-[#FAFAF9] hover:bg-[#810100]/10 border border-[#810100]/10 hover:border-[#810100]/30 cursor-pointer transition-all flex items-center gap-3 active:scale-[0.99]"
                >
                  <div className="p-1.5 bg-[#810100]/10 rounded-full flex-shrink-0">
                    <Gift className="w-4 h-4 text-[#810100]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-semibold text-[#810100]">Contribuição Financeira (Pix/IBAN)</p>
                    <p className="text-[9px] text-[#810100]/60">Qualquer valor via transferência ou depósito</p>
                  </div>
                </div>

                <div
                  onClick={() => {
                    h('gift', 'Outro Presente Físico');
                    setShowGiftsModal(false);
                  }}
                  className="p-2.5 bg-[#FAFAF9] hover:bg-[#810100]/10 border border-[#810100]/10 hover:border-[#810100]/30 cursor-pointer transition-all flex items-center gap-3 active:scale-[0.99]"
                >
                  <div className="p-1.5 bg-[#810100]/10 rounded-full flex-shrink-0">
                    <Gift className="w-4 h-4 text-[#810100]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-semibold text-[#810100]">Outro Presente Físico</p>
                    <p className="text-[9px] text-[#810100]/60">Sugira ou ofereça outro presente físico</p>
                  </div>
                </div>

                <div
                  onClick={() => {
                    h('gift', 'Apenas presença (O melhor presente)');
                    setShowGiftsModal(false);
                  }}
                  className="p-2.5 bg-[#FAFAF9] hover:bg-[#810100]/10 border border-[#810100]/10 hover:border-[#810100]/30 cursor-pointer transition-all flex items-center gap-3 active:scale-[0.99]"
                >
                  <div className="p-1.5 bg-[#810100]/10 rounded-full flex-shrink-0">
                    <CheckCircle className="w-4 h-4 text-[#810100]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-semibold text-[#810100]">Apenas presença</p>
                    <p className="text-[9px] text-[#810100]/60">O melhor presente é ter a sua companhia</p>
                  </div>
                </div>

                <div className="border-t border-[#810100]/10 my-2 pt-2">
                  <p className="text-[9px] font-bold text-[#810100]/60 uppercase tracking-wider mb-2">Sugestões de Presentes:</p>
                </div>

                {giftSuggestions.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      h('gift', item.title);
                      setShowGiftsModal(false);
                    }}
                    className="p-2.5 bg-[#FAFAF9] hover:bg-[#810100]/10 border border-[#810100]/10 hover:border-[#810100]/30 cursor-pointer transition-all flex items-center gap-3 active:scale-[0.99]"
                  >
                    <div className="p-1.5 bg-[#810100]/10 rounded-full flex-shrink-0">
                      {item.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] font-semibold text-[#810100] truncate">{item.title}</p>
                      <p className="text-[9px] text-[#810100]/60">{item.category} • {item.price}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <button
                type="button"
                onClick={() => setShowGiftsModal(false)}
                className="mt-4 w-full py-2 bg-[#810100] hover:bg-[#5a0000] text-[#FAFAF9] text-[11px] font-bold tracking-[0.1em] uppercase transition-colors"
              >
                Fechar
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
