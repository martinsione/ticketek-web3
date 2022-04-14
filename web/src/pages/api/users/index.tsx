import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "../../../lib/prisma";

const WAValidator = require("wallet-address-validator");

import { verify } from "jsonwebtoken";

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
      //se verifica que el token corresponda al user que esta queriendo cambiar cosas
      verify(JWT, process.env.SECRET_WORD as string, async (error, user) => {
        console.log("ENTRO A VERIFY, LINEA 21");
        if (error) {
          console.log("ENTRO A ERROR LINEA 22");
          return res.status(403).json({ error: "unauthorized" });
        }
        const valid = WAValidator.validate(walletAddress, "ETH");
        if (valid) {
          console.log("ENTRO A VALID; LINEA 27");
          // Se verifica que el input de email sea válido
          if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            console.log("PASO TEST REGEX LINEA 31");
            const response: void = await prisma.user
              .create({
                data: {
                  name,
                  email,
                  walletAddress,
                },
              })
              .then(() => {
                console.log("TODO OK LINEA 41");
                res.status(200).json({ message: "email changed" });
              })
              .catch(() => {
                console.log("TODO MAL LINEA 44");
                res.status(400).json({ message: "not a valid email" });
              });
          }
        }
      });
      // Se verifica que el input de walletAddress sea válido
    }
    if (req.method === "DELETE") {
      //   Método para borrar todos los usuarios de la base de datos
      const response = await prisma.user.deleteMany({});
      return res.status(200).json(response);
    }
  } catch (error) {
    return res.status(400).json({ error });
  }
}
