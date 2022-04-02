import Web3 from "web3";
import React, { useState } from "react";
import { Box, Text, Flex } from "@chakra-ui/react";

import { fakeEvents } from "../fakeEvents";
import { abi } from "../Ticket.json"
import Card from "../Card/Card";

interface Props {
  title: string;
  // filter(): void;
  range: [number, number];
}

const adrress: string = '0x945eD39416121076ADB07c493e306b6D9E541b09'

const web = new Web3('https://ropsten.infura.io/v3/205cede8cdd24eec87b57ce48768889f')

const contract = new web.eth.Contract(abi, adrress)

// const arrContratos = contract.methods.getArr().call().then(res)
// // aqui traeriamos el arreglo con todos los contratitos

// const metadataArr = arrContratos.map(e => {
//   const contractMap = new web.eth.Contract(abi, e)
//   return contractMap.methods.getURI().call().then(res)
// })
// // este seria el arreglito que mapeariamos, con todos los datos de los eventos

export default function EventCardViewer({ title, range }: Props) {
  const events = fakeEvents();
  // const events = fakeEvents().filter((ev) => ev.city === "Bogota");
  const [min, max] = range;
  const [namecontrato, setNamecontrato] = useState("")
  const [symbol, setSymbol] = useState("")
  const [place, setPlace] = useState("")
  const [eventDate, setEventDate] = useState("")


  contract.methods.name().call().then(res => setNamecontrato(res))
  contract.methods.symbol().call().then(res => setSymbol(res))
  contract.methods.place().call().then(res => setPlace(res))
  contract.methods.eventDate().call().then(res => setEventDate(res))



  return (
    <div>
      <Box bg="pink" margin="2" p="4">
        <Text borderBottom="2px" fontSize="3xl">
          {title}
        </Text>
        <Flex
          align="flex-start"
          direction="row"
          justify="space-around"
          wrap="wrap"
        >
          <h1>{namecontrato}</h1>
          <h1>{symbol}</h1>
          <h1>{place}</h1>
          <h1>{eventDate}</h1>
          {events.map(
            (ev, ndx) =>
              ndx >= min &&
              ndx <= max && (
                <Card
                  key={ev.imageURL}
                  date={ev.date}
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
