import { NextApiRequest, NextApiResponse } from "next";

import prisma from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const addresses = (await prisma.contract.findMany()).map(
    (e: any) => e.address
  );

  res.status(200).json(addresses);
}
