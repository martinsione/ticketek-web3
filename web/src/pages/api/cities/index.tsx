import type { NextApiRequest, NextApiResponse } from "next";

// import prisma from "../../../lib/prisma";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const justCities = (await prisma.contract.findMany()).map(
    (e: { city: string }) => e.city
  );
  const cities = new Set(justCities);

  res.status(200).json(Array.from(cities));
}
