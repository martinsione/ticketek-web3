import { serialize } from "cookie";
import { sign, verify } from "jsonwebtoken";

import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { cookies } = req;
  const { walletID } = req.body;
  const loginJWT = cookies.NFTicketLoginJWT;

  if (loginJWT) {
    try {
      res.status(200).json({ message: "success" });
    } catch (error) {
      res.status(500);
    }
  } else {
    res.status(200).json({ message: "failed" });
  }
}
