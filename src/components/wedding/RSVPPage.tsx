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
      icon: <Plane className="w-5 h-5 text-[#6b7c5a]" />
    },
    {
      id: '2',
      title: 'Jantar Romântico na Ilha de Luanda',
      category: 'Lua de Mel',
      price: '80.000 AOA',
      icon: <Utensils className="w-5 h-5 text-[#6b7c5a]" />
    },
    {
      id: '3',
      title: 'Passeio de Barco na Baía de Luanda',
      category: 'Lua de Mel',
      price: '50.000 AOA',
      icon: <Compass className="w-5 h-5 text-[#6b7c5a]" />
    },
    {
      id: '4',
      title: 'Micro-ondas Digital',
      category: 'Cozinha',
      price: '95.000 AOA',
      icon: <ChefHat className="w-5 h-5 text-[#6b7c5a]" />
    },
    {
      id: '5',
      title: 'Fritadeira sem Óleo (Airfryer)',
      category: 'Cozinha',
      price: '110.000 AOA',
      icon: <Flame className="w-5 h-5 text-[#6b7c5a]" />
    },
    {
      id: '6',
      title: 'Máquina de Café Delta Q',
      category: 'Cozinha',
      price: '85.000 AOA',
      icon: <Coffee className="w-5 h-5 text-[#6b7c5a]" />
    },
    {
      id: '7',
      title: 'Aparelho de Jantar (30 peças)',
      category: 'Cozinha',
      price: '75.000 AOA',
      icon: <Utensils className="w-5 h-5 text-[#6b7c5a]" />
    },
    {
      id: '8',
      title: 'Liquidificador de Alta Potência',
      category: 'Cozinha',
      price: '45.000 AOA',
      icon: <ChefHat className="w-5 h-5 text-[#6b7c5a]" />
    },
    {
      id: '9',
      title: 'Aspirador de Pó Vertical',
      category: 'Casa & Conforto',
      price: '70.000 AOA',
      icon: <Home className="w-5 h-5 text-[#6b7c5a]" />
    },
    {
      id: '10',
      title: 'Jogo de Lençóis 400 Fios',
      category: 'Casa & Conforto',
      price: '55.000 AOA',
      icon: <Bed className="w-5 h-5 text-[#6b7c5a]" />
    },
    {
      id: '11',
      title: 'Faqueiro de Aço Inox (24 peças)',
      category: 'Cozinha',
      price: '35.000 AOA',
      icon: <Utensils className="w-5 h-5 text-[#6b7c5a]" />
    },
    {
      id: '12',
      title: 'Soundbar Bluetooth',
      category: 'Sala de Estar',
      price: '120.000 AOA',
      icon: <Music className="w-5 h-5 text-[#6b7c5a]" />
    },
    {
      id: '13',
      title: 'Livros (Negócio, Design Gráfico e Arquitectura)',
      category: 'Livros',
      price: '7.250 AOA',
      icon: <BookOpen className="w-5 h-5 text-[#6b7c5a]" />
    }
  ];

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
            name: data.name || p.name,
            email: data.email || '',
            companion: data.companion,
            companionName: data.companionName || '',
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
      setSubmitStatus('success');
      setForm({ name: '', email: '', companion: '', companionName: '', gift: '', message: '' });
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

            {/* Deseja nos presentear? Radio Buttons */}
            <div>
              <label className="text-[11px] font-semibold text-[#363e2d] mb-1.5 block">
                Gostaria de escolher uma sugestão de presente?
              </label>
              <div className="flex gap-6 mt-1 mb-2">
                <label className="flex items-center gap-2 text-xs text-[#363e2d] cursor-pointer font-medium">
                  <input
                    type="radio"
                    name="wantsGift"
                    value="yes"
                    checked={showGiftDropdown === true}
                    onChange={() => {
                      setShowGiftDropdown(true);
                      h('gift', '');
                    }}
                    className="w-3.5 h-3.5 accent-[#6b7c5a]"
                  />
                  Sim
                </label>
                <label className="flex items-center gap-2 text-xs text-[#363e2d] cursor-pointer font-medium">
                  <input
                    type="radio"
                    name="wantsGift"
                    value="no"
                    checked={showGiftDropdown === false}
                    onChange={() => {
                      setShowGiftDropdown(false);
                      h('gift', 'Presença');
                    }}
                    className="w-3.5 h-3.5 accent-[#6b7c5a]"
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
                  <label className="text-[11px] font-semibold text-[#363e2d] block">
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
                        className="h-9 text-xs rounded-none border-[#363e2d]/30 focus-visible:ring-[#6b7c5a]/30 bg-white text-[#363e2d] placeholder:text-[#363e2d]/40 cursor-pointer"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowGiftsModal(true)}
                      className="h-9 px-3 bg-[#6b7c5a] hover:bg-[#586749] text-white flex items-center justify-center transition-colors shadow-sm flex-shrink-0"
                      title="Ver todas as sugestões"
                    >
                      <Gift className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Coordenadas Bancárias */}
                <div className="bg-[#f5f2ed] p-3 border border-[#6b7c5a]/15 space-y-2 rounded-none text-left">
                  <div className="flex justify-between text-[10px] font-semibold text-gray-700">
                    <span>Banco:</span>
                    <span className="font-bold">Banco Angolano de Investimentos (BAI)</span>
                  </div>
                  <div className="flex justify-between text-[10px] font-semibold text-gray-700">
                    <span>Titular:</span>
                    <span className="font-bold">Auriscidia Tatiana Sicato Lopes</span>
                  </div>
                  <div className="flex justify-between text-[10px] font-semibold text-gray-700">
                    <span>Express:</span>
                    <span className="font-bold">+244931931304</span>
                  </div>
                  <div className="flex flex-col gap-1 text-[10px] font-semibold text-gray-700 pt-1.5 border-t border-[#6b7c5a]/10">
                    <span>IBAN (Angola):</span>
                    <div className="flex items-center justify-between gap-2 bg-white border border-[#6b7c5a]/20 p-2 rounded-none select-all font-mono text-[9px]">
                      <span>AO06 0040 0000 0459 2024 1013 8</span>
                      <button
                        type="button"
                        onClick={handleCopyIBAN}
                        className="p-1 text-[#6b7c5a] hover:bg-[#6b7c5a]/10 rounded-full transition-colors flex-shrink-0"
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

      {/* Modal with Gift Suggestions */}
      <AnimatePresence>
        {showGiftsModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#f5f2ed] border-[6px] border-white/20 shadow-xl max-w-sm w-full max-h-[85vh] flex flex-col p-5 relative overflow-hidden"
            >
              <h3 className="text-sm font-bold uppercase text-[#363e2d] tracking-wider mb-2.5 text-center">
                Sugestões de Presentes
              </h3>
              <p className="text-[11px] text-[#363e2d]/70 text-center mb-4">
                Selecione uma das opções abaixo para preencher o formulário:
              </p>
              
              <div className="overflow-y-auto flex-1 pr-1 space-y-2 max-h-[50vh]">
                {/* Generic options */}
                <div
                  onClick={() => {
                    h('gift', 'Contribuição Financeira (Pix/IBAN)');
                    setShowGiftsModal(false);
                  }}
                  className="p-2.5 bg-white hover:bg-[#6b7c5a]/10 border border-[#363e2d]/10 hover:border-[#6b7c5a]/30 cursor-pointer transition-all flex items-center gap-3 active:scale-[0.99]"
                >
                  <div className="p-1.5 bg-[#6b7c5a]/10 rounded-full flex-shrink-0">
                    <Gift className="w-4 h-4 text-[#6b7c5a]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-semibold text-[#363e2d]">Contribuição Financeira (Pix/IBAN)</p>
                    <p className="text-[9px] text-gray-500">Qualquer valor via transferência ou depósito</p>
                  </div>
                </div>

                <div
                  onClick={() => {
                    h('gift', 'Outro Presente Físico');
                    setShowGiftsModal(false);
                  }}
                  className="p-2.5 bg-white hover:bg-[#6b7c5a]/10 border border-[#363e2d]/10 hover:border-[#6b7c5a]/30 cursor-pointer transition-all flex items-center gap-3 active:scale-[0.99]"
                >
                  <div className="p-1.5 bg-[#6b7c5a]/10 rounded-full flex-shrink-0">
                    <Gift className="w-4 h-4 text-[#6b7c5a]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-semibold text-[#363e2d]">Outro Presente Físico</p>
                    <p className="text-[9px] text-gray-500">Sugira ou ofereça outro presente físico</p>
                  </div>
                </div>

                <div
                  onClick={() => {
                    h('gift', 'Apenas presença (O melhor presente)');
                    setShowGiftsModal(false);
                  }}
                  className="p-2.5 bg-white hover:bg-[#6b7c5a]/10 border border-[#363e2d]/10 hover:border-[#6b7c5a]/30 cursor-pointer transition-all flex items-center gap-3 active:scale-[0.99]"
                >
                  <div className="p-1.5 bg-[#6b7c5a]/10 rounded-full flex-shrink-0">
                    <CheckCircle className="w-4 h-4 text-[#6b7c5a]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-semibold text-[#363e2d]">Apenas presença</p>
                    <p className="text-[9px] text-gray-500">O melhor presente é ter a sua companhia</p>
                  </div>
                </div>

                <div className="border-t border-[#363e2d]/10 my-2 pt-2">
                  <p className="text-[9px] font-bold text-[#363e2d]/60 uppercase tracking-wider mb-2">Sugestões de Presentes:</p>
                </div>

                {giftSuggestions.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      h('gift', item.title);
                      setShowGiftsModal(false);
                    }}
                    className="p-2.5 bg-white hover:bg-[#6b7c5a]/10 border border-[#363e2d]/10 hover:border-[#6b7c5a]/30 cursor-pointer transition-all flex items-center gap-3 active:scale-[0.99]"
                  >
                    <div className="p-1.5 bg-[#6b7c5a]/10 rounded-full flex-shrink-0">
                      {item.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] font-semibold text-[#363e2d] truncate">{item.title}</p>
                      <p className="text-[9px] text-gray-500">{item.category} • {item.price}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <button
                type="button"
                onClick={() => setShowGiftsModal(false)}
                className="mt-4 w-full py-2 bg-[#363e2d] hover:bg-[#2d3224] text-white text-[11px] font-bold tracking-[0.1em] uppercase transition-colors"
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
