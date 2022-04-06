import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        if (req.method === "POST") {
            const response = await prisma.user.create({
                data: {
                    name: "Franco",
                    email: "asdasd@gmail.com",
                    walletAddress:
                        "0x842e01852A02bae0cC7084CE034C88B80Ec32db22",
                },
            });
            return res.status(200).send(response);
        }
        const response = await prisma.user.findMany();
        return res.status(200).json(response);
    } catch (error) {
        return res.status(400).json({ error });
    }
}
