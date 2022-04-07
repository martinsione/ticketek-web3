import { users } from "./data";

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const load = async () => {
  try {
    await prisma.user.deleteMany();
    console.log("Deleted records in category table");

    await prisma.user.deleteMany();
    console.log("Deleted records in product table");

    await prisma.$queryRaw`ALTER TABLE User AUTO_INCREMENT = 1`;
    console.log("reset users auto increment to 1");

    await prisma.user.createMany({
      data: users,
    });
    console.log("Added users data");
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};

load();
