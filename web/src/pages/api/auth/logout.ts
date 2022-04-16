import type { NextApiRequest, NextApiResponse } from "next";

import { serialize } from "cookie";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { cookies } = req;
  // const { walletID } = req.body;
  const loginJWT = cookies.NFTicketLoginJWT;

  if (!loginJWT) return res.json({ message: "you are already logged out" });
  const serialised = serialize("NFTicketLoginJWT", loginJWT, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: -1,
    path: "/",
  });

  res.setHeader("Set-Cookie", serialised);
  return res.status(200).json({ message: "success" });
}
