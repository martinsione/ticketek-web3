import React from "react";

import { fakeEvents } from "../fakeEvents";
import Card from "../Card/Card";

export default function CardEventViewer() {
  const title: string = "En tu ciudad"; // prop
  const events = fakeEvents();

  return (
    <div>
      <div>{title}</div>
      {events.map((ev) => (
        <Card key={ev.imageURL} /> //  Pasar props a Card
      ))}
    </div>
  );
}
