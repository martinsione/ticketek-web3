import React from "react";
import { Box, Text, Flex } from "@chakra-ui/react";

import { fakeEvents } from "../fakeEvents";
import Card from "../Card/Card";

interface Props {
  title: string;
  // filter(): void;
  range: [number, number];
}

export default function EventCardViewer({ title, range }: Props) {
  const events = fakeEvents();
  // const events = fakeEvents().filter((ev) => ev.city === "Bogota");
  const [min, max] = range;

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
