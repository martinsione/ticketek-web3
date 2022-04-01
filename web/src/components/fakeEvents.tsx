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

  const event0: Event = {
    imageURL:
      "https://s1.ticketm.net/dam/a/6ed/8f781d8c-ab5a-4b78-b22b-d97f74f076ed_1166671_TABLET_LANDSCAPE_LARGE_16_9.jpg?width=450&height=255&fit=crop&auto=webp",
    artist: "Jesus and Mary Chain",
    location: "Estadio Central",
    city: "Buenos Aires",
    type: "concierto",
    date: "3 ago 2022",
    tickets_available: 100,
    tickets_left: 90,
  };
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
  const event5: Event = {
    imageURL:
      "https://s1.ticketm.net/dam/a/979/abed8b8f-592c-4fd8-b2c9-d69d71818979_1236341_TABLET_LANDSCAPE_LARGE_16_9.jpg?width=450&height=255&fit=crop&auto=webp",
    artist: "Pixies",
    location: "Estadio Mundial",
    city: "Buenos Aires",
    type: "concierto",
    date: "31 jul 2022",
    tickets_available: 110,
    tickets_left: 30,
  };
  const event6: Event = {
    imageURL:
      "https://s1.ticketm.net/dam/a/839/17ecf37d-82b3-4703-833c-3632cb7fa839_1449041_TABLET_LANDSCAPE_LARGE_16_9.jpg?width=450&height=255&fit=crop&auto=webp",
    artist: "Kiss",
    location: "Tu mente",
    city: "Cali",
    type: "concierto",
    date: "31 jul 2022",
    tickets_available: 110,
    tickets_left: 30,
  };
  const event7: Event = {
    imageURL:
      "https://s1.ticketm.net/dam/a/d76/d1194e52-fe26-4ba5-9bd7-0cbe94bf1d76_1574941_TABLET_LANDSCAPE_LARGE_16_9.jpg?width=450&height=255&fit=crop&auto=webp",
    artist: "Olivia Rodrigo",
    location: "Tu mente",
    city: "Cali",
    type: "concierto",
    date: "31 jul 2022",
    tickets_available: 110,
    tickets_left: 30,
  };
  const event8: Event = {
    imageURL:
      "https://s1.ticketm.net/dam/c/df8/81eadad8-4449-412e-a2b1-3d8bbb78edf8_106181_TABLET_LANDSCAPE_LARGE_16_9.jpg?width=450&height=255&fit=crop&auto=webp",
    artist: "Raime",
    location: "Bar El tufo",
    city: "Bogotá",
    type: "concierto",
    date: "31 jul 2022",
    tickets_available: 110,
    tickets_left: 30,
  };
  const event9: Event = {
    imageURL:
      "https://s1.ticketm.net/dam/a/13a/b69f7e85-dde8-4c2b-9fa2-b6630507a13a_387491_TABLET_LANDSCAPE_LARGE_16_9.jpg?width=450&height=255&fit=crop&auto=webp",
    artist: "Milli Vanilli",
    location: "Matik Matik",
    city: "Bogotá",
    type: "concierto",
    date: "31 jul 2022",
    tickets_available: 110,
    tickets_left: 30,
  };
  const event10: Event = {
    imageURL:
      "https://s1.ticketm.net/dam/a/592/2c596688-a3ae-4d7e-9d9f-b310f350a592_1208391_TABLET_LANDSCAPE_LARGE_16_9.jpg?width=450&height=255&fit=crop&auto=webp",
    artist: "Babymetal",
    location: "Café Tin",
    city: "Buenos Aires",
    type: "concierto",
    date: "31 jul 2022",
    tickets_available: 110,
    tickets_left: 30,
  };
  const event11: Event = {
    imageURL:
      "https://s1.ticketm.net/dam/a/f1c/076a52d9-7d7c-44ad-b24e-cc47e51c6f1c_971431_TABLET_LANDSCAPE_LARGE_16_9.jpg?width=450&height=255&fit=crop&auto=webp",
    artist: "Blackpink",
    location: "Estadio El Campín",
    city: "Bogotá",
    type: "concierto",
    date: "31 jul 2022",
    tickets_available: 110,
    tickets_left: 30,
  };

  const events: Event[] = [
    event0,
    event1,
    event2,
    event3,
    event4,
    event5,
    event6,
    event7,
    event8,
    event9,
    event10,
    event11,
  ];

  return events;
}
