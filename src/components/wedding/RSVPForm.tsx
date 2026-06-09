'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

interface RSVPForm {
  name: string;
  email: string;
  phone: string;
  companion: string;
  companionName: string;
  mealPreference: string;
  dietaryNeeds: string;
  message: string;
}

export default function RSVPSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [form, setForm] = useState<RSVPForm>({
    name: '',
    email: '',
    phone: '',
    companion: '',
    companionName: '',
    mealPreference: '',
    dietaryNeeds: '',
    message: '',
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
        setErrorMessage(data.error || 'Erro ao enviar RSVP.');
        return;
      }

      setSubmitStatus('success');
      setForm({
        name: '',
        email: '',
        phone: '',
        companion: '',
        companionName: '',
        mealPreference: '',
        dietaryNeeds: '',
        message: '',
      });
    } catch {
      setSubmitStatus('error');
      setErrorMessage('Erro de conexão. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputStyle = {
    background: 'rgba(255,255,255,0.6)',
    border: '1px solid rgba(212,175,55,0.2)',
  };

  return (
    <section id="rsvp" className="relative py-20 sm:py-28 md:py-36">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-xs tracking-[0.3em] uppercase" style={{ color: '#d4af37' }}>
            Confirmação
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-light tracking-wide" style={{ color: '#2c2c2c' }}>
            RSVP
          </h2>
          <div className="mx-auto mt-6 w-16 h-px" style={{ backgroundColor: '#d4af37' }} />
          <p className="mt-6 text-sm sm:text-base leading-relaxed max-w-lg mx-auto" style={{ color: '#5a5a5a' }}>
            Confirme a sua presença até 30 de Agosto de 2026. A sua resposta é muito importante para nós organizarmos este dia especial.
          </p>
        </motion.div>

        <motion.div
          className="rounded-xl overflow-hidden"
          style={{
            background: 'rgba(255,255,255,0.7)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(212,175,55,0.15)',
          }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-normal" style={{ color: '#4a4a4a' }}>
                Nome Completo <span style={{ color: '#d4af37' }}>*</span>
              </Label>
              <Input
                id="name"
                placeholder="O seu nome"
                required
                value={form.name}
                onChange={(e) => handleChange('name', e.target.value)}
                style={inputStyle}
                className="focus-visible:ring-[#d4af37]/30"
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-normal" style={{ color: '#4a4a4a' }}>
                Email <span style={{ color: '#d4af37' }}>*</span>
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="seuemail@exemplo.com"
                required
                value={form.email}
                onChange={(e) => handleChange('email', e.target.value)}
                style={inputStyle}
                className="focus-visible:ring-[#d4af37]/30"
              />
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm font-normal" style={{ color: '#4a4a4a' }}>
                Telefone
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+244 9XX XXX XXX"
                value={form.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                style={inputStyle}
                className="focus-visible:ring-[#d4af37]/30"
              />
            </div>

            {/* Companion */}
            <div className="space-y-2">
              <Label htmlFor="companion" className="text-sm font-normal" style={{ color: '#4a4a4a' }}>
                Acompanhante
              </Label>
              <Select value={form.companion} onValueChange={(v) => handleChange('companion', v)}>
                <SelectTrigger id="companion" style={inputStyle} className="focus:ring-[#d4af37]/30">
                  <SelectValue placeholder="Irá com acompanhante?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="yes">Sim</SelectItem>
                  <SelectItem value="no">Não</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {form.companion === 'yes' && (
              <motion.div
                className="space-y-2"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                <Label htmlFor="companionName" className="text-sm font-normal" style={{ color: '#4a4a4a' }}>
                  Nome do Acompanhante
                </Label>
                <Input
                  id="companionName"
                  placeholder="Nome do acompanhante"
                  value={form.companionName}
                  onChange={(e) => handleChange('companionName', e.target.value)}
                  style={inputStyle}
                  className="focus-visible:ring-[#d4af37]/30"
                />
              </motion.div>
            )}

            {/* Meal preference */}
            <div className="space-y-2">
              <Label htmlFor="meal" className="text-sm font-normal" style={{ color: '#4a4a4a' }}>
                Preferência Alimentar
              </Label>
              <Select value={form.mealPreference} onValueChange={(v) => handleChange('mealPreference', v)}>
                <SelectTrigger id="meal" style={inputStyle} className="focus:ring-[#d4af37]/30">
                  <SelectValue placeholder="Selecionar" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="meat">Carne</SelectItem>
                  <SelectItem value="fish">Peixe</SelectItem>
                  <SelectItem value="vegetarian">Vegetariano</SelectItem>
                  <SelectItem value="vegan">Vegano</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Dietary needs */}
            <div className="space-y-2">
              <Label htmlFor="dietary" className="text-sm font-normal" style={{ color: '#4a4a4a' }}>
                Restrições Alimentares
              </Label>
              <Textarea
                id="dietary"
                placeholder="Alergias ou restrições alimentares..."
                value={form.dietaryNeeds}
                onChange={(e) => handleChange('dietaryNeeds', e.target.value)}
                style={inputStyle}
                className="focus-visible:ring-[#d4af37]/30 resize-none"
                rows={2}
              />
            </div>

            {/* Message */}
            <div className="space-y-2">
              <Label htmlFor="message" className="text-sm font-normal" style={{ color: '#4a4a4a' }}>
                Mensagem para o Casal
              </Label>
              <Textarea
                id="message"
                placeholder="Deixe uma mensagem especial para nós..."
                value={form.message}
                onChange={(e) => handleChange('message', e.target.value)}
                style={inputStyle}
                className="focus-visible:ring-[#d4af37]/30 resize-none"
                rows={3}
              />
            </div>

            {/* Submit */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 text-sm tracking-widest uppercase rounded-lg transition-all duration-300 hover:shadow-lg"
              style={{
                background: 'linear-gradient(135deg, #d4af37, #c9a02f)',
                color: '#fff',
                border: 'none',
              }}
            >
              {isSubmitting ? (
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
              ) : (
                <Heart className="w-4 h-4 mr-2" />
              )}
              {isSubmitting ? 'A enviar...' : 'Confirmar Presença'}
            </Button>

            <AnimatePresence>
              {submitStatus === 'success' && (
                <motion.div
                  className="flex items-center gap-2 p-3 rounded-lg text-sm"
                  style={{ background: 'rgba(34,197,94,0.1)', color: '#16a34a', border: '1px solid rgba(34,197,94,0.2)' }}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <CheckCircle className="w-4 h-4 flex-shrink-0" />
                  <span>Obrigado! A sua confirmação foi registada com sucesso.</span>
                </motion.div>
              )}
              {submitStatus === 'error' && (
                <motion.div
                  className="flex items-center gap-2 p-3 rounded-lg text-sm"
                  style={{ background: 'rgba(239,68,68,0.1)', color: '#dc2626', border: '1px solid rgba(239,68,68,0.2)' }}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{errorMessage}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
