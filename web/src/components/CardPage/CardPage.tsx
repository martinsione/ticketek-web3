import React from "react";
import { Box, Text, Flex } from "@chakra-ui/react";

import CardTemp from "../Card/CardTemp";

type Props = {
  data: [];
  title: string;
};

export default function CardPage({ data, title }: Props) {
  return (
    <Box bg="pink" p="4">
      <Text borderBottom="2px" fontSize="3xl">
        {title}
      </Text>
      <Flex justify="center" p="10px" wrap="wrap">
        {data &&
          data.map((card) => (
            <Box>
              <CardTemp
                key={card.address}
                address={card.address}
                city={card.city}
                name={card.name}
                symbol={card.symbol}
              />
            </Box>
          ))}
      </Flex>
    </Box>
  );
}
