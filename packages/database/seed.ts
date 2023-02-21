import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
async function main() {
  await prisma.user.upsert({
    where: { email: "alice@prisma.io" },
    update: {},
    create: {
      email: "alice@prisma.io",
      name: "Alice",
    },
  });

  await prisma.store.upsert({
    where: { url: "https://caliroots.com" },
    update: {},
    create: {
      url: "https://caliroots.com",
      name: "caliroots",
      brandsPath: "/pages/our-brands",
      brands: {
        create: [
          {
            name: "apc",
            url: "https://caliroots.com/collections/a-p-c",
            path: "/collections/a-p-c",
          },
        ],
      },
    },
  });

  await prisma.store.upsert({
    where: { url: "https://tres-bien.com" },
    update: {},
    create: {
      url: "https://tres-bien.com",
      name: "tres-bien",
      brandsPath: "/",
      brands: {
        create: [
          {
            name: "acne-studios",
            url: "https://tres-bien.com/acne-studios",
            path: "/acne-studios",
          },
        ],
      },
    },
  });
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
