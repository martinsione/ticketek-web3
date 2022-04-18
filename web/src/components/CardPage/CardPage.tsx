import React from "react";
import { Box, Flex } from "@chakra-ui/react";

import NewCard from "../Card/NewCard";

type Props = {
  data: [
    {
      address: string;
      city: string;
      name: string;
      symbol: string;
      metadata: { date: Date; type: string };
    }
  ];
  // title: string | string[] | undefined;
};

export default function CardPage({ data }: Props) {
  return (
    <Box bg="pink" p="4">
      {/* <Text borderBottom="2px" fontSize="3xl">
        {title}
      </Text> */}
      <Flex justify="center" p="10px" wrap="wrap">
        {data &&
          data.map((ev: any) => (
            <Box key={ev.symbol}>
              <NewCard
                date={ev.metadata.date}
                image={ev.metadata.image}
                location={ev.metadata.location}
                name={ev.name}
                place={ev.place}
                price={ev.price}
                url={ev.name}
              />
            </Box>
          ))}
      </Flex>
    </Box>
  );
}
