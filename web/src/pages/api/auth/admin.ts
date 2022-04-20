import type { NextApiRequest, NextApiResponse } from "next";

import { sign } from "jsonwebtoken";
import { serialize } from "cookie";

import permisos from "./permisos";
import Auth from "../../../lib/authAdmin";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { cookies } = req;
  const adminJWT = cookies.NFTicketAdminJWT;
  const { walletID, palabra } = req.body;

  if (permisos.includes(walletID) && palabra === "nftickets") {
    if (!adminJWT) {
      const token = sign(
        {
          walletID,
        },
        process.env.ADMIN_WORD as string,
        {
          expiresIn: "604800s",
        }
      );

      const serialised = serialize("NFTicketAdminJWT", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
      });

      res.setHeader("Set-Cookie", serialised);
      return res.status(200).json({ message: "success" });
    }
    return Auth(
      adminJWT,
      () => res.json({ message: "forbidden" }),
      () => res.json({ message: "Token valido" })
    );
  }
  return res.status(403).json({ message: "forbidden" });
}
