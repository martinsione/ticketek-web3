import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "../../../lib/prisma";

const WAValidator = require("wallet-address-validator");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { address, name, symbol } = req.body;
  try {
    //     POST para crear un evento

    if (req.method === "POST") {
      //   Se verifica si el input de address es válido
      const valid = WAValidator.validate(address, "ETH");
      if (valid) {
        // Se verifica que se hayan proporcionado los otros datos
        if (name.length && symbol.length) {
          const response = await prisma.contract.create({
            // @ts-ignore
            data: {
              address,
              name,
              symbol,
            },
          });
          return res.status(200).json(response);
        }
        return res.status(400).json({ error: "Missing params" });
      }
      return res.status(400).json({ error: "Not a valid contract address" });
    }
    //   GET para traer todos los eventos
    const response = await prisma.contract.findMany();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json({ error });
  }
}
