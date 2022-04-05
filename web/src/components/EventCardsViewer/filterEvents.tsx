import { data } from "../fakeEvent";

interface Args {
  categoria: string;
  fecha: Date;
  ciudad: string;
}

interface Event {
  imageURL: string;
  artist: string;
  location: string;
  city: string;
  seat: number;
  direction: string;
  country: string;
  type: string;
  date: string;
  tickets_available: number;
  tickets_left: number;
  id: string;
  description: string;
  price: number;
}

export default function filterEvents({ categoria, fecha, ciudad }: Args) {
  let response = data;

  response = categoria && response.filter((ev: Event) => ev.type === categoria);

  return response;
}
