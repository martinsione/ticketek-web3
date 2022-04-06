import type { NextApiRequest, NextApiResponse } from "next";

import { data } from "../../../components/fakeEvent";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(data);
}
