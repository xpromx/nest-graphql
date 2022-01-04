import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

const userData: Prisma.UserCreateInput[] = [
  {
    firstName: 'Alice',
    lastName: 'Wonderland',
    email: 'alice@gmail.com',
  },
  {
    firstName: 'Harry',
    lastName: 'Potter',
    email: 'harry@gmail.com',
  },
  {
    firstName: 'Rodrigo',
    lastName: 'Ramirez',
    email: 'rodrigo@gmail.com',
  },
];

async function main() {
  console.log(`Start seeding ...`);
  for (const u of userData) {
    const user = await prisma.user.create({
      data: u,
    });
    console.log(`Created user with id: ${user.id}`);
  }
  console.log(`Seeding finished.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
