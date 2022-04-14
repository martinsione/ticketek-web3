import { PrismaClient } from "@prisma/client";

declare global {
    // allow global `var` declarations
    // eslint-disable-next-line no-var, vars-on-top
    var prisma: PrismaClient | undefined;
}

// eslint-disable-next-line import/prefer-default-export
const prisma =
    global.prisma ||
    new PrismaClient({
        log: ["query"],
    });

if (process.env.NODE_ENV !== "production") global.prisma = prisma;

export default prisma;
