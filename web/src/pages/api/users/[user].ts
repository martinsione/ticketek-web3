import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "../../../lib/prisma";
import Auth from "../../../lib/auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Obtengo el parámetro que viene por la query, siempre va a se la walletAddress
  const user = req.query.user.toString();
  const { cookies } = req;
  const JWT = cookies.NFTicketLoginJWT;

  //     Método DELETE
  if (req.method === "DELETE") {
    Auth(
      JWT,
      async () => res.status(403).json({ message: "Forbidden" }),
      async () => {
        const response = await prisma.user.delete({
          where: { walletAddress: user },
        });

        return res.status(200).json(response);
      }
    );
  }
  //   Método PUT
  if (req.method === "PUT") {
    let { name, image } = req.body;
    Auth(
      JWT,
      async () => res.status(403).json({ message: "Forbidden" }),
      async () => {
        // tercer paramtro el callback por si se verifica correctamente
        const userToUpdate = await prisma.user.findUnique({
          where: {
            walletAddress: user,
          },
        });
        /* Los campos que no fueron enviados se asignan con los que ya tenía
        el usuario, para no dejarlos vacíos al actualizar */
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
    );
  }
  //     Método GET
  const response = await prisma.user.findUnique({
    where: { walletAddress: user },
  });
  return res.status(200).json(response);
}
