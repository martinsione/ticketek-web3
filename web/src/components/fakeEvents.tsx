// eslint-disable-next-line import/prefer-default-export
export function fakeEvents() {
  interface Event {
    imageURL: string;
    artist: string;
    location: string;
    city: string;
    type: string;
    date: string;
    tickets_available: number;
    tickets_left: number;
  }

  const event1: Event = {
    imageURL:
      "https://s1.ticketm.net/dam/a/dfa/25d31984-65fb-428a-80a7-cc979012edfa_1238711_TABLET_LANDSCAPE_LARGE_16_9.jpg?width=450&height=255&fit=crop&auto=webp",
    artist: "Sepultura",
    location: "Estadio Central",
    city: "Buenos Aires",
    type: "concierto",
    date: "3 ago 2022",
    tickets_available: 100,
    tickets_left: 90,
  };
  const event2: Event = {
    imageURL:
      "https://s1.ticketm.net/dam/a/895/a991762b-5b7b-42d0-99b2-b37978675895_1179381_TABLET_LANDSCAPE_LARGE_16_9.jpg?width=450&height=255&fit=crop&auto=webp",
    artist: "Katy Perry",
    location: "Auditorio Maxx",
    city: "Cali",
    type: "concierto",
    date: "13 sep 2022",
    tickets_available: 200,
    tickets_left: 70,
  };
  const event3: Event = {
    imageURL:
      "https://s1.ticketm.net/dam/a/1e8/1a5a6417-5a9b-4dd1-ac1e-8aa162fb91e8_1572181_TABLET_LANDSCAPE_LARGE_16_9.jpg?width=450&height=255&fit=crop&auto=webp",
    artist: "Weird Al Yankovic",
    location: "Bar Las palomas",
    city: "Bogotá",
    type: "concierto",
    date: "31 ene 2023",
    tickets_available: 110,
    tickets_left: 40,
  };
  const event4: Event = {
    imageURL:
      "https://s1.ticketm.net/dam/a/f5c/44687510-aac6-46ad-b517-907bdeb03f5c_50561_TABLET_LANDSCAPE_LARGE_16_9.jpg?width=450&height=255&fit=crop&auto=webp",
    artist: "Fatboy Slim",
    location: "Auditorio Imaginario",
    city: "Bogotá",
    type: "concierto",
    date: "30 dic 2022",
    tickets_available: 110,
    tickets_left: 30,
  };

  const events: Event[] = [event1, event2, event3, event4];

  return events;
}
