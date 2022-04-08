import Web3 from "web3";
import React, { SetStateAction, useState } from "react";
import { Box, Text, Flex } from "@chakra-ui/react";

import { abi } from "../Ticket.json";
import Card from "../Card/Card";

interface Props {
  title: string;
  // filter(): void;
  range: [number, number];
  json: [];
}

const adrress: string = "0x945eD39416121076ADB07c493e306b6D9E541b09";

const web = new Web3(
  "https://ropsten.infura.io/v3/205cede8cdd24eec87b57ce48768889f"
);

const contract = new web.eth.Contract(abi as any, adrress);

// const arrContratos = contract.methods.getArr().call().then(res)
// // aqui traeriamos el arreglo con todos los contratitos

// const metadataArr = arrContratos.map(e => {
//   const contractMap = new web.eth.Contract(abi, e)
//   return contractMap.methods.getURI().call().then(res)
// })
// // este seria el arreglito que mapeariamos, con todos los datos de los eventos

export default function EventCardViewer({ title, range, json }: Props) {
  // const events = fakeEvents().filter((ev) => ev.city === "Bogota");
  const [min, max] = range;
  const [namecontrato, setNamecontrato] = useState("");
  const [symbol, setSymbol] = useState("");
  const [place, setPlace] = useState("");
  const [eventDate, setEventDate] = useState("");

  contract.methods
    .name()
    .call()
    .then((res: SetStateAction<string>) => setNamecontrato(res));
  contract.methods
    .symbol()
    .call()
    .then((res: SetStateAction<string>) => setSymbol(res));
  contract.methods
    .place()
    .call()
    .then((res: SetStateAction<string>) => setPlace(res));
  contract.methods
    .eventDate()
    .call()
    .then((res: SetStateAction<string>) => setEventDate(res));

  const unixTimestamp: string = eventDate;

  const milliseconds = Number(unixTimestamp) * 1000;

  const dateObject = new Date(milliseconds);

  const humanDateFormat = dateObject.toLocaleString().split(" ")[0]; // 2019-12-9 10:30:15

  // dateObject.toLocaleString("en-US", { weekday: "long" }) // Monday
  // dateObject.toLocaleString("en-US", { month: "long" }) // December
  // dateObject.toLocaleString("en-US", { day: "numeric" }) // 9
  // dateObject.toLocaleString("en-US", { year: "numeric" }) // 2019
  // dateObject.toLocaleString("en-US", { hour: "numeric" }) // 10 AM
  // dateObject.toLocaleString("en-US", { minute: "numeric" }) // 30
  // dateObject.toLocaleString("en-US", { second: "numeric" }) // 15
  // dateObject.toLocaleString("en-US", { timeZoneName: "short" }) // 12/9/2019, 10:30:15 AM CST

  interface EV {
    imageURL: string;
    date: string;
    location: string;
    artist: string;
    id: string;
  }

  return (
    <div>
      <Box bg="pink" p="4">
        <Text borderBottom="2px" fontSize="3xl">
          {title}
        </Text>
        <h1>{namecontrato}</h1>
        <h1>{symbol}</h1>
        <h1>{place}</h1>
        <h1>{humanDateFormat}</h1>
        <Flex align="center" direction="row" justify="space-evenly" wrap="wrap">
          {json.map(
            (ev: EV, ndx: number) =>
              ndx >= min &&
              ndx <= max && (
                <Card
                  key={ev.imageURL}
                  date={ev.date}
                  id={ev.id}
                  image={ev.imageURL}
                  location={ev.location}
                  name={ev.artist}
                />
              )
          )}
        </Flex>
      </Box>
    </div>
  );
}
