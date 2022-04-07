import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Obtengo el parámetro que viene por la query, siempre va a se la walletAddress
  const user = req.query.user.toString();
  //     Método DELETE
  if (req.method === "DELETE") {
    console.log(user);
    const response = await prisma.user.delete({
      where: { walletAddress: user },
    });

    return res.status(200).json(response);
    //   Método PUT
  }
  if (req.method === "PUT") {
    const { name, email, image } = req.body;
    //   Falta corroborar si no se envia nombre, etc etc
    const response = await prisma.user.update({
      where: {
        walletAddress: user,
      },
      data: { name, email, image },
    });
    return res.status(200).json(response);
  }
  //     Método GET
  const response = await prisma.user.findUnique({
    where: { walletAddress: user },
  });
  return res.status(200).json(response);
}
