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

  if (!loginJWT) {
    console.log("no hay token");
    console.log(process.env.SECRET_WORD);
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
    res.setHeader("Set-Cookie", serialised);
    res.status(200).json({ message: "success" });
  } else {
    console.log("entro a else");
    verify(loginJWT, process.env.SECRET_WORD as string, (error, user) => {
      if (error) {
        console.log("entro a error");
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
        res.setHeader("set-cookie", serialised);
        res.status(200).json({ message: "success" });
      }
      console.log("tramo final");
      res.status(200).json({ message: "success" });
    });
  }
}
