// Script para inserir familiares do noivo na base de dados
// Executa com: node .zscripts/seed-familia-noivo.mjs

import { PrismaClient } from '@prisma/client';

const db = new PrismaClient();

const RELATIONSHIP = 'Familiar do Noivo';

// Para cada entrada: name = nome para o RSVP, displayName = nome que aparece no convite
// Se o convite é para um casal/grupo, displayName = ambos os nomes
const guests = [
  { name: 'Délcio Viriato',           companion: 'no',  companionName: '' },
  { name: 'Soares Malamba',           companion: 'yes', companionName: 'Soares Malamba e Luciana Malamba' },
  { name: 'Riquinho',                 companion: 'yes', companionName: 'Riquinho e Beatriz' },
  { name: 'João da Cruz',             companion: 'yes', companionName: 'João da Cruz e Laurinda Victor' },
  { name: 'Benevides',                companion: 'yes', companionName: 'Benevides e Esposa' },
  { name: 'José Chitote',             companion: 'yes', companionName: 'José Chitote e Esposa' },
  { name: 'Albino Sawimbo',           companion: 'yes', companionName: 'Albino Sawimbo e Acompanhante' },
  { name: 'Luciano Lemos',            companion: 'yes', companionName: 'Luciano Lemos e Esposa' },
  { name: 'Afonso',                   companion: 'yes', companionName: 'Afonso e Esposa' },
  { name: 'Pai Lemos',                companion: 'yes', companionName: 'Pai Lemos e Esposa' },
  { name: 'Julião Bom-Ano',           companion: 'yes', companionName: 'Julião Bom-Ano e Isabel Bom-Ano' },
  { name: 'Alberto Somayakuenja',     companion: 'yes', companionName: 'Alberto Somayakuenja e Esposa' },
  { name: 'Tio Kalandula',            companion: 'yes', companionName: 'Tio Kalandula e Esposa' },
  { name: 'Tia Aurora',               companion: 'yes', companionName: 'Tia Aurora e Esposo' },
  { name: 'Alexandre',                companion: 'yes', companionName: 'Alexandre e Acompanhante' },
  { name: 'Marcos Cacuvi',            companion: 'yes', companionName: 'Marcos Cacuvi e Esposa' },
  { name: 'Adélia Bom-Ano',           companion: 'yes', companionName: 'Adélia Bom-Ano e Esposo' },
  { name: 'Evaristo Domingos',        companion: 'yes', companionName: 'Evaristo Domingos e Esposa' },
  { name: 'Graciano Isaac',           companion: 'yes', companionName: 'Graciano Isaac e Esposa' },
  { name: 'Idalina Isaac',            companion: 'no',  companionName: '' },
  { name: 'Helena Apolo',             companion: 'yes', companionName: 'Helena Apolo e Letícia Apolo' },
  { name: 'Maria Nalupessi',          companion: 'yes', companionName: 'Maria Nalupessi e Graça' },
  { name: 'Luís Lemos',               companion: 'yes', companionName: 'Luís Lemos e Esposa' },
  { name: 'Márcia Bom-Ano',           companion: 'yes', companionName: 'Márcia Bom-Ano e Albertina Bom-Ano' },
  { name: 'Marcos Bom-Ano',           companion: 'yes', companionName: 'Marcos Bom-Ano e Maria Kuayela' },
  { name: 'Prima Henda',              companion: 'yes', companionName: 'Prima Henda e Esposo' },
  { name: 'Mãe Maria',                companion: 'yes', companionName: 'Mãe Maria e Teresa Sonjamba' },
  { name: 'Xavier',                   companion: 'yes', companionName: 'Xavier e Esposa' },
  { name: 'Tio Gonçalves',            companion: 'yes', companionName: 'Tio Gonçalves e Esposa' },
  { name: 'Angelino Sicuete',         companion: 'yes', companionName: 'Angelino Sicuete e Esposa' },
  { name: 'Lemos Ngungo',             companion: 'no',  companionName: '' },
  { name: 'Eduardo dos Santos',       companion: 'yes', companionName: 'Eduardo dos Santos e Esposa' },
  { name: 'Bonefácio Chiquemba',      companion: 'yes', companionName: 'Bonefácio Chiquemba e Esposa' },
  { name: 'Taide Filipe',             companion: 'yes', companionName: 'Taide Filipe e Esposa' },
  { name: 'Aurélio Chicomba',         companion: 'no',  companionName: '' },
  { name: 'Tio Abilío',               companion: 'yes', companionName: 'Tio Abilío e Esposa' },
  { name: 'Mano Choti',               companion: 'yes', companionName: 'Mano Choti e Esposa' },
  { name: 'Nicolau',                  companion: 'yes', companionName: 'Nicolau e Esposa' },
  { name: 'Dinis',                    companion: 'yes', companionName: 'Dinis e Esposa' },
  { name: 'Xandi',                    companion: 'yes', companionName: 'Xandi e Esposa' },
  { name: 'Avô Xavier',               companion: 'yes', companionName: 'Avô Xavier e Avó Madalena' },
  { name: 'Francisco Segunda',        companion: 'yes', companionName: 'Francisco Segunda e Esposa' },
  { name: 'António Dombaxe',          companion: 'yes', companionName: 'António e Tamara Dombaxe' },
  { name: 'Osvaldo Silva',            companion: 'yes', companionName: 'Osvaldo Silva e Esposa' },
  { name: 'Paulo N\'gunza',           companion: 'yes', companionName: 'Paulo N\'gunza e Esposa' },
  { name: 'Nok Nogueira',             companion: 'yes', companionName: 'Nok Nogueira e Esposa' },
  { name: 'Yuri António',             companion: 'yes', companionName: 'Yuri António e Esposa' },
  { name: 'Jaime Mesquita',           companion: 'yes', companionName: 'Jaime Mesquita e Esposa' },
];

