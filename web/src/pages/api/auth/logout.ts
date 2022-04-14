import type { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";
// import { sign, verify } from "jsonwebtoken";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { cookies } = req;
  const { walletID } = req.body;
  const loginJWT = cookies.NFTicketLoginJWT;

  if (!loginJWT) return res.json({ message: "you are already logged out" });
  const serialised = serialize("NFTicketLoginJWT", loginJWT, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: -1,
  });

  res.setHeader("set-cookie", serialised);
  res.status(200).json({ message: "success" });
}
