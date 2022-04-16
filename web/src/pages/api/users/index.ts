import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "../../../lib/prisma";
import Auth from "../../../lib/auth";

const WAValidator = require("wallet-address-validator");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "POST") {
      //   Ruta para la creación de un nuevo usuario, falta checkear parámetros
      const { name, email, walletAddress } = req.body;
      const { cookies } = req;
      const JWT = cookies.NFTicketLoginJWT;
      Auth(
        JWT,
        async () => res.status(403).json({ error: "unauthorized" }),
        async () => {
          const valid = WAValidator.validate(walletAddress, "ETH");
          if (valid) {
            // Se verifica que el input de email sea válido
            if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
              const response: void = await prisma.user
                .create({
                  data: {
                    name,
                    email,
                    walletAddress,
                  },
                })
                .then(() => {
                  res
                    .status(200)
                    .json({ message: "email changed", data: response });
                })
                .catch(() => {
                  res.status(400).json({ message: "not a valid email" });
                });
            }
          }
        }
      );
    }

    // if (req.method === "DELETE") {         <----  comentado hasta saber que hacer
    //   const { cookies } = req;
    //   const JWT = cookies.NFTicketLoginJWT;
    //   Auth(
    //     JWT,
    //     async () => {
    //       return res.status(403).json({ error: "unauthorized" });
    //     },
    //     async () => {
    //       //   Método para borrar todos los usuarios de la base de datos
    //       const response = await prisma.user.deleteMany({});
    //       return res.status(200).json(response);
    //     }
    //   );
    // }
  } catch (error) {
    return res.status(400).json({ error });
  }
  const response = await prisma.user.findMany();
  return res.status(200).json({ message: response });
}
