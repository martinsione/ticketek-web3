import data from '../fakeEvent.json';

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

export default function filterEvents({ categoria }: Args) {
  const response = data;

  return categoria && response.filter((ev: Event) => ev.type === categoria);
}
