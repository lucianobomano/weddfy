// Script para inserir familiares da noiva na base de dados
// Executa com: node .zscripts/seed-familia-noiva.mjs

import { PrismaClient } from '@prisma/client';

const db = new PrismaClient();

const RELATIONSHIP = 'Familiar da Noiva';

// Lista de convidados - familiares da noiva
const guests = [
  {
    name: 'Yola',
    companion: 'yes',
    companionName: 'Yola e Esposo',
  },
  {
    name: 'Tio Dê',
    companion: 'yes',
    companionName: 'Tio Dê e Esposa',
  },
  {
    name: 'Bill',
    companion: 'yes',
    companionName: 'Bill e Esposa',
  },
  {
    name: 'Beny',
    companion: 'no',
    companionName: '',
  },
  {
    name: 'Tia Arlete',
    companion: 'yes',
    companionName: 'Tia Arlete e Esposo',
  },
  {
    name: 'Andreia',
    companion: 'yes',
    companionName: 'Andreia e Esposo',
  },
  {
    name: 'Tia Sônia',
    companion: 'yes',
    companionName: 'Tia Sônia e Esposo',
  },
  {
    name: 'Abel',
    companion: 'yes',
    companionName: 'Abel e Esposa',
  },
  {
    name: 'Caio',
    companion: 'yes',
    companionName: 'Caio e Esposa',
  },
  {
    name: 'Prima Aira',
    companion: 'no',
    companionName: '',
  },
];

async function main() {
  console.log('🌸 A inserir familiares da noiva...\n');

  const results = [];

  for (const guest of guests) {
    const email = `manual-${Math.random().toString(36).substring(2, 9)}@casamento.com`;

    try {
      // Check if already exists (by name, normalized)
      const normalize = (s) =>
        s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim().toLowerCase();

      const existing = await db.rSVP.findFirst({
        where: {
          email: { startsWith: 'manual-' },
        },
      });

      // Find by name among all manual guests
      const allManual = await db.rSVP.findMany({
        where: { email: { startsWith: 'manual-' } },
      });

      const existingGuest = allManual.find(
        (g) => normalize(g.name) === normalize(guest.name)
      );

      if (existingGuest) {
        console.log(`⚠️  Já existe: ${guest.name} — a ignorar.`);
        results.push({ name: guest.name, status: 'skipped' });
        continue;
      }

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

      console.log(`✅ Criado: ${guest.name} (${guest.companion === 'yes' ? guest.companionName : 'individual'})`);
      results.push({ name: guest.name, status: 'created', id: created.id });
    } catch (err) {
      console.error(`❌ Erro ao criar ${guest.name}:`, err.message);
      results.push({ name: guest.name, status: 'error', error: err.message });
    }
  }

  console.log('\n📊 Resumo:');
  console.log(`  ✅ Criados:  ${results.filter((r) => r.status === 'created').length}`);
  console.log(`  ⚠️  Ignorados: ${results.filter((r) => r.status === 'skipped').length}`);
  console.log(`  ❌ Erros:    ${results.filter((r) => r.status === 'error').length}`);
  console.log('\n🔗 Links dos convites:');

  const BASE_URL = 'https://weddfy.bhao.agency';

  for (const r of results) {
    if (r.status === 'created') {
      const guestData = guests.find((g) => g.name === r.name);
      const displayName =
        guestData?.companion === 'yes' && guestData?.companionName
          ? guestData.companionName
          : r.name;
      const encoded = encodeURIComponent(displayName).replace(/%20/g, '+');
      console.log(`  ${r.name}: ${BASE_URL}/?nome=${encoded}`);
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
