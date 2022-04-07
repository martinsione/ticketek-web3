const { PrismaClient } = require("@prisma/client");

const { users, contracts } = require("./data");

const prisma = new PrismaClient();

const load = async () => {
    try {
        await prisma.user.deleteMany();
        await prisma.contract.deleteMany();
        console.log("Deleted records");

        //   await prisma.$queryRaw`ALTER TABLE User AUTO_INCREMENT = 1`;
        //   await prisma.$queryRaw`ALTER TABLE Contract AUTO_INCREMENT = 1`;
        console.log("reset auto increment to 1");     

        await prisma.user.createMany({ data: users });
        await prisma.contract.createMany({ data: contracts });
        console.log("Added data");
    } catch (e) {
        console.error(e);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
};

load();
