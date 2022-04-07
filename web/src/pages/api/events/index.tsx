import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "../../../lib/prisma";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { address, city, name, symbol } = req.body;
    try {
        //     POST para crear un evento
        if (req.method === "POST") {
            const response = await prisma.contract.create({
                data: {
                    address,
                    city,
                    name,
                    symbol,
                },
            });
            return res.status(200).json(response);
        }
        //   GET para traer todos los eventos
        const response = await prisma.contract.findMany();
        return res.status(200).json(response);
    } catch (error) {
        return res.status(400).json({ error });
    }
}
