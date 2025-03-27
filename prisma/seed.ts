
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const user1 = await prisma.user.create({
    data: {
      name: 'João Silva',
      email: 'joao@email.com',
      password: 'senha123',
    },
  });

  const user2 = await prisma.user.create({
    data: {
      name: 'Maria Santos',
      email: 'maria@email.com',
      password: 'senha456'
    },
  });

  await prisma.question.create({
    data: {
      title: 'Como aprender Prisma?',
      slug: 'como-aprender-prisma',
      content: 'Quero saber os melhores recursos para aprender Prisma',
      authId: user1.id,
      userId: user1.id,
    },
  });

  await prisma.question.create({
    data: {
      title: 'O que é GraphQL?',
      slug: 'o-que-e-graphql',
      content: 'Alguém pode explicar o que é GraphQL e como funciona?',
      authId: user2.id,
      userId: user2.id,
    },
  });

  console.log('Seed concluído com sucesso!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });