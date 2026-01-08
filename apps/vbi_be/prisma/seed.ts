// apps/vbi_be/prisma/seed.ts
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  // 1. 比如创建一个默认管理员
  const admin = await prisma.user.upsert({
    where: { email: 'admin​@vbi.com' },
    update: {},
    create: {
      email: 'admin​@vbi.com',
      name: 'Admin',
      posts: {
        create: {
          title: 'Welcome to VBI',
          content: 'This is the first initialized post.',
          published: true,
        },
      },
    },
  });
  console.info({ admin });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
