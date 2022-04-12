import type { NextApiRequest, NextApiResponse } from "next";

// import prisma from "../../../lib/prisma";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { city } = req.query;

  const cities = await prisma.contract.findMany();

  const filtered = cities.filter((e: { city: string }) => e.city === city);

  res.status(200).json(filtered);
}
