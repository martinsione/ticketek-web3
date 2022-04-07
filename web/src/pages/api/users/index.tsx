import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "../../../lib/prisma";

const WAValidator = require("wallet-address-validator");

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        if (req.method === "POST") {
            //   Ruta para la creación de un nuevo usuario, falta checkear parámetros
            const { name, email, walletAddress } = req.body;
            const valid = WAValidator.validate(walletAddress, "ETH");
            if (valid) {
                const response = await prisma.user.create({
                    data: {
                        name,
                        email,
                        walletAddress,
                    },
                });
                return res.status(200).json(response);
            }
            return res.status(400).json({ error: "Not a valid address" });
        }
        if (req.method === "DELETE") {
            //   Método para borrar todos los usuarios de la base de datos
            const response = await prisma.user.deleteMany({});
            return res.status(200).json(response);
        }
        //   Como descarte queda el método GET para obtener todos los usuarios
        const response = await prisma.user.findMany();

        return res.status(200).json(response);
    } catch (error) {
        return res.status(400).json({ error });
    }
}
