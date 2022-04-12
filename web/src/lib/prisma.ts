import { PrismaClient } from "@prisma/client";

// declare global {
//     // eslint-disable-next-line no-var, vars-on-top
//     var prisma: PrismaClient;
// }

// if (process.env.NODE_ENV === "production") {
//     prisma = new PrismaClient();
// } else {
//     if (!global.prisma) {
//         global.prisma = new PrismaClient();
//     }
//     prisma = global.prisma;
// }

// export default prisma;
const prisma = new PrismaClient();

export default prisma;
