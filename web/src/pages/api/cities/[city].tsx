import type { NextApiRequest, NextApiResponse } from 'next';

import { data } from '../../../components/fakeEvent';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { city } = req.query;
  res.status(200).json(data.filter((ev: { city: string }) => ev.city === city));
}
