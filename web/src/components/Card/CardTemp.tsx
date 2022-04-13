import Link from "next/link";
import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  Button,
  Stack,
  Text,
} from "@chakra-ui/react";

import eventData from "../eventData";
// import add from "../../pages/add";

interface Props {
  address: string;
  city: string;
  name: string;
  symbol: string;
}

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

export default function Card({ address, city, name, symbol }: Props) {
  const data: EventData = eventData(address);
  return (
    <Center margin={0} py={0}>
      <Box
        bg={useColorModeValue("white", "gray.800")}
        // boxShadow="2xl"
        margin="20px"
        maxW="330px"
        p="6"
        pos="relative"
        role="group"
        rounded="lg"
        w="full"
        zIndex={1}
      >
        <Stack align="center" pt={10}>
          <Heading
            cursor="pointer"
            fontFamily="body"
            fontSize="2xl"
            fontWeight={200}
          >
            <Link passHref href={`/events/${address}`}>
              {name}
            </Link>
          </Heading>

          <Link passHref href={`/cities/${city}`}>
            <Text cursor="pointer">{city}</Text>
          </Link>

          <Text fontSize="xs" fontWeight={500}>
            {symbol}
          </Text>
          <Text fontSize="xs" fontWeight={500}>
            {data.metadata.date.toDateString()}
          </Text>
          <Text fontSize="xs" fontWeight={500}>
            {data.metadata.type}
          </Text>
          <Stack align="center" direction="row">
            <Button marginTop={3} variant="ghost">
              Get Ticket
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Center>
  );
}
