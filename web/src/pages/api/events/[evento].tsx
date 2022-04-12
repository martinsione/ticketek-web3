import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const evento = req.query.evento.toString();
  try {
    //     DELETE para borrar evento en particular, siempre buscandolo a traves de su address

    if (req.method === "DELETE") {
      const response = await prisma.contract.delete({
        where: {
          address: evento,
        },
      });
      return res.status(200).json(response);
    }

    //   GET para traer un evento en particular

    const response = await prisma.contract.findUnique({
      where: {
        address: evento,
      },
    });
    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json({ error });
  }
}
