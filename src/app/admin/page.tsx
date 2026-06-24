'use client';

import { useState, useEffect } from 'react';
import { 
  Users, 
  Gift, 
  Trash2, 
  Copy, 
  Check, 
  Lock, 
  RefreshCw, 
  Download, 
  Heart,
  MessageSquare,
  Plus,
  ExternalLink
} from 'lucide-react';

interface RSVP {
  id: string;
  name: string;
  email: string;
  phone?: string;
  companion?: string;
  companionName?: string;
  mealPreference?: string;
  dietaryNeeds?: string;
  attending: boolean;
  gift?: string;
  relationship?: string;
  message?: string;
  createdAt: string;
}

interface Wish {
  id: string;
  name: string;
  message: string;
  createdAt: string;
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pin, setPin] = useState('');
  const [pinError, setPinError] = useState(false);

  const [rsvps, setRsvps] = useState<RSVP[]>([]);
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Link Generator state
  const [guestNameInput, setGuestNameInput] = useState('');
  const [generatedLink, setGeneratedLink] = useState('');
  const [copied, setCopied] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Search/Filter state
  const [searchQuery, setSearchQuery] = useState('');

  // Add Guest Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [addFormName, setAddFormName] = useState('');
  const [addFormCompanion, setAddFormCompanion] = useState('no');
  const [addFormCompanionName, setAddFormCompanionName] = useState('');
  const [addFormRelationship, setAddFormRelationship] = useState('');
  const [addFormSubmitting, setAddFormSubmitting] = useState(false);
  const [addFormError, setAddFormError] = useState('');

  const closeAddModal = () => {
    setIsAddModalOpen(false);
    setAddFormName('');
    setAddFormCompanion('no');
    setAddFormCompanionName('');
    setAddFormRelationship('');
    setAddFormError('');
  };

  const handleAddGuestSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAddFormSubmitting(true);
    setAddFormError('');

    // Generate dummy email for manual registration
    const emailToSubmit = `manual-${Math.random().toString(36).substring(2, 9)}@casamento.com`;

    // Companion name defaults to "[Guest name] e Acompanhante" if companion is yes and field is blank
    let companionNameToSubmit = '';
    if (addFormCompanion === 'yes') {
      companionNameToSubmit = addFormCompanionName.trim() || `${addFormName.trim()} e Acompanhante`;
    }

    try {
      const res = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: addFormName,
          email: emailToSubmit,
          attending: false,
          companion: addFormCompanion,
          companionName: companionNameToSubmit,
          relationship: addFormRelationship || null,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Erro ao guardar convidado.');
      }

      closeAddModal();
      fetchData();
    } catch (err: unknown) {
      setAddFormError(err instanceof Error ? err.message : 'Erro interno.');
    } finally {
      setAddFormSubmitting(false);
    }
  };

  // Handle Authentication
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Default PIN: noivos2026
    if (pin === 'noivos2026') {
      setIsAuthenticated(true);
      setPinError(false);
      localStorage.setItem('admin_auth', 'true');
    } else {
      setPinError(true);
    }
  };

  // Check existing auth on mount
  useEffect(() => {
    if (localStorage.getItem('admin_auth') === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setError('');
    try {
      // Fetch RSVPs
      const rsvpRes = await fetch('/api/rsvp');
      if (!rsvpRes.ok) throw new Error('Erro ao carregar RSVPs');
      const rsvpData = await rsvpRes.json();
      setRsvps(rsvpData.rsvps || []);

      // Fetch Wishes
      const wishRes = await fetch('/api/wishes');
      if (!wishRes.ok) throw new Error('Erro ao carregar desejos');
      const wishData = await wishRes.json();
      setWishes(wishData || []);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Ocorreu um erro.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated]);

  // Handle delete RSVP
  const handleDeleteRSVP = async (id: string) => {
    if (!confirm('Tem a certeza que deseja eliminar esta confirmação?')) return;
    try {
      const res = await fetch(`/api/rsvp?id=${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Erro ao eliminar');
      setRsvps(prev => prev.filter(item => item.id !== id));
    } catch {
      alert('Não foi possível eliminar a confirmação.');
    }
  };

  // Generate Personalized Link
  const handleGenerateLink = (name: string) => {
    setGuestNameInput(name);
    if (!name.trim()) {
      setGeneratedLink('');
      return;
    }
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    const encoded = encodeURIComponent(name.trim()).replace(/%20/g, '+');
    setGeneratedLink(`${origin}/?nome=${encoded}`);
    setCopied(false);
  };

  const getInvitationLink = (r: RSVP) => {
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    let combinedName = r.name.trim();
    if (r.companion === 'yes') {
      const compName = (r.companionName || '').trim();
      if (compName) {
        if (compName.toLowerCase().includes('e acompanhante')) {
          combinedName = compName;
        } else {
          combinedName = `${r.name} & ${compName}`;
        }
      } else {
        combinedName = `${r.name} & Acompanhante`;
      }
    }
    const encoded = encodeURIComponent(combinedName).replace(/%20/g, '+');
    return `${origin}/?nome=${encoded}`;
  };

  const handleCopyLink = () => {
    if (!generatedLink) return;
    navigator.clipboard.writeText(generatedLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // CSV Export
  const handleExportCSV = () => {
    if (rsvps.length === 0) return;
    
    // Headers
    const headers = ['Nome', 'Email', 'Confirmado', 'Acompanhante', 'Nome Acompanhante', 'Relação', 'Presente', 'Mensagem', 'Data'];
    
    // Rows
    const rows = rsvps.map(r => [
      r.name,
      r.email.startsWith('manual-') ? '' : r.email,
      r.attending ? 'Sim' : 'Pendente',
      r.companion === 'yes' ? 'Sim' : 'Não',
      r.companionName || '',
      r.relationship || '',
      r.gift || '',
      (r.message || '').replace(/\n/g, ' '),
      new Date(r.createdAt).toLocaleDateString('pt-PT')
    ]);

    const csvContent = "data:text/csv;charset=utf-8,\uFEFF" 
      + [headers.join(','), ...rows.map(e => e.map(val => `"${val.replace(/"/g, '""')}"`).join(','))].join('\n');
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `convidados_casamento_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Calculate Stats
  const totalRSVPs = rsvps.length;
  const totalAttending = rsvps.filter(r => r.attending).length;
  
  // Total guests including companions
  const totalCompanionsAttending = rsvps.reduce((acc, curr) => {
    if (curr.attending && curr.companion === 'yes') {
      return acc + 1;
    }
    return acc;
  }, 0);

  const totalGuests = totalAttending + totalCompanionsAttending;

  // Gift Stats
  const giftStats = rsvps.reduce((acc: Record<string, number>, curr) => {
    if (curr.attending) {
      const type = curr.gift || 'Não selecionado';
      acc[type] = (acc[type] || 0) + 1;
    }
    return acc;
  }, {});

  // Filtered RSVPs by search query
  const filteredRsvps = rsvps.filter(r => 
    r.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    r.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (r.companionName && r.companionName.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (r.relationship && r.relationship.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (r.gift && r.gift.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Logout admin
  const handleLogout = () => {
    localStorage.removeItem('admin_auth');
    setIsAuthenticated(false);
  };

  // Auth Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f5f2ed] p-4 select-none">
        <div className="w-full max-w-sm bg-white p-8 rounded-sm shadow-md border border-[#6b7c5a]/25 text-center">
          <div className="w-12 h-12 rounded-full bg-[#6b7c5a]/10 flex items-center justify-center mx-auto mb-4">
            <Lock className="w-6 h-6 text-[#6b7c5a]" />
          </div>
          <h2 className="text-xl font-bold text-[#363e2d] mb-1">Painel de Gestão</h2>
          <p className="text-xs text-[#363e2d]/60 mb-6">Acesso reservado aos noivos</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                placeholder="Insira o código PIN"
                value={pin}
                onChange={(e) => {
                  setPin(e.target.value);
                  setPinError(false);
                }}
                className={`w-full text-center px-4 py-2 border rounded-none text-sm focus:outline-none ${
                  pinError ? 'border-red-500 bg-red-50/50' : 'border-[#6b7c5a]/30 focus:border-[#6b7c5a]'
                }`}
              />
              {pinError && (
                <p className="text-[10px] text-red-500 font-semibold mt-1">Código PIN incorreto.</p>
              )}
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-[#6b7c5a] hover:bg-[#586749] text-white text-xs font-bold uppercase tracking-wider transition-colors"
            >
              Entrar
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Dashboard Screen
  return (
    <div className="min-h-screen bg-[#f5f2ed] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <header className="flex flex-col sm:flex-row justify-between items-center bg-white p-6 shadow-sm border-b-2 border-[#6b7c5a] mb-8 gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-[#6b7c5a]/10">
              <Heart className="w-6 h-6 text-[#6b7c5a] fill-[#6b7c5a]" />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-[#363e2d]">Luciano & Auriscidia</h1>
              <p className="text-xs text-[#6b7c5a] font-semibold tracking-wider">PAINEL DE GESTÃO DO CASAMENTO</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={fetchData}
              title="Atualizar dados"
              className="p-2 bg-gray-50 border border-gray-200 text-gray-600 hover:bg-gray-100 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 border border-[#6b7c5a]/35 text-[#6b7c5a] text-xs font-bold hover:bg-gray-50 transition-colors uppercase tracking-wider"
            >
              Sair
            </button>
          </div>
        </header>

        {error && (
          <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm font-semibold mb-6">
            {error}
          </div>
        )}

        {/* Stats Grid */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          
          <div className="bg-white p-6 shadow-sm border border-gray-100 flex items-center justify-between">
            <div>
              <p className="text-xs text-[#363e2d]/60 font-semibold uppercase tracking-wider">Total Respostas</p>
              <h3 className="text-3xl font-extrabold text-[#363e2d] mt-1">{totalRSVPs}</h3>
            </div>
            <div className="p-3 bg-blue-50 text-blue-600 rounded-full">
              <Users className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-6 shadow-sm border border-gray-100 flex items-center justify-between">
            <div>
              <p className="text-xs text-[#363e2d]/60 font-semibold uppercase tracking-wider">Presença Confirmada</p>
              <h3 className="text-3xl font-extrabold text-[#363e2d] mt-1">{totalAttending}</h3>
              <p className="text-[10px] text-gray-400 mt-1">Titulares de convites</p>
            </div>
            <div className="p-3 bg-green-50 text-green-600 rounded-full">
              <Check className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-6 shadow-sm border border-gray-100 flex items-center justify-between">
            <div>
              <p className="text-xs text-[#363e2d]/60 font-semibold uppercase tracking-wider">Acompanhantes</p>
              <h3 className="text-3xl font-extrabold text-[#363e2d] mt-1">{totalCompanionsAttending}</h3>
              <p className="text-[10px] text-gray-400 mt-1">Com presenças confirmadas</p>
            </div>
            <div className="p-3 bg-purple-50 text-purple-600 rounded-full">
              <Users className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-6 shadow-sm border border-gray-100 flex items-center justify-between">
            <div>
              <p className="text-xs text-[#6b7c5a] font-bold uppercase tracking-wider">Total de Convidados</p>
              <h3 className="text-3xl font-extrabold text-[#6b7c5a] mt-1">{totalGuests}</h3>
              <p className="text-[10px] text-gray-500 mt-1">Titulares + acompanhantes</p>
            </div>
            <div className="p-3 bg-green-100 text-[#6b7c5a] rounded-full">
              <Heart className="w-6 h-6 fill-current" />
            </div>
          </div>

        </section>

        {/* Link Generator and Gift stats */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          
          {/* Link Generator */}
          <div className="bg-white p-6 shadow-sm border border-gray-100 lg:col-span-2">
            <h3 className="text-sm font-bold uppercase text-[#363e2d] tracking-wider mb-4">Gerador de Links Personalizados</h3>
            <p className="text-xs text-gray-500 mb-4">
              Escreva o nome do convidado (ou casal) para gerar um link único. Ao abrir o link, o nome aparecerá pré-preenchido no convite.
            </p>
            <div className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Ex: Maria Eduarda & João Silva"
                  value={guestNameInput}
                  onChange={(e) => handleGenerateLink(e.target.value)}
                  className="w-full px-4 py-2 border border-[#6b7c5a]/30 text-sm focus:outline-none focus:border-[#6b7c5a] rounded-none"
                />
              </div>

              {generatedLink && (
                <div className="p-3 bg-[#f5f2ed] border border-[#6b7c5a]/20 flex flex-col sm:flex-row justify-between items-center gap-3">
                  <span className="text-[11px] font-mono select-all break-all text-[#363e2d]/85">
                    {generatedLink}
                  </span>
                  <button
                    onClick={handleCopyLink}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-[#6b7c5a] text-white text-xs font-semibold uppercase hover:bg-[#586749] transition-colors flex-shrink-0"
                  >
                    {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    {copied ? 'Copiado!' : 'Copiar'}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Gift Summary */}
          <div className="bg-white p-6 shadow-sm border border-gray-100">
            <h3 className="text-sm font-bold uppercase text-[#363e2d] tracking-wider mb-4 flex items-center gap-1.5">
              <Gift className="w-4 h-4 text-[#6b7c5a]" /> Resumo de Presentes
            </h3>
            <div className="space-y-3">
              {Object.entries(giftStats).length === 0 ? (
                <p className="text-xs text-gray-400 italic">Ainda sem escolhas registadas.</p>
              ) : (
                Object.entries(giftStats).map(([giftType, count]) => (
                  <div key={giftType} className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-xs text-[#363e2d] font-medium">{giftType}</span>
                    <span className="px-2 py-0.5 bg-[#6b7c5a]/10 text-[#6b7c5a] text-xs font-bold rounded-full">
                      {count} {count === 1 ? 'convidado' : 'convidados'}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>

        {/* Guests Table */}
        <section className="bg-white shadow-sm border border-gray-100 mb-8">
          <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
            <h3 className="text-sm font-bold uppercase text-[#363e2d] tracking-wider">Lista de Confirmações (RSVP)</h3>
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
              <input
                type="text"
                placeholder="Pesquisar convidado..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full sm:w-64 px-4 py-1.5 border border-gray-200 text-xs focus:outline-none focus:border-[#6b7c5a] rounded-none"
              />
              <button
                onClick={handleExportCSV}
                disabled={rsvps.length === 0}
                className="flex items-center gap-1.5 px-4 py-1.5 bg-[#363e2d] hover:bg-[#2d3224] text-white text-xs font-bold uppercase tracking-wider transition-colors disabled:opacity-50 flex-shrink-0"
              >
                <Download className="w-3.5 h-3.5" /> Exportar CSV
              </button>
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="flex items-center gap-1.5 px-4 py-1.5 bg-[#6b7c5a] hover:bg-[#586749] text-white text-xs font-bold uppercase tracking-wider transition-colors flex-shrink-0"
              >
                <Plus className="w-3.5 h-3.5" /> Adicionar Convidado
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            {loading ? (
              <div className="text-center py-10 text-xs text-gray-500">Carregando dados...</div>
            ) : filteredRsvps.length === 0 ? (
              <div className="text-center py-10 text-xs text-gray-400 italic">Nenhum convidado encontrado.</div>
            ) : (
              <table className="w-full text-left text-xs">
                <thead className="bg-gray-50 text-[#363e2d] uppercase tracking-wider text-[10px] font-bold border-b border-gray-100">
                  <tr>
                    <th className="px-6 py-4">Nome</th>
                    <th className="px-6 py-4">Email</th>
                    <th className="px-6 py-4">Presença</th>
                    <th className="px-6 py-4">Acompanhante</th>
                    <th className="px-6 py-4">Relação</th>
                    <th className="px-6 py-4">Presente</th>
                    <th className="px-6 py-4">Mensagem</th>
                    <th className="px-6 py-4">Data</th>
                    <th className="px-6 py-4 text-center">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-[#363e2d]/80">
                  {filteredRsvps.map((r) => (
                    <tr key={r.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <a 
                          href={getInvitationLink(r)} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="font-bold text-[#6b7c5a] hover:text-[#586749] hover:underline inline-flex items-center gap-1"
                        >
                          {r.name}
                          <ExternalLink className="w-3 h-3 opacity-60" />
                        </a>
                      </td>
                      <td className="px-6 py-4">
                        {r.email.startsWith('manual-') ? (
                          <span className="text-gray-400 italic">Pendente</span>
                        ) : (
                          r.email
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-0.5 font-bold ${r.attending ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'}`}>
                          {r.attending ? 'Confirmado' : 'Pendente'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {r.companion === 'yes' ? (
                          <div className="flex flex-col">
                            <span className="font-semibold text-[#363e2d]">Sim</span>
                            <span className="text-[10px] text-gray-500">{r.companionName || 'Sem nome'}</span>
                          </div>
                        ) : (
                          'Não'
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {r.relationship ? (
                          <span className="px-2 py-0.5 bg-blue-50 text-blue-700 font-semibold">
                            {r.relationship}
                          </span>
                        ) : (
                          <span className="text-gray-300 italic">-</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {r.gift ? (
                          <span className="px-2 py-0.5 bg-[#6b7c5a]/10 text-[#6b7c5a] font-semibold">
                            {r.gift}
                          </span>
                        ) : (
                          <span className="text-gray-400 italic">Não selecionado</span>
                        )}
                      </td>
                      <td className="px-6 py-4 max-w-[200px] truncate" title={r.message}>
                        {r.message || <span className="text-gray-300 italic">-</span>}
                      </td>
                      <td className="px-6 py-4 text-gray-400">
                        {new Date(r.createdAt).toLocaleDateString('pt-PT')}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          <button
                            onClick={() => {
                              const link = getInvitationLink(r);
                              navigator.clipboard.writeText(link);
                              setCopiedId(r.id);
                              setTimeout(() => setCopiedId(null), 2000);
                            }}
                            className={`p-1.5 rounded-full transition-colors ${
                              copiedId === r.id 
                                ? 'text-green-600 bg-green-50' 
                                : 'text-[#6b7c5a] hover:bg-[#6b7c5a]/10'
                            }`}
                            title="Copiar Link do Convite"
                          >
                            {copiedId === r.id ? (
                              <Check className="w-3.5 h-3.5" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                          <button
                            onClick={() => handleDeleteRSVP(r.id)}
                            className="p-1.5 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                            title="Eliminar"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </section>

        {/* Wishes section */}
        <section className="bg-white p-6 shadow-sm border border-gray-100">
          <h3 className="text-sm font-bold uppercase text-[#363e2d] tracking-wider mb-6 flex items-center gap-1.5">
            <MessageSquare className="w-4 h-4 text-[#6b7c5a]" /> Mural de Mensagens e Desejos ({wishes.length})
          </h3>
          {wishes.length === 0 ? (
            <p className="text-xs text-gray-400 italic">Ainda sem mensagens no mural.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishes.map((w) => (
                <div key={w.id} className="p-4 bg-[#f5f2ed]/50 border border-gray-100 flex flex-col justify-between">
                  <p className="text-xs italic text-[#363e2d]/80 leading-relaxed mb-4">
                    "{w.message}"
                  </p>
                  <div className="flex justify-between items-center border-t border-gray-200/50 pt-2 text-[10px] text-gray-500 font-semibold">
                    <span className="text-[#6b7c5a] font-bold">{w.name}</span>
                    <span>{new Date(w.createdAt).toLocaleDateString('pt-PT')}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

      </div>

      {/* Modal for manual entry */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-fade-in">
          <div className="bg-white w-full max-w-md p-6 shadow-xl border border-[#6b7c5a]/25 relative">
            <h3 className="text-sm font-bold uppercase text-[#363e2d] tracking-wider mb-4">Adicionar Convidado Manualmente</h3>
            
            {addFormError && (
              <div className="p-3 bg-red-50 border-l-4 border-red-500 text-red-700 text-xs font-semibold mb-4">
                {addFormError}
              </div>
            )}

            <form onSubmit={handleAddGuestSubmit} className="space-y-4">
              <div>
                <label className="text-[11px] font-semibold text-[#363e2d] mb-1 block">Nome do Convidado</label>
                <input
                  type="text"
                  required
                  value={addFormName}
                  onChange={(e) => setAddFormName(e.target.value)}
                  className="w-full px-3 py-1.5 border border-gray-200 text-xs focus:outline-none focus:border-[#6b7c5a] rounded-none"
                  placeholder="Ex: João da Silva"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-semibold text-[#363e2d] mb-1 block">Acompanhante?</label>
                  <select
                    value={addFormCompanion}
                    onChange={(e) => setAddFormCompanion(e.target.value)}
                    className="w-full px-3 py-1.5 border border-gray-200 text-xs focus:outline-none focus:border-[#6b7c5a] rounded-none bg-white"
                  >
                    <option value="no">Não</option>
                    <option value="yes">Sim</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-[#363e2d] mb-1 block">Grau de Parentesco / Relação</label>
                  <input
                    type="text"
                    value={addFormRelationship}
                    onChange={(e) => setAddFormRelationship(e.target.value)}
                    className="w-full px-3 py-1.5 border border-gray-200 text-xs focus:outline-none focus:border-[#6b7c5a] rounded-none"
                    placeholder="Ex: Família Noiva, Amigo..."
                  />
                </div>
              </div>

              {addFormCompanion === 'yes' && (
                <div>
                  <label className="text-[11px] font-semibold text-[#363e2d] mb-1 block">Nome do Acompanhante (Opcional)</label>
                  <input
                    type="text"
                    value={addFormCompanionName}
                    onChange={(e) => setAddFormCompanionName(e.target.value)}
                    className="w-full px-3 py-1.5 border border-gray-200 text-xs focus:outline-none focus:border-[#6b7c5a] rounded-none"
                    placeholder="Deixe em branco para gravar '[Nome] e Acompanhante'"
                  />
                </div>
              )}

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeAddModal}
                  className="px-4 py-2 border border-gray-200 text-gray-500 text-xs font-bold uppercase tracking-wider hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={addFormSubmitting}
                  className="px-4 py-2 bg-[#6b7c5a] hover:bg-[#586749] text-white text-xs font-bold uppercase tracking-wider transition-colors disabled:opacity-50"
                >
                  {addFormSubmitting ? 'A guardar...' : 'Guardar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
