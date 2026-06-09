'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Gift, Heart, Send, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

const presentList = [
  { name: 'Jogo de Toalhas', icon: '🏠', description: 'Toalhas de mesa em linho premium' },
  { name: 'Conjunto de Louça', icon: '🍽️', description: 'Serviço de mesa para 12 pessoas' },
  { name: ' Máquina de Café', icon: '☕', description: 'Máquina de café automática' },
  { name: 'Kit de Cozinha', icon: '👨‍🍳', description: 'Panelas e utensílios de cozinha' },
  { name: 'Voucher de Viagem', icon: '✈️', description: 'Contribuição para lua de mel' },
  { name: 'Voucher de Loja', icon: '🎁', description: 'Livre escolha do presente' },
];

interface Wish {
  id: string;
  name: string;
  message: string;
  createdAt: string;
}

export default function GiftSection() {
  const [selectedPresent, setSelectedPresent] = useState<string | null>(null);
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [wishForm, setWishForm] = useState({ name: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetch('/api/wishes')
      .then((res) => res.json())
      .then(setWishes)
      .catch(() => {});
  }, []);

  const handleWishSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!wishForm.name.trim() || !wishForm.message.trim()) return;
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/wishes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(wishForm),
      });
      if (res.ok) {
        const newWish = await res.json();
        setWishes((prev) => [newWish, ...prev]);
        setWishForm({ name: '', message: '' });
      }
    } catch {
      // silent error
    } finally {
      setIsSubmitting(false);
    }
  };

  const cardStyle = {
    background: 'rgba(255,255,255,0.6)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(212,175,55,0.15)',
  };

  return (
    <section id="presentes" className="relative py-20 sm:py-28 md:py-36">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-xs tracking-[0.3em] uppercase" style={{ color: '#d4af37' }}>
            Presentes
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-light tracking-wide" style={{ color: '#2c2c2c' }}>
            Lista de Presentes
          </h2>
          <div className="mx-auto mt-6 w-16 h-px" style={{ backgroundColor: '#d4af37' }} />
          <p className="mt-6 text-sm sm:text-base leading-relaxed max-w-lg mx-auto" style={{ color: '#5a5a5a' }}>
            A sua presença é o melhor presente. No entanto, se desejar nos presentear, preparamos esta sugestão com muito carinho.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {presentList.map((item, index) => (
            <motion.button
              key={item.name}
              className="text-left p-5 sm:p-6 rounded-xl transition-all duration-300 group"
              style={{
                ...cardStyle,
                boxShadow: selectedPresent === item.name ? '0 0 0 2px rgba(212,175,55,0.5)' : 'none',
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => setSelectedPresent(selectedPresent === item.name ? null : item.name)}
              whileHover={{ y: -2 }}
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl">{item.icon}</span>
                <div>
                  <h3 className="text-sm sm:text-base font-medium" style={{ color: '#2c2c2c' }}>
                    {item.name}
                  </h3>
                  <p className="mt-1 text-xs sm:text-sm" style={{ color: '#8a8a8a' }}>
                    {item.description}
                  </p>
                </div>
              </div>
              {selectedPresent === item.name && (
                <motion.div
                  className="mt-4 pt-3 flex items-center gap-2 text-xs"
                  style={{ borderTop: '1px solid rgba(212,175,55,0.15)', color: '#d4af37' }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <Heart className="w-3 h-3" fill="#d4af37" />
                  <span>Seleccionado</span>
                </motion.div>
              )}
            </motion.button>
          ))}
        </div>

        {/* Wishes section */}
        <motion.div
          className="mt-16 sm:mt-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-10">
            <Gift className="w-6 h-6 mx-auto mb-3" style={{ color: '#d4af37' }} />
            <h3 className="text-xl sm:text-2xl font-light tracking-wide" style={{ color: '#2c2c2c' }}>
              Deixe o Seu Desejo
            </h3>
            <p className="mt-2 text-sm" style={{ color: '#8a8a8a' }}>
              Escreva uma mensagem especial para o casal
            </p>
          </div>

          <form
            onSubmit={handleWishSubmit}
            className="max-w-lg mx-auto rounded-xl p-6 sm:p-8 space-y-4"
            style={cardStyle}
          >
            <div className="space-y-2">
              <Label htmlFor="wish-name" className="text-sm font-normal" style={{ color: '#4a4a4a' }}>
                Nome
              </Label>
              <Input
                id="wish-name"
                placeholder="O seu nome"
                value={wishForm.name}
                onChange={(e) => setWishForm((p) => ({ ...p, name: e.target.value }))}
                style={{ background: 'rgba(255,255,255,0.6)', border: '1px solid rgba(212,175,55,0.2)' }}
                className="focus-visible:ring-[#d4af37]/30"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="wish-message" className="text-sm font-normal" style={{ color: '#4a4a4a' }}>
                Mensagem
              </Label>
              <Textarea
                id="wish-message"
                placeholder="Parabéns ao casal!..."
                value={wishForm.message}
                onChange={(e) => setWishForm((p) => ({ ...p, message: e.target.value }))}
                style={{ background: 'rgba(255,255,255,0.6)', border: '1px solid rgba(212,175,55,0.2)' }}
                className="focus-visible:ring-[#d4af37]/30 resize-none"
                rows={3}
                required
              />
            </div>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 text-sm tracking-widest uppercase rounded-lg transition-all duration-300"
              style={{
                background: 'linear-gradient(135deg, #d4af37, #c9a02f)',
                color: '#fff',
                border: 'none',
              }}
            >
              {isSubmitting ? (
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
              ) : (
                <Send className="w-4 h-4 mr-2" />
              )}
              Enviar Desejo
            </Button>
          </form>

          {/* Wishes list */}
          {wishes.length > 0 && (
            <div className="mt-10 space-y-3 max-w-lg mx-auto">
              {wishes.slice(0, 5).map((wish) => (
                <motion.div
                  key={wish.id}
                  className="p-4 rounded-lg"
                  style={{
                    background: 'rgba(255,255,255,0.5)',
                    border: '1px solid rgba(212,175,55,0.1)',
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <p className="text-xs font-medium" style={{ color: '#d4af37' }}>{wish.name}</p>
                  <p className="mt-1 text-sm" style={{ color: '#5a5a5a' }}>{wish.message}</p>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
