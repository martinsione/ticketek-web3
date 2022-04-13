export default function getEventData(
  address: string
): { metadata: { date: Date; type: string } } | undefined {
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

  if (!address) return;
  let val = 0;
  for (let i = 0; i < address.length; i += 1) {
    val += address[i].charCodeAt(0);
  }

  const type = ["Concert", "Theatre", "Family", "Sports"];
  const country = ["Argentina", "Colombia", "México", "Brasil", "Perú"];
  const direccion = ["Calle", "Avenida", "Carrera", "Transversal", "Diagonal"];

  const name = `name${val}`;
  const symbol = "XXX";
  const place = `place${val}`;
  const price = val / 500;
  const numberOfTickets = Math.round(val / 3);
  const metadata = {
    image: "metaImage",
    name: "metaName",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    type: type[val % 4],
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
