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
    const response = await prisma.user.delete({
      where: { walletAddress: user },
    });

    return res.status(200).json(response);
    //   Método PUT
  }
  if (req.method === "PUT") {
    let { name, image } = req.body;
    const userToUpdate = await prisma.user.findUnique({
      where: {
        walletAddress: user,
      },
    });
    //   Los campos que no fueron enviados se asignan con los que ya tenía
    // el usuario, para no dejarlos vacíos al actualizar
    name = name || userToUpdate?.name;
    image = image || userToUpdate?.image;

    const response = await prisma.user.update({
      where: {
        walletAddress: user,
      },
      data: { name, image },
    });
    return res.status(200).json(response);
  }
  //     Método GET
  const response = await prisma.user.findUnique({
    where: { walletAddress: user },
  });
  return res.status(200).json(response);
}
