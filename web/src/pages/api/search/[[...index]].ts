import { NextApiRequest, NextApiResponse } from "next";
import { data } from "../../../components/fakeEvent";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { query }: NextApiRequest = req;
  //console.log({ DESDEAPI: query });
  const filtered = data.filter((event: {}) => {
    return Object.values(event).includes(query.searchTerm);
  });
  res.json({ data: filtered });
}
