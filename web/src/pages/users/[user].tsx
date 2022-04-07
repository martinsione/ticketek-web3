import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const response = await prisma.user.findMany();
        return res.status(200).json(response);
    } catch (error) {
        return res.status(400).json({ msg: "Error getting the users", error });
    }
}
