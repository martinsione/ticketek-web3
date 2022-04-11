/* eslint-disable */
import { NextApiRequest, NextApiResponse } from "next";

import data from "../../../components/fakeEvent.json";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { query }: NextApiRequest = req;

  const querySplit = query.searchTerm
    ? (query.searchTerm as string).split(" ")
    : null;
  if (querySplit === null) return res.json({ data: [] });
  interface EVENT {
    imageURL: string;
    artist: string;
    location: string;
    city: string;
    direction: string;
    country: string;
    type: string;
    date: string;
    id: string;
    description: string;
  }

  const matches: EVENT[] = [];
  const articles: string[] = [
    "de",
    "del",
    "el",
    "la",
    "lo",
    "los",
    "the",
    "of",
    "la",
    "las",
  ];
  data.filter((event: EVENT) => {
    // a = key of the object data
    // let a: keyof EVENT
    for (let a in event) {
      let key = a as keyof EVENT;
      let value = event[key];
      let aSplit =
        typeof value === "string"
          ? value.split(" ").map((element: string) => element.toLowerCase())
          : value;

      // b = word of searchTerm string
      for (let b of querySplit) {
        if (
          a === "artist" ||
          a === "location" ||
          a === "city" ||
          a === "country" ||
          a === "type"
        ) {
          // if (aSplit.includes(b.toLowerCase()) && !articles.includes(b))
          //   matches.push(event);
          for (a of aSplit) {
            if (a.includes(b.toLowerCase()) && !articles.includes(b)) {
              matches.push(event);
            }
          }
        }
      }
    }
  });

  const arrUniq = [
    ...new Map(matches.map((v: { id: string }) => [v.id, v])).values(),
  ];

  res.json({ data: arrUniq });
}
