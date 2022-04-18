interface EVENT {
  name: string;
  symbol: string;
  place: string;
  price: number;
  numberOfTickets: number;
  metadata: {
    image: string;
    name: string;
    description: string;
    type: string;
    date: Date;
    country: string;
    location: string;
    direction: string;
  };
}

export default function getEventData(address: string): EVENT {
  interface EventData {
    name: string;
    symbol: string;
    place: string;
    price: number;
    numberOfTickets: number;
    metadata: {
      image: string;
      name: string;
      description: string;
      type: string;
      date: Date;
      country: string;
      location: string;
      direction: string;
    };
  }

  // if (!address) return {};
  let val = 0;
  for (let i = 0; i < address.length; i += 1) {
    val += address[i].charCodeAt(0);
  }

  const type = ["Concert", "Theatre", "Family", "Sports", "Comedy"];
  const country = ["Argentina", "Colombia", "México", "Brasil", "Perú"];
  const direccion = ["Calle", "Avenida", "Carrera", "Transversal", "Diagonal"];

  const name = `Event ${val}`;
  const symbol =
    String.fromCharCode((val % 25) + 65) +
    String.fromCharCode((val % 15) + 65) +
    String.fromCharCode((val % 15) + 70);
  const place = `place ${val / 9999}`;
  const price = val / 500;
  const numberOfTickets = Math.round(val / 3);
  const metadata = {
    image: "metaImage",
    name: "metaName",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    type: type[val % 5],
    date: new Date(new Date().setDate(new Date().getDate() + (val % 60))),
    country: country[val % 5],
    location: `Random Location ${val}`,
    direction: `${direccion[val % 5]} ${Math.round(val / 99)} # ${Math.round(
      val / 200
    )} - ${Math.round(val / 400)}`,
  };
  const resp: EventData = {
    name,
    symbol,
    place,
    price,
    numberOfTickets,
    metadata,
  };
  return resp;
}
