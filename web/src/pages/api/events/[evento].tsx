import { data } from "../../../components/fakeEvent";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { evento } = req.query;
  res.status(200).json(
    data.filter((event: { id: string }) => {
      return event.id == evento;
    })
  );
}
