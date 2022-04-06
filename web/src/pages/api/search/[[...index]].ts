/* eslint-disable */
import { NextApiRequest, NextApiResponse } from "next";

import data from "../../../components/fakeEvent.json";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { query }: NextApiRequest = req;
  const querySplit = query.searchTerm.toString().split(" ");

  const matches: any[] = [];
  data.filter((event: any) => {
    // a = key of the object data
    for (const a in event) {
      const aSplit =
        typeof event[a] === "string"
          ? event[a].split(" ").map((element: string) => element.toLowerCase())
          : event[a];
      // b = word of searchTerm string
      for (const b of querySplit) {
        if (
          a === "artist" ||
          a === "location" ||
          a === "city" ||
          a === "country" ||
          a === "type"
        ) {
          if (aSplit.includes(b.toLowerCase())) matches.push(event);
        }
      }
    }
  });
  // @ts-ignore
  const arrUniq = [...new Map(matches.map((v) => [v.id, v])).values()];
  res.json({ data: arrUniq });
}
