import { serialize } from "cookie";
import { sign, verify } from "jsonwebtoken";

import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { cookies } = req;
  const { walletID, force } = req.body;
  const loginJWT = cookies.NFTicketLoginJWT;
  if (walletID) {
    if (!loginJWT && force) {
      const token = sign(
        {
          exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
          walletID,
        },
        process.env.SECRET_WORD as string
      );

      const serialised = serialize("NFTicketLoginJWT", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
        maxAge: 60 * 60 * 24,
      });

      try {
        res.setHeader("Set-Cookie", serialised);
      } catch (error) {
        res.status(500).json({ message: "something went wrong" });
      }
      res.status(200).json({ message: "success" });
    } else if ((loginJWT && force) || (loginJWT && !force)) {
      verify(loginJWT, process.env.SECRET_WORD as string, (error, user) => {
        if (error) {
          const token = sign(
            {
              exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
              walletID,
            },
            process.env.SECRET_WORD as string
          );

          const serialised = serialize("NFTicketLoginJWT", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            sameSite: "strict",
            maxAge: 60 * 60 * 24,
          });

          try {
            return res.setHeader("set-cookie", serialised);
          } catch (error) {
            return res.status(500);
          }
        }
        res.status(200).json({ message: "success" });
      });
    } else {
      res.status(200).json({ message: "something went wrong" });
    }
  } else {
    res.json({ message: "error" });
  }
}
