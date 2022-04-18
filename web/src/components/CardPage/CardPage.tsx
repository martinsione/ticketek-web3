import React from "react";
import { Box, Stack } from "@chakra-ui/react";

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
    <Stack align="center" direction="row" justify="center" m="auto" maxW="1200px" wrap="wrap">
      {data &&
        data.map((ev: any) => (
          <Box key={ev.symbol}>
            <NewCard
              address={ev.address}
              date={ev.metadata.date}
              image={ev.metadata.image}
              location={ev.metadata.location}
              name={ev.name}
              place={ev.place}
              price={ev.price}
            />
          </Box>
        ))}
    </Stack>

  );
}