const normalize = (s) =>
  s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim().toLowerCase();

async function main() {
  console.log('👔 A inserir familiares do noivo...\n');

  const allManual = await db.rSVP.findMany({
    where: { email: { startsWith: 'manual-' } },
  });

  const results = [];

  for (const guest of guests) {
    const existingGuest = allManual.find(
      (g) => normalize(g.name) === normalize(guest.name)
    );

    if (existingGuest) {
      console.log(`⚠️  Já existe: ${guest.name} — a ignorar.`);
      results.push({ name: guest.name, displayName: guest.companionName || guest.name, status: 'skipped' });
      continue;
    }

    const email = `manual-${Math.random().toString(36).substring(2, 9)}@casamento.com`;

    try {
      const created = await db.rSVP.create({
        data: {
          name: guest.name,
          email,
          attending: false,
          companion: guest.companion,
          companionName: guest.companionName || null,
          relationship: RELATIONSHIP,
        },
      });

      const display = guest.companion === 'yes' && guest.companionName
        ? guest.companionName
        : guest.name;
      console.log(`✅ Criado: ${display}`);
      results.push({ name: guest.name, displayName: display, status: 'created', id: created.id });
    } catch (err) {
      console.error(`❌ Erro ao criar ${guest.name}:`, err.message);
      results.push({ name: guest.name, displayName: guest.name, status: 'error', error: err.message });
    }
  }

  console.log('\n📊 Resumo:');
  console.log(`  ✅ Criados:   ${results.filter(r => r.status === 'created').length}`);
  console.log(`  ⚠️  Ignorados: ${results.filter(r => r.status === 'skipped').length}`);
  console.log(`  ❌ Erros:     ${results.filter(r => r.status === 'error').length}`);

  const BASE_URL = 'https://weddfy.bhao.agency';
  console.log('\n🔗 Links dos convites:');
  for (const r of results) {
    if (r.status === 'created') {
      const encoded = encodeURIComponent(r.displayName).replace(/%20/g, '+');
      console.log(`  ${r.displayName}: ${BASE_URL}/?nome=${encoded}`);
    }
  }
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await db.$disconnect(); });
