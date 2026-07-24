// Script para inserir amigos da noiva na base de dados
// Executa com: node .zscripts/seed-amigos-noiva.mjs

import { PrismaClient } from '@prisma/client';

const db = new PrismaClient();

const RELATIONSHIP = 'Amigo(a) da Noiva';

const guests = [
  { name: 'Laidy e Arlinda',    companion: 'no',  companionName: '' },
  { name: 'Ricardo',            companion: 'no',  companionName: '' },
  { name: 'Gracieth',           companion: 'no',  companionName: '' },
  { name: 'Edit',               companion: 'no',  companionName: '' },
  { name: 'Núria',              companion: 'yes', companionName: 'Núria e Lucau' },
  { name: 'Amélia',             companion: 'no',  companionName: '' },
  { name: 'Anacleta',           companion: 'yes', companionName: 'Anacleta e Amélia' },
  { name: 'Ivandra',            companion: 'no',  companionName: '' },
  { name: 'Evania',             companion: 'no',  companionName: '' },
  { name: 'Estefânia',          companion: 'no',  companionName: '' },
  { name: 'Neize',              companion: 'no',  companionName: '' },
  { name: 'Isidora',            companion: 'no',  companionName: '' },
];

const normalize = (s) =>
  s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim().toLowerCase();

async function main() {
  console.log('💐 A inserir amigos da noiva...\n');

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
      results.push({ name: guest.name, status: 'skipped' });
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
      console.log(`✅ Criado: ${guest.name} ${guest.companion === 'yes' ? `(${guest.companionName})` : '(individual)'}`);
      results.push({ name: guest.name, displayName: display, status: 'created', id: created.id });
    } catch (err) {
      console.error(`❌ Erro ao criar ${guest.name}:`, err.message);
      results.push({ name: guest.name, status: 'error', error: err.message });
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
      console.log(`  ${r.name}: ${BASE_URL}/?nome=${encoded}`);
    }
  }
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await db.$disconnect(); });
