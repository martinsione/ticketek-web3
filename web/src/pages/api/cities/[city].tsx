import type { NextApiRequest, NextApiResponse } from "next";

import data from "../../../components/fakeEvent.json";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const { city } = req.query;
    console.log(city);

    res.status(200).json(
        data.filter((ev: { city: string }) => ev.city === city)
    );
}
