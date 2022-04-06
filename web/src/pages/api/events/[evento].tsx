import type { NextApiRequest, NextApiResponse } from "next";

import { data } from "../../../components/fakeEvent";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { evento } = req.query;
  res
    .status(200)
    // eslint-disable-next-line eqeqeq
    .json(data.filter((event: { id: string }) => event.id == evento));
}
